'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import LeagueCard from '@/components/social/LeagueCard';
import ShareButton from '@/components/social/ShareButton';

interface UserProfile {
  id: string;
  nome: string;
  email: string;
  pontosFP: number;
  nivel: string;
  liga: string;
  streakAtual: number;
  streakMaximo: number;
  simuladosFeitos: number;
  mediaNotas: number;
  seguidores: number;
  seguindo: number;
  posicaoRanking: number;
  membroDesde: string;
  badges: { id: string; nome: string; emoji: string; data: string }[];
  estatisticasPorArea: { area: string; porcentagem: number }[];
}

const mockProfile: UserProfile = {
  id: 'user123',
  nome: 'Estudante ENEM',
  email: 'estudante@enem-ia.com',
  pontosFP: 2450,
  nivel: 'Intermediario',
  liga: 'Ouro',
  streakAtual: 7,
  streakMaximo: 21,
  simuladosFeitos: 42,
  mediaNotas: 720,
  seguidores: 23,
  seguindo: 18,
  posicaoRanking: 127,
  membroDesde: '2024-09-15',
  badges: [
    { id: '1', nome: 'Primeira Vitoria', emoji: '🏆', data: '2024-09-16' },
    { id: '2', nome: 'Streak de 7 dias', emoji: '🔥', data: '2024-09-22' },
    { id: '3', nome: 'Mestre da Matematica', emoji: '📐', data: '2024-10-01' },
    { id: '4', nome: '100 Questoes', emoji: '💯', data: '2024-10-15' },
    { id: '5', nome: 'Liga Ouro', emoji: '🥇', data: '2024-10-20' },
  ],
  estatisticasPorArea: [
    { area: 'Matematica', porcentagem: 78 },
    { area: 'Linguagens', porcentagem: 72 },
    { area: 'Ciencias Humanas', porcentagem: 85 },
    { area: 'Ciencias da Natureza', porcentagem: 68 },
  ],
};

