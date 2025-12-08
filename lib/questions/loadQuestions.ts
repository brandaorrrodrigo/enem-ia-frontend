// ========================================
// LOADERS DE QUESTÕES - ENEM PRO
// ========================================

import type {
  Questao,
  QuestaoCompleta,
  QuestaoResumo,
  QuestaoLegacy,
  Area,
  Dificuldade
} from './schema';

import {
  convertFromLegacy,
  convertToLegacy,
  AREAS_REVERSE_MAP
} from './schema';

// Importar banco massivo de questões
import bancoMassivo from '../../data/questoes-massivo.json';
// Importar banco de questões ENEM reais
import bancoEnemReais from '../../data/questoes-enem-reais.json';

// Re-exportar tipos para compatibilidade
export type { Questao, QuestaoLegacy, Area, Dificuldade } from './schema';

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

// ========================================
// TIPOS DO BANCO ENEM REAIS
// ========================================

interface QuestaoEnemReal {
  id: string;
  ano: number;
  area: string;
  disciplina: string;
  tema: string;
  dificuldade: number;
  enunciado: string;
  alternativas: string[];
  correta: string;
  explicacao: string;
  fonte: string;
  tags: string[];
}

interface BancoEnemReaisData {
  versao: string;
  atualizacao: string;
  total_questoes: number;
  estatisticas: {
    por_area: Record<string, number>;
    por_disciplina: Record<string, number>;
  };
  questoes: QuestaoEnemReal[];
}

/**
 * Converte questão ENEM real para o schema padrão
 */
function convertFromEnemReal(q: QuestaoEnemReal): Questao {
  // Mapear área para o formato padrão
  const areaMap: Record<string, Area> = {
    'Ciências da Natureza': 'Natureza',
    'Ciências Humanas': 'Humanas',
    'Linguagens': 'Linguagens',
    'Matemática': 'Matemática',
  };

  const area = areaMap[q.area] || 'Matemática';
  const dificuldade = (q.dificuldade >= 1 && q.dificuldade <= 5 ? q.dificuldade : 3) as Dificuldade;

  return {
    id: q.id,
    ano: q.ano,
    area,
    disciplina: q.disciplina,
    tema: q.tema,
    dificuldade,
    enunciado: q.enunciado,
    alternativas: q.alternativas as [string, string, string, string, string],
    correta: q.correta as 'A' | 'B' | 'C' | 'D' | 'E',
    explicacao: q.explicacao || '',
    tags: q.tags || []
  };
}

/**
 * Converte questão do banco massivo para o schema padrão
 */
function convertFromMassivo(q: QuestaoMassivo, index: number): Questao {
  // Mapear área
  const areaMap: Record<string, Area> = {
    'matematica': 'Matemática',
    'linguagens': 'Linguagens',
    'humanas': 'Humanas',
    'natureza': 'Natureza',
    'redacao': 'Linguagens'
  };

  // Mapear dificuldade (1-5)
  const dif = (q.difficulty || 3) as Dificuldade;
  const dificuldade: Dificuldade = dif >= 1 && dif <= 5 ? dif : 3;

  // Gerar ID único
  const area = areaMap[q.area.toLowerCase()] || 'Matemática';
  const id = `${area.substring(0, 3).toUpperCase()}_${q.disciplina.substring(0, 3).toUpperCase()}_${q.ano}_${String(index).padStart(5, '0')}`;

  return {
    id,
    ano: q.ano,
    area,
    disciplina: q.disciplina.charAt(0).toUpperCase() + q.disciplina.slice(1),
    tema: q.habilidade || q.tipo || 'Geral',
    dificuldade,
    enunciado: q.enunciado,
    alternativas: [
      q.alternativas.A,
      q.alternativas.B,
      q.alternativas.C,
      q.alternativas.D,
      q.alternativas.E
    ] as [string, string, string, string, string],
    correta: q.correta,
    explicacao: q.explicacao || '',
    tags: [q.disciplina, q.tipo || '', q.habilidade || ''].filter(Boolean)
  };
}

