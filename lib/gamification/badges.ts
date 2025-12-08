/**
 * Sistema de Badges/Conquistas ENEM-PRO
 * Inspirado no NutriFitCoach
 */

import { PrismaClient } from '@prisma/client';

// ============================================
// DEFINIÇÕES DE BADGES
// ============================================

export interface BadgeDefinition {
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
  categoria: 'simulados' | 'acertos' | 'streaks' | 'areas' | 'especial' | 'social';
  pontos: number;
  ordem: number;
  criterio: (stats: UserStats) => boolean;
}

export interface UserStats {
  simuladosTotal: number;
  acertosTotal: number;
  questoesTotal: number;
  mediaNotas: number;
  melhorNota: number;
  streakAtual: number;
  streakMaximo: number;
  // Por área
  acertosMatematica: number;
  totalMatematica: number;
  acertosLinguagens: number;
  totalLinguagens: number;
  acertosHumanas: number;
  totalHumanas: number;
  acertosNatureza: number;
  totalNatureza: number;
  // Extras
  diasEstudando: number;
  notaMaxima100: boolean;
}

// Badges disponíveis no sistema
export const BADGES: BadgeDefinition[] = [
  // === SIMULADOS ===
  {
    codigo: 'primeiro_simulado',
    nome: 'Primeira Batalha',
    descricao: 'Complete seu primeiro simulado',
    icone: '🎯',
    categoria: 'simulados',
    pontos: 50,
    ordem: 1,
    criterio: (s) => s.simuladosTotal >= 1,
  },
  {
    codigo: 'simulados_5',
    nome: 'Guerreiro',
    descricao: 'Complete 5 simulados',
    icone: '⚔️',
    categoria: 'simulados',
    pontos: 100,
    ordem: 2,
    criterio: (s) => s.simuladosTotal >= 5,
  },
  {
    codigo: 'simulados_10',
    nome: 'Veterano',
    descricao: 'Complete 10 simulados',
    icone: '🛡️',
    categoria: 'simulados',
    pontos: 75, // Economia v2.0
    ordem: 3,
    criterio: (s) => s.simuladosTotal >= 10,
  },
  {
    codigo: 'simulados_25',
    nome: 'Mestre dos Simulados',
    descricao: 'Complete 25 simulados',
    icone: '👑',
    categoria: 'simulados',
    pontos: 150, // Economia v2.0
    ordem: 4,
    criterio: (s) => s.simuladosTotal >= 25,
  },
  {
    codigo: 'simulados_50',
    nome: 'Lenda',
    descricao: 'Complete 50 simulados',
    icone: '🏆',
    categoria: 'simulados',
    pontos: 300, // Economia v2.0
    ordem: 5,
    criterio: (s) => s.simuladosTotal >= 50,
  },
  {
    codigo: 'simulados_100',
    nome: 'Transcendente',
    descricao: 'Complete 100 simulados',
    icone: '💎',
    categoria: 'simulados',
    pontos: 500, // Economia v2.0
    ordem: 6,
    criterio: (s) => s.simuladosTotal >= 100,
  },

  // === ACERTOS / PERFORMANCE ===
  {
    codigo: 'acertos_50',
    nome: 'Boas Respostas',
    descricao: 'Acerte 50 questões no total',
    icone: '✅',
    categoria: 'acertos',
    pontos: 50,
    ordem: 10,
    criterio: (s) => s.acertosTotal >= 50,
  },
  {
    codigo: 'acertos_200',
    nome: 'Mente Afiada',
    descricao: 'Acerte 200 questões no total',
    icone: '🧠',
    categoria: 'acertos',
    pontos: 150,
    ordem: 11,
    criterio: (s) => s.acertosTotal >= 200,
  },
  {
    codigo: 'acertos_500',
    nome: 'Intelecto Superior',
    descricao: 'Acerte 500 questões no total',
    icone: '💡',
    categoria: 'acertos',
    pontos: 300,
    ordem: 12,
    criterio: (s) => s.acertosTotal >= 500,
  },
  {
    codigo: 'acertos_1000',
    nome: 'Gênio',
    descricao: 'Acerte 1000 questões no total',
    icone: '🌟',
    categoria: 'acertos',
    pontos: 150, // Economia v2.0
    ordem: 13,
    criterio: (s) => s.acertosTotal >= 1000,
  },
  {
    codigo: 'nota_90',
    nome: 'Excelência',
    descricao: 'Tire 90% ou mais em um simulado',
    icone: '📈',
    categoria: 'acertos',
    pontos: 75, // Economia v2.0
    ordem: 14,
    criterio: (s) => s.melhorNota >= 90,
  },
  {
    codigo: 'nota_100',
    nome: 'Perfeição',
    descricao: 'Tire 100% em um simulado',
    icone: '💯',
    categoria: 'acertos',
    pontos: 150, // Economia v2.0
    ordem: 15,
    criterio: (s) => s.notaMaxima100,
  },

  // === STREAKS ===
  {
    codigo: 'streak_3',
    nome: 'Consistente',
    descricao: 'Estude 3 dias seguidos',
    icone: '🔥',
    categoria: 'streaks',
    pontos: 75,
    ordem: 20,
    criterio: (s) => s.streakMaximo >= 3,
  },
  {
    codigo: 'streak_7',
    nome: 'Dedicado',
    descricao: 'Estude 7 dias seguidos',
    icone: '🔥🔥',
    categoria: 'streaks',
    pontos: 150,
    ordem: 21,
    criterio: (s) => s.streakMaximo >= 7,
  },
  {
    codigo: 'streak_14',
    nome: 'Disciplinado',
    descricao: 'Estude 14 dias seguidos',
    icone: '⚡',
    categoria: 'streaks',
    pontos: 300,
    ordem: 22,
    criterio: (s) => s.streakMaximo >= 14,
  },
  {
    codigo: 'streak_30',
    nome: 'Imparável',
    descricao: 'Estude 30 dias seguidos',
    icone: '💪',
    categoria: 'streaks',
    pontos: 200, // Economia v2.0
    ordem: 23,
    criterio: (s) => s.streakMaximo >= 30,
  },
  {
    codigo: 'streak_60',
    nome: 'Máquina',
    descricao: 'Estude 60 dias seguidos',
    icone: '🤖',
    categoria: 'streaks',
    pontos: 400, // Economia v2.0
    ordem: 24,
    criterio: (s) => s.streakMaximo >= 60,
  },

  // === ÁREAS DE CONHECIMENTO ===
  {
    codigo: 'matematica_expert',
    nome: 'Matemático',
    descricao: 'Acerte 80%+ em 20 questões de Matemática',
    icone: '📐',
    categoria: 'areas',
    pontos: 75, // Economia v2.0
    ordem: 30,
    criterio: (s) => s.totalMatematica >= 20 && (s.acertosMatematica / s.totalMatematica) >= 0.8,
  },
  {
    codigo: 'linguagens_expert',
    nome: 'Linguista',
    descricao: 'Acerte 80%+ em 20 questões de Linguagens',
    icone: '📚',
    categoria: 'areas',
    pontos: 75, // Economia v2.0
    ordem: 31,
    criterio: (s) => s.totalLinguagens >= 20 && (s.acertosLinguagens / s.totalLinguagens) >= 0.8,
  },
  {
    codigo: 'humanas_expert',
    nome: 'Humanista',
    descricao: 'Acerte 80%+ em 20 questões de Humanas',
    icone: '🌍',
    categoria: 'areas',
    pontos: 75, // Economia v2.0
    ordem: 32,
    criterio: (s) => s.totalHumanas >= 20 && (s.acertosHumanas / s.totalHumanas) >= 0.8,
  },
  {
    codigo: 'natureza_expert',
    nome: 'Cientista',
    descricao: 'Acerte 80%+ em 20 questões de Natureza',
    icone: '🔬',
    categoria: 'areas',
    pontos: 75, // Economia v2.0
    ordem: 33,
    criterio: (s) => s.totalNatureza >= 20 && (s.acertosNatureza / s.totalNatureza) >= 0.8,
  },
  {
    codigo: 'completo',
    nome: 'Completo',
    descricao: 'Seja expert em todas as 4 áreas',
    icone: '🎓',
    categoria: 'areas',
    pontos: 300, // Economia v2.0
    ordem: 34,
    criterio: (s) => {
      const matOk = s.totalMatematica >= 20 && (s.acertosMatematica / s.totalMatematica) >= 0.8;
      const lingOk = s.totalLinguagens >= 20 && (s.acertosLinguagens / s.totalLinguagens) >= 0.8;
      const humOk = s.totalHumanas >= 20 && (s.acertosHumanas / s.totalHumanas) >= 0.8;
      const natOk = s.totalNatureza >= 20 && (s.acertosNatureza / s.totalNatureza) >= 0.8;
      return matOk && lingOk && humOk && natOk;
    },
  },

  // === ESPECIAIS ===
  {
    codigo: 'early_adopter',
    nome: 'Early Adopter',
    descricao: 'Começou a usar o ENEM-PRO cedo',
    icone: '🚀',
    categoria: 'especial',
    pontos: 100,
    ordem: 40,
    criterio: () => false, // Concedido manualmente
  },
  {
    codigo: 'madrugador',
    nome: 'Madrugador',
    descricao: 'Complete um simulado entre 5h e 7h',
    icone: '🌅',
    categoria: 'especial',
    pontos: 50,
    ordem: 41,
    criterio: () => false, // Verificado por horário
  },
  {
    codigo: 'noturno',
    nome: 'Coruja',
    descricao: 'Complete um simulado entre 23h e 2h',
    icone: '🦉',
    categoria: 'especial',
    pontos: 50,
    ordem: 42,
    criterio: () => false, // Verificado por horário
  },

  // === SOCIAL / COMPARTILHAMENTO ===
  {
    codigo: 'primeiro_share',
    nome: 'Social Starter',
    descricao: 'Compartilhe sua primeira conquista',
    icone: '📢',
    categoria: 'social',
    pontos: 25,
    ordem: 50,
    criterio: () => false, // Verificado na API de share
  },
  {
    codigo: 'social_starter',
    nome: 'Streamer ENEM PRO',
    descricao: 'Compartilhe 10 conquistas nas redes',
    icone: '📲',
    categoria: 'social',
    pontos: 100,
    ordem: 51,
    criterio: () => false, // Verificado na API de share
  },
  {
    codigo: 'influencer_enem',
    nome: 'Influencer do ENEM',
    descricao: 'Compartilhe 50 conquistas nas redes',
    icone: '🌟',
    categoria: 'social',
    pontos: 300,
    ordem: 52,
    criterio: () => false, // Verificado na API de share
  },
  {
    codigo: 'viral_master',
    nome: 'Viral Master',
    descricao: 'Compartilhe 100 conquistas nas redes',
    icone: '🔥',
    categoria: 'social',
    pontos: 150, // Economia v2.0
    ordem: 53,
    criterio: () => false, // Verificado na API de share
  },
  {
    codigo: 'recrutador_bronze',
    nome: 'Recrutador Bronze',
    descricao: 'Convide 5 amigos para o ENEM PRO',
    icone: '👥',
    categoria: 'social',
    pontos: 150,
    ordem: 54,
    criterio: () => false, // Verificado na API de convites
  },
  {
    codigo: 'recrutador_prata',
    nome: 'Recrutador Prata',
    descricao: 'Convide 15 amigos para o ENEM PRO',
    icone: '👥',
    categoria: 'social',
    pontos: 400,
    ordem: 55,
    criterio: () => false, // Verificado na API de convites
  },
  {
    codigo: 'recrutador_ouro',
    nome: 'Recrutador Ouro',
    descricao: 'Convide 30 amigos para o ENEM PRO',
    icone: '👥',
    categoria: 'social',
    pontos: 300, // Economia v2.0
    ordem: 56,
    criterio: () => false, // Verificado na API de convites
  },
  {
    codigo: 'campeao_live',
    nome: 'Campeão da Live',
    descricao: 'Fique no Top 10 de uma transmissão ao vivo',
    icone: '🏆',
    categoria: 'social',
    pontos: 250,
    ordem: 57,
    criterio: () => false, // Verificado no sistema de lives
  },
  {
    codigo: 'batalha_master',
    nome: 'Matador de Prova',
    descricao: 'Vença 5 batalhas 1v1 consecutivas',
    icone: '⚔️',
    categoria: 'social',
    pontos: 350,
    ordem: 58,
    criterio: () => false, // Verificado no sistema de batalhas
  },
];

