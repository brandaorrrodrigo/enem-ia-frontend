/**
 * ENEM PRO - Battle System Types v2.0 FINAL
 * Sistema completo de tipos para batalhas 1v1
 * Consolidação final com anti-cheat, reconexão e métricas
 */

// ============================================
// BATTLE MODES
// ============================================

export type BattleMode = 'classic' | 'turbo' | 'marathon' | 'transmitido';

export type BattleStatus =
  | 'waiting'
  | 'ready'
  | 'countdown'
  | 'playing'
  | 'question_result'
  | 'finished'
  | 'abandoned'
  | 'technical_defeat'
  | 'reconnecting';

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting';

// ============================================
// BATTLE CONFIGURATION
// ============================================

export interface BattleModeConfig {
  name: string;
  icon: string;
  description: string;
  color: string;
  questions: number;
  timePerQuestion: number;
  fpMultiplier: number;
}

export const BATTLE_MODE_CONFIGS: Record<BattleMode, BattleModeConfig> = {
  classic: {
    name: 'Clássico',
    icon: '⚔️',
    description: '5 questões, 30s cada',
    color: '#22c55e',
    questions: 5,
    timePerQuestion: 30,
    fpMultiplier: 1.0,
  },
  turbo: {
    name: 'Turbo',
    icon: '⚡',
    description: '3 questões, 15s cada',
    color: '#fbbf24',
    questions: 3,
    timePerQuestion: 15,
    fpMultiplier: 0.6,
  },
  marathon: {
    name: 'Maratona',
    icon: '🏃',
    description: '10 questões, 45s cada',
    color: '#3b82f6',
    questions: 10,
    timePerQuestion: 45,
    fpMultiplier: 1.5,
  },
  transmitido: {
    name: 'Transmitido',
    icon: '📺',
    description: '5 questões, 30s cada + AO VIVO',
    color: '#ef4444',
    questions: 5,
    timePerQuestion: 30,
    fpMultiplier: 1.2,
  },
};

// ============================================
// ANTI-CHEAT & RECONNECTION CONFIG
// ============================================

export const ANTI_CHEAT_CONFIG = {
  spectatorDelay: 2000,       // 2s delay para espectadores
  minResponseTime: 300,       // Tempo mínimo de resposta válido
  maxResponseTime: 45000,     // Tempo máximo de resposta
  reconnectTimeout: 15000,    // 15s para reconectar
  syncTolerance: 1000,        // 1s tolerância de sincronização
  chatRateLimit: 5,           // mensagens por 10s
  chatCooldown: 2000,         // 2s entre mensagens
  maxChatLength: 100,         // caracteres máximo por mensagem
  bannedWords: ['hack', 'cheat', 'bot'],
} as const;

export const RECONNECTION_CONFIG = {
  maxAttempts: 3,
  attemptInterval: 5000,      // 5s entre tentativas
  gracePeriod: 15000,         // 15s de tolerância
  technicalDefeatAfter: 20000, // 20s = derrota técnica
} as const;

// ============================================
// FP REWARDS SYSTEM v2.0
// ============================================

export const BATTLE_FP_REWARDS = {
  // Base rewards
  victory: 100,
  defeat: 25,
  draw: 50,

  // Mode-specific Classic
  classicVictory: 100,
  classicDefeat: 25,
  classicDraw: 50,

  // Mode-specific Turbo
  turboVictory: 60,
  turboDefeat: 15,
  turboDraw: 30,

  // Mode-specific Marathon
  marathonVictory: 150,
  marathonDefeat: 40,
  marathonDraw: 75,

  // Mode-specific Transmitido
  transmitidoVictory: 120,
  transmitidoDefeat: 30,
  transmitidoDraw: 60,

  // Bonuses
  perfectVictory: 50,
  streak3: 15,
  streak5: 30,
  streak10: 75,
  quickAnswer: 5,
  comeback: 25,
  firstBlood: 10,
  technicalWin: 75,

  // Arena rewards
  arenaTop1: 500,
  arenaTop3: 300,
  arenaTop10: 100,

  // Multipliers
  premiumMultiplier: 1.5,
  weekendMultiplier: 1.25,
  transmittedMultiplier: 1.2,
} as const;

// ============================================
// BATTLE COSTS
// ============================================

export const BATTLE_COSTS = {
  classicFree: 5,             // 5 batalhas grátis/dia
  inviteBattle: 200,          // Custo de convite direto
  premiumExtraBattles: 10,    // Extras para premium
  rematchDiscount: 0.5,       // 50% desconto revanche
  tournamentEntry: 500,       // Entrada em torneio
  marathonEntry: 100,         // Entrada maratona
} as const;

// ============================================
// BATTLE PARTICIPANTS
// ============================================

