'use client';

import FloatingBackButton from '@/components/FloatingBackButton';
import {useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import SeasonProgressBar from '@/components/SeasonProgressBar';
import SeasonRewardItem from '@/components/SeasonRewardItem';
import SeasonChallengeList from '@/components/SeasonChallengeList';
import {
  Season,
  PlayerSeasonProgress,
  SeasonChallenge,
  SeasonReward,
} from '@/lib/season/types';

// Mock playerId - em produção virá da autenticação
const PLAYER_ID = 'player_demo_1';

export default function TemporadaPage() {
  const [season, setSeason] = useState<Season | null>(null);
  const [progress, setProgress] = useState<PlayerSeasonProgress | null>(null);
  const [desafios, setDesafios] = useState<SeasonChallenge[]>([]);
  const [recompensas, setRecompensas] = useState<{ free: SeasonReward[]; premium: SeasonReward[] }>({
    free: [],
    premium: [],
  });
  const [tempoRestante, setTempoRestante] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'rewards' | 'challenges'>('overview');
  const [claimingReward, setClaimingReward] = useState<string | null>(null);

  useEffect(() => {
    loadSeasonData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadSeasonData = async () => {
    try {
      setLoading(true);

      // Carregar info da temporada
      const infoRes = await fetch(`/api/season?action=info&playerId=${PLAYER_ID}`);
      const infoData = await infoRes.json();

      if (infoData.success) {
        setSeason(infoData.season);
        setProgress(infoData.progresso);
        setTempoRestante(infoData.tempoRestante);
      }

      // Carregar desafios
      const desafiosRes = await fetch(`/api/season?action=desafios&playerId=${PLAYER_ID}`);
      const desafiosData = await desafiosRes.json();

      if (desafiosData.success) {
        setDesafios(desafiosData.desafios);
      }

      // Carregar recompensas
      const recompensasRes = await fetch(`/api/season?action=recompensas&playerId=${PLAYER_ID}`);
      const recompensasData = await recompensasRes.json();

      if (recompensasData.success) {
        setRecompensas({
          free: recompensasData.free,
          premium: recompensasData.premium,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar dados da temporada:', error);
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
        // Recarregar dados
        await loadSeasonData();
      }
    } catch (error) {
      console.error('Erro ao coletar recompensa:', error);
    } finally {
      setClaimingReward(null);
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

      const data = await res.json();

      if (data.success) {
        await loadSeasonData();
      }
    } catch (error) {
      console.error('Erro ao fazer upgrade:', error);
    }
  };

  const formatTimeLeft = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} dias e ${hours} horas`;
    if (hours > 0) return `${hours} horas e ${minutes} minutos`;
    return `${minutes} minutos`;
  };

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
            🎓
          </motion.div>
          <p className="text-white/60">Carregando temporada...</p>
        </div>
      </div>
    );
  }

  if (!season || !progress) {
    return (
      <div className="min-h-screen bg-[#0d2818] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-white/60">Temporada não encontrada</p>
          <Link href="/enem" className="text-[#22c55e] mt-4 block hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d2818] pt-16 pb-24">
      <FloatingBackButton />
      {/* Header da Temporada */}
      <div
        className="relative py-12 px-4"
        style={{
          background: `linear-gradient(180deg, ${season.corPrimaria}30 0%, transparent 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge de tempo */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 text-white/80 text-sm mb-6">
            <span>⏱️</span>
            <span>Termina em {formatTimeLeft(tempoRestante)}</span>
          </div>

          {/* Ícone e título */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-8xl mb-4"
          >
            {season.icone}
          </motion.div>

          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
            TEMPORADA {season.id}
          </p>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{
              fontFamily: "'Patrick Hand', cursive",
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {season.nome}
          </h1>

          <p className="text-white/60 text-lg">{season.subtitulo}</p>

          {/* Premium Badge */}
          {progress.isPremium ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] font-bold mt-6">
              <span>👑</span>
              <span>Premium Ativo</span>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpgradePremium}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold mt-6 transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.1))',
                border: '2px solid #fbbf24',
                color: '#fbbf24',
              }}
            >
              <span>👑</span>
              <span>Upgrade para Premium</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Progresso */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(180deg, #1a472a 0%, #0d2818 100%)',
            border: '4px solid #8B4513',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          <SeasonProgressBar
            nivelAtual={progress.nivelAtual}
            SFPAtual={progress.SFPTotal}
            SFPParaProximoNivel={500 - (progress.SFPTotal % 500)}
            niveisTotais={season.niveisTotais}
            corPrimaria={season.corPrimaria}
            corSecundaria={season.corSecundaria}
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                {progress.nivelAtual}
              </p>
              <p className="text-white/50 text-xs">Nível Atual</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-[#fbbf24]" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                {progress.SFPTotal}
              </p>
              <p className="text-white/50 text-xs">SFP Total</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-[#22c55e]" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                {progress.desafiosCompletados.length}
              </p>
              <p className="text-white/50 text-xs">Desafios</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-orange-400" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                🔥 {progress.streakDiario}
              </p>
              <p className="text-white/50 text-xs">Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['overview', 'rewards', 'challenges'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedTab === tab
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tab === 'overview' && '📊 Visão Geral'}
              {tab === 'rewards' && '🎁 Recompensas'}
              {tab === 'challenges' && '🎯 Desafios'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Próximas Recompensas */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                    Próximas Recompensas
                  </h2>
                  <Link href="/enem/temporada/recompensas" className="text-[#fbbf24] text-sm hover:underline">
                    Ver todas →
                  </Link>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[...recompensas.free, ...recompensas.premium]
                    .filter((r) => r.status !== 'claimed')
                    .slice(0, 8)
                    .map((reward) => (
                      <SeasonRewardItem
                        key={reward.id}
                        reward={reward}
                        onClaim={handleClaimReward}
                        isLoading={claimingReward === reward.id}
                        size="md"
                      />
                    ))}
                </div>
              </div>

              {/* Desafios Ativos */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                    Desafios Ativos
                  </h2>
                  <Link href="/enem/temporada/desafios" className="text-[#22c55e] text-sm hover:underline">
                    Ver todos →
                  </Link>
                </div>

                <SeasonChallengeList challenges={desafios} compact />
              </div>

              {/* Descrição da Temporada */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <h2 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                  Sobre a Temporada
                </h2>
                <p className="text-white/60">{season.descricao}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-white/40 text-xs mb-1">Início</p>
                    <p className="text-white font-bold">
                      {new Date(season.dataInicio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-white/40 text-xs mb-1">Término</p>
                    <p className="text-white font-bold">
                      {new Date(season.dataFim).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Rewards Tab */}
          {selectedTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Trilha de Recompensas */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <h2 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                  Trilha de Recompensas
                </h2>

                {/* Free Track */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🆓</span>
                    <h3 className="text-white/80 font-bold">Trilha Gratuita</h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {recompensas.free.map((reward) => (
                      <SeasonRewardItem
                        key={reward.id}
                        reward={reward}
                        onClaim={handleClaimReward}
                        isLoading={claimingReward === reward.id}
                        size="md"
                      />
                    ))}
                  </div>
                </div>

                {/* Premium Track */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">👑</span>
                    <h3 className="text-[#fbbf24] font-bold">Trilha Premium</h3>
                    {!progress.isPremium && (
                      <span className="text-xs text-white/40">(Requer upgrade)</span>
                    )}
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {recompensas.premium.map((reward) => (
                      <SeasonRewardItem
                        key={reward.id}
                        reward={{
                          ...reward,
                          status: !progress.isPremium && reward.status === 'available'
                            ? 'locked'
                            : reward.status,
                        }}
                        onClaim={progress.isPremium ? handleClaimReward : undefined}
                        isLoading={claimingReward === reward.id}
                        size="md"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Challenges Tab */}
          {selectedTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <SeasonChallengeList challenges={desafios} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingNav />
      <ChalkBackToTop />
    </div>
  );
}
