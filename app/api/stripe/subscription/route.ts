import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PLANS } from '@/lib/stripe/config';

export async function GET(request: NextRequest) {
  try {
    const usuarioId = request.nextUrl.searchParams.get('usuarioId');

    if (!usuarioId) {
      return NextResponse.json(
        { error: 'usuarioId obrigatorio' },
        { status: 400 }
      );
    }

    // Buscar subscription do usuario
    const subscription = await prisma.subscription.findUnique({
      where: { usuarioId },
    });

    if (!subscription) {
      // Usuario nao tem subscription, retorna plano free
      return NextResponse.json({
        plano: 'free',
        status: 'active',
        features: PLANS.free.features,
        limits: PLANS.free.limits,
      });
    }

    const planoConfig = PLANS[subscription.plano as keyof typeof PLANS] || PLANS.free;

    return NextResponse.json({
      plano: subscription.plano,
      status: subscription.status,
      features: planoConfig.features,
      limits: planoConfig.limits,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    });

  } catch (error: any) {
    console.error('Erro ao buscar subscription:', error);
    return NextResponse.json(
      { error: 'Erro interno', details: error?.message },
      { status: 500 }
    );
  }
}
