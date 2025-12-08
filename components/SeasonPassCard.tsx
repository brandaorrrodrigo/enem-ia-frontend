'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SeasonProgressBar from './SeasonProgressBar';
import { Season, PlayerSeasonProgress, SeasonChallenge, SeasonReward } from '@/lib/season/types';

interface SeasonPassCardProps {
  season: Season;
  progress: PlayerSeasonProgress;
  desafiosAtivos?: SeasonChallenge[];
  proximasRecompensas?: SeasonReward[];
  tempoRestante?: number;
  compact?: boolean;
  onUpgradePremium?: () => void;
}

export default function SeasonPassCard({
  season,
  progress,
  desafiosAtivos = [],
  proximasRecompensas = [],
  tempoRestante = 0,
  compact = false,
  onUpgradePremium,
}: SeasonPassCardProps) {
  const [timeLeft, setTimeLeft] = useState(tempoRestante);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const desafiosCompletadosHoje = desafiosAtivos.filter(
    d => d.tipo === 'daily' && (d.status === 'completed' || d.status === 'claimed')
  ).length;

  const totalDesafiosDiarios = desafiosAtivos.filter(d => d.tipo === 'daily').length;

  if (compact) {
    return (
      <Link href="/enem/temporada">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative rounded-xl overflow-hidden cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #1a472a 0%, #0d2818 100%)',
            border: '4px solid #8B4513',
          }}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{season.icone}</span>
                <div>
                  <p className="text-white/60 text-xs">TEMPORADA {season.id}</p>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                    {season.nome}
                  </p>
                </div>
              </div>

              {progress.isPremium && (
                <span className="px-2 py-1 rounded-lg bg-[#fbbf24]/20 text-[#fbbf24] text-xs font-bold">
                  👑 PREMIUM
                </span>
              )}
            </div>

            {/* Progress Bar Compacto */}
            <SeasonProgressBar
              nivelAtual={progress.nivelAtual}
              SFPAtual={progress.SFPTotal}
              SFPParaProximoNivel={500 - (progress.SFPTotal % 500)}
              niveisTotais={season.niveisTotais}
              corPrimaria={season.corPrimaria}
              corSecundaria={season.corSecundaria}
              compact
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-white/50">
                ⏱️ {formatTimeLeft(timeLeft)}
              </span>
              <span className="text-white/50">
                {desafiosCompletadosHoje}/{totalDesafiosDiarios} diários
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a472a 0%, #0d2818 100%)',
        border: '6px solid #8B4513',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Textura de giz */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header da temporada */}
      <div
        className="relative p-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${season.corPrimaria}20, ${season.corSecundaria}10)`,
          borderBottom: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Badge de tempo restante */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-white/80 text-sm">
          <span>⏱️</span>
          <span>{formatTimeLeft(timeLeft)}</span>
        </div>

        {/* Premium badge */}
        {progress.isPremium && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] text-sm font-bold">
            👑 Premium Ativo
          </div>
        )}

        {/* Ícone e título */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {season.icone}
        </motion.div>

        <p className="text-white/60 text-sm uppercase tracking-wider mb-1">
          TEMPORADA {season.id}
        </p>

        <h2
          className="text-3xl font-bold text-white mb-2"
          style={{
            fontFamily: "'Patrick Hand', cursive",
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          {season.nome}
        </h2>

        <p className="text-white/60 text-sm">{season.subtitulo}</p>
      </div>

      {/* Progresso */}
      <div className="relative p-6">
        <SeasonProgressBar
          nivelAtual={progress.nivelAtual}
          SFPAtual={progress.SFPTotal}
          SFPParaProximoNivel={500 - (progress.SFPTotal % 500)}
          niveisTotais={season.niveisTotais}
          corPrimaria={season.corPrimaria}
          corSecundaria={season.corSecundaria}
        />

        {/* Stats rápidos */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>
              {progress.nivelAtual}
            </p>
            <p className="text-white/50 text-xs">Nível</p>
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
        </div>
      </div>

      {/* Desafios em destaque */}
      {desafiosAtivos.length > 0 && (
        <div className="relative px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/80 font-bold text-sm">Desafios Ativos</h3>
            <Link href="/enem/temporada/desafios" className="text-[#22c55e] text-xs hover:underline">
              Ver todos →
            </Link>
          </div>

          <div className="space-y-2">
            {desafiosAtivos.slice(0, 2).map((desafio) => (
              <div
                key={desafio.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
              >
                <span className="text-xl">{desafio.icone}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{desafio.titulo}</p>
                  <div className="h-1 rounded-full bg-white/10 mt-1">
                    <div
                      className="h-full rounded-full bg-[#22c55e]"
                      style={{ width: `${(desafio.progresso / desafio.meta) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-[#fbbf24] text-xs font-bold">+{desafio.SFPRecompensa}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximas recompensas */}
      {proximasRecompensas.length > 0 && (
        <div className="relative px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/80 font-bold text-sm">Próximas Recompensas</h3>
            <Link href="/enem/temporada/recompensas" className="text-[#fbbf24] text-xs hover:underline">
              Ver todas →
            </Link>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {proximasRecompensas.map((reward) => (
              <div
                key={reward.id}
                className="flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1"
                style={{
                  background: reward.tier === 'premium'
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'rgba(34, 197, 94, 0.2)',
                  border: `1px solid ${reward.tier === 'premium' ? '#fbbf24' : '#22c55e'}30`,
                }}
              >
                <span className="text-xs text-white/50">Nv.{reward.nivel}</span>
                <span className="text-2xl">{reward.icone}</span>
                <span className="text-[8px] text-white/40 uppercase">{reward.tier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="relative p-6 pt-0 space-y-3">
        <Link href="/enem/temporada">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-bold text-white transition-all"
            style={{
              background: `linear-gradient(135deg, ${season.corPrimaria}, ${season.corSecundaria})`,
              boxShadow: `0 4px 20px ${season.corPrimaria}40`,
            }}
          >
            Ver Passe de Temporada
          </motion.button>
        </Link>

        {!progress.isPremium && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onUpgradePremium}
            className="w-full py-3 rounded-xl font-bold transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
              border: '2px solid #fbbf24',
              color: '#fbbf24',
            }}
          >
            👑 Upgrade para Premium
          </motion.button>
        )}
      </div>

      {/* Streak diário */}
      {progress.streakDiario > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 py-2 text-center"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.2), transparent)',
          }}
        >
          <span className="text-[#fbbf24] text-sm font-bold">
            🔥 {progress.streakDiario} dias de streak!
          </span>
        </div>
      )}
    </div>
  );
}
