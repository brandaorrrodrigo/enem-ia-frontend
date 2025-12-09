// Tipos compartilhados do sistema FP - ENEM Pro

export type UserTier = 'free' | 'pro' | 'premium';
export type Difficulty = 'basico' | 'intermediario' | 'avancado';
export type ChallengeType = 'normal' | 'turbo' | 'maratona' | 'aposta' | 'jackpot';
export type BetStatus = 'pending' | 'win' | 'lose';

// Historico de Desafios
export interface ChallengeHistory {
  id: string;
  user_id: string;
  challenge_type: ChallengeType;
  difficulty: Difficulty;
  questions_count: number;
  correct_answers: number;
  accuracy: number;
  time_spent: number;
  fp_earned: number;
  created_at: string;
}

// Apostas FP
export interface FPBet {
  id: string;
  user_id: string;
  amount: number;
  status: BetStatus;
  accuracy?: number;
  fp_delta?: number;
  created_at: string;
}

// Jackpot Pool
export interface JackpotPool {
  id: number;
  total_fp: number;
  last_winner: string | null;
  last_winner_name?: string;
  updated_at: string;
}

// Jackpot Entry
export interface JackpotEntry {
  id: string;
  user_id: string;
  score: number;
  created_at: string;
}

// Usuario FP
export interface UserFP {
  id: string;
  user_id: string;
  total_fp: number;
  weekly_fp: number;
  monthly_fp: number;
  streak_days: number;
  last_activity: string;
  updated_at: string;
}

// Resposta padrao de API
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Resposta de Desafio
export interface ChallengeResponse {
  fpEarned: number;
  fpTotal: number;
  breakdown: {
    base: number;
    accuracyBonus: number;
    timeBonus: number;
    difficultyMultiplier: number;
    tierMultiplier: number;
  };
  antifraud?: {
    valid: boolean;
    flags?: string[];
  };
}

// Resposta de Aposta
export interface BetResponse {
  result: 'win' | 'lose';
  fpDelta: number;
  newBalance: number;
  accuracy: number;
  betAmount: number;
}

// Resposta de Jackpot
export interface JackpotStatusResponse {
  totalPool: number;
  entriesCount: number;
  userEntry?: {
    score: number;
    position: number;
  };
  lastWinners: Array<{
    name: string;
    amount: number;
    date: string;
  }>;
  endsAt: string;
}