export interface BattlePlayer {
  id: string;
  nome: string;
  avatar?: string;
  score: number;
  correctAnswers: number;
  streak: number;
  maxStreak: number;
  isReady: boolean;
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
  lastPing: number;
  disconnectedAt?: number;
  isPremium?: boolean;
  league?: string;
  totalFP?: number;
}

export interface BattleParticipant {
  id: string;
  name: string;
  avatar?: string;
  league?: string;
  acertos: number;
  tempoMedio: number;
  tempoTotal: number;
  responseTimes: number[];
  fpGanho: number;
  streak: number;
  maxStreak: number;
  perfectRound: boolean;
  connectionStatus: ConnectionStatus;
  comebackAchieved: boolean;
  firstBlood: boolean;
  technicalIssues: number;
}

// ============================================
// BATTLE QUESTIONS
// ============================================

export interface BattleQuestion {
  id: string;
  enunciado: string;
  alternativas: Record<string, string>;
  alternativasOrder: string[];  // Ordem randomizada
  correta: string;
  disciplina?: string;
  materia?: string;
  dificuldade?: 'facil' | 'medio' | 'dificil';
  timeLimit: number;
  startTime?: number;
  banca?: string;
  ano?: number;
}

export interface BattleAnswer {
  odder: string;
  answer: string;
  responseTime: number;
  correct: boolean;
  questionId: string;
  timestamp: number;
  serverTimestamp: number;
}

// ============================================
// BATTLE STATE
// ============================================

export interface BattleConfig {
  mode: BattleMode;
  totalQuestions: number;
  timePerQuestion: number;
  discipline: string;
  tema?: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isTransmitted: boolean;
  isPremium: boolean;
  entryCost: number;
  isRematch: boolean;
  originalRoomCode?: string;
}

export interface BattleState {
  roomCode: string;
  status: BattleStatus;
  mode: BattleMode;
  players: BattlePlayer[];
  questions: BattleQuestion[];
  currentQuestion: number;
  answers: Record<string, BattleAnswer[]>;
  currentAnswers: Record<string, BattleAnswer>;
  scores: Record<string, number>;
  hostId: string;
  winner?: string;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  config: BattleConfig;

  // Spectators
  spectators: string[];
  spectatorCount: number;

  // Transmission
  transmissionId?: string;
  chatMessages: BattleChatMessage[];

  // Reconnection
  reconnectingPlayer?: string;
  reconnectDeadline?: number;

  // Rematch
  rematchRequested?: string;
  rematchAccepted?: boolean;
}

// ============================================
// BATTLE RECORD (HISTORY)
// ============================================

export interface BattleRecord {
  battleId: string;
  mode: BattleMode;
  isTransmitted: boolean;
  isRematch: boolean;

  user1: BattleParticipant;
  user2: BattleParticipant;

  vencedor: string | null;
  data: string;
  duracao: number;

  questionsData: {
    id: string;
    materia: string;
    user1Correct: boolean;
    user2Correct: boolean;
    user1Time: number;
    user2Time: number;
  }[];

  metadata: {
    wasComeback: boolean;
    hadTechnicalIssue: boolean;
    wasTechnicalDefeat: boolean;
    spectatorCount: number;
    spectatorPeak: number;
    chatMessageCount: number;
  };
}

// ============================================
// BATTLE HISTORY WITH PAGINATION
// ============================================

export interface BattleHistory {
  battles: BattleRecord[];
  totalVitorias: number;
  totalDerrotas: number;
  totalEmpates: number;
  totalFPGanho: number;
  winStreak: number;
  maxWinStreak: number;
  avgResponseTime: number;
  totalPlayTime: number;
  lastBattle?: string;
  favoriteMode?: BattleMode;

  // Pagination
  page: number;
  totalPages: number;
  totalBattles: number;
  hasMore: boolean;
}

