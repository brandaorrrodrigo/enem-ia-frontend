import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/enem/rewards/loja
 * Lista todas as recompensas disponíveis na loja
 */
export async function GET(request: NextRequest) {
  try {
    const rewards = await prisma.reward.findMany({
      where: {
        ativo: true
      },
      orderBy: [
        { categoria: 'asc' },
        { custoFP: 'asc' }
      ]
    });

    return NextResponse.json({
      success: true,
      rewards
    });
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar recompensas da loja'
      },
      { status: 500 }
    );
  }
}
