/**
 * Script de Seed para Popular Banco com Questões do ENEM
 *
 * Lê: data/questions.json
 * Insere: Tabela Questao no Prisma
 *
 * Conversões:
 * - alternativas: array ["A", "B", "C", "D", "E"] → Json (direto)
 * - correta: letra "A"-"E" → índice 0-4
 */

import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Converter letra da resposta correta para índice (0-4)
function convertCorretaToIndex(letra: string): number {
  const map: Record<string, number> = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4
  };

  const index = map[letra.toUpperCase()];
  if (index === undefined) {
    throw new Error(`Letra inválida para resposta correta: ${letra}`);
  }

  return index;
}

async function main() {
  console.log('============================================');
  console.log('  🌱 SEED: Populando Banco com Questões ENEM');
  console.log('============================================\n');

  // Ler arquivo questions.json
  const questionsPath = path.join(__dirname, '..', 'data', 'questions.json');

  if (!fs.existsSync(questionsPath)) {
    console.error(`❌ ERRO: Arquivo não encontrado em ${questionsPath}`);
    process.exit(1);
  }

  console.log(`📂 Lendo arquivo: ${questionsPath}\n`);

  const fileContent = fs.readFileSync(questionsPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const questions = data.questions || [];

  console.log(`📊 Total de questões encontradas: ${questions.length}\n`);
  console.log('-------------------------------------------\n');

  // Estatísticas
  let inseridas = 0;
  let duplicadas = 0;
  let erros = 0;

  // Limpar tabela antes de inserir (opcional - descomente se quiser)
  // console.log('🗑️  Limpando tabela Questao...');
  // await prisma.questao.deleteMany({});
  // console.log('✅ Tabela limpa!\n');

  // Processar cada questão
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    try {
      // Converter correta de letra para índice
      const corretaIndex = convertCorretaToIndex(q.correta);

      // Verificar se já existe (evitar duplicatas)
      const existe = await prisma.questao.findFirst({
        where: {
          enunciado: q.enunciado
        }
      });

      if (existe) {
        console.log(`⏭️  [${i + 1}/${questions.length}] Já existe: ${q.id}`);
        duplicadas++;
        continue;
      }

      // Inserir questão
      await prisma.questao.create({
        data: {
          enunciado: q.enunciado,
          alternativas: q.alternativas, // Array direto como Json
          correta: corretaIndex
        }
      });

      console.log(`✅ [${i + 1}/${questions.length}] Inserida: ${q.id} - ${q.tema}`);
      inseridas++;

    } catch (error: any) {
      console.error(`❌ [${i + 1}/${questions.length}] ERRO ao inserir ${q.id}:`, error.message);
      erros++;
    }
  }

  console.log('\n-------------------------------------------');
  console.log('  📊 RESULTADO FINAL');
  console.log('-------------------------------------------');
  console.log(`✅ Inseridas:  ${inseridas}`);
  console.log(`⏭️  Duplicadas: ${duplicadas}`);
  console.log(`❌ Erros:      ${erros}`);
  console.log('-------------------------------------------\n');

  // Verificar total no banco
  const totalNoBanco = await prisma.questao.count();
  console.log(`🗄️  Total de questões no banco: ${totalNoBanco}\n`);

  console.log('🎉 Seed concluído com sucesso!\n');
}

main()
  .catch((e) => {
    console.error('❌ ERRO FATAL durante seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
