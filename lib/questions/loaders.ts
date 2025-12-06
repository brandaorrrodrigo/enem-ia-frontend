// ========================================
// LOADERS DE QUESTOES - FUNCOES DE LEITURA
// ========================================

import {
  QuestaoCompleta,
  QuestaoSimulado,
  QuestaoLegacy,
  AreaENEM,
  DificuldadeLabel,
} from '../types/questao';

import {
  inicializarBanco,
  getAllQuestoes,
  getQuestaoById,
  getQuestaoByNumericId,
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
  exportarComoLegacy,
} from './database';

// ========================================
// LOADERS PRINCIPAIS
// ========================================

/**
 * Carrega todas as questoes do banco
 */
export function loadAllQuestions(): QuestaoCompleta[] {
  return getAllQuestoes();
}

/**
 * Carrega questao por ID (string ou numero)
 */
export function loadQuestionById(id: string | number): QuestaoCompleta | null {
  if (typeof id === 'number') {
    return getQuestaoByNumericId(id);
  }
  return getQuestaoById(id);
}

/**
 * Carrega multiplas questoes por IDs
 */
export function loadQuestionsByIds(ids: (string | number)[]): QuestaoCompleta[] {
  return ids
    .map((id) => loadQuestionById(id))
    .filter((q): q is QuestaoCompleta => q !== null);
}

/**
 * Carrega questoes por area
 */
export function loadQuestionsByArea(area: AreaENEM): QuestaoCompleta[] {
  const ids = getIdsByArea(area);
  return loadQuestionsByIds(ids);
}

/**
 * Carrega questoes por disciplina
 */
export function loadQuestionsByDisciplina(disciplina: string): QuestaoCompleta[] {
  const ids = getIdsByDisciplina(disciplina);
  return loadQuestionsByIds(ids);
}

/**
 * Carrega questoes por tema/assunto
 */
export function loadQuestionsByTema(tema: string): QuestaoCompleta[] {
  const ids = getIdsByTema(tema);
  return loadQuestionsByIds(ids);
}

/**
 * Carrega questoes por ano
 */
export function loadQuestionsByAno(ano: number): QuestaoCompleta[] {
  const ids = getIdsByAno(ano);
  return loadQuestionsByIds(ids);
}

/**
 * Carrega questoes por dificuldade
 */
export function loadQuestionsByDificuldade(dificuldade: DificuldadeLabel): QuestaoCompleta[] {
  const ids = getIdsByDificuldade(dificuldade);
  return loadQuestionsByIds(ids);
}

/**
 * Carrega questoes por tag
 */
export function loadQuestionsByTag(tag: string): QuestaoCompleta[] {
  const ids = getIdsByTag(tag);
  return loadQuestionsByIds(ids);
}

// ========================================
// LOADERS COMPOSTOS
// ========================================

/**
 * Carrega questoes por area e disciplina
 */
export function loadQuestionsByAreaAndDisciplina(
  area: AreaENEM,
  disciplina: string
): QuestaoCompleta[] {
  const idsPorArea = new Set(getIdsByArea(area));
  const idsPorDisciplina = getIdsByDisciplina(disciplina);

  // Intersecao
  const idsResultado = idsPorDisciplina.filter((id) => idsPorArea.has(id));
  return loadQuestionsByIds(idsResultado);
}

/**
 * Carrega questoes por area e dificuldade
 */
export function loadQuestionsByAreaAndDificuldade(
  area: AreaENEM,
  dificuldade: DificuldadeLabel
): QuestaoCompleta[] {
  const idsPorArea = new Set(getIdsByArea(area));
  const idsPorDificuldade = getIdsByDificuldade(dificuldade);

  const idsResultado = idsPorDificuldade.filter((id) => idsPorArea.has(id));
  return loadQuestionsByIds(idsResultado);
}

/**
 * Carrega questoes por disciplina e tema
 */
export function loadQuestionsByDisciplinaAndTema(
  disciplina: string,
  tema: string
): QuestaoCompleta[] {
  const idsPorDisciplina = new Set(getIdsByDisciplina(disciplina));
  const idsPorTema = getIdsByTema(tema);

  const idsResultado = idsPorTema.filter((id) => idsPorDisciplina.has(id));
  return loadQuestionsByIds(idsResultado);
}

/**
 * Carrega questoes por ano e area
 */
export function loadQuestionsByAnoAndArea(ano: number, area: AreaENEM): QuestaoCompleta[] {
  const idsPorAno = new Set(getIdsByAno(ano));
  const idsPorArea = getIdsByArea(area);

  const idsResultado = idsPorArea.filter((id) => idsPorAno.has(id));
  return loadQuestionsByIds(idsResultado);
}

// ========================================
// LOADERS PARA SIMULADO (VERSAO LEVE)
// ========================================

/**
 * Carrega questoes em formato leve para simulado
 */
export function loadSimuladoQuestions(ids: string[]): QuestaoSimulado[] {
  return getQuestoesSimulado(ids);
}

/**
 * Carrega questoes aleatorias para simulado
 */
export function loadRandomSimuladoQuestions(
  quantidade: number,
  area?: AreaENEM,
  dificuldade?: DificuldadeLabel
): QuestaoSimulado[] {
  let questoes = getAllQuestoes();

  // Filtrar por area
  if (area) {
    questoes = questoes.filter((q) => q.area === area);
  }

  // Filtrar por dificuldade
  if (dificuldade) {
    questoes = questoes.filter((q) => q.dificuldade === dificuldade);
  }

  // Embaralhar
  questoes = questoes.sort(() => Math.random() - 0.5);

  // Limitar
  questoes = questoes.slice(0, Math.min(quantidade, questoes.length));

  // Converter para formato simulado
  return getQuestoesSimulado(questoes.map((q) => q.id));
}

