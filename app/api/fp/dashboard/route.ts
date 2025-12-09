// API Dashboard FP - ENEM Pro FP System 2.0
// Retorna todos os dados do usuario para o painel
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserFP,
  getChallengeHistory,
  getBetHistory,
  getWeeklyStats,
  getJackpotPosition,
} from '@/lib/fp/fp-service';

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

    // Carregar todos os dados em paralelo
    const [userFP, challenges, bets, weeklyStats, jackpotPosition] = await Promise.all([
      getUserFP(userId),
      getChallengeHistory(userId, 10),
      getBetHistory(userId, 10),
      getWeeklyStats(userId),
      getJackpotPosition(userId),
    ]);

    // Calcular estatisticas adicionais
    const totalChallenges = challenges.length;
    const avgAccuracy = challenges.length > 0
      ? challenges.reduce((sum, c) => sum + c.accuracy, 0) / challenges.length
      : 0;

    const betsWinRate = bets.length > 0
      ? bets.filter(b => b.status === 'win').length / bets.length
      : 0;

    // Maior vitoria
    const biggestWin = Math.max(
      ...challenges.map(c => c.fp_earned),
      ...bets.filter(b => b.status === 'win').map(b => b.fp_delta || 0),
      0
    );

    // Grafico semanal (ultimos 7 dias)
    const weeklyChart = generateWeeklyChart(challenges, bets);

    // Badges
    const badges = generateBadges(userFP, challenges, bets, weeklyStats);

    return NextResponse.json({
      success: true,
      data: {
        // FP principal
        totalFP: userFP.total_fp,
        weeklyFP: userFP.weekly_fp,
        monthlyFP: userFP.monthly_fp,
        streakDays: userFP.streak_days,

        // Estatisticas
        stats: {
          totalChallenges,
          avgAccuracy: Math.round(avgAccuracy * 100),
          betsWon: weeklyStats.betsWon,
          betsLost: weeklyStats.betsLost,
          betsWinRate: Math.round(betsWinRate * 100),
          biggestWin,
          fpGainedWeek: weeklyStats.fpGained,
          fpLostWeek: weeklyStats.fpLost,
        },

        // Historicos
        recentChallenges: challenges.slice(0, 5).map(c => ({
          type: c.challenge_type,
          difficulty: c.difficulty,
          accuracy: Math.round(c.accuracy * 100),
          fpEarned: c.fp_earned,
          date: c.created_at,
        })),

        recentBets: bets.slice(0, 5).map(b => ({
          amount: b.amount,
          status: b.status,
          accuracy: b.accuracy ? Math.round(b.accuracy * 100) : null,
          fpDelta: b.fp_delta,
          date: b.created_at,
        })),

        // Jackpot
        jackpot: {
          position: jackpotPosition,
          participating: jackpotPosition !== null,
        },

        // Grafico
        weeklyChart,

        // Badges
        badges,
      },
    });
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Gerar dados do grafico semanal
function generateWeeklyChart(
  challenges: Array<{ created_at: string; fp_earned: number }>,
  bets: Array<{ created_at: string; fp_delta?: number }>
) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const chart: Array<{ day: string; gained: number; lost: number }> = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStr = date.toISOString().split('T')[0];

    const dayGained = challenges
      .filter(c => c.created_at.startsWith(dayStr))
      .reduce((sum, c) => sum + c.fp_earned, 0);

    const dayLost = bets
      .filter(b => b.created_at.startsWith(dayStr) && (b.fp_delta || 0) < 0)
      .reduce((sum, b) => sum + Math.abs(b.fp_delta || 0), 0);

    chart.push({
      day: days[date.getDay()],
      gained: dayGained,
      lost: dayLost,
    });
  }

  return chart;
}

// Gerar badges de conquista
function generateBadges(
  userFP: { total_fp: number; streak_days: number },
  challenges: Array<{ accuracy: number }>,
  bets: Array<{ status: string }>,
  weeklyStats: { challengesCompleted: number; betsWon: number }
) {
  const badges: Array<{ id: string; name: string; icon: string; earned: boolean }> = [];

  // Badge de FP total
  badges.push({
    id: 'fp-100',
    name: 'Iniciante',
    icon: '🌱',
    earned: userFP.total_fp >= 100,
  });

  badges.push({
    id: 'fp-500',
    name: 'Estudante',
    icon: '📚',
    earned: userFP.total_fp >= 500,
  });

  badges.push({
    id: 'fp-1000',
    name: 'Dedicado',
    icon: '⭐',
    earned: userFP.total_fp >= 1000,
  });

  badges.push({
    id: 'fp-5000',
    name: 'Mestre',
    icon: '🏆',
    earned: userFP.total_fp >= 5000,
  });

  // Badge de streak
  badges.push({
    id: 'streak-7',
    name: '7 Dias Seguidos',
    icon: '🔥',
    earned: userFP.streak_days >= 7,
  });

  // Badge de acuracia
  const avgAccuracy = challenges.length > 0
    ? challenges.reduce((sum, c) => sum + c.accuracy, 0) / challenges.length
    : 0;

  badges.push({
    id: 'accuracy-90',
    name: 'Precisao 90%+',
    icon: '🎯',
    earned: avgAccuracy >= 0.9 && challenges.length >= 5,
  });

  // Badge de apostas
  const betsWon = bets.filter(b => b.status === 'win').length;
  badges.push({
    id: 'bets-10',
    name: 'Apostador',
    icon: '🎰',
    earned: betsWon >= 10,
  });

  // Badge de consistencia
  badges.push({
    id: 'weekly-10',
    name: 'Consistente',
    icon: '💪',
    earned: weeklyStats.challengesCompleted >= 10,
  });

  return badges;
}
