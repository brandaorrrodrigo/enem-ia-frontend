'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialShareCard, { ShareData } from './SocialShareCard';
import FPCoin from './FPCoin';

interface BadgeUnlockModalProps {
  badge: {
    nome: string;
    descricao: string;
    icone: string;
    pontos: number;
  };
  userName: string;
  userTier?: 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante';
  inviteCode?: string;
  usuarioId: string;
  onClose: () => void;
}

export default function BadgeUnlockModal({
  badge,
  userName,
  userTier,
  inviteCode,
  usuarioId,
  onClose
}: BadgeUnlockModalProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async (platform: string) => {
    try {
      await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId,
          platform,
          shareType: 'badge_unlock',
          metadata: {
            badgeName: badge.nome,
            badgeIcon: badge.icone,
            pontos: badge.pontos
          }
        })
      });
    } catch (error) {
      console.error('Erro ao registrar compartilhamento:', error);
    }
  };

  const shareData: ShareData = {
    type: 'badge_unlock',
    userName,
    fpAmount: badge.pontos,
    badgeName: badge.nome,
    badgeIcon: badge.icone,
    tier: userTier,
    inviteCode
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          {/* Confetti effect */}
          {showConfetti && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -20,
                    rotate: 0,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    y: window.innerHeight + 20,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    delay: Math.random() * 0.5,
                    ease: 'linear'
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: ['#fbbf24', '#f59e0b', '#22c55e', '#3b82f6', '#ef4444'][Math.floor(Math.random() * 5)]
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-gradient-to-b from-[#1a472a] to-[#0d2818] rounded-2xl p-8 max-w-sm w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#fbbf24]/20 to-transparent opacity-50" />

            {/* Content */}
            <div className="relative">
              {/* Badge icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="text-8xl mb-4"
              >
                {badge.icone}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-[#fbbf24] mb-2"
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                }}
              >
                Conquista Desbloqueada!
              </motion.h2>

              {/* Badge name */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-white mb-2"
              >
                {badge.nome}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 mb-4"
              >
                {badge.descricao}
              </motion.p>

              {/* FP reward */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 mb-6"
              >
                <span className="text-white/60">+</span>
                <FPCoin size="lg" animate="gain" />
                <span className="text-2xl font-bold text-[#fbbf24]">
                  {badge.pontos}
                </span>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <button
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#0d2818] px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar Conquista
                </button>

                <button
                  onClick={onClose}
                  className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Continuar
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {showShareModal && (
        <SocialShareCard
          data={shareData}
          onShare={handleShare}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}
