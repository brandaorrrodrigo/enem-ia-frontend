'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SeasonChallenge,
  ChallengeType,
  CHALLENGE_ICONS,
} from '@/lib/season/types';

interface SeasonChallengeListProps {
  challenges: SeasonChallenge[];
  onChallengeClick?: (challenge: SeasonChallenge) => void;
  filter?: ChallengeType | 'all';
  compact?: boolean;
}

const TYPE_LABELS: Record<ChallengeType, { label: string; color: string; bgColor: string }> = {
  daily: { label: 'Diário', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.2)' },
  weekly: { label: 'Semanal', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.2)' },
  special: { label: 'Especial', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.2)' },
};

export default function SeasonChallengeList({
  challenges,
  onChallengeClick,
  filter = 'all',
  compact = false,
}: SeasonChallengeListProps) {
  const [selectedType, setSelectedType] = useState<ChallengeType | 'all'>(filter);

  const filteredChallenges = challenges.filter(
    c => selectedType === 'all' || c.tipo === selectedType
  );

  const getProgressPercent = (challenge: SeasonChallenge) => {
    return Math.min(100, (challenge.progresso / challenge.meta) * 100);
  };

  const getStatusIcon = (challenge: SeasonChallenge) => {
    if (challenge.status === 'completed' || challenge.status === 'claimed') return '✅';
    if (challenge.status === 'locked') return '🔒';
    if (challenge.progresso > 0) return '🔄';
    return '⭕';
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {filteredChallenges.slice(0, 3).map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => onChallengeClick?.(challenge)}
          >
            <span className="text-xl">{challenge.icone || CHALLENGE_ICONS[challenge.categoria]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">{challenge.titulo}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${getProgressPercent(challenge)}%`,
                      background: TYPE_LABELS[challenge.tipo].color,
                    }}
                  />
                </div>
                <span className="text-xs text-white/40">
                  {challenge.progresso}/{challenge.meta}
                </span>
              </div>
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: TYPE_LABELS[challenge.tipo].bgColor,
                color: TYPE_LABELS[challenge.tipo].color,
              }}
            >
              +{challenge.SFPRecompensa}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            selectedType === 'all'
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          Todos
        </button>
        {(['daily', 'weekly', 'special'] as ChallengeType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              selectedType === type
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            }`}
            style={{
              background: selectedType === type
                ? TYPE_LABELS[type].bgColor
                : 'rgba(255, 255, 255, 0.05)',
              border: selectedType === type
                ? `1px solid ${TYPE_LABELS[type].color}`
                : '1px solid transparent',
            }}
          >
            {TYPE_LABELS[type].label}
          </button>
        ))}
      </div>

      {/* Lista de desafios */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-xl overflow-hidden transition-all ${
                challenge.status === 'locked'
                  ? 'opacity-50'
                  : 'cursor-pointer hover:scale-[1.02]'
              }`}
              onClick={() => challenge.status !== 'locked' && onChallengeClick?.(challenge)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: challenge.status === 'completed'
                  ? '2px solid rgba(34, 197, 94, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Barra de progresso de fundo */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  width: `${getProgressPercent(challenge)}%`,
                  background: `linear-gradient(90deg, ${TYPE_LABELS[challenge.tipo].bgColor}, transparent)`,
                }}
              />

              <div className="relative p-4 flex items-center gap-4">
                {/* Ícone e status */}
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: TYPE_LABELS[challenge.tipo].bgColor,
                      border: `2px solid ${TYPE_LABELS[challenge.tipo].color}30`,
                    }}
                  >
                    {challenge.icone || CHALLENGE_ICONS[challenge.categoria]}
                  </div>
                  <div className="absolute -top-1 -right-1 text-sm">
                    {getStatusIcon(challenge)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                      style={{
                        background: TYPE_LABELS[challenge.tipo].bgColor,
                        color: TYPE_LABELS[challenge.tipo].color,
                      }}
                    >
                      {TYPE_LABELS[challenge.tipo].label}
                    </span>
                  </div>

                  <h4
                    className="text-white font-bold truncate"
                    style={{ fontFamily: "'Patrick Hand', cursive" }}
                  >
                    {challenge.titulo}
                  </h4>

                  <p className="text-white/50 text-sm truncate">{challenge.descricao}</p>

                  {/* Barra de progresso */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercent(challenge)}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: TYPE_LABELS[challenge.tipo].color }}
                      />
                    </div>
                    <span className="text-xs text-white/60 min-w-[50px] text-right">
                      {challenge.progresso}/{challenge.meta}
                    </span>
                  </div>
                </div>

                {/* Recompensa */}
                <div className="text-right">
                  <div
                    className="px-3 py-2 rounded-xl"
                    style={{
                      background: 'rgba(251, 191, 36, 0.2)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                    }}
                  >
                    <p className="text-[#fbbf24] font-bold text-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                      +{challenge.SFPRecompensa}
                    </p>
                    <p className="text-[#fbbf24]/60 text-xs">SFP</p>
                  </div>
                </div>
              </div>

              {/* Overlay de completado */}
              {(challenge.status === 'completed' || challenge.status === 'claimed') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-green-500/10 flex items-center justify-center"
                >
                  <div className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/40">
                    <span className="text-green-400 font-bold">✅ Completado!</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-8 text-white/40">
            <p className="text-4xl mb-2">🎯</p>
            <p>Nenhum desafio encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
