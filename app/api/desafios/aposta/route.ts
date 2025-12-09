// API Desafio de Aposta (FP Betting Mode) - ENEM Pro FP System 2.0
// Apostar FP: win = betAmount * 2, lose = -betAmount
// Limite: max 20% do FP total, accuracy >= 70% para ganhar
import { NextRequest, NextResponse } from 'next/server';
import { calculateBetResult, canPlaceBet } from '@/lib/fp/fp-calculator';
import { validateAttempt, getLastAttemptTimestamp, recordAttempt } from '@/lib/fp/antifraud';
import { getUserFP, updateUserFP, createBet, finalizeBet } from '@/lib/fp/fp-service';
import type { Difficulty, UserTier } from '@/lib/fp/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      betAmount,
      accuracy,
      time,
      difficulty,
      userTier,
      questionsCount = 10,
    } = body as {
      userId: string;
      betAmount: number;
      accuracy: number;
      time: number;
      difficulty: Difficulty;
      userTier: UserTier;
      questionsCount?: number;
    };

    // Validacoes basicas
    if (!userId || !betAmount || accuracy === undefined || !time || !difficulty || !userTier) {
      return NextResponse.json(
        { success: false, error: 'Parametros obrigatorios faltando' },
        { status: 400 }
      );
    }

    // Verificar saldo do usuario
    const userFP = await getUserFP(userId);

    // Validar se pode apostar
    const canBet = canPlaceBet(betAmount, userFP.total_fp);
    if (!canBet.valid) {
      return NextResponse.json({
        success: false,
        error: canBet.reason,
      }, { status: 400 });
    }

    // Anti-fraude (apostas sao mais rigorosas)
    const previousAttempt = getLastAttemptTimestamp(userId);
    const antifraudResult = validateAttempt({
      userId,
      questionsCount,
      accuracy,
      timeSpent: time,
      challengeType: 'aposta',
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

    // Criar aposta
    const bet = await createBet(userId, betAmount);

    // Calcular resultado da aposta
    const betResult = calculateBetResult(betAmount, accuracy);

    // Atualizar saldo do usuario
    const updatedUserFP = await updateUserFP(userId, betResult.fpDelta);

    // Finalizar aposta
    await finalizeBet(
      bet.id,
      betResult.won ? 'win' : 'lose',
      accuracy,
      betResult.fpDelta
    );

    return NextResponse.json({
      success: true,
      data: {
        result: betResult.won ? 'win' : 'lose',
        fpDelta: betResult.fpDelta,
        newBalance: updatedUserFP.total_fp,
        accuracy,
        betAmount,
        message: betResult.won
          ? `Parabens! Voce ganhou ${betResult.fpDelta} FP!`
          : `Voce perdeu ${Math.abs(betResult.fpDelta)} FP. Tente novamente!`,
      },
    });
  } catch (error) {
    console.error('Erro no desafio aposta:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// GET - Verificar se usuario pode apostar e qual o limite
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId obrigatorio' },
        { status: 400 }
      );
    }

    const userFP = await getUserFP(userId);
    const maxBet = Math.floor(userFP.total_fp * 0.2); // 20% do total

    return NextResponse.json({
      success: true,
      data: {
        totalFP: userFP.total_fp,
        maxBet,
        minBet: 10,
        canBet: userFP.total_fp >= 10,
      },
    });
  } catch (error) {
    console.error('Erro ao verificar aposta:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
