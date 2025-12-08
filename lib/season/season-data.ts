/**
 * ENEM PRO - Dados da Temporada T1: Redação Nota 1000
 * Desafios, recompensas e configurações da primeira temporada
 */

import {
  Season,
  SeasonChallenge,
  SeasonReward,
  ChallengeType,
} from './types';

// ============================================
// DESAFIOS DIÁRIOS
// ============================================

const DESAFIOS_DIARIOS: Omit<SeasonChallenge, 'status' | 'progresso'>[] = [
  {
    id: 'daily_intro_1',
    tipo: 'daily',
    categoria: 'redacao',
    titulo: 'Primeira Impressão',
    descricao: 'Escreva 1 introdução de redação',
    icone: '✍️',
    SFPRecompensa: 150,
    meta: 1,
  },
  {
    id: 'daily_linguagens_1',
    tipo: 'daily',
    categoria: 'linguagens',
    titulo: 'Domínio da Língua',
    descricao: 'Responda 1 questão de Linguagens',
    icone: '📚',
    SFPRecompensa: 100,
    meta: 1,
  },
  {
    id: 'daily_leitura_1',
    tipo: 'daily',
    categoria: 'leitura',
    titulo: 'Inspiração Nota Mil',
    descricao: 'Leia 1 redação exemplo nota 1000',
    icone: '👁️',
    SFPRecompensa: 120,
    meta: 1,
  },
  {
    id: 'daily_quiz_1',
    tipo: 'daily',
    categoria: 'quiz',
    titulo: 'Gramática em Dia',
    descricao: 'Complete o quiz diário de português',
    icone: '❓',
    SFPRecompensa: 80,
    meta: 1,
  },
  {
    id: 'daily_correcao_1',
    tipo: 'daily',
    categoria: 'correcao',
    titulo: 'Olhar Crítico',
    descricao: 'Corrija 1 parágrafo com a IA',
    icone: '✅',
    SFPRecompensa: 130,
    meta: 1,
  },
];

// ============================================
// DESAFIOS SEMANAIS
// ============================================

const DESAFIOS_SEMANAIS: Omit<SeasonChallenge, 'status' | 'progresso'>[] = [
  {
    id: 'weekly_paragrafo_1',
    tipo: 'weekly',
    categoria: 'redacao',
    titulo: 'Argumentação Sólida',
    descricao: 'Escreva 1 parágrafo completo de desenvolvimento',
    icone: '📝',
    SFPRecompensa: 350,
    meta: 1,
  },
  {
    id: 'weekly_reescrita_1',
    tipo: 'weekly',
    categoria: 'redacao',
    titulo: 'Reescrita Estratégica',
    descricao: 'Reescreva uma redação baseada no feedback da IA',
    icone: '🔄',
    SFPRecompensa: 500,
    meta: 1,
  },
  {
    id: 'weekly_simulado_1',
    tipo: 'weekly',
    categoria: 'simulado',
    titulo: 'Mestre de Linguagens',
    descricao: 'Acerte 80% em um simulado de Linguagens',
    icone: '🎯',
    SFPRecompensa: 400,
    meta: 1,
  },
  {
    id: 'weekly_intros_3',
    tipo: 'weekly',
    categoria: 'redacao',
    titulo: 'Introduções Variadas',
    descricao: 'Escreva 3 introduções diferentes',
    icone: '✍️',
    SFPRecompensa: 300,
    meta: 3,
  },
  {
    id: 'weekly_leitura_5',
    tipo: 'weekly',
    categoria: 'leitura',
    titulo: 'Leitor Assíduo',
    descricao: 'Leia 5 redações nota 1000',
    icone: '📖',
    SFPRecompensa: 350,
    meta: 5,
  },
  {
    id: 'weekly_batalha_3',
    tipo: 'weekly',
    categoria: 'batalha',
    titulo: 'Guerreiro das Letras',
    descricao: 'Vença 3 batalhas 1v1 em Linguagens',
    icone: '⚔️',
    SFPRecompensa: 450,
    meta: 3,
  },
];

// ============================================
// DESAFIOS ESPECIAIS
// ============================================

