/**
 * Sistema de Streaks (Sequência de Dias Estudando)
 * ENEM-PRO
 */

import { PrismaClient } from '@prisma/client';

// ============================================
// CONFIGURAÇÕES
// ============================================

export const STREAK_CONFIG = {
  // Pontos por streak
  pontosStreakDiario: 10,    // Por dia de streak mantido
  bonusStreak7: 50,          // Bonus por 7 dias
  bonusStreak14: 100,        // Bonus por 14 dias
  bonusStreak30: 250,        // Bonus por 30 dias

  // Tolerância (em horas) para não perder streak
  toleranciaHoras: 36,       // 36h de tolerância (permite pular 1 dia parcial)
};

// ============================================
// FUNÇÕES
// ============================================

/**
 * Verifica se é um novo dia de estudo (comparando datas)
 */
function isNewStudyDay(ultimoEstudo: Date | null): boolean {
  if (!ultimoEstudo) return true;

  const hoje = new Date();
  const ultimo = new Date(ultimoEstudo);

  // Normalizar para início do dia
  hoje.setHours(0, 0, 0, 0);
  ultimo.setHours(0, 0, 0, 0);

  return hoje.getTime() > ultimo.getTime();
}

/**
 * Verifica se o streak deve ser mantido ou resetado
 */
function shouldMaintainStreak(ultimoEstudo: Date | null): boolean {
  if (!ultimoEstudo) return false;

  const agora = new Date();
  const ultimo = new Date(ultimoEstudo);
  const diffMs = agora.getTime() - ultimo.getTime();
  const diffHoras = diffMs / (1000 * 60 * 60);

  return diffHoras <= STREAK_CONFIG.toleranciaHoras;
}

/**
 * Atualiza streak do usuário após completar simulado
 * Retorna pontos ganhos e info do streak
 */
export async function updateStreak(
  prisma: PrismaClient,
  usuarioId: string
): Promise<{
  streakAtual: number;
  streakMaximo: number;
  pontosGanhos: number;
  novoRecorde: boolean;
  bonus: number;
}> {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: {
      streakAtual: true,
      streakMaximo: true,
      ultimoEstudo: true,
    }
  });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const { ultimoEstudo, streakAtual, streakMaximo } = usuario;
  let novoStreak = streakAtual;
  let pontosGanhos = 0;
  let bonus = 0;
  let novoRecorde = false;

  // Verificar se é novo dia
  if (isNewStudyDay(ultimoEstudo)) {
    // Verificar se mantém streak ou reseta
    if (shouldMaintainStreak(ultimoEstudo)) {
      novoStreak = streakAtual + 1;
    } else {
      novoStreak = 1; // Reset - novo streak começando
    }

    // Pontos por manter streak
    pontosGanhos = STREAK_CONFIG.pontosStreakDiario * novoStreak;

    // Bonus por marcos
    if (novoStreak === 7) {
      bonus = STREAK_CONFIG.bonusStreak7;
    } else if (novoStreak === 14) {
      bonus = STREAK_CONFIG.bonusStreak14;
    } else if (novoStreak === 30) {
      bonus = STREAK_CONFIG.bonusStreak30;
    } else if (novoStreak > 30 && novoStreak % 30 === 0) {
      bonus = STREAK_CONFIG.bonusStreak30; // A cada 30 dias
    }

    pontosGanhos += bonus;
  }

  // Verificar novo recorde
  const novoMaximo = Math.max(novoStreak, streakMaximo);
  novoRecorde = novoMaximo > streakMaximo;

  // Atualizar no banco
  await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      streakAtual: novoStreak,
      streakMaximo: novoMaximo,
      ultimoEstudo: new Date(),
    }
  });

  return {
    streakAtual: novoStreak,
    streakMaximo: novoMaximo,
    pontosGanhos,
    novoRecorde,
    bonus,
  };
}

/**
 * Obtém informações do streak atual
 */
export async function getStreakInfo(
  prisma: PrismaClient,
  usuarioId: string
): Promise<{
  streakAtual: number;
  streakMaximo: number;
  ultimoEstudo: Date | null;
  streakEmRisco: boolean;
  horasRestantes: number;
}> {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: {
      streakAtual: true,
      streakMaximo: true,
      ultimoEstudo: true,
    }
  });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  let streakEmRisco = false;
  let horasRestantes = STREAK_CONFIG.toleranciaHoras;

  if (usuario.ultimoEstudo) {
    const agora = new Date();
    const diffMs = agora.getTime() - usuario.ultimoEstudo.getTime();
    const diffHoras = diffMs / (1000 * 60 * 60);
    horasRestantes = Math.max(0, STREAK_CONFIG.toleranciaHoras - diffHoras);

    // Em risco se menos de 6 horas
    streakEmRisco = horasRestantes < 6 && horasRestantes > 0;
  }

  return {
    streakAtual: usuario.streakAtual,
    streakMaximo: usuario.streakMaximo,
    ultimoEstudo: usuario.ultimoEstudo,
    streakEmRisco,
    horasRestantes,
  };
}

/**
 * Verifica streaks expirados (para cron job)
 * Reseta streaks de usuários que passaram da tolerância
 */
export async function checkExpiredStreaks(prisma: PrismaClient): Promise<number> {
  const limite = new Date();
  limite.setHours(limite.getHours() - STREAK_CONFIG.toleranciaHoras);

  const result = await prisma.usuario.updateMany({
    where: {
      streakAtual: { gt: 0 },
      ultimoEstudo: { lt: limite }
    },
    data: {
      streakAtual: 0
    }
  });

  return result.count;
}

/**
 * Obtém ranking de streaks
 */
export async function getStreakLeaderboard(
  prisma: PrismaClient,
  limit: number = 10
) {
  return prisma.usuario.findMany({
    where: { streakAtual: { gt: 0 } },
    select: {
      id: true,
      nome: true,
      streakAtual: true,
      streakMaximo: true,
    },
    orderBy: { streakAtual: 'desc' },
    take: limit,
  });
}
