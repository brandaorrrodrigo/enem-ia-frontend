'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SeasonReward,
  RewardStatus,
  RARITY_COLORS,
  TIER_COLORS,
  REWARD_ICONS,
} from '@/lib/season/types';

interface SeasonRewardItemProps {
  reward: SeasonReward;
  onClaim?: (rewardId: string) => void;
  isLoading?: boolean;
  showLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SeasonRewardItem({
  reward,
  onClaim,
  isLoading = false,
  showLevel = true,
  size = 'md',
}: SeasonRewardItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [claimAnimation, setClaimAnimation] = useState(false);

  const tierColors = TIER_COLORS[reward.tier];
  const rarityColor = RARITY_COLORS[reward.raridade];

  const sizeClasses = {
    sm: { container: 'w-16 h-20', icon: 'text-2xl', level: 'text-xs' },
    md: { container: 'w-20 h-24', icon: 'text-3xl', level: 'text-sm' },
    lg: { container: 'w-24 h-28', icon: 'text-4xl', level: 'text-base' },
  };

  const handleClaim = async () => {
    if (reward.status !== 'available' || isLoading || !onClaim) return;

    setClaimAnimation(true);
    await onClaim(reward.id);

    setTimeout(() => setClaimAnimation(false), 1000);
  };

  const getStatusOverlay = () => {
    switch (reward.status) {
      case 'locked':
        return (
          <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        );
      case 'claimed':
        return (
          <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        className={`relative ${sizeClasses[size].container} cursor-pointer`}
        whileHover={{ scale: reward.status === 'locked' ? 1 : 1.05 }}
        whileTap={{ scale: reward.status === 'available' ? 0.95 : 1 }}
        onClick={() => reward.status !== 'locked' && setShowDetails(true)}
      >
        {/* Container principal */}
        <div
          className="relative w-full h-full rounded-xl overflow-hidden"
          style={{
            background: reward.status === 'locked'
              ? 'rgba(255, 255, 255, 0.05)'
              : `linear-gradient(135deg, ${tierColors.bg}, rgba(0,0,0,0.3))`,
            border: `2px solid ${reward.status === 'locked' ? 'rgba(255,255,255,0.1)' : tierColors.border}`,
            boxShadow: reward.status === 'available'
              ? `0 0 15px ${tierColors.border}40`
              : 'none',
          }}
        >
          {/* Badge de nível */}
          {showLevel && (
            <div
              className={`absolute top-1 left-1 px-1.5 py-0.5 rounded-md ${sizeClasses[size].level} font-bold`}
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
              }}
            >
              {reward.nivel}
            </div>
          )}

          {/* Badge FREE/PREMIUM */}
          <div
            className="absolute top-1 right-1 px-1 py-0.5 rounded text-[8px] font-bold uppercase"
            style={{
              background: tierColors.bg,
              color: tierColors.text,
              border: `1px solid ${tierColors.border}`,
            }}
          >
            {reward.tier === 'premium' ? '👑' : '🆓'}
          </div>

          {/* Ícone do item */}
          <div className="flex flex-col items-center justify-center h-full pt-4">
            <motion.span
              className={sizeClasses[size].icon}
              animate={reward.animado && reward.status !== 'locked' ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {reward.icone || REWARD_ICONS[reward.tipo]}
            </motion.span>

            {/* Nome truncado */}
            <p
              className="text-[10px] text-white/80 text-center px-1 truncate w-full mt-1"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              {reward.nome}
            </p>
          </div>

          {/* Indicador de raridade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ background: rarityColor }}
          />

          {/* Overlay de status */}
          {getStatusOverlay()}

          {/* Efeito de brilho para disponível */}
          {reward.status === 'available' && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{
                boxShadow: [
                  `0 0 0px ${tierColors.border}00`,
                  `0 0 20px ${tierColors.border}60`,
                  `0 0 0px ${tierColors.border}00`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>

        {/* Animação de claim */}
        <AnimatePresence>
          {claimAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 1 }}
              exit={{ scale: 3, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="text-4xl">✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal de detalhes */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-2xl p-6 text-center"
                style={{
                  background: 'linear-gradient(180deg, #1a472a 0%, #0d2818 100%)',
                  border: '6px solid #8B4513',
                  boxShadow: `0 0 30px ${rarityColor}40`,
                }}
              >
                {/* Badge de raridade */}
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4"
                  style={{
                    background: `${rarityColor}30`,
                    color: rarityColor,
                    border: `1px solid ${rarityColor}`,
                  }}
                >
                  {reward.raridade}
                </div>

                {/* Ícone grande */}
                <motion.div
                  className="text-7xl mb-4"
                  animate={reward.animado ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {reward.icone || REWARD_ICONS[reward.tipo]}
                </motion.div>

                {/* Nome */}
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  {reward.nome}
                </h3>

                {/* Descrição */}
                <p className="text-white/60 mb-4">{reward.descricao}</p>

                {/* Info */}
                <div className="flex justify-center gap-4 mb-6">
                  <div
                    className="px-3 py-1 rounded-lg text-sm"
                    style={{
                      background: tierColors.bg,
                      color: tierColors.text,
                      border: `1px solid ${tierColors.border}`,
                    }}
                  >
                    {reward.tier === 'premium' ? '👑 Premium' : '🆓 Gratuito'}
                  </div>
                  <div className="px-3 py-1 rounded-lg text-sm bg-white/10 text-white/80">
                    Nível {reward.nivel}
                  </div>
                </div>

                {/* Valor (se aplicável) */}
                {reward.valor && (
                  <div className="text-lg text-white/80 mb-4">
                    {reward.tipo === 'fp' && `+${reward.valor} FP`}
                    {reward.tipo === 'boost' && `${reward.valor}h de duração`}
                    {reward.tipo === 'desconto' && `${reward.valor}% de desconto`}
                  </div>
                )}

                {/* Botão de ação */}
                {reward.status === 'available' && onClaim && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClaim}
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                    style={{
                      background: `linear-gradient(135deg, ${tierColors.border}, ${rarityColor})`,
                      color: '#0d2818',
                      boxShadow: `0 4px 15px ${tierColors.border}40`,
                    }}
                  >
                    {isLoading ? 'Coletando...' : '🎁 Coletar Recompensa'}
                  </motion.button>
                )}

                {reward.status === 'claimed' && (
                  <div className="py-3 rounded-xl bg-green-500/20 text-green-400 font-bold">
                    ✅ Já coletado
                  </div>
                )}

                {reward.status === 'locked' && (
                  <div className="py-3 rounded-xl bg-white/10 text-white/40 font-bold">
                    🔒 Alcance o nível {reward.nivel}
                  </div>
                )}

                {/* Botão fechar */}
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full mt-4 py-2 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-all"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
