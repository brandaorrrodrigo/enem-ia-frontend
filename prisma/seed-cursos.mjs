import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cursos = [
  // USP - Universidade de São Paulo
  { nome: 'Medicina', ies: 'USP', campus: 'São Paulo', turno: 'Integral', notaCorte: 850.0, anoReferencia: 2024 },
  { nome: 'Engenharia da Computação', ies: 'USP', campus: 'São Carlos', turno: 'Integral', notaCorte: 780.0, anoReferencia: 2024 },
  { nome: 'Direito', ies: 'USP', campus: 'São Paulo', turno: 'Matutino', notaCorte: 820.0, anoReferencia: 2024 },
  { nome: 'Arquitetura e Urbanismo', ies: 'USP', campus: 'São Paulo', turno: 'Integral', notaCorte: 790.0, anoReferencia: 2024 },
  { nome: 'Engenharia Civil', ies: 'USP', campus: 'São Paulo', turno: 'Integral', notaCorte: 770.0, anoReferencia: 2024 },

  // UNICAMP - Universidade Estadual de Campinas
  { nome: 'Medicina', ies: 'UNICAMP', campus: 'Campinas', turno: 'Integral', notaCorte: 840.0, anoReferencia: 2024 },
  { nome: 'Ciência da Computação', ies: 'UNICAMP', campus: 'Campinas', turno: 'Integral', notaCorte: 775.0, anoReferencia: 2024 },
  { nome: 'Engenharia Elétrica', ies: 'UNICAMP', campus: 'Campinas', turno: 'Integral', notaCorte: 760.0, anoReferencia: 2024 },
  { nome: 'Odontologia', ies: 'UNICAMP', campus: 'Campinas', turno: 'Integral', notaCorte: 790.0, anoReferencia: 2024 },

  // UFMG - Universidade Federal de Minas Gerais
  { nome: 'Medicina', ies: 'UFMG', campus: 'Belo Horizonte', turno: 'Integral', notaCorte: 835.0, anoReferencia: 2024 },
  { nome: 'Direito', ies: 'UFMG', campus: 'Belo Horizonte', turno: 'Matutino', notaCorte: 750.0, anoReferencia: 2024 },
  { nome: 'Engenharia Mecânica', ies: 'UFMG', campus: 'Belo Horizonte', turno: 'Integral', notaCorte: 730.0, anoReferencia: 2024 },
  { nome: 'Ciências Biológicas', ies: 'UFMG', campus: 'Belo Horizonte', turno: 'Integral', notaCorte: 710.0, anoReferencia: 2024 },

  // UFRJ - Universidade Federal do Rio de Janeiro
  { nome: 'Medicina', ies: 'UFRJ', campus: 'Rio de Janeiro', turno: 'Integral', notaCorte: 830.0, anoReferencia: 2024 },
  { nome: 'Engenharia de Produção', ies: 'UFRJ', campus: 'Rio de Janeiro', turno: 'Integral', notaCorte: 755.0, anoReferencia: 2024 },
  { nome: 'Psicologia', ies: 'UFRJ', campus: 'Rio de Janeiro', turno: 'Integral', notaCorte: 740.0, anoReferencia: 2024 },
  { nome: 'Comunicação Social', ies: 'UFRJ', campus: 'Rio de Janeiro', turno: 'Matutino', notaCorte: 720.0, anoReferencia: 2024 },

  // UnB - Universidade de Brasília
  { nome: 'Medicina', ies: 'UnB', campus: 'Brasília', turno: 'Integral', notaCorte: 825.0, anoReferencia: 2024 },
  { nome: 'Relações Internacionais', ies: 'UnB', campus: 'Brasília', turno: 'Matutino', notaCorte: 765.0, anoReferencia: 2024 },
  { nome: 'Direito', ies: 'UnB', campus: 'Brasília', turno: 'Noturno', notaCorte: 760.0, anoReferencia: 2024 },

  // UFRGS - Universidade Federal do Rio Grande do Sul
  { nome: 'Medicina', ies: 'UFRGS', campus: 'Porto Alegre', turno: 'Integral', notaCorte: 820.0, anoReferencia: 2024 },
  { nome: 'Engenharia da Computação', ies: 'UFRGS', campus: 'Porto Alegre', turno: 'Integral', notaCorte: 745.0, anoReferencia: 2024 },
  { nome: 'Veterinária', ies: 'UFRGS', campus: 'Porto Alegre', turno: 'Integral', notaCorte: 725.0, anoReferencia: 2024 },

  // UFPR - Universidade Federal do Paraná
  { nome: 'Medicina', ies: 'UFPR', campus: 'Curitiba', turno: 'Integral', notaCorte: 815.0, anoReferencia: 2024 },
  { nome: 'Direito', ies: 'UFPR', campus: 'Curitiba', turno: 'Matutino', notaCorte: 735.0, anoReferencia: 2024 },
  { nome: 'Administração', ies: 'UFPR', campus: 'Curitiba', turno: 'Noturno', notaCorte: 690.0, anoReferencia: 2024 },

  // UFC - Universidade Federal do Ceará
  { nome: 'Medicina', ies: 'UFC', campus: 'Fortaleza', turno: 'Integral', notaCorte: 810.0, anoReferencia: 2024 },
  { nome: 'Engenharia Civil', ies: 'UFC', campus: 'Fortaleza', turno: 'Integral', notaCorte: 715.0, anoReferencia: 2024 },
  { nome: 'Ciências Econômicas', ies: 'UFC', campus: 'Fortaleza', turno: 'Noturno', notaCorte: 680.0, anoReferencia: 2024 },

  // UFPE - Universidade Federal de Pernambuco
  { nome: 'Medicina', ies: 'UFPE', campus: 'Recife', turno: 'Integral', notaCorte: 805.0, anoReferencia: 2024 },
  { nome: 'Ciência da Computação', ies: 'UFPE', campus: 'Recife', turno: 'Integral', notaCorte: 740.0, anoReferencia: 2024 },
  { nome: 'Design', ies: 'UFPE', campus: 'Recife', turno: 'Integral', notaCorte: 700.0, anoReferencia: 2024 },

  // Cursos mais acessíveis (notas médias/baixas)
  { nome: 'Pedagogia', ies: 'UFMG', campus: 'Belo Horizonte', turno: 'Noturno', notaCorte: 650.0, anoReferencia: 2024 },
  { nome: 'Letras', ies: 'USP', campus: 'São Paulo', turno: 'Noturno', notaCorte: 670.0, anoReferencia: 2024 },
  { nome: 'Geografia', ies: 'UNICAMP', campus: 'Campinas', turno: 'Noturno', notaCorte: 660.0, anoReferencia: 2024 },
  { nome: 'História', ies: 'UFRJ', campus: 'Rio de Janeiro', turno: 'Noturno', notaCorte: 665.0, anoReferencia: 2024 },
  { nome: 'Matemática', ies: 'UnB', campus: 'Brasília', turno: 'Noturno', notaCorte: 655.0, anoReferencia: 2024 },
  { nome: 'Física', ies: 'UFRGS', campus: 'Porto Alegre', turno: 'Noturno', notaCorte: 645.0, anoReferencia: 2024 },
  { nome: 'Química', ies: 'UFPR', campus: 'Curitiba', turno: 'Noturno', notaCorte: 640.0, anoReferencia: 2024 },
  { nome: 'Sociologia', ies: 'UFC', campus: 'Fortaleza', turno: 'Noturno', notaCorte: 635.0, anoReferencia: 2024 },
];

async function main() {
  console.log('🌱 Iniciando seed de cursos...');

  let criados = 0;
  let existentes = 0;

  for (const curso of cursos) {
    // Verifica se curso já existe
    const existe = await prisma.course.findFirst({
      where: {
        nome: curso.nome,
        ies: curso.ies,
        campus: curso.campus,
      }
    });

    if (!existe) {
      await prisma.course.create({ data: curso });
      criados++;
      console.log(`✅ Criado: ${curso.nome} - ${curso.ies} (${curso.notaCorte})`);
    } else {
      existentes++;
      console.log(`⏭️  Já existe: ${curso.nome} - ${curso.ies}`);
    }
  }

  console.log(`\n✨ Seed concluído!`);
  console.log(`   📝 Cursos criados: ${criados}`);
  console.log(`   ♻️  Cursos existentes: ${existentes}`);
  console.log(`   📊 Total no banco: ${criados + existentes}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
