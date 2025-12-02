/**
 * Sistema de Eventos de Gamificação
 * ENEM-PRO
 */

import { PrismaClient } from '@prisma/client';

// ============================================
// TIPOS DE EVENTOS
// ============================================

export type EventType =
  | 'simulado_iniciado'
  | 'simulado_completo'
  | 'questao_acertada'
  | 'badge_desbloqueado'
  | 'streak_mantido'
  | 'streak_perdido'
  | 'level_up'
  | 'recompensa_resgatada'
  | 'desafio_concluido'
  | 'login_diario';

export interface EventMetadata {
  // Simulado
  simuladoId?: string;
  disciplina?: string;
  nota?: number;
  acertos?: number;
  total?: number;

  // Badge
  badgeCodigo?: string;
  badgeNome?: string;

  // Streak
  streakAtual?: number;
  streakMaximo?: number;

  // Level
  nivelAnterior?: number;
  nivelNovo?: number;
  nivelNome?: string;

  // Outros
  [key: string]: unknown;
}

// ============================================
// FUNÇÕES
// ============================================

/**
 * Registra um evento de gamificação
 */
export async function logEvent(
  prisma: PrismaClient,
  usuarioId: string,
  eventType: EventType,
  points: number = 0,
  metadata?: EventMetadata
): Promise<string> {
  const event = await prisma.gamificationEvent.create({
    data: {
      usuarioId,
      eventType,
      points,
      metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
    }
  });

  return event.id;
}

/**
 * Busca eventos recentes do usuário
 */
export async function getRecentEvents(
  prisma: PrismaClient,
  usuarioId: string,
  limit: number = 20
) {
  return prisma.gamificationEvent.findMany({
    where: { usuarioId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Busca eventos por tipo
 */
export async function getEventsByType(
  prisma: PrismaClient,
  usuarioId: string,
  eventType: EventType,
  limit: number = 10
) {
  return prisma.gamificationEvent.findMany({
    where: { usuarioId, eventType },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Conta eventos por tipo em um período
 */
export async function countEventsByType(
  prisma: PrismaClient,
  usuarioId: string,
  eventType: EventType,
  desde?: Date
): Promise<number> {
  return prisma.gamificationEvent.count({
    where: {
      usuarioId,
      eventType,
      ...(desde && { createdAt: { gte: desde } }),
    }
  });
}

/**
 * Soma pontos ganhos em um período
 */
export async function sumPointsInPeriod(
  prisma: PrismaClient,
  usuarioId: string,
  desde: Date
): Promise<number> {
  const result = await prisma.gamificationEvent.aggregate({
    where: {
      usuarioId,
      createdAt: { gte: desde }
    },
    _sum: { points: true }
  });

  return result._sum.points || 0;
}

/**
 * Obtém histórico de atividade por dia
 */
export async function getActivityHistory(
  prisma: PrismaClient,
  usuarioId: string,
  dias: number = 30
): Promise<Array<{ data: string; eventos: number; pontos: number }>> {
  const desde = new Date();
  desde.setDate(desde.getDate() - dias);

  const events = await prisma.gamificationEvent.findMany({
    where: {
      usuarioId,
      createdAt: { gte: desde }
    },
    select: {
      createdAt: true,
      points: true,
    }
  });

  // Agrupar por dia
  const porDia = new Map<string, { eventos: number; pontos: number }>();

  for (const e of events) {
    const data = e.createdAt.toISOString().split('T')[0];
    const atual = porDia.get(data) || { eventos: 0, pontos: 0 };
    atual.eventos++;
    atual.pontos += e.points;
    porDia.set(data, atual);
  }

  // Converter para array ordenado
  return Array.from(porDia.entries())
    .map(([data, stats]) => ({ data, ...stats }))
    .sort((a, b) => a.data.localeCompare(b.data));
}

/**
 * Obtém resumo de atividade da semana
 */
export async function getWeekSummary(
  prisma: PrismaClient,
  usuarioId: string
) {
  const inicioSemana = new Date();
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
  inicioSemana.setHours(0, 0, 0, 0);

  const [
    totalPontos,
    simuladosCompletos,
    badgesDesbloqueados,
    diasAtivos
  ] = await Promise.all([
    sumPointsInPeriod(prisma, usuarioId, inicioSemana),
    countEventsByType(prisma, usuarioId, 'simulado_completo', inicioSemana),
    countEventsByType(prisma, usuarioId, 'badge_desbloqueado', inicioSemana),
    getActivityHistory(prisma, usuarioId, 7).then(h => h.length),
  ]);

  return {
    totalPontos,
    simuladosCompletos,
    badgesDesbloqueados,
    diasAtivos,
    inicioSemana,
  };
}

/**
 * Feed de atividades recentes (para social)
 */
export async function getActivityFeed(
  prisma: PrismaClient,
  limit: number = 50
) {
  const events = await prisma.gamificationEvent.findMany({
    where: {
      eventType: {
        in: ['simulado_completo', 'badge_desbloqueado', 'level_up', 'streak_mantido']
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      usuario: {
        select: { id: true, nome: true, nivel: true }
      }
    }
  });

  return events.map(e => ({
    id: e.id,
    usuarioId: e.usuarioId,
    usuarioNome: e.usuario.nome || 'Anônimo',
    usuarioNivel: e.usuario.nivel,
    eventType: e.eventType,
    points: e.points,
    metadata: e.metadata as EventMetadata,
    createdAt: e.createdAt,
    mensagem: formatEventMessage(e.eventType as EventType, e.metadata as EventMetadata, e.usuario.nome),
  }));
}

/**
 * Formata mensagem do evento para exibição
 */
function formatEventMessage(
  eventType: EventType,
  metadata: EventMetadata | null,
  nome: string | null
): string {
  const usuario = nome || 'Alguém';

  switch (eventType) {
    case 'simulado_completo':
      const nota = metadata?.nota || 0;
      return `${usuario} completou um simulado com ${nota}% de acertos!`;

    case 'badge_desbloqueado':
      const badge = metadata?.badgeNome || 'conquista';
      return `${usuario} desbloqueou a ${badge}!`;

    case 'level_up':
      const nivel = metadata?.nivelNome || 'novo nível';
      return `${usuario} subiu para ${nivel}!`;

    case 'streak_mantido':
      const streak = metadata?.streakAtual || 0;
      return `${usuario} está com ${streak} dias de sequência!`;

    default:
      return `${usuario} realizou uma ação.`;
  }
}

/**
 * Limpa eventos antigos (para manutenção)
 */
export async function cleanOldEvents(
  prisma: PrismaClient,
  diasManter: number = 90
): Promise<number> {
  const limite = new Date();
  limite.setDate(limite.getDate() - diasManter);

  const result = await prisma.gamificationEvent.deleteMany({
    where: {
      createdAt: { lt: limite }
    }
  });

  return result.count;
}