// ========================================
// CACHE EM MEMÓRIA
// ========================================

interface QuestionsCache {
  questions: Questao[];
  byId: Map<string, Questao>;
  byArea: Map<Area, Questao[]>;
  byDisciplina: Map<string, Questao[]>;
  byTema: Map<string, Questao[]>;
  byAno: Map<number, Questao[]>;
  byDificuldade: Map<Dificuldade, Questao[]>;
  initialized: boolean;
  lastUpdate: number;
}

const cache: QuestionsCache = {
  questions: [],
  byId: new Map(),
  byArea: new Map(),
  byDisciplina: new Map(),
  byTema: new Map(),
  byAno: new Map(),
  byDificuldade: new Map(),
  initialized: false,
  lastUpdate: 0
};

// ========================================
// INICIALIZAÇÃO DO BANCO
// ========================================

/**
 * Inicializa o banco de questões a partir do banco massivo
 */
function initializeFromLegacy(): void {
  if (cache.initialized) return;

  console.log('[DB] Inicializando banco de questões...');
  const startTime = Date.now();

  // Carregar do banco massivo
  const banco = bancoMassivo as BancoMassivoData;
  const questionsMassivo = banco.questoes.map((q, idx) => convertFromMassivo(q, idx));

  // Carregar do banco ENEM reais
  const bancoReais = bancoEnemReais as BancoEnemReaisData;
  const questionsReais = bancoReais.questoes.map(q => convertFromEnemReal(q));

  // Combinar os dois bancos (ENEM reais primeiro para prioridade)
  const questions = [...questionsReais, ...questionsMassivo];

  console.log(`[DB] Banco inicializado com ${questions.length} questões (${questionsReais.length} ENEM reais + ${questionsMassivo.length} massivo) em ${Date.now() - startTime}ms`);

  // Popular cache
  cache.questions = questions;

  // Indexar por ID
  questions.forEach(q => {
    cache.byId.set(q.id, q);
  });

  // Indexar por área
  const areas: Area[] = ['Matemática', 'Linguagens', 'Humanas', 'Natureza'];
  areas.forEach(area => {
    cache.byArea.set(area, questions.filter(q => q.area === area));
  });

  // Indexar por disciplina
  const disciplinas = [...new Set(questions.map(q => q.disciplina))];
  disciplinas.forEach(disc => {
    cache.byDisciplina.set(disc, questions.filter(q => q.disciplina === disc));
  });

  // Indexar por tema
  const temas = [...new Set(questions.map(q => q.tema))];
  temas.forEach(tema => {
    cache.byTema.set(tema, questions.filter(q => q.tema === tema));
  });

  // Indexar por ano
  const anos = [...new Set(questions.map(q => q.ano))];
  anos.forEach(ano => {
    cache.byAno.set(ano, questions.filter(q => q.ano === ano));
  });

  // Indexar por dificuldade
  const dificuldades: Dificuldade[] = [1, 2, 3, 4, 5];
  dificuldades.forEach(dif => {
    cache.byDificuldade.set(dif, questions.filter(q => q.dificuldade === dif));
  });

  cache.initialized = true;
  cache.lastUpdate = Date.now();
}

/**
 * Garante que o cache está inicializado
 */
function ensureInitialized(): void {
  if (!cache.initialized) {
    initializeFromLegacy();
  }
}

// ========================================
// LOADERS PRINCIPAIS
// ========================================

/**
 * Carrega todas as questões
 */
export function loadAllQuestions(): Questao[] {
  ensureInitialized();
  return [...cache.questions];
}

/**
 * Carrega questão por ID
 */
export function loadQuestionById(id: string): Questao | undefined {
  ensureInitialized();
  return cache.byId.get(id);
}

/**
 * Carrega questões por ano
 */
export function loadQuestionsByAno(ano: number): Questao[] {
  ensureInitialized();
  return cache.byAno.get(ano) || [];
}

/**
 * Carrega questões por área
 */
