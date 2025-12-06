// ========================================
// BANCO DE QUESTOES DEFINITIVO - ESTRUTURA
// ========================================

import {
  QuestaoCompleta,
  QuestaoSimulado,
  QuestaoLegacy,
  AreaENEM,
  DificuldadeLabel,
  IndiceQuestoes,
  questaoLegacyToCompleta,
  questaoCompletaToSimulado,
} from '../types/questao';

// Importar banco massivo de questões
import bancoMassivo from '../../data/questoes-massivo.json';

// ========================================
// TIPOS DO BANCO MASSIVO
// ========================================

interface QuestaoMassivo {
  numero: number;
  ano: number;
  disciplina: string;
  enunciado: string;
  alternativas: { A: string; B: string; C: string; D: string; E: string };
  correta: 'A' | 'B' | 'C' | 'D' | 'E';
  tipo?: string;
  habilidade?: string;
  competencia?: number;
  explicacao?: string;
  source?: string;
  area: string;
  difficulty?: number;
}

interface BancoMassivoData {
  versao: string;
  total_questoes: number;
  questoes: QuestaoMassivo[];
}

/**
 * Normaliza area para o padrao ENEM
 */
function normalizarArea(area: string, disciplina: string): AreaENEM {
  const areaLower = area.toLowerCase();
  const discLower = disciplina.toLowerCase();

  // Mapeamento de areas nao-padrao para padrao ENEM
  if (areaLower === 'ciencias_natureza' || areaLower === 'ciencias da natureza') {
    return 'natureza';
  }
  if (areaLower === 'ciencias_humanas' || areaLower === 'ciencias humanas') {
    return 'humanas';
  }

  // Mapeamento por disciplina quando area esta errada
  const disciplinasNatureza = ['fisica', 'física', 'biologia', 'quimica', 'química', 'fisica_mecanica', 'fisica_eletricidade', 'fisica_termodinamica'];
  const disciplinasHumanas = ['historia', 'história', 'geografia', 'sociologia', 'filosofia'];
  const disciplinasLinguagens = ['portugues', 'português', 'literatura', 'ingles', 'inglês', 'espanhol', 'gramatica', 'gramática', 'interpretacao', 'interpretação', 'redacao', 'redação'];
  const disciplinasMatematica = ['matematica', 'matemática', 'porcentagem', 'juros', 'geometria_plana', 'geometria_espacial', 'estatistica', 'estatística', 'funcoes', 'funções', 'progressoes', 'progressões', 'razao_proporcao', 'combinatoria', 'combinatória', 'probabilidade', 'geometria', 'trigonometria', 'algebra', 'álgebra'];

  if (disciplinasNatureza.some(d => discLower.includes(d))) {
    return 'natureza';
  }
  if (disciplinasHumanas.some(d => discLower.includes(d))) {
    return 'humanas';
  }
  if (disciplinasLinguagens.some(d => discLower.includes(d))) {
    return 'linguagens';
  }
  if (disciplinasMatematica.some(d => discLower.includes(d))) {
    return 'matematica';
  }

  // Se area ja e padrao, retornar
  if (['matematica', 'linguagens', 'humanas', 'natureza', 'redacao'].includes(areaLower)) {
    return areaLower as AreaENEM;
  }

  // Fallback: mapear areas que sao nomes de disciplinas
  if (disciplinasNatureza.includes(areaLower)) return 'natureza';
  if (disciplinasHumanas.includes(areaLower)) return 'humanas';
  if (disciplinasLinguagens.includes(areaLower)) return 'linguagens';

  // Default para matematica se nao encontrar
  return 'matematica';
}

/**
 * Converte questão do banco massivo para QuestaoLegacy
 */
function convertMassivoToLegacy(q: QuestaoMassivo, index: number): QuestaoLegacy {
  const letraToIndex: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };

  return {
    id: index + 1,
    area: normalizarArea(q.area, q.disciplina),
    disciplina: q.disciplina.charAt(0).toUpperCase() + q.disciplina.slice(1),
    assunto: q.habilidade || q.tipo || 'Geral',
    enunciado: q.enunciado,
    alternativas: [
      q.alternativas.A,
      q.alternativas.B,
      q.alternativas.C,
      q.alternativas.D,
      q.alternativas.E
    ],
    correta: letraToIndex[q.correta] || 0,
    explicacao: q.explicacao || '',
    dificuldade: (q.difficulty === 1 || q.difficulty === 2 ? 'facil' :
                  q.difficulty === 4 || q.difficulty === 5 ? 'dificil' : 'medio') as DificuldadeLabel,
    ano: q.ano,
    fonte: q.source
  };
}

