// API Jackpot Status - ENEM Pro FP System 2.0
// Retorna status atual do jackpot, pool total, ranking
import { NextRequest, NextResponse } from 'next/server';
import { getJackpotPool, getTodayJackpotEntries, getJackpotPosition } from '@/lib/fp/fp-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Obter pool atual
    const pool = await getJackpotPool();

    // Obter entradas de hoje
    const entries = await getTodayJackpotEntries();

    // Calcular quando termina (meia-noite)
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // Top 10 ranking
    const top10 = entries.slice(0, 10).map((entry, idx) => ({
      position: idx + 1,
      score: entry.score,
      userId: entry.user_id.substring(0, 8) + '...', // Anonimizar
    }));

    // Dados do usuario se fornecido
    let userEntry = null;
    if (userId) {
      const position = await getJackpotPosition(userId);
      const entry = entries.find(e => e.user_id === userId);
      if (entry && position) {
        userEntry = {
          score: entry.score,
          position,
        };
      }
    }

    // Ultimos vencedores (mock)
    const lastWinners = pool.last_winner ? [
      {
        name: pool.last_winner.substring(0, 8) + '...',
        amount: 150, // Mock
        date: pool.updated_at,
      },
    ] : [];

    return NextResponse.json({
      success: true,
      data: {
        totalPool: pool.total_fp,
        entriesCount: entries.length,
        top10,
        userEntry,
        lastWinners,
        endsAt: endOfDay.toISOString(),
        entryCost: 5,
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
