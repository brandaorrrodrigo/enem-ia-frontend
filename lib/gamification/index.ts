/**
 * Sistema de Gamificação ENEM-PRO
 * Exportações centralizadas
 */

// Badges
export {
  BADGES,
  getUserStats,
  checkAndUnlockBadges,
  listBadgesWithStatus,
  grantSpecialBadge,
  type BadgeDefinition,
  type UserStats,
} from './badges';

// Streaks
export {
  STREAK_CONFIG,
  updateStreak,
  getStreakInfo,
  checkExpiredStreaks,
  getStreakLeaderboard,
} from './streaks';

// Score e Níveis
export {
  NIVEIS,
  PONTOS,
  calcularNivel,
  calcularProgressoNivel,
  ensureUserScore,
  addPoints,
  updateSimuladoStats,
  getScoreSummary,
  getLeaderboard,
  resetWeeklyStats,
  type NivelConfig,
} from './score';

// Eventos
export {
  logEvent,
  getRecentEvents,
  getEventsByType,
  countEventsByType,
  sumPointsInPeriod,
  getActivityHistory,
  getWeekSummary,
  getActivityFeed,
  cleanOldEvents,
  type EventType,
  type EventMetadata,
} from './events';

// ============================================
// FUNÇÃO PRINCIPAL: Processar fim de simulado
// ============================================

import { PrismaClient } from '@prisma/client';
import { updateStreak } from './streaks';
import { updateSimuladoStats } from './score';
import { checkAndUnlockBadges } from './badges';
import { logEvent } from './events';

export interface ProcessSimuladoResult {
  // Pontos
  pontosSimulado: number;
  pontosStreak: number;
  pontosBadges: number;
  pontosTotal: number;

  // Streak
  streakAtual: number;
  streakMaximo: number;
  novoRecordeStreak: boolean;

  // Level
  levelUp: boolean;
  nivelNovo?: {
    nivel: number;
    nome: string;
    icone: string;
  };

  // Badges
  novosBadges: string[];
}

/**
 * Processa todas as recompensas de gamificação ao finalizar simulado
 * Esta é a função principal a ser chamada quando o usuário finaliza um simulado
 */
export async function processarFimSimulado(
  prisma: PrismaClient,
  usuarioId: string,
  simuladoId: string,
  acertos: number,
  total: number,
  disciplina: string
): Promise<ProcessSimuladoResult> {
  const nota = Math.round((acertos / total) * 100);

  // 1. Atualizar streak
  const streakResult = await updateStreak(prisma, usuarioId);

  // 2. Atualizar stats e ganhar pontos do simulado
  const statsResult = await updateSimuladoStats(
    prisma,
    usuarioId,
    acertos,
    total,
    nota,
    disciplina
  );

  // 3. Verificar e desbloquear badges
  const badgesResult = await checkAndUnlockBadges(prisma, usuarioId);

  // 4. Logar evento
  await logEvent(prisma, usuarioId, 'simulado_completo', statsResult.pontosGanhos, {
    simuladoId,
    disciplina,
    nota,
    acertos,
    total,
  });

  // 5. Logar badges desbloqueados
  for (const codigo of badgesResult.newBadges) {
    await logEvent(prisma, usuarioId, 'badge_desbloqueado', 0, {
      badgeCodigo: codigo,
    });
  }

  // 6. Logar streak se foi mantido/aumentado
  if (streakResult.streakAtual > 0) {
    await logEvent(prisma, usuarioId, 'streak_mantido', streakResult.pontosGanhos, {
      streakAtual: streakResult.streakAtual,
      streakMaximo: streakResult.streakMaximo,
    });
  }

  // Calcular total de pontos
  const pontosTotal = statsResult.pontosGanhos + streakResult.pontosGanhos + badgesResult.totalPoints;

  return {
    pontosSimulado: statsResult.pontosGanhos,
    pontosStreak: streakResult.pontosGanhos,
    pontosBadges: badgesResult.totalPoints,
    pontosTotal,

    streakAtual: streakResult.streakAtual,
    streakMaximo: streakResult.streakMaximo,
    novoRecordeStreak: streakResult.novoRecorde,

    levelUp: statsResult.levelUp,

    novosBadges: badgesResult.newBadges,
  };
}
