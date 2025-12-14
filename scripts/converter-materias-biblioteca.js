/**
 * CONVERSOR DE MATÉRIAS PARA BIBLIOTECA ENEM PRO
 * Converte os 18 arquivos txt para o formato TypeScript da biblioteca
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de arquivos para disciplinas
const ARQUIVOS_MAPEAMENTO = {
  1: { disciplina: 'historia', bloco: 1 },
  2: { disciplina: 'geografia', bloco: 2 },
  3: { disciplina: 'historia', bloco: 3 },
  4: { disciplina: 'geografia', bloco: 4 },
  5: { disciplina: 'historia', bloco: 5 },
  6: { disciplina: 'sociologia', bloco: 6 },
  7: { disciplina: 'filosofia', bloco: 7 },
  8: { disciplina: 'sociologia', bloco: 8 },
  9: { disciplina: 'historia', bloco: 9 },
  10: { disciplina: 'geografia', bloco: 10 },
  11: { disciplina: 'historia', bloco: 11 },
  12: { disciplina: 'geografia', bloco: 12 },
  13: { disciplina: 'sociologia', bloco: 13 },
  14: { disciplina: 'ingles', bloco: 14 },
  15: { disciplina: 'espanhol', bloco: 15 },
  16: { disciplina: 'artes', bloco: 16 },
  17: { disciplina: 'ingles', bloco: 17 },
  18: { disciplina: 'espanhol', bloco: 18 },
};

function parsearTopico(conteudo) {
  const linhas = conteudo.split('\n');
  const topico = {
    titulo: '',
    visaoGeral: '',
    topicosChave: [],
    explicacao: '',
    exemploEnem: '',
    questoes: [],
    mapaMental: '',
    resumo: ''
  };

  let secaoAtual = null;
  let questaoAtual = null;

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    // Detectar título do tema
    if (linha.startsWith('TEMA ') && linha.includes('—')) {
      const partes = linha.split('—');
      if (partes[1]) {
        topico.titulo = partes[1].trim();
      }
      continue;
    }

    // Detectar seções
    if (linha.startsWith('1. VISÃO GERAL')) {
      secaoAtual = 'visaoGeral';
      continue;
    }
    if (linha.startsWith('2. TÓPICOS-CHAVE')) {
      secaoAtual = 'topicosChave';
      continue;
    }
    if (linha.startsWith('3. EXPLICAÇÃO')) {
      secaoAtual = 'explicacao';
      continue;
    }
    if (linha.startsWith('4. EXEMPLO') || linha.startsWith('4. EXEMPLOS RESOLVIDOS')) {
      secaoAtual = 'exemploEnem';
      continue;
    }
    if (linha.startsWith('5. QUESTÕES')) {
      secaoAtual = 'questoes';
      continue;
    }
    if (linha.startsWith('6. MINI MAPA MENTAL')) {
      secaoAtual = 'mapaMental';
      continue;
    }
    if (linha.startsWith('7. RESUMO')) {
      secaoAtual = 'resumo';
      continue;
    }

    // Ignorar linhas de separação
    if (linha.startsWith('────')) continue;
    if (linha.length === 0) continue;

    // Processar conteúdo de cada seção
    if (secaoAtual === 'visaoGeral') {
      topico.visaoGeral += linha + ' ';
    } else if (secaoAtual === 'topicosChave' && linha.startsWith('-')) {
      topico.topicosChave.push(linha.substring(1).trim());
    } else if (secaoAtual === 'explicacao') {
      topico.explicacao += linha + ' ';
    } else if (secaoAtual === 'exemploEnem') {
      topico.exemploEnem += linha + ' ';
    } else if (secaoAtual === 'questoes') {
      // Parsear questões
      if (linha.match(/^\d+\)/)) {
        // Nova questão
        if (questaoAtual) {
          topico.questoes.push(questaoAtual);
        }
        questaoAtual = {
          enunciado: linha,
          alternativas: [],
          gabarito: ''
        };
      } else if (linha.match(/^[A-D]\)/)) {
        if (questaoAtual) {
          questaoAtual.alternativas.push(linha);
        }
      } else if (linha.startsWith('Gabarito:')) {
        if (questaoAtual) {
          questaoAtual.gabarito = linha.replace('Gabarito:', '').trim();
          topico.questoes.push(questaoAtual);
          questaoAtual = null;
        }
      }
    } else if (secaoAtual === 'mapaMental') {
      topico.mapaMental += linha + ' ';
    } else if (secaoAtual === 'resumo') {
      topico.resumo += linha + ' ';
    }
  }

  return topico;
}

function extrairTopicos(conteudoArquivo) {
  // Dividir por tema
  const temas = conteudoArquivo.split(/TEMA \d+/).filter(t => t.trim().length > 0);
  const topicos = [];

  // Remover header do arquivo
  let inicio = 0;
  for (let i = 0; i < temas.length; i++) {
    if (temas[i].includes('VISÃO GERAL') || temas[i].includes('1.')) {
      inicio = i;
      break;
    }
  }

  for (let i = inicio; i < temas.length; i++) {
    const topicoTexto = 'TEMA ' + (i - inicio + 1) + temas[i];
    const topicoParsed = parsearTopico(topicoTexto);
    if (topicoParsed.titulo) {
      topicos.push(topicoParsed);
    }
  }

  return topicos;
}

function gerarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function converterParaTypeScript(topico, disciplina) {
  const slug = gerarSlug(topico.titulo);

  const questoesResolvidas = topico.questoes.slice(0, 2).map((q, idx) => ({
    enunciado: q.enunciado,
    alternativas: q.alternativas,
    respostaCorreta: q.gabarito.charCodeAt(0) - 'A'.charCodeAt(0),
    resolucao: topico.exemploEnem || 'Resolução disponível no material completo.'
  }));

  const questoesEnem = topico.questoes.slice(2).map((q, idx) => ({
    enunciado: q.enunciado,
    alternativas: q.alternativas,
    respostaCorreta: q.gabarito.charCodeAt(0) - 'A'.charCodeAt(0),
    dificuldade: idx % 3 === 0 ? 'fácil' : (idx % 3 === 1 ? 'média' : 'difícil')
  }));

  const miniQuiz = topico.questoes.slice(0, 3).map((q, idx) => ({
    pergunta: q.enunciado,
    opcoes: q.alternativas,
    respostaCorreta: q.gabarito.charCodeAt(0) - 'A'.charCodeAt(0),
    explicacao: topico.resumo || topico.visaoGeral,
    dificuldade: 'média'
  }));

  return `
  '${slug}': {
    slug: '${slug}',
    resumo: \`${topico.visaoGeral.trim()}\`,

    explicacao: \`<h2>📚 ${topico.titulo}</h2>

    <h3>🎯 Tópicos-Chave</h3>
    <ul>
      ${topico.topicosChave.map(t => `<li>${t}</li>`).join('\n      ')}
    </ul>

    <h3>💡 Explicação Detalhada</h3>
    <p>${topico.explicacao.trim()}</p>

    <h3>📝 Exemplo ENEM</h3>
    <p>${topico.exemploEnem.trim()}</p>\`,

    exemplos: [
      \`<strong>Contexto ENEM:</strong><br>${topico.exemploEnem.trim()}\`
    ],

    memorizacao: [
      ${topico.topicosChave.slice(0, 5).map(t => `'${t}'`).join(',\n      ')}
    ],

    errosComuns: [],

    questoesResolvidas: ${JSON.stringify(questoesResolvidas, null, 2)},

    questoesEnem: ${JSON.stringify(questoesEnem, null, 2)},

    mapaMental: {
      titulo: '${topico.titulo}',
      topicos: [
        {
          titulo: 'Conceitos Principais',
          subtopicos: [
            ${topico.topicosChave.slice(0, 4).map(t => `'${t}'`).join(',\n            ')}
          ]
        }
      ]
    },

    miniQuiz: {
      questoes: ${JSON.stringify(miniQuiz, null, 2)}
    }
  }`;
}

function processarArquivo(numeroArquivo) {
  const caminhoArquivo = path.join(
    'C:', 'Users', 'NFC', 'Documents', 'materias para biblioteca',
    `matérias para biblioteca ENEM ${numeroArquivo}.txt`
  );

  console.log(`\n📖 Processando arquivo ${numeroArquivo}...`);

  try {
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
    const info = ARQUIVOS_MAPEAMENTO[numeroArquivo];

    if (!info) {
      console.log(`⚠️  Arquivo ${numeroArquivo} não mapeado.`);
      return null;
    }

    const topicos = extrairTopicos(conteudo);
    console.log(`✅ Extraídos ${topicos.length} tópicos do bloco ${info.bloco} (${info.disciplina})`);

    const codigoTS = topicos.map(t => converterParaTypeScript(t, info.disciplina)).join(',\n');

    return {
      disciplina: info.disciplina,
      bloco: info.bloco,
      topicos: topicos,
      codigoTS: codigoTS
    };
  } catch (error) {
    console.error(`❌ Erro ao processar arquivo ${numeroArquivo}:`, error.message);
    return null;
  }
}

// EXECUTAR CONVERSÃO
console.log('🚀 Iniciando conversão das matérias para biblioteca ENEM PRO...\n');

const resultados = {};
for (let i = 1; i <= 18; i++) {
  const resultado = processarArquivo(i);
  if (resultado) {
    if (!resultados[resultado.disciplina]) {
      resultados[resultado.disciplina] = [];
    }
    resultados[resultado.disciplina].push(resultado);
  }
}

// Gerar arquivos de saída por disciplina
const outputDir = path.join(__dirname, '..', 'data', 'biblioteca-gerada');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('\n📝 Gerando arquivos TypeScript...\n');

for (const [disciplina, blocos] of Object.entries(resultados)) {
  const nomeArquivo = `${disciplina}-conteudo.ts`;
  const caminhoSaida = path.join(outputDir, nomeArquivo);

  const codigo = `// Conteúdo gerado automaticamente para ${disciplina.toUpperCase()}
// ${blocos.reduce((total, b) => total + b.topicos.length, 0)} tópicos

export const ${disciplina.toUpperCase()}_CONTEUDO = {
${blocos.map(b => b.codigoTS).join(',\n')}
};
`;

  fs.writeFileSync(caminhoSaida, codigo, 'utf8');
  console.log(`✅ Gerado: ${nomeArquivo} (${blocos.reduce((t, b) => t + b.topicos.length, 0)} tópicos)`);
}

console.log('\n✨ Conversão concluída com sucesso!');
console.log(`📁 Arquivos salvos em: ${outputDir}`);
