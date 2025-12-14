/**
 * Script para extrair resumos dos arquivos TXT e gerar páginas de resumos
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de disciplinas
const DISCIPLINAS = {
  'HISTÓRIA': 'historia',
  'GEOGRAFIA': 'geografia',
  'SOCIOLOGIA': 'sociologia',
  'FILOSOFIA': 'filosofia',
  'LÍNGUA INGLESA (ENEM)': 'ingles',
  'LÍNGUA ESPANHOLA (ENEM)': 'espanhol',
  'ARTES (ENEM)': 'artes'
};

// Ícones por disciplina
const ICONES = {
  'historia': '📜',
  'geografia': '🌍',
  'sociologia': '👥',
  'filosofia': '💭',
  'ingles': '🇬🇧',
  'espanhol': '🇪🇸',
  'artes': '🎨'
};

// Função para criar slug
function criarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Função para parsear um tema do arquivo TXT
function parsearTema(textoTema) {
  const linhas = textoTema.split('\n');

  // Extrair título
  const linhaTitulo = linhas.find(l => l.startsWith('TEMA'));
  if (!linhaTitulo) return null;

  const titulo = linhaTitulo.replace(/^TEMA \d+ — /, '').trim();
  const slug = criarSlug(titulo);

  // Extrair seções para o resumo
  const tema = {
    titulo,
    slug,
    visaoGeral: '',
    topicosChave: [],
    explicacao: '',
    mapaMental: ''
  };

  let secaoAtual = '';

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    if (linha.startsWith('1.') && linha.includes('VISÃO GERAL')) {
      secaoAtual = 'visaoGeral';
      continue;
    } else if (linha.startsWith('2.') && (linha.includes('TÓPICOS') || linha.includes('TOPICOS'))) {
      secaoAtual = 'topicosChave';
      continue;
    } else if (linha.startsWith('3.') && linha.includes('EXPLICAÇÃO')) {
      secaoAtual = 'explicacao';
      continue;
    } else if (linha.startsWith('4.') || linha.startsWith('5.')) {
      secaoAtual = 'outros';
      continue;
    } else if (linha.startsWith('6.') && linha.includes('MAPA MENTAL')) {
      secaoAtual = 'mapaMental';
      continue;
    } else if (linha.startsWith('────') || (linha.startsWith('TEMA') && i > 5)) {
      break;
    }

    // Processar conteúdo de cada seção
    if (secaoAtual === 'visaoGeral' && linha) {
      tema.visaoGeral += linha + ' ';
    } else if (secaoAtual === 'topicosChave' && linha) {
      if (linha.startsWith('-') || linha.startsWith('•')) {
        tema.topicosChave.push(linha.replace(/^[-•]\s*/, ''));
      }
    } else if (secaoAtual === 'explicacao' && linha) {
      tema.explicacao += linha + ' ';
    } else if (secaoAtual === 'mapaMental' && linha) {
      tema.mapaMental += linha + '\n';
    }
  }

  tema.visaoGeral = tema.visaoGeral.trim();
  tema.explicacao = tema.explicacao.trim();
  tema.mapaMental = tema.mapaMental.trim();

  // Debug
  // console.log(`DEBUG ${tema.titulo}:`, {
  //   visaoGeral: tema.visaoGeral.length,
  //   topicos: tema.topicosChave.length,
  //   explicacao: tema.explicacao.length
  // });

  // Criar resumo combinado
  const temConteudo = tema.visaoGeral || tema.topicosChave.length > 0 || tema.explicacao;

  if (!temConteudo) {
    console.log(`    ⚠️  Tema "${tema.titulo}" sem conteúdo extraído`);
  }

  return temConteudo ? tema : null;
}

// Processar todos os arquivos TXT
function processarArquivos() {
  const pastaMaterias = 'C:\\Users\\NFC\\Documents\\materias para biblioteca';
  const arquivos = fs.readdirSync(pastaMaterias).filter(f => f.endsWith('.txt'));

  const todosResumos = [];
  let idCounter = 1;

  console.log('🚀 Iniciando extração de resumos...\n');

  for (const arquivo of arquivos) {
    const caminhoCompleto = path.join(pastaMaterias, arquivo);
    const conteudo = fs.readFileSync(caminhoCompleto, 'utf-8');

    // Extrair disciplina do cabeçalho
    const linhas = conteudo.split('\n');
    const linhaDisciplina = linhas.find(l =>
      Object.keys(DISCIPLINAS).some(d => l.includes(d))
    );

    if (!linhaDisciplina) {
      console.log(`⚠️  Disciplina não encontrada em ${arquivo}`);
      continue;
    }

    let disciplinaNome = '';
    let disciplinaSlug = '';
    for (const [nome, slug] of Object.entries(DISCIPLINAS)) {
      if (linhaDisciplina.includes(nome)) {
        disciplinaNome = nome;
        disciplinaSlug = slug;
        break;
      }
    }

    console.log(`📚 Processando: ${disciplinaNome} (${arquivo})`);

    // Separar temas
    const separador = '────────────────────────────────';
    const blocos = conteudo.split(separador).filter(b => b.trim());

    let countResumos = 0;
    console.log(`  📊 Total de blocos encontrados: ${blocos.length}`);

    for (const textoTema of blocos) {
      if (!textoTema.includes('TEMA ')) {
        console.log(`  ⚠️  Bloco sem TEMA ignorado`);
        continue;
      }

      const tema = parsearTema(textoTema);
      if (!tema) {
        console.log(`  ⚠️  Tema não parseado corretamente`);
        continue;
      }

      console.log(`  ✓ Tema encontrado: ${tema.titulo}`);

      // Criar descrição a partir da visão geral ou explicação
      const descricao = (tema.visaoGeral || tema.explicacao).substring(0, 150) + '...';

      // Formatar resumo em HTML
      const resumoHTML = formatarResumoHTML(tema);

      todosResumos.push({
        id: `res-${disciplinaSlug}-${String(idCounter).padStart(3, '0')}`,
        titulo: `Resumo - ${tema.titulo}`,
        tipo: 'resumo',
        disciplina: disciplinaNome,
        disciplinaSlug: disciplinaSlug,
        tema: tema.titulo,
        slug: tema.slug,
        descricao: descricao,
        conteudo: resumoHTML,
        icone: ICONES[disciplinaSlug] || '📝',
        downloads: Math.floor(Math.random() * 3000) + 500,
        premium: false
      });

      idCounter++;
      countResumos++;
    }

    console.log(`  ✅ ${countResumos} resumos extraídos\n`);
  }

  return todosResumos;
}

