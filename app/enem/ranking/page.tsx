'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import LeaderboardTable from '@/components/social/LeaderboardTable';
import LeagueCard from '@/components/social/LeagueCard';

interface UserData {
  nome: string;
  pontosFP: number;
  liga: string;
  posicaoGlobal: number;
  posicaoLiga: number;
}

const LIGAS = [
  { id: 'bronze', nome: 'Bronze', emoji: '🥉', cor: 'from-amber-700/30 to-amber-600/30 border-amber-500/50' },
  { id: 'prata', nome: 'Prata', emoji: '🥈', cor: 'from-gray-500/30 to-gray-400/30 border-gray-400/50' },
  { id: 'ouro', nome: 'Ouro', emoji: '🥇', cor: 'from-yellow-600/30 to-amber-500/30 border-yellow-500/50' },
  { id: 'platina', nome: 'Platina', emoji: '💎', cor: 'from-cyan-600/30 to-cyan-400/30 border-cyan-400/50' },
  { id: 'diamante', nome: 'Diamante', emoji: '💠', cor: 'from-blue-600/30 to-blue-400/30 border-blue-400/50' },
  { id: 'mestre', nome: 'Mestre', emoji: '👑', cor: 'from-purple-600/30 to-pink-500/30 border-purple-400/50' },
];

export default function RankingPage() {
  const router = useRouter();
  const [rankingType, setRankingType] = useState<'global' | 'liga' | 'amigos'>('global');
  const [userData, setUserData] = useState<UserData>({
    nome: 'Estudante',
    pontosFP: 2450,
    liga: 'Ouro',
    posicaoGlobal: 127,
    posicaoLiga: 23,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      setUserData(prev => ({
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
          <p className="title-ia-sm">Carregando ranking...</p>
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
              🏆 Ranking & Ligas
            </h1>
            <p className="subtitle-ia mb-0">
              Compita com outros estudantes e suba de liga!
            </p>
          </div>

          {/* Posicao atual */}
          <div className="flex items-center gap-4">
            <div className="stat-ia">
              <span className="stat-ia-value">#{userData.posicaoGlobal}</span>
              <span className="stat-ia-label">Global</span>
            </div>
            <div className="stat-ia">
              <span className="stat-ia-value">#{userData.posicaoLiga}</span>
              <span className="stat-ia-label">Na Liga</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sistema de Ligas */}
      <div className="mb-8">
        <h2 className="title-ia-sm mb-4">Sistema de Ligas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {LIGAS.map((liga) => (
            <div
              key={liga.id}
              className={`card-ia p-4 text-center bg-gradient-to-br ${liga.cor} border-2 ${
                userData.liga === liga.nome ? 'ring-2 ring-yellow-400 scale-105' : 'opacity-70'
              } transition-all hover:opacity-100 cursor-pointer`}
            >
              <span className="text-3xl mb-2 block">{liga.emoji}</span>
              <p className="text-white font-bold text-sm">{liga.nome}</p>
              {userData.liga === liga.nome && (
                <span className="text-yellow-300 text-xs mt-1 block">Voce esta aqui!</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ranking */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setRankingType('global')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                rankingType === 'global'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🌍 Global
            </button>
            <button
              onClick={() => setRankingType('liga')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                rankingType === 'liga'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🏅 Minha Liga
            </button>
            <button
              onClick={() => setRankingType('amigos')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                rankingType === 'amigos'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              👥 Amigos
            </button>
          </div>

          {/* Tabela de ranking */}
          <LeaderboardTable type={rankingType} limit={15} showProvocations={true} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sua Liga */}
          <LeagueCard userFP={userData.pontosFP} userName={userData.nome} />

          {/* Conquistas de Ranking */}
          <div className="card-ia p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              🏅 Conquistas de Ranking
            </h3>
            <div className="space-y-3">
              {[
                { nome: 'Top 100', emoji: '🌟', desc: 'Entre no top 100 global', conquistado: userData.posicaoGlobal <= 100 },
                { nome: 'Top 50', emoji: '⭐', desc: 'Entre no top 50 global', conquistado: userData.posicaoGlobal <= 50 },
                { nome: 'Top 10', emoji: '👑', desc: 'Entre no top 10 global', conquistado: userData.posicaoGlobal <= 10 },
                { nome: 'Lider da Liga', emoji: '🥇', desc: 'Seja #1 na sua liga', conquistado: userData.posicaoLiga === 1 },
              ].map((conquista, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    conquista.conquistado ? 'bg-yellow-400/20' : 'bg-white/5 opacity-50'
                  }`}
                >
                  <span className="text-2xl">{conquista.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${conquista.conquistado ? 'text-yellow-300' : 'text-white/70'}`}>
                      {conquista.nome}
                    </p>
                    <p className="text-white/50 text-xs">{conquista.desc}</p>
                  </div>
                  {conquista.conquistado && <span className="ml-auto text-green-400">✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Dicas */}
          <div className="card-ia p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/30">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              💡 Como Subir no Ranking
            </h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Faca simulados diariamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Mantenha sua streak ativa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Complete desafios semanais</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Participe de salas de desafio</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push('/enem/simulado')}
            className="btn-ia w-full py-4 text-lg"
          >
            🚀 Fazer Simulado e Subir!
          </button>
        </div>
      </div>

      {/* Mensagem motivacional */}
      <div className="card-ia p-6 mt-6 text-center">
        <p className="text-white text-lg">
          ⚡ O ranking atualiza em tempo real! Continue estudando para subir de posicao e conquistar a{' '}
          <span className="text-yellow-300 font-bold">Liga {userData.liga}</span>!
        </p>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
