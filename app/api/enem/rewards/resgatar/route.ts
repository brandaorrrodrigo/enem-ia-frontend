import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * POST /api/enem/rewards/resgatar
 * Resgata uma recompensa (troca FP por recompensa)
 *
 * Body:
 * {
 *   usuarioId: string,
 *   rewardId: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuarioId, rewardId } = body;

    if (!usuarioId || !rewardId) {
      return NextResponse.json(
        {
          success: false,
          error: 'usuarioId e rewardId são obrigatórios'
        },
        { status: 400 }
      );
    }

    // Buscar usuário e recompensa em paralelo
    const [usuario, reward] = await Promise.all([
      prisma.usuario.findUnique({
        where: { id: usuarioId }
      }),
      prisma.reward.findUnique({
        where: { id: rewardId }
      })
    ]);

    // Validações
    if (!usuario) {
      return NextResponse.json(
        {
          success: false,
          error: 'Usuário não encontrado'
        },
        { status: 404 }
      );
    }

    if (!reward) {
      return NextResponse.json(
        {
          success: false,
          error: 'Recompensa não encontrada'
        },
        { status: 404 }
      );
    }

    if (!reward.ativo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Esta recompensa não está mais disponível'
        },
        { status: 400 }
      );
    }

    // Verificar se o usuário tem FP suficiente
    if (usuario.pontosFP < reward.custoFP) {
      return NextResponse.json(
        {
          success: false,
          error: 'FP insuficientes',
          fpNecessario: reward.custoFP,
          fpAtual: usuario.pontosFP,
          falta: reward.custoFP - usuario.pontosFP
        },
        { status: 400 }
      );
    }

    // Se a recompensa é única, verificar se já foi resgatada
    if (reward.unico) {
      const jaResgatado = await prisma.userReward.findFirst({
        where: {
          usuarioId,
          rewardId
        }
      });

      if (jaResgatado) {
        return NextResponse.json(
          {
            success: false,
            error: 'Você já resgatou esta recompensa única'
          },
          { status: 400 }
        );
      }
    }

    // Realizar o resgate (transação)
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Deduzir FP do usuário
      const usuarioAtualizado = await tx.usuario.update({
        where: { id: usuarioId },
        data: {
          pontosFP: {
            decrement: reward.custoFP
          }
        }
      });

      // 2. Criar registro de resgate
      const resgate = await tx.userReward.create({
        data: {
          usuarioId,
          rewardId
        },
        include: {
          reward: true
        }
      });

      return { usuarioAtualizado, resgate };
    });

    return NextResponse.json({
      success: true,
      message: 'Recompensa resgatada com sucesso!',
      resgate: resultado.resgate,
      fpRestante: resultado.usuarioAtualizado.pontosFP
    });

  } catch (error) {
    console.error('Erro ao resgatar recompensa:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao resgatar recompensa'
      },
      { status: 500 }
    );
  }
}
