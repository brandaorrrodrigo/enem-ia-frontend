/**
 * ENEM PRO - BattleService v2.0 FINAL
 * Camada de serviço para lógica de negócios das batalhas
 * Inclui: reconexão, anti-cheat, métricas, ligas, paginação
 */

import {
  BattleRecord,
  BattleHistory,
  BattleParticipant,
  BattleMode,
  BattleChatMessage,
  RematchRequest,
  LeagueProgress,
  HistoryPaginationParams,
  BATTLE_FP_REWARDS,
  BATTLE_COSTS,
  BATTLE_BADGES,
  ANTI_CHEAT_CONFIG,
  RECONNECTION_CONFIG,
  LEAGUE_BATTLE_POINTS,
  LEAGUES,
  ArenaWeeklyEntry,
  ArenaWeeklyData,
  DEFAULT_PARTICIPANT,
} from './types';

// ============================================
// BATTLE SERVICE - SINGLETON
// ============================================

class BattleService {
  private static instance: BattleService;
  private battleHistory: Map<string, BattleRecord[]> = new Map();
  private arenaWeekly: Map<string, ArenaWeeklyEntry> = new Map();
  private weekStart: Date = new Date();
  private weekEnd: Date = new Date();
  private dailyBattles: Map<string, { date: string; count: number }> = new Map();
  private playerLeaguePoints: Map<string, number> = new Map();
  private rematchRequests: Map<string, RematchRequest> = new Map();
  private chatRateLimits: Map<string, { count: number; resetAt: number }> = new Map();
  private disconnectedPlayers: Map<string, { roomCode: string; disconnectedAt: number; attempts: number }> = new Map();

  private constructor() {
    this.resetWeek();
    // Cleanup interval
    setInterval(() => this.cleanupExpiredData(), 60000);
  }

  static getInstance(): BattleService {
    if (!BattleService.instance) {
      BattleService.instance = new BattleService();
    }
    return BattleService.instance;
  }

  // ============================================
  // CLEANUP
  // ============================================

  private cleanupExpiredData(): void {
    const now = Date.now();

    // Cleanup disconnected players past grace period
    for (const [playerId, data] of this.disconnectedPlayers) {
      if (now - data.disconnectedAt > RECONNECTION_CONFIG.technicalDefeatAfter) {
        this.disconnectedPlayers.delete(playerId);
      }
    }

    // Cleanup old rematch requests
    for (const [roomCode, request] of this.rematchRequests) {
      if (now - request.timestamp > 300000) { // 5 minutes
        this.rematchRequests.delete(roomCode);
      }
    }

    // Cleanup chat rate limits
    for (const [odder, data] of this.chatRateLimits) {
      if (now > data.resetAt) {
        this.chatRateLimits.delete(odder);
      }
    }
  }

  // ============================================
  // WEEKLY RESET
  // ============================================

  private resetWeek(): void {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    this.weekStart = new Date(now.setDate(diff));
    this.weekStart.setHours(0, 0, 0, 0);

    this.weekEnd = new Date(this.weekStart);
    this.weekEnd.setDate(this.weekEnd.getDate() + 6);
    this.weekEnd.setHours(23, 59, 59, 999);
  }

  private isCurrentWeek(): boolean {
    const now = new Date();
    return now >= this.weekStart && now <= this.weekEnd;
  }

  // ============================================
  // FP CALCULATION v2.0
  // ============================================

