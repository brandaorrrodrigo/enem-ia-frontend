/**
 * Script para processar resumos e mapas mentais do arquivo ENEM
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de disciplinas
const DISCIPLINA_MAP = {
  'MATEMÁTICA': { slug: 'matematica', nome: 'Matemática', icone: '📐' },
  'FÍSICA': { slug: 'fisica', nome: 'Física', icone: '⚡' },
  'QUÍMICA': { slug: 'quimica', nome: 'Química', icone: '🧪' },
  'BIOLOGIA': { slug: 'biologia', nome: 'Biologia', icone: '🧬' },
  'HISTÓRIA': { slug: 'historia', nome: 'História', icone: '📜' },
  'GEOGRAFIA': { slug: 'geografia', nome: 'Geografia', icone: '🌍' },
  'PORTUGUÊS': { slug: 'portugues', nome: 'Português', icone: '📖' },
  'LITERATURA': { slug: 'literatura', nome: 'Literatura', icone: '📚' },
  'INGLÊS': { slug: 'ingles', nome: 'Inglês', icone: '🇬🇧' },
  'ESPANHOL': { slug: 'espanhol', nome: 'Espanhol', icone: '🇪🇸' },
  'FILOSOFIA': { slug: 'filosofia', nome: 'Filosofia', icone: '💭' },
  'SOCIOLOGIA': { slug: 'sociologia', nome: 'Sociologia', icone: '👥' },
  'ARTES': { slug: 'artes', nome: 'Artes', icone: '🎨' },
  'REDAÇÃO': { slug: 'redacao', nome: 'Redação', icone: '✍️' }
};

function criarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function processarArquivo() {
  const arquivo = 'C:\\Users\\NFC\\Documents\\enem\\RESUMOS + MAPAS MENTAIS (TODAS AS M.txt';
  const conteudo = fs.readFileSync(arquivo, 'utf-8');

  const linhas = conteudo.split('\n');
  const resumos = [];

  let disciplinaAtual = null;
  let topicoAtual = null;
  let resumoTexto = '';
  let mapaMental = '';
  let dentroMapaMental = false;
  let idCounter = 1;

  console.log('🚀 Processando resumos e mapas mentais...\n');

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    // Detectar disciplina
    if (linha.startsWith('=================')) {
      // Próxima linha é a disciplina
      const proximaLinha = linhas[i + 1]?.trim();
      if (proximaLinha && DISCIPLINA_MAP[proximaLinha]) {
        disciplinaAtual = DISCIPLINA_MAP[proximaLinha];
        console.log(`📚 ${disciplinaAtual.nome}`);
      }
      continue;
    }

    // Detectar início de tópico (número seguido de ponto e espaço)
    if (/^\d+\.\s+/.test(linha)) {
      // Salvar tópico anterior se existir
      if (topicoAtual && resumoTexto && disciplinaAtual) {
        resumos.push({
          id: `res-${disciplinaAtual.slug}-${String(idCounter).padStart(3, '0')}`,
          titulo: `${topicoAtual}`,
          tipo: 'resumo',
          disciplina: disciplinaAtual.nome,
          disciplinaSlug: disciplinaAtual.slug,
          tema: topicoAtual,
          slug: criarSlug(topicoAtual),
          descricao: resumoTexto.substring(0, 150) + '...',
          resumo: resumoTexto,
          mapaMental: mapaMental.trim(),
          conteudo: formatarHTML(topicoAtual, resumoTexto, mapaMental),
          icone: disciplinaAtual.icone,
          downloads: Math.floor(Math.random() * 3000) + 500,
          premium: false
        });
        idCounter++;
        console.log(`  ✅ ${topicoAtual}`);
      }

      // Novo tópico
      topicoAtual = linha.replace(/^\d+\.\s+/, '').trim();
      resumoTexto = '';
      mapaMental = '';
      dentroMapaMental = false;
      continue;
    }

    // Detectar resumo
    if (linha.startsWith('Resumo:')) {
      resumoTexto = linha.replace('Resumo:', '').trim();
      continue;
    }

    // Detectar início do mapa mental
    if (linha.startsWith('Mapa Mental:')) {
      dentroMapaMental = true;
      continue;
    }

    // Coletar linhas do mapa mental
    if (dentroMapaMental && linha.startsWith('-')) {
      mapaMental += linha + '\n';
    }
  }

  // Salvar último tópico
  if (topicoAtual && resumoTexto && disciplinaAtual) {
    resumos.push({
      id: `res-${disciplinaAtual.slug}-${String(idCounter).padStart(3, '0')}`,
      titulo: `${topicoAtual}`,
      tipo: 'resumo',
      disciplina: disciplinaAtual.nome,
      disciplinaSlug: disciplinaAtual.slug,
      tema: topicoAtual,
      slug: criarSlug(topicoAtual),
      descricao: resumoTexto.substring(0, 150) + '...',
      resumo: resumoTexto,
      mapaMental: mapaMental.trim(),
      conteudo: formatarHTML(topicoAtual, resumoTexto, mapaMental),
      icone: disciplinaAtual.icone,
      downloads: Math.floor(Math.random() * 3000) + 500,
      premium: false
    });
    console.log(`  ✅ ${topicoAtual}`);
  }

  return resumos;
}

function formatarHTML(titulo, resumo, mapaMental) {
  let html = `<div class="resumo-container max-w-4xl mx-auto p-6">\n`;

  // Título
  html += `  <h1 class="text-4xl font-bold mb-6 text-gray-800 border-b-4 border-blue-500 pb-4">${titulo}</h1>\n\n`;

  // Resumo
  html += `  <div class="resumo-section mb-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">\n`;
  html += `    <h2 class="text-2xl font-semibold mb-4 text-blue-700 flex items-center gap-2">\n`;
  html += `      <span class="text-3xl">📋</span> Resumo\n`;
  html += `    </h2>\n`;
  html += `    <p class="text-lg text-gray-700 leading-relaxed">${resumo}</p>\n`;
  html += `  </div>\n\n`;

  // Mapa Mental
  if (mapaMental) {
    html += `  <div class="mapa-mental-section bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-300">\n`;
    html += `    <h2 class="text-2xl font-semibold mb-4 text-purple-700 flex items-center gap-2">\n`;
    html += `      <span class="text-3xl">🗺️</span> Mapa Mental\n`;
    html += `    </h2>\n`;
    html += `    <div class="mapa-content pl-4">\n`;

    const linhas = mapaMental.split('\n');
    for (const linha of linhas) {
      if (!linha.trim()) continue;

      const nivel = (linha.match(/^(\s*)/)[0].length / 2) || 0;
      const texto = linha.replace(/^[\s-]+/, '').trim();
      const cor = nivel === 0 ? 'text-purple-700 font-bold text-lg' :
                  nivel === 1 ? 'text-blue-600 font-semibold' :
                  'text-gray-600';
      const margem = `ml-${nivel * 6}`;

      html += `      <div class="${margem} ${cor} flex items-start gap-2 mb-2">\n`;
      html += `        <span class="text-purple-500 mt-1">${nivel === 0 ? '●' : '▪'}</span>\n`;
      html += `        <span>${texto}</span>\n`;
      html += `      </div>\n`;
    }

    html += `    </div>\n`;
    html += `  </div>\n`;
  }

  html += `</div>`;
  return html;
}

function gerarArquivoTS(resumos) {
  const conteudo = `/**
 * RESUMOS E MAPAS MENTAIS - ENEM PRO
 * Gerado automaticamente a partir do arquivo oficial
 * Total: ${resumos.length} resumos
 */

