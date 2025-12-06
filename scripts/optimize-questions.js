// Otimizar banco para deploy na Vercel (máximo 30k questões)
const fs = require('fs');

const inputPath = 'D:/enem-ia/enem-pro/data/questoes-massivo.json';
const outputPath = 'D:/enem-ia/enem-pro/data/questoes-massivo.json';

console.log('Carregando banco...');
const banco = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

console.log(`Total original: ${banco.questoes.length}`);

// Manter apenas 30k questões (priorizando as originais)
const questoesOriginais = banco.questoes.filter(q => q.source !== 'gerado_automatico');
const questoesGeradas = banco.questoes.filter(q => q.source === 'gerado_automatico');

console.log(`Originais: ${questoesOriginais.length}`);
console.log(`Geradas: ${questoesGeradas.length}`);

// Pegar todas originais + complementar com geradas até 30k
const limite = 30000;
const aComplementar = limite - questoesOriginais.length;
const questoesFinais = [...questoesOriginais, ...questoesGeradas.slice(0, Math.max(0, aComplementar))];

// Renumerar
questoesFinais.forEach((q, i) => {
  q.numero = i + 1;
});

const output = {
  versao: '3.1-optimized',
  total_questoes: questoesFinais.length,
  data_geracao: new Date().toISOString(),
  fontes: banco.fontes,
  questoes: questoesFinais
};

// Salvar sem formatação para economizar espaço
fs.writeFileSync(outputPath, JSON.stringify(output));

const size = fs.statSync(outputPath).size / 1024 / 1024;
console.log(`\nSalvo: ${questoesFinais.length} questões (${size.toFixed(2)} MB)`);
