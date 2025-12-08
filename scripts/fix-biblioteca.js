const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'enem', 'biblioteca', 'page.tsx');

let content = fs.readFileSync(filePath, 'utf8');

// Corrigir a linha 1246 - fetch com template string
content = content.replace(
  'const response = await fetch(\\);',
  'const response = await fetch(`/api/biblioteca/${categoriaAtiva}`);'
);

// Corrigir os \!
content = content.replace(/\\!/g, '!');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Arquivo corrigido com sucesso!');
