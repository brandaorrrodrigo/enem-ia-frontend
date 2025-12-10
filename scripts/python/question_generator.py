"""
ENEM Pro - Gerador de Questões com IA
Usa RAG + Ollama/OpenAI para gerar questões realistas do ENEM
"""

from rag_system_pdf import rag_pdf
import ollama
import json
import os
from typing import List, Dict, Optional

class QuestionGenerator:
    """Gera questões do ENEM usando IA + base de conhecimento"""
    
    def __init__(self, use_openai: bool = False):
        """
        Args:
            use_openai: Se True, usa OpenAI (pago). False usa Ollama (gratuito)
        """
        self.use_openai = use_openai
        
        if use_openai:
            import openai
            self.openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            self.model = "gpt-4"
        else:
            self.model = "llama3.2:latest"
    
    def generate_question(
        self, 
        subject: str, 
        difficulty: str = "medio",
        topic: Optional[str] = None
    ) -> Dict:
        """
        Gera UMA questão sobre o assunto
        
        Args:
            subject: matematica, fisica, portugues, etc
            difficulty: facil, medio, dificil
            topic: tópico específico (opcional)
        
        Returns:
            Dict com a questão completa
        """
        
        # 1. Buscar conteúdo relevante nos PDFs
        search_query = topic if topic else f"conteúdo de {subject} para questão de nível {difficulty}"
        context = rag_pdf.search(search_query, top_k=3, subject=subject)
        
        if not context:
            print(f"⚠️ Nenhum conteúdo encontrado para {subject}")
            return None
        
        # 2. Montar contexto
        context_text = "\n\n".join([c['content'] for c in context])
        
        # 3. Prompt otimizado para gerar questão
        prompt = self._create_question_prompt(subject, difficulty, context_text, topic)
        
        # 4. Chamar IA
        try:
            if self.use_openai:
                response_text = self._call_openai(prompt)
            else:
                response_text = self._call_ollama(prompt)
            
            # 5. Parse JSON
            question = self._parse_question_response(response_text)
            
            if question:
                # Adicionar metadados
                question['fontes_pdf'] = [c['metadata']['filename'] for c in context]
                question['created_at'] = json.dumps({"$date": {"$numberLong": str(int(__import__('time').time() * 1000))}})
                
                print(f"✅ Questão gerada: {subject} - {difficulty}")
                return question
            
        except Exception as e:
            print(f"❌ Erro ao gerar questão: {e}")
            return None
    
    def _create_question_prompt(
        self, 
        subject: str, 
        difficulty: str, 
        context: str,
        topic: Optional[str]
    ) -> str:
        """Cria prompt otimizado para geração de questão"""
        
        difficulty_desc = {
            "facil": "fácil (conceitos básicos)",
            "medio": "médio (conceitos intermediários e aplicações)",
            "dificil": "difícil (conceitos avançados e raciocínio complexo)"
        }
        
        topic_text = f"\nTÓPICO ESPECÍFICO: {topic}\n" if topic else ""
        
        return f"""Você é um especialista em criar questões de vestibular no estilo ENEM.

CONTEXTO DO MATERIAL DE ESTUDO:
{context}
{topic_text}
TAREFA: Crie UMA questão de múltipla escolha no estilo ENEM sobre {subject}.

NÍVEL DE DIFICULDADE: {difficulty_desc[difficulty]}

CARACTERÍSTICAS OBRIGATÓRIAS:
- Questão contextualizada (situação real, texto introdutório)
- 5 alternativas (A, B, C, D, E)
- Apenas UMA alternativa correta
- Alternativas plausíveis (não óbvias)
- Explicação detalhada do gabarito
- Baseada no conteúdo fornecido acima

FORMATO DE RESPOSTA (retorne APENAS JSON válido, sem texto adicional):
{{
    "enunciado": "Texto da questão contextualizada aqui...",
    "alternativas": {{
        "A": "Texto completo da alternativa A",
        "B": "Texto completo da alternativa B",
        "C": "Texto completo da alternativa C",
        "D": "Texto completo da alternativa D",
        "E": "Texto completo da alternativa E"
    }},
    "gabarito": "C",
    "explicacao": "Explicação detalhada: Por que a alternativa C está correta e as outras estão incorretas...",
    "disciplina": "{subject}",
    "dificuldade": "{difficulty}",
    "habilidade_enem": "H1 - Reconhecer características...",
    "competencia_enem": 1
}}

IMPORTANTE:
- Retorne APENAS o JSON, sem markdown, sem texto antes ou depois
- Questão realista, no estilo ENEM
- Enunciado claro e objetivo
- Todas as alternativas devem ser plausíveis
- Explicação educativa e completa
"""
    
    def _call_ollama(self, prompt: str) -> str:
        """Chama Ollama local"""
        response = ollama.chat(
            model=self.model,
            messages=[{'role': 'user', 'content': prompt}]
        )
        return response['message']['content']
    
    def _call_openai(self, prompt: str) -> str:
        """Chama OpenAI API"""
        response = self.openai_client.chat.completions.create(
            model=self.model,
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0.7
        )
        return response.choices[0].message.content
    
    def _parse_question_response(self, response_text: str) -> Optional[Dict]:
        """Extrai e valida JSON da resposta"""
        try:
            # Limpar markdown se houver
            if '```json' in response_text:
                response_text = response_text.split('```json')[1].split('```')[0]
            elif '```' in response_text:
                response_text = response_text.split('```')[1].split('```')[0]
            
            # Parse JSON
            question = json.loads(response_text.strip())
            
            # Validar campos obrigatórios
            required_fields = ['enunciado', 'alternativas', 'gabarito', 'explicacao']
            if not all(field in question for field in required_fields):
                print("❌ JSON inválido: faltam campos obrigatórios")
                return None
            
            # Validar alternativas
            if len(question['alternativas']) != 5:
                print("❌ Questão deve ter exatamente 5 alternativas")
                return None
            
            # Validar gabarito
            if question['gabarito'] not in ['A', 'B', 'C', 'D', 'E']:
                print("❌ Gabarito inválido")
                return None
            
            return question
            
        except json.JSONDecodeError as e:
            print(f"❌ Erro ao fazer parse do JSON: {e}")
            print(f"Resposta recebida: {response_text[:200]}...")
            return None
    
    def generate_simulado(
        self, 
        num_questoes: int = 45, 
        distribuicao: Optional[Dict[str, int]] = None
    ) -> Dict:
        """
        Gera um simulado completo
        
        Args:
            num_questoes: Total de questões
            distribuicao: Ex: {"matematica": 10, "portugues": 15, ...}
        
        Returns:
            Dict com simulado completo
        """
        
        if distribuicao is None:
            # Distribuição padrão ENEM
            distribuicao = {
                "matematica": 10,
                "portugues": 10,
                "historia": 5,
                "geografia": 5,
                "fisica": 5,
                "quimica": 5,
                "biologia": 5
            }
        
        simulado = {
            "titulo": "Simulado ENEM Pro - Gerado por IA",
            "total_questoes": num_questoes,
            "data_criacao": __import__('datetime').datetime.now().isoformat(),
            "questoes": []
        }
        
        questao_num = 1
        dificuldades = ["facil", "medio", "dificil"]
        
        print("="*70)
        print("🎯 GERANDO SIMULADO ENEM PRO")
        print("="*70)
        
        for subject, quantidade in distribuicao.items():
            print(f"\n📚 {subject.upper()}: Gerando {quantidade} questões...")
            
            for i in range(quantidade):
                # Variar dificuldade (33% cada)
                dificuldade = dificuldades[i % 3]
                
                print(f"   [{questao_num}/{num_questoes}] Gerando questão {i+1} ({dificuldade})...", end=" ")
                
                # Gerar questão
                questao = self.generate_question(subject, dificuldade)
                
                if questao:
                    questao['numero'] = questao_num
                    simulado['questoes'].append(questao)
                    questao_num += 1
                    print("✅")
                else:
                    print("❌ Falhou, tentando novamente...")
                    # Retry uma vez
                    questao = self.generate_question(subject, "medio")
                    if questao:
                        questao['numero'] = questao_num
                        simulado['questoes'].append(questao)
                        questao_num += 1
                        print("   ✅ Sucesso no retry")
                    else:
                        print("   ❌ Falhou após retry")
        
        print("\n" + "="*70)
        print(f"✅ SIMULADO CONCLUÍDO: {len(simulado['questoes'])}/{num_questoes} questões geradas")
        print("="*70)
        
        return simulado
    
    def save_simulado(self, simulado: Dict, filename: str = None):
        """Salva simulado em arquivo JSON"""
        if filename is None:
            timestamp = __import__('datetime').datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"simulado_{timestamp}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(simulado, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Simulado salvo em: {filename}")
        return filename

