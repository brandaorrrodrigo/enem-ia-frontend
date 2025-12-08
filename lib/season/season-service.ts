/**
 * ENEM PRO - Season Service
 * Gerenciamento de temporadas, progresso e recompensas
 */

import {
  Season,
  SeasonChallenge,
  SeasonReward,
  PlayerSeasonProgress,
  SFPTransaction,
  SeasonLeaderboard,
  SeasonLeaderboardEntry,
  SeasonBoost,
  SeasonInfoResponse,
  ClaimRewardResponse,
  UpdateProgressResponse,
  CompleteChallengeResponse,
  ChallengeType,
  SEASON_CONFIG,
} from './types';

import SEASON_T1, {
  calcularNivelPorSFP,
  calcularSFPParaProximoNivel,
  calcularProgressoNivel,
  getRecompensasByNivel,
} from './season-data';

// ============================================
// ARMAZENAMENTO EM MEMÓRIA (Simulado)
// Em produção, usar banco de dados
// ============================================

const playerProgress: Map<string, PlayerSeasonProgress> = new Map();
const SFPTransactions: Map<string, SFPTransaction[]> = new Map();
const activeBoosts: Map<string, SeasonBoost[]> = new Map();

// ============================================
// INICIALIZAÇÃO
// ============================================

function initializePlayerProgress(odder: string, seasonId: string): PlayerSeasonProgress {
  const now = new Date().toISOString();
  const progress: PlayerSeasonProgress = {
    odder,
    seasonId,
    nivelAtual: 1,
    SFPAtual: 0,
    SFPTotal: 0,
    isPremium: false,
    desafiosCompletados: [],
    recompensasColetadas: [],
    ultimoResetDiario: now,
    ultimoResetSemanal: now,
    streakDiario: 0,
    dataInicio: now,
  };
  playerProgress.set(`${odder}_${seasonId}`, progress);
  return progress;
}

// ============================================
// SEASON SERVICE
// ============================================

class SeasonService {
  private currentSeason: Season;

  constructor() {
    this.currentSeason = this.loadCurrentSeason();
  }

  // ============================================
  // CARREGAMENTO DA TEMPORADA
  // ============================================

  private loadCurrentSeason(): Season {
    const now = new Date();
    const inicio = new Date(SEASON_T1.dataInicio);
    const fim = new Date(SEASON_T1.dataFim);

    let status: 'upcoming' | 'active' | 'ended' = 'upcoming';
    if (now >= inicio && now <= fim) {
      status = 'active';
    } else if (now > fim) {
      status = 'ended';
    }

    return { ...SEASON_T1, status };
  }

  getCurrentSeason(): Season {
    return this.currentSeason;
  }

  getSeasonTimeRemaining(): number {
    const fim = new Date(this.currentSeason.dataFim);
    const now = new Date();
    return Math.max(0, fim.getTime() - now.getTime());
  }

  // ============================================
  // PROGRESSO DO JOGADOR
  // ============================================

  getPlayerProgress(odder: string): PlayerSeasonProgress {
    const key = `${odder}_${this.currentSeason.id}`;
    let progress = playerProgress.get(key);

    if (!progress) {
      progress = initializePlayerProgress(odder, this.currentSeason.id);
    }

    // Verificar reset diário/semanal
    this.checkAndResetChallenges(progress);

    return progress;
  }

  private checkAndResetChallenges(progress: PlayerSeasonProgress): void {
    const now = new Date();
    const lastDaily = new Date(progress.ultimoResetDiario);
    const lastWeekly = new Date(progress.ultimoResetSemanal);

    // Reset diário (meia-noite)
    if (now.toDateString() !== lastDaily.toDateString()) {
      // Verificar streak
      const ontem = new Date(now);
      ontem.setDate(ontem.getDate() - 1);
      if (lastDaily.toDateString() === ontem.toDateString()) {
        progress.streakDiario += 1;
      } else {
        progress.streakDiario = 0;
      }

      // Remover desafios diários completados do registro
      progress.desafiosCompletados = progress.desafiosCompletados.filter(
        id => !id.startsWith('daily_')
      );
      progress.ultimoResetDiario = now.toISOString();
    }

    // Reset semanal (segunda-feira)
    const daysSinceMonday = (now.getDay() + 6) % 7;
    const thisMonday = new Date(now);
    thisMonday.setDate(now.getDate() - daysSinceMonday);
    thisMonday.setHours(0, 0, 0, 0);

    if (lastWeekly < thisMonday) {
      progress.desafiosCompletados = progress.desafiosCompletados.filter(
        id => !id.startsWith('weekly_')
      );
      progress.ultimoResetSemanal = now.toISOString();
    }

    // Salvar alterações
    const key = `${progress.odder}_${progress.seasonId}`;
    playerProgress.set(key, progress);
  }