// ========================================
// LOADERS PARA COMPATIBILIDADE LEGADA
// ========================================

/**
 * Carrega todas questoes em formato legado
 */
export function loadAllQuestionsLegacy(): QuestaoLegacy[] {
  return exportarComoLegacy();
}

/**
 * Carrega questao legada por ID numerico
 */
export function loadQuestionLegacyById(id: number): QuestaoLegacy | null {
  const questao = getQuestaoByNumericId(id);
  if (!questao) return null;

  const indiceCorreta = questao.alternativas.findIndex((a) => a.correta);
  return {
    id: id,
    area: questao.area,
    disciplina: questao.disciplina,
    assunto: questao.tema,
    enunciado: questao.enunciado,
    alternativas: questao.alternativas.map((a) => a.texto),
    correta: indiceCorreta,
    explicacao: questao.explicacao,
    dificuldade: questao.dificuldade,
    ano: questao.origem.ano,
    fonte: questao.origem.tipo === 'enem_oficial' ? 'enem' : undefined,
    imagem: questao.imagens?.[0]?.url,
  };
}

// ========================================
// LOADERS DE METADADOS
// ========================================

/**
 * Carrega estatisticas do banco
 */
export function loadBancoStats() {
  return getEstatisticasBanco();
}

/**
 * Carrega lista de areas disponiveis
 */
export function loadAreas(): AreaENEM[] {
  return getAreasDisponiveis();
}

/**
 * Carrega disciplinas de uma area
 */
export function loadDisciplinas(area: AreaENEM): string[] {
  return getDisciplinasPorArea(area);
}

/**
 * Carrega temas de uma disciplina
 */
export function loadTemas(disciplina: string): string[] {
  return getTemasPorDisciplina(disciplina);
}

/**
 * Carrega anos disponiveis
 */
export function loadAnos(): number[] {
  const stats = getEstatisticasBanco();
  return stats.anos;
}

/**
 * Carrega contagem de questoes por criterio
 */
export function loadQuestionCount(criterio?: {
  area?: AreaENEM;
  disciplina?: string;
  tema?: string;
  dificuldade?: DificuldadeLabel;
  ano?: number;
}): number {
  if (!criterio) {
    return getAllQuestoes().length;
  }

  let questoes = getAllQuestoes();

  if (criterio.area) {
    questoes = questoes.filter((q) => q.area === criterio.area);
  }
  if (criterio.disciplina) {
    questoes = questoes.filter((q) => q.disciplina === criterio.disciplina);
  }
  if (criterio.tema) {
    questoes = questoes.filter((q) => q.tema === criterio.tema);
  }
  if (criterio.dificuldade) {
    questoes = questoes.filter((q) => q.dificuldade === criterio.dificuldade);
  }
  if (criterio.ano) {
    questoes = questoes.filter((q) => q.origem.ano === criterio.ano);
  }

  return questoes.length;
}

// ========================================
// LOADERS PAGINADOS
// ========================================

interface LoaderPaginado<T> {
  items: T[];
  total: number;
  pagina: number;
  porPagina: number;
  totalPaginas: number;
  temMais: boolean;
}

/**
 * Carrega questoes com paginacao
 */
export function loadQuestionsPaginated(
  pagina: number = 1,
  porPagina: number = 20,
  filtros?: {
    area?: AreaENEM;
    disciplina?: string;
    dificuldade?: DificuldadeLabel;
  }
): LoaderPaginado<QuestaoCompleta> {
  let questoes = getAllQuestoes();

  // Aplicar filtros
  if (filtros?.area) {
    questoes = questoes.filter((q) => q.area === filtros.area);
  }
  if (filtros?.disciplina) {
    questoes = questoes.filter((q) => q.disciplina === filtros.disciplina);
  }
  if (filtros?.dificuldade) {
    questoes = questoes.filter((q) => q.dificuldade === filtros.dificuldade);
  }

  const total = questoes.length;
  const totalPaginas = Math.ceil(total / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const items = questoes.slice(inicio, inicio + porPagina);

  return {
    items,
    total,
    pagina,
    porPagina,
    totalPaginas,
    temMais: pagina < totalPaginas,
  };
}

// ========================================
// LOADERS ASYNC (para uso com API)
// ========================================

/**
 * Versao async do loader principal
 */
export async function loadAllQuestionsAsync(): Promise<QuestaoCompleta[]> {
  // Simular delay de rede se necessario
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getAllQuestoes());
    }, 0);
  });
}

/**
 * Versao async do loader por ID
 */
export async function loadQuestionByIdAsync(
  id: string | number
): Promise<QuestaoCompleta | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loadQuestionById(id));
    }, 0);
  });
}

/**
 * Versao async do loader paginado
 */
export async function loadQuestionsPaginatedAsync(
  pagina: number = 1,
  porPagina: number = 20,
  filtros?: {
    area?: AreaENEM;
    disciplina?: string;
    dificuldade?: DificuldadeLabel;
  }
): Promise<LoaderPaginado<QuestaoCompleta>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(loadQuestionsPaginated(pagina, porPagina, filtros));
    }, 0);
  });
}
