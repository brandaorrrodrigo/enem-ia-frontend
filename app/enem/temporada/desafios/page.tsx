'use client';

import FloatingBackButton from '@/components/FloatingBackButton';
import {useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import SeasonChallengeList from '@/components/SeasonChallengeList';
import {
  Season,
  PlayerSeasonProgress,
  SeasonChallenge,
  ChallengeType,
} from '@/lib/season/types';

const PLAYER_ID = 'player_demo_1';

export default function DesafiosPage() {
  const [season, setSeason] = useState<Season | null>(null);
  const [progress, setProgress] = useState<PlayerSeasonProgress | null>(null);
  const [desafios, setDesafios] = useState<SeasonChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<ChallengeType | 'all'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [infoRes, desafiosRes] = await Promise.all([
        fetch(`/api/season?action=info&playerId=${PLAYER_ID}`),
        fetch(`/api/season?action=desafios&playerId=${PLAYER_ID}`),
      ]);

      const [infoData, desafiosData] = await Promise.all([
        infoRes.json(),
        desafiosRes.json(),
      ]);

      if (infoData.success) {
        setSeason(infoData.season);
        setProgress(infoData.progresso);
      }

      if (desafiosData.success) {
        setDesafios(desafiosData.desafios);
      }
    } catch (error) {
      console.error('Erro ao carregar desafios:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const daily = desafios.filter((d) => d.tipo === 'daily');
    const weekly = desafios.filter((d) => d.tipo === 'weekly');
    const special = desafios.filter((d) => d.tipo === 'special');

    const dailyCompleted = daily.filter(
      (d) => d.status === 'completed' || d.status === 'claimed'
    ).length;
    const weeklyCompleted = weekly.filter(
      (d) => d.status === 'completed' || d.status === 'claimed'
    ).length;
    const specialCompleted = special.filter(
      (d) => d.status === 'completed' || d.status === 'claimed'
    ).length;

    const totalSFP = desafios.reduce((acc, d) => acc + d.SFPRecompensa, 0);
    const earnedSFP = desafios
      .filter((d) => d.status === 'completed' || d.status === 'claimed')
      .reduce((acc, d) => acc + d.SFPRecompensa, 0);

    return {
      daily: { completed: dailyCompleted, total: daily.length },
      weekly: { completed: weeklyCompleted, total: weekly.length },
      special: { completed: specialCompleted, total: special.length },
      SFP: { earned: earnedSFP, total: totalSFP },
    };
  };

  const stats = getStats();

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
            🎯
          </motion.div>
          <p className="text-white/60">Carregando desafios...</p>
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
            <span className="text-white/80">Desafios</span>
          </div>

          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            🎯 Desafios da Temporada
          </h1>
          <p className="text-white/60">
            {season?.nome} - Complete desafios para ganhar SFP!
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Daily */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '2px solid rgba(34, 197, 94, 0.3)',
            }}
          >
            <p className="text-[#22c55e] text-3xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
              {stats.daily.completed}/{stats.daily.total}
            </p>
            <p className="text-white/60 text-sm">Diários</p>
            <div className="h-1 rounded-full bg-white/10 mt-2">
              <div
                className="h-full rounded-full bg-[#22c55e]"
                style={{
                  width: `${(stats.daily.completed / Math.max(1, stats.daily.total)) * 100}%`,
                }}
              />
            </div>
          </motion.div>

          {/* Weekly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
            }}
          >
            <p className="text-blue-400 text-3xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
              {stats.weekly.completed}/{stats.weekly.total}
            </p>
            <p className="text-white/60 text-sm">Semanais</p>
            <div className="h-1 rounded-full bg-white/10 mt-2">
              <div
                className="h-full rounded-full bg-blue-400"
                style={{
                  width: `${(stats.weekly.completed / Math.max(1, stats.weekly.total)) * 100}%`,
                }}
              />
            </div>
          </motion.div>

          {/* Special */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '2px solid rgba(251, 191, 36, 0.3)',
            }}
          >
            <p className="text-[#fbbf24] text-3xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
              {stats.special.completed}/{stats.special.total}
            </p>
            <p className="text-white/60 text-sm">Especiais</p>
            <div className="h-1 rounded-full bg-white/10 mt-2">
              <div
                className="h-full rounded-full bg-[#fbbf24]"
                style={{
                  width: `${(stats.special.completed / Math.max(1, stats.special.total)) * 100}%`,
                }}
              />
            </div>
          </motion.div>

          {/* SFP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <p className="text-white text-3xl font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
              {stats.SFP.earned}
            </p>
            <p className="text-white/60 text-sm">SFP Ganho</p>
            <div className="h-1 rounded-full bg-white/10 mt-2">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: `${(stats.SFP.earned / Math.max(1, stats.SFP.total)) * 100}%`,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reset Info */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span>Diários resetam à meia-noite</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Semanais resetam às segundas</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <span>Especiais são permanentes</span>
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <SeasonChallengeList
            challenges={desafios}
            filter={selectedType}
          />
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
            border: '2px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          <h3
            className="text-white font-bold text-lg mb-3"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            💡 Dicas para Ganhar Mais SFP
          </h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#22c55e]">•</span>
              Complete os desafios diários todos os dias para manter seu streak ativo
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c55e]">•</span>
              Desafios semanais dão mais SFP - priorize completá-los antes de resetar
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c55e]">•</span>
              Desafios especiais são os mais valiosos e não expiram durante a temporada
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c55e]">•</span>
              Com Premium, você ganha bônus de SFP em todas as atividades
            </li>
          </ul>
        </div>
      </div>

      <FloatingNav />
      <ChalkBackToTop />
    </div>
  );
}