  // ============================================
  // SISTEMA DE SFP
  // ============================================

  addSFP(odder: string, quantidade: number, fonte: string, descricao: string): UpdateProgressResponse {
    const progress = this.getPlayerProgress(odder);
    const nivelAnterior = progress.nivelAtual;

    // Aplicar boosts ativos
    const multiplier = this.getActiveBoostMultiplier(odder, 'SFP');
    const SFPFinal = Math.floor(quantidade * multiplier);

    progress.SFPAtual += SFPFinal;
    progress.SFPTotal += SFPFinal;
    progress.nivelAtual = calcularNivelPorSFP(progress.SFPTotal);

    // Registrar transação
    const transaction: SFPTransaction = {
      id: `SFP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      odder,
      seasonId: this.currentSeason.id,
      quantidade: SFPFinal,
      fonte,
      descricao,
      timestamp: new Date().toISOString(),
    };

    const transactions = SFPTransactions.get(odder) || [];
    transactions.push(transaction);
    SFPTransactions.set(odder, transactions);

    // Verificar se subiu de nível
    const subiuDeNivel = progress.nivelAtual > nivelAnterior;
    let novasRecompensas: SeasonReward[] | undefined;

    if (subiuDeNivel) {
      // Desbloquear recompensas dos novos níveis
      novasRecompensas = [];
      for (let nivel = nivelAnterior + 1; nivel <= progress.nivelAtual; nivel++) {
        const recompensas = getRecompensasByNivel(nivel);
        if (recompensas.free) {
          novasRecompensas.push({ ...recompensas.free, status: 'available' });
        }
        if (recompensas.premium && progress.isPremium) {
          novasRecompensas.push({ ...recompensas.premium, status: 'available' });
        }
      }
    }

    // Salvar progresso
    const key = `${odder}_${this.currentSeason.id}`;
    playerProgress.set(key, progress);

    return {
      success: true,
      SFPGanho: SFPFinal,
      SFPTotal: progress.SFPTotal,
      nivelAtual: progress.nivelAtual,
      nivelAnterior,
      subiuDeNivel,
      novasRecompensas,
    };
  }

  getSFPHistory(odder: string, limit: number = 50): SFPTransaction[] {
    const transactions = SFPTransactions.get(odder) || [];
    return transactions.slice(-limit).reverse();
  }

  // ============================================
  // SISTEMA DE DESAFIOS
  // ============================================

  getActiveChallenges(odder: string): SeasonChallenge[] {
    const progress = this.getPlayerProgress(odder);
    const now = new Date();

    return this.currentSeason.desafios.map(desafio => {
      const isCompleted = progress.desafiosCompletados.includes(desafio.id);

      // Verificar status
      let status = desafio.status;
      if (isCompleted) {
        status = 'completed';
      } else if (desafio.dataExpiracao && new Date(desafio.dataExpiracao) < now) {
        status = 'locked';
      }

      // Buscar progresso do desafio
      const challengeProgress = this.getChallengeProgress(odder, desafio.id);

      return {
        ...desafio,
        status,
        progresso: challengeProgress,
      };
    });
  }

  getChallengesByType(odder: string, tipo: ChallengeType): SeasonChallenge[] {
    return this.getActiveChallenges(odder).filter(c => c.tipo === tipo);
  }

  private getChallengeProgress(odder: string, challengeId: string): number {
    // Em produção, buscar do banco de dados
    // Por enquanto, retornar 0
    return 0;
  }

  updateChallengeProgress(
    odder: string,
    challengeId: string,
    incremento: number = 1
  ): CompleteChallengeResponse {
    const progress = this.getPlayerProgress(odder);
    const desafio = this.currentSeason.desafios.find(d => d.id === challengeId);

    if (!desafio) {
      return { success: false, SFPGanho: 0, error: 'Desafio não encontrado' };
    }

    if (progress.desafiosCompletados.includes(challengeId)) {
      return { success: false, SFPGanho: 0, error: 'Desafio já completado' };
    }

    // Atualizar progresso
    const novoProgresso = Math.min(desafio.meta, (desafio.progresso || 0) + incremento);

    if (novoProgresso >= desafio.meta) {
      // Completou o desafio
      progress.desafiosCompletados.push(challengeId);

      // Adicionar SFP
      const SFPResult = this.addSFP(
        odder,
        desafio.SFPRecompensa,
        challengeId,
        `Desafio completado: ${desafio.titulo}`
      );

      // Verificar desafio especial de streak
      if (desafio.tipo === 'daily' && progress.streakDiario > 0) {
        const streakChallenge = this.currentSeason.desafios.find(
          d => d.id === 'special_streak_7'
        );
        if (streakChallenge && progress.streakDiario >= streakChallenge.meta) {
          this.updateChallengeProgress(odder, 'special_streak_7', 1);
        }
      }

      const key = `${odder}_${this.currentSeason.id}`;
      playerProgress.set(key, progress);

      return {
        success: true,
        challenge: { ...desafio, status: 'completed', progresso: novoProgresso },
        SFPGanho: desafio.SFPRecompensa,
        novoNivel: SFPResult.subiuDeNivel ? SFPResult.nivelAtual : undefined,
      };
    }

    return {
      success: true,
      challenge: { ...desafio, progresso: novoProgresso },
      SFPGanho: 0,
    };
  }

  // ============================================
  // SISTEMA DE RECOMPENSAS
  // ============================================

  getAvailableRewards(odder: string): { free: SeasonReward[]; premium: SeasonReward[] } {
    const progress = this.getPlayerProgress(odder);

    const free = this.currentSeason.recompensasFree.map(reward => {
      let status = reward.status;
      if (progress.recompensasColetadas.includes(reward.id)) {
        status = 'claimed';
      } else if (progress.nivelAtual >= reward.nivel) {
        status = 'available';
      }
      return { ...reward, status };
    });

    const premium = this.currentSeason.recompensasPremium.map(reward => {
      let status = reward.status;
      if (progress.recompensasColetadas.includes(reward.id)) {
        status = 'claimed';
      } else if (progress.nivelAtual >= reward.nivel && progress.isPremium) {
        status = 'available';
      }
      return { ...reward, status };
    });

    return { free, premium };
  }

  claimReward(odder: string, rewardId: string): ClaimRewardResponse {
    const progress = this.getPlayerProgress(odder);

    // Buscar recompensa
    let reward = this.currentSeason.recompensasFree.find(r => r.id === rewardId);
    let isPremiumReward = false;

    if (!reward) {
      reward = this.currentSeason.recompensasPremium.find(r => r.id === rewardId);
      isPremiumReward = true;
    }

    if (!reward) {
      return { success: false, error: 'Recompensa não encontrada' };
    }

    // Verificar se já coletou
    if (progress.recompensasColetadas.includes(rewardId)) {
      return { success: false, error: 'Recompensa já coletada' };
    }

    // Verificar nível
    if (progress.nivelAtual < reward.nivel) {
      return { success: false, error: 'Nível insuficiente' };
    }

    // Verificar premium
    if (isPremiumReward && !progress.isPremium) {
      return { success: false, error: 'Requer passe premium' };
    }

    // Coletar recompensa
    progress.recompensasColetadas.push(rewardId);

    // Aplicar efeito da recompensa
    this.applyRewardEffect(odder, reward);

    const key = `${odder}_${this.currentSeason.id}`;
    playerProgress.set(key, progress);

    return {
      success: true,
      reward: { ...reward, status: 'claimed' },
      novoNivel: progress.nivelAtual,
      novoSFP: progress.SFPTotal,
    };
  }

  private applyRewardEffect(odder: string, reward: SeasonReward): void {
    switch (reward.tipo) {
      case 'fp':
        // Adicionar FP (integrar com sistema de FP)
        console.log(`Adicionando ${reward.valor} FP para ${odder}`);
        break;

      case 'boost':
        // Ativar boost
        if (reward.valor && reward.valor > 0) {
          const boost: SeasonBoost = {
            id: `boost_${Date.now()}`,
            tipo: 'SFP',
            multiplicador: 1.5, // Exemplo: 50% a mais
            duracao: reward.valor,
            ativoAte: new Date(Date.now() + reward.valor * 60 * 60 * 1000).toISOString(),
          };
          const boosts = activeBoosts.get(odder) || [];
          boosts.push(boost);
          activeBoosts.set(odder, boosts);
        }
        break;

      case 'desconto':
        // Registrar desconto na loja
        console.log(`Desconto de ${reward.valor}% ativado para ${odder}`);
        break;

      default:
        // Itens cosméticos são salvos no perfil
        console.log(`Item ${reward.tipo} ${reward.nome} adicionado ao inventário de ${odder}`);
    }
  }

  // ============================================
  // SISTEMA DE BOOSTS
  // ============================================

  getActiveBoosts(odder: string): SeasonBoost[] {
    const boosts = activeBoosts.get(odder) || [];
    const now = new Date();

    // Filtrar boosts expirados
    const activeOnly = boosts.filter(b => !b.ativoAte || new Date(b.ativoAte) > now);
    activeBoosts.set(odder, activeOnly);

    return activeOnly;
  }

  getActiveBoostMultiplier(odder: string, tipo: 'SFP' | 'fp' | 'disciplina'): number {
    const boosts = this.getActiveBoosts(odder).filter(b => b.tipo === tipo);
    if (boosts.length === 0) return 1;

    // Usar o maior multiplicador
    return Math.max(...boosts.map(b => b.multiplicador));
  }

  // ============================================
  // PREMIUM
  // ============================================

  upgradeToPremium(odder: string): boolean {
    const progress = this.getPlayerProgress(odder);
    if (progress.isPremium) return false;

    progress.isPremium = true;
    progress.premiumCompradoEm = new Date().toISOString();

    const key = `${odder}_${this.currentSeason.id}`;
    playerProgress.set(key, progress);

    return true;
  }

  // ============================================
  // LEADERBOARD
  // ============================================

  getLeaderboard(limit: number = 100): SeasonLeaderboard {
    const entries: SeasonLeaderboardEntry[] = [];

    playerProgress.forEach((progress, key) => {
      if (key.endsWith(`_${this.currentSeason.id}`)) {
        entries.push({
          posicao: 0, // Será calculado depois
          odder: progress.odder,
          nome: progress.odder, // Em produção, buscar nome do usuário
          nivelAtual: progress.nivelAtual,
          SFPTotal: progress.SFPTotal,
          isPremium: progress.isPremium,
        });
      }
    });

    // Ordenar por SFP
    entries.sort((a, b) => b.SFPTotal - a.SFPTotal);

    // Atribuir posições
    entries.forEach((entry, index) => {
      entry.posicao = index + 1;
    });

    return {
      seasonId: this.currentSeason.id,
      ranking: entries.slice(0, limit),
      totalJogadores: entries.length,
      atualizadoEm: new Date().toISOString(),
    };
  }

  // ============================================
  // INFO COMPLETA
  // ============================================

  getSeasonInfo(odder: string): SeasonInfoResponse {
    const progress = this.getPlayerProgress(odder);
    const desafiosAtivos = this.getActiveChallenges(odder).filter(
      c => c.status === 'available' || c.status === 'in_progress'
    );

    const rewards = this.getAvailableRewards(odder);
    const proximasRecompensas: SeasonReward[] = [];

    // Pegar próximas 3 recompensas disponíveis
    for (const reward of [...rewards.free, ...rewards.premium]) {
      if (reward.status === 'available') {
        proximasRecompensas.push(reward);
        if (proximasRecompensas.length >= 3) break;
      }
    }

    return {
      season: this.currentSeason,
      progresso: progress,
      desafiosAtivos,
      proximasRecompensas,
      tempoRestante: this.getSeasonTimeRemaining(),
    };
  }

  // ============================================
  // RESET (DEBUG)
  // ============================================

  resetPlayerProgress(odder: string): void {
    const key = `${odder}_${this.currentSeason.id}`;
    playerProgress.delete(key);
    SFPTransactions.delete(odder);
    activeBoosts.delete(odder);
  }
}

// ============================================
// EXPORT SINGLETON
// ============================================

export const seasonService = new SeasonService();
export default seasonService;
