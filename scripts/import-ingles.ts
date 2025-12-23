import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface QuestaoInglesJSON {
  numero: number;
  ano: string;
  texto_apoio?: string;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  resposta_correta: string;
}

interface ArquivoJSON {
  titulo: string;
  total_questoes: number;
  fonte: string;
  questoes: QuestaoInglesJSON[];
}

async function importarQuestoesIngles() {
  console.log('🇬🇧 Iniciando importação de questões de Inglês...\n');

  const filePath = path.join('C:', 'Users', 'NFC', 'Downloads', 'enem_ingles_2010_2018.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dados: ArquivoJSON = JSON.parse(fileContent);

  console.log(`📚 Arquivo: ${dados.titulo}`);
  console.log(`📊 Total de questões: ${dados.total_questoes}`);
  console.log(`🔍 Fonte: ${dados.fonte}\n`);

  let importadas = 0;
  let duplicadas = 0;
  let erros = 0;

  console.log('⏳ Processando questões de inglês...\n');

  for (const questaoData of dados.questoes) {
    try {
      // Converter alternativas de objeto para array
      const alternativasArray = [
        questaoData.alternativas.A,
        questaoData.alternativas.B,
        questaoData.alternativas.C,
        questaoData.alternativas.D,
        questaoData.alternativas.E
      ];

      // Determinar índice da resposta correta (A=0, B=1, C=2, D=3, E=4)
      const gabarito = questaoData.resposta_correta;
      const corretaIndex = gabarito.charCodeAt(0) - 'A'.charCodeAt(0);

      // Montar enunciado completo (com texto de apoio se existir)
      let enunciadoCompleto = questaoData.enunciado;
      if (questaoData.texto_apoio) {
        enunciadoCompleto = `${questaoData.texto_apoio}\n\n${questaoData.enunciado}`;
      }

      // Verificar duplicata
      const existente = await prisma.questao.findFirst({
        where: {
          enunciado: enunciadoCompleto
        }
      });

      if (existente) {
        duplicadas++;
        if (duplicadas <= 3) {
          console.log(`⚠️  Duplicada: Questão ${questaoData.numero} (${questaoData.ano})`);
        }
        continue;
      }

      // Extrair ano numérico
      const anoNumerico = parseInt(questaoData.ano.split('.')[0]);

      // Criar questão
      await prisma.questao.create({
        data: {
          enunciado: enunciadoCompleto,
          alternativas: alternativasArray,
          correta: corretaIndex,
          gabarito: gabarito,
          banca: 'ENEM',
          ano: anoNumerico,
          numero: questaoData.numero,
          disciplina: 'Inglês',
          tipo: 'oficial',
          fonte: dados.fonte
        }
      });

      importadas++;

      if (importadas % 25 === 0) {
        console.log(`✅ ${importadas} questões importadas...`);
      }

    } catch (error) {
      erros++;
      console.error(`❌ Erro ao importar questão ${questaoData.numero}:`, error);
      if (erros > 5) break;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA IMPORTAÇÃO - INGLÊS');
  console.log('='.repeat(60));
  console.log(`✅ Questões importadas: ${importadas}`);
  console.log(`⚠️  Questões duplicadas: ${duplicadas}`);
  console.log(`❌ Erros: ${erros}`);
  console.log('='.repeat(60));

  // Estatística de inglês
  const totalIngles = await prisma.questao.count({
    where: { disciplina: 'Inglês' }
  });

  console.log(`\n🇬🇧 Total de questões de Inglês no banco: ${totalIngles}`);
  console.log('\n✨ Importação concluída!\n');
}

importarQuestoesIngles()
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
