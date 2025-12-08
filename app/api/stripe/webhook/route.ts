import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Evento nao tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const usuarioId = session.metadata?.usuarioId;
  const plano = session.metadata?.plano;

  if (!usuarioId || !plano) {
    console.error('Metadata incompleta no checkout');
    return;
  }

  // Atualizar subscription
  await prisma.subscription.update({
    where: { usuarioId },
    data: {
      stripeSubscriptionId: session.subscription as string,
      status: 'active',
      plano: plano,
    },
  });

  // Dar bonus de FP por assinar
  const fpBonus = plano === 'premium' ? 1000 : 500;
  await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      pontosFP: { increment: fpBonus },
    },
  });

  console.log(`Usuario ${usuarioId} assinou plano ${plano}`);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const stripeCustomerId = subscription.customer as string;

  const sub = await prisma.subscription.findUnique({
    where: { stripeCustomerId },
  });

  if (!sub) {
    console.error('Subscription nao encontrada para customer:', stripeCustomerId);
    return;
  }

  // Determinar plano pelo priceId
  let plano = 'free';
  const priceId = subscription.items.data[0]?.price.id;
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
    plano = 'pro';
  } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
    plano = 'premium';
  }

  await prisma.subscription.update({
    where: { stripeCustomerId },
    data: {
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: subscription.status,
      plano: plano,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  console.log(`Subscription atualizada: ${subscription.id} - ${subscription.status}`);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const stripeCustomerId = subscription.customer as string;

  await prisma.subscription.update({
    where: { stripeCustomerId },
    data: {
      status: 'canceled',
      plano: 'free',
      canceledAt: new Date(),
    },
  });

  console.log(`Subscription cancelada: ${subscription.id}`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const stripeCustomerId = invoice.customer as string;

  const sub = await prisma.subscription.findUnique({
    where: { stripeCustomerId },
  });

  if (!sub) return;

  // Registrar pagamento
  await prisma.payment.create({
    data: {
      usuarioId: sub.usuarioId,
      stripePaymentId: invoice.payment_intent as string || invoice.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'succeeded',
    },
  });

  console.log(`Pagamento registrado: ${invoice.id}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const stripeCustomerId = invoice.customer as string;

  const sub = await prisma.subscription.findUnique({
    where: { stripeCustomerId },
  });

  if (!sub) return;

  await prisma.subscription.update({
    where: { stripeCustomerId },
    data: {
      status: 'past_due',
    },
  });

  // Registrar tentativa de pagamento falha
  await prisma.payment.create({
    data: {
      usuarioId: sub.usuarioId,
      stripePaymentId: invoice.payment_intent as string || invoice.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: 'failed',
    },
  });

  console.log(`Pagamento falhou: ${invoice.id}`);
}
