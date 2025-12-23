'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import ProfileCard from '@/components/social/ProfileCard';
import FriendButton from '@/components/social/FriendButton';
import FloatingBackButton from '@/components/FloatingBackButton';

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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--chalkboard-bg)',
        padding: '2rem'
      }}>
      <FloatingBackButton />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--chalk-dim)',
            borderTopColor: 'var(--accent-yellow)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <p style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--chalk-white)'
          }}>Carregando amigos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--chalkboard-bg)',
      padding: '2rem 1rem'
    }}>
      <FloatingNav />

      {/* Container principal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem',
          paddingTop: '4rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: '700',
                color: 'var(--chalk-white)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
              }}>
                👥 Amigos & Conexões
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--chalk-dim)',
                margin: 0
              }}>
                Conecte-se com outros estudantes e crie sua rede!
              </p>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--accent-yellow)',
                  marginBottom: '0.25rem'
                }}>{seguindo.length}</div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Seguindo</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--accent-yellow)',
                  marginBottom: '0.25rem'
                }}>{seguidores.length}</div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Seguidores</div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de busca */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                if (e.target.value) setActiveTab('buscar');
                else setActiveTab('seguindo');
              }}
              placeholder="🔍 Buscar usuarios por nome..."
              style={{
                width: '100%',
                padding: '0.875rem 2.5rem 0.875rem 1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: 'var(--chalk-white)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-yellow)';
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            {busca && (
              <button
                onClick={() => {
                  setBusca('');
                  setActiveTab('seguindo');
                }}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--chalk-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          <button
            onClick={() => { setActiveTab('seguindo'); setBusca(''); }}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'seguindo' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === 'seguindo' ? '#1e293b' : 'rgba(255, 255, 255, 0.7)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'seguindo') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'seguindo') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            ✓ Seguindo ({seguindo.length})
          </button>
          <button
            onClick={() => { setActiveTab('seguidores'); setBusca(''); }}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'seguidores' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === 'seguidores' ? '#1e293b' : 'rgba(255, 255, 255, 0.7)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'seguidores') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'seguidores') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            👥 Seguidores ({seguidores.length})
          </button>
          <button
            onClick={() => { setActiveTab('sugestoes'); setBusca(''); }}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'sugestoes' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
              color: activeTab === 'sugestoes' ? '#1e293b' : 'rgba(255, 255, 255, 0.7)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'sugestoes') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'sugestoes') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            ✨ Sugestões
          </button>
        </div>

        {/* Conteudo */}
        {activeTab === 'buscar' && busca && (
          <div>
            <p style={{
              color: 'var(--chalk-dim)',
              marginBottom: '1rem'
            }}>
              {usuariosFiltrados.length} resultado(s) para "{busca}"
            </p>
            {usuariosFiltrados.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
                <p style={{ color: 'var(--chalk-dim)', margin: 0 }}>Nenhum usuario encontrado</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'seguindo' && (
          <div>
            {seguindo.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>👥</span>
                <p style={{ color: 'var(--chalk-dim)', marginBottom: '1rem' }}>Voce ainda não segue ninguém</p>
                <button
                  onClick={() => setActiveTab('sugestoes')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--accent-yellow)',
                    color: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 0 rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 0 rgba(0,0,0,0.2)';
                  }}
                >
                  Ver Sugestões
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'seguidores' && (
          <div>
            {seguidores.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>📭</span>
                <p style={{ color: 'var(--chalk-dim)', margin: 0 }}>Nenhum seguidor ainda</p>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem'
                }}>
                  Continue estudando e subindo no ranking para ganhar seguidores!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sugestoes' && (
          <div>
            <p style={{
              color: 'var(--chalk-dim)',
              marginBottom: '1rem'
            }}>
              Usuarios com FP e nivel similares ao seu
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sugestoes.map((usuario) => (
                <div key={usuario.id} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {usuario.nome.charAt(0)}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem'
                      }}>
                        <span style={{
                          color: 'var(--chalk-white)',
                          fontWeight: '700'
                        }}>{usuario.nome}</span>
                        <span style={{ fontSize: '1.125rem' }}>
                          {usuario.liga === 'Ouro' ? '🥇' : usuario.liga === 'Platina' ? '💎' : '🥈'}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.875rem',
                        marginTop: '0.25rem'
                      }}>
                        <span style={{ color: '#fbbf24', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <img src="/moedafp1.png" alt="FP" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                          {usuario.pontosFP.toLocaleString()} FP
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>#{usuario.posicaoRanking}</span>
                        <span style={{ color: '#fb923c' }}>{usuario.streakAtual}🔥</span>
                      </div>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        margin: 0
                      }}>
                        {usuario.seguidores} seguidores • {usuario.simuladosFeitos} simulados
                      </p>
                    </div>

                    {/* Botoes */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
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
                        style={{
                          padding: '0.375rem 0.75rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                      >
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '0.875rem',
              marginTop: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: 'var(--chalk-white)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}>
              📥 Carregar mais sugestões
            </button>
          </div>
        )}

        {/* Dica */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15))',
          border: '2px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '2.5rem' }}>💡</span>
            <div style={{ flex: 1 }}>
              <h3 style={{
                color: 'var(--chalk-white)',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontSize: '1.125rem'
              }}>Por que conectar com outros estudantes?</h3>
              <ul style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.875rem',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.25rem' }}>✓ Veja o progresso dos seus amigos no feed</li>
                <li style={{ marginBottom: '0.25rem' }}>✓ Receba provocações quando alguém te ultrapassar</li>
                <li style={{ marginBottom: '0.25rem' }}>✓ Desafie amigos em competições diretas</li>
                <li style={{ marginBottom: '0.25rem' }}>✓ Ganhe FP bônus por indicar novos usuários</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '2px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <a
            href="/enem"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-yellow)',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            ← Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

// Wrapper with Suspense for useSearchParams
export default function AmigosPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--chalkboard-bg)',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--chalk-dim)',
            borderTopColor: 'var(--accent-yellow)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <p style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--chalk-white)'
          }}>Carregando amigos...</p>
        </div>
      </div>
    }>
      <AmigosContent />
    </Suspense>
  );
}
