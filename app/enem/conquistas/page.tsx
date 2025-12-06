'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';

interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  categoria: 'estudo' | 'social' | 'ranking' | 'especial';
  requisito: string;
  fpReward: number;
  progresso: number; // 0-100
  desbloqueada: boolean;
  dataDesbloqueio?: string;
  raras?: boolean;
}

interface Milestone {
  id: string;
  titulo: string;
  descricao: string;
  emoji: string;
  meta: number;
  atual: number;
  unidade: string;
  fpBonus: number;
  completo: boolean;
}

const conquistas: Conquista[] = [
  // Estudo
  { id: '1', nome: 'Primeiro Passo', descricao: 'Complete seu primeiro simulado', emoji: '🎯', categoria: 'estudo', requisito: '1 simulado', fpReward: 50, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-01' },
  { id: '2', nome: 'Estudante Dedicado', descricao: 'Complete 10 simulados', emoji: '📚', categoria: 'estudo', requisito: '10 simulados', fpReward: 100, progresso: 70, desbloqueada: false },
  { id: '3', nome: 'Mestre dos Simulados', descricao: 'Complete 50 simulados', emoji: '🏆', categoria: 'estudo', requisito: '50 simulados', fpReward: 500, progresso: 14, desbloqueada: false, raras: true },
  { id: '4', nome: 'Streak de 7 Dias', descricao: 'Estude 7 dias consecutivos', emoji: '🔥', categoria: 'estudo', requisito: '7 dias seguidos', fpReward: 100, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-08' },
  { id: '5', nome: 'Streak de 30 Dias', descricao: 'Estude 30 dias consecutivos', emoji: '💪', categoria: 'estudo', requisito: '30 dias seguidos', fpReward: 300, progresso: 23, desbloqueada: false, raras: true },
  { id: '6', nome: 'Streak de 100 Dias', descricao: 'Estude 100 dias consecutivos', emoji: '👑', categoria: 'estudo', requisito: '100 dias seguidos', fpReward: 1000, progresso: 7, desbloqueada: false, raras: true },
  { id: '7', nome: 'Pomodoro Master', descricao: 'Complete 100 sessoes Pomodoro', emoji: '🍅', categoria: 'estudo', requisito: '100 pomodoros', fpReward: 200, progresso: 12, desbloqueada: false },
  { id: '8', nome: 'Quiz Champion', descricao: 'Acerte 50 quizzes diarios seguidos', emoji: '🎯', categoria: 'estudo', requisito: '50 quizzes', fpReward: 250, progresso: 40, desbloqueada: false },

  // Social
  { id: '9', nome: 'Sociavel', descricao: 'Siga 10 estudantes', emoji: '👥', categoria: 'social', requisito: '10 seguindo', fpReward: 50, progresso: 60, desbloqueada: false },
  { id: '10', nome: 'Influencer', descricao: 'Tenha 50 seguidores', emoji: '⭐', categoria: 'social', requisito: '50 seguidores', fpReward: 200, progresso: 28, desbloqueada: false, raras: true },
  { id: '11', nome: 'Viral', descricao: 'Compartilhe 10 conquistas', emoji: '📱', categoria: 'social', requisito: '10 compartilhamentos', fpReward: 75, progresso: 30, desbloqueada: false },
  { id: '12', nome: 'Recrutador', descricao: 'Convide 5 amigos que se cadastraram', emoji: '🤝', categoria: 'social', requisito: '5 convites', fpReward: 250, progresso: 20, desbloqueada: false },

  // Ranking
  { id: '13', nome: 'Liga Prata', descricao: 'Alcance a Liga Prata', emoji: '🥈', categoria: 'ranking', requisito: '500 FP', fpReward: 50, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-05' },
  { id: '14', nome: 'Liga Ouro', descricao: 'Alcance a Liga Ouro', emoji: '🥇', categoria: 'ranking', requisito: '1500 FP', fpReward: 100, progresso: 83, desbloqueada: false },
  { id: '15', nome: 'Liga Platina', descricao: 'Alcance a Liga Platina', emoji: '💎', categoria: 'ranking', requisito: '3000 FP', fpReward: 200, progresso: 42, desbloqueada: false, raras: true },
  { id: '16', nome: 'Liga Diamante', descricao: 'Alcance a Liga Diamante', emoji: '💠', categoria: 'ranking', requisito: '5000 FP', fpReward: 500, progresso: 25, desbloqueada: false, raras: true },
  { id: '17', nome: 'Top 100', descricao: 'Entre no Top 100 do ranking geral', emoji: '🏅', categoria: 'ranking', requisito: 'Top 100', fpReward: 300, progresso: 0, desbloqueada: false, raras: true },
  { id: '18', nome: 'Campeao Semanal', descricao: 'Fique em 1º lugar no ranking semanal', emoji: '🏆', categoria: 'ranking', requisito: '1º lugar', fpReward: 500, progresso: 0, desbloqueada: false, raras: true },

  // Especial
  { id: '19', nome: 'Nota 900+', descricao: 'Tire 900+ em um simulado', emoji: '🌟', categoria: 'especial', requisito: 'Nota >= 900', fpReward: 500, progresso: 0, desbloqueada: false, raras: true },
  { id: '20', nome: 'Perfeito!', descricao: 'Acerte 100% de um simulado', emoji: '💯', categoria: 'especial', requisito: '100% acertos', fpReward: 300, progresso: 0, desbloqueada: false, raras: true },
  { id: '21', nome: 'Early Bird', descricao: 'Seja um dos primeiros 1000 usuarios', emoji: '🐦', categoria: 'especial', requisito: 'Cadastro antigo', fpReward: 100, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-10-15', raras: true },
  { id: '22', nome: 'Vencedor de Batalha', descricao: 'Venca sua primeira batalha 1v1', emoji: '⚔️', categoria: 'especial', requisito: '1 vitoria', fpReward: 75, progresso: 100, desbloqueada: true, dataDesbloqueio: '2024-11-10' },
  { id: '23', nome: 'Guerreiro', descricao: 'Venca 50 batalhas 1v1', emoji: '🗡️', categoria: 'especial', requisito: '50 vitorias', fpReward: 400, progresso: 10, desbloqueada: false, raras: true },
];

const milestones: Milestone[] = [
  { id: '1', titulo: 'Questoes Respondidas', descricao: 'Responda questoes em simulados', emoji: '📝', meta: 1000, atual: 347, unidade: 'questoes', fpBonus: 200, completo: false },
  { id: '2', titulo: 'Horas de Estudo', descricao: 'Tempo total em Pomodoro', emoji: '⏱️', meta: 100, atual: 12, unidade: 'horas', fpBonus: 300, completo: false },
  { id: '3', titulo: 'Acertos Consecutivos', descricao: 'Maior sequencia de acertos', emoji: '🎯', meta: 50, atual: 18, unidade: 'acertos', fpBonus: 150, completo: false },
  { id: '4', titulo: 'Amigos Convidados', descricao: 'Amigos que se cadastraram', emoji: '👥', meta: 10, atual: 1, unidade: 'amigos', fpBonus: 500, completo: false },
  { id: '5', titulo: 'Batalhas Vencidas', descricao: 'Vitorias no modo batalha', emoji: '⚔️', meta: 100, atual: 5, unidade: 'vitorias', fpBonus: 400, completo: false },
];

export default function ConquistasPage() {
  const router = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todas' | 'estudo' | 'social' | 'ranking' | 'especial'>('todas');
  const [showDesbloqueadas, setShowDesbloqueadas] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [conquistaCelebrando, setConquistaCelebrando] = useState<Conquista | null>(null);

  const categorias = [
    { id: 'todas', label: 'Todas', emoji: '🏆' },
    { id: 'estudo', label: 'Estudo', emoji: '📚' },
    { id: 'social', label: 'Social', emoji: '👥' },
    { id: 'ranking', label: 'Ranking', emoji: '🏅' },
    { id: 'especial', label: 'Especial', emoji: '⭐' },
  ];

  const conquistasFiltradas = conquistas.filter((c) => {
    if (showDesbloqueadas && !c.desbloqueada) return false;
    if (categoriaAtiva === 'todas') return true;
    return c.categoria === categoriaAtiva;
  });

  const totalDesbloqueadas = conquistas.filter((c) => c.desbloqueada).length;
  const fpTotalGanho = conquistas.filter((c) => c.desbloqueada).reduce((acc, c) => acc + c.fpReward, 0);

  const celebrarConquista = (conquista: Conquista) => {
    if (!conquista.desbloqueada) return;
    setConquistaCelebrando(conquista);
    setShowCelebration(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--chalkboard-bg)',
      padding: '2rem 1rem'
    }}>
      <FloatingNav />

      {/* Celebracao */}
      {showCelebration && conquistaCelebrando && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem'
          }}
          onClick={() => setShowCelebration(false)}
        >
          <div
            className="chalkboard-card"
            style={{
              padding: '2rem',
              textAlign: 'center',
              maxWidth: '28rem',
              animation: 'bounce 1s infinite'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>{conquistaCelebrando.emoji}</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--accent-yellow)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-chalk)'
            }}>
              Conquista Desbloqueada!
            </h2>
            <p style={{
              color: 'var(--chalk-white)',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              {conquistaCelebrando.nome}
            </p>
            <p style={{
              color: 'var(--chalk-dim)',
              marginBottom: '1rem'
            }}>
              {conquistaCelebrando.descricao}
            </p>
            <div style={{
              backgroundColor: 'rgba(234, 179, 8, 0.2)',
              borderRadius: '0.75rem',
              padding: '0.75rem',
              border: '2px solid rgba(234, 179, 8, 0.3)',
              marginBottom: '1rem'
            }}>
              <p style={{
                color: 'var(--accent-yellow)',
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}>
                +{conquistaCelebrando.fpReward} FP
              </p>
            </div>
            <p style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              opacity: 0.7
            }}>
              Desbloqueada em {conquistaCelebrando.dataDesbloqueio}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => setShowCelebration(false)}
                className="btn btn-yellow"
                style={{ flex: 1 }}
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const text = `🎉 Desbloqueei "${conquistaCelebrando.nome}" no ENEM-IA! ${conquistaCelebrando.emoji}\n\n+${conquistaCelebrando.fpReward} FP\n\nVem estudar comigo!`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="btn"
                style={{ flex: 1 }}
              >
                📱 Compartilhar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Container Principal */}
      <div className="container" style={{ marginTop: '4rem' }}>
        {/* Slogan */}
        <div
          className="card"
          style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, rgba(234, 179, 8, 0.2), rgba(249, 115, 22, 0.2))',
            border: '2px solid rgba(234, 179, 8, 0.3)',
            textAlign: 'center'
          }}
        >
          <p style={{
            color: 'var(--accent-yellow)',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontFamily: 'var(--font-chalk)'
          }}>
            "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
          </p>
        </div>

        {/* Header */}
        <div className="header" style={{ marginBottom: '2rem' }}>
          <h1>🏆 Conquistas & Milestones</h1>
          <p>Desbloqueie conquistas e ganhe FP bonus!</p>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar" style={{ marginBottom: '2rem' }}>
          <div className="stat-item">
            <span className="stat-number">{totalDesbloqueadas}/{conquistas.length}</span>
            <span className="stat-label">Conquistas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{ color: 'var(--accent-yellow)' }}>+{fpTotalGanho}</span>
            <span className="stat-label">FP de Conquistas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{conquistas.filter(c => c.raras && c.desbloqueada).length}</span>
            <span className="stat-label">Raras</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{Math.round((totalDesbloqueadas / conquistas.length) * 100)}%</span>
            <span className="stat-label">Progresso</span>
          </div>
        </div>

        {/* Milestones */}
        <div className="category" style={{ marginBottom: '2rem' }}>
          <h2 className="category-title">📊 Milestones de Progresso</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {milestones.map((m) => (
              <div
                key={m.id}
                className="chalkboard-card"
                style={{ padding: '1rem' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{m.emoji}</span>
                    <div>
                      <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>{m.titulo}</p>
                      <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>{m.descricao}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                      {m.atual.toLocaleString()}/{m.meta.toLocaleString()}
                    </p>
                    <p style={{ color: 'var(--accent-yellow)', fontSize: '0.875rem' }}>+{m.fpBonus} FP</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  height: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.25rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min((m.atual / m.meta) * 100, 100)}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-yellow)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <p style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  opacity: 0.7
                }}>
                  Faltam {(m.meta - m.atual).toLocaleString()} {m.unidade}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id as any)}
              className={categoriaAtiva === cat.id ? 'badge' : ''}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                transition: 'all 0.2s',
                backgroundColor: categoriaAtiva === cat.id ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                color: categoriaAtiva === cat.id ? 'var(--chalkboard-bg)' : 'var(--chalk-dim)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (categoriaAtiva !== cat.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (categoriaAtiva !== cat.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}

          <button
            onClick={() => setShowDesbloqueadas(!showDesbloqueadas)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              backgroundColor: showDesbloqueadas ? 'rgb(34, 197, 94)' : 'rgba(255, 255, 255, 0.1)',
              color: showDesbloqueadas ? 'white' : 'var(--chalk-dim)',
              border: 'none',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
            onMouseEnter={(e) => {
              if (!showDesbloqueadas) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showDesbloqueadas) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            ✓ Desbloqueadas
          </button>
        </div>

        {/* Grid de Conquistas */}
        <div className="cards-grid">
          {conquistasFiltradas.map((conquista) => (
            <div
              key={conquista.id}
              onClick={() => celebrarConquista(conquista)}
              className="chalkboard-card"
              style={{
                padding: '1.25rem',
                transition: 'transform 0.2s',
                cursor: conquista.desbloqueada ? 'pointer' : 'default',
                background: conquista.desbloqueada
                  ? 'linear-gradient(to right, rgba(234, 179, 8, 0.2), rgba(249, 115, 22, 0.2))'
                  : undefined,
                border: conquista.desbloqueada
                  ? '2px solid rgba(234, 179, 8, 0.3)'
                  : conquista.raras
                  ? '2px solid rgba(168, 85, 247, 0.5)'
                  : undefined,
                opacity: conquista.desbloqueada ? 1 : 0.7
              }}
              onMouseEnter={(e) => {
                if (conquista.desbloqueada) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  fontSize: '3rem',
                  filter: conquista.desbloqueada ? 'none' : 'grayscale(100%)',
                  opacity: conquista.desbloqueada ? 1 : 0.5
                }}>
                  {conquista.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem'
                  }}>
                    <h3 style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                      {conquista.nome}
                    </h3>
                    {conquista.raras && (
                      <span style={{ color: 'rgb(168, 85, 247)', fontSize: '0.75rem' }}>RARA</span>
                    )}
                    {conquista.desbloqueada && (
                      <span style={{ color: 'rgb(34, 197, 94)' }}>✓</span>
                    )}
                  </div>
                  <p style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem'
                  }}>
                    {conquista.descricao}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: 'var(--chalk-dim)', fontSize: '0.75rem', opacity: 0.7 }}>
                      {conquista.requisito}
                    </span>
                    <span style={{
                      color: 'var(--accent-yellow)',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}>
                      +{conquista.fpReward} FP
                    </span>
                  </div>

                  {!conquista.desbloqueada && conquista.progresso > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <div style={{
                        width: '100%',
                        height: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '0.25rem',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${conquista.progresso}%`,
                          height: '100%',
                          backgroundColor: 'var(--accent-yellow)',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{
                        color: 'var(--chalk-dim)',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        opacity: 0.7
                      }}>
                        {conquista.progresso}% completo
                      </p>
                    </div>
                  )}

                  {conquista.desbloqueada && conquista.dataDesbloqueio && (
                    <p style={{
                      color: 'var(--chalk-dim)',
                      fontSize: '0.75rem',
                      marginTop: '0.5rem',
                      opacity: 0.5
                    }}>
                      Desbloqueada em {conquista.dataDesbloqueio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {conquistasFiltradas.length === 0 && (
          <div className="chalkboard-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <span style={{ fontSize: '4rem', marginBottom: '1rem', display: 'block' }}>🔍</span>
            <p style={{ color: 'var(--chalk-dim)' }}>Nenhuma conquista encontrada nesta categoria</p>
          </div>
        )}

        {/* Dica */}
        <div
          className="card"
          style={{
            padding: '1.5rem',
            marginTop: '2rem',
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
            border: '2px solid rgba(6, 182, 212, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>💡</span>
            <div>
              <h3 style={{
                color: 'var(--chalk-white)',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-chalk)'
              }}>
                Dica para Desbloquear Mais
              </h3>
              <ul style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.875rem',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.25rem' }}>• Faca simulados diariamente para manter sua streak</li>
                <li style={{ marginBottom: '0.25rem' }}>• Use o Pomodoro para ganhar FP enquanto estuda</li>
                <li style={{ marginBottom: '0.25rem' }}>• Desafie amigos no modo Batalha</li>
                <li>• Convide amigos para ganhar conquistas sociais</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <button
            onClick={() => router.push('/enem')}
            className="btn btn-yellow"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
