// Exportacoes do Sistema FP - ENEM Pro
// Ponto de entrada para importacoes

// Calculadora FP
export {
  calculateFP,
  calculateTimeFactor,
  calculateTurboFP,
  calculateMaratonaFP,
  calculateBetResult,
  canPlaceBet,
} from './fp-calculator';

// Anti-fraude
export {
  validateAttempt,
  validateJackpotScore,
  getExpectedTime,
  recordAttempt,
  getLastAttemptTimestamp,
} from './antifraud';

// Servico FP
export {
  getUserFP,
  updateUserFP,
  saveChallengeHistory,
  getChallengeHistory,
  createBet,
  finalizeBet,
  getBetHistory,
  getJackpotPool,
  addToJackpotPool,
  enterJackpot,
  getTodayJackpotEntries,
  resolveJackpot,
  getJackpotPosition,
  getWeeklyStats,
} from './fp-service';

// Tipos
export type {
  UserTier,
  Difficulty,
  ChallengeType,
  BetStatus,
  ChallengeHistory,
  FPBet,
  JackpotPool,
  JackpotEntry,
  UserFP,
  APIResponse,
  ChallengeResponse,
  BetResponse,
  JackpotStatusResponse,
} from './types';
