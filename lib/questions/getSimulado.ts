// ========================================
// GERADOR DE SIMULADOS - ENEM PRO
// ========================================

import { Questao, Area, Dificuldade, convertToLegacy, QuestaoLegacy } from './schema';
import { getQuestionsByFilter, getBalancedQuestions, getReviewQuestions } from './getQuestionsByFilter';
import { loadQuestionsByArea, getQuestionStats } from './loadQuestions';

// ========================================
// TIPOS DO SIMULADO
// ========================================

export interface SimuladoConfig {
  id: string;
  tipo: 'completo' | 'area' | 'disciplina' | 'tema' | 'revisao' | 'personalizado';
  questoes: Questao[];
  respostas: Record<string, string>;  // id -> letra respondida
  questaoAtual: number;
  inicio: string;
  area?: Area;
  disciplina?: string;
  tema?: string;
  quantidade: number;
  modoCorrecao: 'imediato' | 'final';
  tempoLimite?: number;  // em minutos
  tempoRestante?: number;
}

export interface SimuladoResultado {
  id: string;
  tipo: string;
  acertos: number;
  erros: number;
  total: number;
  percentual: number;
  nota: number;  // 0-1000 (escala ENEM)
  tempoTotal: number;  // em minutos
  data: string;
  detalhes: ResultadoQuestao[];
  porArea: Record<Area, { acertos: number; total: number; percentual: number }>;
  porDificuldade: Record<Dificuldade, { acertos: number; total: number; percentual: number }>;
  pontosFortes: string[];
  pontosFracos: string[];
}

export interface ResultadoQuestao {
  id: string;
  area: Area;
  disciplina: string;
  tema: string;
  dificuldade: Dificuldade;
  respostaUsuario: string | null;
  respostaCorreta: string;
  acertou: boolean;
  tempoResposta?: number;
}

export interface OpcoesSimulado {
  area?: Area;
  disciplina?: string;
  tema?: string;
  quantidade?: number;
  dificuldade?: Dificuldade;
  dificuldadeMin?: Dificuldade;
  dificuldadeMax?: Dificuldade;
  anos?: number[];
  modoCorrecao?: 'imediato' | 'final';
  tempoLimite?: number;
  excluirIds?: string[];
}

// ========================================
// CONSTANTES
// ========================================

const DISTRIBUICAO_ENEM = {
  'Linguagens': 45,
  'Humanas': 45,
  'Natureza': 45,
  'Matemática': 45
} as const;

const STORAGE_KEY = 'enem_pro_simulado_atual';
const HISTORICO_KEY = 'enem_pro_historico_simulados';

// ========================================
// GERAÇÃO DE SIMULADOS
// ========================================

/**
 * Gera um simulado completo no estilo ENEM (180 questões)
 */
export function gerarSimuladoCompleto(modoCorrecao: 'imediato' | 'final' = 'final'): SimuladoConfig {
  const questoes: Questao[] = [];

  // Buscar questões por área
  (Object.entries(DISTRIBUICAO_ENEM) as [Area, number][]).forEach(([area, quantidade]) => {
    const areaQuestoes = getQuestionsByFilter({
      area,
      quantidade,
      ordenar: 'aleatorio'
    }).questions;

    questoes.push(...areaQuestoes);
  });

  // Se não tiver questões suficientes, completar com o que tiver
  const stats = getQuestionStats();
  const disponiveis = stats.total;

  let questoesFinais = questoes;
  if (questoes.length < 180) {
    // Usar todas as disponíveis distribuídas
    questoesFinais = getBalancedQuestions(Math.floor(disponiveis / 4));
  }

  return criarSimulado({
    tipo: 'completo',
    questoes: shuffleArray(questoesFinais),
    modoCorrecao,
    tempoLimite: 330  // 5h30 (tempo ENEM)
  });
}

/**
 * Gera um simulado por área
 */
