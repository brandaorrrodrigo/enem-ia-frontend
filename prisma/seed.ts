/**
 * Prisma Seed Script - ENEM Questions
 *
 * Seeds the database with real ENEM questions from JSON files.
 *
 * Usage:
 *   npx prisma db seed
 *
 * Features:
 * - Reads ENEM question JSON files
 * - Maps JSON format to Prisma schema
 * - Idempotent (won't duplicate existing questions)
 * - Validates data before inserting
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// ============================================================================
// TYPES
// ============================================================================

interface AlternativasJSON {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}

interface QuestaoJSON {
  numero: number;
  ano: number;
  disciplina: string;
  enunciado: string;
  alternativas: AlternativasJSON;
  correta: string; // "A" | "B" | "C" | "D" | "E"
  tipo?: string; // "real" | "adaptada" | "simulada"
  habilidade?: string;
  competencia?: number;
  explicacao?: string;
  source?: string;
  area?: string;
  difficulty?: number;
}

interface EnemJSONFile {
  versao: string;
  total_questoes: number;
  gerado_em: string;
  questoes: QuestaoJSON[];
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Converts letter (A-E) to index (0-4)
 */
function letraParaIndice(letra: string): number {
  const upper = letra.toUpperCase();
  const index = upper.charCodeAt(0) - 65; // 'A' = 65

  if (index < 0 || index > 4) {
    throw new Error(`Letra inválida: ${letra}. Deve ser A-E.`);
  }

  return index;
}

/**
 * Converts alternativas object to array
 */
function alternativasParaArray(alternativas: AlternativasJSON): string[] {
  return [
    alternativas.A,
    alternativas.B,
    alternativas.C,
    alternativas.D,
    alternativas.E,
  ];
}

/**
 * Validates a question before inserting
 */
function validarQuestao(questao: QuestaoJSON): void {
  if (!questao.enunciado || questao.enunciado.trim().length < 10) {
    throw new Error(`Enunciado inválido para questão ${questao.numero}`);
  }

  if (!questao.alternativas || typeof questao.alternativas !== 'object') {
    throw new Error(`Alternativas inválidas para questão ${questao.numero}`);
  }

  const letras = ['A', 'B', 'C', 'D', 'E'];
  for (const letra of letras) {
    if (!questao.alternativas[letra as keyof AlternativasJSON]) {
      throw new Error(`Alternativa ${letra} faltando para questão ${questao.numero}`);
    }
  }

  if (!questao.correta || !letras.includes(questao.correta.toUpperCase())) {
    throw new Error(`Resposta correta inválida para questão ${questao.numero}: ${questao.correta}`);
  }
}

/**
 * Creates a unique identifier for a question (to check duplicates)
 */
function criarIdUnico(questao: QuestaoJSON): string {
  // Use enunciado hash as unique identifier
  // Simple hash: first 100 chars of enunciado
  return questao.enunciado.trim().substring(0, 100).toLowerCase();
}

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

/**
 * Loads JSON file with ENEM questions
 */
function carregarArquivoJSON(caminhoRelativo: string): EnemJSONFile {
  const caminhoCompleto = path.resolve(__dirname, caminhoRelativo);

  console.log(`📂 Carregando arquivo: ${caminhoCompleto}`);

  if (!fs.existsSync(caminhoCompleto)) {
    throw new Error(`Arquivo não encontrado: ${caminhoCompleto}`);
  }

  const conteudo = fs.readFileSync(caminhoCompleto, 'utf-8');
  const dados: EnemJSONFile = JSON.parse(conteudo);

  console.log(`✅ Arquivo carregado: ${dados.total_questoes} questões`);

  return dados;
}

/**
 * Seeds questions from a JSON file
 */
