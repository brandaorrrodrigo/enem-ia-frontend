/**
 * CORRETOR DE DUPLICAÇÕES NA BIBLIOTECA
 * Corrige slugs duplicados adicionando sufixos numéricos
 */

const fs = require('fs');
const path = require('path');

const bibliotecaConteudoPath = path.join(__dirname, '..', 'data', 'biblioteca-conteudo.ts');

console.log('🔧 Corrigindo duplicações de slugs...\n');

let conteudo = fs.readFileSync(bibliotecaConteudoPath, 'utf8');

// Encontrar todas as seções de disciplinas
const disciplinas = [
  'HISTORIA',
  'GEOGRAFIA',
  'SOCIOLOGIA',
  'FILOSOFIA',
  'INGLES',
  'ESPANHOL',
  'ARTES'
];

for (const disciplina of disciplinas) {
  console.log(`📖 Processando ${disciplina}...`);

  // Extrair a seção da disciplina
  const regexSecao = new RegExp(
    `export const ${disciplina}_CONTEUDO[\\s\\S]*?= \\{([\\s\\S]+?)\\n\\};`,
    'g'
  );

  const match = regexSecao.exec(conteudo);

  if (!match) {
    console.log(`   ⚠️  Seção não encontrada`);
    continue;
  }

  const secaoInicio = match.index;
  const secaoCompleta = match[0];
  const secaoConteudo = match[1];

  // Encontrar todos os slugs na seção
  const regexSlug = /'([a-z0-9-]+)':\s*\{/g;
  const slugs = [];
  let slugMatch;

  while ((slugMatch = regexSlug.exec(secaoConteudo)) !== null) {
    slugs.push({
      slug: slugMatch[1],
      posicao: slugMatch.index
    });
  }

  console.log(`   Encontrados ${slugs.length} módulos`);

  // Detectar duplicações
  const slugCounts = {};
  const duplicados = new Set();

  for (const item of slugs) {
    slugCounts[item.slug] = (slugCounts[item.slug] || 0) + 1;
    if (slugCounts[item.slug] > 1) {
      duplicados.add(item.slug);
    }
  }

  if (duplicados.size === 0) {
    console.log(`   ✅ Nenhuma duplicação encontrada`);
    continue;
  }

  console.log(`   ⚠️  Encontradas ${duplicados.size} duplicações: ${Array.from(duplicados).join(', ')}`);

  // Corrigir duplicações
  let secaoCorrigida = secaoCompleta;
  const contadores = {};

  for (const slugDuplicado of duplicados) {
    contadores[slugDuplicado] = 0;

    // Substituir cada ocorrência com sufixo numérico
    const regexDuplicado = new RegExp(`'(${slugDuplicado})':\\s*\\{([\\s\\S]*?)slug:\\s*'${slugDuplicado}'`, 'g');

    secaoCorrigida = secaoCorrigida.replace(regexDuplicado, (match, slugKey, conteudoInterno) => {
      contadores[slugDuplicado]++;
      const sufixo = contadores[slugDuplicado];

      if (sufixo === 1) {
        // Primeira ocorrência, não adicionar sufixo
        return match;
      }

      // Ocorrências subsequentes, adicionar sufixo
      const novoSlug = `${slugDuplicado}-${sufixo}`;
      return match
        .replace(`'${slugDuplicado}':`, `'${novoSlug}':`)
        .replace(`slug: '${slugDuplicado}'`, `slug: '${novoSlug}'`);
    });

    console.log(`   ✅ Corrigido: ${slugDuplicado} (${slugCounts[slugDuplicado]} ocorrências)`);
  }

  // Substituir a seção no conteúdo completo
  conteudo = conteudo.substring(0, secaoInicio) + secaoCorrigida + conteudo.substring(secaoInicio + secaoCompleta.length);
}

// Salvar arquivo corrigido
fs.writeFileSync(bibliotecaConteudoPath, conteudo, 'utf8');

console.log('\n✨ Correção concluída com sucesso!');
console.log(`📁 Arquivo atualizado: ${bibliotecaConteudoPath}`);
