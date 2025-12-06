// ========================================
// SCHEMA DEFINITIVO - BANCO DE QUESTÕES ENEM PRO
// ========================================

/**
 * Áreas do ENEM (oficial)
 */
export type Area = 'Linguagens' | 'Humanas' | 'Natureza' | 'Matemática';

/**
 * Mapeamento de áreas para código interno
 */
export const AREAS_MAP = {
  'Linguagens': 'linguagens',
  'Humanas': 'humanas',
  'Natureza': 'natureza',
  'Matemática': 'matematica'
} as const;

export const AREAS_REVERSE_MAP = {
  'linguagens': 'Linguagens',
  'humanas': 'Humanas',
  'natureza': 'Natureza',
  'matematica': 'Matemática'
} as const;

/**
 * Níveis de dificuldade (1-5)
 */
export type Dificuldade = 1 | 2 | 3 | 4 | 5;

export const DIFICULDADE_LABELS: Record<Dificuldade, string> = {
  1: 'Muito Fácil',
  2: 'Fácil',
  3: 'Médio',
  4: 'Difícil',
  5: 'Muito Difícil'
};

/**
 * SCHEMA DEFINITIVO DA QUESTÃO
 *
 * Este é o schema principal usado em todo o sistema.
 * Todas as questões devem seguir esta estrutura.
 */
export interface Questao {
  /** ID único da questão (formato: AREA_DISC_ANO_NUM) */
  id: string;

  /** Ano da prova/questão */
  ano: number;

  /** Área do conhecimento */
  area: Area;

  /** Disciplina específica */
  disciplina: string;

  /** Tema principal */
  tema: string;

  /** Subtema opcional para granularidade */
  subtema?: string;

  /** Nível de dificuldade (1-5) */
  dificuldade: Dificuldade;

  /** Texto do enunciado */
  enunciado: string;

  /** URL da imagem (opcional) */
  imagem?: string;

  /** Array com 5 alternativas (A, B, C, D, E) */
  alternativas: [string, string, string, string, string];

  /** Letra da alternativa correta */
  correta: 'A' | 'B' | 'C' | 'D' | 'E';

  /** Explicação da resposta */
  explicacao?: string;

  /** Tags para busca e categorização */
  tags?: string[];
}

/**
 * Questão com metadados adicionais (usado internamente)
 */
export interface QuestaoCompleta extends Questao {
  /** Código legado para compatibilidade */
  legacyId?: number;

  /** Fonte da questão */
  fonte?: 'enem_oficial' | 'simulado' | 'autoria';

  /** Competências ENEM relacionadas */
  competencias?: string[];

  /** Estatísticas de uso */
  stats?: {
    vezesMostrada: number;
    vezesAcertada: number;
    taxaAcerto: number;
    tempoMedioResposta: number;
  };

  /** Timestamps */
  criadoEm?: string;
  atualizadoEm?: string;
}

/**
 * Questão simplificada para listagem
 */
export interface QuestaoResumo {
  id: string;
  ano: number;
  area: Area;
  disciplina: string;
  tema: string;
  dificuldade: Dificuldade;
  enunciado: string;
}

/**
 * Formato legado para compatibilidade
 */
export interface QuestaoLegacy {
  id: number;
  area: 'matematica' | 'linguagens' | 'humanas' | 'natureza';
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
 * Converte dificuldade legada para número
 */
export function convertDificuldadeLegacy(d: 'facil' | 'medio' | 'dificil'): Dificuldade {
  switch (d) {
    case 'facil': return 2;
    case 'medio': return 3;
    case 'dificil': return 4;
    default: return 3;
  }
}

/**
 * Converte dificuldade numérica para legada
 */
export function convertDificuldadeToLegacy(d: Dificuldade): 'facil' | 'medio' | 'dificil' {
  if (d <= 2) return 'facil';
  if (d >= 4) return 'dificil';
  return 'medio';
}

/**
 * Converte área legada para oficial
 */
export function convertAreaLegacy(area: string): Area {
  const map: Record<string, Area> = {
    'matematica': 'Matemática',
    'linguagens': 'Linguagens',
    'humanas': 'Humanas',
    'natureza': 'Natureza'
  };
  return map[area.toLowerCase()] || 'Linguagens';
}

/**
 * Converte área oficial para legada
 */
export function convertAreaToLegacy(area: Area): 'matematica' | 'linguagens' | 'humanas' | 'natureza' {
  const map: Record<Area, 'matematica' | 'linguagens' | 'humanas' | 'natureza'> = {
    'Matemática': 'matematica',
    'Linguagens': 'linguagens',
    'Humanas': 'humanas',
    'Natureza': 'natureza'
  };
  return map[area];
}

/**
 * Gera ID único para questão
 */
export function generateQuestionId(area: Area, disciplina: string, ano: number, seq: number): string {
  const areaCode = area.substring(0, 3).toUpperCase();
  const discCode = disciplina.substring(0, 3).toUpperCase();
  const seqStr = seq.toString().padStart(4, '0');
  return `${areaCode}_${discCode}_${ano}_${seqStr}`;
}

/**
 * Converte questão legada para novo schema
 */
export function convertFromLegacy(legacy: QuestaoLegacy): Questao {
  const letras: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
  const area = convertAreaLegacy(legacy.area);
  const ano = legacy.ano || 2024;

  // Garantir que temos exatamente 5 alternativas
  const alternativas = [...legacy.alternativas];
  while (alternativas.length < 5) {
    alternativas.push('');
  }

  return {
    id: generateQuestionId(area, legacy.disciplina, ano, legacy.id),
    ano,
    area,
    disciplina: legacy.disciplina,
    tema: legacy.assunto,
    dificuldade: convertDificuldadeLegacy(legacy.dificuldade),
    enunciado: legacy.enunciado,
    imagem: legacy.imagem,
    alternativas: alternativas.slice(0, 5) as [string, string, string, string, string],
    correta: letras[legacy.correta] || 'A',
    explicacao: legacy.explicacao,
    tags: [legacy.disciplina.toLowerCase(), legacy.assunto.toLowerCase()]
  };
}

/**
 * Converte questão nova para legada
 */
export function convertToLegacy(questao: Questao): QuestaoLegacy {
  const letraIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 };