// Carregar banco massivo e converter para formato legado
const banco = bancoMassivo as BancoMassivoData;
const bancoQuestoes: QuestaoLegacy[] = banco.questoes.map((q, idx) => convertMassivoToLegacy(q, idx));

// ========================================
// ESTRUTURA DE DADOS EM MEMORIA
// ========================================

// Mapa principal de questoes (acesso O(1) por ID)
const questoesMap = new Map<string, QuestaoCompleta>();

// Indices para busca rapida
let indiceQuestoes: IndiceQuestoes = {
  porArea: {},
  porDisciplina: {},
  porTema: {},
  porAno: {},
  porDificuldade: {},
  porTag: {},
  total: 0,
  ultimaAtualizacao: new Date().toISOString(),
};

// Cache de versoes simplificadas
const cacheSimulado = new Map<string, QuestaoSimulado>();
const cacheLegacy = new Map<string, QuestaoLegacy>();

// ========================================
// INICIALIZACAO DO BANCO
// ========================================

let bancoInicializado = false;

/**
 * Inicializa o banco de questoes
 * Converte questoes legadas e cria indices
 */
export function inicializarBanco(): void {
  if (bancoInicializado) return;

  console.log('[DB] Inicializando banco de questoes...');
  const inicio = Date.now();

  // Limpar estruturas
  questoesMap.clear();
  cacheSimulado.clear();
  cacheLegacy.clear();

  // Converter questoes legadas
  bancoQuestoes.forEach((legado) => {
    const completa = questaoLegacyToCompleta(legado as QuestaoLegacy);
    adicionarQuestaoAoIndice(completa);
  });

  // Atualizar metadados do indice
  indiceQuestoes.total = questoesMap.size;
  indiceQuestoes.ultimaAtualizacao = new Date().toISOString();

  bancoInicializado = true;
  console.log(`[DB] Banco inicializado com ${questoesMap.size} questoes em ${Date.now() - inicio}ms`);
}

/**
 * Adiciona questao ao mapa e indices
 */
function adicionarQuestaoAoIndice(questao: QuestaoCompleta): void {
  // Adicionar ao mapa principal
  questoesMap.set(questao.id, questao);

  // Indice por area
  if (!indiceQuestoes.porArea[questao.area]) {
    indiceQuestoes.porArea[questao.area] = [];
  }
  indiceQuestoes.porArea[questao.area]!.push(questao.id);

  // Indice por disciplina
  if (!indiceQuestoes.porDisciplina[questao.disciplina]) {
    indiceQuestoes.porDisciplina[questao.disciplina] = [];
  }
  indiceQuestoes.porDisciplina[questao.disciplina].push(questao.id);

  // Indice por tema
  if (!indiceQuestoes.porTema[questao.tema]) {
    indiceQuestoes.porTema[questao.tema] = [];
  }
  indiceQuestoes.porTema[questao.tema].push(questao.id);

  // Indice por ano
  if (questao.origem.ano) {
    if (!indiceQuestoes.porAno[questao.origem.ano]) {
      indiceQuestoes.porAno[questao.origem.ano] = [];
    }
    indiceQuestoes.porAno[questao.origem.ano].push(questao.id);
  }

  // Indice por dificuldade
  if (!indiceQuestoes.porDificuldade[questao.dificuldade]) {
    indiceQuestoes.porDificuldade[questao.dificuldade] = [];
  }
  indiceQuestoes.porDificuldade[questao.dificuldade]!.push(questao.id);

  // Indice por tags
  questao.tags.forEach((tag) => {
    const tagLower = tag.toLowerCase();
    if (!indiceQuestoes.porTag[tagLower]) {
      indiceQuestoes.porTag[tagLower] = [];
    }
    indiceQuestoes.porTag[tagLower].push(questao.id);
  });
}

// ========================================
// FUNCOES DE ACESSO
// ========================================

/**
 * Retorna questao por ID
 */
export function getQuestaoById(id: string): QuestaoCompleta | null {
  inicializarBanco();
  return questoesMap.get(id) || null;
}

