'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import FPCoin from '@/components/FPCoin';
import FloatingBackButton from '@/components/FloatingBackButton';

interface BattleRecord {
  battleId: string;
  mode: 'classic' | 'turbo' | 'marathon' | 'transmitido';
  user1: {
    id: string;
    name: string;
    acertos: number;
    tempoMedio: number;
    fpGanho: number;
    streak: number;
    perfectRound: boolean;
  };
  user2: {
    id: string;
    name: string;
    acertos: number;
    tempoMedio: number;
    fpGanho: number;
    streak: number;
    perfectRound: boolean;
  };
  vencedor: string | null;
  data: string;
  duracao: number;
}

interface BattleHistory {
  battles: BattleRecord[];
  totalVitorias: number;
  totalDerrotas: number;
  totalEmpates: number;
  totalFPGanho: number;
  winStreak: number;
  maxWinStreak: number;
}

type FilterType = 'all' | 'victory' | 'defeat' | 'draw';
type ModeFilter = 'all' | 'classic' | 'turbo' | 'marathon';

const MODE_LABELS = {
  classic: { label: 'Classico', icon: '⚔️', color: '#22c55e' },
  turbo: { label: 'Turbo', icon: '⚡', color: '#fbbf24' },
  marathon: { label: 'Maratona', icon: '🏃', color: '#3b82f6' },
  transmitido: { label: 'AO VIVO', icon: '📺', color: '#ef4444' },
};

