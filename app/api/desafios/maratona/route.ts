// API Desafio Maratona - ENEM Pro FP System 2.0
// 20 questoes, baseFP = 40, +20 FP extra se 15+ acertos
import { NextRequest, NextResponse } from 'next/server';
import { calculateMaratonaFP, calculateTimeFactor } from '@/lib/fp/fp-calculator';
import { validateAttempt, getLastAttemptTimestamp, recordAttempt } from '@/lib/fp/antifraud';
import { getUserFP, updateUserFP, saveChallengeHistory } from '@/lib/fp/fp-service';
import type { Difficulty, UserTier } from '@/lib/fp/types';

const MARATONA_QUESTIONS = 20;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      accuracy,
      time,
      difficulty,
      userTier,
      correctAnswers,
    } = body as {
      userId: string;
      accuracy: number;
      time: number;
      difficulty: Difficulty;
      userTier: UserTier;
      correctAnswers: number;
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
      questionsCount: MARATONA_QUESTIONS,
      accuracy,
      timeSpent: time,
      challengeType: 'maratona',
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

    // Calcular FP (Maratona: 20 questoes, baseFP = 40)
    const expectedTime = MARATONA_QUESTIONS * 60; // 60s por questao na maratona
    const timeFactor = calculateTimeFactor(time, expectedTime);

    const questoesCorretas = correctAnswers || Math.round(MARATONA_QUESTIONS * accuracy);

    const fpResult = calculateMaratonaFP(
      {
        accuracy,
        timeFactor,
        difficulty,
        userTier,
      },
      questoesCorretas
    );

    // Bonus extra de alta performance
    const highPerformanceBonus = questoesCorretas >= 15 ? 20 : 0;

    // Atualizar saldo do usuario
    const userFP = await updateUserFP(userId, fpResult.fpFinal);

    // Salvar historico
    await saveChallengeHistory(
      userId,
      'maratona',
      difficulty,
      MARATONA_QUESTIONS,
      questoesCorretas,
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
          questoesCorretas,
          highPerformanceBonus,
        },
        antifraud: {
          valid: true,
          flags: [],
        },
      },
    });
  } catch (error) {
    console.error('Erro no desafio maratona:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
