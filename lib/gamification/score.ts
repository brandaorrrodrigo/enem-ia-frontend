/**
 * Sistema de Score e Níveis
 * ENEM-PRO
 */

import { PrismaClient } from '@prisma/client';

// ============================================
// CONFIGURAÇÃO DE NÍVEIS
// ============================================

export interface NivelConfig {
  nivel: number;
  nome: string;
  pontosMin: number;
  icone: string;
}

export const NIVEIS: NivelConfig[] = [
  { nivel: 1, nome: 'Calouro', pontosMin: 0, icone: '📘' },
  { nivel: 2, nome: 'Estudante', pontosMin: 100, icone: '📗' },
  { nivel: 3, nome: 'Aplicado', pontosMin: 300, icone: '📙' },
  { nivel: 4, nome: 'Dedicado', pontosMin: 600, icone: '📕' },
  { nivel: 5, nome: 'Focado', pontosMin: 1000, icone: '📒' },
  { nivel: 6, nome: 'Persistente', pontosMin: 1500, icone: '🔵' },
  { nivel: 7, nome: 'Determinado', pontosMin: 2200, icone: '🟢' },
  { nivel: 8, nome: 'Expert', pontosMin: 3000, icone: '🟡' },
  { nivel: 9, nome: 'Mestre', pontosMin: 4000, icone: '🟠' },
  { nivel: 10, nome: 'Lenda', pontosMin: 5500, icone: '🔴' },
  { nivel: 11, nome: 'Elite', pontosMin: 7500, icone: '🟣' },
  { nivel: 12, nome: 'Transcendente', pontosMin: 10000, icone: '⭐' },
  { nivel: 13, nome: 'Iluminado', pontosMin: 15000, icone: '💫' },
  { nivel: 14, nome: 'Supremo', pontosMin: 25000, icone: '🌟' },
  { nivel: 15, nome: 'ENEM Master', pontosMin: 50000, icone: '👑' },
];

// ============================================
// PONTOS POR AÇÃO
// ============================================

export const PONTOS = {
  // Simulados
  completarSimulado: 50,
  acertoPorQuestao: 5,
  bonusNotaAlta: 100,       // 80%+
  bonusNotaExcelente: 200,  // 90%+
  bonusNotaPerfeita: 500,   // 100%

  // Streak
  streakDiario: 10,

  // Badges (definido em badges.ts)
};

// ============================================
// FUNÇÕES
// ============================================

/**
 * Calcula nível baseado em pontos
 */
export function calcularNivel(pontos: number): NivelConfig {
  let nivelAtual = NIVEIS[0];

  for (const nivel of NIVEIS) {
    if (pontos >= nivel.pontosMin) {
      nivelAtual = nivel;
    } else {
      break;
    }
  }

  return nivelAtual;
}

/**
 * Calcula progresso para próximo nível
 */
export function calcularProgressoNivel(pontos: number): {
  nivelAtual: NivelConfig;
  proximoNivel: NivelConfig | null;
  pontosParaProximo: number;
  progresso: number; // 0-100
} {
  const nivelAtual = calcularNivel(pontos);
  const indexAtual = NIVEIS.findIndex(n => n.nivel === nivelAtual.nivel);
  const proximoNivel = indexAtual < NIVEIS.length - 1 ? NIVEIS[indexAtual + 1] : null;

  if (!proximoNivel) {
    return {
      nivelAtual,
      proximoNivel: null,
      pontosParaProximo: 0,
      progresso: 100,
    };
  }

  const pontosNivelAtual = pontos - nivelAtual.pontosMin;
  const pontosNecessarios = proximoNivel.pontosMin - nivelAtual.pontosMin;
  const progresso = Math.min(100, (pontosNivelAtual / pontosNecessarios) * 100);

  return {
    nivelAtual,
    proximoNivel,
    pontosParaProximo: proximoNivel.pontosMin - pontos,
    progresso,
  };
}

/**
 * Cria ou atualiza UserScore
 */
