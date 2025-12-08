const fs = require('fs');
const path = require('path');

// =====================================================
// SCRIPT COMPLETO DE CONFIGURACAO DO STRIPE
// =====================================================

console.log('Iniciando configuracao completa do Stripe...\n');

// 1. CHECKOUT API - Corrigir cancel_url
const checkoutApi = `import { NextRequest, NextResponse } from 'next/server';
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

    const planConfig = PLANS[plano];
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
      success_url: \`\${appUrl}/assinatura/sucesso?session_id={CHECKOUT_SESSION_ID}\`,
      cancel_url: \`\${appUrl}/assinatura/cancelada\`,
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

  } catch (error) {
    console.error('[CHECKOUT] Erro fatal:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento', details: error?.message },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/api/stripe/checkout/route.ts', checkoutApi);
console.log('1. API /api/stripe/checkout atualizada');

// 2. WEBHOOK COMPLETO com todos os eventos
const webhookApi = `import { NextRequest, NextResponse } from 'next/server';
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
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        console.log('[WEBHOOK] Processando customer.subscription.updated');
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        console.log('[WEBHOOK] Processando customer.subscription.deleted');
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
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

    console.log('[WEBHOOK] Usuario', usuarioId, 'assinou plano', plano, '- Bonus:', fpBonus, 'FP');
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar checkout completed:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
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

    console.log('[WEBHOOK] Subscription criada com sucesso - Plano:', plano);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar subscription created:', error);
    throw error;
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
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

    // Determinar plano pelo priceId
    let plano = 'free';
    const priceId = subscription.items.data[0]?.price.id;
    if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
      plano = 'pro';
    } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
      plano = 'premium';
    }

    // Se cancelada ou status inativo, volta para free
    if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      plano = 'free';
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

    console.log('[WEBHOOK] Subscription atualizada:', subscription.id, '- Status:', subscription.status, '- Plano:', plano);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar subscription update:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
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

    // Garantir que a subscription esta ativa
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

    console.log('[WEBHOOK] Pagamento falhou:', invoice.id, '- Usuario:', sub.usuarioId);
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar payment failed:', error);
    throw error;
  }
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/api/stripe/webhook/route.ts', webhookApi);
console.log('2. API /api/stripe/webhook atualizada com logs completos');

// 3. PAGINA CANCELADA
const canceladaPage = `'use client';

import Link from 'next/link';

export default function AssinaturaCanceladaPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '500px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {/* Cancel Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px',
          color: '#fff',
        }}>
          ✕
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: '2rem',
          marginBottom: '16px',
          fontWeight: 'bold',
        }}>
          Pagamento Cancelado
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          Voce cancelou o processo de pagamento.
          Nao se preocupe, nenhuma cobranca foi realizada.
        </p>

        {/* Info Box */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
        }}>
          <p style={{ color: '#93c5fd', fontSize: '0.95rem', margin: 0 }}>
            Ainda tem duvidas sobre os planos?
            Estamos aqui para ajudar!
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            href="/planos"
            style={{
              padding: '14px 24px',
              background: '#3b82f6',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'block',
            }}
          >
            Ver Planos Novamente
          </Link>
          <Link
            href="/enem/dashboard"
            style={{
              padding: '14px 24px',
              background: 'transparent',
              color: '#94a3b8',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
`;

fs.mkdirSync('D:/enem-ia/enem-pro/app/assinatura/cancelada', { recursive: true });
fs.writeFileSync('D:/enem-ia/enem-pro/app/assinatura/cancelada/page.tsx', canceladaPage);
console.log('3. Pagina /assinatura/cancelada criada');

