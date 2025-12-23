import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface TextoMotivador {
  tipo: string;
  fonte: string;
  resumo: string;
}

interface PropostaJSON {
  edicao: string;
  tema: string;
  tipo_texto: string;
  requisitos: string[];
  textos_motivadores: TextoMotivador[];
  orientacoes_especificas?: string[];
}

interface ArquivoJSON {
  propostas_redacao_enem: {
    [ano: string]: PropostaJSON[];
  };
}

async function importarPropostasRedacao() {
  console.log('✍️  Iniciando importação de Propostas de Redação ENEM...\n');

  const filePath = path.join('C:', 'Users', 'NFC', 'Downloads', 'propostas_redacao_enem_1999-2015.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dados: ArquivoJSON = JSON.parse(fileContent);

  let importadas = 0;
  let erros = 0;

  console.log('⏳ Processando propostas...\n');

  for (const [anoStr, propostasData] of Object.entries(dados.propostas_redacao_enem)) {
    const ano = parseInt(anoStr.replace('ano_', ''));

    // Converter para array se for um objeto único
    const propostas = Array.isArray(propostasData) ? propostasData : [propostasData];

    for (const proposta of propostas) {
      // Se não tem campo edicao, definir como "Aplicação única"
      const edicao = proposta.edicao || 'Aplicação única';

      try {
        // Verificar se já existe
        const existente = await prisma.propostaRedacao.findFirst({
          where: {
            ano: ano,
            edicao: edicao,
            tema: proposta.tema
          }
        });

        if (existente) {
          console.log(`⚠️  Duplicada: ${ano} - ${edicao}`);
          continue;
        }

        // Criar proposta
        await prisma.propostaRedacao.create({
          data: {
            ano: ano,
            edicao: edicao,
            tema: proposta.tema,
            tipoTexto: proposta.tipo_texto || 'Dissertativo-argumentativo',
            requisitos: proposta.requisitos || [],
            textosMotivadores: proposta.textos_motivadores || [],
            orientacoesEspecificas: proposta.orientacoes_especificas || null,
            ativo: true
          }
        });

        importadas++;
        console.log(`✅ ${ano} - ${edicao}: "${proposta.tema.substring(0, 50)}..."`);

      } catch (error) {
        erros++;
        console.error(`❌ Erro ao importar ${ano} - ${edicao}:`, error);
        if (erros > 5) break;
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 RESUMO DA IMPORTAÇÃO - PROPOSTAS DE REDAÇÃO');
  console.log('='.repeat(70));
  console.log(`✅ Propostas importadas: ${importadas}`);
  console.log(`❌ Erros: ${erros}`);
  console.log('='.repeat(70));

  // Estatísticas
  const total = await prisma.propostaRedacao.count();
  console.log(`\n✍️  Total de propostas de redação no banco: ${total}`);

  const porAno = await prisma.propostaRedacao.groupBy({
    by: ['ano'],
    _count: { id: true }
  });
  porAno.sort((a, b) => a.ano - b.ano);

  console.log('\n📅 Propostas por ano:');
  porAno.forEach(item => {
    console.log(`   ${item.ano}: ${item._count.id} proposta(s)`);
  });

  console.log('\n✨ Importação concluída!\n');
}

importarPropostasRedacao()
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
