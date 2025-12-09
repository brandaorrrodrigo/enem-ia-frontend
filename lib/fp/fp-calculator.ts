// Sistema Global de Calculo de FP - ENEM Pro
// FP System 2.0

export type UserTier = 'free' | 'pro' | 'premium';
export type Difficulty = 'basico' | 'intermediario' | 'avancado';

export interface FPCalculationInput {
  baseFP: number;
  accuracy: number; // 0 a 1 (ex: 0.8 = 80%)
  timeFactor: number; // 0 a 1 (quanto mais rapido, maior)
  difficulty: Difficulty;
  userTier: UserTier;
}

export interface FPCalculationResult {
  fpFinal: number;
  breakdown: {
    base: number;
    accuracyBonus: number;
    timeBonus: number;
    difficultyMultiplier: number;
    tierMultiplier: number;
    subtotal: number;
  };
}

// Multiplicadores de dificuldade
const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  basico: 1.0,
  intermediario: 1.2,
  avancado: 1.5,
};

// Multiplicadores por assinatura
const TIER_MULTIPLIERS: Record<UserTier, number> = {
  free: 1.0,
  pro: 1.5,
  premium: 2.0,
};

/**
 * Calcula o FP final baseado nos parametros
 */
export function calculateFP(input: FPCalculationInput): FPCalculationResult {
  const { baseFP, accuracy, timeFactor, difficulty, userTier } = input;

  // Validacoes
  const safeAccuracy = Math.max(0, Math.min(1, accuracy));
  const safeTimeFactor = Math.max(0, Math.min(1, timeFactor));

  // Calculo base
  let fp = baseFP;

  // Bonus de acuracia: +0 a +10 FP
  const accuracyBonus = Math.floor(safeAccuracy * 10);
  fp += accuracyBonus;

  // Bonus de tempo: +0 a +15 FP baseado no timeFactor
  const timeBonus = Math.floor(safeTimeFactor * 15);
  fp += timeBonus;

  // Subtotal antes dos multiplicadores
  const subtotal = fp;

  // Aplicar multiplicador de dificuldade
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty] || 1.0;
  fp = Math.floor(fp * difficultyMultiplier);

  // Aplicar multiplicador de assinatura
  const tierMultiplier = TIER_MULTIPLIERS[userTier] || 1.0;
  fp = Math.floor(fp * tierMultiplier);

  // Garantir FP >= 0
  const fpFinal = Math.max(0, fp);

  return {
    fpFinal,
    breakdown: {
      base: baseFP,
      accuracyBonus,
      timeBonus,
      difficultyMultiplier,
      tierMultiplier,
      subtotal,
    },
  };
}

/**
 * Calcula o timeFactor baseado no tempo gasto vs tempo esperado
 * @param timeSpent Tempo gasto em segundos
 * @param expectedTime Tempo esperado em segundos
 * @returns timeFactor entre 0 e 1
 */
export function calculateTimeFactor(timeSpent: number, expectedTime: number): number {
  if (timeSpent <= 0 || expectedTime <= 0) return 0;

  // Se completou em menos da metade do tempo esperado = 1.0
  // Se completou no tempo esperado = 0.5
  // Se completou no dobro do tempo esperado = 0
  const ratio = timeSpent / expectedTime;

  if (ratio <= 0.5) return 1.0;
  if (ratio >= 2.0) return 0;

  // Interpolacao linear entre 0.5 e 2.0
  return 1 - ((ratio - 0.5) / 1.5);
}

/**
 * Calcula FP para Desafio Turbo
 * Tempo reduzido, bonus extra
 */
export function calculateTurboFP(input: Omit<FPCalculationInput, 'baseFP'>): FPCalculationResult {
  const result = calculateFP({
    ...input,
    baseFP: 20,
    timeFactor: input.timeFactor * 0.75, // Penaliza menos o tempo
  });

  // Bonus extra de +10 FP para turbo
  return {
    fpFinal: result.fpFinal + 10,
    breakdown: {
      ...result.breakdown,
      base: 20,
    },
  };
}

/**
 * Calcula FP para Desafio Maratona
 * 20 questoes, bonus por alta performance
 */
export function calculateMaratonaFP(
  input: Omit<FPCalculationInput, 'baseFP'>,
  questoesCorretas: number
): FPCalculationResult {
  const result = calculateFP({
    ...input,
    baseFP: 40,
  });

  // Bonus extra se acertou 15+ questoes
  const bonusExtra = questoesCorretas >= 15 ? 20 : 0;

  return {
    fpFinal: result.fpFinal + bonusExtra,
    breakdown: {
      ...result.breakdown,
      base: 40,
    },
  };
}

/**
 * Calcula resultado de aposta
 * @param betAmount Quantidade apostada
 * @param accuracy Acuracia obtida (0 a 1)
 * @returns Resultado da aposta
 */
export function calculateBetResult(
  betAmount: number,
  accuracy: number
): { won: boolean; fpDelta: number } {
  const won = accuracy >= 0.7; // 70% para ganhar
  const fpDelta = won ? betAmount * 2 : -betAmount;

  return { won, fpDelta };
}

/**
 * Valida se o usuario pode apostar
 */
export function canPlaceBet(
  betAmount: number,
  userTotalFP: number
): { valid: boolean; reason?: string } {
  const maxBet = Math.floor(userTotalFP * 0.2); // Maximo 20% do total

  if (betAmount > maxBet) {
    return {
      valid: false,
      reason: `Aposta maxima permitida: ${maxBet} FP (20% do seu total)`,
    };
  }

  if (betAmount > userTotalFP) {
    return {
      valid: false,
      reason: 'Saldo insuficiente',
    };
  }

  if (betAmount < 10) {
    return {
      valid: false,
      reason: 'Aposta minima: 10 FP',
    };
  }

  return { valid: true };
}