const DESAFIOS_ESPECIAIS: Omit<SeasonChallenge, 'status' | 'progresso'>[] = [
  {
    id: 'special_competencia_alta',
    tipo: 'special',
    categoria: 'redacao',
    titulo: 'Competências Dominadas',
    descricao: 'Obtenha nota ≥ 180 em todas as 5 competências',
    icone: '⭐',
    SFPRecompensa: 800,
    meta: 1,
  },
  {
    id: 'special_redacao_completa',
    tipo: 'special',
    categoria: 'correcao',
    titulo: 'Redação Perfeita',
    descricao: 'Envie uma redação completa para correção pela IA',
    icone: '🏆',
    SFPRecompensa: 1000,
    meta: 1,
  },
  {
    id: 'special_sem_fuga',
    tipo: 'special',
    categoria: 'redacao',
    titulo: 'No Tema',
    descricao: 'Escreva uma redação sem fuga ao tema',
    icone: '🎯',
    SFPRecompensa: 600,
    meta: 1,
  },
  {
    id: 'special_streak_7',
    tipo: 'special',
    categoria: 'redacao',
    titulo: 'Dedicação Total',
    descricao: 'Complete desafios diários por 7 dias seguidos',
    icone: '🔥',
    SFPRecompensa: 700,
    meta: 7,
  },
  {
    id: 'special_nota_900',
    tipo: 'special',
    categoria: 'correcao',
    titulo: 'Quase Lá!',
    descricao: 'Obtenha nota ≥ 900 em uma redação',
    icone: '📈',
    SFPRecompensa: 1200,
    meta: 1,
  },
];

// ============================================
// RECOMPENSAS FREE
// ============================================