export interface ResumoEnem {
  id: string;
  titulo: string;
  tipo: 'resumo';
  disciplina: string;
  disciplinaSlug: string;
  tema: string;
  slug: string;
  descricao: string;
  resumo: string;
  mapaMental: string;
  conteudo: string;
  icone: string;
  downloads: number;
  premium: boolean;
}

export const RESUMOS_ENEM: ResumoEnem[] = ${JSON.stringify(resumos, null, 2)};

export default RESUMOS_ENEM;
`;

  const caminhoArquivo = path.join(__dirname, '..', 'data', 'resumos-enem.ts');
  fs.writeFileSync(caminhoArquivo, conteudo, 'utf-8');
  console.log(`\n✅ Arquivo gerado: data/resumos-enem.ts`);
}

// Executar
const resumos = processarArquivo();

console.log(`\n🎉 Total: ${resumos.length} resumos processados\n`);

// Estatísticas por disciplina
const porDisciplina = {};
for (const resumo of resumos) {
  porDisciplina[resumo.disciplina] = (porDisciplina[resumo.disciplina] || 0) + 1;
}

console.log('📊 Resumos por disciplina:');
for (const [disciplina, count] of Object.entries(porDisciplina)) {
  console.log(`  ${disciplina}: ${count}`);
}

gerarArquivoTS(resumos);
console.log('\n✨ Concluído!');
