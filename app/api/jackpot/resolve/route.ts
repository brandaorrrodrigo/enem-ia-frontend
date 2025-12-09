// API Jackpot Resolve - ENEM Pro FP System 2.0
// Executa a meia-noite para determinar vencedor
// Pode ser chamado por CRON job ou manualmente
import { NextRequest, NextResponse } from 'next/server';
import { resolveJackpot, getJackpotPool, getTodayJackpotEntries } from '@/lib/fp/fp-service';

// Secret para autenticar CRON job
const CRON_SECRET = process.env.CRON_SECRET || 'dev-secret';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticacao
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');

    if (secret !== CRON_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Nao autorizado' },
        { status: 401 }
      );
    }

    // Obter status atual antes de resolver
    const poolBefore = await getJackpotPool();
    const entriesBefore = await getTodayJackpotEntries();

    if (entriesBefore.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          winner: null,
          prize: 0,
          message: 'Nenhuma entrada hoje. Jackpot acumulado.',
        },
      });
    }

    // Resolver jackpot
    const result = await resolveJackpot();

    return NextResponse.json({
      success: true,
      data: {
        winner: result.winner,
        prize: result.prize,
        entriesCount: entriesBefore.length,
        poolBefore: poolBefore.total_fp,
        message: result.winner
          ? `Jackpot resolvido! Vencedor recebeu ${result.prize} FP.`
          : 'Jackpot resolvido sem vencedor.',
      },
    });
  } catch (error) {
    console.error('Erro ao resolver jackpot:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// GET - Status para debug/admin
export async function GET(request: NextRequest) {
  try {
    const pool = await getJackpotPool();
    const entries = await getTodayJackpotEntries();

    // Calcular proximo resolve (meia-noite)
    const now = new Date();
    const nextResolve = new Date(now);
    nextResolve.setDate(nextResolve.getDate() + 1);
    nextResolve.setHours(0, 0, 0, 0);

    return NextResponse.json({
      success: true,
      data: {
        pool: pool.total_fp,
        entriesCount: entries.length,
        topEntry: entries[0] || null,
        lastWinner: pool.last_winner,
        nextResolve: nextResolve.toISOString(),
      },
    });
  } catch (error) {
    console.error('Erro ao obter status do jackpot:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