  return {
    id: parseInt(questao.id.split('_').pop() || '0') || Math.floor(Math.random() * 100000),
    area: convertAreaToLegacy(questao.area),
    disciplina: questao.disciplina,
    assunto: questao.tema,
    enunciado: questao.enunciado,
    alternativas: [...questao.alternativas],
    correta: letraIndex[questao.correta],
    explicacao: questao.explicacao || '',
    dificuldade: convertDificuldadeToLegacy(questao.dificuldade),
    ano: questao.ano,
    imagem: questao.imagem
  };
}

/**
 * Valida se uma questão está no formato correto
 */
export function validateQuestao(q: unknown): q is Questao {
  if (!q || typeof q !== 'object') return false;

  const questao = q as Record<string, unknown>;

  return (
    typeof questao.id === 'string' &&
    typeof questao.ano === 'number' &&
    typeof questao.area === 'string' &&
    typeof questao.disciplina === 'string' &&
    typeof questao.tema === 'string' &&
    typeof questao.dificuldade === 'number' &&
    questao.dificuldade >= 1 && questao.dificuldade <= 5 &&
    typeof questao.enunciado === 'string' &&
    Array.isArray(questao.alternativas) &&
    questao.alternativas.length === 5 &&
    typeof questao.correta === 'string' &&
    ['A', 'B', 'C', 'D', 'E'].includes(questao.correta as string)
  );
}

/**
 * Disciplinas por área
 */
export const DISCIPLINAS_POR_AREA: Record<Area, string[]> = {
  'Matemática': [
    'Álgebra',
    'Aritmética',
    'Geometria',
    'Geometria Analítica',
    'Estatística',
    'Trigonometria',
    'Combinatória',
    'Funções',
    'Probabilidade'
  ],
  'Linguagens': [
    'Português',
    'Literatura',
    'Inglês',
    'Espanhol',
    'Artes',
    'Educação Física',
    'Redação'
  ],
  'Humanas': [
    'História',
    'Geografia',
    'Filosofia',
    'Sociologia'
  ],
  'Natureza': [
    'Biologia',
    'Química',
    'Física'
  ]
};

/**
 * Temas por disciplina (principais)
 */
export const TEMAS_POR_DISCIPLINA: Record<string, string[]> = {
  // Matemática
  'Álgebra': ['Equações', 'Inequações', 'Sistemas', 'Matrizes', 'Determinantes', 'Logaritmos', 'Exponenciais'],
  'Aritmética': ['Porcentagem', 'Razão e Proporção', 'Regra de Três', 'Divisibilidade', 'MMC e MDC'],
  'Geometria': ['Áreas', 'Perímetros', 'Volumes', 'Triângulos', 'Círculos', 'Polígonos'],
  'Estatística': ['Média', 'Mediana', 'Moda', 'Desvio Padrão', 'Gráficos'],
  'Trigonometria': ['Razões Trigonométricas', 'Círculo Trigonométrico', 'Funções Trigonométricas'],
  'Combinatória': ['Arranjos', 'Combinações', 'Permutações'],
  'Probabilidade': ['Probabilidade Simples', 'Probabilidade Condicional', 'Eventos'],

  // Linguagens
  'Português': ['Interpretação', 'Gramática', 'Semântica', 'Sintaxe', 'Morfologia', 'Figuras de Linguagem'],
  'Literatura': ['Modernismo', 'Romantismo', 'Realismo', 'Barroco', 'Arcadismo', 'Contemporânea'],
  'Inglês': ['Interpretação', 'Gramática', 'Vocabulário'],
  'Redação': ['Dissertação', 'Argumentação', 'Proposta de Intervenção'],

  // Humanas
  'História': ['Brasil Colônia', 'Brasil Império', 'Brasil República', 'História Antiga', 'História Medieval', 'História Moderna', 'História Contemporânea'],
  'Geografia': ['Climatologia', 'Geopolítica', 'Urbanização', 'População', 'Biomas', 'Cartografia'],
  'Filosofia': ['Filosofia Antiga', 'Filosofia Moderna', 'Ética', 'Epistemologia'],
  'Sociologia': ['Clássicos', 'Cultura', 'Trabalho', 'Movimentos Sociais'],

  // Natureza
  'Biologia': ['Citologia', 'Genética', 'Ecologia', 'Evolução', 'Fisiologia', 'Botânica', 'Zoologia'],
  'Química': ['Orgânica', 'Inorgânica', 'Físico-Química', 'Estequiometria', 'Soluções'],
  'Física': ['Mecânica', 'Termologia', 'Óptica', 'Eletricidade', 'Ondulatória', 'Magnetismo']
};