export function loadQuestionsByArea(area: Area): Questao[] {
  ensureInitialized();
  return cache.byArea.get(area) || [];
}

/**
 * Carrega questões por área (código legado)
 */
export function loadQuestionsByAreaLegacy(areaCode: string): Questao[] {
  const area = AREAS_REVERSE_MAP[areaCode as keyof typeof AREAS_REVERSE_MAP];
  if (!area) return [];
  return loadQuestionsByArea(area);
}

/**
 * Carrega questões por disciplina
 */
export function loadQuestionsByDisciplina(disciplina: string): Questao[] {
  ensureInitialized();
  return cache.byDisciplina.get(disciplina) || [];
}

/**
 * Carrega questões por tema
 */
export function loadQuestionsByTema(tema: string): Questao[] {
  ensureInitialized();
  return cache.byTema.get(tema) || [];
}

/**
 * Carrega questões por dificuldade
 */
export function loadQuestionsByDificuldade(dificuldade: Dificuldade): Questao[] {
  ensureInitialized();
  return cache.byDificuldade.get(dificuldade) || [];
}

/**
 * Carrega questões por múltiplas dificuldades
 */
export function loadQuestionsByDificuldadeRange(min: Dificuldade, max: Dificuldade): Questao[] {
  ensureInitialized();
  return cache.questions.filter(q => q.dificuldade >= min && q.dificuldade <= max);
}

/**
 * Carrega questões por tags
 */
export function loadQuestionsByTag(tag: string): Questao[] {
  ensureInitialized();
  const tagLower = tag.toLowerCase();
  return cache.questions.filter(q => q.tags?.some(t => t.toLowerCase().includes(tagLower)));
}

/**
 * Busca questões por texto no enunciado
 */
export function searchQuestionsByText(texto: string): Questao[] {
  ensureInitialized();
  const termos = texto.toLowerCase().split(' ').filter(t => t.length > 2);

  return cache.questions.filter(q => {
    const enunciadoLower = q.enunciado.toLowerCase();
    return termos.every(termo => enunciadoLower.includes(termo));
  });
}

// ========================================
// LOADERS DE ESTATÍSTICAS
// ========================================

/**
 * Retorna estatísticas do banco
 */
export function getQuestionStats(): {
  total: number;
  byArea: Record<Area, number>;
  byAno: Record<number, number>;
  byDificuldade: Record<Dificuldade, number>;
  disciplinas: string[];
  temas: string[];
} {
  ensureInitialized();

  const byArea: Record<Area, number> = {
    'Matemática': 0,
    'Linguagens': 0,
    'Humanas': 0,
    'Natureza': 0
  };

  cache.byArea.forEach((questions, area) => {
    byArea[area] = questions.length;
  });

  const byAno: Record<number, number> = {};
  cache.byAno.forEach((questions, ano) => {
    byAno[ano] = questions.length;
  });

  const byDificuldade: Record<Dificuldade, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  };
  cache.byDificuldade.forEach((questions, dif) => {
    byDificuldade[dif] = questions.length;
  });

  return {
    total: cache.questions.length,
    byArea,
    byAno,
    byDificuldade,
    disciplinas: [...cache.byDisciplina.keys()],
    temas: [...cache.byTema.keys()]
  };
}

/**
 * Lista áreas disponíveis
 */
export function getAvailableAreas(): Area[] {
  return ['Matemática', 'Linguagens', 'Humanas', 'Natureza'];
}

/**
 * Lista disciplinas por área
 */
export function getDisciplinasByArea(area: Area): string[] {
  ensureInitialized();
  const questions = cache.byArea.get(area) || [];
  return [...new Set(questions.map(q => q.disciplina))];
}

/**
 * Lista temas por disciplina
 */
export function getTemasByDisciplina(disciplina: string): string[] {
  ensureInitialized();
  const questions = cache.byDisciplina.get(disciplina) || [];
  return [...new Set(questions.map(q => q.tema))];
}

/**
 * Lista anos disponíveis
 */
