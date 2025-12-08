'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FPCoin from './FPCoin';
import BattleShareCard from './BattleShareCard';

// ============================================
// TIPOS
// ============================================

interface BattleResultProps {
  winner: string | null;
  myId: string;
  myName: string;
  opponentName: string;
  myScore: number;
  opponentScore: number;
  myReward: number;
  totalQuestions: number;
  mode?: 'classic' | 'turbo' | 'marathon' | 'transmitido';
  isPerfect?: boolean;
  winStreak?: number;
  inviteCode?: string;
  avgResponseTime?: number;
  comebackWin?: boolean;
  league?: string;
  leaguePointsGained?: number;
  badges?: string[];
  onClose: () => void;
  onRematch: () => void;
}

const confettiColors = ['#22c55e', '#fbbf24', '#3b82f6', '#ef4444', '#a855f7'];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function BattleResult({
  winner,
  myId,
  myName,
  opponentName,
  myScore,
  opponentScore,
  myReward,
  totalQuestions,
  mode = 'classic',
  isPerfect = false,
  winStreak = 0,
  inviteCode,
  avgResponseTime,
  comebackWin = false,
  league,
  leaguePointsGained = 0,
  badges = [],
  onClose,
  onRematch
}: BattleResultProps) {
  const [showShare, setShowShare] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);
  const [showBadges, setShowBadges] = useState(false);

  const isWinner = winner === myId;
  const isDraw = winner === null;

  // Gerar confetes para vitória
  useEffect(() => {
    if (isWinner) {
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        delay: Math.random() * 0.5
      }));
      setConfetti(particles);

      // Mostrar badges depois de 1.5s
      if (badges.length > 0) {
        setTimeout(() => setShowBadges(true), 1500);
      }
    }
  }, [isWinner, badges.length]);

  const getResultText = () => {
    if (isDraw) return 'Empate!';
    if (isPerfect && isWinner) return 'PERFEITO!';
    if (comebackWin && isWinner) return 'VIRADA!';
    return isWinner ? 'VITÓRIA!' : 'Derrota';
  };

  const getResultEmoji = () => {
    if (isDraw) return '🤝';
    if (isPerfect && isWinner) return '💎';
    if (comebackWin && isWinner) return '🔄';
    return isWinner ? '🏆' : '😔';
  };

  const getResultColor = () => {
    if (isDraw) return '#fbbf24';
    return isWinner ? '#22c55e' : '#ef4444';
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'turbo': return { icon: '⚡', label: 'TURBO', color: '#fbbf24' };
      case 'marathon': return { icon: '🏃', label: 'MARATONA', color: '#3b82f6' };
      case 'transmitido': return { icon: '📺', label: 'AO VIVO', color: '#ef4444' };
      default: return { icon: '⚔️', label: 'CLÁSSICO', color: '#22c55e' };
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const decimals = Math.floor((ms % 1000) / 100);
    return `${seconds}.${decimals}s`;
  };

  const modeInfo = getModeLabel();

  const handleShare = async (platform: string, format: string) => {
    try {
      await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: myId,
          platform,
          shareType: 'battle_win',
          metadata: {
            myScore,
            opponentScore,
            isWinner,
            reward: myReward,
            mode,
            isPerfect,
            format,
            avgResponseTime,
            comebackWin,
            league
          }
        })
      });
    } catch (err) {
      console.error('Erro ao registrar compartilhamento:', err);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-hidden"
      >
        {/* Confetes para vitória */}
        <AnimatePresence>
          {isWinner && confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ y: -20, x: `${particle.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                rotate: 720,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: particle.delay,
                ease: 'linear'
              }}
              className="fixed top-0 w-3 h-3 rounded-sm z-40"
              style={{ backgroundColor: particle.color }}
            />
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative max-w-md w-full"
        >
          {/* Card com borda de madeira */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '8px solid #8B4513',
              boxShadow: `
                inset 0 2px 4px rgba(139, 69, 19, 0.3),
                0 8px 32px rgba(0, 0, 0, 0.5),
                0 0 60px ${getResultColor()}40
              `
            }}
          >
            {/* Textura de quadro verde */}
            <div
              className="relative p-8 text-center"
              style={{
                background: 'linear-gradient(180deg, #1a472a 0%, #0d2818 100%)',
              }}
            >
              {/* Overlay de textura chalk */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Badge do modo */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                style={{
                  backgroundColor: `${modeInfo.color}30`,
                  color: modeInfo.color,
                  border: `1px solid ${modeInfo.color}50`
                }}
              >
                <span>{modeInfo.icon}</span>
                <span>{modeInfo.label}</span>
              </motion.div>

              {/* Liga badge */}
              {league && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 bg-blue-500/30 text-blue-300 border border-blue-500/50"
                >
                  <span>🏅</span>
                  <span>Liga {league}</span>
                </motion.div>
              )}

              {/* Resultado principal */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-8xl mb-4"
              >
                {getResultEmoji()}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-2"
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  color: getResultColor(),
                  textShadow: `0 0 20px ${getResultColor()}60`
                }}
              >
                {getResultText()}
              </motion.h2>

              {/* Badges extras */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex justify-center flex-wrap gap-2 mb-4"
              >
                {isPerfect && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 text-purple-300 border border-purple-500/50">
                    💎 PERFEITO
                  </span>
                )}
                {winStreak >= 3 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/30 text-orange-300 border border-orange-500/50">
                    🔥 {winStreak}x STREAK
                  </span>
                )}
                {comebackWin && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/30 text-cyan-300 border border-cyan-500/50">
                    🔄 VIRADA
                  </span>
                )}
              </motion.div>

              {/* Placar visual */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center items-center gap-4 mb-6"
              >
                {/* Meu placar */}
                <div className="flex-1">
                  <div
                    className="rounded-xl p-4 relative overflow-hidden"
                    style={{
                      background: isWinner || isDraw
                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      border: isWinner ? '2px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {isWinner && (
                      <div className="absolute top-1 right-1">
                        <span className="text-lg">👑</span>
                      </div>
                    )}
                    <p className="text-white/60 text-sm mb-1 truncate">{myName}</p>
                    <p
                      className="text-4xl font-bold"
                      style={{
                        color: isWinner ? '#22c55e' : 'white',
                        fontFamily: "'Patrick Hand', cursive"
                      }}
                    >
                      {myScore}
                    </p>
                    <p className="text-white/40 text-xs">de {totalQuestions}</p>
                  </div>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span className="text-white/60">VS</span>
                  </div>
                </div>

                {/* Oponente */}
                <div className="flex-1">
                  <div
                    className="rounded-xl p-4 relative overflow-hidden"
                    style={{
                      background: !isWinner && !isDraw
                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      border: !isWinner && !isDraw ? '2px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {!isWinner && !isDraw && (
                      <div className="absolute top-1 right-1">
                        <span className="text-lg">👑</span>
                      </div>
                    )}
                    <p className="text-white/60 text-sm mb-1 truncate">{opponentName}</p>
                    <p
                      className="text-4xl font-bold"
                      style={{
                        color: !isWinner && !isDraw ? '#22c55e' : 'white',
                        fontFamily: "'Patrick Hand', cursive"
                      }}
                    >
                      {opponentScore}
                    </p>
                    <p className="text-white/40 text-xs">de {totalQuestions}</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats adicionais */}
              {avgResponseTime && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex justify-center gap-4 mb-4"
                >
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
                    <span>⏱️</span>
                    <span>Tempo médio: {formatTime(avgResponseTime)}</span>
                  </div>
                </motion.div>
              )}

              {/* Recompensas */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="rounded-xl p-4 mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.span
                    className="text-white/60 text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    +
                  </motion.span>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <FPCoin size="lg" animate="gain" />
                  </motion.div>
                  <motion.span
                    className="text-3xl font-bold text-[#fbbf24]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: 'spring', stiffness: 300 }}
                    style={{ fontFamily: "'Patrick Hand', cursive" }}
                  >
                    {myReward}
                  </motion.span>
                  <span className="text-white/60">FP ganhos</span>
                </div>

                {/* Pontos de liga */}
                {leaguePointsGained > 0 && league && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center gap-2 mt-2 text-sm text-blue-300"
                  >
                    <span>🏅</span>
                    <span>+{leaguePointsGained} pontos na Liga {league}</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Badges conquistados */}
              <AnimatePresence>
                {showBadges && badges.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="rounded-xl p-3 mb-4 bg-purple-500/20 border border-purple-500/30"
                  >
                    <p className="text-purple-300 text-sm font-bold mb-2">Conquistas Desbloqueadas!</p>
                    <div className="flex justify-center flex-wrap gap-2">
                      {badges.map((badge, index) => (
                        <motion.span
                          key={badge}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-2 py-1 rounded-lg bg-purple-500/30 text-purple-200 text-xs font-bold"
                        >
                          {badge}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botões */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                {/* Botão de compartilhar */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowShare(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#0d2818',
                    boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar {isWinner ? 'Vitória' : isDraw ? 'Empate' : 'Resultado'}
                </motion.button>

                {/* Botão de revanche */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRematch}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  <span className="text-xl">🔄</span>
                  Revanche
                </motion.button>

                {/* Botão voltar */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-6 py-3 rounded-xl font-bold transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Voltar ao Menu
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal de compartilhamento */}
      <AnimatePresence>
        {showShare && (
          <BattleShareCard
            result={isWinner ? 'victory' : isDraw ? 'draw' : 'defeat'}
            myName={myName}
            opponentName={opponentName}
            myScore={myScore}
            opponentScore={opponentScore}
            totalQuestions={totalQuestions}
            fpEarned={myReward}
            mode={mode}
            isPerfect={isPerfect}
            winStreak={winStreak}
            avgResponseTime={avgResponseTime}
            comebackWin={comebackWin}
            league={league}
            inviteCode={inviteCode}
            onShare={handleShare}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
