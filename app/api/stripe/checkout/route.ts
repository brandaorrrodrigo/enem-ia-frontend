import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe/config';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuarioId, plano } = body;

    if (!usuarioId || !plano) {
      return NextResponse.json(
        { error: 'usuarioId e plano sao obrigatorios' },
        { status: 400 }
      );
    }

    if (plano !== 'pro' && plano !== 'premium') {
      return NextResponse.json(
        { error: 'Plano invalido. Use: pro ou premium' },
        { status: 400 }
      );
    }

    const planConfig = PLANS[plano];
    if (!planConfig.priceId) {
      return NextResponse.json(
        { error: 'Preco nao configurado para este plano' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: { subscription: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    // Verificar se ja tem assinatura ativa
    if (usuario.subscription?.status === 'active') {
      return NextResponse.json(
        { error: 'Voce ja possui uma assinatura ativa' },
        { status: 400 }
      );
    }

    // Criar ou buscar customer no Stripe
    let stripeCustomerId = usuario.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: usuario.email,
        name: usuario.nome || undefined,
        metadata: {
          usuarioId: usuario.id,
        },
      });
      stripeCustomerId = customer.id;

      // Criar registro de subscription (inativo por enquanto)
      await prisma.subscription.create({
        data: {
          usuarioId: usuario.id,
          stripeCustomerId: stripeCustomerId,
          status: 'inactive',
          plano: 'free',
        },
      });
    }

    // Criar checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/planos`,
      metadata: {
        usuarioId: usuario.id,
        plano: plano,
      },
      subscription_data: {
        metadata: {
          usuarioId: usuario.id,
          plano: plano,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('Erro ao criar checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento', details: error?.message },
      { status: 500 }
    );
  }
}
