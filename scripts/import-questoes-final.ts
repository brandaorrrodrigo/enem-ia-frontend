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
  fonte: string;
}

interface ArquivoJSON {
  titulo: string;
  total: number;
  fonte: string;
  observacao: string;
  questoes: QuestaoJSON[];
}

async function importarQuestoes() {
  console.log('🚀 Iniciando importação de questões ENEM...\n');

  // Ler arquivo JSON
  const filePath = path.join('C:', 'Users', 'NFC', 'Downloads', 'questoes_FINAL_COMPLETO.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dados: ArquivoJSON = JSON.parse(fileContent);

  console.log(`📚 Arquivo: ${dados.titulo}`);
  console.log(`📊 Total de questões: ${dados.total}`);
  console.log(`🔍 Fonte: ${dados.fonte}`);
  console.log(`📝 Observação: ${dados.observacao}\n`);

  let importadas = 0;
  let duplicadas = 0;
  let erros = 0;

  console.log('⏳ Processando questões...\n');

  for (const [index, questaoData] of dados.questoes.entries()) {
    try {
      // Verificar se já existe uma questão com o mesmo enunciado
      const existente = await prisma.questao.findFirst({
        where: {
          enunciado: questaoData.enunciado
        }
      });

      if (existente) {
        duplicadas++;
        if (duplicadas <= 5) {
          console.log(`⚠️  Duplicada: Questão ${questaoData.numero} (${questaoData.ano}) - já existe no banco`);
        }
        continue;
      }

      // Criar questão no banco
      await prisma.questao.create({
        data: {
          enunciado: questaoData.enunciado,
          alternativas: questaoData.alternativas,
          correta: questaoData.correta,
          gabarito: questaoData.gabarito,
          banca: questaoData.banca,
          ano: questaoData.ano,
          numero: questaoData.numero,
          disciplina: questaoData.disciplina,
          tipo: questaoData.tipo,
          fonte: questaoData.fonte
        }
      });

      importadas++;

      // Mostrar progresso a cada 50 questões
      if (importadas % 50 === 0) {
        console.log(`✅ ${importadas} questões importadas até agora...`);
      }

    } catch (error) {
      erros++;
      console.error(`❌ Erro ao importar questão ${questaoData.numero}:`, error);

      // Parar se houver muitos erros
      if (erros > 10) {
        console.error('\n🛑 Muitos erros encontrados. Interrompendo importação.');
        break;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA IMPORTAÇÃO');
  console.log('='.repeat(60));
  console.log(`✅ Questões importadas: ${importadas}`);
  console.log(`⚠️  Questões duplicadas: ${duplicadas}`);
  console.log(`❌ Erros: ${erros}`);
  console.log(`📝 Total processadas: ${dados.questoes.length}`);
  console.log('='.repeat(60));

  // Estatísticas do banco
  console.log('\n📈 ESTATÍSTICAS DO BANCO DE DADOS:');

  const totalQuestoes = await prisma.questao.count();
  console.log(`\n📚 Total de questões no banco: ${totalQuestoes}`);

  // Contagem por ano
  const porAno = await prisma.questao.groupBy({
    by: ['ano'],
    _count: {
      id: true
    }
  });
  porAno.sort((a, b) => a.ano - b.ano);

  console.log('\n📅 Questões por ano:');
  porAno.forEach(item => {
    console.log(`   ${item.ano}: ${item._count.id} questões`);
  });

  // Contagem por disciplina
  const porDisciplina = await prisma.questao.groupBy({
    by: ['disciplina'],
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    }
  });

  console.log('\n📚 Questões por disciplina:');
  porDisciplina.forEach(item => {
    console.log(`   ${item.disciplina || 'Sem disciplina'}: ${item._count.id} questões`);
  });

  console.log('\n✨ Importação concluída!\n');
}

// Executar importação
importarQuestoes()
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