  calculateBattleRewards(
    playerId: string,
    isWinner: boolean,
    isDraw: boolean,
    correctAnswers: number,
    totalQuestions: number,
    mode: BattleMode,
    isPremium: boolean,
    streaks: number[],
    responseTimes: number[],
    wasComeback: boolean,
    wasFirstBlood: boolean = false,
    isTechnicalWin: boolean = false,
    isTransmitted: boolean = false
  ): number {
    let fp = 0;

    // Base reward by mode
    const modeRewards: Record<BattleMode, { victory: number; defeat: number; draw: number }> = {
      classic: {
        victory: BATTLE_FP_REWARDS.classicVictory,
        defeat: BATTLE_FP_REWARDS.classicDefeat,
        draw: BATTLE_FP_REWARDS.classicDraw,
      },
      turbo: {
        victory: BATTLE_FP_REWARDS.turboVictory,
        defeat: BATTLE_FP_REWARDS.turboDefeat,
        draw: BATTLE_FP_REWARDS.turboDraw,
      },
      marathon: {
        victory: BATTLE_FP_REWARDS.marathonVictory,
        defeat: BATTLE_FP_REWARDS.marathonDefeat,
        draw: BATTLE_FP_REWARDS.marathonDraw,
      },
      transmitido: {
        victory: BATTLE_FP_REWARDS.transmitidoVictory,
        defeat: BATTLE_FP_REWARDS.transmitidoDefeat,
        draw: BATTLE_FP_REWARDS.transmitidoDraw,
      },
    };

    const rewards = modeRewards[mode];
    if (isWinner) fp += rewards.victory;
    else if (isDraw) fp += rewards.draw;
    else fp += rewards.defeat;

    // Technical win bonus
    if (isTechnicalWin && isWinner) {
      fp += BATTLE_FP_REWARDS.technicalWin;
    }

    // Perfect victory bonus
    if (isWinner && correctAnswers === totalQuestions) {
      fp += BATTLE_FP_REWARDS.perfectVictory;
    }

    // Streak bonuses
    const maxStreak = Math.max(...streaks, 0);
    if (maxStreak >= 10) {
      fp += BATTLE_FP_REWARDS.streak10;
    } else if (maxStreak >= 5) {
      fp += BATTLE_FP_REWARDS.streak5;
    } else if (maxStreak >= 3) {
      fp += BATTLE_FP_REWARDS.streak3;
    }

    // Quick answer bonus (< 5 seconds)
    const quickAnswers = responseTimes.filter(t => t < 5000).length;
    fp += quickAnswers * BATTLE_FP_REWARDS.quickAnswer;

    // First blood bonus
    if (wasFirstBlood) {
      fp += BATTLE_FP_REWARDS.firstBlood;
    }

    // Comeback bonus
    if (wasComeback && isWinner) {
      fp += BATTLE_FP_REWARDS.comeback;
    }

    // Transmitted battle multiplier
    if (isTransmitted) {
      fp = Math.floor(fp * BATTLE_FP_REWARDS.transmittedMultiplier);
    }

    // Weekend multiplier
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      fp = Math.floor(fp * BATTLE_FP_REWARDS.weekendMultiplier);
    }

    // Premium multiplier
    if (isPremium) {
      fp = Math.floor(fp * BATTLE_FP_REWARDS.premiumMultiplier);
    }

