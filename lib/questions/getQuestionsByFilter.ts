// ========================================
// FILTROS INTELIGENTES - ENEM PRO
// ========================================

import { Questao, Area, Dificuldade } from './schema';
import { loadAllQuestions } from './loadQuestions';

// ========================================
// TIPOS DE FILTRO
// ========================================

export interface QuestaoFilter {
  /** Filtra por ano */
  ano?: number;

  /** Filtra por anos (múltiplos) */
  anos?: number[];

  /** Filtra por área */
  area?: Area;

  /** Filtra por áreas (múltiplas) */
  areas?: Area[];

  /** Filtra por disciplina */
  disciplina?: string;

  /** Filtra por disciplinas (múltiplas) */
  disciplinas?: string[];

  /** Filtra por tema */
  tema?: string;

  /** Filtra por temas (múltiplos) */
  temas?: string[];

  /** Filtra por dificuldade exata */
  dificuldade?: Dificuldade;

  /** Filtra por range de dificuldade */
  dificuldadeMin?: Dificuldade;
  dificuldadeMax?: Dificuldade;

  /** Filtra por tags */
  tags?: string[];

  /** Busca no enunciado */
  busca?: string;

  /** IDs para excluir */
  excluirIds?: string[];

  /** Quantidade máxima */
  quantidade?: number;

  /** Ordenação */
  ordenar?: 'aleatorio' | 'dificuldade_asc' | 'dificuldade_desc' | 'ano_asc' | 'ano_desc';

  /** Paginação */
  pagina?: number;
  porPagina?: number;
}

export interface FilterResult {
  questions: Questao[];
  total: number;
  filtered: number;
  pagina?: number;
  totalPaginas?: number;
  temMais?: boolean;
}

// ========================================
// FILTRO PRINCIPAL
// ========================================

/**
 * Filtra questões com base em múltiplos critérios
 */
export function getQuestionsByFilter(filter: QuestaoFilter): FilterResult {
  let questions = loadAllQuestions();
  const total = questions.length;

  // Filtrar por ano
  if (filter.ano) {
    questions = questions.filter(q => q.ano === filter.ano);
  }

  // Filtrar por anos (múltiplos)
  if (filter.anos && filter.anos.length > 0) {
    questions = questions.filter(q => filter.anos!.includes(q.ano));
  }

  // Filtrar por área
  if (filter.area) {
    questions = questions.filter(q => q.area === filter.area);
  }

  // Filtrar por áreas (múltiplas)
  if (filter.areas && filter.areas.length > 0) {
    questions = questions.filter(q => filter.areas!.includes(q.area));
  }

  // Filtrar por disciplina
  if (filter.disciplina) {
    questions = questions.filter(q =>
      q.disciplina.toLowerCase().includes(filter.disciplina!.toLowerCase())
    );
  }

  // Filtrar por disciplinas (múltiplas)
  if (filter.disciplinas && filter.disciplinas.length > 0) {
    const disciplinasLower = filter.disciplinas.map(d => d.toLowerCase());
    questions = questions.filter(q =>
      disciplinasLower.some(d => q.disciplina.toLowerCase().includes(d))
    );
  }

  // Filtrar por tema
  if (filter.tema) {
    questions = questions.filter(q =>
      q.tema.toLowerCase().includes(filter.tema!.toLowerCase())
    );
  }

  // Filtrar por temas (múltiplos)
  if (filter.temas && filter.temas.length > 0) {
    const temasLower = filter.temas.map(t => t.toLowerCase());
    questions = questions.filter(q =>
      temasLower.some(t => q.tema.toLowerCase().includes(t))
    );
  }

  // Filtrar por dificuldade exata
  if (filter.dificuldade) {
    questions = questions.filter(q => q.dificuldade === filter.dificuldade);
  }

  // Filtrar por range de dificuldade
  if (filter.dificuldadeMin) {
    questions = questions.filter(q => q.dificuldade >= filter.dificuldadeMin!);
  }
  if (filter.dificuldadeMax) {
    questions = questions.filter(q => q.dificuldade <= filter.dificuldadeMax!);
  }

  // Filtrar por tags
  if (filter.tags && filter.tags.length > 0) {
    const tagsLower = filter.tags.map(t => t.toLowerCase());
    questions = questions.filter(q =>
      q.tags?.some(t => tagsLower.some(ft => t.toLowerCase().includes(ft)))
    );
  }

  // Busca no enunciado
  if (filter.busca) {
    const termos = filter.busca.toLowerCase().split(' ').filter(t => t.length > 2);
    questions = questions.filter(q => {
      const texto = q.enunciado.toLowerCase();
      return termos.every(termo => texto.includes(termo));
    });
  }

  // Excluir IDs
  if (filter.excluirIds && filter.excluirIds.length > 0) {
    questions = questions.filter(q => !filter.excluirIds!.includes(q.id));
  }

  const filtered = questions.length;

  // Ordenação
  if (filter.ordenar) {
    switch (filter.ordenar) {
      case 'aleatorio':
        questions = shuffleArray(questions);
        break;
      case 'dificuldade_asc':
        questions = questions.sort((a, b) => a.dificuldade - b.dificuldade);
        break;
      case 'dificuldade_desc':
        questions = questions.sort((a, b) => b.dificuldade - a.dificuldade);
        break;
      case 'ano_asc':
        questions = questions.sort((a, b) => a.ano - b.ano);
        break;
      case 'ano_desc':
        questions = questions.sort((a, b) => b.ano - a.ano);
        break;
    }
  }

  // Paginação
  if (filter.pagina && filter.porPagina) {
    const start = (filter.pagina - 1) * filter.porPagina;
    const totalPaginas = Math.ceil(filtered / filter.porPagina);

    questions = questions.slice(start, start + filter.porPagina);

    return {
      questions,
      total,
      filtered,
      pagina: filter.pagina,
      totalPaginas,
      temMais: filter.pagina < totalPaginas
    };
  }

  // Limitar quantidade
  if (filter.quantidade && filter.quantidade > 0) {
    questions = questions.slice(0, filter.quantidade);
  }

  return {
    questions,
    total,
    filtered
  };
}

