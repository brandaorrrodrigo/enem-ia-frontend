/**
 * Seed de Questões ENEM V2 - Massivo
 *
 * Uso: node scripts/seed-questoes-v2.mjs
 */

import { PrismaClient } from '@prisma/client';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

function letraParaIndice(letra) {
  const upper = letra.toUpperCase();
  const index = upper.charCodeAt(0) - 65;
  if (index < 0 || index > 4) {
    throw new Error(`Letra inválida: ${letra}`);
  }
  return index;
}

function alternativasParaArray(alternativas) {
  return [
    alternativas.A,
    alternativas.B,
    alternativas.C,
    alternativas.D,
    alternativas.E,
  ];
}

// Gera hash único do enunciado
function hashEnunciado(enunciado) {
  let hash = 0;
  const str = enunciado.toLowerCase().replace(/\s+/g, ' ').trim();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
}

async function main() {
  console.log('🌱 Seed de Questões ENEM V2 - Massivo\n');
  console.log('================================================');

  const existentes = await prisma.questao.count();
  console.log(`📊 Questões já no banco: ${existentes}`);

  const arquivo = resolve(__dirname, '../../backend/enem_ingestion/questoes_v2_massivo.json');

  if (!existsSync(arquivo)) {
    console.log('⚠️  Arquivo não encontrado! Execute primeiro:');
    console.log('   node scripts/gerar-questoes-v2.mjs');
    process.exit(1);
  }

  console.log(`\n📂 Carregando: questoes_v2_massivo.json`);
  const dados = JSON.parse(readFileSync(arquivo, 'utf-8'));
  console.log(`   Total no arquivo: ${dados.total_questoes} questões\n`);

  // Carregar hashes existentes
  console.log('📋 Carregando questões existentes para verificar duplicatas...');
  const todasExistentes = await prisma.questao.findMany({
    select: { enunciado: true }
  });

  const hashesExistentes = new Set(
    todasExistentes.map(q => hashEnunciado(q.enunciado))
  );
  console.log(`   ${hashesExistentes.size} hashes de questões existentes\n`);

  let inseridas = 0;
  let duplicadas = 0;
  let erros = 0;
  const batchSize = 50;

  for (let i = 0; i < dados.questoes.length; i += batchSize) {
    const batch = dados.questoes.slice(i, i + batchSize);
    const questoesParaInserir = [];

    for (const q of batch) {
      const hash = hashEnunciado(q.enunciado);

      if (hashesExistentes.has(hash)) {
        duplicadas++;
        continue;
      }

      hashesExistentes.add(hash);

      questoesParaInserir.push({
        enunciado: q.enunciado.trim(),
        alternativas: JSON.stringify(alternativasParaArray(q.alternativas)),
        correta: letraParaIndice(q.correta),
      });
    }

    // Inserir uma por uma (SQLite tem limitações com createMany)
    for (const q of questoesParaInserir) {
      try {
        await prisma.questao.create({ data: q });
        inseridas++;
      } catch (err) {
        erros++;
      }
    }

    const progresso = Math.min(i + batchSize, dados.questoes.length);
    process.stdout.write(`\r   ⏳ Processando: ${progresso}/${dados.questoes.length} (inseridas: ${inseridas}, duplicadas: ${duplicadas})`);
  }

  console.log(`\n\n   ✅ Inseridas: ${inseridas}`);
  console.log(`   🔄 Duplicadas ignoradas: ${duplicadas}`);
  console.log(`   ❌ Erros: ${erros}`);

  console.log('\n================================================');
  console.log(`\n✅ SEED CONCLUÍDO!`);

  const totalFinal = await prisma.questao.count();
  console.log(`   📊 Total de questões no banco: ${totalFinal}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