    return fp;
  }

  // ============================================
  // BATTLE COST VALIDATION
  // ============================================

  canCreateBattle(
    playerId: string,
    mode: BattleMode,
    isInvite: boolean,
    isPremium: boolean,
    currentFP: number,
    isRematch: boolean = false
  ): { allowed: boolean; cost: number; reason?: string } {
    const today = new Date().toISOString().split('T')[0];
    const dailyData = this.dailyBattles.get(playerId);

    // Marathon mode has entry cost
    if (mode === 'marathon') {
      if (currentFP < BATTLE_COSTS.marathonEntry) {
        return {
          allowed: false,
          cost: BATTLE_COSTS.marathonEntry,
          reason: `Modo Maratona requer ${BATTLE_COSTS.marathonEntry} FP`
        };
      }
      return { allowed: true, cost: isPremium ? 0 : BATTLE_COSTS.marathonEntry };
    }

    // Check daily limit for classic mode
    if (mode === 'classic') {
      const dailyLimit = isPremium
        ? BATTLE_COSTS.classicFree + BATTLE_COSTS.premiumExtraBattles
        : BATTLE_COSTS.classicFree;

      if (dailyData?.date === today && dailyData.count >= dailyLimit) {
        return {
          allowed: false,
          cost: 0,
          reason: `Limite diário atingido (${dailyLimit} batalhas)`
        };
      }
    }

    // Check invite cost
    if (isInvite && !isPremium) {
      const cost = isRematch
        ? Math.floor(BATTLE_COSTS.inviteBattle * BATTLE_COSTS.rematchDiscount)
        : BATTLE_COSTS.inviteBattle;

      if (currentFP < cost) {
        return {
          allowed: false,
          cost,
          reason: `Saldo insuficiente. Precisa de ${cost} FP`
        };
      }
      return { allowed: true, cost };
    }

    return { allowed: true, cost: 0 };
  }

  registerBattleStart(playerId: string): void {
    const today = new Date().toISOString().split('T')[0];
    const dailyData = this.dailyBattles.get(playerId);

    if (dailyData?.date === today) {
      dailyData.count++;
    } else {
      this.dailyBattles.set(playerId, { date: today, count: 1 });
    }
  }

  // ============================================
  // RECONNECTION SYSTEM
  // ============================================

  registerDisconnection(playerId: string, roomCode: string): void {
    this.disconnectedPlayers.set(playerId, {
      roomCode,
      disconnectedAt: Date.now(),
      attempts: 0
    });
  }

  attemptReconnection(playerId: string, roomCode: string): {
    success: boolean;
    remainingTime: number;
    isTechnicalDefeat: boolean;
  } {
    const data = this.disconnectedPlayers.get(playerId);

    if (!data || data.roomCode !== roomCode) {
      return { success: false, remainingTime: 0, isTechnicalDefeat: true };
    }

    const elapsed = Date.now() - data.disconnectedAt;

    if (elapsed > RECONNECTION_CONFIG.technicalDefeatAfter) {
      this.disconnectedPlayers.delete(playerId);
      return { success: false, remainingTime: 0, isTechnicalDefeat: true };
    }

    if (data.attempts >= RECONNECTION_CONFIG.maxAttempts) {
      this.disconnectedPlayers.delete(playerId);
      return { success: false, remainingTime: 0, isTechnicalDefeat: true };
    }

    data.attempts++;

    if (elapsed <= RECONNECTION_CONFIG.gracePeriod) {
      this.disconnectedPlayers.delete(playerId);
      return {
        success: true,
        remainingTime: RECONNECTION_CONFIG.gracePeriod - elapsed,
        isTechnicalDefeat: false
      };
    }

    return {
      success: false,
      remainingTime: RECONNECTION_CONFIG.technicalDefeatAfter - elapsed,
      isTechnicalDefeat: false
    };
  }

  getReconnectionStatus(playerId: string): {
    isDisconnected: boolean;
    remainingTime: number;
    attempts: number;
  } | null {
    const data = this.disconnectedPlayers.get(playerId);
    if (!data) return null;

    const remaining = RECONNECTION_CONFIG.technicalDefeatAfter - (Date.now() - data.disconnectedAt);
    return {
      isDisconnected: true,
      remainingTime: Math.max(0, remaining),
      attempts: data.attempts
    };
  }

  // ============================================
  // ANTI-CHEAT VALIDATION
  // ============================================

  validateAnswer(
    responseTime: number,
    serverTimestamp: number,
    clientTimestamp: number
  ): { valid: boolean; reason?: string } {
    // Check minimum response time
    if (responseTime < ANTI_CHEAT_CONFIG.minResponseTime) {
      return { valid: false, reason: 'SUSPICIOUS_TIMING' };
    }

    // Check maximum response time
    if (responseTime > ANTI_CHEAT_CONFIG.maxResponseTime) {
      return { valid: false, reason: 'TIMEOUT' };
    }

    // Check sync tolerance
    const syncDiff = Math.abs(serverTimestamp - clientTimestamp);
    if (syncDiff > ANTI_CHEAT_CONFIG.syncTolerance) {
      return { valid: false, reason: 'SYNC_ERROR' };
    }

    return { valid: true };
  }

  randomizeAlternatives(alternativas: Record<string, string>): {
    randomized: Record<string, string>;
    order: string[];
  } {
    const entries = Object.entries(alternativas);
    const shuffled = entries.sort(() => Math.random() - 0.5);
    const letters = ['A', 'B', 'C', 'D', 'E'];

    const randomized: Record<string, string> = {};
    const order: string[] = [];

    shuffled.forEach(([originalLetter, text], index) => {
      const newLetter = letters[index];
      randomized[newLetter] = text;
      order.push(originalLetter);
    });

    return { randomized, order };
  }

  getDelayedQuestion(question: object, delay: number = ANTI_CHEAT_CONFIG.spectatorDelay): Promise<object> {
    return new Promise(resolve => {
      setTimeout(() => resolve(question), delay);
    });
  }

  // ============================================
  // CHAT RATE LIMITING
  // ============================================

  canSendChatMessage(odder: string): { allowed: boolean; cooldownMs: number } {
    const now = Date.now();
    const data = this.chatRateLimits.get(odder);

    if (!data || now > data.resetAt) {
      this.chatRateLimits.set(odder, {
        count: 1,
        resetAt: now + 10000 // 10 second window
      });
      return { allowed: true, cooldownMs: 0 };
    }

    if (data.count >= ANTI_CHEAT_CONFIG.chatRateLimit) {
      return { allowed: false, cooldownMs: data.resetAt - now };
    }

    data.count++;
    return { allowed: true, cooldownMs: 0 };
  }

  validateChatMessage(message: string): { valid: boolean; reason?: string } {
    if (message.length > ANTI_CHEAT_CONFIG.maxChatLength) {
      return { valid: false, reason: 'MESSAGE_TOO_LONG' };
    }

    const lowerMessage = message.toLowerCase();
    for (const word of ANTI_CHEAT_CONFIG.bannedWords) {
      if (lowerMessage.includes(word)) {
        return { valid: false, reason: 'BANNED_WORD' };
      }
    }

    return { valid: true };
  }

  // ============================================
  // BATTLE RECORD
  // ============================================

  recordBattle(record: BattleRecord): void {
    // Add to player 1 history
    const p1History = this.battleHistory.get(record.user1.id) || [];
    p1History.unshift(record);
    this.battleHistory.set(record.user1.id, p1History.slice(0, 500));

    // Add to player 2 history
    const p2History = this.battleHistory.get(record.user2.id) || [];
    p2History.unshift(record);
    this.battleHistory.set(record.user2.id, p2History.slice(0, 500));

    // Update arena weekly
    this.updateArenaWeekly(record);

    // Update league points
    this.updateLeaguePoints(record);
  }

  // ============================================
  // HISTORY WITH PAGINATION
  // ============================================

  getPlayerHistory(playerId: string, params?: HistoryPaginationParams): BattleHistory {
    let battles = this.battleHistory.get(playerId) || [];
    const page = params?.page || 1;
    const limit = params?.limit || 10;

    // Apply filters
    if (params?.filterResult && params.filterResult !== 'all') {
      battles = battles.filter(b => {
        const isWinner = b.vencedor === playerId;
        const isDraw = b.vencedor === null;
        if (params.filterResult === 'victory') return isWinner;
        if (params.filterResult === 'defeat') return !isWinner && !isDraw;
        if (params.filterResult === 'draw') return isDraw;
        return true;
      });
    }

    if (params?.filterMode && params.filterMode !== 'all') {
      battles = battles.filter(b => b.mode === params.filterMode);
    }

    // Apply sorting
    if (params?.sortBy) {
      battles = [...battles].sort((a, b) => {
        let comparison = 0;
        if (params.sortBy === 'date') {
          comparison = new Date(b.data).getTime() - new Date(a.data).getTime();
        } else if (params.sortBy === 'fp') {
          const aFp = a.user1.id === playerId ? a.user1.fpGanho : a.user2.fpGanho;
          const bFp = b.user1.id === playerId ? b.user1.fpGanho : b.user2.fpGanho;
          comparison = bFp - aFp;
        } else if (params.sortBy === 'duration') {
          comparison = b.duracao - a.duracao;
        }
        return params.sortOrder === 'asc' ? -comparison : comparison;
      });
    }

    // Calculate stats
    let totalVitorias = 0;
    let totalDerrotas = 0;
    let totalEmpates = 0;
    let totalFPGanho = 0;
    let currentStreak = 0;
    let maxWinStreak = 0;
    let totalResponseTime = 0;
    let totalPlayTime = 0;
    const modeCount: Record<string, number> = {};

    const allBattles = this.battleHistory.get(playerId) || [];
    for (const battle of allBattles) {
      const isUser1 = battle.user1.id === playerId;
      const participant = isUser1 ? battle.user1 : battle.user2;

      totalFPGanho += participant.fpGanho;
      totalResponseTime += participant.tempoMedio;
      totalPlayTime += battle.duracao;
      modeCount[battle.mode] = (modeCount[battle.mode] || 0) + 1;

      if (battle.vencedor === null) {
        totalEmpates++;
        currentStreak = 0;
      } else if (battle.vencedor === playerId) {
        totalVitorias++;
        currentStreak++;
        maxWinStreak = Math.max(maxWinStreak, currentStreak);
      } else {
        totalDerrotas++;
        currentStreak = 0;
      }
    }

    // Pagination
    const totalBattles = battles.length;
    const totalPages = Math.ceil(totalBattles / limit);
    const startIndex = (page - 1) * limit;
    const paginatedBattles = battles.slice(startIndex, startIndex + limit);

    // Find favorite mode
    let favoriteMode: BattleMode | undefined;
    let maxCount = 0;
    for (const [mode, count] of Object.entries(modeCount)) {
      if (count > maxCount) {
        maxCount = count;
        favoriteMode = mode as BattleMode;
      }
    }

    return {
      battles: paginatedBattles,
      totalVitorias,
      totalDerrotas,
      totalEmpates,
      totalFPGanho,
      winStreak: currentStreak,
      maxWinStreak,
      avgResponseTime: allBattles.length > 0 ? Math.round(totalResponseTime / allBattles.length) : 0,
      totalPlayTime,
      lastBattle: allBattles[0]?.data,
      favoriteMode,
      page,
      totalPages,
      totalBattles,
      hasMore: page < totalPages,
    };
  }

  // ============================================
  // ARENA WEEKLY
  // ============================================

  private updateArenaWeekly(record: BattleRecord): void {
    if (!this.isCurrentWeek()) {
      this.resetWeek();
      this.arenaWeekly.clear();
    }

    this.updatePlayerArenaEntry(record.user1.id, record.user1.name, record);
    this.updatePlayerArenaEntry(record.user2.id, record.user2.name, record);
  }

  private updatePlayerArenaEntry(
    odder: string,
    playerName: string,
    record: BattleRecord
  ): void {
    const existing = this.arenaWeekly.get(odder) || {
      rank: 0,
      odder,
      playerName,
      league: this.getPlayerLeague(odder),
      vitorias: 0,
      derrotas: 0,
      winRate: 0,
      fpGanho: 0,
      perfectWins: 0,
      avgResponseTime: 0,
      totalPlayTime: 0,
      comebacks: 0,
    };

    const isUser1 = record.user1.id === odder;
    const participant = isUser1 ? record.user1 : record.user2;
    const isWinner = record.vencedor === odder;
    const isDraw = record.vencedor === null;

    if (isWinner) {
      existing.vitorias++;
      if (participant.perfectRound) {
        existing.perfectWins++;
      }
      if (participant.comebackAchieved) {
        existing.comebacks++;
      }
    } else if (!isDraw) {
      existing.derrotas++;
    }

    existing.fpGanho += participant.fpGanho;
    existing.totalPlayTime += record.duracao;

    // Update average response time
    const totalBattles = existing.vitorias + existing.derrotas;
    if (totalBattles > 0) {
      existing.avgResponseTime = Math.round(
        (existing.avgResponseTime * (totalBattles - 1) + participant.tempoMedio) / totalBattles
      );
    }

    existing.winRate = existing.vitorias / (existing.vitorias + existing.derrotas) * 100 || 0;

    this.arenaWeekly.set(odder, existing);
  }

  getArenaWeeklyData(odder?: string): ArenaWeeklyData {
    if (!this.isCurrentWeek()) {
      this.resetWeek();
      this.arenaWeekly.clear();
    }

    const entries = Array.from(this.arenaWeekly.values())
      .sort((a, b) => {
        if (b.vitorias !== a.vitorias) return b.vitorias - a.vitorias;
        if (b.winRate !== a.winRate) return b.winRate - a.winRate;
        return b.fpGanho - a.fpGanho;
      })
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    const myEntry = odder ? entries.find(e => e.odder === odder) : undefined;
    const myRank = myEntry?.rank;

    return {
      weekStart: this.weekStart,
      weekEnd: this.weekEnd,
      entries: entries.slice(0, 100),
      myRank,
      myEntry,
      topRewards: [
        { rank: 1, fpBonus: BATTLE_FP_REWARDS.arenaTop1, badge: BATTLE_BADGES.arenaChampion.id },
        { rank: 2, fpBonus: BATTLE_FP_REWARDS.arenaTop3 },
        { rank: 3, fpBonus: BATTLE_FP_REWARDS.arenaTop3 },
        { rank: 10, fpBonus: BATTLE_FP_REWARDS.arenaTop10, badge: BATTLE_BADGES.campeaoArena.id },
      ],
      totalParticipants: entries.length,
    };
  }

  // ============================================
  // LEAGUE INTEGRATION
  // ============================================

  private updateLeaguePoints(record: BattleRecord): void {
    const updatePlayer = (odder: string, isWinner: boolean, isPerfect: boolean) => {
      const currentPoints = this.playerLeaguePoints.get(odder) || 0;
      let pointsToAdd = 0;

      if (isWinner) {
        pointsToAdd += LEAGUE_BATTLE_POINTS.victory;
        if (isPerfect) {
          pointsToAdd += LEAGUE_BATTLE_POINTS.perfectVictory - LEAGUE_BATTLE_POINTS.victory;
        }
      }

      this.playerLeaguePoints.set(odder, currentPoints + pointsToAdd);
    };

    const user1Winner = record.vencedor === record.user1.id;
    const user2Winner = record.vencedor === record.user2.id;

    updatePlayer(record.user1.id, user1Winner, record.user1.perfectRound);
    updatePlayer(record.user2.id, user2Winner, record.user2.perfectRound);
  }

  getPlayerLeague(odder: string): string {
    const points = this.playerLeaguePoints.get(odder) || 0;

    for (let i = LEAGUES.length - 1; i >= 0; i--) {
      if (points >= LEAGUES[i].minPoints) {
        return LEAGUES[i].name;
      }
    }

    return 'Bronze';
  }

  getLeagueProgress(odder: string): LeagueProgress {
    const points = this.playerLeaguePoints.get(odder) || 0;
    let currentLeague: typeof LEAGUES[number] = LEAGUES[0];
    let nextLeague: typeof LEAGUES[number] = LEAGUES[1];

    for (let i = LEAGUES.length - 1; i >= 0; i--) {
      if (points >= LEAGUES[i].minPoints) {
        currentLeague = LEAGUES[i];
        nextLeague = LEAGUES[i + 1] || LEAGUES[i];
        break;
      }
    }

    const pointsInLeague = points - currentLeague.minPoints;
    const pointsToNext = nextLeague.minPoints - currentLeague.minPoints;
    const percentToNext = pointsToNext > 0 ? (pointsInLeague / pointsToNext) * 100 : 100;

    const history = this.getPlayerHistory(odder);

    return {
      currentLeague: currentLeague.name,
      currentPoints: points,
      pointsToNextLeague: Math.max(0, nextLeague.minPoints - points),
      battleWinsContribution: history.totalVitorias * LEAGUE_BATTLE_POINTS.victory,
      percentToNext: Math.min(100, percentToNext),
    };
  }

  // ============================================
  // REMATCH SYSTEM
  // ============================================

  requestRematch(
    requesterId: string,
    originalRoomCode: string,
    fpCost: number
  ): RematchRequest {
    const request: RematchRequest = {
      requesterId,
      originalRoomCode,
      timestamp: Date.now(),
      accepted: false,
      fpCost,
    };

    this.rematchRequests.set(originalRoomCode, request);
    return request;
  }

  acceptRematch(originalRoomCode: string, newRoomCode: string): RematchRequest | null {
    const request = this.rematchRequests.get(originalRoomCode);
    if (!request) return null;

    request.accepted = true;
    request.newRoomCode = newRoomCode;
    return request;
  }

  getRematchRequest(originalRoomCode: string): RematchRequest | null {
    return this.rematchRequests.get(originalRoomCode) || null;
  }

  // ============================================
  // BADGE CHECKING
  // ============================================

  checkBadgeEligibility(odder: string): string[] {
    const history = this.getPlayerHistory(odder);
    const arena = this.getArenaWeeklyData(odder);
    const earnedBadges: string[] = [];

    // Guerreiro 1v1 - first win
    if (history.totalVitorias >= 1) {
      earnedBadges.push(BATTLE_BADGES.guerreiro1v1.id);
    }

    // Mestre 1v1 - 50 wins
    if (history.totalVitorias >= 50) {
      earnedBadges.push(BATTLE_BADGES.mestre1v1.id);
    }

    // Lenda 1v1 - 200 wins
    if (history.totalVitorias >= 200) {
      earnedBadges.push(BATTLE_BADGES.lenda1v1.id);
    }

    // Invicto - 5 win streak
    if (history.maxWinStreak >= 5) {
      earnedBadges.push(BATTLE_BADGES.invicto.id);
    }

    // Lendário - 10 win streak
    if (history.maxWinStreak >= 10) {
      earnedBadges.push(BATTLE_BADGES.lendario.id);
    }

    // Perfectionist - perfect win
    const perfectWins = history.battles.filter(b => {
      const isUser1 = b.user1.id === odder;
      const participant = isUser1 ? b.user1 : b.user2;
      return b.vencedor === odder && participant.perfectRound;
    }).length;

    if (perfectWins >= 1) {
      earnedBadges.push(BATTLE_BADGES.perfectionist.id);
    }

    if (perfectWins >= 10) {
      earnedBadges.push(BATTLE_BADGES.diamondPerfect.id);
    }

    // Arena badges
    if (arena.myRank === 1) {
      earnedBadges.push(BATTLE_BADGES.arenaChampion.id);
    }
    if (arena.myRank && arena.myRank <= 10) {
      earnedBadges.push(BATTLE_BADGES.campeaoArena.id);
    }

    // Mode-specific badges
    const turboWins = history.battles.filter(
      b => b.mode === 'turbo' && b.vencedor === odder
    ).length;
    if (turboWins >= 10) {
      earnedBadges.push(BATTLE_BADGES.speedDemon.id);
    }

    const marathonWins = history.battles.filter(
      b => b.mode === 'marathon' && b.vencedor === odder
    ).length;
    if (marathonWins >= 5) {
      earnedBadges.push(BATTLE_BADGES.marathoner.id);
    }

    // Broadcaster
    const hasTransmitted = history.battles.some(b => b.isTransmitted);
    if (hasTransmitted) {
      earnedBadges.push(BATTLE_BADGES.broadcaster.id);
    }

    // Famous Broadcaster - 50+ spectators
    const maxSpectators = Math.max(...history.battles.map(b => b.metadata.spectatorPeak), 0);
    if (maxSpectators >= 50) {
      earnedBadges.push(BATTLE_BADGES.famousBroadcaster.id);
    }

    // Comeback badge
    const hasComeback = history.battles.some(b => {
      const isUser1 = b.user1.id === odder;
      const participant = isUser1 ? b.user1 : b.user2;
      return b.vencedor === odder && participant.comebackAchieved;
    });
    if (hasComeback) {
      earnedBadges.push(BATTLE_BADGES.comeback.id);
    }

    // Quick draw badge
    let quickAnswers = 0;
    for (const battle of history.battles) {
      const isUser1 = battle.user1.id === odder;
      const participant = isUser1 ? battle.user1 : battle.user2;
      quickAnswers += participant.responseTimes.filter(t => t < 3000).length;
    }
    if (quickAnswers >= 5) {
      earnedBadges.push(BATTLE_BADGES.quickDraw.id);
    }

    // Consistent badge - avg response < 10s in 10 battles
    if (history.battles.length >= 10 && history.avgResponseTime < 10000) {
      earnedBadges.push(BATTLE_BADGES.consistent.id);
    }

    return earnedBadges;
  }

  // ============================================
  // SHARE MESSAGES
  // ============================================

  generateShareMessage(
    result: 'victory' | 'defeat' | 'draw',
    fpGanho: number,
    mode: BattleMode,
    league?: string,
    isPerfect?: boolean,
    streak?: number
  ): string {
    const messages = {
      victory: [
        'Venci uma batalha 1v1 no ENEM PRO!',
        'Desafiei e ganhei! Vem me enfrentar!',
        `Batalha insana! Ganhei +${fpGanho} FP!`,
        'Mais uma vitória na Arena! Quem é o próximo?',
        'Estudar é bom, ganhar é melhor ainda!',
      ],
      defeat: [
        'Perdi, mas aprendi! Bora revanche?',
        'Batalha difícil, mas continuo firme!',
        'Na próxima eu ganho! Aceita o desafio?',
      ],
      draw: [
        'Empate épico! Ninguém cedeu!',
        'Batalha equilibrada! Próximo round decide!',
        'Dignos adversários! Desempate já!',
      ],
    };

    const modeMessages: Record<BattleMode, string> = {
      turbo: ' [⚡ Turbo]',
      classic: '',
      marathon: ' [🏃 Maratona]',
      transmitido: ' [📺 AO VIVO]',
    };

    let base = messages[result][Math.floor(Math.random() * messages[result].length)];

    if (isPerfect && result === 'victory') {
      base = '💎 VITÓRIA PERFEITA! ' + base;
    }

    if (streak && streak >= 3) {
      base += ` 🔥${streak}x streak!`;
    }

    const leagueMessage = league ? ` Liga ${league}!` : '';

    return base + modeMessages[mode] + leagueMessage + '\n\n#ENEMPRO #Batalha1v1';
  }

  // ============================================
  // PARTICIPANT BUILDER
  // ============================================

  buildParticipant(
    odder: string,
    playerName: string,
    correctAnswers: number,
    totalQuestions: number,
    responseTimes: number[],
    fpGanho: number,
    streaks: number[],
    wasComeback: boolean = false,
    wasFirstBlood: boolean = false,
    technicalIssues: number = 0
  ): BattleParticipant {
    const totalTime = responseTimes.reduce((a, b) => a + b, 0);
    const avgTime = responseTimes.length > 0 ? totalTime / responseTimes.length : 0;

    return {
      ...DEFAULT_PARTICIPANT,
      id: odder,
      name: playerName,
      acertos: correctAnswers,
      tempoMedio: Math.round(avgTime),
      tempoTotal: totalTime,
      responseTimes: [...responseTimes],
      fpGanho,
      streak: Math.max(...streaks, 0),
      maxStreak: Math.max(...streaks, 0),
      perfectRound: correctAnswers === totalQuestions,
      connectionStatus: 'connected',
      comebackAchieved: wasComeback,
      firstBlood: wasFirstBlood,
      technicalIssues,
    } as BattleParticipant;
  }

  // ============================================
  // STATS SUMMARY
  // ============================================

  getPlayerStats(odder: string): {
    history: BattleHistory;
    arena: ArenaWeeklyData;
    league: LeagueProgress;
    badges: string[];
  } {
    return {
      history: this.getPlayerHistory(odder),
      arena: this.getArenaWeeklyData(odder),
      league: this.getLeagueProgress(odder),
      badges: this.checkBadgeEligibility(odder),
    };
  }
}

export const battleService = BattleService.getInstance();
