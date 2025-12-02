import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStreakInfo } from '@/lib/gamification';

/**
 * GET /api/gamification/streak
 * Retorna informações do streak do usuário
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');

    if (!usuarioId) {
      return NextResponse.json(
        { error: 'usuarioId é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const streakInfo = await getStreakInfo(prisma, usuarioId);

    return NextResponse.json({
      ...streakInfo,
      mensagem: getMensagemStreak(streakInfo.streakAtual, streakInfo.streakEmRisco),
    });
  } catch (error) {
    console.error('Erro ao buscar streak:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}

function getMensagemStreak(streak: number, emRisco: boolean): string {
  if (streak === 0) {
    return 'Comece sua sequência de estudos hoje!';
  }

  if (emRisco) {
    return `Atenção! Sua sequência de ${streak} dias está em risco!`;
  }

  if (streak === 1) {
    return 'Ótimo começo! Continue amanhã para manter a sequência.';
  }

  if (streak < 7) {
    return `${streak} dias seguidos! Continue assim!`;
  }

  if (streak < 14) {
    return `Incrível! ${streak} dias de sequência! Você está pegando o ritmo!`;
  }

  if (streak < 30) {
    return `Impressionante! ${streak} dias! Você é muito dedicado!`;
  }

  return `LENDÁRIO! ${streak} dias de sequência! Você é imparável!`;
}
