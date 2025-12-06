// ========================================
// TIPOS PRINCIPAIS DO ENEM PRO
// ========================================

// Re-export tipos novos de questao
export * from './questao';

// QUESTAO LEGADA (compatibilidade)
export interface Questao {
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

// SIMULADO
export interface SimuladoConfig {
  id: string;
  questoes: Questao[];
  respostas: { [questaoId: number]: number };
  respostasConfirmadas: { [questaoId: number]: boolean };
  questaoAtual: number;
  inicio: string;
  area: string;
  quantidade: number;
  modoCorrecao: 'imediato' | 'final';
  tempoLimite?: number;
}

export interface SimuladoResultado {
  id: string;
  acertos: number;
  total: number;
  nota: number;
  tempoMinutos: number;
  area: string;
  detalhes: QuestaoResultado[];
  data: string;
  xpGanho: number;
  pontosGanhos: number;
}

export interface QuestaoResultado {
  id: number;
  area: string;
  disciplina: string;
  assunto: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  respostaUsuario: number | undefined;
  acertou: boolean;
  explicacao: string;
  tempoResposta?: number;
}

// USUARIO E ESTATISTICAS
export interface UserStats {
  totalQuestoes: number;
  totalAcertos: number;
  totalSimulados: number;
  tempoTotalEstudo: number;
  streakAtual: number;
  melhorStreak: number;
  ultimoAcesso: string;

  // Por area
  estatisticasPorArea: {
    [area: string]: {
      questoes: number;
      acertos: number;
      tempoMedio: number;
    };
  };

  // Por disciplina
  estatisticasPorDisciplina: {
    [disciplina: string]: {
      questoes: number;
      acertos: number;
    };
  };

  // Por assunto
  estatisticasPorAssunto: {
    [assunto: string]: {
      questoes: number;
      acertos: number;
    };
  };
}

export interface AreaFraca {
  area: string;
  disciplina?: string;
  assunto?: string;
  taxaAcerto: number;
  totalQuestoes: number;
  prioridade: 'alta' | 'media' | 'baixa';
}

// GAMIFICACAO
export interface UserGamification {
  xp: number;
  level: number;
  pontos: number;
  streak: number;
  badges: Badge[];
  conquistas: Conquista[];
  posicaoRanking: number;
}

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  dataConquista: string;
  categoria: 'estudo' | 'desempenho' | 'consistencia' | 'social' | 'especial';
}

export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  progresso: number;
  meta: number;
  concluida: boolean;
  dataConquista?: string;
  xpRecompensa: number;
  pontosRecompensa: number;
}

export interface RankingEntry {
  posicao: number;
  odUsuario: string;
  nome: string;
  avatar?: string;
  xp: number;
  level: number;
  pontos: number;
  acertos: number;
  liga: 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante';
}

// PLANO DE ESTUDO
export interface PlanoEstudo {
  id: string;
  nome: string;
  dataCriacao: string;
  meta: string;
  areasAlvo: string[];
  questoesRecomendadas: number[];
  simuladosRecomendados: SimuladoRecomendado[];
  progresso: number;
}

export interface SimuladoRecomendado {
  tipo: 'completo' | 'area' | 'disciplina' | 'revisao';
  area?: string;
  disciplina?: string;
  assuntos?: string[];
  quantidade: number;
  dificuldade?: 'facil' | 'medio' | 'dificil' | 'misto';
  motivo: string;
}

// IA
export interface ExplicacaoIA {
  questaoId: number;
  explicacaoDetalhada: string;
  conceito: string;
  dicaEstudo: string;
  recursosRelacionados?: string[];
}

export interface SugestaoEstudo {
  assunto: string;
  prioridade: 'alta' | 'media' | 'baixa';
  motivo: string;
  questoesRecomendadas: number[];
  tempoEstimado: number;
}

// FILTROS
export interface FiltroQuestoes {
  areas?: string[];
  disciplinas?: string[];
  assuntos?: string[];
  dificuldades?: ('facil' | 'medio' | 'dificil')[];
  anos?: number[];
  excluirIds?: number[];
  quantidade?: number;
}

// HISTORICO
export interface HistoricoSimulado {
  id: string;
  data: string;
  nota: number;
  acertos: number;
  total: number;
  area: string;
  tempoMinutos: number;
}

// DESAFIO
export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'diario' | 'semanal' | 'mensal' | 'especial';
  meta: number;
  progresso: number;
  recompensaXP: number;
  recompensaPontos: number;
  dataInicio: string;
  dataFim: string;
  concluido: boolean;
}

// RECOMPENSA LOJA
export interface ItemLoja {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  custoPontos: number;
  categoria: 'avatar' | 'tema' | 'boost' | 'especial';
  disponivel: boolean;
}
