'use client';

import FloatingBackButton from '@/components/FloatingBackButton';
import {useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import SeasonRewardItem from '@/components/SeasonRewardItem';
import {
  Season,
  PlayerSeasonProgress,
  SeasonReward,
  RewardTier,
} from '@/lib/season/types';

const PLAYER_ID = 'player_demo_1';

export default function RecompensasPage() {
  const [season, setSeason] = useState<Season | null>(null);
  const [progress, setProgress] = useState<PlayerSeasonProgress | null>(null);
  const [recompensas, setRecompensas] = useState<{ free: SeasonReward[]; premium: SeasonReward[] }>({
    free: [],
    premium: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<RewardTier | 'all'>('all');
  const [claimingReward, setClaimingReward] = useState<string | null>(null);
  const [claimingAll, setClaimingAll] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [infoRes, recompensasRes] = await Promise.all([
        fetch(`/api/season?action=info&playerId=${PLAYER_ID}`),
        fetch(`/api/season?action=recompensas&playerId=${PLAYER_ID}`),
      ]);

      const [infoData, recompensasData] = await Promise.all([
        infoRes.json(),
        recompensasRes.json(),
      ]);

      if (infoData.success) {
        setSeason(infoData.season);
        setProgress(infoData.progresso);
      }

      if (recompensasData.success) {
        setRecompensas({
          free: recompensasData.free,
          premium: recompensasData.premium,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar recompensas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async (rewardId: string) => {
    try {
      setClaimingReward(rewardId);

      const res = await fetch('/api/season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'claim-reward',
          playerId: PLAYER_ID,
          rewardId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await loadData();
      }
    } catch (error) {
      console.error('Erro ao coletar recompensa:', error);
    } finally {
      setClaimingReward(null);
    }
  };

  const handleClaimAll = async () => {
    try {
      setClaimingAll(true);

      const res = await fetch('/api/season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'claim-all-available',
          playerId: PLAYER_ID,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await loadData();
      }
    } catch (error) {
      console.error('Erro ao coletar todas:', error);
    } finally {
      setClaimingAll(false);
    }
  };

  const handleUpgradePremium = async () => {
    try {
      const res = await fetch('/api/season', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upgrade-premium',
          playerId: PLAYER_ID,
        }),
      });

      if ((await res.json()).success) {
        await loadData();
      }
    } catch (error) {
      console.error('Erro ao fazer upgrade:', error);
    }
  };

  const getFilteredRewards = () => {
    if (selectedTier === 'all') {
      return [...recompensas.free, ...recompensas.premium].sort((a, b) => a.nivel - b.nivel);
    }
    return selectedTier === 'free' ? recompensas.free : recompensas.premium;
  };

  const availableCount = [...recompensas.free, ...recompensas.premium].filter(
    (r) => r.status === 'available'
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d2818] flex items-center justify-center">
      <FloatingBackButton />
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            🎁
          </motion.div>
          <p className="text-white/60">Carregando recompensas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d2818] pt-16 pb-24">
      <FloatingBackButton />
      {/* Header */}
      <div className="relative py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
            <Link href="/enem" className="hover:text-white/60">ENEM</Link>
            <span>/</span>
            <Link href="/enem/temporada" className="hover:text-white/60">Temporada</Link>
            <span>/</span>
            <span className="text-white/80">Recompensas</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                🎁 Recompensas
              </h1>
              <p className="text-white/60">
                {season?.nome} - Nível {progress?.nivelAtual || 1}
              </p>
            </div>

            {/* Claim All Button */}
            {availableCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimAll}
                disabled={claimingAll}
                className="px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                }}
              >
                {claimingAll ? 'Coletando...' : `Coletar Todas (${availableCount})`}
              </motion.button>
            )}
          </div>

          {/* Premium Banner */}
          {!progress?.isPremium && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05))',
                border: '2px solid rgba(251, 191, 36, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👑</span>
                  <div>
                    <p className="text-[#fbbf24] font-bold">Desbloqueie Recompensas Premium</p>
                    <p className="text-white/60 text-sm">
                      Acesse itens exclusivos e multiplique seus ganhos!
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpgradePremium}
                  className="px-4 py-2 rounded-lg font-bold bg-[#fbbf24] text-[#0d2818]"
                >
                  Upgrade
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              selectedTier === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Todas ({recompensas.free.length + recompensas.premium.length})
          </button>
          <button
            onClick={() => setSelectedTier('free')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              selectedTier === 'free'
                ? 'bg-[#22c55e]/20 text-[#22c55e]'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            🆓 Gratuitas ({recompensas.free.length})
          </button>
          <button
            onClick={() => setSelectedTier('premium')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              selectedTier === 'premium'
                ? 'bg-[#fbbf24]/20 text-[#fbbf24]'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            👑 Premium ({recompensas.premium.length})
          </button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {getFilteredRewards().map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <SeasonRewardItem
                    reward={{
                      ...reward,
                      status:
                        reward.tier === 'premium' && !progress?.isPremium && reward.status === 'available'
                          ? 'locked'
                          : reward.status,
                    }}
                    onClaim={
                      reward.tier === 'free' || progress?.isPremium
                        ? handleClaimReward
                        : undefined
                    }
                    isLoading={claimingReward === reward.id}
                    size="sm"
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {getFilteredRewards().length === 0 && (
            <div className="text-center py-12 text-white/40">
              <p className="text-4xl mb-2">🎁</p>
              <p>Nenhuma recompensa encontrada</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-white/40">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-gray-400" />
            <span>Comum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-blue-400" />
            <span>Raro</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-purple-400" />
            <span>Épico</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded-full bg-[#fbbf24]" />
            <span>Lendário</span>
          </div>
        </div>
      </div>

      <FloatingNav />
      <ChalkBackToTop />
    </div>
  );
}