/**
 * Retorna questao legada por ID numerico
 */
export function getQuestaoByNumericId(numericId: number): QuestaoCompleta | null {
  inicializarBanco();
  return questoesMap.get(`legacy_${numericId}`) || null;
}

/**
 * Retorna todas as questoes
 */
export function getAllQuestoes(): QuestaoCompleta[] {
  inicializarBanco();
  return Array.from(questoesMap.values());
}

/**
 * Retorna questoes para simulado (versao leve)
 */
export function getQuestoesSimulado(ids: string[]): QuestaoSimulado[] {
  inicializarBanco();

  return ids.map((id) => {
    // Verificar cache
    if (cacheSimulado.has(id)) {
      return cacheSimulado.get(id)!;
    }

    const questao = questoesMap.get(id);
    if (!questao) return null;

    const simulado = questaoCompletaToSimulado(questao);
    cacheSimulado.set(id, simulado);
    return simulado;
  }).filter((q): q is QuestaoSimulado => q !== null);
}

/**
 * Retorna IDs de questoes por area
 */
export function getIdsByArea(area: AreaENEM): string[] {
  inicializarBanco();
  return indiceQuestoes.porArea[area] || [];
}

/**
 * Retorna IDs de questoes por disciplina
 */
export function getIdsByDisciplina(disciplina: string): string[] {
  inicializarBanco();
  return indiceQuestoes.porDisciplina[disciplina] || [];
}

/**
 * Retorna IDs de questoes por tema
 */
export function getIdsByTema(tema: string): string[] {
  inicializarBanco();
  return indiceQuestoes.porTema[tema] || [];
}

/**
 * Retorna IDs de questoes por ano
 */
export function getIdsByAno(ano: number): string[] {
  inicializarBanco();
  return indiceQuestoes.porAno[ano] || [];
}

/**
 * Retorna IDs de questoes por dificuldade
 */
export function getIdsByDificuldade(dificuldade: DificuldadeLabel): string[] {
  inicializarBanco();
  return indiceQuestoes.porDificuldade[dificuldade] || [];
}

/**
 * Retorna IDs de questoes por tag
 */
export function getIdsByTag(tag: string): string[] {
  inicializarBanco();
  return indiceQuestoes.porTag[tag.toLowerCase()] || [];
}

// ========================================
// METADADOS E ESTATISTICAS
// ========================================

/**
 * Retorna estatisticas do banco
 */
export function getEstatisticasBanco(): {
  total: number;
  porArea: { [area: string]: number };
  porDificuldade: { [dificuldade: string]: number };
  porAno: { [ano: number]: number };
  disciplinas: string[];
  temas: string[];
  anos: number[];
} {
  inicializarBanco();

  const porArea: { [area: string]: number } = {};
  const porDificuldade: { [dificuldade: string]: number } = {};
  const porAno: { [ano: number]: number } = {};

  Object.entries(indiceQuestoes.porArea).forEach(([area, ids]) => {
    if (ids) porArea[area] = ids.length;
  });

  Object.entries(indiceQuestoes.porDificuldade).forEach(([dif, ids]) => {
    if (ids) porDificuldade[dif] = ids.length;
  });

  Object.entries(indiceQuestoes.porAno).forEach(([ano, ids]) => {
    porAno[parseInt(ano)] = ids.length;
  });

  return {
    total: questoesMap.size,
    porArea,
    porDificuldade,
    porAno,
    disciplinas: Object.keys(indiceQuestoes.porDisciplina),
    temas: Object.keys(indiceQuestoes.porTema),
    anos: Object.keys(indiceQuestoes.porAno).map(Number).sort((a, b) => b - a),
  };
}

/**
 * Retorna areas disponiveis
 */
export function getAreasDisponiveis(): AreaENEM[] {
  inicializarBanco();
  return Object.keys(indiceQuestoes.porArea) as AreaENEM[];
}

/**
 * Retorna disciplinas por area
 */
export function getDisciplinasPorArea(area: AreaENEM): string[] {
  inicializarBanco();
  const ids = indiceQuestoes.porArea[area] || [];
  const disciplinas = new Set<string>();

  ids.forEach((id) => {
    const questao = questoesMap.get(id);
    if (questao) disciplinas.add(questao.disciplina);
  });

  return Array.from(disciplinas).sort();
}

