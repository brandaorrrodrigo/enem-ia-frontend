'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import LeagueCard from '@/components/social/LeagueCard';
import ShareButton from '@/components/social/ShareButton';
import FloatingBackButton from '@/components/FloatingBackButton';

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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--chalkboard-green)'
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
            color: 'var(--chalk-white)',
            fontSize: '1.125rem',
            fontFamily: 'var(--font-handwriting)'
          }}>
            Carregando perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem 1rem',
      background: 'var(--chalkboard-green)'
    }}>
      <FloatingBackButton />
      <FloatingNav />

      <div style={{ paddingTop: '4rem' }}></div>

      {/* Container Principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Card do Perfil Principal */}
        <div className="chalkboard-card" style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }} className="md:flex-row md:items-center">
            {/* Avatar */}
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-yellow) 0%, var(--accent-orange) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: 'var(--chalkboard-green)',
              border: '4px solid var(--chalk-dim)',
              flexShrink: 0
            }}>
              {profile.nome.charAt(0)}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h1 style={{
                  fontSize: '1.875rem',
                  fontWeight: 'bold',
                  color: 'var(--chalk-white)',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  {profile.nome}
                </h1>
                <span style={{ fontSize: '1.875rem' }}>
                  {profile.liga === 'Ouro' ? '🥇' : profile.liga === 'Platina' ? '💎' : '🥉'}
                </span>
              </div>
              <p style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.875rem',
                marginBottom: '0.75rem'
              }}>
                Liga {profile.liga} • Membro desde {new Date(profile.membroDesde).toLocaleDateString('pt-BR')}
              </p>

              {/* Stats sociais */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                  onClick={() => router.push('/enem/amigos?tab=seguidores')}
                  style={{
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--chalk-white)',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--chalk-white)'}
                >
                  <span style={{
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    display: 'block'
                  }}>
                    {profile.seguidores}
                  </span>
                  <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>seguidores</span>
                </button>
                <button
                  onClick={() => router.push('/enem/amigos?tab=seguindo')}
                  style={{
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--chalk-white)',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-yellow)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--chalk-white)'}
                >
                  <span style={{
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    display: 'block'
                  }}>
                    {profile.seguindo}
                  </span>
                  <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>seguindo</span>
                </button>
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    color: 'var(--accent-yellow)',
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    display: 'block'
                  }}>
                    #{profile.posicaoRanking}
                  </span>
                  <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>ranking</span>
                </div>
              </div>
            </div>

            {/* Acoes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <ShareButton tipo="convite" />
              <button
                onClick={() => router.push('/enem/perfil/editar')}
                className="btn"
                style={{
                  fontSize: '0.875rem',
                  padding: '0.5rem 1rem'
                }}
              >
                ⚙️ Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar" style={{ marginBottom: '1.5rem' }}>
          <div className="stat-item">
            <div className="stat-number" style={{ color: 'var(--accent-yellow)' }}>
              {profile.pontosFP.toLocaleString()}
            </div>
            <div className="stat-label">FP Total</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{profile.simuladosFeitos}</div>
            <div className="stat-label">Simulados</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: 'var(--accent-orange)' }}>
              {profile.streakAtual}🔥
            </div>
            <div className="stat-label">Streak Atual</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{profile.mediaNotas.toFixed(0)}</div>
            <div className="stat-label">Media</div>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conteudo principal */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('estatisticas')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-handwriting)',
                  background: activeTab === 'estatisticas' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'estatisticas' ? 'var(--chalkboard-green)' : 'var(--chalk-dim)'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'estatisticas') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'estatisticas') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                📊 Estatisticas
              </button>
              <button
                onClick={() => setActiveTab('conquistas')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-handwriting)',
                  background: activeTab === 'conquistas' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'conquistas' ? 'var(--chalkboard-green)' : 'var(--chalk-dim)'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'conquistas') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'conquistas') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                🏆 Conquistas
              </button>
              <button
                onClick={() => setActiveTab('atividades')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-handwriting)',
                  background: activeTab === 'atividades' ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                  color: activeTab === 'atividades' ? 'var(--chalkboard-green)' : 'var(--chalk-dim)'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'atividades') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'atividades') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                📜 Atividades
              </button>
            </div>

            {/* Conteudo das tabs */}
            {activeTab === 'estatisticas' && (
              <div className="chalkboard-card">
                <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                  📊 Desempenho por Area
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {profile.estatisticasPorArea.map((area) => (
                    <div key={area.area}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          color: 'var(--chalk-white)',
                          fontWeight: '600',
                          fontFamily: 'var(--font-handwriting)'
                        }}>
                          {area.area}
                        </span>
                        <span style={{
                          color: 'var(--accent-yellow)',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-handwriting)'
                        }}>
                          {area.porcentagem}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: 'var(--accent-yellow)',
                          width: `${area.porcentagem}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  height: '2px',
                  background: 'var(--chalk-dim)',
                  margin: '1.5rem 0',
                  opacity: 0.3
                }}></div>

                <h3 className="card-title" style={{ marginBottom: '1rem' }}>
                  📈 Resumo Geral
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.75rem',
                    padding: '1rem'
                  }}>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Melhor Nota</p>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#4ade80',
                      fontFamily: 'var(--font-handwriting)'
                    }}>
                      842
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.75rem',
                    padding: '1rem'
                  }}>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Questoes Respondidas</p>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--chalk-white)',
                      fontFamily: 'var(--font-handwriting)'
                    }}>
                      1,847
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.75rem',
                    padding: '1rem'
                  }}>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Taxa de Acerto</p>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--accent-yellow)',
                      fontFamily: 'var(--font-handwriting)'
                    }}>
                      68%
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '0.75rem',
                    padding: '1rem'
                  }}>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>Streak Maximo</p>
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--accent-orange)',
                      fontFamily: 'var(--font-handwriting)'
                    }}>
                      {profile.streakMaximo}🔥
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'conquistas' && (
              <div className="chalkboard-card">
                <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                  🏆 Todas as Conquistas ({profile.badges.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.badges.map((badge) => (
                    <div
                      key={badge.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'background 0.3s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                    >
                      <span style={{ fontSize: '2.25rem' }}>{badge.emoji}</span>
                      <div>
                        <p style={{
                          color: 'var(--chalk-white)',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-handwriting)'
                        }}>
                          {badge.nome}
                        </p>
                        <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                          Conquistado em {new Date(badge.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Conquistas bloqueadas */}
                <div style={{
                  height: '2px',
                  background: 'var(--chalk-dim)',
                  margin: '1.5rem 0',
                  opacity: 0.3
                }}></div>
                <h3 style={{
                  color: 'var(--chalk-dim)',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  🔒 Proximas Conquistas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ opacity: 0.5 }}>
                  {[
                    { nome: 'Streak de 30 dias', emoji: '🔥', desc: 'Estude 30 dias seguidos' },
                    { nome: 'Top 50 Global', emoji: '🌟', desc: 'Entre no top 50' },
                    { nome: 'Liga Platina', emoji: '💎', desc: 'Alcance a Liga Platina' },
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <span style={{ fontSize: '2.25rem', filter: 'grayscale(100%)' }}>{badge.emoji}</span>
                      <div>
                        <p style={{
                          color: 'var(--chalk-white)',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-handwriting)'
                        }}>
                          {badge.nome}
                        </p>
                        <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'atividades' && (
              <div className="chalkboard-card">
                <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                  📜 Atividades Recentes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { acao: 'Completou simulado', detalhe: 'Matematica - Nota 780', emoji: '📝', tempo: '2h atras' },
                    { acao: 'Ganhou conquista', detalhe: 'Mestre da Matematica', emoji: '🏆', tempo: '3h atras' },
                    { acao: 'Subiu no ranking', detalhe: '+5 posicoes', emoji: '📈', tempo: '5h atras' },
                    { acao: 'Manteve streak', detalhe: '7 dias seguidos', emoji: '🔥', tempo: '1 dia atras' },
                    { acao: 'Completou simulado', detalhe: 'Linguagens - Nota 720', emoji: '📝', tempo: '1 dia atras' },
                  ].map((atividade, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{atividade.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          color: 'var(--chalk-white)',
                          fontWeight: '600',
                          fontFamily: 'var(--font-handwriting)'
                        }}>
                          {atividade.acao}
                        </p>
                        <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                          {atividade.detalhe}
                        </p>
                      </div>
                      <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                        {atividade.tempo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Liga Card */}
            <LeagueCard userFP={profile.pontosFP} userName={profile.nome} />

            {/* Compartilhar conquistas */}
            <div className="chalkboard-card">
              <h3 className="card-title" style={{ marginBottom: '1rem' }}>
                📤 Compartilhar
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <ShareButton tipo="nota" valor={profile.mediaNotas} />
                <ShareButton tipo="streak" valor={profile.streakAtual} />
                <ShareButton tipo="liga" valor={profile.liga} />
              </div>
            </div>

            {/* Links rapidos */}
            <div className="chalkboard-card">
              <h3 className="card-title" style={{ marginBottom: '1rem' }}>
                ⚡ Acoes Rapidas
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => router.push('/enem/simulado')}
                  className="btn btn-yellow"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  📝 Fazer Simulado
                </button>
                <button
                  onClick={() => router.push('/enem/ranking')}
                  className="btn"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  🏆 Ver Ranking
                </button>
                <button
                  onClick={() => router.push('/enem/amigos')}
                  className="btn"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  👥 Encontrar Amigos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <button
            onClick={() => router.push('/enem')}
            className="btn"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
