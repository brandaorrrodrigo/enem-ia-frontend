/**
 * INTEGRADOR DE CONTEÚDO DA BIBLIOTECA
 * Integra todo o conteúdo gerado ao arquivo biblioteca-conteudo.ts
 */

const fs = require('fs');
const path = require('path');

const bibliotecaGeradaDir = path.join(__dirname, '..', 'data', 'biblioteca-gerada');
const bibliotecaConteudoPath = path.join(__dirname, '..', 'data', 'biblioteca-conteudo.ts');

console.log('🚀 Iniciando integração de conteúdo à biblioteca...\n');

// Ler o arquivo biblioteca-conteudo.ts atual
let conteudoAtual = fs.readFileSync(bibliotecaConteudoPath, 'utf8');

// Disciplinas a integrar
const disciplinas = [
  'historia',
  'geografia',
  'sociologia',
  'filosofia',
  'ingles',
  'espanhol',
  'artes'
];

// Para cada disciplina, adicionar o conteúdo
for (const disciplina of disciplinas) {
  const arquivoGerado = path.join(bibliotecaGeradaDir, `${disciplina}-conteudo.ts`);

  if (!fs.existsSync(arquivoGerado)) {
    console.log(`⚠️  Arquivo não encontrado: ${disciplina}-conteudo.ts`);
    continue;
  }

  console.log(`📖 Integrando conteúdo de ${disciplina.toUpperCase()}...`);

  const conteudoGerado = fs.readFileSync(arquivoGerado, 'utf8');

  // Extrair o objeto de conteúdo (tudo entre { e })
  const match = conteudoGerado.match(/export const \w+_CONTEUDO = \{([\s\S]+)\};/);

  if (!match) {
    console.log(`❌ Não foi possível extrair conteúdo de ${disciplina}`);
    continue;
  }

  const conteudoObjeto = match[1].trim();
  const nomeConstante = disciplina.toUpperCase() + '_CONTEUDO';

  // Verificar se já existe uma seção para essa disciplina
  const regexExistente = new RegExp(`export const ${nomeConstante}[\\s\\S]*?\\};`, 'g');

  if (regexExistente.test(conteudoAtual)) {
    console.log(`   ℹ️  ${disciplina} já existe, substituindo...`);
    conteudoAtual = conteudoAtual.replace(
      regexExistente,
      `export const ${nomeConstante}: Record<string, ConteudoModulo> = {\n${conteudoObjeto}\n};`
    );
  } else {
    console.log(`   ✅ Adicionando ${disciplina} ao arquivo...`);
    // Adicionar antes do último export (geralmente no final do arquivo)
    const novaSecao = `\n// =====================================================\n// ${disciplina.toUpperCase()}\n// =====================================================\n\nexport const ${nomeConstante}: Record<string, ConteudoModulo> = {\n${conteudoObjeto}\n};\n`;
    conteudoAtual = conteudoAtual.replace(/(\n\/\/ Fim.*)?$/, novaSecao + '\n');
  }

  console.log(`   ✅ ${disciplina} integrado com sucesso!`);
}

// Salvar o arquivo atualizado
fs.writeFileSync(bibliotecaConteudoPath, conteudoAtual, 'utf8');

console.log('\n✨ Integração concluída com sucesso!');
console.log(`📁 Arquivo atualizado: ${bibliotecaConteudoPath}`);
console.log('\n📊 Resumo:');
disciplinas.forEach(d => {
  const arquivo = path.join(bibliotecaGeradaDir, `${d}-conteudo.ts`);
  if (fs.existsSync(arquivo)) {
    const conteudo = fs.readFileSync(arquivo, 'utf8');
    const matches = conteudo.match(/slug: '/g);
    const numTopicos = matches ? matches.length : 0;
    console.log(`   ${d.padEnd(15)} → ${numTopicos} tópicos`);
  }
});
