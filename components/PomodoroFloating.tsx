'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePomodoroStore } from '@/lib/pomodoro/store';
import { setupAntiCheat, playNotificationSound, vibrate, showNotification } from '@/lib/pomodoro/antiCheat';

export default function PomodoroFloating() {
  const {
    status,
    timeRemaining,
    currentCycle,
    totalCycles,
    isCompact,
    tabSwitchCount,
    start,
    pause,
    resume,
    stop,
    tick,
    toggleCompact,
    skipBreak,
    recordTabSwitch,
    canEarnFP,
    getProgressPercent,
    formatTime,
  } = usePomodoroStore();

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [earnedFP, setEarnedFP] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Timer tick
  useEffect(() => {
    if (status !== 'running' && status !== 'break' && status !== 'longBreak') {
      return;
    }

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [status, tick]);

  // Detectar fim de ciclo para mostrar modal
  useEffect(() => {
    if (timeRemaining === 0 && (status === 'break' || status === 'longBreak')) {
      // Ciclo de trabalho terminou, calcular FP
      const fp = canEarnFP() ? 25 : 0;
      setEarnedFP(fp);
      setShowCompletionModal(true);
      playNotificationSound();
      vibrate();
      showNotification('Pomodoro Completo!', fp > 0 ? `Voce ganhou ${fp} FP!` : 'Ciclo finalizado');
    }
  }, [timeRemaining, status, canEarnFP]);

  // Anti-cheat setup
  useEffect(() => {
    if (status !== 'running') return;

    const cleanup = setupAntiCheat({
      onBlur: () => {
        pause();
        recordTabSwitch();
      },
      onFocus: () => {
        // Nao retoma automaticamente
      },
      onVisibilityHidden: () => {
        pause();
        recordTabSwitch();
      },
      onVisibilityVisible: () => {
        // Nao retoma automaticamente
      },
    });

    return cleanup;
  }, [status, pause, recordTabSwitch]);

  // Notificacao de fim de descanso
  useEffect(() => {
    if (status === 'idle' && timeRemaining === usePomodoroStore.getState().workDuration) {
      // Descanso terminou
      playNotificationSound();
      showNotification('Descanso Finalizado', 'Hora de voltar aos estudos!');
    }
  }, [status, timeRemaining]);

  const handlePlayPause = useCallback(() => {
    if (status === 'idle') {
      start();
    } else if (status === 'running') {
      pause();
    } else if (status === 'paused') {
      resume();
    } else if (status === 'break' || status === 'longBreak') {
      skipBreak();
    }
  }, [status, start, pause, resume, skipBreak]);

  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return 'Pronto';
      case 'running':
        return 'Focando';
      case 'paused':
        return 'Pausado';
      case 'break':
        return 'Descanso';
      case 'longBreak':
        return 'Descanso Longo';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'text-green-400';
      case 'paused':
        return 'text-yellow-400';
      case 'break':
      case 'longBreak':
        return 'text-blue-400';
      default:
        return 'text-white/70';
    }
  };

  const progressPercent = getProgressPercent();

  // Modo compacto
  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-[999999]"
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      >
        <div
          onClick={() => !isDragging && toggleCompact()}
          className="w-20 h-20 rounded-full cursor-pointer relative shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #0e2818, #1a4030)',
            border: '4px solid #8B4513',
            boxShadow: '0 0 20px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke={status === 'running' ? '#22c55e' : status === 'paused' ? '#eab308' : '#3b82f6'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPercent / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>

          {/* Timer text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-white font-bold text-sm"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              {formatTime()}
            </span>
          </div>

          {/* Status indicator */}
          <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${
            status === 'running' ? 'bg-green-400 animate-pulse' :
            status === 'paused' ? 'bg-yellow-400' :
            status === 'break' || status === 'longBreak' ? 'bg-blue-400' :
            'bg-white/30'
          }`} />
        </div>
      </motion.div>
    );
  }

  // Modo expandido
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-[999999]"
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
      >
        <div
          className="w-44 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #0e2818, #1a4030)',
            border: '4px solid #8B4513',
            boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.2)',
          }}
        >
          {/* Header */}
          <div
            className="px-3 py-2 flex items-center justify-between border-b border-white/10"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <span
              className="text-white/80 text-xs font-semibold"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              🍅 Pomodoro
            </span>
            <button
              onClick={() => !isDragging && toggleCompact()}
              className="text-white/50 hover:text-white/80 transition text-sm"
            >
              ─
            </button>
          </div>

          {/* Timer */}
          <div className="p-4 text-center">
            {/* Progress circle */}
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="6"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke={status === 'running' ? '#22c55e' : status === 'paused' ? '#eab308' : '#3b82f6'}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPercent / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-white font-bold text-2xl"
                  style={{ fontFamily: "'Patrick Hand', cursive" }}
                >
                  {formatTime()}
                </span>
                <span className={`text-xs ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
            </div>

            {/* Cycles */}
            <div className="flex justify-center gap-1.5 mb-3">
              {Array.from({ length: totalCycles }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    i < currentCycle - 1
                      ? 'bg-green-400'
                      : i === currentCycle - 1 && status !== 'idle'
                      ? 'bg-yellow-400 animate-pulse'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-2">
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-110"
                style={{
                  background: status === 'running'
                    ? 'linear-gradient(145deg, #eab308, #ca8a04)'
                    : 'linear-gradient(145deg, #22c55e, #16a34a)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                {status === 'running' ? (
                  <span className="text-white text-lg">⏸</span>
                ) : status === 'paused' ? (
                  <span className="text-white text-lg">▶</span>
                ) : status === 'break' || status === 'longBreak' ? (
                  <span className="text-white text-lg">⏭</span>
                ) : (
                  <span className="text-white text-lg">▶</span>
                )}
              </button>

              {status !== 'idle' && (
                <button
                  onClick={stop}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-110"
                  style={{
                    background: 'linear-gradient(145deg, #ef4444, #dc2626)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  }}
                >
                  <span className="text-white text-lg">⏹</span>
                </button>
              )}
            </div>

            {/* Anti-cheat warning */}
            {tabSwitchCount > 0 && status !== 'idle' && (
              <div className="mt-3 text-xs text-yellow-400/80">
                ⚠️ {tabSwitchCount} saida{tabSwitchCount > 1 ? 's' : ''} da aba
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="px-3 py-2 text-center border-t border-white/10"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <span className="text-white/50 text-xs">
              Ciclo {currentCycle}/{totalCycles}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCompletionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-green-900/90 to-green-950/90 p-6 rounded-2xl border-4 border-green-500/50 max-w-sm mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)' }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                Pomodoro Completo!
              </h3>

              {earnedFP > 0 ? (
                <div className="mb-4">
                  <p className="text-white/80 mb-2">Voce manteve o foco!</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-yellow-400 text-3xl font-bold">+{earnedFP}</span>
                    <span className="text-yellow-400/80">FP</span>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-red-400/80 text-sm">
                    ⚠️ FP nao concedido: muitas pausas ou saidas da aba
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full py-3 rounded-xl font-bold transition hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, #22c55e, #16a34a)',
                  fontFamily: "'Patrick Hand', cursive",
                }}
              >
                Continuar Estudando
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
