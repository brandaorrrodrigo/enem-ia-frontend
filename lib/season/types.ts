/**
 * ENEM PRO - Sistema de Passe de Temporada (Season Pass)
 * Tipos e interfaces para o sistema de temporadas
 */

// ============================================
// CONFIGURAÇÕES GLOBAIS
// ============================================

export const SEASON_CONFIG = {
  xpPorNivel: 500,
  niveisTotais: 40,
  resetDiario: '00:00', // Horário de reset dos desafios diários
  resetSemanal: 'monday', // Dia de reset dos desafios semanais
  maxDesafiosDiarios: 3,
  maxDesafiosSemanais: 5,
  maxDesafiosEspeciais: 3,
} as const;

// ============================================
// TIPOS DE DESAFIOS
// ============================================

export type ChallengeType = 'daily' | 'weekly' | 'special';
export type ChallengeCategory =
  | 'redacao'
  | 'linguagens'
  | 'simulado'
  | 'leitura'
  | 'correcao'
  | 'batalha'
  | 'quiz';

export type ChallengeStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'claimed';

export interface SeasonChallenge {
  id: string;
  tipo: ChallengeType;
  categoria: ChallengeCategory;
  titulo: string;
  descricao: string;
  icone: string;
  SFPRecompensa: number;
  meta: number; // Quantidade necessária para completar
  progresso: number; // Progresso atual
  status: ChallengeStatus;
  dataExpiracao?: string; // ISO date
  requisitos?: string[]; // IDs de desafios pré-requisitos
}

// ============================================
// TIPOS DE RECOMPENSAS
// ============================================

export type RewardType =
  | 'fp'
  | 'moldura'
  | 'avatar'
  | 'sticker'
  | 'badge'
  | 'boost'
  | 'desconto'
  | 'skin';

export type RewardTier = 'free' | 'premium';
export type RewardRarity = 'comum' | 'raro' | 'epico' | 'lendario';
export type RewardStatus = 'locked' | 'available' | 'claimed';

export interface SeasonReward {
  id: string;
  nivel: number;
  tier: RewardTier;
  tipo: RewardType;
  nome: string;
  descricao: string;
  icone: string;
  raridade: RewardRarity;
  valor?: number; // Para FP, desconto, boost duration
  imageUrl?: string;
  animado?: boolean;
  status: RewardStatus;
}

// ============================================
// ESTRUTURA DA TEMPORADA
// ============================================

export type SeasonStatus = 'upcoming' | 'active' | 'ended';

export interface Season {
  id: string;
  nome: string;
  subtitulo: string;
  descricao: string;
  tema: string;
  icone: string;
  corPrimaria: string;
  corSecundaria: string;
  dataInicio: string; // ISO date
  dataFim: string; // ISO date
  niveisTotais: number;
  xpPorNivel: number;
  status: SeasonStatus;
  desafios: SeasonChallenge[];
  recompensasFree: SeasonReward[];
  recompensasPremium: SeasonReward[];
}

// ============================================
// PROGRESSO DO JOGADOR
// ============================================

export interface PlayerSeasonProgress {
  odder: string;
  seasonId: string;
  nivelAtual: number;
  SFPAtual: number;
  SFPTotal: number;
  isPremium: boolean;
  premiumCompradoEm?: string;
  desafiosCompletados: string[]; // IDs dos desafios
  recompensasColetadas: string[]; // IDs das recompensas
  ultimoResetDiario: string; // ISO date
  ultimoResetSemanal: string; // ISO date
  streakDiario: number;
  dataInicio: string; // Quando entrou na temporada
}

// ============================================
// HISTÓRICO DE SFP
// ============================================

export interface SFPTransaction {
  id: string;
  odder: string;
  seasonId: string;
  quantidade: number;
  fonte: string; // ID do desafio ou ação
  descricao: string;
  timestamp: string;
}

// ============================================
// LEADERBOARD DA TEMPORADA
// ============================================

export interface SeasonLeaderboardEntry {
  posicao: number;
  odder: string;
  nome: string;
  avatar?: string;
  nivelAtual: number;
  SFPTotal: number;
  isPremium: boolean;
  badgeTemporada?: string;
}

export interface SeasonLeaderboard {
  seasonId: string;
  ranking: SeasonLeaderboardEntry[];
  totalJogadores: number;
  atualizadoEm: string;
}

// ============================================
// BOOST DE TEMPORADA
// ============================================

export type BoostType = 'SFP' | 'fp' | 'disciplina';

export interface SeasonBoost {
  id: string;
  tipo: BoostType;
  multiplicador: number;
  disciplina?: string; // Se for boost de disciplina
  duracao: number; // Em horas
  ativoAte?: string; // ISO date
}

// ============================================
// API RESPONSES
// ============================================

export interface SeasonInfoResponse {
  season: Season;
  progresso: PlayerSeasonProgress;
  desafiosAtivos: SeasonChallenge[];
  proximasRecompensas: SeasonReward[];
  tempoRestante: number; // Em ms
}

export interface ClaimRewardResponse {
  success: boolean;
  reward?: SeasonReward;
  novoNivel?: number;
  novoSFP?: number;
  error?: string;
}

export interface UpdateProgressResponse {
  success: boolean;
  SFPGanho: number;
  SFPTotal: number;
  nivelAtual: number;
  nivelAnterior: number;
  subiuDeNivel: boolean;
  novasRecompensas?: SeasonReward[];
  error?: string;
}

export interface CompleteChallengeResponse {
  success: boolean;
  challenge?: SeasonChallenge;
  SFPGanho: number;
  novoNivel?: number;
  error?: string;
}

// ============================================
// CONSTANTES DE ICONES
// ============================================

export const CHALLENGE_ICONS: Record<ChallengeCategory, string> = {
  redacao: '✍️',
  linguagens: '📚',
  simulado: '📝',
  leitura: '👁️',
  correcao: '✅',
  batalha: '⚔️',
  quiz: '❓',
};

export const REWARD_ICONS: Record<RewardType, string> = {
  fp: '🪙',
  moldura: '🖼️',
  avatar: '👤',
  sticker: '🏷️',
  badge: '🏅',
  boost: '⚡',
  desconto: '💰',
  skin: '🎨',
};

export const RARITY_COLORS: Record<RewardRarity, string> = {
  comum: '#9ca3af',
  raro: '#3b82f6',
  epico: '#a855f7',
  lendario: '#fbbf24',
};

export const TIER_COLORS: Record<RewardTier, { bg: string; border: string; text: string }> = {
  free: {
    bg: 'rgba(34, 197, 94, 0.2)',
    border: '#22c55e',
    text: '#22c55e',
  },
  premium: {
    bg: 'rgba(251, 191, 36, 0.2)',
    border: '#fbbf24',
    text: '#fbbf24',
  },
};
