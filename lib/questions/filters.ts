// ========================================
// FILTROS INTELIGENTES DE QUESTOES
// ========================================

import {
  QuestaoCompleta,
  QuestaoSimulado,
  AreaENEM,
  DificuldadeLabel,
  DificuldadeNivel,
  FiltroQuestoesCompleto,
  ResultadoBuscaQuestoes,
} from '../types/questao';

import { getAllQuestoes, getQuestoesSimulado } from './database';

// ========================================
// FILTRO PRINCIPAL
// ========================================

/**
 * Filtra questoes baseado em criterios avancados
 */
export function getQuestionsByFilter(
  filtro: FiltroQuestoesCompleto
): QuestaoCompleta[] {
  let questoes = getAllQuestoes();

  // Filtrar apenas ativas
  if (filtro.apenasAtivas !== false) {
    questoes = questoes.filter((q) => q.ativa);
  }

  // Filtro por areas
  if (filtro.areas && filtro.areas.length > 0) {
    questoes = questoes.filter((q) => filtro.areas!.includes(q.area));
  }

  // Filtro por disciplinas
  if (filtro.disciplinas && filtro.disciplinas.length > 0) {
    questoes = questoes.filter((q) => filtro.disciplinas!.includes(q.disciplina));
  }

  // Filtro por temas
  if (filtro.temas && filtro.temas.length > 0) {
    questoes = questoes.filter((q) => filtro.temas!.includes(q.tema));
  }

  // Filtro por subtemas
  if (filtro.subtemas && filtro.subtemas.length > 0) {
    questoes = questoes.filter(
      (q) => q.subtema && filtro.subtemas!.includes(q.subtema)
    );
  }

  // Filtro por dificuldades (labels)
  if (filtro.dificuldades && filtro.dificuldades.length > 0) {
    questoes = questoes.filter((q) =>
      filtro.dificuldades!.includes(q.dificuldade)
    );
  }

  // Filtro por dificuldade minima/maxima (nivel numerico)
  if (filtro.dificuldadeMin !== undefined) {
    questoes = questoes.filter((q) => q.dificuldadeNivel >= filtro.dificuldadeMin!);
  }
  if (filtro.dificuldadeMax !== undefined) {
    questoes = questoes.filter((q) => q.dificuldadeNivel <= filtro.dificuldadeMax!);
  }

  // Filtro por anos
  if (filtro.anos && filtro.anos.length > 0) {
    questoes = questoes.filter(
      (q) => q.origem.ano && filtro.anos!.includes(q.origem.ano)
    );
  }

  // Filtro por tipo de origem
  if (filtro.tiposOrigem && filtro.tiposOrigem.length > 0) {
    questoes = questoes.filter((q) =>
      filtro.tiposOrigem!.includes(q.origem.tipo)
    );
  }

  // Filtro por tags
  if (filtro.tags && filtro.tags.length > 0) {
    const tagsLower = filtro.tags.map((t) => t.toLowerCase());
    questoes = questoes.filter((q) =>
      q.tags.some((t) => tagsLower.includes(t.toLowerCase()))
    );
  }

  // Filtro por palavras-chave
  if (filtro.palavrasChave && filtro.palavrasChave.length > 0) {
    const palavrasLower = filtro.palavrasChave.map((p) => p.toLowerCase());
    questoes = questoes.filter((q) =>
      q.palavrasChave.some((p) => palavrasLower.includes(p.toLowerCase()))
    );
  }

  // Filtro por busca textual (enunciado)
  if (filtro.busca && filtro.busca.trim()) {
    const termoBusca = filtro.busca.toLowerCase().trim();
    questoes = questoes.filter(
      (q) =>
        q.enunciado.toLowerCase().includes(termoBusca) ||
        q.tema.toLowerCase().includes(termoBusca) ||
        q.disciplina.toLowerCase().includes(termoBusca) ||
        q.tags.some((t) => t.toLowerCase().includes(termoBusca))
    );
  }

  // Excluir IDs especificos
  if (filtro.excluirIds && filtro.excluirIds.length > 0) {
    const idsExcluir = new Set(filtro.excluirIds);
    questoes = questoes.filter((q) => !idsExcluir.has(q.id));
  }

  // Excluir temas especificos
  if (filtro.excluirTemas && filtro.excluirTemas.length > 0) {
    const temasExcluir = new Set(
      filtro.excluirTemas.map((t) => t.toLowerCase())
    );
    questoes = questoes.filter(
      (q) => !temasExcluir.has(q.tema.toLowerCase())
    );
  }

  // Ordenacao
  questoes = ordenarQuestoes(questoes, filtro.ordenarPor, filtro.ordem);

  // Limite
  if (filtro.limite && filtro.limite > 0) {
    questoes = questoes.slice(0, filtro.limite);
  }

  return questoes;
}

/**
 * Filtro com paginacao e resultado completo
 */