export async function ensureUserScore(
  prisma: PrismaClient,
  usuarioId: string
) {
  let score = await prisma.userScore.findUnique({
    where: { usuarioId }
  });

  if (!score) {
    score = await prisma.userScore.create({
      data: { usuarioId }
    });
  }

  return score;
}

/**
 * Adiciona pontos ao usuário
 */
export async function addPoints(
  prisma: PrismaClient,
  usuarioId: string,
  pontos: number,
  eventType: string,
  metadata?: Record<string, unknown>
): Promise<{ totalPoints: number; levelUp: boolean; newLevel: NivelConfig | null }> {
  // Garantir que UserScore existe
  await ensureUserScore(prisma, usuarioId);

  // Buscar pontos atuais
  const score = await prisma.userScore.findUnique({
    where: { usuarioId }
  });

  const pontosAntigos = score?.totalPoints || 0;
  const nivelAntigo = calcularNivel(pontosAntigos);

  // Registrar evento
  await prisma.gamificationEvent.create({
    data: {
      usuarioId,
      eventType,
      points: pontos,
      metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
    }
  });

  // Atualizar pontos
  const updated = await prisma.userScore.update({
    where: { usuarioId },
    data: {
      totalPoints: { increment: pontos },
    }
  });

  // Calcular novo nível
  const novoNivel = calcularNivel(updated.totalPoints);
  const levelUp = novoNivel.nivel > nivelAntigo.nivel;

  // Atualizar nível no Usuario também
  if (levelUp) {
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        nivel: novoNivel.nome,
        pontosFP: updated.totalPoints,
      }
    });
  } else {
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: { pontosFP: updated.totalPoints }
    });
  }

  return {
    totalPoints: updated.totalPoints,
    levelUp,
    newLevel: levelUp ? novoNivel : null,
  };
}

/**
 * Atualiza estatísticas após completar simulado
 */
export async function updateSimuladoStats(
  prisma: PrismaClient,
  usuarioId: string,
  acertos: number,
  total: number,
  nota: number,
  disciplina?: string
): Promise<{ pontosGanhos: number; levelUp: boolean }> {
  await ensureUserScore(prisma, usuarioId);

  // Calcular pontos
  let pontosGanhos = PONTOS.completarSimulado;
  pontosGanhos += acertos * PONTOS.acertoPorQuestao;

  if (nota >= 100) {
    pontosGanhos += PONTOS.bonusNotaPerfeita;
  } else if (nota >= 90) {
    pontosGanhos += PONTOS.bonusNotaExcelente;
  } else if (nota >= 80) {
    pontosGanhos += PONTOS.bonusNotaAlta;
  }

  // Identificar área de conhecimento
  const area = mapDisciplinaToArea(disciplina || '');

  // Atualizar stats por área
  const areaUpdate: Record<string, number> = {};
  if (area === 'matematica') {
    areaUpdate.acertosMatematica = acertos;
    areaUpdate.totalMatematica = total;
  } else if (area === 'linguagens') {
    areaUpdate.acertosLinguagens = acertos;
    areaUpdate.totalLinguagens = total;
  } else if (area === 'humanas') {
    areaUpdate.acertosHumanas = acertos;
    areaUpdate.totalHumanas = total;
  } else if (area === 'natureza') {
    areaUpdate.acertosNatureza = acertos;
    areaUpdate.totalNatureza = total;
  }

  // Buscar score atual para calcular nova média
  const currentScore = await prisma.userScore.findUnique({
    where: { usuarioId }
  });

  const simuladosAnteriores = currentScore?.simuladosTotal || 0;
  const somaNotasAnteriores = (currentScore?.mediaNotas || 0) * simuladosAnteriores;
  const novaMedia = (somaNotasAnteriores + nota) / (simuladosAnteriores + 1);
  const novaMelhorNota = Math.max(currentScore?.melhorNota || 0, nota);

  // Atualizar score
  await prisma.userScore.update({
    where: { usuarioId },
    data: {
      simuladosTotal: { increment: 1 },
      simuladosSemana: { increment: 1 },
      mediaNotas: novaMedia,
      melhorNota: novaMelhorNota,
      ...(area === 'matematica' && {
        acertosMatematica: { increment: acertos },
        totalMatematica: { increment: total },
      }),
      ...(area === 'linguagens' && {
        acertosLinguagens: { increment: acertos },
        totalLinguagens: { increment: total },
      }),
      ...(area === 'humanas' && {
        acertosHumanas: { increment: acertos },
        totalHumanas: { increment: total },
      }),
      ...(area === 'natureza' && {
        acertosNatureza: { increment: acertos },
        totalNatureza: { increment: total },
      }),
    }
  });

  // Adicionar pontos
  const result = await addPoints(
    prisma,
    usuarioId,
    pontosGanhos,
    'simulado_completo',
    { acertos, total, nota, disciplina }
  );

  return {
    pontosGanhos,
    levelUp: result.levelUp,
  };
}

