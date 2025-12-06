import { Badge, UserGamification } from '../types';

// XP E LEVEL
export function xpParaProximoLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function calcularLevel(xpTotal: number): number {
  let level = 1;
  let xpAcumulado = 0;
  while (xpAcumulado + xpParaProximoLevel(level) <= xpTotal) {
    xpAcumulado += xpParaProximoLevel(level);
    level++;
  }
  return level;
}

export function calcularXPSimulado(resultado: { acertos: number; total: number; tempoMinutos?: number }): number {
  const { acertos, total } = resultado;
  const porcentagem = (acertos / total) * 100;
  let xpBase = acertos * 10;
  if (porcentagem >= 90) xpBase += 100;
  else if (porcentagem >= 70) xpBase += 50;
  else if (porcentagem >= 50) xpBase += 25;
  return xpBase;
}

export function calcularPontosSimulado(resultado: { acertos: number; total: number }): number {
  const { acertos, total } = resultado;
  const porcentagem = (acertos / total) * 100;
  let pontos = acertos * 5;
  if (porcentagem >= 90) pontos += 50;
  else if (porcentagem >= 70) pontos += 25;
  else if (porcentagem >= 50) pontos += 10;
  return pontos;
}

export function verificarStreak(ultimoAcesso: string, streakAtual: number): { novoStreak: number; perdeuStreak: boolean; bonusStreak: number } {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const ultimo = new Date(ultimoAcesso);
  ultimo.setHours(0, 0, 0, 0);
  const diffDias = Math.floor((hoje.getTime() - ultimo.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDias === 0) return { novoStreak: streakAtual, perdeuStreak: false, bonusStreak: 0 };
  if (diffDias === 1) {
    const novoStreak = streakAtual + 1;
    const bonusStreak = novoStreak >= 7 ? 50 : novoStreak >= 3 ? 20 : 10;
    return { novoStreak, perdeuStreak: false, bonusStreak };
  }
  return { novoStreak: 1, perdeuStreak: true, bonusStreak: 0 };
}

export const BADGES_DISPONIVEIS: Badge[] = [
  { id: 'primeiro_simulado', nome: 'Primeiro Passo', descricao: 'Complete seu primeiro simulado', icone: '🎯', dataConquista: '', categoria: 'estudo' },
  { id: 'simulados_10', nome: 'Estudante Dedicado', descricao: 'Complete 10 simulados', icone: '📚', dataConquista: '', categoria: 'estudo' },
  { id: 'nota_700', nome: 'Aprovado!', descricao: 'Alcance nota 700', icone: '✅', dataConquista: '', categoria: 'desempenho' },
  { id: 'nota_900', nome: 'Excepcional', descricao: 'Alcance nota 900', icone: '🌟', dataConquista: '', categoria: 'desempenho' },
  { id: 'streak_7', nome: 'Uma Semana!', descricao: '7 dias de streak', icone: '📅', dataConquista: '', categoria: 'consistencia' },
  { id: 'nivel_10', nome: 'Nivel 10', descricao: 'Alcance nivel 10', icone: '🔟', dataConquista: '', categoria: 'especial' },
];

interface StatsVerificacao {
  totalSimulados: number;
  melhorNota: number;
  streak: number;
  level: number;
}

export function verificarBadges(stats: StatsVerificacao, badgesAtuais: Badge[]): Badge[] {
  const novosBadges: Badge[] = [];
  const badgesIds = badgesAtuais.map(b => b.id);
  const agora = new Date().toISOString();
  const verificacoes: { [key: string]: boolean } = {
    'primeiro_simulado': stats.totalSimulados >= 1,
    'simulados_10': stats.totalSimulados >= 10,
    'nota_700': stats.melhorNota >= 700,
    'nota_900': stats.melhorNota >= 900,
    'streak_7': stats.streak >= 7,
    'nivel_10': stats.level >= 10,
  };
  Object.entries(verificacoes).forEach(([id, conquistou]) => {
    if (conquistou && !badgesIds.includes(id)) {
      const badge = BADGES_DISPONIVEIS.find(b => b.id === id);
      if (badge) novosBadges.push({ ...badge, dataConquista: agora });
    }
  });
  return novosBadges;
}

export function determinarLiga(pontos: number): string {
  if (pontos >= 10000) return 'diamante';
  if (pontos >= 5000) return 'platina';
  if (pontos >= 2000) return 'ouro';
  if (pontos >= 500) return 'prata';
  return 'bronze';
}

export const LIGAS_CONFIG = {
  bronze: { cor: '#CD7F32', icone: '🥉', nome: 'Bronze' },
  prata: { cor: '#C0C0C0', icone: '🥈', nome: 'Prata' },
  ouro: { cor: '#FFD700', icone: '🥇', nome: 'Ouro' },
  platina: { cor: '#E5E4E2', icone: '💎', nome: 'Platina' },
  diamante: { cor: '#B9F2FF', icone: '👑', nome: 'Diamante' }
};

export function criarGamificationInicial(): UserGamification {
  return { xp: 0, level: 1, pontos: 0, streak: 0, badges: [], conquistas: [], posicaoRanking: 0 };
}

export function carregarGamification(): UserGamification {
  if (typeof window === 'undefined') return criarGamificationInicial();
  const xp = parseInt(localStorage.getItem('xp_total') || '0');
  const pontos = parseInt(localStorage.getItem('pontos_total') || '0');
  const streak = parseInt(localStorage.getItem('streak_atual') || '0');
  return { xp, level: calcularLevel(xp), pontos, streak, badges: [], conquistas: [], posicaoRanking: 0 };
}

export function salvarGamification(gamification: UserGamification): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('xp_total', String(gamification.xp));
  localStorage.setItem('pontos_total', String(gamification.pontos));
  localStorage.setItem('streak_atual', String(gamification.streak));
}
