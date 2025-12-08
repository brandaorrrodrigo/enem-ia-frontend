const fs = require('fs');

const webhookContent = `import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  console.log('[WEBHOOK] Recebido evento do Stripe');

  if (!signature) {
    console.error('[WEBHOOK] Erro: Missing signature');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('[WEBHOOK] Evento validado:', event.type);
  } catch (err: any) {
    console.error('[WEBHOOK] Erro de validacao:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('[WEBHOOK] Processando checkout.session.completed');
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created': {
        console.log('[WEBHOOK] Processando customer.subscription.created');
        const subscription = event.data.object;
        await handleSubscriptionCreated(subscription as any);
        break;
      }

      case 'customer.subscription.updated': {
        console.log('[WEBHOOK] Processando customer.subscription.updated');
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription as any);
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('[WEBHOOK] Processando customer.subscription.deleted');
        const subscription = event.data.object;
        await handleSubscriptionCanceled(subscription as any);
        break;
      }

      case 'invoice.paid': {
        console.log('[WEBHOOK] Processando invoice.paid');
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        console.log('[WEBHOOK] Processando invoice.payment_failed');
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log('[WEBHOOK] Evento nao tratado:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[WEBHOOK] Erro ao processar evento:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const usuarioId = session.metadata?.usuarioId;
  const plano = session.metadata?.plano as 'pro' | 'premium';

  console.log('[WEBHOOK] Checkout completed para usuario:', usuarioId, 'plano:', plano);

  if (!usuarioId || !plano) {
    console.error('[WEBHOOK] Metadata incompleta no checkout');
    return;
  }

  try {
    await prisma.subscription.update({
      where: { usuarioId },
      data: {
        stripeSubscriptionId: session.subscription as string,
        status: 'active',
        plano: plano,
      },
    });

    const fpBonus = plano === 'premium' ? 1000 : 500;
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        pontosFP: { increment: fpBonus },
      },
    });

    console.log('[WEBHOOK] Usuario', usuarioId, 'assinou plano', plano, '- Bonus:', fpBonus, 'FP');
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar checkout completed:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription: any) {
  const stripeCustomerId = subscription.customer as string;
  console.log('[WEBHOOK] Subscription criada para customer:', stripeCustomerId);

  try {
    const sub = await prisma.subscription.findUnique({
      where: { stripeCustomerId },
    });

    if (!sub) {
      console.error('[WEBHOOK] Subscription nao encontrada para customer:', stripeCustomerId);
      return;
    }

    let plano = 'free';
    const priceId = subscription.items?.data?.[0]?.price?.id;
    if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
      plano = 'pro';
    } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
      plano = 'premium';
    }

    const updateData: any = {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: subscription.status,
      plano: plano,
      cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
    };

    if (subscription.current_period_start) {
      updateData.currentPeriodStart = new Date(subscription.current_period_start * 1000);
    }
    if (subscription.current_period_end) {
      updateData.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
    }

    await prisma.subscription.update({
      where: { stripeCustomerId },
      data: updateData,
    });

    console.log('[WEBHOOK] Subscription criada com sucesso - Plano:', plano);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar subscription created:', error);
    throw error;
  }
}

async function handleSubscriptionUpdate(subscription: any) {
  const stripeCustomerId = subscription.customer as string;
  console.log('[WEBHOOK] Subscription atualizada para customer:', stripeCustomerId);

  try {
    const sub = await prisma.subscription.findUnique({
      where: { stripeCustomerId },
    });

    if (!sub) {
      console.error('[WEBHOOK] Subscription nao encontrada para customer:', stripeCustomerId);
      return;
    }

    let plano = 'free';
    const priceId = subscription.items?.data?.[0]?.price?.id;
    if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
      plano = 'pro';
    } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
      plano = 'premium';
    }

    if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      plano = 'free';
    }

    const updateData: any = {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: subscription.status,
      plano: plano,
      cancelAtPeriodEnd: subscription.cancel_at_period_end || false,
    };

    if (subscription.current_period_start) {
      updateData.currentPeriodStart = new Date(subscription.current_period_start * 1000);
    }
    if (subscription.current_period_end) {
      updateData.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
    }

    await prisma.subscription.update({
      where: { stripeCustomerId },
      data: updateData,
    });

    console.log('[WEBHOOK] Subscription atualizada:', subscription.id, '- Status:', subscription.status, '- Plano:', plano);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar subscription update:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(subscription: any) {
  const stripeCustomerId = subscription.customer as string;
  console.log('[WEBHOOK] Subscription cancelada para customer:', stripeCustomerId);

  try {
    await prisma.subscription.update({
      where: { stripeCustomerId },
      data: {
        status: 'canceled',
        plano: 'free',
        canceledAt: new Date(),
      },
    });

    console.log('[WEBHOOK] Subscription cancelada com sucesso:', subscription.id);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar subscription canceled:', error);
    throw error;
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const stripeCustomerId = invoice.customer as string;
  console.log('[WEBHOOK] Invoice paga para customer:', stripeCustomerId);

  try {
    const sub = await prisma.subscription.findUnique({
      where: { stripeCustomerId },
    });

    if (!sub) {
      console.log('[WEBHOOK] Subscription nao encontrada para invoice paid');
      return;
    }

    const paymentId = (invoice.payment_intent as string) || invoice.id;
    await prisma.payment.create({
      data: {
        usuarioId: sub.usuarioId,
        stripePaymentId: paymentId,
        amount: invoice.amount_paid || 0,
        currency: invoice.currency || 'brl',
        status: 'succeeded',
      },
    });

    await prisma.subscription.update({
      where: { stripeCustomerId },
      data: {
        status: 'active',
      },
    });

    console.log('[WEBHOOK] Pagamento registrado:', invoice.id, '- Valor:', invoice.amount_paid);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar invoice paid:', error);
    throw error;
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const stripeCustomerId = invoice.customer as string;
  console.log('[WEBHOOK] Pagamento falhou para customer:', stripeCustomerId);

  try {
    const sub = await prisma.subscription.findUnique({
      where: { stripeCustomerId },
    });

    if (!sub) {
      console.log('[WEBHOOK] Subscription nao encontrada para payment failed');
      return;
    }

    await prisma.subscription.update({
      where: { stripeCustomerId },
      data: {
        status: 'past_due',
      },
    });

    const paymentId = (invoice.payment_intent as string) || invoice.id;
    await prisma.payment.create({
      data: {
        usuarioId: sub.usuarioId,
        stripePaymentId: paymentId,
        amount: invoice.amount_due || 0,
        currency: invoice.currency || 'brl',
        status: 'failed',
      },
    });

    console.log('[WEBHOOK] Pagamento falhou:', invoice.id, '- Usuario:', sub.usuarioId);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar payment failed:', error);
    throw error;
  }
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/api/stripe/webhook/route.ts', webhookContent);
console.log('Webhook fixed!');
