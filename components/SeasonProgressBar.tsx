'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SeasonProgressBarProps {
  nivelAtual: number;
  SFPAtual: number;
  SFPParaProximoNivel: number;
  niveisTotais: number;
  corPrimaria?: string;
  corSecundaria?: string;
  showGainAnimation?: boolean;
  SFPGanho?: number;
  compact?: boolean;
}

export default function SeasonProgressBar({
  nivelAtual,
  SFPAtual,
  SFPParaProximoNivel,
  niveisTotais,
  corPrimaria = '#22c55e',
  corSecundaria = '#fbbf24',
  showGainAnimation = false,
  SFPGanho = 0,
  compact = false,
}: SeasonProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showGain, setShowGain] = useState(false);

  const progressPercent = SFPParaProximoNivel > 0
    ? ((SFPAtual % 500) / 500) * 100
    : 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercent);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercent]);

  useEffect(() => {
    if (showGainAnimation && SFPGanho > 0) {
      setShowGain(true);
      const timer = setTimeout(() => setShowGain(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showGainAnimation, SFPGanho]);

  if (compact) {
    return (
      <div className="relative">
        {/* Barra compacta */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${corPrimaria}, ${corSecundaria})`,
              color: '#0d2818',
            }}
          >
            {nivelAtual}
          </div>

          <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${animatedProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${corPrimaria}, ${corSecundaria})`,
                boxShadow: `0 0 10px ${corPrimaria}60`,
              }}
            />

            {/* Textura de giz */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <span className="text-white/60 text-xs min-w-[40px]">
            {Math.floor(animatedProgress)}%
          </span>
        </div>

        {/* Animação de ganho */}
        <AnimatePresence>
          {showGain && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: -40 }}
              className="absolute top-0 right-0 text-sm font-bold"
              style={{ color: corSecundaria }}
            >
              +{SFPGanho} SFP
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header com nível */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${corPrimaria}, ${corSecundaria})`,
                color: '#0d2818',
                fontFamily: "'Patrick Hand', cursive",
                boxShadow: `0 4px 15px ${corPrimaria}40`,
              }}
            >
              {nivelAtual}
            </div>

            {/* Brilho */}
            <div
              className="absolute inset-0 rounded-xl opacity-30"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5), transparent)',
              }}
            />
          </motion.div>

          <div>
            <p className="text-white font-bold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
              Nível {nivelAtual}
            </p>
            <p className="text-white/50 text-sm">
              de {niveisTotais} níveis
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-white/80 text-sm">
            <span style={{ color: corSecundaria }} className="font-bold">
              {SFPAtual % 500}
            </span>
            <span className="text-white/40"> / 500 SFP</span>
          </p>
          <p className="text-white/40 text-xs">
            para o nível {Math.min(nivelAtual + 1, niveisTotais)}
          </p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div
        className="relative h-6 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Fundo com textura */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Barra de progresso animada */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-xl"
          style={{
            background: `linear-gradient(90deg, ${corPrimaria}, ${corSecundaria})`,
            boxShadow: `0 0 20px ${corPrimaria}60`,
          }}
        >
          {/* Efeito de brilho animado */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 w-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </motion.div>

        {/* Marcadores de nível */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-px h-full opacity-20"
              style={{ background: 'white' }}
            />
          ))}
        </div>

        {/* Texto de porcentagem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-sm font-bold text-white drop-shadow-lg"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            {Math.floor(animatedProgress)}%
          </span>
        </div>
      </div>

      {/* Indicador de SFP restante */}
      <div className="flex justify-between mt-2 text-xs text-white/40">
        <span>0 SFP</span>
        <span>500 SFP</span>
      </div>

      {/* Animação de ganho de SFP */}
      <AnimatePresence>
        {showGain && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          >
            <div
              className="px-4 py-2 rounded-xl font-bold text-lg flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${corSecundaria}30, ${corSecundaria}10)`,
                border: `2px solid ${corSecundaria}`,
                color: corSecundaria,
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              <span>+{SFPGanho}</span>
              <span className="text-sm">SFP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