# Instância global
question_gen = QuestionGenerator(use_openai=False)  # Mude para True para usar OpenAI

# ==================== EXEMPLOS DE USO ====================

def exemplo_gerar_uma_questao():
    """Exemplo: Gerar uma questão"""
    print("\n📝 EXEMPLO 1: Gerar uma questão de matemática\n")
    
    questao = question_gen.generate_question(
        subject="matematica",
        difficulty="medio",
        topic="função quadrática"
    )
    
    if questao:
        print(json.dumps(questao, indent=2, ensure_ascii=False))

def exemplo_gerar_simulado():
    """Exemplo: Gerar simulado completo"""
    print("\n📝 EXEMPLO 2: Gerar simulado completo\n")
    
    simulado = question_gen.generate_simulado(
        num_questoes=10,  # Reduzido para teste
        distribuicao={
            "matematica": 3,
            "fisica": 3,
            "portugues": 4
        }
    )
    
    # Salvar
    filename = question_gen.save_simulado(simulado)
    
    # Mostrar resumo
    print(f"\n📊 RESUMO:")
    print(f"Total de questões: {len(simulado['questoes'])}")
    print(f"Disciplinas:")
    
    disciplinas = {}
    for q in simulado['questoes']:
        disc = q['disciplina']
        disciplinas[disc] = disciplinas.get(disc, 0) + 1
    
    for disc, count in disciplinas.items():
        print(f"   • {disc}: {count} questões")

