"""
Processamento robusto de PDFs - Salva incrementalmente
Execute: python process_pdfs_robust.py
"""
from rag_system_pdf import rag_pdf
from pdf_processor import pdf_processor
from pathlib import Path
from config import settings
import time

def process_pdfs_incremental():
    """Processa PDFs salvando a cada 10 arquivos"""
    print("="*70)
    print("🚀 PROCESSAMENTO ROBUSTO DE PDFs - EnemIA")
    print("="*70)
    
    pdf_dir = settings.EBOOKS_PATH
    print(f"\n🔍 Buscando PDFs em: {pdf_dir}")
    
    # Buscar todos os PDFs
    pdf_files = list(Path(pdf_dir).rglob("*.pdf"))
    
    if not pdf_files:
        print(f"❌ Nenhum PDF encontrado em {pdf_dir}")
        return
    
    total_pdfs = len(pdf_files)
    print(f"📚 Encontrados {total_pdfs} PDFs")
    print(f"💾 Salvando a cada 10 PDFs para não perder progresso\n")
    
    # Verificar quantos já foram processados
    current_count = rag_pdf.collection.count()
    print(f"📊 Documentos já indexados: {current_count}")
    
    if current_count > 0:
        print("\n⚠️  Já existem documentos no banco!")
        print("Quer continuar processando? (s/n): ", end="")
        response = input().strip().lower()
        if response != 's':
            print("❌ Processamento cancelado")
            return
    
    print("\n" + "="*70)
    print("PROCESSANDO PDFs")
    print("="*70 + "\n")
    
    processed_batch = []
    total_processed = 0
    total_skipped = 0
    total_chunks = 0
    start_time = time.time()
    
    for idx, pdf_path in enumerate(pdf_files, 1):
        try:
            print(f"\n[{idx}/{total_pdfs}] 📄 {pdf_path.name}")
            
            # Processar PDF
            result = pdf_processor.process_pdf(str(pdf_path))
            
            if result:
                # Criar chunks
                chunks = rag_pdf.chunk_text(result['full_text'])
                result['chunks'] = chunks
                processed_batch.append(result)
                total_processed += 1
                total_chunks += len(chunks)
                
                print(f"  ✅ {len(chunks)} chunks criados")
                
                # Salvar a cada 10 PDFs
                if len(processed_batch) >= 10:
                    print(f"\n💾 Salvando lote de {len(processed_batch)} PDFs...")
                    rag_pdf.add_to_vectordb(processed_batch)
                    print(f"  ✅ Lote salvo! Total no banco: {rag_pdf.collection.count()}")
                    processed_batch = []
            else:
                print(f"  ⚠️  Pulado (erro no processamento)")
                total_skipped += 1
                
        except KeyboardInterrupt:
            print("\n\n⚠️  INTERROMPIDO PELO USUÁRIO!")
            print(f"Salvando {len(processed_batch)} PDFs processados...")
            if processed_batch:
                rag_pdf.add_to_vectordb(processed_batch)
            break
            
        except Exception as e:
            print(f"  ❌ Erro: {str(e)[:100]}")
            total_skipped += 1
            continue
    
    # Salvar últimos PDFs que sobraram
    if processed_batch:
        print(f"\n💾 Salvando últimos {len(processed_batch)} PDFs...")
        rag_pdf.add_to_vectordb(processed_batch)
    
    # Estatísticas finais
    elapsed = time.time() - start_time
    minutes = int(elapsed // 60)
    seconds = int(elapsed % 60)
    
    print("\n" + "="*70)
    print("📊 RESUMO DO PROCESSAMENTO")
    print("="*70)
    print(f"\n✅ PDFs processados: {total_processed}")
    print(f"⚠️  PDFs pulados (erro): {total_skipped}")
    print(f"📄 Total de chunks: {total_chunks}")
    print(f"💾 Documentos no banco: {rag_pdf.collection.count()}")
    print(f"⏱️  Tempo total: {minutes}min {seconds}s")
    print(f"🚀 Velocidade: {total_processed / (elapsed / 60):.1f} PDFs/min")
    
    print("\n" + "="*70)
    print("✅ PROCESSAMENTO CONCLUÍDO!")
    print("="*70)
    
    if total_processed > 0:
        print("\n🎉 Seu sistema está pronto para usar!")
        print("\n💡 Próximos passos:")
        print("   1. Testar busca: python -c \"from rag_system_pdf import rag_pdf; print(rag_pdf.search('força resultante'))\"")
        print("   2. Testar perguntas: Criar corretor de redação")
        print("   3. Rodar API: uvicorn main:app --reload")

if __name__ == "__main__":
    try:
        process_pdfs_incremental()
    except Exception as e:
        print(f"\n❌ Erro crítico: {e}")
        import traceback
        traceback.print_exc()