// ============================================
// FUNÇÕES DE VERIFICAÇÃO
// ============================================

/**
 * Busca stats do usuário para verificação de badges
 */
export async function getUserStats(prisma: PrismaClient, usuarioId: string): Promise<UserStats> {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    include: {
      score: true,
      simulados: {
        where: { status: 'finalizado' },
        select: { nota: true, acertos: true, total: true }
      }
    }
  });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const score = usuario.score;
  const simulados = usuario.simulados;

  // Calcular acertos totais
  const acertosTotal = simulados.reduce((acc, s) => acc + (s.acertos || 0), 0);
  const questoesTotal = simulados.reduce((acc, s) => acc + (s.total || 0), 0);

  // Verificar se teve nota 100
  const notaMaxima100 = simulados.some(s => s.nota === 100);

  return {
    simuladosTotal: score?.simuladosTotal || simulados.length,
    acertosTotal,
    questoesTotal,
    mediaNotas: score?.mediaNotas || 0,
    melhorNota: score?.melhorNota || 0,
    streakAtual: usuario.streakAtual,
    streakMaximo: usuario.streakMaximo,
    acertosMatematica: score?.acertosMatematica || 0,
    totalMatematica: score?.totalMatematica || 0,
    acertosLinguagens: score?.acertosLinguagens || 0,
    totalLinguagens: score?.totalLinguagens || 0,
    acertosHumanas: score?.acertosHumanas || 0,
    totalHumanas: score?.totalHumanas || 0,
    acertosNatureza: score?.acertosNatureza || 0,
    totalNatureza: score?.totalNatureza || 0,
    diasEstudando: 0, // Calcular depois
    notaMaxima100,
  };
}

