'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import FPCoin from '@/components/FPCoin';
import FloatingBackButton from '@/components/FloatingBackButton';

interface ArenaEntry {
  rank: number;
  playerId: string;
  playerName: string;
  avatar?: string;
  league: string;
  vitorias: number;
  derrotas: number;
  winRate: number;
  fpGanho: number;
  perfectWins: number;
}

interface ArenaData {
  weekStart: string;
  weekEnd: string;
  entries: ArenaEntry[];
  myRank?: number;
  topRewards: {
    rank: number;
    fpBonus: number;
    badge?: string;
  }[];
}

const LEAGUE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Bronze: { bg: 'rgba(205, 127, 50, 0.2)', text: '#cd7f32', border: '#cd7f32' },
  Prata: { bg: 'rgba(192, 192, 192, 0.2)', text: '#c0c0c0', border: '#c0c0c0' },
  Ouro: { bg: 'rgba(255, 215, 0, 0.2)', text: '#ffd700', border: '#ffd700' },
  Platina: { bg: 'rgba(229, 228, 226, 0.2)', text: '#e5e4e2', border: '#e5e4e2' },
  Diamante: { bg: 'rgba(185, 242, 255, 0.2)', text: '#b9f2ff', border: '#b9f2ff' },
  Mestre: { bg: 'rgba(148, 0, 211, 0.2)', text: '#9400d3', border: '#9400d3' },
};

const RANK_STYLES: Record<number, { emoji: string; color: string }> = {
  1: { emoji: '🥇', color: '#ffd700' },
  2: { emoji: '🥈', color: '#c0c0c0' },
  3: { emoji: '🥉', color: '#cd7f32' },
};

export default function ArenaSemanalPage() {
  const router = useRouter();
  const [playerId, setPlayerId] = useState<string>('');
  const [arenaData, setArenaData] = useState<ArenaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('enem-pro-player-id');
    if (id) {
      setPlayerId(id);
    }
    loadArenaData(id || '');
  }, []);

  useEffect(() => {
    if (!arenaData) return;

    const updateTimer = () => {
      const end = new Date(arenaData.weekEnd);
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Encerrado');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [arenaData]);

  const loadArenaData = async (id: string) => {
    try {
      const res = await fetch(`/api/battles?action=arena&playerId=${id}`);
      const data = await res.json();
      if (data.success) {
        setArenaData(data.arena);
      }
    } catch (error) {
      console.error('Erro ao carregar arena:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] flex items-center justify-center">
      <FloatingBackButton />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fbbf24]/20 border-t-[#fbbf24] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Carregando arena...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d2818] to-[#1a472a] pb-24">
      <FloatingNav />

      {/* Header */}
      <div className="pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
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
                Arena Semanal
              </h1>
              <p className="text-white/60 text-sm">Ranking de batalhas 1v1</p>
            </div>
          </div>

          {/* Timer Banner */}
          {arenaData && (
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏟️</span>
                  <div>
                    <p className="text-white font-bold">Temporada Ativa</p>
                    <p className="text-white/60 text-sm">
                      {formatDate(arenaData.weekStart)} - {formatDate(arenaData.weekEnd)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Termina em</p>
                  <p className="text-xl font-bold text-[#fbbf24]">{timeLeft}</p>
                </div>
              </div>
            </div>
          )}

          {/* My Rank Card */}
          {arenaData?.myRank && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0d2818] rounded-xl p-4 mb-6 border-2 border-[#22c55e]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">#{arenaData.myRank}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold">Sua Posicao</p>
                    <p className="text-white/60 text-sm">
                      {arenaData.myRank <= 10 ? 'Elegivel para recompensas!' : 'Continue lutando!'}
                    </p>
                  </div>
                </div>
                {arenaData.myRank <= 10 && (
                  <div className="text-right">
                    <p className="text-[#22c55e] font-bold text-lg">
                      +{arenaData.topRewards.find(r => r.rank >= arenaData.myRank!)?.fpBonus || 100} FP
                    </p>
                    <p className="text-white/40 text-xs">bonus no fim</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Rewards Preview */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span>🎁</span> Recompensas
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-lg p-3 text-center">
                <span className="text-2xl">🥇</span>
                <p className="text-[#ffd700] font-bold text-sm">1o Lugar</p>
                <p className="text-white/60 text-xs">+200 FP</p>
                <p className="text-purple-400 text-xs">👑 Badge</p>
              </div>
              <div className="bg-[#c0c0c0]/10 border border-[#c0c0c0]/30 rounded-lg p-3 text-center">
                <span className="text-2xl">🥈🥉</span>
                <p className="text-[#c0c0c0] font-bold text-sm">2o-3o Lugar</p>
                <p className="text-white/60 text-xs">+50 FP</p>
              </div>
              <div className="bg-[#cd7f32]/10 border border-[#cd7f32]/30 rounded-lg p-3 text-center">
                <span className="text-2xl">🏅</span>
                <p className="text-[#cd7f32] font-bold text-sm">Top 10</p>
                <p className="text-white/60 text-xs">+50 FP</p>
                <p className="text-purple-400 text-xs">🏆 Badge</p>
              </div>
            </div>
          </div>

          {/* Ranking List */}
          <div className="space-y-2">
            <h3 className="text-white font-bold mb-3">Ranking</h3>

            {!arenaData?.entries || arenaData.entries.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏟️</div>
                <p className="text-white font-bold text-lg mb-2">Arena Vazia</p>
                <p className="text-white/60 mb-4">Seja o primeiro a batalhar esta semana!</p>
                <button
                  onClick={() => router.push('/enem/batalha')}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Iniciar Batalha
                </button>
              </div>
            ) : (
              arenaData.entries.map((entry, index) => {
                const isMe = entry.playerId === playerId;
                const leagueStyle = LEAGUE_COLORS[entry.league] || LEAGUE_COLORS.Bronze;
                const rankStyle = RANK_STYLES[entry.rank];

                return (
                  <motion.div
                    key={entry.playerId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`rounded-xl p-3 flex items-center gap-3 ${
                      isMe ? 'bg-[#22c55e]/20 border-2 border-[#22c55e]' : 'bg-[#0d2818] border border-white/10'
                    }`}
                  >
                    {/* Rank */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                      style={{
                        backgroundColor: rankStyle?.color ? `${rankStyle.color}20` : 'rgba(255,255,255,0.1)',
                        color: rankStyle?.color || 'white',
                      }}
                    >
                      {rankStyle?.emoji || `#${entry.rank}`}
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold truncate ${isMe ? 'text-[#22c55e]' : 'text-white'}`}>
                          {entry.playerName}
                        </p>
                        {isMe && <span className="text-xs text-white/50">(voce)</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: leagueStyle.bg,
                            color: leagueStyle.text,
                            border: `1px solid ${leagueStyle.border}40`,
                          }}
                        >
                          {entry.league}
                        </span>
                        <span className="text-white/40 text-xs">
                          {entry.vitorias}V / {entry.derrotas}D
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <FPCoin size="sm" />
                        <span className="text-[#fbbf24] font-bold">{entry.fpGanho}</span>
                      </div>
                      <p className="text-white/40 text-xs">
                        {entry.winRate.toFixed(0)}% WR
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/enem/batalha')}
              className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#0d2818] px-8 py-3 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#fbbf24]/20"
            >
              ⚔️ Batalhar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