/**
 * Retorna temas por disciplina
 */
export function getTemasPorDisciplina(disciplina: string): string[] {
  inicializarBanco();
  const ids = indiceQuestoes.porDisciplina[disciplina] || [];
  const temas = new Set<string>();

  ids.forEach((id) => {
    const questao = questoesMap.get(id);
    if (questao) temas.add(questao.tema);
  });

  return Array.from(temas).sort();
}

/**
 * Retorna o indice completo (para debug/admin)
 */
export function getIndiceCompleto(): IndiceQuestoes {
  inicializarBanco();
  return { ...indiceQuestoes };
}

// ========================================
// ADICAO DE QUESTOES
// ========================================

/**
 * Adiciona nova questao ao banco
 */
export function adicionarQuestao(questao: QuestaoCompleta): boolean {
  inicializarBanco();

  if (questoesMap.has(questao.id)) {
    console.warn(`[DB] Questao ${questao.id} ja existe`);
    return false;
  }

  adicionarQuestaoAoIndice(questao);
  indiceQuestoes.total = questoesMap.size;
  indiceQuestoes.ultimaAtualizacao = new Date().toISOString();

  return true;
}

/**
 * Adiciona multiplas questoes
 */
export function adicionarQuestoes(questoes: QuestaoCompleta[]): number {
  let adicionadas = 0;
  questoes.forEach((q) => {
    if (adicionarQuestao(q)) adicionadas++;
  });
  return adicionadas;
}

/**
 * Remove questao do banco
 */
export function removerQuestao(id: string): boolean {
  if (!questoesMap.has(id)) return false;

  const questao = questoesMap.get(id)!;

  // Remover do mapa principal
  questoesMap.delete(id);

  // Remover dos indices
  const removeFromArray = (arr: string[] | undefined, val: string) => {
    if (!arr) return;
    const idx = arr.indexOf(val);
    if (idx > -1) arr.splice(idx, 1);
  };

  removeFromArray(indiceQuestoes.porArea[questao.area], id);
  removeFromArray(indiceQuestoes.porDisciplina[questao.disciplina], id);
  removeFromArray(indiceQuestoes.porTema[questao.tema], id);
  if (questao.origem.ano) {
    removeFromArray(indiceQuestoes.porAno[questao.origem.ano], id);
  }
  removeFromArray(indiceQuestoes.porDificuldade[questao.dificuldade], id);
  questao.tags.forEach((tag) => {
    removeFromArray(indiceQuestoes.porTag[tag.toLowerCase()], id);
  });

  // Limpar caches
  cacheSimulado.delete(id);
  cacheLegacy.delete(id);

  indiceQuestoes.total = questoesMap.size;
  indiceQuestoes.ultimaAtualizacao = new Date().toISOString();

  return true;
}

// ========================================
// IMPORTACAO/EXPORTACAO
// ========================================

/**
 * Exporta banco completo para JSON
 */
export function exportarBancoJSON(): string {
  inicializarBanco();
  const questoes = Array.from(questoesMap.values());
  return JSON.stringify(questoes, null, 2);
}

/**
 * Importa questoes de JSON
 */
export function importarBancoJSON(json: string): number {
  const questoes = JSON.parse(json) as QuestaoCompleta[];
  return adicionarQuestoes(questoes);
}

/**
 * Exporta questoes legadas (compatibilidade)
 */
export function exportarComoLegacy(): QuestaoLegacy[] {
  inicializarBanco();
  const questoes = Array.from(questoesMap.values());

  return questoes.map((q) => {
    const indiceCorreta = q.alternativas.findIndex((a) => a.correta);
    return {
      id: parseInt(q.id.replace(/\D/g, '')) || Math.floor(Math.random() * 100000),
      area: q.area,
      disciplina: q.disciplina,
      assunto: q.tema,
      enunciado: q.enunciado,
      alternativas: q.alternativas.map((a) => a.texto),
      correta: indiceCorreta,
      explicacao: q.explicacao,
      dificuldade: q.dificuldade,
      ano: q.origem.ano,
      fonte: q.origem.tipo === 'enem_oficial' ? 'enem' : undefined,
      imagem: q.imagens?.[0]?.url,
    };
  });
}

// Inicializar automaticamente
if (typeof window === 'undefined') {
  // Server-side: inicializar imediatamente
  inicializarBanco();
}
