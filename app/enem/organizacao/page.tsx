'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Meta {
  id: string;
  titulo: string;
  tipo: 'diaria' | 'semanal' | 'mensal';
  progresso: number;
  total: number;
  concluida: boolean;
}

interface Habito {
  id: string;
  nome: string;
  emoji: string;
  diasConcluidos: string[];
}

export default function OrganizacaoPage() {
  const router = useRouter();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [showHabitoModal, setShowHabitoModal] = useState(false);
  const [novaMeta, setNovaMeta] = useState({ titulo: '', tipo: 'semanal' as const, total: 5 });
  const [novoHabito, setNovoHabito] = useState({ nome: '', emoji: '📚' });
  const [loading, setLoading] = useState(true);

  const emojisHabito = ['📚', '✍️', '🧠', '📝', '🎯', '⏰', '💪', '🔥', '📖', '🎓'];

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    // Carregar metas do localStorage
    const metasLocal = localStorage.getItem('organizacao_metas');
    if (metasLocal) {
      setMetas(JSON.parse(metasLocal));
    } else {
      const metasIniciais: Meta[] = [
        { id: '1', titulo: 'Fazer 5 simulados esta semana', tipo: 'semanal', progresso: 2, total: 5, concluida: false },
        { id: '2', titulo: 'Estudar 2 horas por dia', tipo: 'diaria', progresso: 0, total: 2, concluida: false },
        { id: '3', titulo: 'Revisar todas as materias', tipo: 'mensal', progresso: 12, total: 20, concluida: false },
      ];
      setMetas(metasIniciais);
      localStorage.setItem('organizacao_metas', JSON.stringify(metasIniciais));
    }

    // Carregar habitos do localStorage
    const habitosLocal = localStorage.getItem('organizacao_habitos');
    if (habitosLocal) {
      setHabitos(JSON.parse(habitosLocal));
    } else {
      const habitosIniciais: Habito[] = [
        { id: '1', nome: 'Revisar flashcards', emoji: '🃏', diasConcluidos: [] },
        { id: '2', nome: 'Ler 30 minutos', emoji: '📖', diasConcluidos: [] },
        { id: '3', nome: 'Fazer exercicios', emoji: '✏️', diasConcluidos: [] },
      ];
      setHabitos(habitosIniciais);
      localStorage.setItem('organizacao_habitos', JSON.stringify(habitosIniciais));
    }

    setLoading(false);
  };

  const salvarMetas = (novasMetas: Meta[]) => {
    setMetas(novasMetas);
    localStorage.setItem('organizacao_metas', JSON.stringify(novasMetas));
  };

  const salvarHabitos = (novosHabitos: Habito[]) => {
    setHabitos(novosHabitos);
    localStorage.setItem('organizacao_habitos', JSON.stringify(novosHabitos));
  };

  const adicionarMeta = () => {
    const meta: Meta = {
      id: Date.now().toString(),
      titulo: novaMeta.titulo,
      tipo: novaMeta.tipo,
      progresso: 0,
      total: novaMeta.total,
      concluida: false,
    };
    salvarMetas([...metas, meta]);
    setShowMetaModal(false);
    setNovaMeta({ titulo: '', tipo: 'semanal', total: 5 });
  };

  const atualizarProgresso = (id: string, incremento: number) => {
    const novasMetas = metas.map(m => {
      if (m.id === id) {
        const novoProgresso = Math.max(0, Math.min(m.progresso + incremento, m.total));
        return {
          ...m,
          progresso: novoProgresso,
          concluida: novoProgresso >= m.total,
        };
      }
      return m;
    });
    salvarMetas(novasMetas);
  };

  const removerMeta = (id: string) => {
    salvarMetas(metas.filter(m => m.id !== id));
  };

  const adicionarHabito = () => {
    const habito: Habito = {
      id: Date.now().toString(),
      nome: novoHabito.nome,
      emoji: novoHabito.emoji,
      diasConcluidos: [],
    };
    salvarHabitos([...habitos, habito]);
    setShowHabitoModal(false);
    setNovoHabito({ nome: '', emoji: '📚' });
  };

  const toggleHabitoHoje = (id: string) => {
    const hoje = new Date().toISOString().split('T')[0];
    const novosHabitos = habitos.map(h => {
      if (h.id === id) {
        const jaFeito = h.diasConcluidos.includes(hoje);
        return {
          ...h,
          diasConcluidos: jaFeito
            ? h.diasConcluidos.filter(d => d !== hoje)
            : [...h.diasConcluidos, hoje],
        };
      }
      return h;
    });
    salvarHabitos(novosHabitos);
  };

  const removerHabito = (id: string) => {
    salvarHabitos(habitos.filter(h => h.id !== id));
  };

  const getHabitoFeitoHoje = (habito: Habito): boolean => {
    const hoje = new Date().toISOString().split('T')[0];
    return habito.diasConcluidos.includes(hoje);
  };

  const getSequenciaHabito = (habito: Habito): number => {
    let sequencia = 0;
    const hoje = new Date();

    for (let i = 0; i < 30; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() - i);
      const dataStr = data.toISOString().split('T')[0];

      if (habito.diasConcluidos.includes(dataStr)) {
        sequencia++;
      } else if (i > 0) {
        break;
      }
    }

    return sequencia;
  };

  const getTipoLabel = (tipo: string): string => {
    switch (tipo) {
      case 'diaria': return '📅 Diaria';
      case 'semanal': return '📆 Semanal';
      case 'mensal': return '🗓️ Mensal';
      default: return tipo;
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--chalkboard-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            color: 'var(--chalk-white)',
            fontSize: '1.125rem',
            fontFamily: 'var(--font-handwriting)'
          }}>
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  const metasConcluidas = metas.filter(m => m.concluida).length;
  const habitosHoje = habitos.filter(h => getHabitoFeitoHoje(h)).length;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--chalkboard-bg)',
      padding: '2rem 1rem'
    }}>
      <FloatingNav />

      {/* Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem', paddingTop: '4rem' }}>
          <h1 style={{
            color: 'var(--chalk-white)',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-handwriting)',
            marginBottom: '0.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            📋 Organizacao e Planejamento
          </h1>
          <p style={{
            color: 'var(--chalk-dim)',
            fontSize: '1.125rem',
            fontFamily: 'var(--font-handwriting)'
          }}>
            Defina metas, acompanhe habitos e organize seus estudos
          </p>
        </div>

        {/* Estatisticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid var(--chalk-dim)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{
              display: 'block',
              color: 'var(--accent-yellow)',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-handwriting)',
              marginBottom: '0.5rem'
            }}>
              {metas.length}
            </span>
            <span style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-handwriting)'
            }}>
              🎯 Metas Ativas
            </span>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid var(--chalk-dim)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{
              display: 'block',
              color: 'var(--accent-yellow)',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-handwriting)',
              marginBottom: '0.5rem'
            }}>
              {metasConcluidas}
            </span>
            <span style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-handwriting)'
            }}>
              ✅ Concluidas
            </span>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid var(--chalk-dim)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{
              display: 'block',
              color: 'var(--accent-yellow)',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-handwriting)',
              marginBottom: '0.5rem'
            }}>
              {habitos.length}
            </span>
            <span style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-handwriting)'
            }}>
              🔄 Habitos
            </span>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid var(--chalk-dim)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <span style={{
              display: 'block',
              color: 'var(--accent-yellow)',
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-handwriting)',
              marginBottom: '0.5rem'
            }}>
              {habitosHoje}/{habitos.length}
            </span>
            <span style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-handwriting)'
            }}>
              📅 Feitos Hoje
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Metas */}
          <div className="card" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '3px solid var(--chalk-dim)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 className="card-title" style={{
                color: 'var(--chalk-white)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)'
              }}>
                🎯 Minhas Metas
              </h2>
              <button
                onClick={() => setShowMetaModal(true)}
                className="btn btn-yellow"
                style={{
                  backgroundColor: 'var(--accent-yellow)',
                  color: 'var(--chalkboard-bg)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-handwriting)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ➕ Nova
              </button>
            </div>

            {metas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
                <p style={{
                  color: 'var(--chalk-dim)',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Nenhuma meta definida
                </p>
                <button
                  onClick={() => setShowMetaModal(true)}
                  className="btn btn-yellow"
                  style={{
                    backgroundColor: 'var(--accent-yellow)',
                    color: 'var(--chalkboard-bg)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-handwriting)'
                  }}
                >
                  ➕ Criar Meta
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {metas.map((meta) => (
                  <div
                    key={meta.id}
                    className="chalkboard-card"
                    style={{
                      backgroundColor: meta.concluida ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: meta.concluida ? '2px solid rgba(34, 197, 94, 0.3)' : '2px solid var(--chalk-dim)',
                      borderRadius: '12px',
                      padding: '1rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem'
                    }}>
                      <div>
                        <p style={{
                          color: 'var(--chalk-white)',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-handwriting)',
                          textDecoration: meta.concluida ? 'line-through' : 'none',
                          opacity: meta.concluida ? 0.7 : 1
                        }}>
                          {meta.titulo}
                        </p>
                        <span style={{
                          color: 'var(--chalk-dim)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-handwriting)'
                        }}>
                          {getTipoLabel(meta.tipo)}
                        </span>
                      </div>
                      <button
                        onClick={() => removerMeta(meta.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f87171',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          height: '8px',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            backgroundColor: 'var(--accent-yellow)',
                            height: '100%',
                            width: `${(meta.progresso / meta.total) * 100}%`,
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                      <span style={{
                        color: 'var(--accent-yellow)',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-handwriting)'
                      }}>
                        {meta.progresso}/{meta.total}
                      </span>
                    </div>

                    {!meta.concluida && (
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.75rem'
                      }}>
                        <button
                          onClick={() => atualizarProgresso(meta.id, -1)}
                          disabled={meta.progresso === 0}
                          style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '2px solid var(--chalk-dim)',
                            color: 'var(--chalk-white)',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            cursor: meta.progresso === 0 ? 'not-allowed' : 'pointer',
                            opacity: meta.progresso === 0 ? 0.5 : 1,
                            fontFamily: 'var(--font-handwriting)',
                            fontSize: '0.875rem'
                          }}
                        >
                          ➖
                        </button>
                        <button
                          onClick={() => atualizarProgresso(meta.id, 1)}
                          disabled={meta.progresso >= meta.total}
                          style={{
                            flex: 1,
                            backgroundColor: 'var(--accent-yellow)',
                            border: 'none',
                            color: 'var(--chalkboard-bg)',
                            padding: '0.5rem',
                            borderRadius: '8px',
                            cursor: meta.progresso >= meta.total ? 'not-allowed' : 'pointer',
                            opacity: meta.progresso >= meta.total ? 0.5 : 1,
                            fontWeight: 'bold',
                            fontFamily: 'var(--font-handwriting)',
                            fontSize: '0.875rem'
                          }}
                        >
                          ➕ Progresso
                        </button>
                      </div>
                    )}

                    {meta.concluida && (
                      <p style={{
                        color: '#22c55e',
                        fontSize: '0.875rem',
                        marginTop: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-handwriting)'
                      }}>
                        ✅ Meta concluida!
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Habitos */}
          <div className="card" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '3px solid var(--chalk-dim)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 className="card-title" style={{
                color: 'var(--chalk-white)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)'
              }}>
                🔄 Habitos Diarios
              </h2>
              <button
                onClick={() => setShowHabitoModal(true)}
                className="btn btn-yellow"
                style={{
                  backgroundColor: 'var(--accent-yellow)',
                  color: 'var(--chalkboard-bg)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-handwriting)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ➕ Novo
              </button>
            </div>

            {habitos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔄</div>
                <p style={{
                  color: 'var(--chalk-dim)',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Nenhum habito cadastrado
                </p>
                <button
                  onClick={() => setShowHabitoModal(true)}
                  className="btn btn-yellow"
                  style={{
                    backgroundColor: 'var(--accent-yellow)',
                    color: 'var(--chalkboard-bg)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-handwriting)'
                  }}
                >
                  ➕ Criar Habito
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {habitos.map((habito) => {
                  const feitoHoje = getHabitoFeitoHoje(habito);
                  const sequencia = getSequenciaHabito(habito);

                  return (
                    <div
                      key={habito.id}
                      className="chalkboard-card"
                      style={{
                        backgroundColor: feitoHoje ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        border: feitoHoje ? '2px solid rgba(34, 197, 94, 0.3)' : '2px solid var(--chalk-dim)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
      <FloatingBackButton />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                          onClick={() => toggleHabitoHoje(habito.id)}
                          style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            border: feitoHoje ? '2px solid #22c55e' : '2px solid var(--chalk-dim)',
                            backgroundColor: feitoHoje ? '#22c55e' : 'transparent',
                            color: feitoHoje ? 'white' : 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            fontSize: '1.25rem'
                          }}
                          onMouseEnter={(e) => {
                            if (!feitoHoje) e.currentTarget.style.borderColor = 'var(--accent-yellow)';
                          }}
                          onMouseLeave={(e) => {
                            if (!feitoHoje) e.currentTarget.style.borderColor = 'var(--chalk-dim)';
                          }}
                        >
                          {feitoHoje ? '✓' : habito.emoji}
                        </button>
                        <div>
                          <p style={{
                            color: 'var(--chalk-white)',
                            fontWeight: '600',
                            fontFamily: 'var(--font-handwriting)',
                            textDecoration: feitoHoje ? 'line-through' : 'none',
                            opacity: feitoHoje ? 0.7 : 1
                          }}>
                            {habito.nome}
                          </p>
                          {sequencia > 0 && (
                            <p style={{
                              color: 'var(--accent-yellow)',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-handwriting)'
                            }}>
                              🔥 {sequencia} dias seguidos
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removerHabito(habito.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f87171',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Links Rapidos */}
        <div className="card" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '3px solid var(--chalk-dim)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          marginTop: '2rem'
        }}>
          <h2 className="card-title" style={{
            color: 'var(--chalk-white)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-handwriting)',
            marginBottom: '1.5rem'
          }}>
            🚀 Acesso Rapido
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            <button
              onClick={() => router.push('/enem/cronograma')}
              className="chalkboard-card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid var(--chalk-dim)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📅</div>
              <p style={{
                color: 'var(--chalk-white)',
                fontWeight: '600',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-handwriting)'
              }}>
                Cronograma
              </p>
            </button>

            <button
              onClick={() => router.push('/enem/tecnicas')}
              className="chalkboard-card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid var(--chalk-dim)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧠</div>
              <p style={{
                color: 'var(--chalk-white)',
                fontWeight: '600',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-handwriting)'
              }}>
                Tecnicas
              </p>
            </button>

            <button
              onClick={() => router.push('/enem/simulado')}
              className="chalkboard-card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid var(--chalk-dim)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
              <p style={{
                color: 'var(--chalk-white)',
                fontWeight: '600',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-handwriting)'
              }}>
                Simulados
              </p>
            </button>

            <button
              onClick={() => router.push('/enem/dashboard')}
              className="chalkboard-card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid var(--chalk-dim)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
              <p style={{
                color: 'var(--chalk-white)',
                fontWeight: '600',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-handwriting)'
              }}>
                Dashboard
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer" style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '2px solid var(--chalk-dim)',
          textAlign: 'center'
        }}>
          <button
            onClick={() => router.push('/enem/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--chalk-dim)',
              cursor: 'pointer',
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1rem',
              textDecoration: 'underline'
            }}
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>

      {/* Modal Nova Meta */}
      {showMetaModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div className="card" style={{
            backgroundColor: 'var(--chalkboard-bg)',
            border: '3px solid var(--chalk-dim)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '28rem',
            width: '100%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 className="card-title" style={{
                color: 'var(--chalk-white)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)'
              }}>
                🎯 Nova Meta
              </h2>
              <button
                onClick={() => setShowMetaModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--chalk-dim)',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Titulo da Meta
                </label>
                <input
                  type="text"
                  value={novaMeta.titulo}
                  onChange={(e) => setNovaMeta({ ...novaMeta, titulo: e.target.value })}
                  placeholder="Ex: Fazer 5 simulados"
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid var(--chalk-dim)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'var(--chalk-white)',
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Tipo
                </label>
                <select
                  value={novaMeta.tipo}
                  onChange={(e) => setNovaMeta({ ...novaMeta, tipo: e.target.value as any })}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid var(--chalk-dim)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'var(--chalk-white)',
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="diaria">📅 Diaria</option>
                  <option value="semanal">📆 Semanal</option>
                  <option value="mensal">🗓️ Mensal</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Quantidade Total
                </label>
                <input
                  type="number"
                  value={novaMeta.total}
                  onChange={(e) => setNovaMeta({ ...novaMeta, total: Number(e.target.value) })}
                  min={1}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid var(--chalk-dim)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'var(--chalk-white)',
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem',
                paddingTop: '1rem'
              }}>
                <button
                  onClick={() => setShowMetaModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid var(--chalk-dim)',
                    color: 'var(--chalk-white)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-handwriting)',
                    fontWeight: '600'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={adicionarMeta}
                  disabled={!novaMeta.titulo}
                  className="btn btn-yellow"
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--accent-yellow)',
                    border: 'none',
                    color: 'var(--chalkboard-bg)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: novaMeta.titulo ? 'pointer' : 'not-allowed',
                    opacity: novaMeta.titulo ? 1 : 0.5,
                    fontFamily: 'var(--font-handwriting)',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Criar Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Habito */}
      {showHabitoModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div className="card" style={{
            backgroundColor: 'var(--chalkboard-bg)',
            border: '3px solid var(--chalk-dim)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '28rem',
            width: '100%',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 className="card-title" style={{
                color: 'var(--chalk-white)',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)'
              }}>
                🔄 Novo Habito
              </h2>
              <button
                onClick={() => setShowHabitoModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--chalk-dim)',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Nome do Habito
                </label>
                <input
                  type="text"
                  value={novoHabito.nome}
                  onChange={(e) => setNovoHabito({ ...novoHabito, nome: e.target.value })}
                  placeholder="Ex: Revisar flashcards"
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid var(--chalk-dim)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: 'var(--chalk-white)',
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  Emoji
                </label>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {emojisHabito.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNovoHabito({ ...novoHabito, emoji })}
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        backgroundColor: novoHabito.emoji === emoji ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: novoHabito.emoji === emoji ? '2px solid var(--accent-yellow)' : '2px solid var(--chalk-dim)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (novoHabito.emoji !== emoji) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (novoHabito.emoji !== emoji) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        }
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem',
                paddingTop: '1rem'
              }}>
                <button
                  onClick={() => setShowHabitoModal(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid var(--chalk-dim)',
                    color: 'var(--chalk-white)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-handwriting)',
                    fontWeight: '600'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={adicionarHabito}
                  disabled={!novoHabito.nome}
                  className="btn btn-yellow"
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--accent-yellow)',
                    border: 'none',
                    color: 'var(--chalkboard-bg)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: novoHabito.nome ? 'pointer' : 'not-allowed',
                    opacity: novoHabito.nome ? 1 : 0.5,
                    fontFamily: 'var(--font-handwriting)',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Criar Habito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