export function getQuestionsByFilterPaginated(
  filtro: FiltroQuestoesCompleto
): ResultadoBuscaQuestoes {
  // Primeiro, aplicar filtros sem paginacao
  const filtroSemPaginacao = { ...filtro };
  delete filtroSemPaginacao.pagina;
  delete filtroSemPaginacao.porPagina;

  const questoesFiltradas = getQuestionsByFilter(filtroSemPaginacao);
  const total = questoesFiltradas.length;

  // Aplicar paginacao
  const pagina = filtro.pagina || 1;
  const porPagina = filtro.porPagina || 20;
  const inicio = (pagina - 1) * porPagina;
  const questoesPaginadas = questoesFiltradas.slice(inicio, inicio + porPagina);
  const totalPaginas = Math.ceil(total / porPagina);

  return {
    questoes: questoesPaginadas,
    total,
    pagina,
    totalPaginas,
    temMais: pagina < totalPaginas,
    filtrosAplicados: filtro,
  };
}

// ========================================
// FUNCOES DE ORDENACAO
// ========================================

type OrdenacaoTipo = 'dificuldade' | 'ano' | 'taxaAcerto' | 'aleatorio' | 'recentes';
type OrdemTipo = 'asc' | 'desc';

function ordenarQuestoes(
  questoes: QuestaoCompleta[],
  ordenarPor?: OrdenacaoTipo,
  ordem: OrdemTipo = 'asc'
): QuestaoCompleta[] {
  if (!ordenarPor) return questoes;

  const resultado = [...questoes];

  switch (ordenarPor) {
    case 'dificuldade':
      resultado.sort((a, b) => {
        const diff = a.dificuldadeNivel - b.dificuldadeNivel;
        return ordem === 'asc' ? diff : -diff;
      });
      break;

    case 'ano':
      resultado.sort((a, b) => {
        const anoA = a.origem.ano || 0;
        const anoB = b.origem.ano || 0;
        const diff = anoA - anoB;
        return ordem === 'asc' ? diff : -diff;
      });
      break;

    case 'taxaAcerto':
      resultado.sort((a, b) => {
        const taxaA = a.estatisticas?.taxaAcerto || 0.5;
        const taxaB = b.estatisticas?.taxaAcerto || 0.5;
        const diff = taxaA - taxaB;
        return ordem === 'asc' ? diff : -diff;
      });
      break;

    case 'aleatorio':
      resultado.sort(() => Math.random() - 0.5);
      break;

    case 'recentes':
      resultado.sort((a, b) => {
        const dataA = new Date(a.criadoEm).getTime();
        const dataB = new Date(b.criadoEm).getTime();
        const diff = dataA - dataB;
        return ordem === 'asc' ? diff : -diff;
      });
      break;
  }

  return resultado;
}

// ========================================
// FILTROS ESPECIALIZADOS
// ========================================

/**
 * Busca questoes similares a uma questao dada
 */
export function getQuestoesSimilares(
  questaoId: string,
  limite: number = 5
): QuestaoCompleta[] {
  const todas = getAllQuestoes();
  const questaoBase = todas.find((q) => q.id === questaoId);

  if (!questaoBase) return [];

  // Encontrar questoes do mesmo tema/disciplina
  const similares = todas.filter(
    (q) =>
      q.id !== questaoId &&
      (q.tema === questaoBase.tema ||
        q.disciplina === questaoBase.disciplina) &&
      Math.abs(q.dificuldadeNivel - questaoBase.dificuldadeNivel) <= 1
  );

  // Embaralhar e limitar
  return similares.sort(() => Math.random() - 0.5).slice(0, limite);
}

/**
 * Busca questoes para revisao baseada em areas fracas
 */
export function getQuestoesRevisao(
  areasAlvo: { area: AreaENEM; disciplinas?: string[] }[],
  quantidade: number = 20,
  dificuldadeMax: DificuldadeNivel = 3
): QuestaoCompleta[] {
  const resultados: QuestaoCompleta[] = [];
  const questoesPorArea = Math.ceil(quantidade / areasAlvo.length);

  areasAlvo.forEach(({ area, disciplinas }) => {
    const filtro: FiltroQuestoesCompleto = {
      areas: [area],
      disciplinas: disciplinas,
      dificuldadeMax: dificuldadeMax,
      ordenarPor: 'aleatorio',
      limite: questoesPorArea,
    };

    const questoes = getQuestionsByFilter(filtro);
    resultados.push(...questoes);
  });

  // Embaralhar e limitar ao total solicitado
  return resultados.sort(() => Math.random() - 0.5).slice(0, quantidade);
}

/**
 * Busca questoes progressivas (comeca facil, aumenta dificuldade)
 */
