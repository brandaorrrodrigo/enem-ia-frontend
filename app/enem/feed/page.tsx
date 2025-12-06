'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--chalkboard-bg)',
        color: 'var(--chalk-white)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--accent-yellow)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <p style={{ fontSize: '1.125rem', color: 'var(--chalk-dim)' }}>Carregando feed...</p>
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
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem', paddingTop: '4rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--chalk-white)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-handwriting)'
              }}>
                📱 Feed Social
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--chalk-dim)',
                margin: 0
              }}>
                Veja o que esta rolando na comunidade ENEM-IA!
              </p>
            </div>

            {/* Stats rapidos */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '0.75rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
                border: '2px solid var(--chalk-line)'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#4ade80',
                  marginBottom: '0.25rem'
                }}>
                  +{userStats.fpHoje}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--chalk-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  FP Hoje
                </div>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '0.75rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
                border: '2px solid var(--chalk-line)'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-yellow)',
                  marginBottom: '0.25rem'
                }}>
                  #{userStats.posicaoRanking}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--chalk-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Ranking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Provocacao do dia */}
        <div style={{ marginBottom: '2rem' }}>
          <ProvocacaoCard userName={userStats.nome} userFP={userStats.pontosFP} />
        </div>

        {/* Layout principal */}
        <div className="feed-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}>
            {/* Feed principal */}
            <div>
              {/* Tabs de filtro */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setFeedType('global')}
                  className="btn"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    background: feedType === 'global' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                    color: feedType === 'global' ? 'var(--chalkboard-bg)' : 'var(--chalk-dim)',
                    border: feedType === 'global' ? '2px solid var(--accent-yellow)' : '2px solid var(--chalk-line)',
                    cursor: 'pointer'
                  }}
                >
                  🌍 Global
                </button>
                <button
                  onClick={() => setFeedType('amigos')}
                  className="btn"
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    background: feedType === 'amigos' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                    color: feedType === 'amigos' ? 'var(--chalkboard-bg)' : 'var(--chalk-dim)',
                    border: feedType === 'amigos' ? '2px solid var(--accent-yellow)' : '2px solid var(--chalk-line)',
                    cursor: 'pointer'
                  }}
                >
                  👥 Amigos
                </button>
              </div>

              {/* Feed de atividades */}
              <ActivityFeed feedType={feedType} limit={15} />

              {/* Carregar mais */}
              <button
                className="btn"
                style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--chalk-white)',
                  border: '2px solid var(--chalk-line)',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                📥 Carregar mais atividades
              </button>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card de Liga */}
              <LeagueCard userFP={userStats.pontosFP} userName={userStats.nome} />

              {/* Estatisticas da semana */}
              <div className="card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '3px solid var(--chalk-line)',
                borderRadius: '1rem',
                padding: '1.5rem',
                position: 'relative'
              }}>
                <h3 style={{
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.25rem'
                }}>
                  📊 Sua Semana
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--chalk-dim)' }}>FP ganho</span>
                    <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>+{userStats.fpSemana}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--chalk-dim)' }}>Streak atual</span>
                    <span style={{ color: '#fb923c', fontWeight: 'bold' }}>{userStats.streak}🔥</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--chalk-dim)' }}>Posicao</span>
                    <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>#{userStats.posicaoRanking}</span>
                  </div>
                  <div style={{
                    height: '2px',
                    background: 'var(--chalk-line)',
                    margin: '0.5rem 0'
                  }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--chalk-dim)' }}>Seguidores</span>
                    <span style={{ color: 'var(--chalk-white)' }}>{userStats.seguidores}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--chalk-dim)' }}>Seguindo</span>
                    <span style={{ color: 'var(--chalk-white)' }}>{userStats.seguindo}</span>
                  </div>
                </div>
              </div>

              {/* Sugestoes de usuarios */}
              <div className="card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '3px solid var(--chalk-line)',
                borderRadius: '1rem',
                padding: '1.5rem',
                position: 'relative'
              }}>
                <h3 style={{
                  color: 'var(--chalk-white)',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.25rem'
                }}>
                  👥 Quem Seguir
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { nome: 'Maria Silva', fp: 3200, liga: 'Ouro' },
                    { nome: 'Pedro Costa', fp: 2890, liga: 'Ouro' },
                    { nome: 'Julia Santos', fp: 4100, liga: 'Platina' },
                  ].map((user, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.75rem',
                      border: '2px solid var(--chalk-line)'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {user.nome.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          color: 'var(--chalk-white)',
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {user.nome}
                        </p>
                        <p style={{
                          color: 'var(--chalk-dim)',
                          fontSize: '0.75rem',
                          margin: 0
                        }}>
                          {user.fp} FP
                        </p>
                      </div>
                      <button
                        className="btn btn-yellow"
                        style={{
                          padding: '0.375rem 0.75rem',
                          background: 'var(--accent-yellow)',
                          color: 'var(--chalkboard-bg)',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fbbf24';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--accent-yellow)';
                        }}
                      >
                        Seguir
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => router.push('/enem/amigos')}
                  className="btn"
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '0.625rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--chalk-white)',
                    border: '2px solid var(--chalk-line)',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  Ver mais sugestoes
                </button>
              </div>

              {/* CTA para simulado */}
              <div className="card" style={{
                background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)',
                border: '3px solid rgba(234, 179, 8, 0.4)',
                borderRadius: '1rem',
                padding: '1.5rem',
                position: 'relative'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>🚀</span>
                  <h3 style={{
                    color: 'var(--chalk-white)',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem'
                  }}>
                    Bora ganhar FP?
                  </h3>
                  <p style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    marginBottom: '1rem'
                  }}>
                    Faca um simulado e apareca no feed!
                  </p>
                  <button
                    onClick={() => router.push('/enem/simulado')}
                    className="btn btn-yellow"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'var(--accent-yellow)',
                      color: 'var(--chalkboard-bg)',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fbbf24';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--accent-yellow)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Fazer Simulado
                  </button>
                </div>
              </div>
            </div>
        </div>

        {/* Mensagem motivacional */}
        <div className="card" style={{
          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
          border: '3px solid rgba(168, 85, 247, 0.4)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginTop: '2rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          <p style={{
            color: 'var(--chalk-white)',
            fontSize: '1.125rem',
            margin: 0
          }}>
            🔥 <span style={{ fontWeight: 'bold', color: 'var(--accent-yellow)' }}>{userStats.nome}</span>, o feed esta fervendo hoje!
            Nao deixe seus amigos te ultrapassarem!
          </p>
        </div>

        {/* Footer com link de volta */}
        <div className="footer" style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '2px solid var(--chalk-line)',
          textAlign: 'center'
        }}>
          <button
            onClick={() => router.push('/enem')}
            className="btn"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--chalk-white)',
              border: '2px solid var(--chalk-line)',
              borderRadius: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>

      {/* Animacao de spin para loading */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
