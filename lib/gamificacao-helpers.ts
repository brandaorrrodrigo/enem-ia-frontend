/**
 * Funções auxiliares para o sistema de gamificação
 * ENEM-IA - Sistema de Recompensas e Desafios
 */

import prisma from '@/lib/prisma';

// ===========================
// FUNÇÕES DE SEMANA ISO
// ===========================

/**
 * Retorna a semana ISO no formato "YYYY-Www"
 * Ex: "2025-W46"
 */
export function getISOWeek(date: Date = new Date()): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

/**
 * Converte string de semana ISO para Date (início da semana)
 */
export function isoWeekToDate(isoWeek: string): Date {
  const [year, week] = isoWeek.split('-W').map(Number);
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

// ===========================
// CÁLCULO DE FP E NÍVEIS
// ===========================

/**
 * Calcula FP ganhos baseado em acertos
 * Pode ser customizado conforme regras de negócio
 */
export function calcularFP(acertos: number, total: number): number {
  const percentual = (acertos / total) * 100;

  // Base: 10 FP por questão acertada
  let fp = acertos * 10;

  // Bônus por performance
  if (percentual >= 90) fp += 50;      // Excelente
  else if (percentual >= 75) fp += 30; // Muito bom
  else if (percentual >= 60) fp += 10; // Bom

  return fp;
}

/**
 * Determina o nível baseado em FP total
 */
export function calcularNivel(pontosFP: number): string {
  if (pontosFP >= 10000) return 'Diamond';
  if (pontosFP >= 5000) return 'Platinum';
  if (pontosFP >= 2000) return 'Gold';
  if (pontosFP >= 500) return 'Silver';
  return 'Bronze';
}

/**
 * Retorna informações do nível (cor, ícone, próximo nível)
 */
export function getNivelInfo(nivel: string) {
  const niveis = {
    Bronze: {
      cor: '#CD7F32',
      gradient: 'from-orange-400 to-orange-600',
      icone: '🥉',
      proximo: 'Silver',
      fpNecessario: 500,
    },
    Silver: {
      cor: '#C0C0C0',
      gradient: 'from-gray-300 to-gray-500',
      icone: '🥈',
      proximo: 'Gold',
      fpNecessario: 2000,
    },
    Gold: {
      cor: '#FFD700',
      gradient: 'from-yellow-400 to-yellow-600',
      icone: '🥇',
      proximo: 'Platinum',
      fpNecessario: 5000,
    },
    Platinum: {
      cor: '#E5E4E2',
      gradient: 'from-cyan-300 to-cyan-500',
      icone: '💎',
      proximo: 'Diamond',
      fpNecessario: 10000,
    },
    Diamond: {
      cor: '#B9F2FF',
      gradient: 'from-blue-300 to-purple-500',
      icone: '💠',
      proximo: null,
      fpNecessario: null,
    },
  };

  return niveis[nivel as keyof typeof niveis] || niveis.Bronze;
}

// ===========================
// GESTÃO DE FP
// ===========================

/**
 * Credita FP para um usuário e atualiza seu nível
 */
export async function creditarFP(usuarioId: string, fp: number, motivo?: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { pontosFP: true },
  });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const novoFP = (usuario.pontosFP || 0) + fp;
  const novoNivel = calcularNivel(novoFP);

  const atualizado = await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      pontosFP: novoFP,
      nivel: novoNivel,
    },
  });

  // Log da transação (opcional - criar tabela de logs)
  console.log(`[FP] ${motivo || 'Creditado'}: +${fp} FP para usuário ${usuarioId} (Total: ${novoFP})`);

  return {
    fpAntes: usuario.pontosFP,
    fpDepois: novoFP,
    fpCreditado: fp,
    nivel: novoNivel,
  };
}

/**
 * Deduz FP de um usuário (usado no resgate de recompensas)
 */
export async function deduzirFP(usuarioId: string, fp: number, motivo?: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { pontosFP: true },
  });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  if ((usuario.pontosFP || 0) < fp) {
    throw new Error('FP insuficientes');
  }

  const novoFP = (usuario.pontosFP || 0) - fp;
  const novoNivel = calcularNivel(novoFP);

  await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      pontosFP: novoFP,
      nivel: novoNivel,
    },
  });

  console.log(`[FP] ${motivo || 'Deduzido'}: -${fp} FP do usuário ${usuarioId} (Total: ${novoFP})`);

  return {
    fpAntes: usuario.pontosFP,
    fpDepois: novoFP,
    fpDeduzido: fp,
    nivel: novoNivel,
  };
}

// ===========================
// DESAFIOS SEMANAIS
// ===========================

/**
 * Atualiza progresso do desafio semanal após simulado
 */
