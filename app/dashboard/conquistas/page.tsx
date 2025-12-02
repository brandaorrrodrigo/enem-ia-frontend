'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Badge {
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
  categoria: string;
  pontos: number;
  unlocked: boolean;
  unlockedAt: string | null;
}

interface NivelConfig {
  nivel: number;
  nome: string;
  pontosMin: number;
  icone: string;
}

interface ScoreData {
  usuario: {
    id: string;
    nome: string;
    nivel: string;
  };
  score: {
    totalPoints: number;
    nivelAtual: NivelConfig;
    proximoNivel: NivelConfig | null;
    pontosParaProximo: number;
    progresso: number;
    stats: {
      simuladosTotal: number;
      simuladosSemana: number;
      mediaNotas: number;
      melhorNota: number;
    };
    porArea: {
      matematica: { acertos: number; total: number; percentual: number };
      linguagens: { acertos: number; total: number; percentual: number };
      humanas: { acertos: number; total: number; percentual: number };
      natureza: { acertos: number; total: number; percentual: number };
    };
  };
  streak: {
    atual: number;
    maximo: number;
  };
  badges: {
    desbloqueados: number;
  };
}

interface StreakData {
  streakAtual: number;
  streakMaximo: number;
  streakEmRisco: boolean;
  horasRestantes: number;
  mensagem: string;
}

export default function ConquistasPage() {
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [activeTab, setActiveTab] = useState<'badges' | 'stats' | 'ranking'>('badges');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Tentar obter userId do localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Para demo, usar um ID temporário
      const tempId = 'demo-user';
      setUserId(tempId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const [badgesRes, scoreRes, streakRes] = await Promise.all([
        fetch(`/api/gamification/badges?usuarioId=${userId}`),
        fetch(`/api/gamification/score?usuarioId=${userId}`),
        fetch(`/api/gamification/streak?usuarioId=${userId}`),
      ]);

      if (badgesRes.ok) {
        const data = await badgesRes.json();
        setBadges(data.badges || []);
      }

      if (scoreRes.ok) {
        const data = await scoreRes.json();
        setScoreData(data);
      }

      if (streakRes.ok) {
        const data = await streakRes.json();
        setStreakData(data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  const badgesDesbloqueados = badges.filter(b => b.unlocked);
  const badgesBloqueados = badges.filter(b => !b.unlocked);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Conquistas</h1>
          <p className="text-gray-400">Acompanhe seu progresso e desbloqueie badges</p>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Nível */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="text-4xl mb-2">{scoreData?.score.nivelAtual.icone || '📘'}</div>
            <div className="text-lg font-bold">{scoreData?.score.nivelAtual.nome || 'Calouro'}</div>
            <div className="text-sm text-gray-400">Nível {scoreData?.score.nivelAtual.nivel || 1}</div>
            {scoreData?.score.proximoNivel && (
              <div className="mt-2">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${scoreData.score.progresso}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {scoreData.score.pontosParaProximo} pts para {scoreData.score.proximoNivel.nome}
                </div>
              </div>
            )}
          </div>

          {/* Pontos */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-bold">{scoreData?.score.totalPoints || 0}</div>
            <div className="text-sm text-gray-400">Pontos totais</div>
          </div>

          {/* Streak */}
          <div className={`rounded-xl p-4 border ${
            streakData?.streakEmRisco
              ? 'bg-red-900/30 border-red-700'
              : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-2xl font-bold">{streakData?.streakAtual || 0} dias</div>
            <div className="text-sm text-gray-400">
              {streakData?.streakEmRisco ? 'Em risco!' : 'Sequência atual'}
            </div>
            {streakData?.streakEmRisco && (
              <div className="text-xs text-red-400 mt-1">
                {Math.round(streakData.horasRestantes)}h restantes
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-2xl font-bold">{badgesDesbloqueados.length}/{badges.length}</div>
            <div className="text-sm text-gray-400">Badges desbloqueados</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-700 pb-2">
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'badges'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Badges
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'stats'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Estatísticas
          </button>
        </div>

        {/* Conteúdo das tabs */}
        {activeTab === 'badges' && (
          <div>
            {/* Badges desbloqueados */}
            {badgesDesbloqueados.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-green-400">
                  ✅ Desbloqueados ({badgesDesbloqueados.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {badgesDesbloqueados.map((badge) => (
                    <div
                      key={badge.codigo}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-green-700/50 hover:border-green-500 transition"
                    >
                      <div className="text-4xl mb-2">{badge.icone}</div>
                      <div className="font-bold">{badge.nome}</div>
                      <div className="text-sm text-gray-400">{badge.descricao}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-yellow-400 text-sm">+{badge.pontos} pts</span>
                        {badge.unlockedAt && (
                          <span className="text-xs text-gray-500">
                            {new Date(badge.unlockedAt).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Badges bloqueados */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-400">
                🔒 Bloqueados ({badgesBloqueados.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {badgesBloqueados.map((badge) => (
                  <div
                    key={badge.codigo}
                    className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 opacity-60"
                  >
                    <div className="text-4xl mb-2 grayscale">{badge.icone}</div>
                    <div className="font-bold">{badge.nome}</div>
                    <div className="text-sm text-gray-500">{badge.descricao}</div>
                    <div className="mt-2">
                      <span className="text-gray-500 text-sm">+{badge.pontos} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && scoreData && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Estatísticas gerais */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">Estatísticas Gerais</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Simulados completados</span>
                  <span className="font-bold text-xl">{scoreData.score.stats.simuladosTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Simulados esta semana</span>
                  <span className="font-bold text-xl">{scoreData.score.stats.simuladosSemana}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Média de notas</span>
                  <span className="font-bold text-xl">{scoreData.score.stats.mediaNotas}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Melhor nota</span>
                  <span className="font-bold text-xl text-green-400">{scoreData.score.stats.melhorNota}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Maior sequência</span>
                  <span className="font-bold text-xl">{streakData?.streakMaximo || 0} dias</span>
                </div>
              </div>
            </div>

            {/* Performance por área */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4">Performance por Área</h3>
              <div className="space-y-4">
                {Object.entries(scoreData.score.porArea).map(([area, stats]) => (
                  <div key={area}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="capitalize text-gray-300">
                        {area === 'matematica' && '📐 Matemática'}
                        {area === 'linguagens' && '📚 Linguagens'}
                        {area === 'humanas' && '🌍 Humanas'}
                        {area === 'natureza' && '🔬 Natureza'}
                      </span>
                      <span className={`font-bold ${
                        stats.percentual >= 80 ? 'text-green-400' :
                        stats.percentual >= 60 ? 'text-yellow-400' :
                        stats.percentual > 0 ? 'text-red-400' : 'text-gray-500'
                      }`}>
                        {stats.total > 0 ? `${stats.percentual}%` : '-'}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          stats.percentual >= 80 ? 'bg-green-500' :
                          stats.percentual >= 60 ? 'bg-yellow-500' :
                          stats.percentual > 0 ? 'bg-red-500' : 'bg-gray-600'
                        }`}
                        style={{ width: `${stats.percentual}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stats.acertos}/{stats.total} questões
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
