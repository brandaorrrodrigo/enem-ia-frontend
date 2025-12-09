// API Desafio Turbo - ENEM Pro FP System 2.0
// Tempo reduzido (x0.75), baseFP = 20, bonus +10 FP
import { NextRequest, NextResponse } from 'next/server';
import { calculateTurboFP, calculateTimeFactor } from '@/lib/fp/fp-calculator';
import { validateAttempt, getLastAttemptTimestamp, recordAttempt } from '@/lib/fp/antifraud';
import { getUserFP, updateUserFP, saveChallengeHistory } from '@/lib/fp/fp-service';
import type { Difficulty, UserTier } from '@/lib/fp/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      accuracy,
      time,
      difficulty,
      userTier,
      questionsCount = 10,
      correctAnswers,
    } = body as {
      userId: string;
      accuracy: number;
      time: number;
      difficulty: Difficulty;
      userTier: UserTier;
      questionsCount?: number;
      correctAnswers?: number;
    };

    // Validacoes basicas
    if (!userId || accuracy === undefined || !time || !difficulty || !userTier) {
      return NextResponse.json(
        { success: false, error: 'Parametros obrigatorios faltando' },
        { status: 400 }
      );
    }

    // Anti-fraude (turbo e mais leniente com tempo)
    const previousAttempt = getLastAttemptTimestamp(userId);
    const antifraudResult = validateAttempt({
      userId,
      questionsCount,
      accuracy,
      timeSpent: time,
      challengeType: 'turbo',
      previousAttemptTimestamp: previousAttempt,
    });

    if (!antifraudResult.valid) {
      return NextResponse.json({
        success: false,
        error: 'Tentativa bloqueada pelo sistema anti-fraude',
        antifraud: {
          valid: false,
          flags: antifraudResult.flags,
        },
      }, { status: 403 });
    }

    // Registrar tentativa
    recordAttempt(userId);

    // Calcular FP (Turbo: tempo reduzido x0.75)
    const expectedTime = questionsCount * 30; // Turbo: 30s por questao
    const timeFactor = calculateTimeFactor(time, expectedTime);

    const fpResult = calculateTurboFP({
      accuracy,
      timeFactor,
      difficulty,
      userTier,
    });

    // Atualizar saldo do usuario
    const userFP = await updateUserFP(userId, fpResult.fpFinal);

    // Salvar historico
    await saveChallengeHistory(
      userId,
      'turbo',
      difficulty,
      questionsCount,
      correctAnswers || Math.round(questionsCount * accuracy),
      accuracy,
      time,
      fpResult.fpFinal
    );

    return NextResponse.json({
      success: true,
      data: {
        fpEarned: fpResult.fpFinal,
        fpTotal: userFP.total_fp,
        breakdown: {
          ...fpResult.breakdown,
          turboBonus: 10, // Bonus fixo do turbo
        },
        antifraud: {
          valid: true,
          flags: [],
        },
      },
    });
  } catch (error) {
    console.error('Erro no desafio turbo:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
