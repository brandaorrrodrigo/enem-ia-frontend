// Testes do Sistema de Calculo FP - ENEM Pro
import {
  calculateFP,
  calculateTimeFactor,
  calculateTurboFP,
  calculateMaratonaFP,
  calculateBetResult,
  canPlaceBet,
} from '../../lib/fp/fp-calculator';

describe('calculateFP', () => {
  test('deve calcular FP basico corretamente', () => {
    const result = calculateFP({
      baseFP: 15,
      accuracy: 0.8, // 80%
      timeFactor: 0.5,
      difficulty: 'basico',
      userTier: 'free',
    });

    // baseFP = 15
    // accuracyBonus = floor(0.8 * 10) = 8
    // timeBonus = floor(0.5 * 15) = 7
    // subtotal = 15 + 8 + 7 = 30
    // difficultyMultiplier = 1.0
    // tierMultiplier = 1.0
    // fpFinal = 30

    expect(result.fpFinal).toBe(30);
    expect(result.breakdown.base).toBe(15);
    expect(result.breakdown.accuracyBonus).toBe(8);
    expect(result.breakdown.timeBonus).toBe(7);
  });

  test('deve aplicar multiplicador de dificuldade intermediaria', () => {
    const result = calculateFP({
      baseFP: 15,
      accuracy: 0.8,
      timeFactor: 0.5,
      difficulty: 'intermediario',
      userTier: 'free',
    });

    // subtotal = 30, x1.2 = 36
    expect(result.fpFinal).toBe(36);
    expect(result.breakdown.difficultyMultiplier).toBe(1.2);
  });

  test('deve aplicar multiplicador de dificuldade avancada', () => {
    const result = calculateFP({
      baseFP: 15,
      accuracy: 0.8,
      timeFactor: 0.5,
      difficulty: 'avancado',
      userTier: 'free',
    });

    // subtotal = 30, x1.5 = 45
    expect(result.fpFinal).toBe(45);
    expect(result.breakdown.difficultyMultiplier).toBe(1.5);
  });

  test('deve aplicar multiplicador de tier pro', () => {
    const result = calculateFP({
      baseFP: 15,
      accuracy: 0.8,
      timeFactor: 0.5,
      difficulty: 'basico',
      userTier: 'pro',
    });

    // subtotal = 30, x1.5 = 45
    expect(result.fpFinal).toBe(45);
    expect(result.breakdown.tierMultiplier).toBe(1.5);
  });

  test('deve aplicar multiplicador de tier premium', () => {
    const result = calculateFP({
      baseFP: 15,
      accuracy: 0.8,
      timeFactor: 0.5,
      difficulty: 'basico',
      userTier: 'premium',
    });

    // subtotal = 30, x2 = 60
    expect(result.fpFinal).toBe(60);
    expect(result.breakdown.tierMultiplier).toBe(2.0);
  });

  test('deve combinar multiplicadores de dificuldade e tier', () => {
    const result = calculateFP({
      baseFP: 15,
      accuracy: 1.0, // 100%
      timeFactor: 1.0,
      difficulty: 'avancado',
      userTier: 'premium',
    });

    // baseFP = 15
    // accuracyBonus = 10
    // timeBonus = 15
    // subtotal = 40
    // x1.5 (avancado) = 60
    // x2.0 (premium) = 120
    expect(result.fpFinal).toBe(120);
  });

  test('deve garantir FP minimo de 0', () => {
    const result = calculateFP({
      baseFP: 0,
      accuracy: 0,
      timeFactor: 0,
      difficulty: 'basico',
      userTier: 'free',
    });

    expect(result.fpFinal).toBe(0);
  });

  test('deve limitar accuracy entre 0 e 1', () => {
    const resultHigh = calculateFP({
      baseFP: 15,
      accuracy: 1.5, // > 1
      timeFactor: 0.5,
      difficulty: 'basico',
      userTier: 'free',
    });

    const resultLow = calculateFP({
      baseFP: 15,
      accuracy: -0.5, // < 0
      timeFactor: 0.5,
      difficulty: 'basico',
      userTier: 'free',
    });

    expect(resultHigh.breakdown.accuracyBonus).toBe(10); // max
    expect(resultLow.breakdown.accuracyBonus).toBe(0); // min
  });
});