const RECOMPENSAS_FREE: Omit<SeasonReward, 'status'>[] = [
  // Nível 1-10
  { id: 'free_1', nivel: 1, tier: 'free', tipo: 'fp', nome: '+100 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 100 },
  { id: 'free_2', nivel: 2, tier: 'free', tipo: 'sticker', nome: 'Sticker Caneta', descricao: 'Sticker temático de escrita', icone: '🖊️', raridade: 'comum' },
  { id: 'free_3', nivel: 3, tier: 'free', tipo: 'fp', nome: '+150 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 150 },
  { id: 'free_4', nivel: 4, tier: 'free', tipo: 'moldura', nome: 'Moldura Caderno', descricao: 'Moldura estilo caderno escolar', icone: '📓', raridade: 'comum' },
  { id: 'free_5', nivel: 5, tier: 'free', tipo: 'boost', nome: 'Boost 24h Linguagens', descricao: '+50% FP em Linguagens por 24h', icone: '⚡', raridade: 'raro', valor: 24 },
  { id: 'free_6', nivel: 6, tier: 'free', tipo: 'fp', nome: '+200 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 200 },
  { id: 'free_7', nivel: 7, tier: 'free', tipo: 'avatar', nome: 'Avatar Estudante', descricao: 'Avatar com tema de estudante', icone: '👤', raridade: 'comum' },
  { id: 'free_8', nivel: 8, tier: 'free', tipo: 'sticker', nome: 'Sticker Livro', descricao: 'Sticker de livro aberto', icone: '📖', raridade: 'comum' },
  { id: 'free_9', nivel: 9, tier: 'free', tipo: 'fp', nome: '+200 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 200 },
  { id: 'free_10', nivel: 10, tier: 'free', tipo: 'moldura', nome: 'Moldura Bronze Redação', descricao: 'Moldura bronze temática', icone: '🥉', raridade: 'raro' },

  // Nível 11-20
  { id: 'free_11', nivel: 11, tier: 'free', tipo: 'fp', nome: '+250 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 250 },
  { id: 'free_12', nivel: 12, tier: 'free', tipo: 'sticker', nome: 'Sticker Nota 1000', descricao: 'Sticker motivacional', icone: '💯', raridade: 'raro' },
  { id: 'free_13', nivel: 13, tier: 'free', tipo: 'fp', nome: '+250 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 250 },
  { id: 'free_14', nivel: 14, tier: 'free', tipo: 'avatar', nome: 'Avatar Escritor', descricao: 'Avatar com caneta', icone: '✍️', raridade: 'comum' },
  { id: 'free_15', nivel: 15, tier: 'free', tipo: 'boost', nome: 'Boost 24h SFP', descricao: '+25% SFP por 24h', icone: '⚡', raridade: 'raro', valor: 24 },
  { id: 'free_16', nivel: 16, tier: 'free', tipo: 'fp', nome: '+300 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 300 },
  { id: 'free_17', nivel: 17, tier: 'free', tipo: 'sticker', nome: 'Sticker Competência', descricao: 'Pack de stickers C1-C5', icone: '📊', raridade: 'raro' },
  { id: 'free_18', nivel: 18, tier: 'free', tipo: 'fp', nome: '+300 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 300 },
  { id: 'free_19', nivel: 19, tier: 'free', tipo: 'moldura', nome: 'Moldura Prata Redação', descricao: 'Moldura prata temática', icone: '🥈', raridade: 'epico' },
  { id: 'free_20', nivel: 20, tier: 'free', tipo: 'badge', nome: 'Badge T1 Free', descricao: 'Badge de participação T1', icone: '🏅', raridade: 'epico' },

  // Nível 21-30
  { id: 'free_21', nivel: 21, tier: 'free', tipo: 'fp', nome: '+350 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 350 },
  { id: 'free_23', nivel: 23, tier: 'free', tipo: 'fp', nome: '+350 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 350 },
  { id: 'free_25', nivel: 25, tier: 'free', tipo: 'boost', nome: 'Mega Boost 48h', descricao: '+50% FP geral por 48h', icone: '🚀', raridade: 'epico', valor: 48 },
  { id: 'free_27', nivel: 27, tier: 'free', tipo: 'fp', nome: '+400 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'comum', valor: 400 },
  { id: 'free_29', nivel: 29, tier: 'free', tipo: 'moldura', nome: 'Moldura Ouro Redação', descricao: 'Moldura dourada temática', icone: '🥇', raridade: 'epico' },

  // Nível 31-40
  { id: 'free_31', nivel: 31, tier: 'free', tipo: 'fp', nome: '+450 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'raro', valor: 450 },
  { id: 'free_33', nivel: 33, tier: 'free', tipo: 'avatar', nome: 'Avatar Mestre', descricao: 'Avatar de mestre da escrita', icone: '🎓', raridade: 'epico' },
  { id: 'free_35', nivel: 35, tier: 'free', tipo: 'fp', nome: '+500 FP', descricao: 'Pontos para a loja', icone: '🪙', raridade: 'raro', valor: 500 },
  { id: 'free_37', nivel: 37, tier: 'free', tipo: 'sticker', nome: 'Pack Stickers T1', descricao: 'Pack completo de stickers', icone: '🎁', raridade: 'epico' },
  { id: 'free_40', nivel: 40, tier: 'free', tipo: 'badge', nome: 'Badge T1 Completo', descricao: 'Badge de conclusão T1', icone: '🏆', raridade: 'lendario' },
];

// ============================================
// RECOMPENSAS PREMIUM
// ============================================

const RECOMPENSAS_PREMIUM: Omit<SeasonReward, 'status'>[] = [
  // Nível 1-10
  { id: 'premium_1', nivel: 1, tier: 'premium', tipo: 'fp', nome: '+200 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 200 },
  { id: 'premium_2', nivel: 2, tier: 'premium', tipo: 'moldura', nome: 'Moldura Dourada Inicial', descricao: 'Moldura premium dourada', icone: '✨', raridade: 'raro' },
  { id: 'premium_3', nivel: 3, tier: 'premium', tipo: 'fp', nome: '+250 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 250 },
  { id: 'premium_4', nivel: 4, tier: 'premium', tipo: 'avatar', nome: 'Avatar Dourado', descricao: 'Avatar com borda dourada', icone: '👑', raridade: 'raro', animado: true },
  { id: 'premium_5', nivel: 5, tier: 'premium', tipo: 'boost', nome: 'Super Boost 48h', descricao: '+100% FP por 48h', icone: '⚡', raridade: 'epico', valor: 48 },
  { id: 'premium_6', nivel: 6, tier: 'premium', tipo: 'fp', nome: '+300 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 300 },
  { id: 'premium_7', nivel: 7, tier: 'premium', tipo: 'skin', nome: 'Skin Caderno Vintage', descricao: 'Tema visual exclusivo', icone: '🎨', raridade: 'raro' },
  { id: 'premium_8', nivel: 8, tier: 'premium', tipo: 'sticker', nome: 'Pack Stickers Animados', descricao: 'Stickers com animação', icone: '🌟', raridade: 'epico', animado: true },
  { id: 'premium_9', nivel: 9, tier: 'premium', tipo: 'fp', nome: '+350 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 350 },
  { id: 'premium_10', nivel: 10, tier: 'premium', tipo: 'badge', nome: 'Badge Premium T1', descricao: 'Badge exclusivo premium', icone: '💎', raridade: 'epico' },

  // Nível 11-20
  { id: 'premium_11', nivel: 11, tier: 'premium', tipo: 'fp', nome: '+400 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 400 },
  { id: 'premium_12', nivel: 12, tier: 'premium', tipo: 'desconto', nome: 'Desconto 10%', descricao: '10% off na loja', icone: '💰', raridade: 'raro', valor: 10 },
  { id: 'premium_13', nivel: 13, tier: 'premium', tipo: 'fp', nome: '+400 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 400 },
  { id: 'premium_14', nivel: 14, tier: 'premium', tipo: 'moldura', nome: 'Moldura Animada Bronze', descricao: 'Moldura com animação', icone: '🖼️', raridade: 'epico', animado: true },
  { id: 'premium_15', nivel: 15, tier: 'premium', tipo: 'boost', nome: 'Hyper Boost 72h', descricao: '+150% FP por 72h', icone: '🚀', raridade: 'lendario', valor: 72 },
  { id: 'premium_16', nivel: 16, tier: 'premium', tipo: 'fp', nome: '+450 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 450 },
  { id: 'premium_17', nivel: 17, tier: 'premium', tipo: 'avatar', nome: 'Avatar Animado Escritor', descricao: 'Avatar premium animado', icone: '✨', raridade: 'epico', animado: true },
  { id: 'premium_18', nivel: 18, tier: 'premium', tipo: 'fp', nome: '+450 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'comum', valor: 450 },
  { id: 'premium_19', nivel: 19, tier: 'premium', tipo: 'skin', nome: 'Skin Lousa Neon', descricao: 'Tema neon exclusivo', icone: '🎨', raridade: 'epico' },
  { id: 'premium_20', nivel: 20, tier: 'premium', tipo: 'badge', nome: 'Badge Mestre da Escrita', descricao: 'Badge animado exclusivo', icone: '📝', raridade: 'lendario', animado: true },

  // Nível 21-30
  { id: 'premium_21', nivel: 21, tier: 'premium', tipo: 'fp', nome: '+500 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'raro', valor: 500 },
  { id: 'premium_22', nivel: 22, tier: 'premium', tipo: 'desconto', nome: 'Desconto 15%', descricao: '15% off na loja', icone: '💰', raridade: 'epico', valor: 15 },
  { id: 'premium_23', nivel: 23, tier: 'premium', tipo: 'fp', nome: '+500 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'raro', valor: 500 },
  { id: 'premium_24', nivel: 24, tier: 'premium', tipo: 'moldura', nome: 'Moldura Animada Prata', descricao: 'Moldura prata animada', icone: '🖼️', raridade: 'lendario', animado: true },
  { id: 'premium_25', nivel: 25, tier: 'premium', tipo: 'boost', nome: 'Ultimate Boost 7 dias', descricao: '+200% FP por 7 dias', icone: '💫', raridade: 'lendario', valor: 168 },
  { id: 'premium_26', nivel: 26, tier: 'premium', tipo: 'fp', nome: '+550 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'raro', valor: 550 },
  { id: 'premium_27', nivel: 27, tier: 'premium', tipo: 'avatar', nome: 'Avatar Lendário Caneta', descricao: 'Avatar premium lendário', icone: '🖊️', raridade: 'lendario', animado: true },
  { id: 'premium_28', nivel: 28, tier: 'premium', tipo: 'fp', nome: '+550 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'raro', valor: 550 },
  { id: 'premium_29', nivel: 29, tier: 'premium', tipo: 'skin', nome: 'Skin Galáxia', descricao: 'Tema galáctico exclusivo', icone: '🌌', raridade: 'lendario' },
  { id: 'premium_30', nivel: 30, tier: 'premium', tipo: 'badge', nome: 'Badge Redação Elite', descricao: 'Badge elite animado', icone: '👑', raridade: 'lendario', animado: true },

  // Nível 31-40
  { id: 'premium_31', nivel: 31, tier: 'premium', tipo: 'fp', nome: '+600 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'epico', valor: 600 },
  { id: 'premium_32', nivel: 32, tier: 'premium', tipo: 'desconto', nome: 'Desconto 20%', descricao: '20% off na loja', icone: '💰', raridade: 'lendario', valor: 20 },
  { id: 'premium_33', nivel: 33, tier: 'premium', tipo: 'fp', nome: '+600 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'epico', valor: 600 },
  { id: 'premium_34', nivel: 34, tier: 'premium', tipo: 'moldura', nome: 'Moldura Animada Ouro', descricao: 'Moldura ouro animada', icone: '🖼️', raridade: 'lendario', animado: true },
  { id: 'premium_35', nivel: 35, tier: 'premium', tipo: 'boost', nome: 'Boost Permanente +5%', descricao: '+5% FP permanente', icone: '∞', raridade: 'lendario', valor: -1 },
  { id: 'premium_36', nivel: 36, tier: 'premium', tipo: 'fp', nome: '+700 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'epico', valor: 700 },
  { id: 'premium_37', nivel: 37, tier: 'premium', tipo: 'avatar', nome: 'Avatar T1 Ultimate', descricao: 'Avatar exclusivo T1', icone: '🌟', raridade: 'lendario', animado: true },
  { id: 'premium_38', nivel: 38, tier: 'premium', tipo: 'fp', nome: '+800 FP', descricao: 'Bônus premium', icone: '🪙', raridade: 'epico', valor: 800 },
  { id: 'premium_39', nivel: 39, tier: 'premium', tipo: 'skin', nome: 'Skin Diamante', descricao: 'Tema diamante exclusivo', icone: '💎', raridade: 'lendario' },
  { id: 'premium_40', nivel: 40, tier: 'premium', tipo: 'moldura', nome: 'Moldura Diamante Animada', descricao: 'Recompensa final T1', icone: '💎', raridade: 'lendario', animado: true },
];

// ============================================
// TEMPORADA T1
// ============================================

export const SEASON_T1: Omit<Season, 'status'> = {
  id: 'T1',
  nome: 'Redação Nota 1000',
  subtitulo: 'Domine a arte da escrita',
  descricao: 'A primeira temporada do ENEM PRO é focada em redação. Complete desafios, ganhe SFP e desbloqueie recompensas exclusivas!',
  tema: 'redacao',
  icone: '✍️',
  corPrimaria: '#22c55e',
  corSecundaria: '#fbbf24',
  dataInicio: '2025-01-01T00:00:00Z',
  dataFim: '2025-02-01T23:59:59Z',
  niveisTotais: 40,
  xpPorNivel: 500,
  desafios: [
    ...DESAFIOS_DIARIOS.map(d => ({ ...d, status: 'available' as const, progresso: 0 })),
    ...DESAFIOS_SEMANAIS.map(d => ({ ...d, status: 'available' as const, progresso: 0 })),
    ...DESAFIOS_ESPECIAIS.map(d => ({ ...d, status: 'available' as const, progresso: 0 })),
  ],
  recompensasFree: RECOMPENSAS_FREE.map(r => ({ ...r, status: 'locked' as const })),
  recompensasPremium: RECOMPENSAS_PREMIUM.map(r => ({ ...r, status: 'locked' as const })),
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export function getDesafiosByTipo(tipo: ChallengeType): SeasonChallenge[] {
  return SEASON_T1.desafios.filter(d => d.tipo === tipo);
}

export function getRecompensasByNivel(nivel: number): { free: SeasonReward | undefined; premium: SeasonReward | undefined } {
  return {
    free: SEASON_T1.recompensasFree.find(r => r.nivel === nivel),
    premium: SEASON_T1.recompensasPremium.find(r => r.nivel === nivel),
  };
}

export function calcularNivelPorSFP(SFP: number): number {
  return Math.floor(SFP / SEASON_T1.xpPorNivel) + 1;
}

export function calcularSFPParaProximoNivel(SFPAtual: number): number {
  const nivelAtual = calcularNivelPorSFP(SFPAtual);
  const SFPProximoNivel = nivelAtual * SEASON_T1.xpPorNivel;
  return SFPProximoNivel - SFPAtual;
}

export function calcularProgressoNivel(SFPAtual: number): number {
  const SFPNoNivel = SFPAtual % SEASON_T1.xpPorNivel;
  return (SFPNoNivel / SEASON_T1.xpPorNivel) * 100;
}

// ============================================
// EXPORT DEFAULT
// ============================================

export default SEASON_T1;