def exemplo_integracao_api():
    """Exemplo: Como integrar com FastAPI"""
    print("\n📝 EXEMPLO 3: Integração com API\n")
    
    print("""
# No seu main.py (FastAPI):

from question_generator import question_gen

@app.post("/questions/generate")
async def generate_question(request: QuestionRequest):
    questao = question_gen.generate_question(
        subject=request.subject,
        difficulty=request.difficulty
    )
    return questao

@app.post("/questions/simulado")
async def generate_simulado(request: SimuladoRequest):
    simulado = question_gen.generate_simulado(
        num_questoes=request.num_questoes,
        distribuicao=request.distribuicao
    )
    return simulado
""")

# ==================== MAIN ====================

if __name__ == "__main__":
    import sys
    
    print("""
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║        🎓 ENEM PRO - GERADOR DE QUESTÕES IA             ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
""")
    
    print("\nOpções:")
    print("1. Gerar uma questão")
    print("2. Gerar simulado completo (10 questões)")
    print("3. Gerar simulado ENEM completo (45 questões)")
    print("4. Ver exemplos de integração")
    print("0. Sair")
    
    choice = input("\nEscolha uma opção: ").strip()
    
    if choice == "1":
        exemplo_gerar_uma_questao()
    
    elif choice == "2":
        exemplo_gerar_simulado()
    
    elif choice == "3":
        print("\n⚠️ ATENÇÃO: Gerar 45 questões pode demorar 15-30 minutos!")
        confirm = input("Continuar? (s/n): ").strip().lower()
        
        if confirm == 's':
            simulado = question_gen.generate_simulado(num_questoes=45)
            question_gen.save_simulado(simulado)
    
    elif choice == "4":
        exemplo_integracao_api()
    
    else:
        print("\n👋 Até logo!")

"""
╔══════════════════════════════════════════════════════════╗
║                    COMO USAR                             ║
╚══════════════════════════════════════════════════════════╝

1. PREPARAÇÃO:
   - Execute process_pdfs_robust.py primeiro
   - Isso indexará seus ebooks no ChromaDB

2. GERAR QUESTÕES:
   
   # Uma questão:
   python question_generator.py
   
   # Ou via código:
   from question_generator import question_gen
   questao = question_gen.generate_question("matematica", "medio")

3. GERAR SIMULADO:
   
   simulado = question_gen.generate_simulado(
       num_questoes=45,
       distribuicao={
           "matematica": 10,
           "portugues": 10,
           "fisica": 5,
           ...
       }
   )

4. USAR NA API:
   
   # Copie para sua API FastAPI
   # Veja exemplos acima

╔══════════════════════════════════════════════════════════╗
║                    CONFIGURAÇÃO                          ║
╚══════════════════════════════════════════════════════════╝

Para usar OpenAI (melhor qualidade):
1. Instale: pip install openai
2. Configure: export OPENAI_API_KEY="sua-chave"
3. Mude: QuestionGenerator(use_openai=True)

Para usar Ollama (gratuito):
1. Instale Ollama: https://ollama.ai
2. Baixe modelo: ollama pull llama3.2
3. Use: QuestionGenerator(use_openai=False)

"""
