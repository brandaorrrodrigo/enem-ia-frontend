'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DashboardData {
  totalFP: number;
  weeklyFP: number;
  monthlyFP: number;
  streakDays: number;
  stats: {
    totalChallenges: number;
    avgAccuracy: number;
    betsWon: number;
    betsLost: number;
    betsWinRate: number;
    biggestWin: number;
    fpGainedWeek: number;
    fpLostWeek: number;
  };
  recentChallenges: Array<{
    type: string;
    difficulty: string;
    accuracy: number;
    fpEarned: number;
    date: string;
  }>;
  recentBets: Array<{
    amount: number;
    status: string;
    accuracy: number | null;
    fpDelta: number;
    date: string;
  }>;
  jackpot: {
    position: number | null;
    participating: boolean;
  };
  weeklyChart: Array<{
    day: string;
    gained: number;
    lost: number;
  }>;
  badges: Array<{
    id: string;
    name: string;
    icon: string;
    earned: boolean;
  }>;
}

interface FPDashboardProps {
  userId: string;
}

export default function FPDashboard({ userId }: FPDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'badges'>('overview');

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(`/api/fp/dashboard?userId=${userId}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
      }
      setLoading(false);
    }

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000); // Atualiza a cada 30s
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) {
    return (
      <div className="animate-pulse p-6 rounded-2xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="h-8 bg-white/10 rounded w-1/3 mb-4"></div>
        <div className="h-24 bg-white/10 rounded mb-4"></div>
        <div className="h-48 bg-white/10 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-white/50">
        Erro ao carregar dados
      </div>
    );
  }

  const maxChartValue = Math.max(
    ...data.weeklyChart.map(d => Math.max(d.gained, d.lost)),
    1
  );

  return (
    <div className="space-y-6">
      {/* Header com FP Total */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(145deg, #1a4030, #0e2818)',
          border: '3px solid #8B4513',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center justify-center gap-2">
              <img src="/moedafp1.png" alt="FP" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              {data.totalFP}
            </div>
            <div className="text-white/70 text-sm">FP Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-400 flex items-center justify-center gap-2">
              <img src="/moedafp1.png" alt="FP" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              +{data.weeklyFP}
            </div>
            <div className="text-white/70 text-sm">Esta Semana</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 flex items-center justify-center gap-2">
              <img src="/moedafp1.png" alt="FP" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              +{data.monthlyFP}
            </div>
            <div className="text-white/70 text-sm">Este Mes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-400">
              {data.streakDays}🔥
            </div>
            <div className="text-white/70 text-sm">Dias Seguidos</div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['overview', 'history', 'badges'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            {tab === 'overview' && '📊 Visao Geral'}
            {tab === 'history' && '📜 Historico'}
            {tab === 'badges' && '🏅 Conquistas'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Estatisticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Desafios"
              value={data.stats.totalChallenges.toString()}
              icon="📝"
            />
            <StatCard
              label="Acuracia Media"
              value={`${data.stats.avgAccuracy}%`}
              icon="🎯"
            />
            <StatCard
              label="Taxa de Vitoria"
              value={`${data.stats.betsWinRate}%`}
              icon="🎰"
            />
            <StatCard
              label="Maior Ganho"
              value={`+${data.stats.biggestWin} FP`}
              icon="🏆"
              useCoin={true}
            />
          </div>

          {/* Grafico Semanal */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(145deg, #1a4030, #0e2818)',
              border: '3px solid #8B4513',
            }}
          >
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              📈 FP Semanal
            </h3>
            <div className="flex items-end gap-2 h-32">
              {data.weeklyChart.map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="flex-1 w-full flex flex-col justify-end gap-1">
                    {day.gained > 0 && (
                      <div
                        className="w-full bg-green-500 rounded-t"
                        style={{
                          height: `${(day.gained / maxChartValue) * 80}px`,
                          minHeight: '4px',
                        }}
                      />
                    )}
                    {day.lost > 0 && (
                      <div
                        className="w-full bg-red-500 rounded-t"
                        style={{
                          height: `${(day.lost / maxChartValue) * 80}px`,
                          minHeight: '4px',
                        }}
                      />
                    )}
                  </div>
                  <span className="text-white/50 text-xs mt-2">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-white/70 text-sm">Ganhos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-white/70 text-sm">Perdas</span>
              </div>
            </div>
          </div>

          {/* Jackpot Status */}
          {data.jackpot.participating && (
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'linear-gradient(145deg, #9333ea20, #9333ea10)',
                border: '2px solid #9333ea50',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-white/70">🏆 Posicao no Jackpot</span>
                <span className="text-purple-400 font-bold text-xl">
                  #{data.jackpot.position}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Historico de Desafios */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(145deg, #1a4030, #0e2818)',
              border: '3px solid #8B4513',
            }}
          >
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              📝 Desafios Recentes
            </h3>
            <div className="space-y-2">
              {data.recentChallenges.length === 0 ? (
                <p className="text-white/50 text-center py-4">
                  Nenhum desafio completado ainda
                </p>
              ) : (
                data.recentChallenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {c.type === 'normal' && '📚'}
                        {c.type === 'turbo' && '⚡'}
                        {c.type === 'maratona' && '🏃'}
                      </span>
                      <div>
                        <div className="text-white font-semibold capitalize">
                          {c.type} - {c.difficulty}
                        </div>
                        <div className="text-white/50 text-sm">
                          {c.accuracy}% acuracia
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold flex items-center gap-1">
                      <img src="/moedafp1.png" alt="FP" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                      +{c.fpEarned} FP
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Historico de Apostas */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(145deg, #1a4030, #0e2818)',
              border: '3px solid #8B4513',
            }}
          >
            <h3
              className="text-lg font-bold text-white mb-4"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              🎰 Apostas Recentes
            </h3>
            <div className="space-y-2">
              {data.recentBets.length === 0 ? (
                <p className="text-white/50 text-center py-4">
                  Nenhuma aposta realizada ainda
                </p>
              ) : (
                data.recentBets.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {b.status === 'win' ? '🎉' : '😔'}
                      </span>
                      <div>
                        <div className="text-white font-semibold">
                          Aposta de {b.amount} FP
                        </div>
                        <div className="text-white/50 text-sm">
                          {b.accuracy !== null ? `${b.accuracy}% acuracia` : 'Em andamento'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-bold flex items-center gap-1 ${
                        b.status === 'win' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      <img src={b.status === 'win' ? '/moedafp1.png' : '/moedafp1.png'} alt="FP" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                      {b.fpDelta > 0 ? '+' : ''}{b.fpDelta} FP
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(145deg, #1a4030, #0e2818)',
            border: '3px solid #8B4513',
          }}
        >
          <h3
            className="text-lg font-bold text-white mb-4"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            🏅 Conquistas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center transition-all ${
                  badge.earned
                    ? 'bg-yellow-500/20 border-2 border-yellow-500/50'
                    : 'bg-white/5 border-2 border-white/10 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="text-white font-semibold text-sm">{badge.name}</div>
                {badge.earned ? (
                  <div className="text-green-400 text-xs mt-1">✓ Conquistado</div>
                ) : (
                  <div className="text-white/30 text-xs mt-1">Bloqueado</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de Card de Estatistica
function StatCard({ label, value, icon, useCoin }: { label: string; value: string; icon: string; useCoin?: boolean }) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{
        background: 'linear-gradient(145deg, #1a4030, #0e2818)',
        border: '2px solid #8B4513',
      }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
        {useCoin && <img src="/moedafp1.png" alt="FP" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />}
        {value}
      </div>
      <div className="text-white/50 text-xs">{label}</div>
    </div>
  );
}