/**
 * Mapeia disciplina para área de conhecimento
 */
function mapDisciplinaToArea(disciplina: string): string {
  const d = disciplina.toLowerCase();

  if (d.includes('matemat') || d.includes('math')) {
    return 'matematica';
  }
  if (d.includes('portu') || d.includes('lingu') || d.includes('liter') || d.includes('ingles') || d.includes('espanhol')) {
    return 'linguagens';
  }
  if (d.includes('histor') || d.includes('geograf') || d.includes('socio') || d.includes('filoso')) {
    return 'humanas';
  }
  if (d.includes('fisic') || d.includes('quimic') || d.includes('biolog') || d.includes('cienc')) {
    return 'natureza';
  }

  return 'geral';
}

/**
 * Obtém resumo completo do score do usuário
 */
export async function getScoreSummary(
  prisma: PrismaClient,
  usuarioId: string
) {
  const score = await ensureUserScore(prisma, usuarioId);
  const progressoNivel = calcularProgressoNivel(score.totalPoints);

  return {
    totalPoints: score.totalPoints,
    ...progressoNivel,
    stats: {
      simuladosTotal: score.simuladosTotal,
      simuladosSemana: score.simuladosSemana,
      mediaNotas: Math.round(score.mediaNotas * 10) / 10,
      melhorNota: score.melhorNota,
    },
    porArea: {
      matematica: {
        acertos: score.acertosMatematica,
        total: score.totalMatematica,
        percentual: score.totalMatematica > 0
          ? Math.round((score.acertosMatematica / score.totalMatematica) * 100)
          : 0,
      },
      linguagens: {
        acertos: score.acertosLinguagens,
        total: score.totalLinguagens,
        percentual: score.totalLinguagens > 0
          ? Math.round((score.acertosLinguagens / score.totalLinguagens) * 100)
          : 0,
      },
      humanas: {
        acertos: score.acertosHumanas,
        total: score.totalHumanas,
        percentual: score.totalHumanas > 0
          ? Math.round((score.acertosHumanas / score.totalHumanas) * 100)
          : 0,
      },
      natureza: {
        acertos: score.acertosNatureza,
        total: score.totalNatureza,
        percentual: score.totalNatureza > 0
          ? Math.round((score.acertosNatureza / score.totalNatureza) * 100)
          : 0,
      },
    },
  };
}

/**
 * Obtém ranking geral
 */
export async function getLeaderboard(
  prisma: PrismaClient,
  limit: number = 10
) {
  const scores = await prisma.userScore.findMany({
    take: limit,
    orderBy: { totalPoints: 'desc' },
    include: {
      usuario: {
        select: { id: true, nome: true, nivel: true }
      }
    }
  });

  return scores.map((s, index) => ({
    posicao: index + 1,
    usuarioId: s.usuarioId,
    nome: s.usuario.nome || 'Anônimo',
    totalPoints: s.totalPoints,
    nivel: calcularNivel(s.totalPoints),
    simulados: s.simuladosTotal,
    mediaNotas: Math.round(s.mediaNotas * 10) / 10,
  }));
}

/**
 * Reset semanal de simuladosSemana (para cron)
 */
export async function resetWeeklyStats(prisma: PrismaClient) {
  await prisma.userScore.updateMany({
    data: { simuladosSemana: 0 }
  });
}