// ========================================
// FILTROS ESPECÍFICOS
// ========================================

/**
 * Retorna questões por área com quantidade específica
 */
export function getQuestionsByAreaQuantidade(area: Area, quantidade: number): Questao[] {
  return getQuestionsByFilter({
    area,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;
}

/**
 * Retorna questões por disciplina e dificuldade
 */
export function getQuestionsByDisciplinaDificuldade(
  disciplina: string,
  dificuldade: Dificuldade,
  quantidade?: number
): Questao[] {
  return getQuestionsByFilter({
    disciplina,
    dificuldade,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;
}

/**
 * Retorna questões por tema
 */
export function getQuestionsByTemaQuantidade(tema: string, quantidade: number): Questao[] {
  return getQuestionsByFilter({
    tema,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;
}

/**
 * Retorna questões fáceis para iniciantes
 */
export function getEasyQuestions(quantidade: number, area?: Area): Questao[] {
  return getQuestionsByFilter({
    area,
    dificuldadeMax: 2,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;
}

/**
 * Retorna questões difíceis para desafios
 */
export function getHardQuestions(quantidade: number, area?: Area): Questao[] {
  return getQuestionsByFilter({
    area,
    dificuldadeMin: 4,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;
}

/**
 * Retorna questões de revisão (mix de dificuldades)
 */
export function getReviewQuestions(quantidade: number, area?: Area): Questao[] {
  const faceis = Math.floor(quantidade * 0.3);
  const medias = Math.floor(quantidade * 0.5);
  const dificeis = quantidade - faceis - medias;

  const questoesFaceis = getQuestionsByFilter({
    area,
    dificuldadeMax: 2,
    quantidade: faceis,
    ordenar: 'aleatorio'
  }).questions;

  const questoesMedias = getQuestionsByFilter({
    area,
    dificuldade: 3,
    quantidade: medias,
    ordenar: 'aleatorio',
    excluirIds: questoesFaceis.map(q => q.id)
  }).questions;

  const questoesDificeis = getQuestionsByFilter({
    area,
    dificuldadeMin: 4,
    quantidade: dificeis,
    ordenar: 'aleatorio',
    excluirIds: [...questoesFaceis, ...questoesMedias].map(q => q.id)
  }).questions;

  return shuffleArray([...questoesFaceis, ...questoesMedias, ...questoesDificeis]);
}

// ========================================
// FILTROS PARA SIMULADO
// ========================================

/**
 * Retorna questões balanceadas por área para simulado
 */
export function getBalancedQuestions(quantidadePorArea: number): Questao[] {
  const areas: Area[] = ['Matemática', 'Linguagens', 'Humanas', 'Natureza'];
  let questions: Questao[] = [];

  areas.forEach(area => {
    const areaQuestions = getQuestionsByFilter({
      area,
      quantidade: quantidadePorArea,
      ordenar: 'aleatorio'
    }).questions;
    questions = [...questions, ...areaQuestions];
  });

  return questions;
}

/**
 * Retorna questões progressivas (fácil -> difícil)
 */
export function getProgressiveQuestions(quantidade: number, area?: Area): Questao[] {
  const questions = getQuestionsByFilter({
    area,
    quantidade,
    ordenar: 'dificuldade_asc'
  }).questions;

  return questions;
}

// ========================================
// ANÁLISE E ESTATÍSTICAS
// ========================================

/**
 * Conta questões por filtro
 */
export function countQuestionsByFilter(filter: Omit<QuestaoFilter, 'quantidade' | 'ordenar' | 'pagina' | 'porPagina'>): number {
  return getQuestionsByFilter(filter).filtered;
}

/**
 * Retorna distribuição de questões por dificuldade
 */
export function getDistribuicaoDificuldade(filter?: Partial<QuestaoFilter>): Record<Dificuldade, number> {
  const result: Record<Dificuldade, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const questions = getQuestionsByFilter(filter || {}).questions;

  questions.forEach(q => {
    result[q.dificuldade]++;
  });

  return result;
}

/**
 * Retorna distribuição de questões por área
 */
export function getDistribuicaoArea(filter?: Partial<QuestaoFilter>): Record<Area, number> {
  const result: Record<Area, number> = {
    'Matemática': 0,
    'Linguagens': 0,
    'Humanas': 0,
    'Natureza': 0
  };

  const questions = getQuestionsByFilter(filter || {}).questions;

  questions.forEach(q => {
    result[q.area]++;
  });

  return result;
}

/**
 * Retorna temas mais frequentes
 */
export function getTemasFrequentes(limite: number = 10, area?: Area): { tema: string; count: number }[] {
  const questions = getQuestionsByFilter({ area }).questions;

  const temaCount: Record<string, number> = {};
  questions.forEach(q => {
    temaCount[q.tema] = (temaCount[q.tema] || 0) + 1;
  });

  return Object.entries(temaCount)
    .map(([tema, count]) => ({ tema, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limite);
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Embaralha array (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ========================================
// COMPATIBILIDADE COM LEGADO
// ========================================

/**
 * Filtro no formato legado
 */
export function getQuestoesByFilterLegacy(filtro: {
  areas?: string[];
  disciplinas?: string[];
  assuntos?: string[];
  dificuldades?: ('facil' | 'medio' | 'dificil')[];
  anos?: number[];
  excluirIds?: number[];
  quantidade?: number;
}): Questao[] {
  const areaMap: Record<string, Area> = {
    'matematica': 'Matemática',
    'linguagens': 'Linguagens',
    'humanas': 'Humanas',
    'natureza': 'Natureza'
  };

  const dificuldadeMap: Record<string, Dificuldade> = {
    'facil': 2,
    'medio': 3,
    'dificil': 4
  };

  const filter: QuestaoFilter = {
    ordenar: 'aleatorio'
  };

  if (filtro.areas) {
    filter.areas = filtro.areas.map(a => areaMap[a]).filter(Boolean);
  }

  if (filtro.disciplinas) {
    filter.disciplinas = filtro.disciplinas;
  }

  if (filtro.assuntos) {
    filter.temas = filtro.assuntos;
  }

  if (filtro.dificuldades && filtro.dificuldades.length > 0) {
    const dificuldades = filtro.dificuldades.map(d => dificuldadeMap[d]);
    filter.dificuldadeMin = Math.min(...dificuldades) as Dificuldade;
    filter.dificuldadeMax = Math.max(...dificuldades) as Dificuldade;
  }

  if (filtro.anos) {
    filter.anos = filtro.anos;
  }

  if (filtro.excluirIds) {
    // Converter IDs numéricos para string
    filter.excluirIds = filtro.excluirIds.map(id => `MAT_ALG_2022_${String(id).padStart(4, '0')}`);
  }

  if (filtro.quantidade) {
    filter.quantidade = filtro.quantidade;
  }

  return getQuestionsByFilter(filter).questions;
}