/**
 * Verifica e desbloqueia badges para um usuário
 */
export async function checkAndUnlockBadges(
  prisma: PrismaClient,
  usuarioId: string
): Promise<{ newBadges: string[]; totalPoints: number }> {
  const stats = await getUserStats(prisma, usuarioId);

  // Buscar badges já desbloqueados
  const userBadges = await prisma.userBadge.findMany({
    where: { usuarioId },
    select: { badge: { select: { codigo: true } } }
  });

  const unlockedCodes = new Set(userBadges.map(ub => ub.badge.codigo));

  const newBadges: string[] = [];
  let totalPoints = 0;

  // Verificar cada badge
  for (const badge of BADGES) {
    if (unlockedCodes.has(badge.codigo)) continue;

    if (badge.criterio(stats)) {
      // Buscar ou criar badge no banco
      let dbBadge = await prisma.badge.findUnique({
        where: { codigo: badge.codigo }
      });

      if (!dbBadge) {
        dbBadge = await prisma.badge.create({
          data: {
            codigo: badge.codigo,
            nome: badge.nome,
            descricao: badge.descricao,
            icone: badge.icone,
            categoria: badge.categoria,
            pontos: badge.pontos,
            ordem: badge.ordem,
          }
        });
      }

      // Desbloquear para o usuário
      await prisma.userBadge.create({
        data: {
          usuarioId,
          badgeId: dbBadge.id
        }
      });

      newBadges.push(badge.codigo);
      totalPoints += badge.pontos;
    }
  }

  return { newBadges, totalPoints };
}