export async function atualizarProgressoDesafio(
  usuarioId: string,
  simuladosIncremento: number = 1,
  fpIncremento: number = 0
) {
  const semanaAtual = getISOWeek(new Date());

  // Buscar desafio ativo da semana
  const desafio = await prisma.weeklyChallenge.findFirst({
    where: {
      semanaRef: semanaAtual,
      ativo: true,
    },
  });

  if (!desafio) {
    console.log('[Desafio] Nenhum desafio ativo para esta semana');
    return null;
  }

  // Buscar ou criar progresso
  let progresso = await prisma.userWeeklyProgress.findUnique({
    where: {
      usuarioId_challengeId: {
        usuarioId,
        challengeId: desafio.id,
      },
    },
  });

  if (!progresso) {
    progresso = await prisma.userWeeklyProgress.create({
      data: {
        usuarioId,
        challengeId: desafio.id,
        simuladosFeitos: 0,
        fpGanhos: 0,
        concluido: false,
      },
    });
  }

  // Se já concluído, não atualizar
  if (progresso.concluido) {
    console.log('[Desafio] Já concluído anteriormente');
    return progresso;
  }

  // Calcular novos valores
  const novoSimulados = progresso.simuladosFeitos + simuladosIncremento;
  const novoFP = progresso.fpGanhos + fpIncremento;

  // Verificar se completou
  const completou = novoSimulados >= desafio.metaSimulados && novoFP >= desafio.metaFP;

  if (completou) {
    // Transação: marcar como concluído e creditar FP
    const resultado = await prisma.$transaction(async (tx) => {
      const progressoAtualizado = await tx.userWeeklyProgress.update({
        where: {
          usuarioId_challengeId: {
            usuarioId,
            challengeId: desafio.id,
          },
        },
        data: {
          simuladosFeitos: novoSimulados,
          fpGanhos: novoFP,
          concluido: true,
          dataConclusao: new Date(),
        },
      });

      const usuarioAtualizado = await tx.usuario.update({
        where: { id: usuarioId },
        data: {
          pontosFP: {
            increment: desafio.recompensaFP,
          },
        },
      });

      return { progressoAtualizado, usuarioAtualizado };
    });

    console.log(`[Desafio] Concluído! +${desafio.recompensaFP} FP de recompensa`);
    return resultado.progressoAtualizado;
  } else {
    // Apenas atualizar progresso
    const progressoAtualizado = await prisma.userWeeklyProgress.update({
      where: {
        usuarioId_challengeId: {
          usuarioId,
          challengeId: desafio.id,
        },
      },
      data: {
        simuladosFeitos: novoSimulados,
        fpGanhos: novoFP,
      },
    });

    console.log(`[Desafio] Progresso: ${novoSimulados}/${desafio.metaSimulados} simulados, ${novoFP}/${desafio.metaFP} FP`);
    return progressoAtualizado;
  }
}

/**
 * Verifica se usuário completou o desafio da semana
 */
export async function verificarDesafioConcluido(usuarioId: string): Promise<boolean> {
  const semanaAtual = getISOWeek(new Date());

  const desafio = await prisma.weeklyChallenge.findFirst({
    where: {
      semanaRef: semanaAtual,
      ativo: true,
    },
  });

  if (!desafio) return false;

  const progresso = await prisma.userWeeklyProgress.findUnique({
    where: {
      usuarioId_challengeId: {
        usuarioId,
        challengeId: desafio.id,
      },
    },
  });

  return progresso?.concluido || false;
}

// ===========================
// RECOMPENSAS
// ===========================

/**
 * Verifica se usuário pode resgatar uma recompensa
 */
export async function podeResgatar(usuarioId: string, rewardId: string): Promise<{
  pode: boolean;
  motivo?: string;
}> {
  const [usuario, reward] = await Promise.all([
    prisma.usuario.findUnique({ where: { id: usuarioId } }),
    prisma.reward.findUnique({ where: { id: rewardId } }),
  ]);

  if (!usuario) return { pode: false, motivo: 'Usuário não encontrado' };
  if (!reward) return { pode: false, motivo: 'Recompensa não encontrada' };
  if (!reward.ativo) return { pode: false, motivo: 'Recompensa não está ativa' };

  if ((usuario.pontosFP || 0) < reward.custoFP) {
    return { pode: false, motivo: 'FP insuficientes' };
  }

  // Verificar se é única e já foi resgatada
  if (reward.unico) {
    const jaResgatado = await prisma.userReward.findFirst({
      where: { usuarioId, rewardId },
    });

    if (jaResgatado) {
      return { pode: false, motivo: 'Recompensa única já resgatada' };
    }
  }

  return { pode: true };
}

/**
 * Conta quantas recompensas o usuário já resgatou
 */
export async function contarResgates(usuarioId: string): Promise<number> {
  return await prisma.userReward.count({
    where: { usuarioId },
  });
}

// ===========================
// ESTATÍSTICAS
// ===========================

/**
 * Retorna estatísticas de gamificação do usuário
 */
export async function getEstatisticasGamificacao(usuarioId: string) {
  const [usuario, resgates, progressos] = await Promise.all([
    prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { pontosFP: true, nivel: true },
    }),
    prisma.userReward.count({ where: { usuarioId } }),
    prisma.userWeeklyProgress.count({
      where: { usuarioId, concluido: true },
    }),
  ]);

  const nivelInfo = getNivelInfo(usuario?.nivel || 'Bronze');

  return {
    pontosFP: usuario?.pontosFP || 0,
    nivel: usuario?.nivel || 'Bronze',
    nivelInfo,
    recompensasResgatadas: resgates,
    desafiosConcluidos: progressos,
  };
}

// ===========================
// RANKING
// ===========================

/**
 * Retorna top N usuários por FP
 */
export async function getRankingFP(limite: number = 10) {
  return await prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      pontosFP: true,
      nivel: true,
    },
    orderBy: {
      pontosFP: 'desc',
    },
    take: limite,
  });
}

/**
 * Retorna posição do usuário no ranking
 */
export async function getPosicaoRanking(usuarioId: string): Promise<number> {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { pontosFP: true },
  });

  if (!usuario) return -1;

  const maioresFP = await prisma.usuario.count({
    where: {
      pontosFP: {
        gt: usuario.pontosFP || 0,
      },
    },
  });

  return maioresFP + 1; // Posição (1-indexed)
}