export default function HistoricoBatalhasPage() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState<string>('');
  const [history, setHistory] = useState<BattleHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterResult, setFilterResult] = useState<FilterType>('all');
  const [filterMode, setFilterMode] = useState<ModeFilter>('all');

  useEffect(() => {
    const id = localStorage.getItem('enem-pro-player-id');
    if (id) {
      setPlayerId(id);
      loadHistory(id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadHistory = async (id: string) => {
    try {
      const res = await fetch(`/api/battles?action=history&playerId=${id}`);
      const data = await res.json();
      if (data.success) {
        setHistory(data.history);
      }
    } catch (error) {
      console.error('Erro ao carregar historico:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getResult = (battle: BattleRecord): 'victory' | 'defeat' | 'draw' => {
    if (battle.vencedor === null) return 'draw';
    const isUser1 = battle.user1.id === playerId;
    const myId = isUser1 ? battle.user1.id : battle.user2.id;
    return battle.vencedor === myId ? 'victory' : 'defeat';
  };

  const getMyData = (battle: BattleRecord) => {
    return battle.user1.id === playerId ? battle.user1 : battle.user2;
  };

  const getOpponentData = (battle: BattleRecord) => {
    return battle.user1.id === playerId ? battle.user2 : battle.user1;
  };

  const filteredBattles = history?.battles.filter(battle => {
    const result = getResult(battle);
    if (filterResult !== 'all' && result !== filterResult) return false;
    if (filterMode !== 'all' && battle.mode !== filterMode) return false;
    return true;
  }) || [];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRevanche = async (opponentId: string) => {
    try {
      const playerName = localStorage.getItem('enem-pro-player-name') || 'Jogador';
      const res = await fetch('/api/battles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          playerId,
          playerName,
          mode: 'classic',
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/enem/batalha/sala/${data.roomCode}`);
      }
    } catch (error) {
      console.error('Erro ao criar revanche:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] flex items-center justify-center">
      <FloatingBackButton />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fbbf24]/20 border-t-[#fbbf24] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Carregando historico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] pb-24">
      <FloatingNav />

      {/* Header */}
      <div className="pt-20 px-4 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.push('/enem/batalha')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                Historico de Batalhas
              </h1>
              <p className="text-white/60 text-sm">Suas ultimas batalhas 1v1</p>
            </div>
          </div>

          {/* Stats Cards */}
          {history && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="bg-[#22c55e]/20 border border-[#22c55e]/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-[#22c55e]">{history.totalVitorias}</p>
                <p className="text-xs text-white/60">Vitorias</p>
              </div>
              <div className="bg-[#ef4444]/20 border border-[#ef4444]/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-[#ef4444]">{history.totalDerrotas}</p>
                <p className="text-xs text-white/60">Derrotas</p>
              </div>
              <div className="bg-[#fbbf24]/20 border border-[#fbbf24]/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-[#fbbf24]">{history.totalEmpates}</p>
                <p className="text-xs text-white/60">Empates</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <FPCoin size="sm" />
                  <p className="text-xl font-bold text-[#fbbf24]">{history.totalFPGanho}</p>
                </div>
                <p className="text-xs text-white/60">FP Total</p>
              </div>
            </div>
          )}

          {/* Streak Info */}
          {history && history.maxWinStreak > 0 && (
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-3 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-white font-bold">Maior Sequencia</p>
                  <p className="text-white/60 text-sm">{history.maxWinStreak} vitorias seguidas</p>
                </div>
              </div>
              {history.winStreak > 0 && (
                <div className="text-right">
                  <p className="text-orange-400 font-bold">{history.winStreak}x</p>
                  <p className="text-white/60 text-xs">atual</p>
                </div>
              )}
            </div>
          )}

          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <select
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value as FilterType)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#22c55e]"
            >
              <option value="all">Todos</option>
              <option value="victory">Vitorias</option>
              <option value="defeat">Derrotas</option>
              <option value="draw">Empates</option>
            </select>

            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value as ModeFilter)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#22c55e]"
            >
              <option value="all">Todos os modos</option>
              <option value="classic">Classico</option>
              <option value="turbo">Turbo</option>
              <option value="marathon">Maratona</option>
            </select>
          </div>

          {/* Battle List */}
          <div className="space-y-3">
            <AnimatePresence>
              {filteredBattles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-white/60">Nenhuma batalha encontrada</p>
                  <button
                    onClick={() => router.push('/enem/batalha')}
                    className="mt-4 bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2 rounded-xl font-bold transition-all"
                  >
                    Iniciar Batalha
                  </button>
                </div>
              ) : (
                filteredBattles.map((battle, index) => {
                  const result = getResult(battle);
                  const myData = getMyData(battle);
                  const opponentData = getOpponentData(battle);
                  const modeInfo = MODE_LABELS[battle.mode];

                  return (
                    <motion.div
                      key={battle.battleId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-[#0d2818] rounded-xl overflow-hidden border border-white/10"
                    >
                      {/* Header */}
                      <div
                        className="px-4 py-2 flex items-center justify-between"
                        style={{
                          backgroundColor: result === 'victory' ? 'rgba(34, 197, 94, 0.1)' :
                            result === 'defeat' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                          borderBottom: `2px solid ${result === 'victory' ? '#22c55e' :
                            result === 'defeat' ? '#ef4444' : '#fbbf24'}40`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {result === 'victory' ? '🏆' : result === 'defeat' ? '😔' : '🤝'}
                          </span>
                          <span
                            className="font-bold"
                            style={{
                              color: result === 'victory' ? '#22c55e' :
                                result === 'defeat' ? '#ef4444' : '#fbbf24',
                            }}
                          >
                            {result === 'victory' ? 'VITORIA' : result === 'defeat' ? 'DERROTA' : 'EMPATE'}
                          </span>
                          {myData.perfectRound && (
                            <span className="text-purple-400 text-xs">💎 PERFEITO</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{ backgroundColor: modeInfo.color + '30', color: modeInfo.color }}
                          >
                            {modeInfo.icon} {modeInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
                            >
                              {myData.acertos}
                            </div>
                            <div>
                              <p className="text-white font-bold">{myData.name}</p>
                              <p className="text-white/50 text-xs">Voce</p>
                            </div>
                          </div>

                          <div className="text-2xl text-white/30 font-bold">VS</div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-white font-bold">{opponentData.name}</p>
                              <p className="text-white/50 text-xs">Oponente</p>
                            </div>
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                              style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}
                            >
                              {opponentData.acertos}
                            </div>
                          </div>
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <FPCoin size="sm" />
                              <span className="text-[#fbbf24] font-bold">+{myData.fpGanho}</span>
                            </div>
                            <span className="text-white/40">|</span>
                            <span className="text-white/60">
                              ⏱️ {Math.round(myData.tempoMedio / 1000)}s medio
                            </span>
                          </div>
                          <span className="text-white/40 text-xs">{formatDate(battle.data)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="px-4 pb-4">
                        <button
                          onClick={() => handleRevanche(opponentData.id)}
                          className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                        >
                          <span>🔄</span> Revanche
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
