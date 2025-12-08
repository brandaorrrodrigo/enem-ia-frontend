// ========================================
// GERADOR DE SIMULADOS - ENGINE PRINCIPAL
// ========================================

import {
  QuestaoCompleta,
  QuestaoSimulado,
  AreaENEM,
  DificuldadeLabel,
  FiltroQuestoesCompleto,
  questaoCompletaToLegacy,
} from '../types/questao';
import { Questao } from '../types';

import { getQuestionsByFilter, getDistribuicaoBalanceada, getMixDificuldades } from './filters';
import { getQuestoesSimulado } from './database';

// ========================================
// TIPOS DO SIMULADO
// ========================================

export interface SimuladoConfig {
  id: string;
  tipo?: 'completo' | 'area' | 'disciplina' | 'tema' | 'revisao' | 'aleatorio' | 'personalizado';
  titulo?: string;
  descricao?: string;
  questoes: Questao[];
  respostas: { [questaoId: number]: number };
  respostasConfirmadas: { [questaoId: number]: boolean };
  questaoAtual: number;
  inicio: string;
  fim?: string;
  area: string;
  quantidade: number;
  modoCorrecao: 'imediato' | 'final';
  tempoLimite?: number;
  tempoDecorrido?: number;
}

export interface SimuladoResultado {
  id: string;
  simuladoId: string;
  acertos: number;
  erros: number;
  total: number;
  nota: number;
  notaEnem?: number;
  tempoMinutos: number;
  area?: string;
  tipo: string;
  detalhes: ResultadoQuestao[];
  data: string;
  xpGanho: number;
  pontosGanhos: number;
  desempenhoPorArea: { [area: string]: { acertos: number; total: number } };
  desempenhoPorDificuldade: { [dif: string]: { acertos: number; total: number } };
}

export interface ResultadoQuestao {
  id: string;
  area: AreaENEM;
  disciplina: string;
  tema: string;
  dificuldade: DificuldadeLabel;
  respostaUsuario?: number;
  respostaCorreta: number;
  acertou: boolean;
  tempoResposta?: number;
}

export interface OpcoesSimulado {
  quantidade?: number;
  area?: AreaENEM;
  disciplinas?: string[];
  temas?: string[];
  dificuldade?: 'facil' | 'medio' | 'dificil' | 'misto' | 'progressivo';
  perfil?: 'iniciante' | 'intermediario' | 'avancado';
  modoCorrecao?: 'imediato' | 'final';
  tempoLimite?: number;
  excluirIds?: string[];
  balanceado?: boolean;
}

// ========================================
// GERADOR PRINCIPAL
// ========================================

/**
 * Gera ID unico para simulado
 */
