// ========================================
// SCHEMA DEFINITIVO - QUESTAO ENEM PRO
// ========================================

/**
 * Areas do ENEM
 */
export type AreaENEM =
  | 'matematica'
  | 'linguagens'
  | 'humanas'
  | 'natureza'
  | 'redacao';

/**
 * Disciplinas por area
 */
export type DisciplinaMatematica =
  | 'Algebra'
  | 'Aritmetica'
  | 'Geometria'
  | 'Geometria Analitica'
  | 'Estatistica'
  | 'Trigonometria'
  | 'Combinatoria'
  | 'Funcoes'
  | 'Probabilidade';

export type DisciplinaLinguagens =
  | 'Portugues'
  | 'Literatura'
  | 'Ingles'
  | 'Espanhol'
  | 'Artes'
  | 'Educacao Fisica'
  | 'Redacao';

export type DisciplinaHumanas =
  | 'Historia'
  | 'Geografia'
  | 'Filosofia'
  | 'Sociologia';

export type DisciplinaNatureza =
  | 'Biologia'
  | 'Quimica'
  | 'Fisica';

export type Disciplina =
  | DisciplinaMatematica
  | DisciplinaLinguagens
  | DisciplinaHumanas
  | DisciplinaNatureza
  | string;

/**
 * Niveis de dificuldade (1-5 escala numerica + labels)
 */
export type DificuldadeLabel = 'facil' | 'medio' | 'dificil';
export type DificuldadeNivel = 1 | 2 | 3 | 4 | 5;

/**
 * Alternativa de questao
 */
export interface Alternativa {
  letra: 'A' | 'B' | 'C' | 'D' | 'E';
  texto: string;
  correta: boolean;
}

/**
 * Imagem associada a questao
 */
export interface ImagemQuestao {
  url: string;
  alt: string;
  posicao: 'enunciado' | 'alternativa' | 'explicacao';
  largura?: number;
  altura?: number;
}

/**
 * Competencia ENEM
 */
export interface CompetenciaENEM {
  codigo: string;
  descricao: string;
  habilidades: string[];
}

/**
 * Metadados de origem da questao
 */
export interface OrigemQuestao {
  tipo: 'enem_oficial' | 'vestibular' | 'autoria_propria' | 'banco_externo';
  ano?: number;
  caderno?: string;
  numero?: number;
  vestibular?: string;
  autor?: string;
  dataImportacao: string;
}

/**
 * Estatisticas da questao (analytics)
 */
export interface EstatisticasQuestao {
  totalRespostas: number;
  acertos: number;
  taxaAcerto: number;
  tempoMedioResposta: number;
  distribuicaoRespostas: {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
  };
  dificuldadeCalculada?: DificuldadeNivel;
}

/**
 * SCHEMA DEFINITIVO DA QUESTAO
 */
export interface QuestaoCompleta {
  // Identificacao
  id: string;
  codigo: string; // Ex: "MAT_ALG_2023_001"

  // Classificacao principal
  area: AreaENEM;
  disciplina: Disciplina;
  tema: string;
  subtema?: string;

  // Conteudo
  enunciado: string;
  alternativas: Alternativa[];
  respostaCorreta: 'A' | 'B' | 'C' | 'D' | 'E';
  explicacao: string;
  explicacaoDetalhada?: string;

  // Dificuldade
  dificuldade: DificuldadeLabel;
  dificuldadeNivel: DificuldadeNivel;

  // Midia
  imagens?: ImagemQuestao[];
  videos?: string[];

  // Metadados educacionais
  competenciasENEM?: CompetenciaENEM[];
  habilidades?: string[];
  palavrasChave: string[];
  tags: string[];

  // Origem e versao
  origem: OrigemQuestao;
  versao: number;
  ativa: boolean;

  // Analytics (opcional, preenchido em runtime)
  estatisticas?: EstatisticasQuestao;

  // Datas
  criadoEm: string;
  atualizadoEm: string;
}

/**
 * Versao simplificada para uso em simulados
 * (carrega mais rapido, menos dados)
 */
export interface QuestaoSimulado {
  id: string;
  area: AreaENEM;
  disciplina: string;
  tema: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
  dificuldade: DificuldadeLabel;
  ano?: number;
  imagem?: string;
}

/**
 * Tipo de compatibilidade com sistema legado
 */
export interface QuestaoLegacy {
  id: number;
  area: 'matematica' | 'linguagens' | 'humanas' | 'natureza' | 'redacao';
  disciplina: string;
  assunto: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  ano?: number;
  fonte?: string;
  imagem?: string;
}

/**
 * Filtros para busca de questoes
 */
export interface FiltroQuestoesCompleto {
  // Filtros de classificacao
  areas?: AreaENEM[];
  disciplinas?: string[];
  temas?: string[];
  subtemas?: string[];

