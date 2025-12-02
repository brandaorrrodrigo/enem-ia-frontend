/**
 * =============================================================================
 * IMPORTADOR DE QUESTÕES JSONL PARA O BANCO DE DADOS
 * =============================================================================
 *
 * DESCRIÇÃO:
 * ----------
 * Script para importar questões geradas por IA (formato JSONL) para o banco
 * de dados do ENEM-IA usando Prisma.
 *
 * USO:
 * ----
 * node scripts/import-questions-from-jsonl.mjs <arquivo.jsonl>
 *
 * EXEMPLO:
 * --------
 * node scripts/import-questions-from-jsonl.mjs ../backend/questoes_enem_ia.jsonl
 *
 * COMPORTAMENTO:
 * --------------
 * - Lê o arquivo JSONL linha por linha
 * - Valida cada questão antes de inserir
 * - Ignora duplicatas (mesmo enunciado)
 * - Mostra progresso em tempo real
 * - Gera relatório ao final
 *
 * =============================================================================
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const prisma = new PrismaClient();

// =============================================================================
// CONFIGURAÇÕES
// =============================================================================

const BATCH_SIZE = 50; // Inserir em lotes de 50

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Valida se uma questão tem todos os campos necessários
 */
function validateQuestion(q) {
  const required = [
    'area', 'disciplina', 'assunto', 'dificuldade',
    'enunciado', 'alternativas', 'correta', 'explicacao'
  ];

  for (const field of required) {
    if (!(field in q)) {
      return { valid: false, error: `Campo obrigatório ausente: ${field}` };
    }
  }

  // Validar alternativas
  if (typeof q.alternativas !== 'object') {
    return { valid: false, error: 'Alternativas deve ser um objeto' };
  }

  const alternativasKeys = Object.keys(q.alternativas).sort();
  const expectedKeys = ['A', 'B', 'C', 'D', 'E'];

  if (JSON.stringify(alternativasKeys) !== JSON.stringify(expectedKeys)) {
    return { valid: false, error: 'Alternativas deve ter exatamente A, B, C, D, E' };
  }

  // Validar correta
  if (!['A', 'B', 'C', 'D', 'E'].includes(q.correta)) {
    return { valid: false, error: 'Correta deve ser A, B, C, D ou E' };
  }

  // Converter correta de letra para número (0-4)
  const letraParaNumero = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };
  q.correta_numero = letraParaNumero[q.correta];

  return { valid: true };
}

/**
 * Converte questão do formato JSONL para formato do banco
 */
function convertToDatabaseFormat(q) {
  return {
    area: q.area,
    disciplina: q.disciplina,
    assunto: q.assunto,
    dificuldade: q.dificuldade,
    enunciado: q.enunciado,
    textoApoio: q.texto_apoio || '',
    alternativas: JSON.stringify([
      q.alternativas.A,
      q.alternativas.B,
      q.alternativas.C,
      q.alternativas.D,
      q.alternativas.E
    ]),
    correta: q.correta_numero,
    explicacao: q.explicacao || '',
    fonte: q.fonte || 'IA_ENEMIA',
    anoReferencia: q.ano_referencia || null
  };
}

/**
 * Verifica se questão já existe no banco (pelo enunciado)
 */
async function questionExists(enunciado) {
  const existing = await prisma.questao.findFirst({
    where: { enunciado }
  });
  return existing !== null;
}

// =============================================================================
// FUNÇÃO PRINCIPAL
// =============================================================================

async function importQuestions(filePath) {
  console.log('='.repeat(80));
  console.log('📚 IMPORTADOR DE QUESTÕES JSONL PARA BANCO DE DADOS');
  console.log('='.repeat(80));
  console.log();

  // Verificar se arquivo existe
  const absolutePath = resolve(filePath);
  console.log(`📂 Arquivo: ${absolutePath}`);
  console.log();

  let fileContent;
  try {
    fileContent = readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    console.error(`❌ Erro ao ler arquivo: ${error.message}`);
    process.exit(1);
  }

  // Parse JSONL
  const lines = fileContent.split('\n').filter(line => line.trim());
  console.log(`📊 Total de linhas no arquivo: ${lines.length}`);
  console.log();

  const questoes = [];
  const erros = [];

  for (let i = 0; i < lines.length; i++) {
    try {
      const q = JSON.parse(lines[i]);
      const validation = validateQuestion(q);

      if (validation.valid) {
        questoes.push(q);
      } else {
        erros.push({
          linha: i + 1,
          erro: validation.error,
          questao: q.enunciado?.substring(0, 50) || 'N/A'
        });
      }
    } catch (error) {
      erros.push({
        linha: i + 1,
        erro: `JSON inválido: ${error.message}`,
        questao: 'N/A'
      });
    }
  }

  console.log(`✅ Questões válidas: ${questoes.length}`);
  console.log(`⚠️  Questões com erro: ${erros.length}`);
  console.log();

  if (erros.length > 0) {
    console.log('❌ Erros encontrados:');
    erros.slice(0, 10).forEach(e => {
      console.log(`   Linha ${e.linha}: ${e.erro}`);
    });
    if (erros.length > 10) {
      console.log(`   ... e mais ${erros.length - 10} erros`);
    }
    console.log();
  }

  if (questoes.length === 0) {
    console.log('❌ Nenhuma questão válida para importar.');
    return;
  }

  // Confirmar importação
  console.log(`🔄 Preparando para importar ${questoes.length} questões...`);
  console.log();

  // Importar em lotes
  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < questoes.length; i += BATCH_SIZE) {
    const batch = questoes.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(questoes.length / BATCH_SIZE);

    console.log(`📦 Processando lote ${batchNum}/${totalBatches} (${batch.length} questões)...`);

    for (const q of batch) {
      try {
        // Verificar se já existe
        const exists = await questionExists(q.enunciado);

        if (exists) {
          skipped++;
          console.log(`   ⏭️  Questão já existe (pulando): "${q.enunciado.substring(0, 50)}..."`);
          continue;
        }

        // Converter para formato do banco
        const dbQuestion = convertToDatabaseFormat(q);

        // Inserir no banco
        await prisma.questao.create({
          data: dbQuestion
        });

        imported++;
        console.log(`   ✅ Importada: ${q.disciplina} - ${q.assunto}`);

      } catch (error) {
        failed++;
        console.error(`   ❌ Erro ao importar: ${error.message}`);
      }
    }

    console.log();
  }

  // Relatório final
  console.log('='.repeat(80));
  console.log('✅ IMPORTAÇÃO CONCLUÍDA');
  console.log('='.repeat(80));
  console.log();
  console.log('📊 Estatísticas:');
  console.log(`   - Total de questões no arquivo: ${lines.length}`);
  console.log(`   - Questões válidas: ${questoes.length}`);
  console.log(`   - Questões importadas: ${imported}`);
  console.log(`   - Questões duplicadas (puladas): ${skipped}`);
  console.log(`   - Questões com erro: ${erros.length + failed}`);
  console.log();

  // Consultar total no banco
  const totalNoBanco = await prisma.questao.count();
  console.log(`📚 Total de questões agora no banco: ${totalNoBanco}`);
  console.log();
}

// =============================================================================
// EXECUÇÃO
// =============================================================================

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Uso: node import-questions-from-jsonl.mjs <arquivo.jsonl>');
  console.error('Exemplo: node import-questions-from-jsonl.mjs ../backend/questoes_enem_ia.jsonl');
  process.exit(1);
}

const filePath = args[0];

importQuestions(filePath)
  .catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
