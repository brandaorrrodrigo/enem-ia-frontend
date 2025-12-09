// Servico de FP - Interacao com banco de dados (mock/Supabase)
// ENEM Pro FP System 2.0

import type {
  UserFP,
  ChallengeHistory,
  FPBet,
  JackpotPool,
  JackpotEntry,
  ChallengeType,
  Difficulty,
  BetStatus
} from './types';

// Mock de dados em memoria (substituir por Supabase em producao)
const mockUserFP: Map<string, UserFP> = new Map();
const mockChallengeHistory: ChallengeHistory[] = [];
const mockBets: FPBet[] = [];
const mockJackpotPool: JackpotPool = {
  id: 1,
  total_fp: 0,
  last_winner: null,
  updated_at: new Date().toISOString(),
};
const mockJackpotEntries: JackpotEntry[] = [];

// ==================== USER FP ====================

/**
 * Obtem FP do usuario
 */
export async function getUserFP(userId: string): Promise<UserFP> {
  let userFP = mockUserFP.get(userId);

  if (!userFP) {
    userFP = {
      id: crypto.randomUUID(),
      user_id: userId,
      total_fp: 100, // FP inicial
      weekly_fp: 0,
      monthly_fp: 0,
      streak_days: 0,
      last_activity: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockUserFP.set(userId, userFP);
  }

  return userFP;
}

/**
 * Atualiza FP do usuario
 */
export async function updateUserFP(
  userId: string,
  fpDelta: number
): Promise<UserFP> {
  const userFP = await getUserFP(userId);

  userFP.total_fp = Math.max(0, userFP.total_fp + fpDelta);
  userFP.weekly_fp += fpDelta > 0 ? fpDelta : 0;
  userFP.monthly_fp += fpDelta > 0 ? fpDelta : 0;
  userFP.last_activity = new Date().toISOString();
  userFP.updated_at = new Date().toISOString();

  mockUserFP.set(userId, userFP);

  return userFP;
}

// ==================== CHALLENGE HISTORY ====================

/**
 * Salva historico de desafio
 */
export async function saveChallengeHistory(
  userId: string,
  challengeType: ChallengeType,
  difficulty: Difficulty,
  questionsCount: number,
  correctAnswers: number,
  accuracy: number,
  timeSpent: number,
  fpEarned: number
): Promise<ChallengeHistory> {
  const history: ChallengeHistory = {
    id: crypto.randomUUID(),
    user_id: userId,
    challenge_type: challengeType,
    difficulty,
    questions_count: questionsCount,
    correct_answers: correctAnswers,
    accuracy,
    time_spent: timeSpent,
    fp_earned: fpEarned,
    created_at: new Date().toISOString(),
  };

  mockChallengeHistory.push(history);

  return history;
}

/**
 * Obtem historico de desafios do usuario
 */
export async function getChallengeHistory(
  userId: string,
  limit = 20
): Promise<ChallengeHistory[]> {
  return mockChallengeHistory
    .filter(h => h.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// ==================== BETS ====================

/**
 * Cria uma aposta
 */
export async function createBet(
  userId: string,
  amount: number
): Promise<FPBet> {
  const bet: FPBet = {
    id: crypto.randomUUID(),
    user_id: userId,
    amount,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  mockBets.push(bet);

  return bet;
}

/**
 * Finaliza uma aposta
 */
export async function finalizeBet(
  betId: string,
  status: BetStatus,
  accuracy: number,
  fpDelta: number
): Promise<FPBet | null> {
  const bet = mockBets.find(b => b.id === betId);

  if (!bet) return null;

  bet.status = status;
  bet.accuracy = accuracy;
  bet.fp_delta = fpDelta;

  return bet;
}

/**
 * Obtem historico de apostas do usuario
 */
export async function getBetHistory(
  userId: string,
  limit = 20
): Promise<FPBet[]> {
  return mockBets
    .filter(b => b.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// ==================== JACKPOT ====================

/**
 * Obtem status do jackpot
 */
export async function getJackpotPool(): Promise<JackpotPool> {
  return mockJackpotPool;
}

/**
 * Adiciona FP ao pool do jackpot
 */
export async function addToJackpotPool(amount: number): Promise<JackpotPool> {
  mockJackpotPool.total_fp += amount;
  mockJackpotPool.updated_at = new Date().toISOString();
  return mockJackpotPool;
}

/**
 * Registra entrada no jackpot
 */
export async function enterJackpot(
  userId: string,
  score: number
): Promise<JackpotEntry> {
  // Verifica se ja tem entrada hoje
  const today = new Date().toISOString().split('T')[0];
  const existingEntry = mockJackpotEntries.find(
    e => e.user_id === userId && e.created_at.startsWith(today)
  );

  if (existingEntry) {
    // Atualiza score se for maior
    if (score > existingEntry.score) {
      existingEntry.score = score;
    }
    return existingEntry;
  }

  const entry: JackpotEntry = {
    id: crypto.randomUUID(),
    user_id: userId,
    score,
    created_at: new Date().toISOString(),
  };

  mockJackpotEntries.push(entry);

  return entry;
}

/**
 * Obtem entradas do jackpot de hoje
 */
export async function getTodayJackpotEntries(): Promise<JackpotEntry[]> {
  const today = new Date().toISOString().split('T')[0];
  return mockJackpotEntries
    .filter(e => e.created_at.startsWith(today))
    .sort((a, b) => b.score - a.score);
}

/**
 * Resolve jackpot (executar a meia-noite)
 */
export async function resolveJackpot(): Promise<{
  winner: string | null;
  prize: number;
}> {
  const entries = await getTodayJackpotEntries();

  if (entries.length === 0) {
    return { winner: null, prize: 0 };
  }

  const winner = entries[0]; // Maior score
  const prize = mockJackpotPool.total_fp;

  // Atualiza saldo do vencedor
  await updateUserFP(winner.user_id, prize);

  // Reseta o pool
  mockJackpotPool.total_fp = 0;
  mockJackpotPool.last_winner = winner.user_id;
  mockJackpotPool.updated_at = new Date().toISOString();

  // Limpa entradas do dia
  const today = new Date().toISOString().split('T')[0];
  const entriesToRemove = mockJackpotEntries.filter(e => e.created_at.startsWith(today));
  entriesToRemove.forEach(e => {
    const idx = mockJackpotEntries.indexOf(e);
    if (idx > -1) mockJackpotEntries.splice(idx, 1);
  });

  return { winner: winner.user_id, prize };
}

/**
 * Obtem posicao do usuario no ranking do jackpot
 */
export async function getJackpotPosition(userId: string): Promise<number | null> {
  const entries = await getTodayJackpotEntries();
  const idx = entries.findIndex(e => e.user_id === userId);
  return idx >= 0 ? idx + 1 : null;
}

// ==================== ESTATISTICAS ====================

/**
 * Obtem estatisticas semanais do usuario
 */
export async function getWeeklyStats(userId: string): Promise<{
  fpGained: number;
  fpLost: number;
  challengesCompleted: number;
  betsWon: number;
  betsLost: number;
  bestStreak: number;
}> {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const challenges = mockChallengeHistory.filter(
    h => h.user_id === userId && new Date(h.created_at) >= weekAgo
  );

  const bets = mockBets.filter(
    b => b.user_id === userId && new Date(b.created_at) >= weekAgo
  );

  return {
    fpGained: challenges.reduce((sum, c) => sum + c.fp_earned, 0) +
              bets.filter(b => b.status === 'win').reduce((sum, b) => sum + (b.fp_delta || 0), 0),
    fpLost: bets.filter(b => b.status === 'lose').reduce((sum, b) => sum + Math.abs(b.fp_delta || 0), 0),
    challengesCompleted: challenges.length,
    betsWon: bets.filter(b => b.status === 'win').length,
    betsLost: bets.filter(b => b.status === 'lose').length,
    bestStreak: 0, // TODO: calcular streak
  };
}
