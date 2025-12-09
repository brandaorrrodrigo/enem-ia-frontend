// Sistema Anti-Fraude Global - ENEM Pro
// Detecta e bloqueia tentativas de fraude no sistema de FP

export interface AntiFraudInput {
  userId: string;
  questionsCount: number;
  accuracy: number; // 0 a 1
  timeSpent: number; // em segundos
  challengeType: 'normal' | 'turbo' | 'maratona' | 'aposta' | 'jackpot';
  previousAttemptTimestamp?: number; // timestamp da ultima tentativa
}

export interface AntiFraudResult {
  valid: boolean;
  reason?: string;
  flagged: boolean;
  flags: string[];
}

// Constantes de validacao
const MIN_TIME_PER_QUESTION = 2; // segundos minimos por questao
const MIN_ATTEMPT_INTERVAL = 10; // segundos entre tentativas
const MAX_ACCURACY_FOR_FAST_COMPLETION = 0.95; // Se muito rapido e muito preciso = suspeito

/**
 * Valida tentativa contra fraude
 */
export function validateAttempt(input: AntiFraudInput): AntiFraudResult {
  const flags: string[] = [];
  let valid = true;

  const {
    questionsCount,
    accuracy,
    timeSpent,
    challengeType,
    previousAttemptTimestamp,
  } = input;

  // 1. Tempo minimo por questao: 2s
  const minTotalTime = questionsCount * MIN_TIME_PER_QUESTION;
  if (timeSpent < minTotalTime) {
    flags.push(`TEMPO_MUITO_RAPIDO: ${timeSpent}s < ${minTotalTime}s minimo`);
    valid = false;
  }

  // 2. Tempo total minimo baseado na acuracia
  // accuracy * 1.5s por questao
  const expectedMinTime = accuracy * questionsCount * 1.5;
  if (timeSpent < expectedMinTime && accuracy > 0.5) {
    flags.push(`TEMPO_INCONSISTENTE: Alta acuracia (${(accuracy * 100).toFixed(0)}%) com tempo muito baixo`);
    valid = false;
  }

  // 3. Bloquear tentativas repetidas < 10s
  if (previousAttemptTimestamp) {
    const now = Date.now();
    const timeSinceLastAttempt = (now - previousAttemptTimestamp) / 1000;
    if (timeSinceLastAttempt < MIN_ATTEMPT_INTERVAL) {
      flags.push(`TENTATIVA_REPETIDA: ${timeSinceLastAttempt.toFixed(1)}s desde ultima tentativa`);
      valid = false;
    }
  }

  // 4. Combinacao suspeita: muito rapido + muito preciso
  const avgTimePerQuestion = timeSpent / questionsCount;
  if (avgTimePerQuestion < 3 && accuracy > MAX_ACCURACY_FOR_FAST_COMPLETION) {
    flags.push(`PADRAO_SUSPEITO: ${avgTimePerQuestion.toFixed(1)}s/questao com ${(accuracy * 100).toFixed(0)}% acuracia`);
    valid = false;
  }

  // 5. Validacoes especificas por tipo de desafio
  switch (challengeType) {
    case 'turbo':
      // Turbo tem tempo reduzido, ser mais leniente
      if (timeSpent < questionsCount * 1.5) {
        flags.push('TURBO_TEMPO_IMPOSSIVEL');
        valid = false;
      }
      break;

    case 'maratona':
      // Maratona tem 20 questoes, tempo minimo maior
      if (timeSpent < 60) { // Minimo 1 minuto para 20 questoes
        flags.push('MARATONA_TEMPO_IMPOSSIVEL');
        valid = false;
      }
      break;

    case 'aposta':
    case 'jackpot':
      // Apostas sao mais rigorosas
      if (avgTimePerQuestion < 4 && accuracy > 0.8) {
        flags.push(`APOSTA_PADRAO_SUSPEITO`);
        valid = false;
      }
      break;
  }

  // 6. Acuracia 100% com tempo muito baixo
  if (accuracy === 1.0 && avgTimePerQuestion < 5) {
    flags.push('ACURACIA_PERFEITA_SUSPEITA');
    valid = false;
  }

  return {
    valid,
    reason: valid ? undefined : flags.join('; '),
    flagged: flags.length > 0,
    flags,
  };
}

/**
 * Registra flag de fraude no historico
 */
export interface FraudRecord {
  userId: string;
  timestamp: number;
  challengeType: string;
  flags: string[];
  input: Partial<AntiFraudInput>;
}

// Cache em memoria para tentativas recentes (em producao usar Redis)
const recentAttempts: Map<string, number> = new Map();

/**
 * Obtem timestamp da ultima tentativa do usuario
 */
export function getLastAttemptTimestamp(userId: string): number | undefined {
  return recentAttempts.get(userId);
}

/**
 * Registra tentativa do usuario
 */
export function recordAttempt(userId: string): void {
  recentAttempts.set(userId, Date.now());

  // Limpar entradas antigas (> 1 hora)
  const oneHourAgo = Date.now() - 3600000;
  for (const [key, value] of recentAttempts.entries()) {
    if (value < oneHourAgo) {
      recentAttempts.delete(key);
    }
  }
}

/**
 * Calcula tempo esperado para um desafio
 */
export function getExpectedTime(
  questionsCount: number,
  difficulty: 'basico' | 'intermediario' | 'avancado'
): number {
  const baseTimePerQuestion: Record<string, number> = {
    basico: 30,
    intermediario: 45,
    avancado: 60,
  };

  return questionsCount * (baseTimePerQuestion[difficulty] || 45);
}

/**
 * Valida se o score do jackpot e legitimo
 */
export function validateJackpotScore(
  score: number,
  maxPossibleScore: number,
  timeSpent: number,
  questionsCount: number
): AntiFraudResult {
  const flags: string[] = [];
  let valid = true;

  // Score nao pode ser maior que o maximo
  if (score > maxPossibleScore) {
    flags.push('SCORE_IMPOSSIVEL');
    valid = false;
  }

  // Score perfeito com tempo muito baixo
  if (score === maxPossibleScore && timeSpent < questionsCount * 3) {
    flags.push('SCORE_PERFEITO_SUSPEITO');
    valid = false;
  }

  return {
    valid,
    reason: valid ? undefined : flags.join('; '),
    flagged: flags.length > 0,
    flags,
  };
}
