// ========================================
// SCRIPT PARA MERGE DE TODOS OS BANCOS DE QUESTÕES
// ========================================

const fs = require('fs');
const path = require('path');

const backendPath = 'D:/enem-ia/backend/enem_ingestion';
const outputPath = 'D:/enem-ia/enem-pro/data/questoes-massivo.json';

// Contadores
let totalQuestoes = 0;
const questoesMap = new Map();

/**
 * Normaliza questão para formato padrão
 */
function normalizeQuestao(q, source, index) {
  // Se já tem formato padrão
  if (q.numero && q.alternativas && q.alternativas.A) {
    return {
      numero: q.numero,
      ano: q.ano || 2024,
      disciplina: q.disciplina || 'Geral',
      enunciado: q.enunciado || '',
      alternativas: q.alternativas,
      correta: q.correta || 'A',
      tipo: q.tipo || '',
      habilidade: q.habilidade || '',
      competencia: q.competencia || 0,
      explicacao: q.explicacao || '',
      source: source,
      area: q.area || 'matematica',
      difficulty: q.difficulty || 3
    };
  }

  // Se tem formato alternativo (array)
  if (Array.isArray(q.alternativas)) {
    const letras = ['A', 'B', 'C', 'D', 'E'];
    const altsObj = {};
    q.alternativas.forEach((alt, i) => {
      if (i < 5) altsObj[letras[i]] = alt;
    });

    return {
      numero: q.id || index + 1,
      ano: q.ano || 2024,
      disciplina: q.disciplina || 'Geral',
      enunciado: q.enunciado || '',
      alternativas: altsObj,
      correta: typeof q.correta === 'number' ? letras[q.correta] : (q.correta || 'A'),
      tipo: q.tipo || '',
      habilidade: q.habilidade || q.tema || '',
      competencia: q.competencia || 0,
      explicacao: q.explicacao || '',
      source: source,
      area: q.area || 'matematica',
      difficulty: q.dificuldade || q.difficulty || 3
    };
  }

  return null;
}

/**
 * Gera hash único para detectar duplicatas
 */
function generateHash(q) {
  const text = (q.enunciado || '').substring(0, 100).toLowerCase().replace(/\s+/g, '');
  return text;
}

/**
 * Carrega arquivo JSON
 */
function loadJSON(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    console.log(`Erro ao carregar ${filepath}: ${e.message}`);
    return null;
  }
}

console.log('========================================');
console.log('MERGE DE BANCOS DE QUESTÕES ENEM');
console.log('========================================\n');

// 1. Carregar banco massivo principal
console.log('1. Carregando todas_questoes_enem_massivo.json...');
const bancoMassivo = loadJSON(path.join(backendPath, 'todas_questoes_enem_massivo.json'));
if (bancoMassivo && bancoMassivo.questoes) {
  bancoMassivo.questoes.forEach((q, i) => {
    const normalized = normalizeQuestao(q, 'enem_massivo', i);
    if (normalized) {
      const hash = generateHash(normalized);
      if (!questoesMap.has(hash)) {
        questoesMap.set(hash, normalized);
      }
    }
  });
  console.log(`   -> ${bancoMassivo.questoes.length} questões processadas`);
}

// 2. Carregar questões simuladas
console.log('2. Carregando questoes_simuladas_10000.json...');
const bancoSimulado = loadJSON(path.join(backendPath, 'questoes_simuladas_10000.json'));
if (bancoSimulado && bancoSimulado.questoes) {
  bancoSimulado.questoes.forEach((q, i) => {
    const normalized = normalizeQuestao(q, 'simuladas_10k', i);
    if (normalized) {
      const hash = generateHash(normalized);
      if (!questoesMap.has(hash)) {
        questoesMap.set(hash, normalized);
      }
    }
  });
  console.log(`   -> ${bancoSimulado.questoes.length} questões processadas`);
}

// 3. Carregar questões adaptadas
console.log('3. Carregando questoes_adaptadas_7000.json...');
const bancoAdaptado = loadJSON(path.join(backendPath, 'questoes_adaptadas_7000.json'));
if (bancoAdaptado && bancoAdaptado.questoes) {
  bancoAdaptado.questoes.forEach((q, i) => {
    const normalized = normalizeQuestao(q, 'adaptadas_7k', i);
    if (normalized) {
      const hash = generateHash(normalized);
      if (!questoesMap.has(hash)) {
        questoesMap.set(hash, normalized);
      }
    }
  });
  console.log(`   -> ${bancoAdaptado.questoes.length} questões processadas`);
}

// 4. Carregar questões v2
console.log('4. Carregando questoes_v2_massivo.json...');
const bancoV2 = loadJSON(path.join(backendPath, 'questoes_v2_massivo.json'));
if (bancoV2 && bancoV2.questoes) {
  bancoV2.questoes.forEach((q, i) => {
    const normalized = normalizeQuestao(q, 'v2_massivo', i);
    if (normalized) {
      const hash = generateHash(normalized);
      if (!questoesMap.has(hash)) {
        questoesMap.set(hash, normalized);
      }
    }
  });
  console.log(`   -> ${bancoV2.questoes.length} questões processadas`);
}

// 5. Carregar questões de alta qualidade
console.log('5. Carregando questoes_alta_qualidade.json...');
const bancoAlta = loadJSON(path.join(backendPath, 'questoes_alta_qualidade.json'));
if (bancoAlta) {
  const questoes = Array.isArray(bancoAlta) ? bancoAlta : (bancoAlta.questoes || []);
  questoes.forEach((q, i) => {
    const normalized = normalizeQuestao(q, 'alta_qualidade', i);
    if (normalized) {
      const hash = generateHash(normalized);
      if (!questoesMap.has(hash)) {
        questoesMap.set(hash, normalized);
      }
    }
  });
  console.log(`   -> ${questoes.length} questões processadas`);
}

// Converter Map para Array
const todasQuestoes = Array.from(questoesMap.values());

// Renumerar
todasQuestoes.forEach((q, i) => {
  q.numero = i + 1;
});

console.log('\n========================================');
console.log(`TOTAL ÚNICO: ${todasQuestoes.length} questões`);
console.log('========================================\n');

// Estatísticas por área
const porArea = {};
const porAno = {};
todasQuestoes.forEach(q => {
  porArea[q.area] = (porArea[q.area] || 0) + 1;
  porAno[q.ano] = (porAno[q.ano] || 0) + 1;
});

console.log('Por Área:');
Object.entries(porArea).sort((a, b) => b[1] - a[1]).forEach(([area, count]) => {
  console.log(`  ${area}: ${count}`);
});

console.log('\nPor Ano:');
Object.entries(porAno).sort((a, b) => b[0] - a[0]).slice(0, 10).forEach(([ano, count]) => {
  console.log(`  ${ano}: ${count}`);
});

// Salvar arquivo final
const output = {
  versao: '2.0',
  total_questoes: todasQuestoes.length,
  data_geracao: new Date().toISOString(),
  fontes: ['enem_massivo', 'simuladas_10k', 'adaptadas_7k', 'v2_massivo', 'alta_qualidade'],
  questoes: todasQuestoes
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 0)); // Sem indentação para economizar espaço
console.log(`\nArquivo salvo em: ${outputPath}`);
console.log(`Tamanho: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
