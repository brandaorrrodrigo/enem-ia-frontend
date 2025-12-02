import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Retorna o número da semana ISO (1-53) para uma data
 */
function getISOWeek(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

/**
 * GET /api/enem/challenges/semana
 * Retorna o desafio da semana atual
 *
 * Query params:
 * - usuarioId: ID do usuário (opcional) - se fornecido, retorna também o progresso
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');

    // Obter semana atual
    const semanaAtual = getISOWeek(new Date());

    // Buscar desafio ativo da semana
    const desafio = await prisma.weeklyChallenge.findFirst({
      where: {
        semanaRef: semanaAtual,
        ativo: true
      }
    });

    if (!desafio) {
      return NextResponse.json({
        success: true,
        desafio: null,
        message: 'Nenhum desafio disponível para esta semana'
      });
    }

    // Se usuarioId foi fornecido, buscar progresso
    let progresso = null;
    if (usuarioId) {
      progresso = await prisma.userWeeklyProgress.findUnique({
        where: {
          usuarioId_challengeId: {
            usuarioId,
            challengeId: desafio.id
          }
        }
      });

      // Se não existe progresso, criar um novo
      if (!progresso) {
        progresso = await prisma.userWeeklyProgress.create({
          data: {
            usuarioId,
            challengeId: desafio.id,
            simuladosFeitos: 0,
            fpGanhos: 0,
            concluido: false
          }
        });
      }
    }

    // Calcular percentual de conclusão
    let percentualConclusao = 0;
    if (progresso) {
      const percSimulados = (progresso.simuladosFeitos / desafio.metaSimulados) * 100;
      const percFP = (progresso.fpGanhos / desafio.metaFP) * 100;
      percentualConclusao = Math.min(Math.min(percSimulados, percFP), 100);
    }

    return NextResponse.json({
      success: true,
      desafio,
      progresso,
      percentualConclusao: Math.round(percentualConclusao),
      semanaAtual
    });

  } catch (error) {
    console.error('Erro ao buscar desafio semanal:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar desafio da semana'
      },
      { status: 500 }
    );
  }
}
