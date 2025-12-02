import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getLeaderboard, getStreakLeaderboard } from '@/lib/gamification';

/**
 * GET /api/gamification/leaderboard
 * Retorna ranking de usuários
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo') || 'pontos'; // pontos | streaks
    const limit = parseInt(searchParams.get('limit') || '10');

    if (tipo === 'streaks') {
      const ranking = await getStreakLeaderboard(prisma, limit);

      return NextResponse.json({
        tipo: 'streaks',
        ranking: ranking.map((r, i) => ({
          posicao: i + 1,
          usuarioId: r.id,
          nome: r.nome || 'Anônimo',
          streakAtual: r.streakAtual,
          streakMaximo: r.streakMaximo,
        })),
      });
    }

    // Ranking por pontos (padrão)
    const ranking = await getLeaderboard(prisma, limit);

    return NextResponse.json({
      tipo: 'pontos',
      ranking,
    });
  } catch (error) {
    console.error('Erro ao buscar leaderboard:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
