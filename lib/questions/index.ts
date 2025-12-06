// ========================================
// MODULO DE QUESTOES - EXPORTS PRINCIPAIS
// ========================================

// ========================================
// BANCO DE DADOS E ESTRUTURA
// ========================================
export {
  inicializarBanco,
  getQuestaoById,
  getQuestaoByNumericId,
  getAllQuestoes,
  getQuestoesSimulado,
  getIdsByArea,
  getIdsByDisciplina,
  getIdsByTema,
  getIdsByAno,
  getIdsByDificuldade,
  getIdsByTag,
  getEstatisticasBanco,
  getAreasDisponiveis,
  getDisciplinasPorArea,
  getTemasPorDisciplina,
  getIndiceCompleto,
  adicionarQuestao,
  adicionarQuestoes,
  removerQuestao,
  exportarBancoJSON,
  importarBancoJSON,
  exportarComoLegacy,
} from './database';

// ========================================
// LOADERS DE QUESTOES
// ========================================
export {
  loadAllQuestions,
  loadQuestionById,
  loadQuestionsByIds,
  loadQuestionsByArea,
  loadQuestionsByDisciplina,
  loadQuestionsByTema,
  loadQuestionsByAno,
  loadQuestionsByDificuldade,
  loadQuestionsByTag,
  loadQuestionsByAreaAndDisciplina,
  loadQuestionsByAreaAndDificuldade,
  loadQuestionsByDisciplinaAndTema,
  loadQuestionsByAnoAndArea,
  loadSimuladoQuestions,
  loadRandomSimuladoQuestions,
  loadAllQuestionsLegacy,
  loadQuestionLegacyById,
  loadBancoStats,
  loadAreas,
  loadDisciplinas,
  loadTemas,
  loadAnos,
  loadQuestionCount,
  loadQuestionsPaginated,
  loadAllQuestionsAsync,
  loadQuestionByIdAsync,
  loadQuestionsPaginatedAsync,
} from './loaders';

// ========================================
// FILTROS INTELIGENTES
// ========================================
export {
  getQuestionsByFilter,
  getQuestionsByFilterPaginated,
  getQuestoesSimilares,
  getQuestoesRevisao,
  getQuestoesProgressivas,
  getQuestoesTreinoTema,
  buscarQuestoesPorTexto,
  getSimuladoQuestionsByFilter,
  getDistribuicaoBalanceada,
  getMixDificuldades,
  contarQuestoes,
  getDistribuicaoPorArea,
  getDistribuicaoPorDificuldade,
  getContagemPorTema,
} from './filters';

// ========================================
// GERADOR DE SIMULADOS
// ========================================
export {
  gerarSimulado,
  gerarSimuladoCompleto,
  gerarSimuladoPorArea,
  gerarSimuladoPorDisciplina,
  gerarSimuladoPorTema,
  gerarSimuladoRevisao,
  gerarSimuladoRapido,
  gerarSimuladoProgressivo,
  gerarSimuladoDiario,
  calcularResultado,
  salvarSimuladoEmAndamento,
  carregarSimuladoEmAndamento,
  limparSimuladoEmAndamento,
  salvarResultadoHistorico,
  carregarHistoricoSimulados,
  getEstatisticasHistorico,
} from './simulado-generator';

// Re-export tipos do gerador
export type {
  SimuladoConfig,
  SimuladoResultado,
  ResultadoQuestao,
  OpcoesSimulado,
} from './simulado-generator';

// ========================================
// CACHE E OTIMIZACAO
// ========================================
export {
  cacheQuestoes,
  cacheListas,
  cacheFiltros,
  cacheStats,
  gerarChaveFiltro,
  gerarChaveQuestao,
  gerarChaveSimulado,
  withCache,
  withCacheAsync,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  limparCacheAntigo,
  indiceQuestoes,
  adicionarPrefetch,
  getTodasEstatisticasCache,
  limparTodosOsCaches,
} from './cache';

// ========================================
// BANCO LEGADO (COMPATIBILIDADE)
// ========================================
export { bancoQuestoes, getTodasQuestoes, getQuestaoPorId } from './banco-questoes';

// ========================================
// FUNCOES LEGADAS PARA COMPATIBILIDADE
// ========================================

import { gerarSimulado, carregarSimuladoEmAndamento, salvarSimuladoEmAndamento, limparSimuladoEmAndamento } from './simulado-generator';
import { getQuestionsByFilter } from './filters';
import type { AreaENEM, DificuldadeLabel, FiltroQuestoesCompleto } from '../types/questao';

// Alias para funcoes antigas
export function generateSimulado(
  quantidade: number,
  area?: string,
  disciplina?: string,
  dificuldade?: 'facil' | 'medio' | 'dificil' | 'misto',
  modoCorrecao: 'imediato' | 'final' = 'final'
) {
  return gerarSimulado({
    quantidade,
    area: area as AreaENEM | undefined,
    disciplinas: disciplina ? [disciplina] : undefined,
    dificuldade,
    modoCorrecao,
  });
}

export function generateSimuladoCompleto(modoCorrecao: 'imediato' | 'final' = 'final') {
  return gerarSimulado({
    quantidade: 90,
    balanceado: true,
    modoCorrecao,
    tempoLimite: 270,
  });
}

export function generateSimuladoRevisao(
  areasAlvo: string[],
  quantidade: number = 20,
  modoCorrecao: 'imediato' | 'final' = 'imediato'
) {
  return gerarSimulado({
    quantidade,
    area: areasAlvo[0] as AreaENEM,
    modoCorrecao,
  });
}

// Re-export funcoes de persistencia com nomes antigos
export { carregarSimuladoEmAndamento as loadSimuladoEmAndamento };
export { salvarSimuladoEmAndamento as saveSimuladoEmAndamento };
export { limparSimuladoEmAndamento as clearSimuladoEmAndamento };

// Filtro legado
export function getQuestoesByFilter(filtro: {
  areas?: string[];
  disciplinas?: string[];
  assuntos?: string[];
  dificuldades?: ('facil' | 'medio' | 'dificil')[];
  anos?: number[];
  excluirIds?: number[];
  quantidade?: number;
}) {
  const filtroNovo: FiltroQuestoesCompleto = {
    areas: filtro.areas as AreaENEM[] | undefined,
    disciplinas: filtro.disciplinas,
    temas: filtro.assuntos,
    dificuldades: filtro.dificuldades,
    anos: filtro.anos,
    excluirIds: filtro.excluirIds?.map(id => `legacy_${id}`),
    limite: filtro.quantidade,
  };

  return getQuestionsByFilter(filtroNovo);
}