function gerarSimuladoId(tipo: string): string {
  return `sim_${tipo}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Gera simulado personalizado
 */
export function gerarSimulado(opcoes: OpcoesSimulado): SimuladoConfig {
  const {
    quantidade = 15,
    area,
    disciplinas,
    temas,
    dificuldade = 'misto',
    perfil = 'intermediario',
    modoCorrecao = 'final',
    tempoLimite,
    excluirIds,
    balanceado = false,
  } = opcoes;

  let questoes: QuestaoCompleta[] = [];

  // Se balanceado, distribuir entre areas
  if (balanceado && !area) {
    const distribuicao = getDistribuicaoBalanceada(quantidade);
    distribuicao.forEach(({ area, quantidade: qtd }) => {
      const filtro: FiltroQuestoesCompleto = {
        areas: [area],
        disciplinas,
        temas,
        excluirIds,
        ordenarPor: 'aleatorio',
        limite: qtd,
      };

      if (dificuldade !== 'misto' && dificuldade !== 'progressivo') {
        filtro.dificuldades = [dificuldade];
      }

      questoes.push(...getQuestionsByFilter(filtro));
    });
  } else {
    // Filtro simples
    const filtro: FiltroQuestoesCompleto = {
      areas: area ? [area] : undefined,
      disciplinas,
      temas,
      excluirIds,
      ordenarPor: 'aleatorio',
      limite: quantidade,
    };

    if (dificuldade !== 'misto' && dificuldade !== 'progressivo') {
      filtro.dificuldades = [dificuldade];
    }

    questoes = getQuestionsByFilter(filtro);
  }

  // Se progressivo, ordenar por dificuldade
  if (dificuldade === 'progressivo') {
    questoes = questoes.sort((a, b) => a.dificuldadeNivel - b.dificuldadeNivel);
  } else {
    // Embaralhar novamente
    questoes = questoes.sort(() => Math.random() - 0.5);
  }

  // Limitar quantidade final
  questoes = questoes.slice(0, quantidade);

  // Converter para formato legado (compatibilidade)
  const questoesLegado: Questao[] = questoes.map((q) => questaoCompletaToLegacy(q));

  // Determinar tipo
  let tipo: SimuladoConfig['tipo'] = 'personalizado';
  if (area) tipo = 'area';
  if (disciplinas && disciplinas.length > 0) tipo = 'disciplina';
  if (temas && temas.length > 0) tipo = 'tema';
  if (balanceado) tipo = 'completo';

  return {
    id: gerarSimuladoId(tipo || 'personalizado'),
    tipo,
    questoes: questoesLegado,
    respostas: {},
    respostasConfirmadas: {},
    questaoAtual: 0,
    inicio: new Date().toISOString(),
    area: area || 'todas',
    quantidade: questoesLegado.length,
    modoCorrecao,
    tempoLimite,
  };
}

// ========================================
// GERADORES ESPECIALIZADOS
// ========================================

/**
 * Gera simulado completo estilo ENEM
 */
export function gerarSimuladoCompleto(
  modoCorrecao: 'imediato' | 'final' = 'final'
): SimuladoConfig {
  return gerarSimulado({
    quantidade: 90,
    balanceado: true,
    modoCorrecao,
    tempoLimite: 270, // 4h30min
  });
}

/**
 * Gera simulado por area
 */
export function gerarSimuladoPorArea(
  area: AreaENEM,
  quantidade: number = 45,
  modoCorrecao: 'imediato' | 'final' = 'final'
): SimuladoConfig {
  return gerarSimulado({
    quantidade,
    area,
    modoCorrecao,
    tempoLimite: Math.round(quantidade * 1.5),
  });
}

/**
 * Gera simulado por disciplina
 */
export function gerarSimuladoPorDisciplina(
  disciplina: string,
  quantidade: number = 20,
  modoCorrecao: 'imediato' | 'final' = 'imediato'
): SimuladoConfig {
  return gerarSimulado({
    quantidade,
    disciplinas: [disciplina],
    modoCorrecao,
  });
}

/**
 * Gera simulado por tema
 */
export function gerarSimuladoPorTema(
  tema: string,
  quantidade: number = 10,
  modoCorrecao: 'imediato' | 'final' = 'imediato'
): SimuladoConfig {
  return gerarSimulado({
    quantidade,
    temas: [tema],
    modoCorrecao,
  });
}

/**
 * Gera simulado de revisao (areas fracas)
 */
export function gerarSimuladoRevisao(
  areasAlvo: AreaENEM[],
  quantidade: number = 20,
  modoCorrecao: 'imediato' | 'final' = 'imediato'
): SimuladoConfig {
  const questoesRevisao: QuestaoCompleta[] = [];
  const questoesPorArea = Math.ceil(quantidade / areasAlvo.length);

  areasAlvo.forEach((area) => {
    const questoes = getQuestionsByFilter({
      areas: [area],
      dificuldades: ['facil', 'medio'],
      ordenarPor: 'aleatorio',
      limite: questoesPorArea,
    });
    questoesRevisao.push(...questoes);
  });

  // Embaralhar e limitar
  const questoesFinais = questoesRevisao
    .sort(() => Math.random() - 0.5)
    .slice(0, quantidade);

  // Converter para formato legado
  const questoesLegado: Questao[] = questoesFinais.map((q) => questaoCompletaToLegacy(q));

  return {
    id: gerarSimuladoId('revisao'),
    tipo: 'revisao',
    titulo: 'Simulado de Revisao',
    descricao: `Focado em: ${areasAlvo.join(', ')}`,
    questoes: questoesLegado,
    respostas: {},
    respostasConfirmadas: {},
    questaoAtual: 0,
    inicio: new Date().toISOString(),
    area: 'revisao',
    quantidade: questoesLegado.length,
    modoCorrecao,
  };
}

/**
 * Gera simulado rapido (10 questoes)
 */
export function gerarSimuladoRapido(area?: AreaENEM): SimuladoConfig {
  return gerarSimulado({
    quantidade: 10,
    area,
    dificuldade: 'misto',
    modoCorrecao: 'imediato',
    tempoLimite: 15,
  });
}

/**
 * Gera simulado progressivo (comeca facil, aumenta dificuldade)
 */
export function gerarSimuladoProgressivo(
  area?: AreaENEM,
  quantidade: number = 15
): SimuladoConfig {
  return gerarSimulado({
    quantidade,
    area,
    dificuldade: 'progressivo',
    modoCorrecao: 'imediato',
  });
}

/**
 * Gera simulado diario (desafio do dia)
 */
export function gerarSimuladoDiario(): SimuladoConfig {
  // Seed baseado na data para mesmo resultado no dia
  const hoje = new Date();
  const seed = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();

  // Pseudo-random baseado no seed
  const random = (max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };

  const areas: AreaENEM[] = ['matematica', 'linguagens', 'humanas', 'natureza'];
  const areaDoDia = areas[random(areas.length)];

  return gerarSimulado({
    quantidade: 5,
    area: areaDoDia,
    dificuldade: 'misto',
    modoCorrecao: 'imediato',
  });
}

// ========================================
// PROCESSAMENTO DE RESULTADOS
// ========================================

/**
 * Calcula resultado do simulado
 */
export function calcularResultado(simulado: SimuladoConfig): SimuladoResultado {
  const detalhes: ResultadoQuestao[] = [];
  let acertos = 0;
  let erros = 0;
  const desempenhoPorArea: { [area: string]: { acertos: number; total: number } } = {};
  const desempenhoPorDificuldade: { [dif: string]: { acertos: number; total: number } } = {};

  simulado.questoes.forEach((questao) => {
    const respostaUsuario = simulado.respostas[questao.id];
    const acertou = respostaUsuario === questao.correta;

    if (acertou) {
      acertos++;
    } else {
      erros++;
    }

    // Estatisticas por area
    if (!desempenhoPorArea[questao.area]) {
      desempenhoPorArea[questao.area] = { acertos: 0, total: 0 };
    }
    desempenhoPorArea[questao.area].total++;
    if (acertou) desempenhoPorArea[questao.area].acertos++;

    // Estatisticas por dificuldade
    if (!desempenhoPorDificuldade[questao.dificuldade]) {
      desempenhoPorDificuldade[questao.dificuldade] = { acertos: 0, total: 0 };
    }
    desempenhoPorDificuldade[questao.dificuldade].total++;
    if (acertou) desempenhoPorDificuldade[questao.dificuldade].acertos++;

    detalhes.push({
      id: String(questao.id),
      area: questao.area as AreaENEM,
      disciplina: questao.disciplina,
      tema: questao.assunto,
      dificuldade: questao.dificuldade as DificuldadeLabel,
      respostaUsuario,
      respostaCorreta: questao.correta,
      acertou,
    });
  });

  const total = simulado.questoes.length;
  const nota = total > 0 ? Math.round((acertos / total) * 1000) / 10 : 0;

  // Calcular tempo
  const inicio = new Date(simulado.inicio);
  const fim = simulado.fim ? new Date(simulado.fim) : new Date();
  const tempoMinutos = Math.round((fim.getTime() - inicio.getTime()) / 60000);

  // Calcular FP e pontos
  const fpBase = acertos * 10;
  const bonusTempo = tempoMinutos < (simulado.tempoLimite || 60) ? Math.round(fpBase * 0.1) : 0;
  const bonusNota = nota >= 70 ? Math.round(fpBase * 0.2) : 0;
  const fpGanho = fpBase + bonusTempo + bonusNota;
  const xpGanho = fpGanho; // Alias para compatibilidade
  const pontosGanhos = Math.round(fpGanho * 0.5);

  return {
    id: `res_${Date.now()}`,
    simuladoId: simulado.id,
    acertos,
    erros,
    total,
    nota,
    notaEnem: calcularNotaEnem(nota, total),
    tempoMinutos,
    area: simulado.area,
    tipo: simulado.tipo || 'personalizado',
    detalhes,
    data: new Date().toISOString(),
    xpGanho,
    pontosGanhos,
    desempenhoPorArea,
    desempenhoPorDificuldade,
  };
}

/**
 * Calcula nota aproximada do ENEM (TRI simplificada)
 */
function calcularNotaEnem(percentualAcertos: number, totalQuestoes: number): number {
  // Simulacao simplificada da TRI
  // Nota ENEM varia de ~300 a ~900
  const notaMinima = 300;
  const notaMaxima = 900;
  const range = notaMaxima - notaMinima;

  // Ajustar pela quantidade de questoes (penalizar simulados muito pequenos)
  const fatorQuantidade = Math.min(1, totalQuestoes / 45);

  // Calcular nota
  const nota = notaMinima + (percentualAcertos / 100) * range * fatorQuantidade;

  return Math.round(nota);
}

// ========================================
// PERSISTENCIA (LOCALSTORAGE)
// ========================================

const STORAGE_KEY_ANDAMENTO = 'simulado_em_andamento';
const STORAGE_KEY_HISTORICO = 'historico_simulados';

/**
 * Salva simulado em andamento
 */
export function salvarSimuladoEmAndamento(simulado: SimuladoConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_ANDAMENTO, JSON.stringify(simulado));
  }
}

/**
 * Carrega simulado em andamento
 */
export function carregarSimuladoEmAndamento(): SimuladoConfig | null {
  if (typeof window !== 'undefined') {
    const dados = localStorage.getItem(STORAGE_KEY_ANDAMENTO);
    if (dados) {
      return JSON.parse(dados);
    }
  }
  return null;
}

/**
 * Remove simulado em andamento
 */
export function limparSimuladoEmAndamento(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_ANDAMENTO);
  }
}

/**
 * Salva resultado no historico
 */
export function salvarResultadoHistorico(resultado: SimuladoResultado): void {
  if (typeof window !== 'undefined') {
    const historico = carregarHistoricoSimulados();
    historico.unshift(resultado);

    // Manter apenas os ultimos 100 resultados
    const historicoLimitado = historico.slice(0, 100);

    localStorage.setItem(STORAGE_KEY_HISTORICO, JSON.stringify(historicoLimitado));
  }
}

/**
 * Carrega historico de simulados
 */
export function carregarHistoricoSimulados(): SimuladoResultado[] {
  if (typeof window !== 'undefined') {
    const dados = localStorage.getItem(STORAGE_KEY_HISTORICO);
    if (dados) {
      return JSON.parse(dados);
    }
  }
  return [];
}

/**
 * Retorna estatisticas do historico
 */
export function getEstatisticasHistorico(): {
  totalSimulados: number;
  mediaAcertos: number;
  mediaNota: number;
  tempoTotalMinutos: number;
  melhorNota: number;
  piorNota: number;
  ultimosSimulados: SimuladoResultado[];
} {
  const historico = carregarHistoricoSimulados();

  if (historico.length === 0) {
    return {
      totalSimulados: 0,
      mediaAcertos: 0,
      mediaNota: 0,
      tempoTotalMinutos: 0,
      melhorNota: 0,
      piorNota: 0,
      ultimosSimulados: [],
    };
  }

  const totalSimulados = historico.length;
  const somaAcertos = historico.reduce((sum, r) => sum + (r.acertos / r.total) * 100, 0);
  const somaNotas = historico.reduce((sum, r) => sum + r.nota, 0);
  const tempoTotal = historico.reduce((sum, r) => sum + r.tempoMinutos, 0);
  const notas = historico.map((r) => r.nota);

  return {
    totalSimulados,
    mediaAcertos: Math.round(somaAcertos / totalSimulados),
    mediaNota: Math.round((somaNotas / totalSimulados) * 10) / 10,
    tempoTotalMinutos: tempoTotal,
    melhorNota: Math.max(...notas),
    piorNota: Math.min(...notas),
    ultimosSimulados: historico.slice(0, 10),
  };
}
