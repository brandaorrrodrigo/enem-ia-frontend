'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import LeaderboardTable from '@/components/social/LeaderboardTable';
import LeagueCard from '@/components/social/LeagueCard';
import FloatingBackButton from '@/components/FloatingBackButton';

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
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FloatingBackButton />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 24px',
            border: '4px solid var(--chalk-dim)',
            borderTopColor: 'var(--accent-yellow)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{
            color: 'var(--chalk-white)',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>Carregando ranking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <FloatingBackButton />
      <FloatingNav />

      {/* Header */}
      <div className="header" style={{ marginBottom: '2rem', paddingTop: '4rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h1 style={{
              color: 'var(--chalk-white)',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-handwriting)',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              🏆 Ranking & Ligas
            </h1>
            <p style={{
              color: 'var(--chalk-dim)',
              fontSize: '1.125rem',
              margin: 0
            }}>
              Compita com outros estudantes e suba de liga!
            </p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">#{userData.posicaoGlobal}</div>
            <div className="stat-label">Global</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">#{userData.posicaoLiga}</div>
            <div className="stat-label">Na Liga</div>
          </div>
        </div>
      </div>

      {/* Sistema de Ligas */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          color: 'var(--chalk-white)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-handwriting)',
          marginBottom: '1rem'
        }}>Sistema de Ligas</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.75rem'
        }}>
          {LIGAS.map((liga) => (
            <div
              key={liga.id}
              className="card"
              style={{
                padding: '1rem',
                textAlign: 'center',
                backgroundImage: `linear-gradient(to bottom right, ${liga.cor})`,
                border: `2px solid ${liga.cor.includes('border-amber') ? 'var(--amber-500)' :
                       liga.cor.includes('border-gray') ? 'var(--gray-400)' :
                       liga.cor.includes('border-yellow') ? 'var(--accent-yellow)' :
                       liga.cor.includes('border-cyan') ? 'var(--cyan-400)' :
                       liga.cor.includes('border-blue') ? 'var(--blue-400)' :
                       'var(--purple-400)'}`,
                opacity: userData.liga === liga.nome ? '1' : '0.7',
                transform: userData.liga === liga.nome ? 'scale(1.05)' : 'scale(1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{liga.emoji}</span>
              <p style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                margin: 0
              }}>{liga.nome}</p>
              {userData.liga === liga.nome && (
                <span style={{
                  color: 'var(--accent-yellow)',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  display: 'block'
                }}>Você está aqui!</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Layout principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem'
      }}
      className="lg:grid-cols-3">
        {/* Ranking */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setRankingType('global')}
              className={rankingType === 'global' ? 'btn btn-yellow' : 'btn'}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              🌍 Global
            </button>
            <button
              onClick={() => setRankingType('liga')}
              className={rankingType === 'liga' ? 'btn btn-yellow' : 'btn'}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              🏅 Minha Liga
            </button>
            <button
              onClick={() => setRankingType('amigos')}
              className={rankingType === 'amigos' ? 'btn btn-yellow' : 'btn'}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              👥 Amigos
            </button>
          </div>

          {/* Tabela de ranking */}
          <LeaderboardTable type={rankingType} limit={15} showProvocations={true} />
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Sua Liga */}
          <LeagueCard userFP={userData.pontosFP} userName={userData.nome} />

          {/* Conquistas de Ranking */}
          <div className="chalkboard-card">
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>
              🏅 Conquistas de Ranking
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { nome: 'Top 100', emoji: '🌟', desc: 'Entre no top 100 global', conquistado: userData.posicaoGlobal <= 100 },
                { nome: 'Top 50', emoji: '⭐', desc: 'Entre no top 50 global', conquistado: userData.posicaoGlobal <= 50 },
                { nome: 'Top 10', emoji: '👑', desc: 'Entre no top 10 global', conquistado: userData.posicaoGlobal <= 10 },
                { nome: 'Lider da Liga', emoji: '🥇', desc: 'Seja #1 na sua liga', conquistado: userData.posicaoLiga === 1 },
              ].map((conquista, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    backgroundColor: conquista.conquistado ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    opacity: conquista.conquistado ? '1' : '0.5'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{conquista.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: conquista.conquistado ? 'var(--accent-yellow)' : 'var(--chalk-dim)',
                      margin: 0
                    }}>
                      {conquista.nome}
                    </p>
                    <p style={{
                      color: 'var(--chalk-dim)',
                      fontSize: '0.75rem',
                      margin: 0
                    }}>{conquista.desc}</p>
                  </div>
                  {conquista.conquistado && (
                    <span style={{ color: '#10b981', marginLeft: 'auto' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dicas */}
          <div className="chalkboard-card" style={{
            background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
            borderColor: 'rgba(96, 165, 250, 0.3)'
          }}>
            <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>
              💡 Como Subir no Ranking
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>✓</span>
                <span style={{ color: 'var(--chalk-white)', fontSize: '0.875rem' }}>Faça simulados diariamente</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>✓</span>
                <span style={{ color: 'var(--chalk-white)', fontSize: '0.875rem' }}>Mantenha sua streak ativa</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>✓</span>
                <span style={{ color: 'var(--chalk-white)', fontSize: '0.875rem' }}>Complete desafios semanais</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>✓</span>
                <span style={{ color: 'var(--chalk-white)', fontSize: '0.875rem' }}>Participe de salas de desafio</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push('/enem/simulado')}
            className="btn btn-yellow"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.125rem'
            }}
          >
            🚀 Fazer Simulado e Subir!
          </button>
        </div>
      </div>

      {/* Mensagem motivacional */}
      <div className="chalkboard-card" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p style={{
          color: 'var(--chalk-white)',
          fontSize: '1.125rem',
          margin: 0
        }}>
          ⚡ O ranking atualiza em tempo real! Continue estudando para subir de posição e conquistar a{' '}
          <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold' }}>
            Liga {userData.liga}
          </span>!
        </p>
      </div>

      {/* Footer */}
      <div className="footer">
        <button
          onClick={() => router.push('/enem')}
          className="btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          ← Voltar ao Dashboard
        </button>
      </div>
    </div>
  );
}
