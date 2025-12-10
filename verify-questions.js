/**
 * Script para verificar questões inseridas no banco
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('============================================');
  console.log('  🔍 VERIFICAÇÃO: Questões no Banco');
  console.log('============================================\n');

  // Contar total
  const total = await prisma.questao.count();
  console.log(`📊 Total de questões: ${total}\n`);

  // Buscar primeiras 3 questões
  console.log('📝 Amostra das 3 primeiras questões:\n');

  const primeiras = await prisma.questao.findMany({
    take: 3,
    orderBy: { id: 'asc' }
  });

  primeiras.forEach((q, idx) => {
    console.log(`\n[Questão ${idx + 1}]`);
    console.log(`ID: ${q.id}`);
    console.log(`Enunciado: ${q.enunciado.substring(0, 80)}...`);
    console.log(`Alternativas: ${JSON.stringify(q.alternativas)}`);
    console.log(`Correta (índice): ${q.correta}`);
  });

  console.log('\n============================================');
  console.log('  ✅ Verificação concluída!');
  console.log('============================================\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