async function seedQuestoesDoArquivo(caminhoRelativo: string): Promise<void> {
  const dados = carregarArquivoJSON(caminhoRelativo);

  let inseridas = 0;
  let duplicadas = 0;
  let erros = 0;

  // Estatísticas por tipo
  const statsPorTipo: Record<string, number> = {
    real: 0,
    adaptada: 0,
    simulada: 0,
  };

  for (const questaoJSON of dados.questoes) {
    try {
      // Validate question
      validarQuestao(questaoJSON);

      // Check if question already exists (by enunciado substring)
      const idUnico = criarIdUnico(questaoJSON);
      const existente = await prisma.questao.findFirst({
        where: {
          enunciado: {
            contains: idUnico,
          },
        },
      });

      if (existente) {
        console.log(`⏭️  Questão ${questaoJSON.numero} já existe (ID: ${existente.id})`);
        duplicadas++;
        continue;
      }

      // Convert alternativas to array
      const alternativasArray = alternativasParaArray(questaoJSON.alternativas);

      // Convert correta to index
      const corretaIndex = letraParaIndice(questaoJSON.correta);

      // Insert question
      const questao = await prisma.questao.create({
        data: {
          enunciado: questaoJSON.enunciado.trim(),
          alternativas: alternativasArray,
          correta: corretaIndex,
        },
      });

      console.log(
        `✅ Questão ${questaoJSON.numero} inserida (ID: ${questao.id}, Tipo: ${questaoJSON.tipo || 'N/A'}, Correta: ${questaoJSON.correta} = índice ${corretaIndex})`
      );
      inseridas++;

      // Contar por tipo
      const tipo = questaoJSON.tipo || 'real';
      if (tipo in statsPorTipo) {
        statsPorTipo[tipo]++;
      }

    } catch (error: any) {
      console.error(`❌ Erro ao processar questão ${questaoJSON.numero}:`, error.message);
      erros++;
    }
  }

  console.log('\n📊 Resumo do seed:');
  console.log(`   ✅ Inseridas: ${inseridas}`);
  console.log(`   ⏭️  Duplicadas (ignoradas): ${duplicadas}`);
  console.log(`   ❌ Erros: ${erros}`);

  // Mostrar estatísticas por tipo
  if (inseridas > 0) {
    console.log('\n📈 Por tipo:');
    console.log(`   🎯 Reais:      ${statsPorTipo.real}`);
    console.log(`   🔄 Adaptadas:  ${statsPorTipo.adaptada}`);
    console.log(`   🤖 Simuladas:  ${statsPorTipo.simulada}`);
  }
}

/**
 * Main seed function
 */
async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  try {
    // Priority order:
    // 1. MASSIVE JSON (todas_questoes_enem_massivo.json) - Real + Adaptadas + Simuladas
    // 2. Batch ingestion (todas_questoes_enem.json) - Just real questions
    // 3. Example file (exemplo_questoes_enem.json) - 3 sample questions

    const massivoFile = path.resolve(__dirname, '../../backend/enem_ingestion/todas_questoes_enem_massivo.json');
    const batchFile = path.resolve(__dirname, '../../backend/enem_ingestion/todas_questoes_enem.json');
    const exampleFile = path.resolve(__dirname, '../../backend/enem_ingestion/exemplo_questoes_enem.json');

    if (fs.existsSync(massivoFile)) {
      console.log('🎯 DATASET MASSIVO ENCONTRADO!');
      console.log('   Este arquivo contém: Real + Adaptadas + Simuladas\n');
      await seedQuestoesDoArquivo('../../backend/enem_ingestion/todas_questoes_enem_massivo.json');
    } else if (fs.existsSync(batchFile)) {
      console.log('📚 Encontrado arquivo de batch ingestion (apenas questões reais)');
      console.log('💡 Para gerar o dataset massivo completo, execute:');
      console.log('   1. python gerar_questoes_adaptadas.py');
      console.log('   2. python gerar_questoes_sinteticas_10000.py');
      console.log('   3. python merge_massivo.py\n');
      await seedQuestoesDoArquivo('../../backend/enem_ingestion/todas_questoes_enem.json');
    } else if (fs.existsSync(exampleFile)) {
      console.log('📝 Usando arquivo de exemplo (3 questões)');
      console.log('💡 Para gerar o dataset massivo completo:');
      console.log('   1. cd backend/enem_ingestion');
      console.log('   2. python batch_ingest.py  (processa PDFs → questões reais)');
      console.log('   3. python gerar_questoes_adaptadas.py  (gera 7,000 adaptadas)');
      console.log('   4. python gerar_questoes_sinteticas_10000.py  (gera 10,000 simuladas)');
      console.log('   5. python merge_massivo.py  (merge tudo em um JSON)\n');
      await seedQuestoesDoArquivo('../../backend/enem_ingestion/exemplo_questoes_enem.json');
    } else {
      console.error('❌ Nenhum arquivo de questões encontrado!');
      console.error('💡 Siga o guia: backend/enem_ingestion/BATCH_INGESTION_README.md');
      throw new Error('Nenhum arquivo de questões disponível');
    }

    console.log('\n✅ Seed concluído com sucesso!');

  } catch (error: any) {
    console.error('\n❌ Erro durante o seed:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// ============================================================================
// EXECUTE
// ============================================================================

main()
  .catch((error) => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