export default function PerfilPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [activeTab, setActiveTab] = useState<'estatisticas' | 'conquistas' | 'atividades'>('estatisticas');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar dados do usuario
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      setProfile(prev => ({
        ...prev,
        nome: user.nome || prev.nome,
        email: user.email || prev.email,
        pontosFP: user.pontosFP || prev.pontosFP,
      }));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />

      <div className="pt-16"></div>
      {/* Header */}



      {/* Card do Perfil Principal */}
      <div className="card-ia p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-bold text-white border-4 border-white/20 flex-shrink-0">
            {profile.nome.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{profile.nome}</h1>
              <span className="text-3xl">{profile.liga === 'Ouro' ? '🥇' : profile.liga === 'Platina' ? '💎' : '🥉'}</span>
            </div>
            <p className="text-white/60 text-sm mb-3">Liga {profile.liga} • Membro desde {new Date(profile.membroDesde).toLocaleDateString('pt-BR')}</p>

            {/* Stats sociais */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/enem/amigos?tab=seguidores')}
                className="text-center hover:text-yellow-300 transition"
              >
                <span className="text-white font-bold text-lg block">{profile.seguidores}</span>
                <span className="text-white/60 text-sm">seguidores</span>
              </button>
              <button
                onClick={() => router.push('/enem/amigos?tab=seguindo')}
                className="text-center hover:text-yellow-300 transition"
              >
                <span className="text-white font-bold text-lg block">{profile.seguindo}</span>
                <span className="text-white/60 text-sm">seguindo</span>
              </button>
              <div className="text-center">
                <span className="text-yellow-300 font-bold text-lg block">#{profile.posicaoRanking}</span>
                <span className="text-white/60 text-sm">ranking</span>
              </div>
            </div>
          </div>

          {/* Acoes */}
          <div className="flex flex-col gap-2">
            <ShareButton tipo="convite" />
            <button
              onClick={() => router.push('/enem/perfil/editar')}
              className="btn-ia-secondary text-sm"
            >
              ⚙️ Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-ia">
          <span className="stat-ia-value text-yellow-300">{profile.pontosFP.toLocaleString()}</span>
          <span className="stat-ia-label">FP Total</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{profile.simuladosFeitos}</span>
          <span className="stat-ia-label">Simulados</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value text-orange-400">{profile.streakAtual}🔥</span>
          <span className="stat-ia-label">Streak Atual</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{profile.mediaNotas.toFixed(0)}</span>
          <span className="stat-ia-label">Media</span>
        </div>
      </div>

      {/* Layout principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conteudo principal */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('estatisticas')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                activeTab === 'estatisticas'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              📊 Estatisticas
            </button>
            <button
              onClick={() => setActiveTab('conquistas')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                activeTab === 'conquistas'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🏆 Conquistas
            </button>
            <button
              onClick={() => setActiveTab('atividades')}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                activeTab === 'atividades'
                  ? 'bg-yellow-400 text-slate-900'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              📜 Atividades
            </button>
          </div>

          {/* Conteudo das tabs */}
          {activeTab === 'estatisticas' && (
            <div className="card-ia p-6">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                📊 Desempenho por Area
              </h3>
              <div className="space-y-4">
                {profile.estatisticasPorArea.map((area) => (
                  <div key={area.area}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{area.area}</span>
                      <span className="text-yellow-300 font-bold">{area.porcentagem}%</span>
                    </div>
                    <div className="progress-ia">
                      <div
                        className="progress-ia-bar"
                        style={{ width: `${area.porcentagem}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider-ia my-6"></div>

              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                📈 Resumo Geral
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm">Melhor Nota</p>
                  <p className="text-2xl font-bold text-green-400">842</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm">Questoes Respondidas</p>
                  <p className="text-2xl font-bold text-white">1,847</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm">Taxa de Acerto</p>
                  <p className="text-2xl font-bold text-yellow-300">68%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm">Streak Maximo</p>
                  <p className="text-2xl font-bold text-orange-400">{profile.streakMaximo}🔥</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conquistas' && (
            <div className="card-ia p-6">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                🏆 Todas as Conquistas ({profile.badges.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition"
                  >
                    <span className="text-4xl">{badge.emoji}</span>
                    <div>
                      <p className="text-white font-bold">{badge.nome}</p>
                      <p className="text-white/50 text-sm">
                        Conquistado em {new Date(badge.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conquistas bloqueadas */}
              <div className="divider-ia my-6"></div>
              <h3 className="text-white/60 font-bold mb-4">🔒 Proximas Conquistas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50">
                {[
                  { nome: 'Streak de 30 dias', emoji: '🔥', desc: 'Estude 30 dias seguidos' },
                  { nome: 'Top 50 Global', emoji: '🌟', desc: 'Entre no top 50' },
                  { nome: 'Liga Platina', emoji: '💎', desc: 'Alcance a Liga Platina' },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-xl p-4 flex items-center gap-4"
                  >
                    <span className="text-4xl grayscale">{badge.emoji}</span>
                    <div>
                      <p className="text-white font-bold">{badge.nome}</p>
                      <p className="text-white/50 text-sm">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'atividades' && (
            <div className="card-ia p-6">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                📜 Atividades Recentes
              </h3>
              <div className="space-y-4">
                {[
                  { acao: 'Completou simulado', detalhe: 'Matematica - Nota 780', emoji: '📝', tempo: '2h atras' },
                  { acao: 'Ganhou conquista', detalhe: 'Mestre da Matematica', emoji: '🏆', tempo: '3h atras' },
                  { acao: 'Subiu no ranking', detalhe: '+5 posicoes', emoji: '📈', tempo: '5h atras' },
                  { acao: 'Manteve streak', detalhe: '7 dias seguidos', emoji: '🔥', tempo: '1 dia atras' },
                  { acao: 'Completou simulado', detalhe: 'Linguagens - Nota 720', emoji: '📝', tempo: '1 dia atras' },
                ].map((atividade, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-xl"
                  >
                    <span className="text-2xl">{atividade.emoji}</span>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{atividade.acao}</p>
                      <p className="text-white/60 text-sm">{atividade.detalhe}</p>
                    </div>
                    <span className="text-white/40 text-sm">{atividade.tempo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Liga Card */}
          <LeagueCard userFP={profile.pontosFP} userName={profile.nome} />

          {/* Compartilhar conquistas */}
          <div className="card-ia p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              📤 Compartilhar
            </h3>
            <div className="space-y-3">
              <ShareButton tipo="nota" valor={profile.mediaNotas} />
              <ShareButton tipo="streak" valor={profile.streakAtual} />
              <ShareButton tipo="liga" valor={profile.liga} />
            </div>
          </div>

          {/* Links rapidos */}
          <div className="card-ia p-6">
            <h3 className="text-white font-bold mb-4">⚡ Acoes Rapidas</h3>
            <div className="space-y-2">
              <button
                onClick={() => router.push('/enem/simulado')}
                className="w-full btn-ia py-3"
              >
                📝 Fazer Simulado
              </button>
              <button
                onClick={() => router.push('/enem/ranking')}
                className="w-full btn-ia-secondary py-3"
              >
                🏆 Ver Ranking
              </button>
              <button
                onClick={() => router.push('/enem/amigos')}
                className="w-full btn-ia-secondary py-3"
              >
                👥 Encontrar Amigos
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
