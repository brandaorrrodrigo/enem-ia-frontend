import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuarioId } = body;

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

    if (!subscription?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Usuario nao possui assinatura' },
        { status: 404 }
      );
    }

    // Criar sessao do portal do cliente
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/enem/dashboard`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });

  } catch (error: any) {
    console.error('Erro ao criar portal session:', error);
    return NextResponse.json(
      { error: 'Erro ao acessar portal', details: error?.message },
      { status: 500 }
    );
  }
}