export interface HistoryPaginationParams {
  page: number;
  limit: number;
  filterResult?: 'all' | 'victory' | 'defeat' | 'draw';
  filterMode?: BattleMode | 'all';
  sortBy?: 'date' | 'fp' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// ARENA WEEKLY
// ============================================

export interface ArenaWeeklyEntry {
  rank: number;
  odder: string;
  playerName: string;
  avatar?: string;
  league: string;
  vitorias: number;
  derrotas: number;
  winRate: number;
  fpGanho: number;
  perfectWins: number;
  avgResponseTime: number;
  totalPlayTime: number;
  comebacks: number;
}

export interface ArenaWeeklyData {
  weekStart: Date;
  weekEnd: Date;
  entries: ArenaWeeklyEntry[];
  myRank?: number;
  myEntry?: ArenaWeeklyEntry;
  topRewards: {
    rank: number;
    fpBonus: number;
    badge?: string;
  }[];
  totalParticipants: number;
}

// ============================================
// SPECTATOR / TRANSMISSION
// ============================================

export interface SpectatorInfo {
  id: string;
  name: string;
  joinedAt: number;
  lastPing: number;
  messageCount: number;
  lastMessageAt: number;
}

export interface SpectatorView {
  battleState: {
    status: BattleStatus;
    mode: BattleMode;
    spectatorCount: number;
  };
  player1: { name: string; score: number; avatar?: string; isConnected: boolean };
  player2: { name: string; score: number; avatar?: string; isConnected: boolean };
  currentQuestion?: {
    enunciado: string;
    alternativas: Record<string, string>;
    timeLeft: number;
  };
  questionNumber: number;
  totalQuestions: number;
  delay: number;
  isLive: boolean;
}

export interface BattleChatMessage {
  id: string;
  odder: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'chat' | 'system' | 'reaction' | 'moderation';
  isBlocked?: boolean;
}

export interface BattleTransmission {
  id: string;
  battleId: string;
  roomCode: string;
  hostName: string;
  guestName: string;
  title: string;
  isLive: boolean;
  startedAt: Date;
  spectatorCount: number;
  spectatorPeak: number;
  delayMs: number;
  chatEnabled: boolean;
}

// ============================================
// LEAGUE INTEGRATION
// ============================================

export interface LeagueProgress {
  currentLeague: string;
  currentPoints: number;
  pointsToNextLeague: number;
  battleWinsContribution: number;
  percentToNext: number;
}

export const LEAGUE_BATTLE_POINTS = {
  victory: 10,
  perfectVictory: 15,
  streak5: 20,
  arenaTop10: 25,
  arenaTop3: 50,
  arenaTop1: 100,
} as const;

export const LEAGUES = [
  { name: 'Bronze', minPoints: 0, color: '#cd7f32' },
  { name: 'Prata', minPoints: 100, color: '#c0c0c0' },
  { name: 'Ouro', minPoints: 300, color: '#ffd700' },
  { name: 'Platina', minPoints: 600, color: '#e5e4e2' },
  { name: 'Diamante', minPoints: 1000, color: '#b9f2ff' },
  { name: 'Mestre', minPoints: 1500, color: '#9400d3' },
  { name: 'Grão-Mestre', minPoints: 2500, color: '#ff4500' },
] as const;

// ============================================
// SHARE CARD FORMATS
// ============================================

export type ShareCardFormat = 'square' | 'horizontal' | 'vertical';

export interface ShareCardConfig {
  format: ShareCardFormat;
  width: number;
  height: number;
  platform: string;
  aspectRatio: string;
}

export const SHARE_CARD_FORMATS: Record<ShareCardFormat, ShareCardConfig> = {
  square: {
    format: 'square',
    width: 1080,
    height: 1080,
    platform: 'Instagram Feed',
    aspectRatio: '1:1',
  },
  horizontal: {
    format: 'horizontal',
    width: 1920,
    height: 1080,
    platform: 'Instagram Story / YouTube',
    aspectRatio: '16:9',
  },
  vertical: {
    format: 'vertical',
    width: 1080,
    height: 1920,
    platform: 'TikTok / Reels',
    aspectRatio: '9:16',
  },
};

// ============================================
// BADGES
// ============================================

export interface BattleBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: Record<string, number>;
}