// 4. PAGINA SUCESSO COM VERIFICACAO REAL
const sucessoPage = `'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SubscriptionData {
  plano: string;
  status: string;
  features: string[];
}

function AssinaturaSucessoContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verificarAssinatura = async () => {
      try {
        // Pegar usuario do localStorage
        const userData = localStorage.getItem('usuario');
        if (!userData) {
          setError('Usuario nao encontrado');
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);

        // Aguardar um pouco para o webhook processar
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Verificar subscription atual
        const response = await fetch(\`/api/stripe/subscription?usuarioId=\${user.id}\`);
        const data = await response.json();

        if (data.plano && data.plano !== 'free') {
          setSubscriptionData(data);

          // Atualizar localStorage com novo plano
          user.plano = data.plano;
          localStorage.setItem('usuario', JSON.stringify(user));
        }
      } catch (err) {
        console.error('Erro ao verificar assinatura:', err);
      } finally {
        setLoading(false);
      }
    };

    verificarAssinatura();
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.1)',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px',
          }} />
          <p style={{ fontSize: '1.2rem' }}>Confirmando seu pagamento...</p>
          <style>{\`@keyframes spin { to { transform: rotate(360deg); } }\`}</style>
        </div>
      </div>
    );
  }

  const planoNome = subscriptionData?.plano === 'premium' ? 'Premium' : 'PRO';
  const fpBonus = subscriptionData?.plano === 'premium' ? 1000 : 500;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '500px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px',
          color: '#fff',
        }}>
          ✓
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: '2rem',
          marginBottom: '16px',
          fontWeight: 'bold',
        }}>
          Assinatura {planoNome} Ativada!
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          Parabens! Sua assinatura foi ativada com sucesso.
          Voce ja pode aproveitar todos os recursos exclusivos.
        </p>

        {/* Bonus FP */}
        <div style={{
          background: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
        }}>
          <p style={{ color: '#eab308', fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>
            +{fpBonus} FP
          </p>
          <p style={{ color: '#fbbf24', fontSize: '0.9rem', margin: '4px 0 0' }}>
            Bonus de boas-vindas adicionado!
          </p>
        </div>

        {/* Features unlocked */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          textAlign: 'left',
        }}>
          <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '1rem' }}>
            Recursos desbloqueados:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {(subscriptionData?.features || [
              'Simulados ilimitados',
              'Batalhas ilimitadas',
              'Todas questoes comentadas',
              'Relatorios de desempenho'
            ]).map((feature, i) => (
              <li key={i} style={{ color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#22c55e' }}>✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            href="/enem/dashboard"
            style={{
              padding: '14px 24px',
              background: '#3b82f6',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'block',
            }}
          >
            Ir para o Dashboard
          </Link>
          <Link
            href="/enem/simulado"
            style={{
              padding: '14px 24px',
              background: 'transparent',
              color: '#94a3b8',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            Comecar um Simulado
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AssinaturaSucessoPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ color: '#fff' }}>Carregando...</div>
      </div>
    }>
      <AssinaturaSucessoContent />
    </Suspense>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/assinatura/sucesso/page.tsx', sucessoPage);
console.log('4. Pagina /assinatura/sucesso atualizada com verificacao real');

// 5. PAGINA PRO COM STRIPE INTEGRADO
const proPage = `'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AssinaturaProContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      setUsuarioId(user.id);
    }
  }, []);

  const handleAssinar = async () => {
    if (!usuarioId) {
      router.push('/login?redirect=/assinatura/pro');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, plano: 'pro' }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erro ao iniciar checkout');
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/planos" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
          ← Voltar aos planos
        </Link>

        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)',
          borderRadius: '24px',
          padding: '40px',
          border: '2px solid #3b82f6',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{
              background: '#3b82f6',
              color: '#fff',
              padding: '4px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}>
              MAIS POPULAR
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '8px', textAlign: 'center' }}>
            Plano PRO
          </h1>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>R$ 39,00</span>
            <span style={{ color: '#94a3b8' }}>/mes</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
            {[
              'Simulados ilimitados',
              'Todas questoes comentadas',
              'Batalhas ilimitadas',
              '10 convites por mes',
              'Relatorios de desempenho',
              'Suporte prioritario',
              '+500 FP de bonus',
            ].map((feature, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                color: '#cbd5e1',
              }}>
                <span style={{ color: '#3b82f6', fontSize: '1.2rem' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#f87171',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleAssinar}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              background: '#3b82f6',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Redirecionando...' : 'Assinar PRO Agora'}
          </button>

          <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginTop: '16px' }}>
            Pagamento seguro via Stripe. Cancele quando quiser.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AssinaturaProPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#fff' }}>Carregando...</div></div>}>
      <AssinaturaProContent />
    </Suspense>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/assinatura/pro/page.tsx', proPage);
console.log('5. Pagina /assinatura/pro atualizada com Stripe');

// 6. PAGINA PREMIUM COM STRIPE INTEGRADO
const premiumPage = `'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AssinaturaPremiumContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      setUsuarioId(user.id);
    }
  }, []);

  const handleAssinar = async () => {
    if (!usuarioId) {
      router.push('/login?redirect=/assinatura/premium');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, plano: 'premium' }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Erro ao iniciar checkout');
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/planos" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-block', marginBottom: '24px' }}>
          ← Voltar aos planos
        </Link>

        <div style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)',
          borderRadius: '24px',
          padding: '40px',
          border: '2px solid #a855f7',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
              color: '#fff',
              padding: '4px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}>
              COMPLETO
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '8px', textAlign: 'center' }}>
            Plano Premium
          </h1>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>R$ 69,00</span>
            <span style={{ color: '#94a3b8' }}>/mes</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
            {[
              'Tudo do PRO',
              '30 convites por mes',
              'Simulados personalizados por IA',
              'Plano de estudos adaptativo',
              'Correcao de redacao por IA',
              'Mentoria em grupo',
              'Badge exclusiva Premium',
              '+1000 FP de bonus',
            ].map((feature, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                color: '#cbd5e1',
              }}>
                <span style={{ color: '#a855f7', fontSize: '1.2rem' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              color: '#f87171',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleAssinar}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Redirecionando...' : 'Assinar Premium Agora'}
          </button>

          <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginTop: '16px' }}>
            Pagamento seguro via Stripe. Cancele quando quiser.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function AssinaturaPremiumPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#fff' }}>Carregando...</div></div>}>
      <AssinaturaPremiumContent />
    </Suspense>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/assinatura/premium/page.tsx', premiumPage);
console.log('6. Pagina /assinatura/premium atualizada com Stripe');

// 7. PAGINA MENSAL COM REDIRECT PARA PRO
const mensalPage = `'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssinaturaMensalPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a pagina de planos PRO
    router.replace('/assinatura/pro');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ color: '#fff' }}>Redirecionando...</div>
    </div>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/assinatura/mensal/page.tsx', mensalPage);
