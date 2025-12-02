
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const questoes = [
    {
      disciplina: "matematica",
      enunciado: "Resolva: 2x + 6 = 14",
      alternativas: ["x = 3", "x = 4", "x = 2", "x = 6"],
      correta: 1
    },
    {
      disciplina: "biologia",
      enunciado: "Qual organela é responsável pela produção de energia (ATP)?",
      alternativas: ["Lisossomo", "Ribossomo", "Mitocôndria", "Complexo golgiense"],
      correta: 2
    },
    {
      disciplina: "fisica",
      enunciado: "Qual das leis de Newton descreve a relação F = m . a?",
      alternativas: ["1ª Lei", "2ª Lei", "3ª Lei", "Lei da Gravitação"],
      correta: 1
    }
  ];

  await prisma.questao.createMany({
    data: questoes.map(q => ({
      disciplina: q.disciplina,
      enunciado: q.enunciado,
      alternativas: q.alternativas, // Json aceita array direto
      correta: q.correta
    }))
  });

  console.log("✅ Questões inseridas com sucesso.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