/**
 * Lista todos os badges com status para um usuário
 */
export async function listBadgesWithStatus(
  prisma: PrismaClient,
  usuarioId: string
) {
  const userBadges = await prisma.userBadge.findMany({
    where: { usuarioId },
    include: { badge: true }
  });

  const unlockedMap = new Map(
    userBadges.map(ub => [ub.badge.codigo, ub.unlockedAt])
  );

  return BADGES.map(badge => ({
    ...badge,
    unlocked: unlockedMap.has(badge.codigo),
    unlockedAt: unlockedMap.get(badge.codigo) || null
  })).sort((a, b) => a.ordem - b.ordem);
}

/**
 * Concede badge especial manualmente
 */
export async function grantSpecialBadge(
  prisma: PrismaClient,
  usuarioId: string,
  codigo: string
): Promise<boolean> {
  const badge = BADGES.find(b => b.codigo === codigo);
  if (!badge) return false;

  let dbBadge = await prisma.badge.findUnique({
    where: { codigo }
  });

  if (!dbBadge) {
    dbBadge = await prisma.badge.create({
      data: {
        codigo: badge.codigo,
        nome: badge.nome,
        descricao: badge.descricao,
        icone: badge.icone,
        categoria: badge.categoria,
        pontos: badge.pontos,
        ordem: badge.ordem,
      }
    });
  }

  // Verificar se já tem
  const existing = await prisma.userBadge.findUnique({
    where: {
      usuarioId_badgeId: {
        usuarioId,
        badgeId: dbBadge.id
      }
    }
  });

  if (existing) return false;

  await prisma.userBadge.create({
    data: {
      usuarioId,
      badgeId: dbBadge.id
    }
  });

  return true;
}