export function gerarSimuladoPorArea(
  area: Area,
  quantidade: number = 45,
  modoCorrecao: 'imediato' | 'final' = 'imediato'
): SimuladoConfig {
  const questoes = getQuestionsByFilter({
    area,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;

  return criarSimulado({
    tipo: 'area',
    area,
    questoes,
    modoCorrecao,
    tempoLimite: Math.ceil(quantidade * 3)  // 3 min por questão
  });
}

/**
 * Gera um simulado customizado
 */
export function gerarSimuladoCustomizado(opcoes: OpcoesSimulado): SimuladoConfig {
  const questoes = getQuestionsByFilter({
    area: opcoes.area,
    disciplina: opcoes.disciplina,
    tema: opcoes.tema,
    dificuldade: opcoes.dificuldade,
    dificuldadeMin: opcoes.dificuldadeMin,
    dificuldadeMax: opcoes.dificuldadeMax,
    anos: opcoes.anos,
    quantidade: opcoes.quantidade || 20,
    excluirIds: opcoes.excluirIds,
    ordenar: 'aleatorio'
  }).questions;

  return criarSimulado({
    tipo: 'personalizado',
    area: opcoes.area,
    disciplina: opcoes.disciplina,
    tema: opcoes.tema,
    questoes,
    modoCorrecao: opcoes.modoCorrecao || 'imediato',
    tempoLimite: opcoes.tempoLimite
  });
}

/**
 * Gera um simulado rápido (10-20 questões)
 */
export function gerarSimuladoRapido(
  quantidade: number = 10,
  area?: Area
): SimuladoConfig {
  const questoes = getQuestionsByFilter({
    area,
    quantidade,
    ordenar: 'aleatorio'
  }).questions;

  return criarSimulado({
    tipo: area ? 'area' : 'personalizado',
    area,
    questoes,
    modoCorrecao: 'imediato',
    tempoLimite: quantidade * 2  // 2 min por questão
  });
}

/**
 * Gera um simulado de revisão (foco em pontos fracos)
 */
export function gerarSimuladoRevisao(
  quantidade: number = 20,
  area?: Area
): SimuladoConfig {
  const questoes = getReviewQuestions(quantidade, area);

  return criarSimulado({
    tipo: 'revisao',
    area,
    questoes,
    modoCorrecao: 'imediato',
    tempoLimite: quantidade * 3
  });
}

/**
 * Gera um simulado progressivo (do fácil ao difícil)
 */
export function gerarSimuladoProgressivo(
  quantidade: number = 20,
  area?: Area
): SimuladoConfig {
  const questoes = getQuestionsByFilter({
    area,
    quantidade,
    ordenar: 'dificuldade_asc'
  }).questions;

  return criarSimulado({
    tipo: 'personalizado',
    area,
    questoes,
    modoCorrecao: 'imediato'
  });
}

// ========================================
// CRIAÇÃO E GERENCIAMENTO
// ========================================

interface CriarSimuladoParams {
  tipo: SimuladoConfig['tipo'];
  questoes: Questao[];
  area?: Area;
  disciplina?: string;
  tema?: string;
  modoCorrecao: 'imediato' | 'final';
  tempoLimite?: number;
}

function criarSimulado(params: CriarSimuladoParams): SimuladoConfig {
  const id = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    id,
    tipo: params.tipo,
    questoes: params.questoes,
    respostas: {},
    questaoAtual: 0,
    inicio: new Date().toISOString(),
    area: params.area,
    disciplina: params.disciplina,
    tema: params.tema,
    quantidade: params.questoes.length,
    modoCorrecao: params.modoCorrecao,
    tempoLimite: params.tempoLimite,
    tempoRestante: params.tempoLimite
  };
}

/**
 * Responde uma questão do simulado
 */
export function responderQuestao(
  simulado: SimuladoConfig,
  questaoId: string,
  resposta: string
): SimuladoConfig {
  return {
    ...simulado,
    respostas: {
      ...simulado.respostas,
      [questaoId]: resposta
    }
  };
}

/**
 * Avança para próxima questão
 */
export function proximaQuestao(simulado: SimuladoConfig): SimuladoConfig {
  if (simulado.questaoAtual >= simulado.questoes.length - 1) {
    return simulado;
  }

  return {
    ...simulado,
    questaoAtual: simulado.questaoAtual + 1
  };
}

/**
 * Volta para questão anterior
 */
export function questaoAnterior(simulado: SimuladoConfig): SimuladoConfig {
  if (simulado.questaoAtual <= 0) {
    return simulado;
  }

  return {
    ...simulado,
    questaoAtual: simulado.questaoAtual - 1
  };
}

/**
 * Vai para questão específica
 */
export function irParaQuestao(simulado: SimuladoConfig, indice: number): SimuladoConfig {
  if (indice < 0 || indice >= simulado.questoes.length) {
    return simulado;
  }

  return {
    ...simulado,
    questaoAtual: indice
  };
}

// ========================================
// CÁLCULO DE RESULTADOS
// ========================================

/**
 * Calcula o resultado final do simulado
 */
export function calcularResultado(simulado: SimuladoConfig): SimuladoResultado {
  const inicio = new Date(simulado.inicio);
  const fim = new Date();
  const tempoTotal = Math.round((fim.getTime() - inicio.getTime()) / 60000);  // em minutos

  const detalhes: ResultadoQuestao[] = [];
  let acertos = 0;
  let erros = 0;

  const porArea: Record<Area, { acertos: number; total: number; percentual: number }> = {
    'Matemática': { acertos: 0, total: 0, percentual: 0 },
    'Linguagens': { acertos: 0, total: 0, percentual: 0 },
    'Humanas': { acertos: 0, total: 0, percentual: 0 },
    'Natureza': { acertos: 0, total: 0, percentual: 0 }
  };

  const porDificuldade: Record<Dificuldade, { acertos: number; total: number; percentual: number }> = {
    1: { acertos: 0, total: 0, percentual: 0 },
    2: { acertos: 0, total: 0, percentual: 0 },
    3: { acertos: 0, total: 0, percentual: 0 },
    4: { acertos: 0, total: 0, percentual: 0 },
    5: { acertos: 0, total: 0, percentual: 0 }
  };

  // Contabilizar por tema para identificar pontos fortes/fracos
  const porTema: Record<string, { acertos: number; total: number }> = {};

  simulado.questoes.forEach(questao => {
    const respostaUsuario = simulado.respostas[questao.id] || null;
    const acertou = respostaUsuario === questao.correta;

    if (acertou) {
      acertos++;
    } else {
      erros++;
    }

    // Atualizar estatísticas por área
    porArea[questao.area].total++;
    if (acertou) porArea[questao.area].acertos++;

    // Atualizar estatísticas por dificuldade
    porDificuldade[questao.dificuldade].total++;
    if (acertou) porDificuldade[questao.dificuldade].acertos++;

    // Atualizar estatísticas por tema
    if (!porTema[questao.tema]) {
      porTema[questao.tema] = { acertos: 0, total: 0 };
    }
    porTema[questao.tema].total++;
    if (acertou) porTema[questao.tema].acertos++;

    detalhes.push({
      id: questao.id,
      area: questao.area,
      disciplina: questao.disciplina,
      tema: questao.tema,
      dificuldade: questao.dificuldade,
      respostaUsuario,
      respostaCorreta: questao.correta,
      acertou
    });
  });

  // Calcular percentuais
  Object.values(porArea).forEach(stats => {
    stats.percentual = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;
  });

  Object.values(porDificuldade).forEach(stats => {
    stats.percentual = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;
  });

  // Identificar pontos fortes e fracos
  const temasOrdenados = Object.entries(porTema)
    .filter(([, stats]) => stats.total >= 2)  // Só considera temas com pelo menos 2 questões
    .map(([tema, stats]) => ({
      tema,
      percentual: (stats.acertos / stats.total) * 100
    }))
    .sort((a, b) => b.percentual - a.percentual);

  const pontosFortes = temasOrdenados
    .filter(t => t.percentual >= 70)
    .slice(0, 5)
    .map(t => t.tema);

  const pontosFracos = temasOrdenados
    .filter(t => t.percentual < 50)
    .slice(-5)
    .map(t => t.tema);

  // Calcular nota (0-1000, estilo ENEM simplificado)
  const percentual = (acertos / simulado.questoes.length) * 100;
  const nota = Math.round(percentual * 10);

  return {
    id: simulado.id,
    tipo: simulado.tipo,
    acertos,
    erros,
    total: simulado.questoes.length,
    percentual: Math.round(percentual),
    nota,
    tempoTotal,
    data: new Date().toISOString(),
    detalhes,
    porArea,
    porDificuldade,
    pontosFortes,
    pontosFracos
  };
}

// ========================================
// PERSISTÊNCIA (LOCALSTORAGE)
// ========================================

/**
 * Salva simulado em andamento
 */
export function salvarSimuladoEmAndamento(simulado: SimuladoConfig): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(simulado));
  } catch (e) {
    console.error('Erro ao salvar simulado:', e);
  }
}

