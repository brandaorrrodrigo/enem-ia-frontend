'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import ActivityFeed from '@/components/social/ActivityFeed';
import ProvocacaoCard from '@/components/social/ProvocacaoCard';
import LeagueCard from '@/components/social/LeagueCard';

interface UserStats {
  nome: string;
  pontosFP: number;
  fpHoje: number;
  fpSemana: number;
  posicaoRanking: number;
  seguidores: number;
  seguindo: number;
  streak: number;
}

export default function FeedSocialPage() {
  const router = useRouter();
  const [feedType, setFeedType] = useState<'global' | 'amigos'>('global');
  const [userStats, setUserStats] = useState<UserStats>({
    nome: 'Estudante',
    pontosFP: 2450,
    fpHoje: 45,
    fpSemana: 320,
    posicaoRanking: 127,
    seguidores: 23,
    seguindo: 18,
    streak: 7,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar dados do usuario
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      setUserStats(prev => ({
        ...prev,
        nome: user.nome || 'Estudante',
        pontosFP: user.pontosFP || 2450,
      }));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />

      {/* Header */}
      <div className="mb-6 pt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="title-ia flex items-center gap-3 mb-2">
              📱 Feed Social
            </h1>
            <p className="subtitle-ia mb-0">
              Veja o que esta rolando na comunidade ENEM-IA!
            </p>
          </div>

          {/* Stats rapidos */}
          <div className="flex items-center gap-4">
            <div className="stat-ia">
              <span className="stat-ia-value text-green-400">+{userStats.fpHoje}</span>
              <span className="stat-ia-label">FP Hoje</span>
            </div>
            <div className="stat-ia">
              <span className="stat-ia-value">#{userStats.posicaoRanking}</span>
              <span className="stat-ia-label">Ranking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Provocacao do dia */}
      <div className="mb-6">
        <ProvocacaoCard userName={userStats.nome} userFP={userStats.pontosFP} />
      </div>

      {/* Layout principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Feed principal */}
        <div className="lg:col-span-2">
          {/* Tabs de filtro */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFeedType('global')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                feedType === 'global'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🌍 Global
            </button>
            <button
              onClick={() => setFeedType('amigos')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                feedType === 'amigos'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              👥 Amigos
            </button>
          </div>

          {/* Feed de atividades */}
          <ActivityFeed feedType={feedType} limit={15} />

          {/* Carregar mais */}
          <button className="w-full btn-ia-secondary mt-4 py-3">
            📥 Carregar mais atividades
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Card de Liga */}
          <LeagueCard userFP={userStats.pontosFP} userName={userStats.nome} />

          {/* Estatisticas da semana */}
          <div className="card-ia p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              📊 Sua Semana
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">FP ganho</span>
                <span className="text-yellow-300 font-bold">+{userStats.fpSemana}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Streak atual</span>
                <span className="text-orange-400 font-bold">{userStats.streak}🔥</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Posicao</span>
                <span className="text-white font-bold">#{userStats.posicaoRanking}</span>
              </div>
              <div className="divider-ia"></div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Seguidores</span>
                <span className="text-white">{userStats.seguidores}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Seguindo</span>
                <span className="text-white">{userStats.seguindo}</span>
              </div>
            </div>
          </div>

          {/* Sugestoes de usuarios */}
          <div className="card-ia p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              👥 Quem Seguir
            </h3>
            <div className="space-y-3">
              {[
                { nome: 'Maria Silva', fp: 3200, liga: 'Ouro' },
                { nome: 'Pedro Costa', fp: 2890, liga: 'Ouro' },
                { nome: 'Julia Santos', fp: 4100, liga: 'Platina' },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {user.nome.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{user.nome}</p>
                    <p className="text-white/50 text-xs">{user.fp} FP</p>
                  </div>
                  <button className="px-3 py-1 bg-yellow-400 text-slate-900 rounded-lg text-xs font-semibold hover:bg-yellow-300 transition">
                    Seguir
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/enem/amigos')}
              className="w-full btn-ia-secondary mt-4 text-sm py-2"
            >
              Ver mais sugestoes
            </button>
          </div>

          {/* CTA para simulado */}
          <div className="card-ia p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30">
            <div className="text-center">
              <span className="text-4xl mb-3 block">🚀</span>
              <h3 className="text-white font-bold mb-2">Bora ganhar FP?</h3>
              <p className="text-white/70 text-sm mb-4">
                Faca um simulado e apareca no feed!
              </p>
              <button
                onClick={() => router.push('/enem/simulado')}
                className="btn-ia w-full py-3"
              >
                Fazer Simulado
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mensagem motivacional */}
      <div className="card-ia p-6 mt-6 text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30">
        <p className="text-white text-lg">
          🔥 <span className="font-bold text-yellow-300">{userStats.nome}</span>, o feed esta fervendo hoje!
          Nao deixe seus amigos te ultrapassarem!
        </p>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