export const BATTLE_BADGES: Record<string, BattleBadge> = {
  guerreiro1v1: {
    id: 'guerreiro_1v1',
    name: 'Guerreiro 1v1',
    description: 'Venceu sua primeira batalha',
    icon: '⚔️',
    rarity: 'common',
    requirement: { vitorias: 1 },
  },
  mestre1v1: {
    id: 'mestre_1v1',
    name: 'Mestre 1v1',
    description: 'Venceu 50 batalhas',
    icon: '🏆',
    rarity: 'epic',
    requirement: { vitorias: 50 },
  },
  lenda1v1: {
    id: 'lenda_1v1',
    name: 'Lenda 1v1',
    description: 'Venceu 200 batalhas',
    icon: '🌟',
    rarity: 'legendary',
    requirement: { vitorias: 200 },
  },
  invicto: {
    id: 'invicto',
    name: 'Invicto',
    description: 'Sequência de 5 vitórias',
    icon: '🔥',
    rarity: 'rare',
    requirement: { winStreak: 5 },
  },
  lendario: {
    id: 'lendario',
    name: 'Lendário',
    description: 'Sequência de 10 vitórias',
    icon: '👑',
    rarity: 'legendary',
    requirement: { winStreak: 10 },
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Vitória perfeita (100% acertos)',
    icon: '💎',
    rarity: 'rare',
    requirement: { perfectWins: 1 },
  },
  diamondPerfect: {
    id: 'diamond_perfect',
    name: 'Diamante Perfeito',
    description: '10 vitórias perfeitas',
    icon: '💎💎',
    rarity: 'legendary',
    requirement: { perfectWins: 10 },
  },
  arenaChampion: {
    id: 'arena_champion',
    name: 'Campeão da Arena',
    description: 'Top 1 na Arena Semanal',
    icon: '🥇',
    rarity: 'legendary',
    requirement: { arenaTop1: 1 },
  },
  campeaoArena: {
    id: 'campeao_arena',
    name: 'Elite da Arena',
    description: 'Top 10 na Arena Semanal',
    icon: '🏅',
    rarity: 'epic',
    requirement: { arenaTop10: 1 },
  },
  speedDemon: {
    id: 'speed_demon',
    name: 'Velocista',
    description: '10 vitórias no modo Turbo',
    icon: '⚡',
    rarity: 'rare',
    requirement: { turboWins: 10 },
  },
  marathoner: {
    id: 'marathoner',
    name: 'Maratonista',
    description: '5 vitórias no modo Maratona',
    icon: '🏃',
    rarity: 'rare',
    requirement: { marathonWins: 5 },
  },
  broadcaster: {
    id: 'broadcaster',
    name: 'Streamer',
    description: 'Participou de batalha transmitida',
    icon: '📺',
    rarity: 'common',
    requirement: { transmittedBattles: 1 },
  },
  famousBroadcaster: {
    id: 'famous_broadcaster',
    name: 'Influencer',
    description: 'Teve 50+ espectadores em uma batalha',
    icon: '📺⭐',
    rarity: 'epic',
    requirement: { maxSpectators: 50 },
  },
  comeback: {
    id: 'comeback',
    name: 'Virada Épica',
    description: 'Venceu estando 2 pontos atrás',
    icon: '🔄',
    rarity: 'epic',
    requirement: { comebacks: 1 },
  },
  quickDraw: {
    id: 'quick_draw',
    name: 'Gatilho Rápido',
    description: 'Respondeu 5 questões em menos de 3s',
    icon: '🎯',
    rarity: 'rare',
    requirement: { quickAnswers: 5 },
  },
  consistent: {
    id: 'consistent',
    name: 'Consistente',
    description: 'Tempo médio de resposta < 10s em 10 batalhas',
    icon: '⏱️',
    rarity: 'rare',
    requirement: { fastBattles: 10 },
  },
};

// ============================================
// ERROR CODES
// ============================================

export const BATTLE_ERROR_CODES = {
  ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
  ROOM_FULL: 'ROOM_FULL',
  ALREADY_JOINED: 'ALREADY_JOINED',
  NOT_IN_ROOM: 'NOT_IN_ROOM',
  BATTLE_STARTED: 'BATTLE_STARTED',
  BATTLE_IN_PROGRESS: 'BATTLE_IN_PROGRESS',
  BATTLE_FINISHED: 'BATTLE_FINISHED',
  INSUFFICIENT_FP: 'INSUFFICIENT_FP',
  DAILY_LIMIT_REACHED: 'DAILY_LIMIT_REACHED',
  CONNECTION_LOST: 'CONNECTION_LOST',
  RECONNECT_TIMEOUT: 'RECONNECT_TIMEOUT',
  RECONNECT_FAILED: 'RECONNECT_FAILED',
  TECHNICAL_DEFEAT: 'TECHNICAL_DEFEAT',
  SYNC_ERROR: 'SYNC_ERROR',
  CHAT_RATE_LIMITED: 'CHAT_RATE_LIMITED',
  CHAT_MESSAGE_BLOCKED: 'CHAT_MESSAGE_BLOCKED',
  INVALID_ANSWER: 'INVALID_ANSWER',
  SUSPICIOUS_TIMING: 'SUSPICIOUS_TIMING',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;

export type BattleErrorCode = keyof typeof BATTLE_ERROR_CODES;

// ============================================
// REMATCH SYSTEM
// ============================================

export interface RematchRequest {
  requesterId: string;
  originalRoomCode: string;
  newRoomCode?: string;
  timestamp: number;
  accepted: boolean;
  fpCost: number;
}

// ============================================
// DEFAULT CONFIGS
// ============================================

export const DEFAULT_BATTLE_CONFIG: BattleConfig = {
  mode: 'classic',
  totalQuestions: 5,
  timePerQuestion: 30,
  discipline: 'misto',
  videoEnabled: false,
  audioEnabled: false,
  isTransmitted: false,
  isPremium: false,
  entryCost: 0,
  isRematch: false,
};

export const DEFAULT_PARTICIPANT: Partial<BattleParticipant> = {
  acertos: 0,
  tempoMedio: 0,
  tempoTotal: 0,
  responseTimes: [],
  fpGanho: 0,
  streak: 0,
  maxStreak: 0,
  perfectRound: false,
  connectionStatus: 'connected',
  comebackAchieved: false,
  firstBlood: false,
  technicalIssues: 0,
};
