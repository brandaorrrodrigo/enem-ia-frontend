'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';
import ProfileCard from '@/components/social/ProfileCard';
import FriendButton from '@/components/social/FriendButton';

interface Usuario {
  id: string;
  nome: string;
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
  badges: { id: string; nome: string; emoji: string }[];
  isFollowing?: boolean;
}

const mockUsuarios: Usuario[] = [
  { id: '1', nome: 'Ana Silva', pontosFP: 4500, nivel: 'Veterano', liga: 'Platina', streakAtual: 21, streakMaximo: 35, simuladosFeitos: 89, mediaNotas: 780, seguidores: 156, seguindo: 42, posicaoRanking: 23, badges: [{ id: '1', nome: 'Top 50', emoji: '🌟' }], isFollowing: true },
  { id: '2', nome: 'Pedro Costa', pontosFP: 3200, nivel: 'Experiente', liga: 'Ouro', streakAtual: 14, streakMaximo: 20, simuladosFeitos: 65, mediaNotas: 720, seguidores: 89, seguindo: 34, posicaoRanking: 78, badges: [{ id: '1', nome: 'Streak Master', emoji: '🔥' }], isFollowing: true },
  { id: '3', nome: 'Maria Santos', pontosFP: 5100, nivel: 'Mestre', liga: 'Diamante', streakAtual: 35, streakMaximo: 45, simuladosFeitos: 120, mediaNotas: 820, seguidores: 234, seguindo: 56, posicaoRanking: 12, badges: [{ id: '1', nome: 'Top 20', emoji: '👑' }], isFollowing: false },
  { id: '4', nome: 'Lucas Oliveira', pontosFP: 2800, nivel: 'Intermediario', liga: 'Ouro', streakAtual: 7, streakMaximo: 12, simuladosFeitos: 45, mediaNotas: 690, seguidores: 45, seguindo: 28, posicaoRanking: 156, badges: [], isFollowing: false },
  { id: '5', nome: 'Julia Ferreira', pontosFP: 3800, nivel: 'Experiente', liga: 'Platina', streakAtual: 18, streakMaximo: 25, simuladosFeitos: 78, mediaNotas: 750, seguidores: 112, seguindo: 38, posicaoRanking: 45, badges: [{ id: '1', nome: 'Liga Platina', emoji: '💎' }], isFollowing: false },
  { id: '6', nome: 'Gabriel Lima', pontosFP: 2100, nivel: 'Iniciante', liga: 'Prata', streakAtual: 5, streakMaximo: 8, simuladosFeitos: 32, mediaNotas: 650, seguidores: 23, seguindo: 15, posicaoRanking: 234, badges: [], isFollowing: false },
];

const mockSugestoes: Usuario[] = [
  { id: '7', nome: 'Sofia Mendes', pontosFP: 2650, nivel: 'Intermediario', liga: 'Ouro', streakAtual: 9, streakMaximo: 15, simuladosFeitos: 48, mediaNotas: 710, seguidores: 67, seguindo: 31, posicaoRanking: 134, badges: [], isFollowing: false },
  { id: '8', nome: 'Rafael Alves', pontosFP: 3100, nivel: 'Experiente', liga: 'Ouro', streakAtual: 12, streakMaximo: 18, simuladosFeitos: 58, mediaNotas: 730, seguidores: 89, seguindo: 42, posicaoRanking: 89, badges: [{ id: '1', nome: 'Dedicado', emoji: '📚' }], isFollowing: false },
  { id: '9', nome: 'Camila Rocha', pontosFP: 4200, nivel: 'Veterano', liga: 'Platina', streakAtual: 25, streakMaximo: 30, simuladosFeitos: 95, mediaNotas: 790, seguidores: 178, seguindo: 52, posicaoRanking: 34, badges: [{ id: '1', nome: 'Elite', emoji: '⭐' }], isFollowing: false },
];

function AmigosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'seguindo' | 'seguidores' | 'sugestoes' | 'buscar'>('seguindo');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [sugestoes, setSugestoes] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'seguidores' || tab === 'seguindo' || tab === 'sugestoes') {
      setActiveTab(tab);
    }

    // Simular carregamento
    setTimeout(() => {
      setUsuarios(mockUsuarios);
      setSugestoes(mockSugestoes);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  const handleFollow = (userId: string) => {
    setUsuarios(prev =>
      prev.map(u => (u.id === userId ? { ...u, isFollowing: true, seguidores: u.seguidores + 1 } : u))
    );
    setSugestoes(prev =>
      prev.map(u => (u.id === userId ? { ...u, isFollowing: true, seguidores: u.seguidores + 1 } : u))
    );
  };

  const handleUnfollow = (userId: string) => {
    setUsuarios(prev =>
      prev.map(u => (u.id === userId ? { ...u, isFollowing: false, seguidores: u.seguidores - 1 } : u))
    );
  };

  const usuariosFiltrados = busca
    ? [...usuarios, ...sugestoes].filter(u =>
        u.nome.toLowerCase().includes(busca.toLowerCase())
      )
    : [];

  const seguindo = usuarios.filter(u => u.isFollowing);
  const seguidores = usuarios.slice(0, 4); // Mock: alguns seguidores

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando amigos...</p>
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
              👥 Amigos & Conexoes
            </h1>
            <p className="subtitle-ia mb-0">
              Conecte-se com outros estudantes e crie sua rede!
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="stat-ia">
              <span className="stat-ia-value">{seguindo.length}</span>
              <span className="stat-ia-label">Seguindo</span>
            </div>
            <div className="stat-ia">
              <span className="stat-ia-value">{seguidores.length}</span>
              <span className="stat-ia-label">Seguidores</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              if (e.target.value) setActiveTab('buscar');
              else setActiveTab('seguindo');
            }}
            placeholder="🔍 Buscar usuarios por nome..."
            className="input-ia w-full py-3 pl-4 pr-10"
          />
          {busca && (
            <button
              onClick={() => {
                setBusca('');
                setActiveTab('seguindo');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => { setActiveTab('seguindo'); setBusca(''); }}
          className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition ${
            activeTab === 'seguindo'
              ? 'bg-yellow-400 text-slate-900'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          ✓ Seguindo ({seguindo.length})
        </button>
        <button
          onClick={() => { setActiveTab('seguidores'); setBusca(''); }}
          className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition ${
            activeTab === 'seguidores'
              ? 'bg-yellow-400 text-slate-900'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          👥 Seguidores ({seguidores.length})
        </button>
        <button
          onClick={() => { setActiveTab('sugestoes'); setBusca(''); }}
          className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition ${
            activeTab === 'sugestoes'
              ? 'bg-yellow-400 text-slate-900'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          ✨ Sugestoes
        </button>
      </div>

      {/* Conteudo */}
      {activeTab === 'buscar' && busca && (
        <div>
          <p className="text-white/60 mb-4">
            {usuariosFiltrados.length} resultado(s) para "{busca}"
          </p>
          {usuariosFiltrados.length > 0 ? (
            <div className="space-y-3">
              {usuariosFiltrados.map((usuario) => (
                <ProfileCard
                  key={usuario.id}
                  user={usuario}
                  compact
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                />
              ))}
            </div>
          ) : (
            <div className="card-ia p-8 text-center">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-white/70">Nenhum usuario encontrado</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'seguindo' && (
        <div>
          {seguindo.length > 0 ? (
            <div className="space-y-3">
              {seguindo.map((usuario) => (
                <ProfileCard
                  key={usuario.id}
                  user={usuario}
                  compact
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                />
              ))}
            </div>
          ) : (
            <div className="card-ia p-8 text-center">
              <span className="text-6xl mb-4 block">👥</span>
              <p className="text-white/70 mb-4">Voce ainda nao segue ninguem</p>
              <button
                onClick={() => setActiveTab('sugestoes')}
                className="btn-ia"
              >
                Ver Sugestoes
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'seguidores' && (
        <div>
          {seguidores.length > 0 ? (
            <div className="space-y-3">
              {seguidores.map((usuario) => (
                <ProfileCard
                  key={usuario.id}
                  user={usuario}
                  compact
                  onFollow={handleFollow}
                  onUnfollow={handleUnfollow}
                />
              ))}
            </div>
          ) : (
            <div className="card-ia p-8 text-center">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-white/70">Nenhum seguidor ainda</p>
              <p className="text-white/50 text-sm mt-2">
                Continue estudando e subindo no ranking para ganhar seguidores!
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sugestoes' && (
        <div>
          <p className="text-white/60 mb-4">
            Usuarios com FP e nivel similares ao seu
          </p>
          <div className="space-y-3">
            {sugestoes.map((usuario) => (
              <div key={usuario.id} className="card-ia p-4">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                    {usuario.nome.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold truncate">{usuario.nome}</span>
                      <span className="text-lg">{usuario.liga === 'Ouro' ? '🥇' : usuario.liga === 'Platina' ? '💎' : '🥈'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-1">
                      <span className="text-yellow-300">{usuario.pontosFP.toLocaleString()} FP</span>
                      <span className="text-white/50">#{usuario.posicaoRanking}</span>
                      <span className="text-orange-400">{usuario.streakAtual}🔥</span>
                    </div>
                    <p className="text-white/50 text-xs mt-1">
                      {usuario.seguidores} seguidores • {usuario.simuladosFeitos} simulados
                    </p>
                  </div>

                  {/* Botoes */}
                  <div className="flex flex-col gap-2">
                    <FriendButton
                      userId={usuario.id}
                      userName={usuario.nome}
                      isFollowing={usuario.isFollowing}
                      onFollow={handleFollow}
                      onUnfollow={handleUnfollow}
                      size="sm"
                    />
                    <button
                      onClick={() => router.push(`/enem/perfil/${usuario.id}`)}
                      className="px-3 py-1.5 bg-white/10 text-white/70 rounded-lg text-xs font-semibold hover:bg-white/20 transition"
                    >
                      Ver Perfil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full btn-ia-secondary mt-4 py-3">
            📥 Carregar mais sugestoes
          </button>
        </div>
      )}

      {/* Dica */}
      <div className="card-ia p-6 mt-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="text-white font-bold mb-2">Por que conectar com outros estudantes?</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>✓ Veja o progresso dos seus amigos no feed</li>
              <li>✓ Receba provocacoes quando alguem te ultrapassar</li>
              <li>✓ Desafie amigos em competicoes diretas</li>
              <li>✓ Ganhe FP bonus por indicar novos usuarios</li>
            </ul>
          </div>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
// Wrapper with Suspense for useSearchParams
export default function AmigosPage() {
  return (
    <Suspense fallback={
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando amigos...</p>
        </div>
      </div>
    }>
      <AmigosContent />
    </Suspense>
  );
}
