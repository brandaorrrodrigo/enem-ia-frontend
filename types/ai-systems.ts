/**
 * TIPOS PARA SISTEMAS DE IA DO ENEM PRO
 * Classificação, Estatísticas, Probabilidades e Planos de Estudo
 */

// =====================================================
// SISTEMA DE CLASSIFICAÇÃO DE QUESTÕES
// =====================================================

export type Materia =
  | 'Matemática'
  | 'Física'
  | 'Química'
  | 'Biologia'
  | 'História'
  | 'Geografia'
  | 'Sociologia'
  | 'Filosofia'
  | 'Português'
  | 'Literatura'
  | 'Inglês'
  | 'Espanhol'
  | 'Artes'
  | 'Redação';

export type TipoQuestao =
  | 'Interpretação de texto'
  | 'Análise de gráfico/tabela'
  | 'Cálculo matemático'
  | 'Conceitual direta'
  | 'Contextualizada interdisciplinar'
  | 'Aplicação prática'
  | 'Raciocínio lógico';

export type NivelDificuldade = 'Fácil' | 'Média' | 'Difícil';

export interface QuestaoClassificada {
  id: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  ano?: number;
  fonte: 'ENEM' | 'Apostila' | 'Simulado' | 'Questão Livre';

  // Classificação IA
  classificacao: {
    materia: Materia;
    tema_principal: string;
    subtema: string;
    materia_secundaria?: Materia | null;
    competencia_enem: string;
    habilidades: string[];
    tipo_de_questao: TipoQuestao;
    nivel_dificuldade: NivelDificuldade;
    palavras_chave: string[];
    justificativa_classificacao: string;
  };

  // Metadados
  classificadaEm: Date;
  versaoClassificacao: string;
}

// =====================================================
// SISTEMA DE ESTATÍSTICAS DE INCIDÊNCIA
// =====================================================

export type StatusIncidencia = 'CAI MUITO' | 'CAI ÀS VEZES' | 'RARO';

export interface EstatisticaTopico {
  materia: Materia;
  tema_principal: string;
  subtema: string;

  // Estatísticas
  frequencia_absoluta: number; // Quantas vezes apareceu
  frequencia_percentual: number; // % em relação ao total
  anos_em_que_apareceu: number[]; // [2020, 2021, 2023]
  intervalo_medio: number; // Média de anos entre aparições

  // Classificação
  status_incidente: StatusIncidencia;
  icone: '🔥' | '⚠️' | '💤';

  // Metadados
  ultima_atualizacao: Date;
  total_questoes_analisadas: number;
}

// =====================================================
// SISTEMA DE PROBABILIDADE E TENDÊNCIA
// =====================================================

export type Tendencia = 'ALTA' | 'MEDIA' | 'BAIXA';

export interface ProbabilidadeTopico {
  materia: Materia;
  tema_principal: string;

  // Análise preditiva
  chance_estimada_percentual: number; // 0-100
  tendencia: Tendencia;
  justificativa: string;
  recomendacao_estudo: string;

  // Fatores considerados
  fatores: {
    frequencia_historica: number;
    tempo_desde_ultima_aparicao: number; // em anos
    tendencia_crescimento: 'crescente' | 'estável' | 'decrescente';
    peso_competencia_inep: number; // 0-10
  };

  // Metadados
  calculado_em: Date;
  confianca: number; // 0-100 (quão confiável é a previsão)
}

// =====================================================
// SISTEMA DE PLANO DE ESTUDOS PERSONALIZADO
// =====================================================

export type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA';

export interface PerfilAluno {
  id: string;
  nome: string;

  // Objetivos
  curso_desejado: string;
  universidade_desejada?: string;
  nota_alvo_total: number;

  // Situação atual
  notas_atuais: {
    matematica: number;
    natureza: number;
    humanas: number;
    linguagens: number;
    redacao: number;
  };

  // Histórico
  questoes_respondidas: number;
  acertos_por_materia: Record<Materia, number>;
  tempo_disponivel_semanal: number; // em horas
}

export interface TopicoEstudo {
  materia: Materia;
  tema: string;
  prioridade: Prioridade;
  impacto_estimado: string; // "Alto: +30 pontos esperados"
  motivo: string;
  tempo_estimado: number; // horas
  recursos: {
    modulos_biblioteca: string[]; // slugs dos módulos
    questoes_pratica: number; // quantidade de questões
    simulados: number; // quantidade de simulados
  };
}

export interface PlanoEstudo {
  aluno_id: string;
  criado_em: Date;
  validade_ate: Date; // Plano válido até próximo ENEM

  // Análise
  perfil_aluno: {
    curso: string;
    nota_atual_media: number;
    nota_alvo: number;
    gap_pontos: number; // Quantos pontos precisa melhorar
  };

  // Estratégia
  prioridade_por_area: Array<{
    area: 'Matemática' | 'Natureza' | 'Humanas' | 'Linguagens' | 'Redação';
    peso_estudo_percentual: number; // % do tempo total
    justificativa: string;
  }>;

  // Tópicos
  topicos_prioritarios: TopicoEstudo[];

  // Cronograma
  cronograma_semanal: Array<{
    semana: number;
    topicos: string[]; // temas a estudar
    carga_horaria: number;
    objetivos: string[];
  }>;

  // Orientações gerais
  estrategia_geral: string;
  alertas: string[];
  recomendacao_final: string;
}

// =====================================================
// TIPOS DE DASHBOARD
// =====================================================

export interface DashboardEstatisticas {
  aluno_id: string;

  // Visão geral
  total_questoes_respondidas: number;
  taxa_acerto_geral: number;
  tempo_total_estudo: number; // minutos

  // Por matéria
  desempenho_por_materia: Array<{
    materia: Materia;
    total_questoes: number;
    acertos: number;
    taxa_acerto: number;
    tempo_medio_questao: number; // segundos
  }>;

  // Tópicos dominados vs fracos
  topicos_dominados: Array<{
    tema: string;
    materia: Materia;
    taxa_acerto: number;
    badge?: string; // "Mestre em Funções"
  }>;

  topicos_fracos: Array<{
    tema: string;
    materia: Materia;
    taxa_acerto: number;
    recomendacao: string;
  }>;

  // Tópicos quentes (alta probabilidade de cair)
  topicos_quentes: Array<{
    tema: string;
    materia: Materia;
    probabilidade: number;
    status: 'dominado' | 'em_progresso' | 'nao_estudado';
    alerta?: string;
  }>;

  // Progresso ao longo do tempo
  evolucao: Array<{
    data: Date;
    taxa_acerto: number;
    questoes_dia: number;
  }>;

  // Recomendações IA
  recomendacoes: string[];
}

// =====================================================
// TIPOS DE PROMPTS PARA IA
// =====================================================

export interface PromptClassificacao {
  questao: {
    enunciado: string;
    alternativas: string[];
    ano?: number;
    fonte: string;
  };
  configuracao: {
    modo: 'rapido' | 'detalhado';
    incluir_habilidades: boolean;
  };
}

export interface PromptEstatistica {
  questoes_classificadas: QuestaoClassificada[];
  filtros?: {
    anos?: number[];
    materias?: Materia[];
  };
}

export interface PromptProbabilidade {
  estatisticas: EstatisticaTopico[];
  ano_atual: number;
  anos_historico: number[]; // [2020, 2021, 2022, ...]
}

export interface PromptPlanoEstudo {
  perfil: PerfilAluno;
  estatisticas: EstatisticaTopico[];
  probabilidades: ProbabilidadeTopico[];
  desempenho_atual: DashboardEstatisticas;
}
