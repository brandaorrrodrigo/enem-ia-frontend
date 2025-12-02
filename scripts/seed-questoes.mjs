/**
 * Seed de Questões ENEM - Script ESM
 *
 * Uso: node scripts/seed-questoes.mjs
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

// Converte letra (A-E) para índice (0-4)
function letraParaIndice(letra) {
  const upper = letra.toUpperCase();
  const index = upper.charCodeAt(0) - 65;
  if (index < 0 || index > 4) {
    throw new Error(`Letra inválida: ${letra}`);
  }
  return index;
}

// Converte objeto de alternativas para array
function alternativasParaArray(alternativas) {
  return [
    alternativas.A,
    alternativas.B,
    alternativas.C,
    alternativas.D,
    alternativas.E,
  ];
}

async function seedArquivo(caminho, nome) {
  if (!existsSync(caminho)) {
    console.log(`⚠️  Arquivo não encontrado: ${nome}`);
    return 0;
  }

  console.log(`\n📂 Carregando: ${nome}`);
  const dados = JSON.parse(readFileSync(caminho, 'utf-8'));
  console.log(`   Total no arquivo: ${dados.total_questoes} questões`);

  let inseridas = 0;
  let erros = 0;
  const batchSize = 100;

  for (let i = 0; i < dados.questoes.length; i += batchSize) {
    const batch = dados.questoes.slice(i, i + batchSize);

    for (const q of batch) {
      try {
        const idUnico = q.enunciado.trim().substring(0, 100).toLowerCase();
        const existe = await prisma.questao.findFirst({
          where: { enunciado: { contains: idUnico } }
        });

        if (existe) continue;

        await prisma.questao.create({
          data: {
            enunciado: q.enunciado.trim(),
            alternativas: JSON.stringify(alternativasParaArray(q.alternativas)),
            correta: letraParaIndice(q.correta),
          }
        });

        inseridas++;
      } catch (err) {
        erros++;
      }
    }

    const progresso = Math.min(i + batchSize, dados.questoes.length);
    process.stdout.write(`\r   ⏳ Processando: ${progresso}/${dados.questoes.length} (inseridas: ${inseridas})`);
  }

  console.log(`\n   ✅ Inseridas: ${inseridas} | Erros: ${erros}`);
  return inseridas;
}

async function main() {
  console.log('🌱 Seed de Questões ENEM - Múltiplos Arquivos\n');
  console.log('================================================');

  const existentes = await prisma.questao.count();
  console.log(`📊 Questões já no banco: ${existentes}`);

  let totalInseridas = 0;

  // Arquivo 1: Questões massivas originais
  const arquivo1 = resolve(__dirname, '../../backend/enem_ingestion/todas_questoes_enem_massivo.json');
  totalInseridas += await seedArquivo(arquivo1, 'todas_questoes_enem_massivo.json');

  // Arquivo 2: Questões de alta qualidade geradas
  const arquivo2 = resolve(__dirname, '../../backend/enem_ingestion/questoes_alta_qualidade.json');
  totalInseridas += await seedArquivo(arquivo2, 'questoes_alta_qualidade.json');

  // Resumo final
  console.log('\n================================================');
  console.log(`\n✅ SEED CONCLUÍDO!`);
  console.log(`   📥 Total inseridas nesta execução: ${totalInseridas}`);

  const totalFinal = await prisma.questao.count();
  console.log(`   📊 Total de questões no banco: ${totalFinal}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
