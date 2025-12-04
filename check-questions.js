const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const totalQuestoes = await prisma.questao.count();
  console.log('Total de questões no banco:', totalQuestoes);

  const totalSimulados = await prisma.simulado.count();
  console.log('Total de simulados:', totalSimulados);

  // Amostra de questões por área (se houver campo de área)
  const amostra = await prisma.questao.findMany({ take: 5 });
  console.log('\nAmostra de questões:');
  amostra.forEach((q, i) => {
    console.log(`${i+1}. ${q.enunciado.substring(0, 100)}...`);
  });
}

main()
  .catch(e => console.error('Erro:', e.message))
  .finally(() => prisma.$disconnect());