// Formatar resumo em HTML
function formatarResumoHTML(tema) {
  let html = `<div class="resumo-conteudo p-6 bg-white rounded-lg shadow-lg">\n`;
  html += `  <h2 class="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-3">${tema.titulo}</h2>\n\n`;

  // Visão Geral
  if (tema.visaoGeral) {
    html += `  <div class="mb-6">\n`;
    html += `    <h3 class="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2">\n`;
    html += `      <span class="text-2xl">📋</span> Visão Geral\n`;
    html += `    </h3>\n`;
    html += `    <p class="text-gray-700 leading-relaxed">${tema.visaoGeral}</p>\n`;
    html += `  </div>\n\n`;
  }

  // Tópicos-Chave
  if (tema.topicosChave.length > 0) {
    html += `  <div class="mb-6">\n`;
    html += `    <h3 class="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2">\n`;
    html += `      <span class="text-2xl">🎯</span> Tópicos-Chave\n`;
    html += `    </h3>\n`;
    html += `    <ul class="space-y-2">\n`;
    for (const topico of tema.topicosChave) {
      html += `      <li class="flex items-start gap-2">\n`;
      html += `        <span class="text-blue-500 mt-1">▪</span>\n`;
      html += `        <span class="text-gray-700">${topico}</span>\n`;
      html += `      </li>\n`;
    }
    html += `    </ul>\n`;
    html += `  </div>\n\n`;
  }

  // Explicação
  if (tema.explicacao) {
    html += `  <div class="mb-6">\n`;
    html += `    <h3 class="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2">\n`;
    html += `      <span class="text-2xl">💡</span> Explicação Detalhada\n`;
    html += `    </h3>\n`;
    html += `    <p class="text-gray-700 leading-relaxed">${tema.explicacao}</p>\n`;
    html += `  </div>\n\n`;
  }

  // Mapa Mental
  if (tema.mapaMental) {
    html += `  <div class="mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">\n`;
    html += `    <h3 class="text-xl font-semibold mb-3 text-blue-600 flex items-center gap-2">\n`;
    html += `      <span class="text-2xl">🗺️</span> Mapa Mental\n`;
    html += `    </h3>\n`;
    html += `    <pre class="text-gray-700 font-mono text-sm whitespace-pre-wrap">${tema.mapaMental}</pre>\n`;
    html += `  </div>\n`;
  }

  html += `</div>`;
  return html;
}

// Gerar arquivo TypeScript
function gerarArquivoTS(resumos) {
  const conteudo = `/**
 * RESUMOS AUTOMÁTICOS - GERADOS A PARTIR DOS ARQUIVOS TXT
 * Total de ${resumos.length} resumos
 */

export interface Resumo {
  id: string;
  titulo: string;
  tipo: 'resumo';
  disciplina: string;
  disciplinaSlug: string;
  tema: string;
  slug: string;
  descricao: string;
  conteudo: string;
  icone: string;
  downloads: number;
  premium: boolean;
}

export const RESUMOS: Resumo[] = ${JSON.stringify(resumos, null, 2)};

export default RESUMOS;
`;

  const caminhoArquivo = path.join(__dirname, '..', 'data', 'resumos-gerados.ts');
  fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8');
  console.log(`\n✅ Arquivo gerado: data/resumos-gerados.ts`);
}

// Executar
const resumos = processarArquivos();
console.log(`\n🎉 Total de resumos gerados: ${resumos.length}`);

gerarArquivoTS(resumos);

console.log(`\n📊 Resumos por disciplina:`);
const porDisciplina = {};
for (const resumo of resumos) {
  porDisciplina[resumo.disciplina] = (porDisciplina[resumo.disciplina] || 0) + 1;
}
for (const [disciplina, count] of Object.entries(porDisciplina)) {
  console.log(`  ${disciplina}: ${count} resumos`);
}