/**
 * Carrega simulado em andamento
 */
export function carregarSimuladoEmAndamento(): SimuladoConfig | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    return JSON.parse(saved);
  } catch (e) {
    console.error('Erro ao carregar simulado:', e);
    return null;
  }
}

/**
 * Remove simulado em andamento
 */
export function limparSimuladoEmAndamento(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Salva resultado no histórico
 */
export function salvarResultadoHistorico(resultado: SimuladoResultado): void {
  if (typeof window === 'undefined') return;

  try {
    const historico = carregarHistoricoSimulados();
    historico.unshift(resultado);

    // Manter apenas os últimos 50 resultados
    const historicoLimitado = historico.slice(0, 50);

    localStorage.setItem(HISTORICO_KEY, JSON.stringify(historicoLimitado));
  } catch (e) {
    console.error('Erro ao salvar resultado:', e);
  }
}

/**
 * Carrega histórico de simulados
 */
export function carregarHistoricoSimulados(): SimuladoResultado[] {
  if (typeof window === 'undefined') return [];

  try {
    const saved = localStorage.getItem(HISTORICO_KEY);
    if (!saved) return [];

    return JSON.parse(saved);
  } catch (e) {
    console.error('Erro ao carregar histórico:', e);
    return [];
  }
}

/**
 * Retorna estatísticas do histórico
 */
export function getEstatisticasHistorico(): {
  totalSimulados: number;
  totalQuestoes: number;
  mediaAcertos: number;
  melhorNota: number;
  tempoTotalEstudo: number;
  evolucao: { data: string; nota: number }[];
} {
  const historico = carregarHistoricoSimulados();

  if (historico.length === 0) {
    return {
      totalSimulados: 0,
      totalQuestoes: 0,
      mediaAcertos: 0,
      melhorNota: 0,
      tempoTotalEstudo: 0,
      evolucao: []
    };
  }

  const totalQuestoes = historico.reduce((sum, r) => sum + r.total, 0);
  const totalAcertos = historico.reduce((sum, r) => sum + r.acertos, 0);
  const tempoTotal = historico.reduce((sum, r) => sum + r.tempoTotal, 0);
  const melhorNota = Math.max(...historico.map(r => r.nota));

  const evolucao = historico
    .slice(0, 10)
    .reverse()
    .map(r => ({
      data: new Date(r.data).toLocaleDateString('pt-BR'),
      nota: r.nota
    }));

  return {
    totalSimulados: historico.length,
    totalQuestoes,
    mediaAcertos: Math.round((totalAcertos / totalQuestoes) * 100),
    melhorNota,
    tempoTotalEstudo: tempoTotal,
    evolucao
  };
}

// ========================================
// UTILITÁRIOS
// ========================================

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
 * Converte SimuladoConfig para formato legado
 */
export function simuladoParaLegado(simulado: SimuladoConfig): {
  id: string;
  questoes: QuestaoLegacy[];
  respostas: Record<number, number>;
  respostasConfirmadas: Record<number, boolean>;
  questaoAtual: number;
  inicio: string;
  area: string;
  quantidade: number;
  modoCorrecao: 'imediato' | 'final';
  tempoLimite?: number;
} {
  const letraParaIndice: Record<string, number> = {
    'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4
  };

  const respostasLegado: Record<number, number> = {};
  const respostasConfirmadas: Record<number, boolean> = {};

  Object.entries(simulado.respostas).forEach(([id, letra]) => {
    const numId = parseInt(id.split('_').pop() || '0');
    respostasLegado[numId] = letraParaIndice[letra] ?? -1;
    respostasConfirmadas[numId] = true;
  });

  return {
    id: simulado.id,
    questoes: simulado.questoes.map(q => convertToLegacy(q)),
    respostas: respostasLegado,
    respostasConfirmadas,
    questaoAtual: simulado.questaoAtual,
    inicio: simulado.inicio,
    area: simulado.area ? simulado.area.toLowerCase() : 'misto',
    quantidade: simulado.quantidade,
    modoCorrecao: simulado.modoCorrecao,
    tempoLimite: simulado.tempoLimite
  };
}