export function getQuestoesProgressivas(
  area: AreaENEM,
  quantidade: number = 15
): QuestaoCompleta[] {
  const distribuicao = {
    facil: Math.floor(quantidade * 0.3),
    medio: Math.floor(quantidade * 0.5),
    dificil: Math.ceil(quantidade * 0.2),
  };

  const resultado: QuestaoCompleta[] = [];

  // Buscar faceis
  resultado.push(
    ...getQuestionsByFilter({
      areas: [area],
      dificuldades: ['facil'],
      ordenarPor: 'aleatorio',
      limite: distribuicao.facil,
    })
  );

  // Buscar medias
  resultado.push(
    ...getQuestionsByFilter({
      areas: [area],
      dificuldades: ['medio'],
      ordenarPor: 'aleatorio',
      limite: distribuicao.medio,
    })
  );

  // Buscar dificeis
  resultado.push(
    ...getQuestionsByFilter({
      areas: [area],
      dificuldades: ['dificil'],
      ordenarPor: 'aleatorio',
      limite: distribuicao.dificil,
    })
  );

  return resultado;
}

/**
 * Busca questoes para treino de tema especifico
 */
export function getQuestoesTreinoTema(
  tema: string,
  quantidade: number = 10,
  excluirJaRespondidas?: string[]
): QuestaoCompleta[] {
  return getQuestionsByFilter({
    temas: [tema],
    excluirIds: excluirJaRespondidas,
    ordenarPor: 'aleatorio',
    limite: quantidade,
  });
}

/**
 * Busca questoes por palavras-chave no enunciado
 */
export function buscarQuestoesPorTexto(
  busca: string,
  limite: number = 20
): QuestaoCompleta[] {
  return getQuestionsByFilter({
    busca: busca,
    limite: limite,
  });
}

// ========================================
// FILTROS PARA SIMULADO
// ========================================

/**
 * Retorna questoes filtradas em formato leve para simulado
 */
export function getSimuladoQuestionsByFilter(
  filtro: FiltroQuestoesCompleto
): QuestaoSimulado[] {
  const questoes = getQuestionsByFilter(filtro);
  return getQuestoesSimulado(questoes.map((q) => q.id));
}

/**
 * Gera distribuicao balanceada de questoes
 */
export function getDistribuicaoBalanceada(
  total: number,
  areas?: AreaENEM[]
): { area: AreaENEM; quantidade: number }[] {
  const areasAlvo = areas || (['matematica', 'linguagens', 'humanas', 'natureza'] as AreaENEM[]);
  const porArea = Math.floor(total / areasAlvo.length);
  const resto = total % areasAlvo.length;

  return areasAlvo.map((area, idx) => ({
    area,
    quantidade: porArea + (idx < resto ? 1 : 0),
  }));
}

/**
 * Gera mix de dificuldades para simulado
 */
export function getMixDificuldades(
  total: number,
  perfil: 'iniciante' | 'intermediario' | 'avancado' = 'intermediario'
): { dificuldade: DificuldadeLabel; quantidade: number }[] {
  const perfis = {
    iniciante: { facil: 0.5, medio: 0.35, dificil: 0.15 },
    intermediario: { facil: 0.25, medio: 0.5, dificil: 0.25 },
    avancado: { facil: 0.15, medio: 0.35, dificil: 0.5 },
  };

  const distribuicao = perfis[perfil];

  return [
    {
      dificuldade: 'facil',
      quantidade: Math.round(total * distribuicao.facil),
    },
    {
      dificuldade: 'medio',
      quantidade: Math.round(total * distribuicao.medio),
    },
    {
      dificuldade: 'dificil',
      quantidade: Math.round(total * distribuicao.dificil),
    },
  ];
}

// ========================================
// ESTATISTICAS DE FILTROS
// ========================================

/**
 * Conta questoes por criterio
 */
export function contarQuestoes(filtro: FiltroQuestoesCompleto): number {
  return getQuestionsByFilter(filtro).length;
}

/**
 * Retorna distribuicao de questoes por area
 */
export function getDistribuicaoPorArea(): { [area: string]: number } {
  const todas = getAllQuestoes();
  const distribuicao: { [area: string]: number } = {};

  todas.forEach((q) => {
    distribuicao[q.area] = (distribuicao[q.area] || 0) + 1;
  });

  return distribuicao;
}

/**
 * Retorna distribuicao de questoes por dificuldade
 */
export function getDistribuicaoPorDificuldade(): { [dif: string]: number } {
  const todas = getAllQuestoes();
  const distribuicao: { [dif: string]: number } = {};

  todas.forEach((q) => {
    distribuicao[q.dificuldade] = (distribuicao[q.dificuldade] || 0) + 1;
  });

  return distribuicao;
}

/**
 * Retorna contagem de questoes por tema
 */
export function getContagemPorTema(): { tema: string; quantidade: number }[] {
  const todas = getAllQuestoes();
  const contagem: { [tema: string]: number } = {};

  todas.forEach((q) => {
    contagem[q.tema] = (contagem[q.tema] || 0) + 1;
  });

  return Object.entries(contagem)
    .map(([tema, quantidade]) => ({ tema, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);
}
