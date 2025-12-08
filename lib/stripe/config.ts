import Stripe from 'stripe';

// Inicializa cliente Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

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