  // Filtros de dificuldade
  dificuldades?: DificuldadeLabel[];
  dificuldadeMin?: DificuldadeNivel;
  dificuldadeMax?: DificuldadeNivel;

  // Filtros de origem
  anos?: number[];
  tiposOrigem?: OrigemQuestao['tipo'][];

  // Filtros de busca textual
  busca?: string;
  tags?: string[];
  palavrasChave?: string[];

  // Filtros de exclusao
  excluirIds?: string[];
  excluirTemas?: string[];

  // Paginacao
  pagina?: number;
  porPagina?: number;

  // Ordenacao
  ordenarPor?: 'dificuldade' | 'ano' | 'taxaAcerto' | 'aleatorio' | 'recentes';
  ordem?: 'asc' | 'desc';

  // Limites
  limite?: number;
  apenasAtivas?: boolean;
}

/**
 * Resultado de busca com paginacao
 */
export interface ResultadoBuscaQuestoes {
  questoes: QuestaoCompleta[];
  total: number;
  pagina: number;
  totalPaginas: number;
  temMais: boolean;
  filtrosAplicados: FiltroQuestoesCompleto;
}

/**
 * Indice de busca por tema/assunto
 */
export interface IndiceQuestoes {
  porArea: {
    [area in AreaENEM]?: string[];
  };
  porDisciplina: {
    [disciplina: string]: string[];
  };
  porTema: {
    [tema: string]: string[];
  };
  porAno: {
    [ano: number]: string[];
  };
  porDificuldade: {
    [dificuldade in DificuldadeLabel]?: string[];
  };
  porTag: {
    [tag: string]: string[];
  };
  total: number;
  ultimaAtualizacao: string;
}

/**
 * Conversores de tipos
 */
export function questaoLegacyToCompleta(legacy: QuestaoLegacy): QuestaoCompleta {
  const letras: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

  return {
    id: `legacy_${legacy.id}`,
    codigo: `${legacy.area.toUpperCase().slice(0, 3)}_${legacy.disciplina.slice(0, 3).toUpperCase()}_${legacy.ano || 2024}_${String(legacy.id).padStart(3, '0')}`,
    area: legacy.area,
    disciplina: legacy.disciplina,
    tema: legacy.assunto,
    enunciado: legacy.enunciado,
    alternativas: legacy.alternativas.map((texto, idx) => ({
      letra: letras[idx],
      texto,
      correta: idx === legacy.correta
    })),
    respostaCorreta: letras[legacy.correta],
    explicacao: legacy.explicacao,
    dificuldade: legacy.dificuldade,
    dificuldadeNivel: legacy.dificuldade === 'facil' ? 2 : legacy.dificuldade === 'medio' ? 3 : 4,
    imagens: legacy.imagem ? [{ url: legacy.imagem, alt: 'Imagem da questao', posicao: 'enunciado' }] : undefined,
    palavrasChave: [legacy.assunto, legacy.disciplina],
    tags: [legacy.area, legacy.disciplina, legacy.assunto, legacy.dificuldade],
    origem: {
      tipo: legacy.fonte === 'enem' ? 'enem_oficial' : 'banco_externo',
      ano: legacy.ano,
      dataImportacao: new Date().toISOString()
    },
    versao: 1,
    ativa: true,
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString()
  };
}

export function questaoCompletaToSimulado(completa: QuestaoCompleta): QuestaoSimulado {
  const indiceCorreta = completa.alternativas.findIndex(a => a.correta);

  return {
    id: completa.id,
    area: completa.area,
    disciplina: completa.disciplina,
    tema: completa.tema,
    enunciado: completa.enunciado,
    alternativas: completa.alternativas.map(a => a.texto),
    correta: indiceCorreta,
    explicacao: completa.explicacao,
    dificuldade: completa.dificuldade,
    ano: completa.origem.ano,
    imagem: completa.imagens?.[0]?.url
  };
}

export function questaoCompletaToLegacy(completa: QuestaoCompleta): QuestaoLegacy {
  const indiceCorreta = completa.alternativas.findIndex(a => a.correta);
  const numericId = parseInt(completa.id.replace(/\D/g, '')) || Math.floor(Math.random() * 100000);

  return {
    id: numericId,
    area: completa.area,
    disciplina: completa.disciplina,
    assunto: completa.tema,
    enunciado: completa.enunciado,
    alternativas: completa.alternativas.map(a => a.texto),
    correta: indiceCorreta,
    explicacao: completa.explicacao,
    dificuldade: completa.dificuldade,
    ano: completa.origem.ano,
    fonte: completa.origem.tipo === 'enem_oficial' ? 'enem' : undefined,
    imagem: completa.imagens?.[0]?.url
  };
}
