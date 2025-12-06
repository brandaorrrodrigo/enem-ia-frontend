'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseSelector from '@/components/CourseSelector';
import FloatingNav from '@/components/FloatingNav';

interface Simulado {
  id: string;
  disciplina: string;
  nota: number;
  acertos: number;
  total: number;
  porcentagem: string;
  data: string;
}

interface UsuarioStats {
  email: string;
  nome: string;
  pontosFP: number;
  nivel: string;
  streak: number;
}

interface DesempenhoPorArea {
  area: string;
  porcentagem: number;
  simulados: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [simulados, setSimulados] = useState<Simulado[]>([]);
  const [stats, setStats] = useState<UsuarioStats | null>(null);
  const [desempenhoPorArea, setDesempenhoPorArea] = useState<DesempenhoPorArea[]>([]);



  useEffect(() => {
    const storedUserId = localStorage.getItem('user_email') || 'usuario@enem-ia.com';
    setUserId(storedUserId);
    loadDashboardData(storedUserId);
  }, []);

  const loadDashboardData = (userId: string) => { setLoading(true); try { const historicoStr = localStorage.getItem("historico_simulados") || "[]"; const historico = JSON.parse(historicoStr); const simuladosFormatados = historico.map((h: any) => ({ id: h.id, disciplina: h.area === "todas" ? "Todas as Areas" : h.area, nota: h.nota, acertos: h.acertos, total: h.total, porcentagem: Math.round((h.acertos / h.total) * 100) + "%", data: new Date(h.data).toLocaleDateString("pt-BR") })); setSimulados(simuladosFormatados); const fpTotal = parseInt(localStorage.getItem("fp_total") || "0"); const streakDias = parseInt(localStorage.getItem("streak_dias") || "0"); let nivel = "Bronze"; if (fpTotal >= 5000) nivel = "Diamante"; else if (fpTotal >= 2000) nivel = "Platina"; else if (fpTotal >= 1000) nivel = "Gold"; else if (fpTotal >= 500) nivel = "Prata"; setStats({ email: userId, nome: "Estudante", pontosFP: fpTotal, nivel: nivel, streak: streakDias }); setDesempenhoPorArea([]); setLoading(false); } catch (err: any) { console.error("Erro:", err); setStats({ email: userId, nome: "Estudante", pontosFP: 0, nivel: "Bronze", streak: 0 }); setSimulados([]); setDesempenhoPorArea([]); setLoading(false); } };

  const calcularMediaNotas = (): number => {
    if (simulados.length === 0) return 0;
    const soma = simulados.reduce((acc, s) => acc + (s.nota || 0), 0);
    return Math.round(soma / simulados.length);
  };

  if (loading) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
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
            fontFamily: 'var(--font-handwriting)'
          }}>
            Carregando dashboard...
          </p>
        </div>
      </div>
    );
  }

  const mediaNota = calcularMediaNotas();

  return (
    <div className="container min-h-screen py-8">
      <FloatingNav />

      {/* Slogan Oficial */}
      <div
        className="p-4 mb-6 mt-16 text-center"
        style={{
          background: 'linear-gradient(to right, rgba(255, 217, 102, 0.15), rgba(255, 153, 51, 0.15))',
          border: '2px solid rgba(255, 217, 102, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        <p style={{
          color: 'var(--accent-yellow)',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          fontStyle: 'italic',
          fontFamily: 'var(--font-handwriting)'
        }}>
          "Diversão e conhecimento: a combinação perfeita para sua aprovação!"
        </p>
        <p style={{
          color: 'var(--chalk-dim)',
          fontSize: '0.875rem',
          marginTop: '0.25rem'
        }}>
          🎯 ENEM-IA - Onde aprender vira jogo
        </p>
      </div>

      {/* Header */}
      <div className="header mb-8">
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--chalk-white)',
          fontFamily: 'var(--font-handwriting)',
          marginBottom: '0.5rem'
        }}>
          📊 Dashboard
        </h1>
        <p style={{
          color: 'var(--chalk-dim)',
          fontSize: '1.125rem',
          fontFamily: 'var(--font-handwriting)'
        }}>
          Acompanhe seu progresso e estatísticas
        </p>
      </div>

      {/* Estatísticas Principais */}
      <div className="stats-bar grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-item">
          <span className="stat-number">{stats?.pontosFP || 0}</span>
          <span className="stat-label">Pontos FP</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">{simulados.length}</span>
          <span className="stat-label">Simulados</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">{mediaNota}</span>
          <span className="stat-label">Nota Média</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">{stats?.streak || 0}🔥</span>
          <span className="stat-label">Dias Seguidos</span>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Progresso Geral */}
        <div className="card">
          <h2 className="card-title mb-4">📈 Progresso Geral</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: 'var(--chalk-white)' }}>Nível Atual</span>
                <span className="badge">{stats?.nivel || 'Iniciante'}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '65%',
                  height: '100%',
                  background: 'var(--accent-yellow)',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <p style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.75rem',
                marginTop: '0.5rem'
              }}>
                350 pontos para o próximo nível
              </p>
            </div>

            <div style={{
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)',
              margin: '1rem 0'
            }}></div>

            <div>
              <p style={{
                color: 'var(--chalk-white)',
                marginBottom: '0.75rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)'
              }}>
                Conquistas Recentes
              </p>
              <div className="space-y-2">
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
                    <p style={{
                      color: 'var(--chalk-white)',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}>
                      Primeira Vitória
                    </p>
                    <p style={{
                      color: 'var(--chalk-dim)',
                      fontSize: '0.75rem'
                    }}>
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
                    <p style={{
                      color: 'var(--chalk-white)',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}>
                      Sequência de 7 dias
                    </p>
                    <p style={{
                      color: 'var(--chalk-dim)',
                      fontSize: '0.75rem'
                    }}>
                      Estude 7 dias consecutivos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desempenho por Área */}
        <div className="card">
          <h2 className="card-title mb-4">📚 Desempenho por Área</h2>

          {desempenhoPorArea.length > 0 ? (
            <div className="space-y-4">
              {desempenhoPorArea.map((area, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{
                      color: 'var(--chalk-white)',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-handwriting)'
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
                      background: 'var(--accent-yellow)',
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
                fontFamily: 'var(--font-handwriting)'
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

      {/* Curso Alvo */}
      <div className="mb-8">
        <div className="card">
          <h2 className="card-title mb-4">🎯 Curso Alvo</h2>
          <CourseSelector userId={userId} />
        </div>
      </div>

      {/* Histórico de Simulados */}
      <div className="card">
        <h2 className="card-title mb-6">📝 Histórico de Simulados</h2>

        {simulados.length > 0 ? (
          <div className="space-y-3">
            {simulados.map((sim) => (
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
                    fontFamily: 'var(--font-handwriting)'
                  }}>
                    {sim.disciplina}
                  </p>
                  <p style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem'
                  }}>
                    {sim.acertos}/{sim.total} questões ({sim.porcentagem})
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
              fontFamily: 'var(--font-handwriting)'
            }}>
              Você ainda não fez nenhum simulado
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
              Que tal começar agora? Faça seu primeiro simulado e descubra seu nível de conhecimento!
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
