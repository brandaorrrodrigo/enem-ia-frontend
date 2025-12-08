'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface StudyEvent {
  id: string;
  titulo: string;
  disciplina: string;
  data: string;
  horario: string;
  duracao: number;
  concluido: boolean;
  cor: string;
}

interface WeekDay {
  nome: string;
  abrev: string;
  data: Date;
}

export default function CronogramaPage() {
  const [eventos, setEventos] = useState<StudyEvent[]>([]);
  const [semanaSelecionada, setSemanaSelecionada] = useState<WeekDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    disciplina: 'Matematica',
    data: '',
    horario: '09:00',
    duracao: 60,
  });

  const disciplinas = [
    { value: 'Matematica', label: 'Matematica', cor: 'bg-blue-500', emoji: '📐' },
    { value: 'Linguagens', label: 'Linguagens', cor: 'bg-purple-500', emoji: '📚' },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', cor: 'bg-amber-500', emoji: '🌍' },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', cor: 'bg-green-500', emoji: '🔬' },
    { value: 'Redacao', label: 'Redacao', cor: 'bg-red-500', emoji: '✍️' },
  ];

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    // Gerar dias da semana atual
    const hoje = new Date();
    const primeiroDia = new Date(hoje);
    primeiroDia.setDate(hoje.getDate() - hoje.getDay());

    const diasSemana: WeekDay[] = [];
    const nomeDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const nomeCompleto = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

    for (let i = 0; i < 7; i++) {
      const dia = new Date(primeiroDia);
      dia.setDate(primeiroDia.getDate() + i);
      diasSemana.push({
        nome: nomeCompleto[i],
        abrev: nomeDias[i],
        data: dia,
      });
    }
    setSemanaSelecionada(diasSemana);

    // Carregar eventos do localStorage
    const eventosLocal = localStorage.getItem('cronograma_eventos');
    if (eventosLocal) {
      setEventos(JSON.parse(eventosLocal));
    } else {
      // Eventos exemplo
      const eventosExemplo: StudyEvent[] = [
        {
          id: '1',
          titulo: 'Revisao Equacoes',
          disciplina: 'Matematica',
          data: formatarData(diasSemana[1].data),
          horario: '09:00',
          duracao: 90,
          concluido: false,
          cor: 'bg-blue-500',
        },
        {
          id: '2',
          titulo: 'Interpretacao de Texto',
          disciplina: 'Linguagens',
          data: formatarData(diasSemana[2].data),
          horario: '14:00',
          duracao: 60,
          concluido: true,
          cor: 'bg-purple-500',
        },
        {
          id: '3',
          titulo: 'Historia do Brasil',
          disciplina: 'Ciencias Humanas',
          data: formatarData(diasSemana[3].data),
          horario: '10:00',
          duracao: 120,
          concluido: false,
          cor: 'bg-amber-500',
        },
      ];
      setEventos(eventosExemplo);
      localStorage.setItem('cronograma_eventos', JSON.stringify(eventosExemplo));
    }

    setLoading(false);
  };

  const formatarData = (data: Date): string => {
    return data.toISOString().split('T')[0];
  };

  const adicionarEvento = () => {
    const disciplinaInfo = disciplinas.find(d => d.value === novoEvento.disciplina);
    const evento: StudyEvent = {
      id: Date.now().toString(),
      titulo: novoEvento.titulo,
      disciplina: novoEvento.disciplina,
      data: novoEvento.data,
      horario: novoEvento.horario,
      duracao: novoEvento.duracao,
      concluido: false,
      cor: disciplinaInfo?.cor || 'bg-gray-500',
    };

    const novosEventos = [...eventos, evento];
    setEventos(novosEventos);
    localStorage.setItem('cronograma_eventos', JSON.stringify(novosEventos));
    setShowModal(false);
    setNovoEvento({
      titulo: '',
      disciplina: 'Matematica',
      data: '',
      horario: '09:00',
      duracao: 60,
    });
  };

  const toggleConcluido = (id: string) => {
    const novosEventos = eventos.map(e =>
      e.id === id ? { ...e, concluido: !e.concluido } : e
    );
    setEventos(novosEventos);
    localStorage.setItem('cronograma_eventos', JSON.stringify(novosEventos));
  };

  const removerEvento = (id: string) => {
    const novosEventos = eventos.filter(e => e.id !== id);
    setEventos(novosEventos);
    localStorage.setItem('cronograma_eventos', JSON.stringify(novosEventos));
  };

  const getEventosDia = (data: Date): StudyEvent[] => {
    const dataStr = formatarData(data);
    return eventos.filter(e => e.data === dataStr);
  };

  const isHoje = (data: Date): boolean => {
    const hoje = new Date();
    return data.toDateString() === hoje.toDateString();
  };

  if (loading) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
      <FloatingBackButton />
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-6"
            style={{ borderColor: 'var(--accent-yellow)', borderTopColor: 'transparent' }}
          ></div>
          <p style={{ color: 'var(--chalk-white)', fontSize: '1.25rem', fontWeight: 'bold' }}>
            Carregando cronograma...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <FloatingNav />

      {/* Header */}
      <div className="header">
        <h1>📅 Cronograma de Estudos</h1>
        <p>Organize sua rotina de estudos para o ENEM</p>
      </div>

      {/* Botão Adicionar */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-yellow"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontSize: '1.25rem' }}>➕</span>
          Adicionar Estudo
        </button>
      </div>

      {/* Estatísticas da Semana */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">{eventos.length}</div>
          <div className="stat-label">📚 Total Planejado</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{eventos.filter(e => e.concluido).length}</div>
          <div className="stat-label">✅ Concluídos</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{eventos.filter(e => !e.concluido).length}</div>
          <div className="stat-label">⏳ Pendentes</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{Math.round(eventos.reduce((acc, e) => acc + e.duracao, 0) / 60)}h</div>
          <div className="stat-label">⏱️ Horas Totais</div>
        </div>
      </div>

      {/* Calendário Semanal */}
      <div className="category">
        <h2 className="category-title">🗓️ Esta Semana</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          {semanaSelecionada.map((dia) => (
            <div
              key={dia.abrev}
              style={{
                background: isHoje(dia.data)
                  ? 'rgba(255, 223, 0, 0.15)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: isHoje(dia.data)
                  ? '3px solid var(--accent-yellow)'
                  : '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: isHoje(dia.data) ? 'var(--accent-yellow)' : 'var(--chalk-dim)',
                  marginBottom: '0.25rem'
                }}>
                  {dia.abrev}
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: isHoje(dia.data) ? 'var(--accent-yellow)' : 'var(--chalk-white)'
                }}>
                  {dia.data.getDate()}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {getEventosDia(dia.data).map((evento) => (
                  <div
                    key={evento.id}
                    className={evento.cor}
                    style={{
                      borderRadius: '6px',
                      padding: '0.5rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      opacity: evento.concluido ? 0.5 : 1,
                      textDecoration: evento.concluido ? 'line-through' : 'none',
                      transition: 'opacity 0.2s ease'
                    }}
                    onClick={() => toggleConcluido(evento.id)}
                    title={`${evento.titulo} - ${evento.horario}`}
                  >
                    <span style={{ display: 'block', color: 'white', fontWeight: 'bold' }}>
                      {evento.horario}
                    </span>
                    <span style={{ display: 'block', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {evento.titulo.substring(0, 15)}...
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="category" style={{ marginTop: '2rem' }}>
        <h2 className="category-title">📋 Todos os Estudos Planejados</h2>

        {eventos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📅</div>
            <h3 style={{
              color: 'var(--chalk-white)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Nenhum estudo planejado
            </h3>
            <p style={{
              color: 'var(--chalk-dim)',
              marginBottom: '1.5rem'
            }}>
              Comece organizando sua rotina de estudos!
            </p>
            <button onClick={() => setShowModal(true)} className="btn btn-yellow">
              ➕ Adicionar Primeiro Estudo
            </button>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            {eventos.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()).map((evento) => {
              const disciplinaInfo = disciplinas.find(d => d.value === evento.disciplina);
              return (
                <div
                  key={evento.id}
                  className="chalkboard-card"
                  style={{
                    opacity: evento.concluido ? 0.6 : 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
      <FloatingBackButton />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                      onClick={() => toggleConcluido(evento.id)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        border: evento.concluido
                          ? '2px solid var(--accent-green)'
                          : '2px solid rgba(255, 255, 255, 0.3)',
                        background: evento.concluido ? 'var(--accent-green)' : 'transparent',
                        color: evento.concluido ? 'white' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {evento.concluido && '✓'}
                    </button>

                    <div>
                      <p style={{
                        color: 'var(--chalk-white)',
                        fontWeight: 'bold',
                        textDecoration: evento.concluido ? 'line-through' : 'none',
                        marginBottom: '0.25rem'
                      }}>
                        {evento.titulo}
                      </p>
                      <p style={{
                        color: 'var(--chalk-dim)',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>{disciplinaInfo?.emoji}</span>
                        <span>{evento.disciplina}</span>
                        <span>•</span>
                        <span>{evento.duracao} min</span>
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexShrink: 0
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        color: 'var(--accent-yellow)',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem'
                      }}>
                        {evento.horario}
                      </p>
                      <p style={{
                        color: 'var(--chalk-dim)',
                        fontSize: '0.75rem'
                      }}>
                        {new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    <button
                      onClick={() => removerEvento(evento.id)}
                      style={{
                        color: '#ff6b6b',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        fontSize: '1.25rem',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Adicionar Evento */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '28rem', width: '100%' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 className="card-title">➕ Novo Estudo</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--chalk-dim)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--chalk-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--chalk-dim)'}
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
                  marginBottom: '0.5rem'
                }}>
                  Título
                </label>
                <input
                  type="text"
                  value={novoEvento.titulo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                  placeholder="Ex: Revisão de Funções"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-yellow)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem'
                }}>
                  Disciplina
                </label>
                <select
                  value={novoEvento.disciplina}
                  onChange={(e) => setNovoEvento({ ...novoEvento, disciplina: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {disciplinas.map((d) => (
                    <option key={d.value} value={d.value} style={{ background: '#1a1a1a' }}>
                      {d.emoji} {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    Data
                  </label>
                  <input
                    type="date"
                    value={novoEvento.data}
                    onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--chalk-white)',
                      fontSize: '1rem',
                      outline: 'none',
                      colorScheme: 'dark'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    Horário
                  </label>
                  <input
                    type="time"
                    value={novoEvento.horario}
                    onChange={(e) => setNovoEvento({ ...novoEvento, horario: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--chalk-white)',
                      fontSize: '1rem',
                      outline: 'none',
                      colorScheme: 'dark'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem'
                }}>
                  Duração (minutos)
                </label>
                <select
                  value={novoEvento.duracao}
                  onChange={(e) => setNovoEvento({ ...novoEvento, duracao: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value={30} style={{ background: '#1a1a1a' }}>30 minutos</option>
                  <option value={45} style={{ background: '#1a1a1a' }}>45 minutos</option>
                  <option value={60} style={{ background: '#1a1a1a' }}>1 hora</option>
                  <option value={90} style={{ background: '#1a1a1a' }}>1h30</option>
                  <option value={120} style={{ background: '#1a1a1a' }}>2 horas</option>
                  <option value={180} style={{ background: '#1a1a1a' }}>3 horas</option>
                </select>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem',
                paddingTop: '1rem'
              }}>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn"
                  style={{ flex: 1 }}
                >
                  Cancelar
                </button>
                <button
                  onClick={adicionarEvento}
                  disabled={!novoEvento.titulo || !novoEvento.data}
                  className="btn btn-yellow"
                  style={{
                    flex: 1,
                    opacity: (!novoEvento.titulo || !novoEvento.data) ? 0.5 : 1,
                    cursor: (!novoEvento.titulo || !novoEvento.data) ? 'not-allowed' : 'pointer'
                  }}
                >
                  ✅ Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          <Link href="/enem">← Voltar ao Painel</Link>
        </p>
      </footer>
    </div>
  );
}
