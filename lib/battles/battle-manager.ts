/**
 * ENEM PRO - BattleManager v2.0 FINAL
 */

import {
  BattleState, BattlePlayer, BattleQuestion, BattleAnswer, BattleChatMessage,
  BattleConfig, BattleTransmission, BattleMode, SpectatorView, BattleRecord,
  BATTLE_MODE_CONFIGS, BATTLE_ERROR_CODES, DEFAULT_BATTLE_CONFIG,
} from './types';
import { battleService } from './battle-service';

class BattleManager {
  private static instance: BattleManager;
  private battles: Map<string, BattleState> = new Map();
  private questionsPool: BattleQuestion[] = [];
  private transmissions: Map<string, BattleTransmission> = new Map();

  private constructor() { setInterval(() => this.cleanupOldBattles(), 300000); }

  static getInstance(): BattleManager {
    if (!BattleManager.instance) BattleManager.instance = new BattleManager();
    return BattleManager.instance;
  }

  setQuestionsPool(questions: BattleQuestion[]): void { this.questionsPool = questions; }
  getQuestionsCount(): number { return this.questionsPool.length; }

  private getRandomQuestions(count: number): BattleQuestion[] {
    const shuffled = [...this.questionsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(q => ({ ...q, timeLimit: q.timeLimit || 30 }));
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  }

  createBattle(host: { id: string; nome: string; isPremium?: boolean }, config?: Partial<BattleConfig>): BattleState {
    const roomCode = this.generateRoomCode();
    const mode: BattleMode = config?.mode || 'classic';
    const modeConfig = BATTLE_MODE_CONFIGS[mode];
    const fullConfig: BattleConfig = { ...DEFAULT_BATTLE_CONFIG, ...config, mode, totalQuestions: modeConfig.questions, timePerQuestion: modeConfig.timePerQuestion, isPremium: host.isPremium || false };
    const hostPlayer: BattlePlayer = { id: host.id, nome: host.nome, avatar: undefined, score: 0, correctAnswers: 0, streak: 0, maxStreak: 0, isReady: false, isConnected: true, connectionStatus: 'connected', lastPing: Date.now(), isPremium: host.isPremium };
    const battle: BattleState = { roomCode, status: 'waiting', mode, players: [hostPlayer], questions: [], currentQuestion: 0, answers: {}, currentAnswers: {}, scores: { [host.id]: 0 }, hostId: host.id, createdAt: new Date(), config: fullConfig, spectators: [], spectatorCount: 0, chatMessages: [] };
    this.battles.set(roomCode, battle);
    if (fullConfig.isTransmitted) this.createTransmission(roomCode, host.nome);
    return battle;
  }

  joinBattle(roomCode: string, player: { id: string; nome: string; isPremium?: boolean }): { battle?: BattleState; error?: string } {
    const battle = this.battles.get(roomCode);
    if (!battle) return { error: BATTLE_ERROR_CODES.ROOM_NOT_FOUND };
    if (battle.status !== 'waiting') return { error: BATTLE_ERROR_CODES.BATTLE_IN_PROGRESS };
    if (battle.players.length >= 2) return { error: BATTLE_ERROR_CODES.ROOM_FULL };
    if (battle.players.some(p => p.id === player.id)) return { error: BATTLE_ERROR_CODES.ALREADY_JOINED };
    const newPlayer: BattlePlayer = { id: player.id, nome: player.nome, avatar: undefined, score: 0, correctAnswers: 0, streak: 0, maxStreak: 0, isReady: false, isConnected: true, connectionStatus: 'connected', lastPing: Date.now(), isPremium: player.isPremium };
    battle.players.push(newPlayer);
    battle.scores[player.id] = 0;
    battle.status = 'ready';
    const transmission = this.transmissions.get(roomCode);
    if (transmission) transmission.guestName = player.nome;
    return { battle };
  }

  setPlayerReady(roomCode: string, playerId: string): boolean {
    const battle = this.battles.get(roomCode);
    if (!battle) return false;
    const player = battle.players.find(p => p.id === playerId);
    if (player) player.isReady = true;
    return battle.players.every(p => p.isReady);
  }

  startBattle(roomCode: string): BattleState | null {
    const battle = this.battles.get(roomCode);
    if (!battle || battle.players.length !== 2) return null;
    const modeConfig = BATTLE_MODE_CONFIGS[battle.mode];
    battle.questions = this.getRandomQuestions(modeConfig.questions);
    battle.status = 'countdown';
    battle.startedAt = new Date();
    battle.currentQuestion = 0;
    const transmission = this.transmissions.get(roomCode);
    if (transmission) transmission.isLive = true;
    battle.players.forEach(p => battleService.registerBattleStart(p.id));
    return battle;
  }

  nextQuestion(roomCode: string): { question: BattleQuestion; number: number } | null {
    const battle = this.battles.get(roomCode);
    if (!battle || battle.currentQuestion >= battle.questions.length) return null;
    battle.status = 'playing';
    battle.currentAnswers = {};
    const question = battle.questions[battle.currentQuestion];
    question.startTime = Date.now();
    return { question, number: battle.currentQuestion + 1 };
  }

  hasMoreQuestions(roomCode: string): boolean {
    const battle = this.battles.get(roomCode);
    if (!battle) return false;
    return battle.currentQuestion < battle.questions.length - 1;
  }

  submitAnswer(roomCode: string, playerId: string, answer: string, responseTime: number): BattleAnswer | null {
    const battle = this.battles.get(roomCode);
    if (!battle || battle.status !== 'playing') return null;
    const question = battle.questions[battle.currentQuestion];
    if (!question) return null;
    const correct = answer === question.correta;
    const battleAnswer: BattleAnswer = { odder: playerId, answer, responseTime, correct, questionId: question.id, timestamp: Date.now(), serverTimestamp: Date.now() };
    battle.currentAnswers[playerId] = battleAnswer;
    if (!battle.answers[playerId]) battle.answers[playerId] = [];
    battle.answers[playerId].push(battleAnswer);
    if (correct) {
      battle.scores[playerId] = (battle.scores[playerId] || 0) + 1;
      const player = battle.players.find(p => p.id === playerId);
      if (player) { player.correctAnswers++; player.streak++; player.maxStreak = Math.max(player.maxStreak, player.streak); player.score++; }
    } else {
      const player = battle.players.find(p => p.id === playerId);
      if (player) player.streak = 0;
    }
    return battleAnswer;
  }

  allAnswered(roomCode: string): boolean {
    const battle = this.battles.get(roomCode);
    if (!battle) return false;
    return battle.players.every(p => battle.currentAnswers[p.id] !== undefined);
  }

  getQuestionResults(roomCode: string): { answers: Record<string, BattleAnswer>; correct: string; scores: Record<string, number> } | null {
    const battle = this.battles.get(roomCode);
    if (!battle) return null;
    const question = battle.questions[battle.currentQuestion];
    battle.currentQuestion++;
    battle.status = 'question_result';
    return { answers: battle.currentAnswers, correct: question.correta, scores: battle.scores };
  }

  finishBattle(roomCode: string): { record: BattleRecord; scores: Record<string, number>; winner: string | null; rewards: Record<string, number> } | null {
    const battle = this.battles.get(roomCode);
    if (!battle) return null;
    battle.status = 'finished';
    battle.finishedAt = new Date();
    const [p1, p2] = battle.players;
    const score1 = battle.scores[p1.id] || 0;
    const score2 = battle.scores[p2.id] || 0;
    let winner: string | null = null;
    if (score1 > score2) winner = p1.id;
    else if (score2 > score1) winner = p2.id;
    const duracao = battle.startedAt ? Math.floor((Date.now() - battle.startedAt.getTime()) / 1000) : 0;
    const rewards: Record<string, number> = {};
    [p1, p2].forEach(player => {
      const isWinner = winner === player.id;
      const isDraw = winner === null;
      const answers = battle.answers[player.id] || [];
      const responseTimes = answers.map(a => a.responseTime);
      const streaks = [player.maxStreak];
      const wasComeback = isWinner && this.checkComeback(battle, player.id);
      const fp = battleService.calculateBattleRewards(player.id, isWinner, isDraw, player.correctAnswers, battle.questions.length, battle.mode, player.isPremium || false, streaks, responseTimes, wasComeback, false, false, battle.config.isTransmitted);
      rewards[player.id] = fp;
    });
    const record: BattleRecord = {
      battleId: roomCode, mode: battle.mode, isTransmitted: battle.config.isTransmitted, isRematch: battle.config.isRematch,
      user1: battleService.buildParticipant(p1.id, p1.nome, p1.correctAnswers, battle.questions.length, (battle.answers[p1.id] || []).map(a => a.responseTime), rewards[p1.id], [p1.maxStreak], this.checkComeback(battle, p1.id)),
      user2: battleService.buildParticipant(p2.id, p2.nome, p2.correctAnswers, battle.questions.length, (battle.answers[p2.id] || []).map(a => a.responseTime), rewards[p2.id], [p2.maxStreak], this.checkComeback(battle, p2.id)),
      vencedor: winner, data: new Date().toISOString(), duracao,
      questionsData: battle.questions.map((q, i) => ({ id: q.id, materia: q.disciplina || 'Geral', user1Correct: battle.answers[p1.id]?.[i]?.correct || false, user2Correct: battle.answers[p2.id]?.[i]?.correct || false, user1Time: battle.answers[p1.id]?.[i]?.responseTime || 0, user2Time: battle.answers[p2.id]?.[i]?.responseTime || 0 })),
      metadata: { wasComeback: this.checkComeback(battle, winner || ''), hadTechnicalIssue: false, wasTechnicalDefeat: false, spectatorCount: battle.spectatorCount, spectatorPeak: battle.spectatorCount, chatMessageCount: battle.chatMessages.length },
    };
    battleService.recordBattle(record);
    const transmission = this.transmissions.get(roomCode);
    if (transmission) transmission.isLive = false;
    return { record, scores: battle.scores, winner, rewards };
  }

  private checkComeback(battle: BattleState, playerId: string): boolean {
    const opponent = battle.players.find(p => p.id !== playerId);
    if (!opponent) return false;
    return battle.scores[opponent.id] >= 2;
  }

  leaveBattle(roomCode: string, playerId: string): void {
    const battle = this.battles.get(roomCode);
    if (!battle) return;
    battle.players = battle.players.filter(p => p.id !== playerId);
    delete battle.scores[playerId];
    if (battle.players.length === 0) { this.battles.delete(roomCode); this.transmissions.delete(roomCode); }
    else if (battle.status === 'playing') battle.status = 'abandoned';
  }

  getBattle(roomCode: string): BattleState | null { return this.battles.get(roomCode) || null; }
  getActiveBattlesCount(): number { return this.battles.size; }

  joinAsSpectator(roomCode: string, odder: string): boolean {
    const battle = this.battles.get(roomCode);
    if (!battle || !battle.config.isTransmitted) return false;
    if (!battle.spectators.includes(odder)) { battle.spectators.push(odder); battle.spectatorCount = battle.spectators.length; }
    const transmission = this.transmissions.get(roomCode);
    if (transmission) { transmission.spectatorCount = battle.spectatorCount; transmission.spectatorPeak = Math.max(transmission.spectatorPeak, battle.spectatorCount); }
    return true;
  }

  leaveAsSpectator(roomCode: string, odder: string): void {
    const battle = this.battles.get(roomCode);
    if (!battle) return;
    battle.spectators = battle.spectators.filter(s => s !== odder);
    battle.spectatorCount = battle.spectators.length;
    const transmission = this.transmissions.get(roomCode);
    if (transmission) transmission.spectatorCount = battle.spectatorCount;
  }

  getSpectatorView(roomCode: string): SpectatorView | null {
    const battle = this.battles.get(roomCode);
    if (!battle) return null;
    const p1 = battle.players[0];
    const p2 = battle.players[1];
    const view: SpectatorView = {
      battleState: { status: battle.status, mode: battle.mode, spectatorCount: battle.spectatorCount },
      player1: { name: p1?.nome || 'Jogador 1', score: p1 ? battle.scores[p1.id] || 0 : 0, avatar: p1?.avatar, isConnected: p1?.isConnected || false },
      player2: { name: p2?.nome || 'Aguardando...', score: p2 ? battle.scores[p2.id] || 0 : 0, avatar: p2?.avatar, isConnected: p2?.isConnected || false },
      questionNumber: battle.currentQuestion + 1, totalQuestions: battle.questions.length, delay: 2000, isLive: battle.status === 'playing',
    };
    if (battle.status === 'playing' && battle.currentQuestion < battle.questions.length) {
      const q = battle.questions[battle.currentQuestion];
      const timeLeft = q.startTime ? Math.max(0, q.timeLimit - Math.floor((Date.now() - q.startTime) / 1000)) : q.timeLimit;
      view.currentQuestion = { enunciado: q.enunciado, alternativas: q.alternativas, timeLeft };
    }
    return view;
  }

  addChatMessage(roomCode: string, odder: string, senderName: string, message: string): BattleChatMessage | null {
    const battle = this.battles.get(roomCode);
    if (!battle) return null;
    const chatMessage: BattleChatMessage = { id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9), odder, senderName, message, timestamp: new Date().toISOString(), type: 'chat' };
    battle.chatMessages.push(chatMessage);
    if (battle.chatMessages.length > 100) battle.chatMessages = battle.chatMessages.slice(-100);
    return chatMessage;
  }

  getChatMessages(roomCode: string): BattleChatMessage[] { return this.battles.get(roomCode)?.chatMessages || []; }

  private createTransmission(roomCode: string, hostName: string): void {
    const battle = this.battles.get(roomCode);
    if (!battle) return;
    const transmission: BattleTransmission = { id: 'tx-' + roomCode, battleId: roomCode, roomCode, hostName, guestName: '', title: 'Batalha 1v1 - ' + hostName, isLive: false, startedAt: new Date(), spectatorCount: 0, spectatorPeak: 0, delayMs: 2000, chatEnabled: true };
    this.transmissions.set(roomCode, transmission);
  }

  getLiveTransmissions(): BattleTransmission[] { return Array.from(this.transmissions.values()).filter(t => t.isLive); }

  private cleanupOldBattles(): void {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000;
    for (const [roomCode, battle] of this.battles) {
      const age = now - battle.createdAt.getTime();
      if (age > maxAge && battle.status !== 'playing') { this.battles.delete(roomCode); this.transmissions.delete(roomCode); }
    }
  }
}

export const battleManager = BattleManager.getInstance();