console.log('7. Pagina /assinatura/mensal atualizada (redirect para PRO)');

// 8. PAGINA ANUAL COM REDIRECT PARA PREMIUM
const anualPage = `'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssinaturaAnualPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a pagina de planos Premium
    router.replace('/assinatura/premium');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ color: '#fff' }}>Redirecionando...</div>
    </div>
  );
}
`;

fs.writeFileSync('D:/enem-ia/enem-pro/app/assinatura/anual/page.tsx', anualPage);
console.log('8. Pagina /assinatura/anual atualizada (redirect para Premium)');

console.log('\n=====================================================');
console.log('CONFIGURACAO STRIPE COMPLETA!');
console.log('=====================================================\n');

console.log('Arquivos criados/atualizados:');
console.log('- app/api/stripe/checkout/route.ts');
console.log('- app/api/stripe/webhook/route.ts');
console.log('- app/assinatura/cancelada/page.tsx');
console.log('- app/assinatura/sucesso/page.tsx');
console.log('- app/assinatura/pro/page.tsx');
console.log('- app/assinatura/premium/page.tsx');
console.log('- app/assinatura/mensal/page.tsx');
console.log('- app/assinatura/anual/page.tsx');

console.log('\n---------------------------------------------');
console.log('VARIAVEIS DE AMBIENTE NECESSARIAS NA VERCEL:');
console.log('---------------------------------------------');
console.log('STRIPE_SECRET_KEY=sk_test_...');
console.log('NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...');
console.log('STRIPE_WEBHOOK_SECRET=whsec_...');
console.log('STRIPE_PRO_PRICE_ID=price_1Sc9nkRQ774ZLOwCcosMAVNo');
console.log('STRIPE_PREMIUM_PRICE_ID=price_1Sc9oDRQ774ZLOwCA0PX4MZH');
console.log('NEXT_PUBLIC_APP_URL=https://enem-pro.com');
console.log('---------------------------------------------\n');
