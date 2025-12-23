'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import FPCoin from '@/components/FPCoin';
import FloatingBackButton from '@/components/FloatingBackButton';

type BattleMode = 'classic' | 'turbo' | 'marathon';

interface BattleStats {
  vitorias: number;
  derrotas: number;
  empates: number;
  winStreak: number;
}

const MODE_CONFIG = {
  classic: {
    name: 'Classico',
    icon: '⚔️',
    description: '5 questoes, 30s cada',
    color: '#22c55e',
    questions: 5,
    time: 30,
  },
  turbo: {
    name: 'Turbo',
    icon: '⚡',
    description: '3 questoes, 15s cada',
    color: '#fbbf24',
    questions: 3,
    time: 15,
  },
  marathon: {
    name: 'Maratona',
    icon: '🏃',
    description: '10 questoes, 45s cada',
    color: '#3b82f6',
    questions: 10,
    time: 45,
  },
};

export default function BatalhaPage() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [codigoSala, setCodigoSala] = useState('');
  const [selectedMode, setSelectedMode] = useState<BattleMode>('classic');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [stats, setStats] = useState<BattleStats>({ vitorias: 0, derrotas: 0, empates: 0, winStreak: 0 });
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load player ID
    let id = localStorage.getItem('enem-pro-player-id');
    if (!id) {
      id = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('enem-pro-player-id', id);
    }
    setPlayerId(id);

    // Load player name
    const name = localStorage.getItem('enem-pro-player-name') || '';
    setPlayerName(name);

    // Load stats
    const statsLocal = localStorage.getItem('batalha_stats');
    if (statsLocal) {
      setStats(JSON.parse(statsLocal));
    }
  }, []);

  const criarSala = async (mode: BattleMode) => {
    if (!playerName.trim()) {
      setError('Digite seu nome primeiro');
      return;
    }

    setIsCreating(true);
    setError(null);
    localStorage.setItem('enem-pro-player-name', playerName);

    try {
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          playerId,
          playerName,
          mode,
        }),
      });

      const data = await res.json();

      if (data.success && data.roomCode) {
        router.push(`/enem/batalha/sala/${data.roomCode}`);
      } else {
        setError(data.error || 'Erro ao criar sala');
      }
    } catch (err) {
      setError('Erro de conexao');
    } finally {
      setIsCreating(false);
      setShowModeSelect(false);
    }
  };

  const entrarSala = async () => {
    if (codigoSala.length !== 6) {
      setError('Codigo deve ter 6 caracteres');
      return;
    }

    if (!playerName.trim()) {
      setError('Digite seu nome primeiro');
      return;
    }

    setIsJoining(true);
    setError(null);
    localStorage.setItem('enem-pro-player-name', playerName);

    router.push(`/enem/batalha/sala/${codigoSala.toUpperCase()}`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const winRate = stats.vitorias + stats.derrotas > 0
    ? ((stats.vitorias / (stats.vitorias + stats.derrotas)) * 100).toFixed(0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] pb-24">
      <FloatingBackButton />
      <FloatingNav />

      <div className="pt-20 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl mb-3"
            >
              ⚔️
            </motion.div>
            <h1
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              Modo Batalha 1v1
            </h1>
            <p className="text-white/60">Desafie outros estudantes em tempo real!</p>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-4 gap-2 mb-6"
          >
            <div className="bg-[#22c55e]/20 border border-[#22c55e]/30 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#22c55e]">{stats.vitorias}</p>
              <p className="text-xs text-white/60">Vitorias</p>
            </div>
            <div className="bg-[#ef4444]/20 border border-[#ef4444]/30 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#ef4444]">{stats.derrotas}</p>
              <p className="text-xs text-white/60">Derrotas</p>
            </div>
            <div className="bg-[#fbbf24]/20 border border-[#fbbf24]/30 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-[#fbbf24]">{winRate}%</p>
              <p className="text-xs text-white/60">Win Rate</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">
                {stats.winStreak > 0 ? `${stats.winStreak}🔥` : '-'}
              </p>
              <p className="text-xs text-white/60">Streak</p>
            </div>
          </motion.div>

          {/* Player Name Input */}
          <div className="mb-6">
            <label className="text-white/60 text-sm mb-2 block">Seu nome</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Digite seu nome"
              maxLength={20}
              className="w-full bg-[#0d2818] border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#22c55e] transition-colors"
            />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4 text-red-400 text-center text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Actions */}
          <div className="space-y-3 mb-6">
            {/* Create Battle Button */}
            <button
              onClick={() => setShowModeSelect(true)}
              disabled={isCreating}
              className="w-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#0d2818] px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#fbbf24]/20 disabled:opacity-50"
            >
              {isCreating ? '⏳ Criando...' : '⚔️ CRIAR BATALHA'}
            </button>

            {/* Quick Turbo Button */}
            <button
              onClick={() => criarSala('turbo')}
              disabled={isCreating}
              className="w-full bg-[#fbbf24]/20 border-2 border-[#fbbf24] text-[#fbbf24] px-6 py-3 rounded-xl font-bold transition-all hover:bg-[#fbbf24]/30 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span className="text-xl">⚡</span>
              BATALHA RELAMPAGO (3 questoes, 15s)
            </button>

            {/* Join Room */}
            <div className="flex gap-2">
              <input
                type="text"
                value={codigoSala}
                onChange={(e) => setCodigoSala(e.target.value.toUpperCase())}
                placeholder="CODIGO"
                maxLength={6}
                className="flex-1 bg-[#0d2818] border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 font-mono text-center text-lg tracking-widest focus:outline-none focus:border-[#3b82f6] transition-colors uppercase"
              />
              <button
                onClick={entrarSala}
                disabled={codigoSala.length !== 6 || isJoining}
                className="bg-[#3b82f6] hover:bg-[#2563eb] disabled:bg-white/10 disabled:text-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:cursor-not-allowed"
              >
                {isJoining ? '...' : 'Entrar'}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => router.push('/enem/batalha/historico')}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <div>
                  <p className="text-white font-bold">Historico</p>
                  <p className="text-white/50 text-xs">Suas batalhas</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => router.push('/enem/batalha/arena')}
              className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-left transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏟️</span>
                <div>
                  <p className="text-purple-300 font-bold">Arena Semanal</p>
                  <p className="text-white/50 text-xs">Ranking Top 10</p>
                </div>
              </div>
            </button>
          </div>

          {/* Rules Card */}
          <div className="bg-[#0d2818] rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span>📋</span> Como Funciona
            </h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#fbbf24]">1.</span>
                <span>Crie uma sala ou entre com codigo de um amigo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#fbbf24]">2.</span>
                <span>Ambos respondem as mesmas questoes simultaneamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#fbbf24]">3.</span>
                <span>Quem acertar mais ganha! Empate se igual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#fbbf24]">4.</span>
                <span>Ganhe FP e suba no ranking da Arena!</span>
              </li>
            </ul>

            <div className="mt-4 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FPCoin size="sm" />
                  <span className="text-[#22c55e] font-bold">Vitoria</span>
                </div>
                <span className="text-[#fbbf24] font-bold flex items-center gap-1">
                  <img src="/moedafp1.png" alt="FP" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  +100 FP
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white/50 text-sm">Vitoria Perfeita</span>
                <span className="text-purple-400 font-bold text-sm flex items-center gap-1">
                  <img src="/moedafp2.png" alt="FP" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                  +150 FP
                </span>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/enem')}
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Voltar ao Menu
            </button>
          </div>
        </div>
      </div>

      {/* Mode Selection Modal */}
      <AnimatePresence>
        {showModeSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModeSelect(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-b from-[#1a472a] to-[#0d2818] rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white text-center mb-6" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                Escolha o Modo
              </h2>

              <div className="space-y-3">
                {(Object.keys(MODE_CONFIG) as BattleMode[]).map((mode) => {
                  const config = MODE_CONFIG[mode];
                  return (
                    <button
                      key={mode}
                      onClick={() => criarSala(mode)}
                      disabled={isCreating}
                      className="w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      style={{
                        backgroundColor: `${config.color}20`,
                        border: `2px solid ${config.color}`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{config.icon}</span>
                        <div className="flex-1">
                          <p className="text-white font-bold text-lg">{config.name}</p>
                          <p className="text-white/60 text-sm">{config.description}</p>
                        </div>
                        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowModeSelect(false)}
                className="w-full mt-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
