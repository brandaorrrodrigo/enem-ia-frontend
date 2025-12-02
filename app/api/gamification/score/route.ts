import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getScoreSummary, NIVEIS } from '@/lib/gamification';

/**
 * GET /api/gamification/score
 * Retorna resumo completo do score do usuário
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
      where: { id: usuarioId },
      select: {
        id: true,
        nome: true,
        nivel: true,
        streakAtual: true,
        streakMaximo: true,
      }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Buscar resumo completo
    const summary = await getScoreSummary(prisma, usuarioId);

    // Buscar badges desbloqueados
    const badgesCount = await prisma.userBadge.count({
      where: { usuarioId }
    });

    return NextResponse.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        nivel: usuario.nivel,
      },
      score: summary,
      streak: {
        atual: usuario.streakAtual,
        maximo: usuario.streakMaximo,
      },
      badges: {
        desbloqueados: badgesCount,
      },
      niveis: NIVEIS, // Para exibir progressão
    });
  } catch (error) {
    console.error('Erro ao buscar score:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
