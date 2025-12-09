// Testes do Sistema Anti-Fraude - ENEM Pro
import {
  validateAttempt,
  validateJackpotScore,
  getExpectedTime,
  recordAttempt,
  getLastAttemptTimestamp,
} from '../../lib/fp/antifraud';

describe('validateAttempt', () => {
  test('deve aceitar tentativa valida', () => {
    const result = validateAttempt({
      userId: 'user-1',
      questionsCount: 10,
      accuracy: 0.8,
      timeSpent: 120, // 12s por questao
      challengeType: 'normal',
    });

    expect(result.valid).toBe(true);
    expect(result.flags).toHaveLength(0);
  });

  test('deve rejeitar tempo muito rapido (< 2s/questao)', () => {
    const result = validateAttempt({
      userId: 'user-2',
      questionsCount: 10,
      accuracy: 0.8,
      timeSpent: 15, // 1.5s por questao
      challengeType: 'normal',
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('TEMPO_MUITO_RAPIDO'))).toBe(true);
  });

  test('deve rejeitar tempo inconsistente com alta acuracia', () => {
    const result = validateAttempt({
      userId: 'user-3',
      questionsCount: 10,
      accuracy: 0.9,
      timeSpent: 10, // Muito rapido para 90% de acuracia
      challengeType: 'normal',
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('TEMPO_INCONSISTENTE'))).toBe(true);
  });

  test('deve rejeitar tentativa repetida < 10s', () => {
    // Registrar uma tentativa
    recordAttempt('user-repeat');

    // Tentar novamente imediatamente
    const result = validateAttempt({
      userId: 'user-repeat',
      questionsCount: 10,
      accuracy: 0.8,
      timeSpent: 120,
      challengeType: 'normal',
      previousAttemptTimestamp: Date.now() - 5000, // 5 segundos atras
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('TENTATIVA_REPETIDA'))).toBe(true);
  });

  test('deve rejeitar padrao suspeito (muito rapido + muito preciso)', () => {
    const result = validateAttempt({
      userId: 'user-4',
      questionsCount: 10,
      accuracy: 0.98, // 98%
      timeSpent: 25, // 2.5s por questao
      challengeType: 'normal',
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('PADRAO_SUSPEITO'))).toBe(true);
  });

  test('deve ser mais rigoroso com apostas', () => {
    const result = validateAttempt({
      userId: 'user-5',
      questionsCount: 10,
      accuracy: 0.85,
      timeSpent: 35, // 3.5s por questao
      challengeType: 'aposta',
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('APOSTA_PADRAO_SUSPEITO'))).toBe(true);
  });

  test('deve rejeitar maratona com tempo impossivel', () => {
    const result = validateAttempt({
      userId: 'user-6',
      questionsCount: 20,
      accuracy: 0.7,
      timeSpent: 50, // Menos de 1 minuto para 20 questoes
      challengeType: 'maratona',
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('MARATONA_TEMPO_IMPOSSIVEL'))).toBe(true);
  });

  test('deve rejeitar acuracia 100% com tempo muito baixo', () => {
    const result = validateAttempt({
      userId: 'user-7',
      questionsCount: 10,
      accuracy: 1.0, // 100%
      timeSpent: 40, // 4s por questao
      challengeType: 'normal',
    });

    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('ACURACIA_PERFEITA_SUSPEITA'))).toBe(true);
  });

  test('deve ser mais leniente com turbo', () => {
    const result = validateAttempt({
      userId: 'user-8',
      questionsCount: 10,
      accuracy: 0.8,
      timeSpent: 20, // 2s por questao (rapido mas ok para turbo)
      challengeType: 'turbo',
    });

    // Turbo permite tempo mais curto
    expect(result.flags.some(f => f.includes('TURBO_TEMPO_IMPOSSIVEL'))).toBe(false);
  });
});

describe('validateJackpotScore', () => {
  test('deve aceitar score valido', () => {
    const result = validateJackpotScore(80, 100, 120, 10);
    expect(result.valid).toBe(true);
  });

  test('deve rejeitar score impossivel', () => {
    const result = validateJackpotScore(150, 100, 120, 10); // Score > max
    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('SCORE_IMPOSSIVEL'))).toBe(true);
  });

  test('deve rejeitar score perfeito com tempo muito baixo', () => {
    const result = validateJackpotScore(100, 100, 20, 10); // 2s por questao com score perfeito
    expect(result.valid).toBe(false);
    expect(result.flags.some(f => f.includes('SCORE_PERFEITO_SUSPEITO'))).toBe(true);
  });
});

describe('getExpectedTime', () => {
  test('deve calcular tempo esperado para basico', () => {
    const time = getExpectedTime(10, 'basico');
    expect(time).toBe(300); // 30s * 10 questoes
  });

  test('deve calcular tempo esperado para intermediario', () => {
    const time = getExpectedTime(10, 'intermediario');
    expect(time).toBe(450); // 45s * 10 questoes
  });

  test('deve calcular tempo esperado para avancado', () => {
    const time = getExpectedTime(10, 'avancado');
    expect(time).toBe(600); // 60s * 10 questoes
  });
});

describe('recordAttempt e getLastAttemptTimestamp', () => {
  test('deve registrar e recuperar tentativa', () => {
    const userId = 'user-test-' + Date.now();

    // Inicialmente nao tem
    expect(getLastAttemptTimestamp(userId)).toBeUndefined();

    // Registrar
    recordAttempt(userId);

    // Agora deve ter
    const timestamp = getLastAttemptTimestamp(userId);
    expect(timestamp).toBeDefined();
    expect(typeof timestamp).toBe('number');
    expect(timestamp).toBeLessThanOrEqual(Date.now());
  });
});
