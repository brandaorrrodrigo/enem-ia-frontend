// API Desafio Normal - ENEM Pro FP System 2.0
import { NextRequest, NextResponse } from 'next/server';
import { calculateFP, calculateTimeFactor } from '@/lib/fp/fp-calculator';
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

    // Anti-fraude
    const previousAttempt = getLastAttemptTimestamp(userId);
    const antifraudResult = validateAttempt({
      userId,
      questionsCount,
      accuracy,
      timeSpent: time,
      challengeType: 'normal',
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

    // Calcular FP
    const expectedTime = questionsCount * 45; // 45s por questao
    const timeFactor = calculateTimeFactor(time, expectedTime);

    const fpResult = calculateFP({
      baseFP: 15,
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
      'normal',
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
        breakdown: fpResult.breakdown,
        antifraud: {
          valid: true,
          flags: [],
        },
      },
    });
  } catch (error) {
    console.error('Erro no desafio normal:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
