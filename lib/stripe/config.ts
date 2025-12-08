import Stripe from 'stripe';

// Cliente Stripe com lazy loading para evitar erro no build
let stripeInstance: Stripe | null = null;

export const getStripe = (): Stripe => {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-11-17.clover' as Stripe.LatestApiVersion,
      typescript: true,
    });
  }
  return stripeInstance;
};

// Proxy object para manter compatibilidade com import { stripe }
export const stripe = {
  get customers() {
    return getStripe().customers;
  },
  get checkout() {
    return getStripe().checkout;
  },
  get billingPortal() {
    return getStripe().billingPortal;
  },
  get subscriptions() {
    return getStripe().subscriptions;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
  get invoices() {
    return getStripe().invoices;
  },
};

// Configuracao dos planos
export const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
    priceId: null,
    features: [
      '5 simulados por mes',
      'Questoes comentadas basicas',
      'Ranking geral',
    ],
    limits: {
      simuladosPorMes: 5,
      batalhasPorDia: 3,
      convitesPorMes: 0,
    }
  },
  pro: {
    name: 'PRO',
    price: 3900, // em centavos = R$ 39,00
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Simulados ilimitados',
      'Todas questoes comentadas',
      'Batalhas ilimitadas',
      '10 convites por mes',
      'Relatorios de desempenho',
      'Suporte prioritario',
    ],
    limits: {
      simuladosPorMes: -1, // ilimitado
      batalhasPorDia: -1,
      convitesPorMes: 10,
    }
  },
  premium: {
    name: 'Premium',
    price: 6900, // em centavos = R$ 69,00
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    features: [
      'Tudo do PRO',
      '30 convites por mes',
      'Simulados personalizados por IA',
      'Plano de estudos adaptativo',
      'Correcao de redacao por IA',
      'Mentoria em grupo',
      'Badge exclusiva Premium',
    ],
    limits: {
      simuladosPorMes: -1,
      batalhasPorDia: -1,
      convitesPorMes: 30,
    }
  }
} as const;

export type PlanType = keyof typeof PLANS;
