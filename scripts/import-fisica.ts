import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface QuestaoJSON {
  numero: number;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  correta: number;
  banca: string;
  ano: number;
  disciplina: string;
  tipo: string;
  fonte?: string;
}

interface ArquivoJSON {
  titulo: string;
  total: number;
  fonte: string;
  observacao?: string;
  questoes: QuestaoJSON[];
}

async function importarFisica() {
  console.log('⚛️  Iniciando importação de questões de Física...\n');

  const filePath = path.join('C:', 'Users', 'NFC', 'Downloads', 'questoes_fisica_419.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dados: ArquivoJSON = JSON.parse(fileContent);

  console.log(`📚 Arquivo: ${dados.titulo}`);
  console.log(`📊 Total de questões: ${dados.total}`);
  console.log(`🔍 Fonte: ${dados.fonte}\n`);

  let importadas = 0;
  let duplicadas = 0;
  let erros = 0;

  for (const questaoData of dados.questoes) {
    try {
      const existente = await prisma.questao.findFirst({
        where: { enunciado: questaoData.enunciado }
      });

      if (existente) {
        duplicadas++;
        continue;
      }

      await prisma.questao.create({
        data: {
          enunciado: questaoData.enunciado,
          alternativas: questaoData.alternativas,
          correta: questaoData.correta,
          gabarito: questaoData.gabarito,
          banca: questaoData.banca,
          ano: questaoData.ano,
          numero: questaoData.numero,
          disciplina: 'Física',
          tipo: questaoData.tipo,
          fonte: dados.fonte
        }
      });

      importadas++;
      if (importadas % 20 === 0) {
        console.log(`✅ ${importadas} questões importadas...`);
      }

    } catch (error) {
      erros++;
      console.error(`❌ Erro:`, error);
      if (erros > 5) break;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO - FÍSICA');
  console.log('='.repeat(60));
  console.log(`✅ Importadas: ${importadas}`);
  console.log(`⚠️  Duplicadas: ${duplicadas}`);
  console.log(`❌ Erros: ${erros}`);
  console.log('='.repeat(60));

  const totalFisica = await prisma.questao.count({
    where: { disciplina: { in: ['Física', 'Fisica'] } }
  });

  console.log(`\n⚛️  Total de Física no banco: ${totalFisica}`);
  console.log('\n✨ Importação concluída!\n');
}

importarFisica()
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