describe('calculateTimeFactor', () => {
  test('deve retornar 1.0 para tempo muito rapido', () => {
    const factor = calculateTimeFactor(20, 100); // 20% do tempo esperado
    expect(factor).toBe(1.0);
  });

  test('deve retornar 0.5 para tempo igual ao esperado', () => {
    const factor = calculateTimeFactor(100, 100); // 100% do tempo esperado
    expect(factor).toBeCloseTo(0.5, 1);
  });

  test('deve retornar 0 para tempo muito lento', () => {
    const factor = calculateTimeFactor(200, 100); // 200% do tempo esperado
    expect(factor).toBe(0);
  });

  test('deve retornar 0 para entradas invalidas', () => {
    expect(calculateTimeFactor(0, 100)).toBe(0);
    expect(calculateTimeFactor(100, 0)).toBe(0);
    expect(calculateTimeFactor(-10, 100)).toBe(0);
  });
});

describe('calculateTurboFP', () => {
  test('deve adicionar bonus de +10 FP', () => {
    const result = calculateTurboFP({
      accuracy: 0.8,
      timeFactor: 0.5,
      difficulty: 'basico',
      userTier: 'free',
    });

    // Base turbo = 20
    // O resultado deve ter +10 de bonus
    expect(result.breakdown.base).toBe(20);
    expect(result.fpFinal).toBeGreaterThan(0);
  });
});

describe('calculateMaratonaFP', () => {
  test('deve usar base de 40 FP', () => {
    const result = calculateMaratonaFP(
      {
        accuracy: 0.8,
        timeFactor: 0.5,
        difficulty: 'basico',
        userTier: 'free',
      },
      16
    );

    expect(result.breakdown.base).toBe(40);
  });

  test('deve adicionar bonus de +20 FP para 15+ acertos', () => {
    const resultHigh = calculateMaratonaFP(
      {
        accuracy: 0.8,
        timeFactor: 0.5,
        difficulty: 'basico',
        userTier: 'free',
      },
      15 // 15 acertos
    );

    const resultLow = calculateMaratonaFP(
      {
        accuracy: 0.7,
        timeFactor: 0.5,
        difficulty: 'basico',
        userTier: 'free',
      },
      14 // 14 acertos
    );

    expect(resultHigh.fpFinal).toBeGreaterThan(resultLow.fpFinal);
  });
});

describe('calculateBetResult', () => {
  test('deve ganhar com accuracy >= 70%', () => {
    const result = calculateBetResult(50, 0.7);
    expect(result.won).toBe(true);
    expect(result.fpDelta).toBe(100); // 50 * 2
  });

  test('deve perder com accuracy < 70%', () => {
    const result = calculateBetResult(50, 0.69);
    expect(result.won).toBe(false);
    expect(result.fpDelta).toBe(-50);
  });

  test('deve dobrar a aposta na vitoria', () => {
    const result = calculateBetResult(100, 0.9);
    expect(result.won).toBe(true);
    expect(result.fpDelta).toBe(200);
  });
});

describe('canPlaceBet', () => {
  test('deve permitir aposta dentro do limite de 20%', () => {
    const result = canPlaceBet(20, 100); // 20% de 100
    expect(result.valid).toBe(true);
  });

  test('deve bloquear aposta acima do limite de 20%', () => {
    const result = canPlaceBet(25, 100); // 25% de 100
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('20%');
  });

  test('deve bloquear aposta maior que o saldo', () => {
    const result = canPlaceBet(150, 100);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('insuficiente');
  });

  test('deve bloquear aposta menor que 10 FP', () => {
    const result = canPlaceBet(5, 100);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('10 FP');
  });

  test('deve permitir aposta de 10 FP', () => {
    const result = canPlaceBet(10, 100);
    expect(result.valid).toBe(true);
  });
});
