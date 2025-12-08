const fs = require('fs');
const path = require('path');

function getAllPages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllPages(filePath));
    } else if (file === 'page.tsx') {
      results.push(filePath);
    }
  });
  return results;
}

const pages = getAllPages(path.join(process.cwd(), 'app/enem'));
let fixed = 0;

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Skip se não tem import do FloatingBackButton
  if (!content.includes("import FloatingBackButton from '@/components/FloatingBackButton'")) {
    return;
  }

  // Skip se já tem no último return (return principal)
  // Procura o último "return (" e verifica se tem FloatingBackButton logo após
  const lastReturnIndex = content.lastIndexOf('return (');
  if (lastReturnIndex === -1) return;

  const afterLastReturn = content.substring(lastReturnIndex, lastReturnIndex + 500);

  // Verifica se já tem FloatingBackButton nas primeiras linhas do return
  if (afterLastReturn.includes('<FloatingBackButton')) {
    return;
  }

  // Adiciona FloatingBackButton após a primeira tag de abertura do último return
  // Padrão: return (\n    <div...> ou return (\n    <>
  const patterns = [
    /(return \(\s*\n\s*)(<(?:div|main|section)[^>]*>)/g,
    /(return \(\s*\n\s*)(<>)/g
  ];

  let modified = false;

  for (const pattern of patterns) {
    // Encontra todas as matches
    let match;
    let lastMatch = null;
    const regex = new RegExp(pattern.source, 'g');

    while ((match = regex.exec(content)) !== null) {
      lastMatch = match;
    }

    if (lastMatch && lastMatch.index >= lastReturnIndex - 50) {
      const before = content.substring(0, lastMatch.index + lastMatch[1].length + lastMatch[2].length);
      const after = content.substring(lastMatch.index + lastMatch[1].length + lastMatch[2].length);

      content = before + '\n      <FloatingBackButton />' + after;
      modified = true;
      break;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('FIXED:', path.relative(process.cwd(), file));
    fixed++;
  }
});

console.log('\nTotal fixed:', fixed);
