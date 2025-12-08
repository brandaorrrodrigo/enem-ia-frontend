import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'>;

/**
 * POST /api/enem/challenges/progresso
 * Atualiza o progresso do usuário no desafio semanal
 *
 * Body:
 * {
 *   usuarioId: string,
 *   challengeId: string,
 *   simuladosFeitos?: number,  // incremento de simulados
 *   fpGanhos?: number          // incremento de FP
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuarioId, challengeId, simuladosFeitos = 0, fpGanhos = 0 } = body;

    if (!usuarioId || !challengeId) {
      return NextResponse.json(
        {
          success: false,
          error: 'usuarioId e challengeId são obrigatórios'
        },
        { status: 400 }
      );
    }

    // Buscar desafio
    const desafio = await prisma.weeklyChallenge.findUnique({
      where: { id: challengeId }
    });

    if (!desafio) {
      return NextResponse.json(
        {
          success: false,
          error: 'Desafio não encontrado'
        },
        { status: 404 }
      );
    }

    if (!desafio.ativo) {
      return NextResponse.json(
        {
          success: false,
          error: 'Este desafio não está mais ativo'
        },
        { status: 400 }
      );
    }

    // Buscar ou criar progresso
    let progresso = await prisma.userWeeklyProgress.findUnique({
      where: {
        usuarioId_challengeId: {
          usuarioId,
          challengeId
        }
      }
    });

    if (!progresso) {
      progresso = await prisma.userWeeklyProgress.create({
        data: {
          usuarioId,
          challengeId,
          simuladosFeitos: 0,
          fpGanhos: 0,
          concluido: false
        }
      });
    }

    // Se já concluído, não atualizar
    if (progresso.concluido) {
      return NextResponse.json({
        success: true,
        message: 'Desafio já concluído anteriormente',
        progresso,
        jaConcluido: true
      });
    }

    // Atualizar progresso
    const novoSimulados = progresso.simuladosFeitos + simuladosFeitos;
    const novoFP = progresso.fpGanhos + fpGanhos;

    // Verificar se completou o desafio
    const completou = novoSimulados >= desafio.metaSimulados && novoFP >= desafio.metaFP;

    // Atualizar progresso (e se completou, fazer transação para dar recompensa)
    let resultado;
    if (completou) {
      resultado = await prisma.$transaction(async (tx: TransactionClient) => {
        // 1. Marcar desafio como concluído
        const progressoAtualizado = await tx.userWeeklyProgress.update({
          where: {
            usuarioId_challengeId: {
              usuarioId,
              challengeId
            }
          },
          data: {
            simuladosFeitos: novoSimulados,
            fpGanhos: novoFP,
            concluido: true,
            dataConclusao: new Date()
          }
        });

        // 2. Conceder recompensa de FP
        const usuarioAtualizado = await tx.usuario.update({
          where: { id: usuarioId },
          data: {
            pontosFP: {
              increment: desafio.recompensaFP
            }
          }
        });

        return { progressoAtualizado, usuarioAtualizado };
      });

      return NextResponse.json({
        success: true,
        message: `Parabéns! Você completou o desafio e ganhou ${desafio.recompensaFP} FP!`,
        progresso: resultado.progressoAtualizado,
        recompensa: desafio.recompensaFP,
        fpTotal: resultado.usuarioAtualizado.pontosFP,
        completou: true
      });
    } else {
      // Apenas atualizar progresso
      const progressoAtualizado = await prisma.userWeeklyProgress.update({
        where: {
          usuarioId_challengeId: {
            usuarioId,
            challengeId
          }
        },
        data: {
          simuladosFeitos: novoSimulados,
          fpGanhos: novoFP
        }
      });

      // Calcular percentual
      const percSimulados = (novoSimulados / desafio.metaSimulados) * 100;
      const percFP = (novoFP / desafio.metaFP) * 100;
      const percentualConclusao = Math.min(Math.min(percSimulados, percFP), 100);

      return NextResponse.json({
        success: true,
        message: 'Progresso atualizado',
        progresso: progressoAtualizado,
        percentualConclusao: Math.round(percentualConclusao),
        faltaSimulados: Math.max(0, desafio.metaSimulados - novoSimulados),
        faltaFP: Math.max(0, desafio.metaFP - novoFP),
        completou: false
      });
    }

  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao atualizar progresso do desafio'
      },
      { status: 500 }
    );
  }
}