export function getAvailableAnos(): number[] {
  ensureInitialized();
  return [...cache.byAno.keys()].sort((a, b) => b - a);
}

// ========================================
// LOADERS PARA COMPATIBILIDADE
// ========================================

/**
 * Carrega questões no formato legado
 */
export function loadQuestionsLegacy(): QuestaoLegacy[] {
  ensureInitialized();
  return cache.questions.map(q => convertToLegacy(q));
}

/**
 * Carrega questão por ID numérico (legado)
 */
export function loadQuestionByLegacyId(id: number): Questao | undefined {
  ensureInitialized();
  return cache.questions.find(q => {
    const numId = parseInt(q.id.split('_').pop() || '0');
    return numId === id;
  });
}

/**
 * Carrega questões por área (código legado)
 */
export function loadQuestionsByAreaCode(areaCode: 'matematica' | 'linguagens' | 'humanas' | 'natureza'): Questao[] {
  const areaMap: Record<string, Area> = {
    'matematica': 'Matemática',
    'linguagens': 'Linguagens',
    'humanas': 'Humanas',
    'natureza': 'Natureza'
  };
  return loadQuestionsByArea(areaMap[areaCode]);
}

// ========================================
// LOADERS PAGINADOS
// ========================================

/**
 * Carrega questões com paginação
 */
export function loadQuestionsPaginated(
  page: number = 1,
  perPage: number = 20
): {
  questions: Questao[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
} {
  ensureInitialized();

  const total = cache.questions.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const questions = cache.questions.slice(start, start + perPage);

  return {
    questions,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  };
}

// ========================================
// LOADERS ALEATÓRIOS
// ========================================

/**
 * Carrega N questões aleatórias
 */
export function loadRandomQuestions(count: number): Questao[] {
  ensureInitialized();

  const shuffled = [...cache.questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Carrega N questões aleatórias por área
 */
export function loadRandomQuestionsByArea(area: Area, count: number): Questao[] {
  const areaQuestions = loadQuestionsByArea(area);
  const shuffled = [...areaQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Carrega N questões aleatórias por dificuldade
 */
export function loadRandomQuestionsByDificuldade(dificuldade: Dificuldade, count: number): Questao[] {
  const questions = loadQuestionsByDificuldade(dificuldade);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ========================================
// INVALIDAÇÃO DE CACHE
// ========================================

/**
 * Limpa o cache forçando reinicialização
 */
export function clearCache(): void {
  cache.questions = [];
  cache.byId.clear();
  cache.byArea.clear();
  cache.byDisciplina.clear();
  cache.byTema.clear();
  cache.byAno.clear();
  cache.byDificuldade.clear();
  cache.initialized = false;
  cache.lastUpdate = 0;
}

/**
 * Adiciona questão ao cache (para uso em tempo real)
 */
export function addQuestionToCache(question: Questao): void {
  ensureInitialized();

  cache.questions.push(question);
  cache.byId.set(question.id, question);

  // Atualizar índices
  const areaQuestions = cache.byArea.get(question.area) || [];
  areaQuestions.push(question);
  cache.byArea.set(question.area, areaQuestions);

  const discQuestions = cache.byDisciplina.get(question.disciplina) || [];
  discQuestions.push(question);
  cache.byDisciplina.set(question.disciplina, discQuestions);

  const temaQuestions = cache.byTema.get(question.tema) || [];
  temaQuestions.push(question);
  cache.byTema.set(question.tema, temaQuestions);

  const anoQuestions = cache.byAno.get(question.ano) || [];
  anoQuestions.push(question);
  cache.byAno.set(question.ano, anoQuestions);

  const difQuestions = cache.byDificuldade.get(question.dificuldade) || [];
  difQuestions.push(question);
  cache.byDificuldade.set(question.dificuldade, difQuestions);

  cache.lastUpdate = Date.now();
}

// ========================================
// EXPORTAÇÕES PARA COMPATIBILIDADE
// ========================================

// Re-export de schema removido - tipos já exportados no topo do arquivo
