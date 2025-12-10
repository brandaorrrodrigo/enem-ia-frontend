"""
Sistema RAG Atualizado com suporte a PDF
- Processa PDFs preservando estrutura
- Detecta conteúdo visual
- Preparado para adicionar visão multimodal
"""
import os
import glob
from typing import List, Dict, Optional
import chromadb
from chromadb.config import Settings as ChromaSettings
from sentence_transformers import SentenceTransformer
import ollama
from config import settings
from pdf_processor import pdf_processor

class RAGSystemPDF:
    def __init__(self):
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.chroma_client = None
        self.collection = None
        self.vision_model = None  # Para adicionar depois (Fase C)
        self.initialize_chroma()
        
    def initialize_chroma(self):
        """Inicializa o banco vetorial ChromaDB"""
        try:
            os.makedirs(settings.CHROMA_DB_PATH, exist_ok=True)
            
            self.chroma_client = chromadb.PersistentClient(
                path=settings.CHROMA_DB_PATH,
                settings=ChromaSettings(
                    anonymized_telemetry=False,
                    allow_reset=True
                )
            )
            
            try:
                self.collection = self.chroma_client.get_collection("enem_knowledge_pdf")
                print(f"✅ Coleção existente carregada: {self.collection.count()} documentos")
            except:
                self.collection = self.chroma_client.create_collection(
                    name="enem_knowledge_pdf",
                    metadata={"description": "Base de conhecimento ENEM (PDF)"}
                )
                print("✅ Nova coleção criada")
                
        except Exception as e:
            print(f"❌ Erro ao inicializar ChromaDB: {e}")
            raise
    
    def chunk_text(self, text: str, chunk_size: int = None, overlap: int = None) -> List[str]:
        """Divide texto em chunks inteligentes"""
        chunk_size = chunk_size or settings.CHUNK_SIZE
        overlap = overlap or settings.CHUNK_OVERLAP
        
        chunks = []
        start = 0
        text_length = len(text)
        
        while start < text_length:
            end = start + chunk_size
            chunk = text[start:end]
            
            # Tenta terminar em uma frase completa
            if end < text_length:
                # Procura por fim de sentença
                for delimiter in ['\n\n', '\n', '. ', '? ', '! ']:
                    last_delim = chunk.rfind(delimiter)
                    if last_delim > chunk_size * 0.5:
                        chunk = chunk[:last_delim + len(delimiter)]
                        end = start + last_delim + len(delimiter)
                        break
            
            if chunk.strip():
                chunks.append(chunk.strip())
            
            start = end - overlap
        
        return chunks
    
    def process_pdfs(self, pdf_dir: str = None) -> List[Dict]:
        """
        Processa todos os PDFs do diretório
        
        Returns:
            Lista de PDFs processados com chunks
        """
        processed_pdfs = pdf_processor.process_directory(pdf_dir)
        
        if not processed_pdfs:
            return []
        
        # Adiciona chunks a cada PDF
        for pdf_data in processed_pdfs:
            text = pdf_processor.get_text_for_rag(pdf_data)
            pdf_data['chunks'] = self.chunk_text(text)
            
            print(f"📄 {pdf_data['filename']}: {len(pdf_data['chunks'])} chunks criados")
        
        return processed_pdfs
    
    def add_to_vectordb(self, processed_pdfs: List[Dict]):
        """Adiciona PDFs processados ao banco vetorial"""
        if not processed_pdfs:
            print("⚠️ Nenhum PDF para indexar")
            return
        
        print("\n🔨 Indexando documentos no ChromaDB...")
        
        all_documents = []
        all_metadatas = []
        all_ids = []
        
        doc_counter = 0
        for pdf in processed_pdfs:
            for i, chunk in enumerate(pdf['chunks']):
                all_documents.append(chunk)
                
                # Metadados ricos incluindo informação visual
                metadata = {
                    'filename': pdf['filename'],
                    'subject': pdf.get('subject', 'geral'),  # ← Disciplina
                    'chunk_index': i,
                    'total_chunks': len(pdf['chunks']),
                    'has_visual_content': pdf['has_visual_content'],
                    'total_images': pdf['stats']['total_images'],
                    'has_formulas': pdf['stats']['pages_with_formulas'] > 0,
                    'has_tables': pdf['stats']['pages_with_tables'] > 0,
                    'source_type': 'pdf'
                }
                
                all_metadatas.append(metadata)
                all_ids.append(f"{pdf['filename']}_chunk_{i}")
                doc_counter += 1
        
        # Adiciona em lotes
        batch_size = 100
        for i in range(0, len(all_documents), batch_size):
            batch_docs = all_documents[i:i+batch_size]
            batch_metas = all_metadatas[i:i+batch_size]
            batch_ids = all_ids[i:i+batch_size]
            
            self.collection.add(
                documents=batch_docs,
                metadatas=batch_metas,
                ids=batch_ids
            )
            
            print(f"  ✅ Lote {i//batch_size + 1}: {len(batch_docs)} documentos")
        
        print(f"\n✅ Total indexado: {doc_counter} chunks")
        print(f"📊 Total na coleção: {self.collection.count()} documentos")
    
    def search(self, query: str, top_k: int = None, filter_visual: bool = False, subject: str = None) -> List[Dict]:
        """
        Busca semântica no banco vetorial
        
        Args:
            query: Texto da busca
            top_k: Número de resultados
            filter_visual: Se True, prioriza documentos com conteúdo visual
            subject: Filtrar por disciplina (opcional)
        """
        top_k = top_k or settings.TOP_K_RESULTS
        
        try:
            # Monta filtros
            where_clause = {}
            
            if filter_visual:
                where_clause["has_visual_content"] = True
            
            if subject:
                where_clause["subject"] = subject
            
            # Busca base
            results = self.collection.query(
                query_texts=[query],
                n_results=top_k * 2 if (filter_visual or subject) else top_k,
                where=where_clause if where_clause else None
            )
            
            # Formata resultados
            formatted_results = []
            if results['documents'] and results['documents'][0]:
                for i, doc in enumerate(results['documents'][0]):
                    result = {
                        'content': doc,
                        'metadata': results['metadatas'][0][i],
                        'distance': results['distances'][0][i] if 'distances' in results else None
                    }
                    
                    # Marca se precisa de visão
                    result['needs_vision'] = self.check_needs_vision(doc, results['metadatas'][0][i])
                    
                    formatted_results.append(result)
            
            # Se filtrou por visual, pega só top_k
            if filter_visual and len(formatted_results) > top_k:
                formatted_results = formatted_results[:top_k]
            
            return formatted_results
        
        except Exception as e:
            print(f"❌ Erro na busca: {e}")
            return []
    
    def check_needs_vision(self, content: str, metadata: Dict) -> bool:
        """
        Verifica se o conteúdo precisa de modelo visual
        
        Args:
            content: Texto do chunk
            metadata: Metadados do documento
        
        Returns:
            True se precisa de visão multimodal
        """
        # Marcadores no texto
        visual_markers = [
            "[CONTÉM", "IMAGEM", "GRÁFICO", "DIAGRAMA",
            "TABELA", "FÓRMULA", "conforme figura", "veja o gráfico"
        ]
        
        # Verifica marcadores no texto
        content_upper = content.upper()
        has_markers = any(marker in content_upper for marker in visual_markers)
        
        # Verifica metadados
        has_visual_meta = metadata.get('has_visual_content', False)
        
        return has_markers or has_visual_meta
    
    def generate_answer(self, query: str, context: List[Dict]) -> str:
        """Gera resposta usando Ollama com contexto"""
        if not context:
            return "Desculpe, não encontrei informações relevantes para responder sua pergunta."
        
        # Verifica se algum contexto precisa de visão
        needs_vision = any(c.get('needs_vision', False) for c in context)
        
        # Monta contexto
        context_text = "\n\n---\n\n".join([
            f"[Fonte: {c['metadata']['filename']}]\n{c['content']}"
            for c in context
        ])
        
        # Adiciona aviso se precisa de visão
        vision_note = ""
        if needs_vision:
            vision_note = "\n⚠️ NOTA: Este conteúdo contém elementos visuais (gráficos, diagramas, fórmulas). A resposta será baseada nas descrições textuais disponíveis.\n\n"
        
        # Prompt otimizado
        prompt = f"""Você é um assistente especializado em preparação para o ENEM. Use APENAS as informações do contexto abaixo para responder a pergunta.

{vision_note}CONTEXTO:
{context_text}

PERGUNTA: {query}

INSTRUÇÕES:
- Responda de forma clara e educacional
- Use exemplos quando relevante
- Se houver referência a gráficos/imagens, explique o conceito teoricamente
- Se a informação não estiver no contexto, diga que não encontrou
- Seja direto e objetivo
- Cite a fonte quando relevante

RESPOSTA:"""
        
        try:
            response = ollama.chat(
                model=settings.OLLAMA_MODEL,
                messages=[{
                    'role': 'user',
                    'content': prompt
                }]
            )
            
            return response['message']['content']
        
        except Exception as e:
            return f"❌ Erro ao gerar resposta: {e}"
    
    def ask(self, query: str, use_vision: bool = False) -> Dict:
        """
        Método principal: pergunta → busca → responde
        
        Args:
            query: Pergunta do usuário
            use_vision: Se True e disponível, usa modelo visual (Fase C)
        """
        print(f"\n❓ Pergunta: {query}")
        
        # Busca contexto relevante
        context = self.search(query)
        
        if not context:
            return {
                'query': query,
                'answer': "Não encontrei informações relevantes nos materiais disponíveis.",
                'sources': [],
                'needs_vision': False
            }
        
        # Verifica se precisa de visão
        needs_vision = any(c.get('needs_vision', False) for c in context)
        
        # FASE C: Se tiver modelo visual e precisar, usa ele
        if use_vision and needs_vision and self.vision_model:
            answer = self.generate_answer_with_vision(query, context)
        else:
            answer = self.generate_answer(query, context)
        
        # Extrai fontes únicas
        sources = list(set([c['metadata']['filename'] for c in context]))
        
        return {
            'query': query,
            'answer': answer,
            'sources': sources,
            'num_sources': len(context),
            'needs_vision': needs_vision,
            'vision_available': self.vision_model is not None
        }
    
    def generate_answer_with_vision(self, query: str, context: List[Dict]) -> str:
        """
        FASE C: Gera resposta usando modelo visual
        Placeholder para implementação futura
        """
        # TODO: Implementar com Llama 3.2 Vision ou GPT-4V
        return self.generate_answer(query, context)
    
    def get_stats(self) -> Dict:
        """Retorna estatísticas do sistema"""
        return {
            'total_documents': self.collection.count(),
            'model': settings.OLLAMA_MODEL,
            'ebooks_path': settings.EBOOKS_PATH,
            'vision_enabled': self.vision_model is not None,
            'supports_visual': True  # Suporte preparado
        }

# Instância global
rag_pdf = RAGSystemPDF()