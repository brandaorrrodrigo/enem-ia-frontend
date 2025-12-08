'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CursoAlvoSelector from '@/components/CursoAlvoSelector';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';
import AvatarUploader from '@/components/AvatarUploader';
import { useAuth } from '@/contexts/AuthContext';

interface Simulado {
  id: string;
  disciplina: string;
  nota: number;
  acertos: number;
  total: number;
  porcentagem: string;
  data: string;
}

interface DesempenhoPorArea {
  area: string;
  porcentagem: number;
  simulados: number;
}

// Mapa de niveis por FP
const NIVEIS_FP = [
  { min: 0, nome: 'Bronze', cor: '#cd7f32' },
  { min: 500, nome: 'Prata', cor: '#c0c0c0' },
  { min: 2000, nome: 'Ouro', cor: '#ffd700' },
  { min: 5000, nome: 'Platina', cor: '#e5e4e2' },
  { min: 10000, nome: 'Diamante', cor: '#b9f2ff' },
];

function getNivel(fp: number) {
  for (let i = NIVEIS_FP.length - 1; i >= 0; i--) {
    if (fp >= NIVEIS_FP[i].min) return NIVEIS_FP[i];
  }
  return NIVEIS_FP[0];
}

function getProximoNivel(fp: number) {
  for (let i = 0; i < NIVEIS_FP.length; i++) {
    if (fp < NIVEIS_FP[i].min) return NIVEIS_FP[i];
  }
  return null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();

  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [desempenhoPorArea, setDesempenhoPorArea] = useState<DesempenhoPorArea[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      loadDashboardData();
    }
  }, [authLoading, user]);

  const loadDashboardData = () => {
    setDataLoading(true);
    try {
      // Carregar historico de simulados do localStorage
      const historicoStr = localStorage.getItem('historico_simulados') || '[]';
      const historico = JSON.parse(historicoStr);

      const simuladosFormatados = historico.map((h: any) => ({
        id: h.id,
        disciplina: h.area === 'todas' ? 'Todas as Areas' : h.area,
        nota: h.nota,
        acertos: h.acertos,
        total: h.total,
        porcentagem: Math.round((h.acertos / h.total) * 100) + '%',
        data: new Date(h.data).toLocaleDateString('pt-BR')
      }));

      setSimulados(simuladosFormatados);

      // Calcular desempenho por area
      const areaCounts: { [key: string]: { acertos: number; total: number; count: number } } = {};
      historico.forEach((h: any) => {
        const area = h.area || 'outras';
        if (!areaCounts[area]) {
          areaCounts[area] = { acertos: 0, total: 0, count: 0 };
        }
        areaCounts[area].acertos += h.acertos;
        areaCounts[area].total += h.total;
        areaCounts[area].count++;
      });

      const desempenho = Object.entries(areaCounts).map(([area, data]) => ({
        area: area === 'todas' ? 'Geral' : area.charAt(0).toUpperCase() + area.slice(1),
        porcentagem: Math.round((data.acertos / data.total) * 100),
        simulados: data.count
      }));

      setDesempenhoPorArea(desempenho);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
    setDataLoading(false);
  };

  const calcularMediaNotas = (): number => {
    if (simulados.length === 0) return 0;
    const soma = simulados.reduce((acc, s) => acc + (s.nota || 0), 0);
    return Math.round(soma / simulados.length);
  };

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
      <FloatingBackButton />
        <div className="text-center">
          <div
            className="spinner-ia mx-auto mb-6"
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid var(--chalk-dim)',
              borderTop: '4px solid var(--accent-yellow)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          <p style={{
            color: 'var(--chalk-white)',
            fontSize: '1.25rem',
            fontFamily: 'var(--font-kalam)'
          }}>
            Carregando dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Se nao estiver autenticado, o AuthContext ja redireciona
  const fp = user?.pontosFP || 0;
  const nivelAtual = getNivel(fp);
  const proximoNivel = getProximoNivel(fp);
  const progressoNivel = proximoNivel
    ? ((fp - nivelAtual.min) / (proximoNivel.min - nivelAtual.min)) * 100
    : 100;
  const pontosParaProximo = proximoNivel ? proximoNivel.min - fp : 0;
  const mediaNota = calcularMediaNotas();

  return (
    <div className="container min-h-screen py-8">
      <FloatingBackButton />
      <FloatingNav />

      {/* Header com Info do Usuario */}
      <div
        className="mt-16 mb-6 p-4"
        style={{
          background: 'linear-gradient(to right, rgba(255, 217, 102, 0.15), rgba(255, 153, 51, 0.15))',
          border: '2px solid rgba(255, 217, 102, 0.3)',
          borderRadius: '12px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{
              color: 'var(--chalk-white)',
              fontSize: '1.5rem',
              fontFamily: 'var(--font-kalam)',
              margin: 0
            }}>
              Ola, {user?.nome || 'Estudante'}! 👋
            </h2>
            <p style={{ color: 'var(--chalk-dim)', fontFamily: 'var(--font-kalam)', margin: '0.25rem 0 0 0' }}>
              {user?.email}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Badge do Plano */}
            <span
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)',
                backgroundColor: user?.plano === 'premium' ? 'rgba(236, 72, 153, 0.2)' : user?.plano === 'pro' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: user?.plano === 'premium' ? '#f472b6' : user?.plano === 'pro' ? 'var(--accent-yellow)' : 'var(--chalk-dim)',
                border: user?.plano === 'premium' ? '2px solid #f472b6' : user?.plano === 'pro' ? '2px solid var(--accent-yellow)' : '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {user?.plano === 'premium' ? '👑 Premium' : user?.plano === 'pro' ? '⚡ PRO' : '🆓 Lite'}
            </span>
            <button
              onClick={logout}
              className="btn"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header mb-8">
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--chalk-white)',
          fontFamily: 'var(--font-kalam)',
          marginBottom: '0.5rem'
        }}>
          📊 Dashboard
        </h1>
        <p style={{
          color: 'var(--chalk-dim)',
          fontSize: '1.125rem',
          fontFamily: 'var(--font-kalam)'
        }}>
          Acompanhe seu progresso e estatisticas
        </p>
      </div>

      {/* Curso Alvo */}
      <div className="mb-6">
        <CursoAlvoSelector
          userId={user?.id || ''}
          cursoAtual={user?.cursoAlvo?.nome || null}
        />
      </div>

      {/* Estatisticas Principais */}
      <div className="stats-bar grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-item">
          <span className="stat-number" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⭐ {fp.toLocaleString()}
          </span>
          <span className="stat-label">FP</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">{simulados.length}</span>
          <span className="stat-label">Simulados</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">{mediaNota}</span>
          <span className="stat-label">Nota Media</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">{user?.streak || 0}🔥</span>
          <span className="stat-label">Dias Seguidos</span>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Progresso e Nivel */}
        <div className="card">
          <h2 className="card-title mb-4">📈 Nivel e Progresso</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>
                  Nivel Atual
                </span>
                <span
                  className="badge"
                  style={{
                    backgroundColor: `${nivelAtual.cor}30`,
                    color: nivelAtual.cor,
                    border: `2px solid ${nivelAtual.cor}`
                  }}
                >
                  {nivelAtual.nome}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(progressoNivel, 100)}%`,
                  height: '100%',
                  background: `linear-gradient(to right, ${nivelAtual.cor}, ${proximoNivel?.cor || nivelAtual.cor})`,
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
              {proximoNivel && (
                <p style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                  fontFamily: 'var(--font-kalam)'
                }}>
                  {pontosParaProximo.toLocaleString()} FP para {proximoNivel.nome}
                </p>
              )}
            </div>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '1rem 0' }}></div>

            {/* Conquistas Recentes */}
            <div>
              <p style={{
                color: 'var(--chalk-white)',
                marginBottom: '0.75rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)'
              }}>
                Conquistas Recentes
              </p>
              <div className="space-y-2">
                {user?.badges && user.badges.length > 0 ? (
                  user.badges.slice(0, 3).map((badge, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px'
                      }}
                    >
                      <span style={{ fontSize: '2rem' }}>{badge.icone}</span>
                      <div>
                        <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                          {badge.nome}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '2rem' }}>🏆</span>
                      <div>
                        <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                          Primeira Vitoria
                        </p>
                        <p style={{ color: 'var(--chalk-dim)', fontSize: '0.75rem' }}>
                          Complete seu primeiro simulado
                        </p>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '2rem' }}>🔥</span>
                      <div>
                        <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                          Sequencia de 7 dias
                        </p>
                        <p style={{ color: 'var(--chalk-dim)', fontSize: '0.75rem' }}>
                          Estude 7 dias consecutivos
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desempenho por Area */}
        <div className="card">
          <h2 className="card-title mb-4">📚 Desempenho por Area</h2>

          {desempenhoPorArea.length > 0 ? (
            <div className="space-y-4">
              {desempenhoPorArea.map((area, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{
                      color: 'var(--chalk-white)',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-kalam)'
                    }}>
                      {area.area}
                    </span>
                    <span style={{
                      color: 'var(--accent-yellow)',
                      fontWeight: 'bold'
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
                      width: `${area.porcentagem}%`,
                      height: '100%',
                      background: area.porcentagem >= 70 ? '#86efac' : area.porcentagem >= 50 ? 'var(--accent-yellow)' : '#fca5a5',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                  <p style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.75rem',
                    marginTop: '0.25rem'
                  }}>
                    {area.simulados} simulados realizados
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p style={{
                color: 'var(--chalk-dim)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-kalam)'
              }}>
                Nenhum simulado realizado ainda
              </p>
              <button
                onClick={() => router.push('/enem/simulado')}
                className="btn btn-yellow"
              >
                Fazer Primeiro Simulado
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Historico de Simulados */}
      <div className="card">
        <h2 className="card-title mb-6">📝 Historico de Simulados</h2>

        {simulados.length > 0 ? (
          <div className="space-y-3">
            {simulados.slice(0, 10).map((sim) => (
              <div
                key={sim.id}
                className="chalkboard-card"
                onClick={() => router.push(`/enem/resultado/${sim.id}`)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div>
                  <p style={{
                    color: 'var(--chalk-white)',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-kalam)'
                  }}>
                    {sim.disciplina}
                  </p>
                  <p style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem'
                  }}>
                    {sim.acertos}/{sim.total} questoes ({sim.porcentagem})
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    color: 'var(--accent-yellow)',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                  }}>
                    {sim.nota}
                  </p>
                  <p style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.75rem'
                  }}>
                    {sim.data}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📝</div>
            <h3 style={{
              color: 'var(--chalk-white)',
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-kalam)'
            }}>
              Voce ainda nao fez nenhum simulado
            </h3>
            <p style={{
              color: 'var(--chalk-dim)',
              fontSize: '1.125rem',
              marginBottom: '2rem',
              maxWidth: '28rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.75'
            }}>
              Que tal comecar agora? Faca seu primeiro simulado e descubra seu nivel de conhecimento!
            </p>
            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn btn-yellow"
              style={{
                fontSize: '1.125rem',
                padding: '1.25rem 2.5rem',
                fontWeight: 'bold',
                boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)'
              }}
            >
              🚀 FAZER MEU PRIMEIRO SIMULADO
            </button>
          </div>
        )}
      </div>

      {/* Footer com link de volta */}
      <div className="footer mt-8 text-center">
        <button
          onClick={() => router.push('/enem')}
          className="btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Voltar para Home
        </button>
      </div>
    </div>
  );
}
