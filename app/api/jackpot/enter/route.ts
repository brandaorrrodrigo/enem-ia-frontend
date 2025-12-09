// API Jackpot Enter - ENEM Pro FP System 2.0
// Participacao custa 5 FP, adiciona ao pool
import { NextRequest, NextResponse } from 'next/server';
import { validateAttempt, getLastAttemptTimestamp, recordAttempt, validateJackpotScore } from '@/lib/fp/antifraud';
import { getUserFP, updateUserFP, addToJackpotPool, enterJackpot, getJackpotPosition } from '@/lib/fp/fp-service';

const ENTRY_COST = 5; // Custo de entrada em FP
const MAX_SCORE = 100; // Score maximo possivel

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      userId,
      score,
      timeSpent,
      questionsCount = 10,
    } = body as {
      userId: string;
      score: number;
      timeSpent: number;
      questionsCount?: number;
    };

    // Validacoes basicas
    if (!userId || score === undefined || !timeSpent) {
      return NextResponse.json(
        { success: false, error: 'Parametros obrigatorios faltando' },
        { status: 400 }
      );
    }

    // Verificar saldo do usuario
    const userFP = await getUserFP(userId);

    if (userFP.total_fp < ENTRY_COST) {
      return NextResponse.json({
        success: false,
        error: `Saldo insuficiente. Necessario ${ENTRY_COST} FP para participar.`,
      }, { status: 400 });
    }

    // Anti-fraude para score do jackpot
    const previousAttempt = getLastAttemptTimestamp(userId);
    const antifraudResult = validateAttempt({
      userId,
      questionsCount,
      accuracy: score / MAX_SCORE,
      timeSpent,
      challengeType: 'jackpot',
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

    // Validar score
    const scoreValidation = validateJackpotScore(score, MAX_SCORE, timeSpent, questionsCount);
    if (!scoreValidation.valid) {
      return NextResponse.json({
        success: false,
        error: 'Score invalido',
        antifraud: scoreValidation,
      }, { status: 403 });
    }

    // Registrar tentativa
    recordAttempt(userId);

    // Cobrar entrada
    await updateUserFP(userId, -ENTRY_COST);

    // Adicionar ao pool
    const pool = await addToJackpotPool(ENTRY_COST);

    // Registrar entrada com score
    const entry = await enterJackpot(userId, score);

    // Obter posicao atual
    const position = await getJackpotPosition(userId);

    return NextResponse.json({
      success: true,
      data: {
        entry: {
          id: entry.id,
          score: entry.score,
          position,
        },
        pool: {
          total: pool.total_fp,
        },
        fpDeducted: ENTRY_COST,
        message: `Entrada registrada! Voce esta na posicao ${position}.`,
      },
    });
  } catch (error) {
    console.error('Erro ao entrar no jackpot:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
