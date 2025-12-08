import { NextRequest, NextResponse } from 'next/server';
import { stripe, PLANS } from '@/lib/stripe/config';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usuarioId, plano } = body;

    console.log('[CHECKOUT] Iniciando checkout:', { usuarioId, plano });

    if (!usuarioId || !plano) {
      console.error('[CHECKOUT] Erro: usuarioId e plano sao obrigatorios');
      return NextResponse.json(
        { error: 'usuarioId e plano sao obrigatorios' },
        { status: 400 }
      );
    }

    if (plano !== 'pro' && plano !== 'premium') {
      console.error('[CHECKOUT] Erro: Plano invalido:', plano);
      return NextResponse.json(
        { error: 'Plano invalido. Use: pro ou premium' },
        { status: 400 }
      );
    }

    const planConfig = PLANS[plano as "pro" | "premium"];
    if (!planConfig.priceId) {
      console.error('[CHECKOUT] Erro: Preco nao configurado para plano:', plano);
      return NextResponse.json(
        { error: 'Preco nao configurado para este plano' },
        { status: 400 }
      );
    }

    console.log('[CHECKOUT] Price ID:', planConfig.priceId);

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: { subscription: true }
    });

    if (!usuario) {
      console.error('[CHECKOUT] Erro: Usuario nao encontrado:', usuarioId);
      return NextResponse.json(
        { error: 'Usuario nao encontrado' },
        { status: 404 }
      );
    }

    console.log('[CHECKOUT] Usuario encontrado:', usuario.email);

    // Verificar se ja tem assinatura ativa
    if (usuario.subscription?.status === 'active') {
      console.error('[CHECKOUT] Erro: Usuario ja possui assinatura ativa');
      return NextResponse.json(
        { error: 'Voce ja possui uma assinatura ativa' },
        { status: 400 }
      );
    }

    // Criar ou buscar customer no Stripe
    let stripeCustomerId = usuario.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      console.log('[CHECKOUT] Criando customer no Stripe...');
      const customer = await stripe.customers.create({
        email: usuario.email,
        name: usuario.nome || undefined,
        metadata: {
          usuarioId: usuario.id,
        },
      });
      stripeCustomerId = customer.id;
      console.log('[CHECKOUT] Customer criado:', stripeCustomerId);

      // Criar registro de subscription (inativo por enquanto)
      await prisma.subscription.create({
        data: {
          usuarioId: usuario.id,
          stripeCustomerId: stripeCustomerId,
          status: 'inactive',
          plano: 'free',
        },
      });
      console.log('[CHECKOUT] Subscription record criado');
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://enem-pro.com';
    console.log('[CHECKOUT] App URL:', appUrl);

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
      success_url: `${appUrl}/assinatura/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/assinatura/cancelada`,
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

    console.log('[CHECKOUT] Session criada:', session.id);
    console.log('[CHECKOUT] Redirect URL:', session.url);

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error: any) {
    console.error('[CHECKOUT] Erro fatal:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento', details: error?.message },
      { status: 500 }
    );
  }
}
