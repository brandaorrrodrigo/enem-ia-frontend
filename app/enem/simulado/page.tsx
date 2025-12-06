'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { generateSimulado, salvarSimuladoEmAndamento } from '@/lib/questions';
import FloatingNav from '@/components/FloatingNav';
import { ChalkIcon } from '@/components/IconFix';
import {
  FileText,
  Clock,
  Target,
  Zap,
  BookOpen,
  Calculator,
  Globe,
  Atom,
  MessageSquare,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const areas = [
  { id: '', label: 'Todas as Areas', icon: Target, emoji: '🌐' },
  { id: 'matematica', label: 'Matematica', icon: Calculator, emoji: '📐' },
  { id: 'linguagens', label: 'Linguagens', icon: MessageSquare, emoji: '📚' },
  { id: 'humanas', label: 'Ciencias Humanas', icon: Globe, emoji: '🌍' },
  { id: 'natureza', label: 'Ciencias da Natureza', icon: Atom, emoji: '🔬' },
];

const quantidades = [
  { value: 10, label: '10 questoes', tempo: '~20 min', recomendado: false },
  { value: 15, label: '15 questoes', tempo: '~30 min', recomendado: true },
  { value: 20, label: '20 questoes', tempo: '~40 min', recomendado: false },
  { value: 30, label: '30 questoes', tempo: '~60 min', recomendado: false },
  { value: 45, label: '45 questoes', tempo: '~90 min', recomendado: false },
];

export default function SimuladoInicioPage() {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(15);
  const [area, setArea] = useState('');
  const [modoCorrecao, setModoCorrecao] = useState<'imediato' | 'final'>('final');
  const [loading, setLoading] = useState(false);

  const handleIniciarSimulado = () => {
    setLoading(true);

    try {
      const simulado = generateSimulado(
        quantidade,
        area || undefined,
        undefined,
        'misto',
        modoCorrecao
      );

      salvarSimuladoEmAndamento(simulado);
      router.push('/enem/simulado/' + simulado.id);
    } catch (error) {
      console.error('Erro ao gerar simulado:', error);
      setLoading(false);
    }
  };

  const areaAtual = areas.find(a => a.id === area) || areas[0];

  return (
    <div className="container" style={{
      minHeight: '100vh',
      padding: '2rem 1rem',
      background: 'var(--chalkboard-bg)',
    }}>
      <FloatingNav />

      <div style={{ maxWidth: '48rem', margin: '0 auto', paddingTop: '2rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header"
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '1rem',
              background: 'var(--accent-yellow-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FileText style={{ width: '1.75rem', height: '1.75rem', color: 'var(--accent-yellow)' }} />
            </div>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-kalam)',
            color: 'var(--chalk-white)',
            marginBottom: '0.75rem',
            textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          }}>
            Configurar Simulado
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--chalk-dim)',
            fontFamily: 'var(--font-kalam)',
          }}>
            Personalize seu simulado e teste seus conhecimentos no estilo ENEM
          </p>
        </motion.div>

        {/* Card Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
          style={{
            background: 'var(--card-bg)',
            border: '3px solid var(--wood-border)',
            borderRadius: '0.75rem',
            padding: '2rem',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Quantidade de questoes */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--chalk-white)',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-kalam)',
            }}>
              <ChalkIcon icon={BookOpen} size={22} color="yellow" />
              Quantidade de Questoes
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '0.75rem',
            }}>
              {quantidades.map((q) => (
                <button
                  key={q.value}
                  onClick={() => setQuantidade(q.value)}
                  style={{
                    position: 'relative',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: quantidade === q.value
                      ? '2px solid var(--accent-yellow)'
                      : '2px solid rgba(255,255,255,0.1)',
                    background: quantidade === q.value
                      ? 'var(--accent-yellow-dim)'
                      : 'rgba(0,0,0,0.2)',
                    color: quantidade === q.value
                      ? 'var(--chalk-white)'
                      : 'var(--chalk-dim)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (quantidade !== q.value) {
                      e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                      e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (quantidade !== q.value) {
                      e.currentTarget.style.border = '2px solid rgba(255,255,255,0.1)';
                      e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                    }
                  }}
                >
                  {q.recomendado && (
                    <span style={{
                      position: 'absolute',
                      top: '-0.5rem',
                      right: '-0.5rem',
                      padding: '0.125rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      background: 'var(--accent-yellow)',
                      color: '#1e293b',
                      borderRadius: '9999px',
                    }}>
                      TOP
                    </span>
                  )}
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-kalam)',
                  }}>
                    {q.value}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: '0.25rem',
                  }}>
                    {q.tempo}
                  </div>
                </button>
              ))}
            </div>

            {/* Slider para ajuste fino */}
            <div style={{ marginTop: '1rem' }}>
              <input
                type="range"
                min="5"
                max="45"
                step="5"
                value={quantidade}
                onChange={(e) => setQuantidade(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '0.5rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  accentColor: 'var(--accent-yellow)',
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '0.25rem',
              }}>
                <span>5</span>
                <span>25</span>
                <span>45</span>
              </div>
            </div>

            {/* Info tempo estimado */}
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#60a5fa' }} />
              <span style={{ color: '#93c5fd', fontSize: '0.875rem' }}>
                Tempo estimado: <strong>~{Math.round(quantidade * 2)} minutos</strong>
              </span>
            </div>
          </div>

          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--chalk-dim), transparent)',
            margin: '2rem 0',
            opacity: 0.3,
          }} />

          {/* Area de conhecimento */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--chalk-white)',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-kalam)',
            }}>
              <ChalkIcon icon={Target} size={22} color="yellow" />
              Area de Conhecimento
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
            }}>
              {areas.map((areaItem) => {
                const Icon = areaItem.icon;
                return (
                  <button
                    key={areaItem.id}
                    onClick={() => setArea(areaItem.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      border: area === areaItem.id
                        ? '2px solid var(--accent-yellow)'
                        : '2px solid rgba(255,255,255,0.1)',
                      background: area === areaItem.id
                        ? 'var(--accent-yellow-dim)'
                        : 'rgba(0,0,0,0.2)',
                      color: area === areaItem.id
                        ? 'var(--chalk-white)'
                        : 'var(--chalk-dim)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                    onMouseEnter={(e) => {
                      if (area !== areaItem.id) {
                        e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                        e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (area !== areaItem.id) {
                        e.currentTarget.style.border = '2px solid rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{areaItem.emoji}</span>
                    <span style={{
                      fontWeight: '500',
                      fontFamily: 'var(--font-kalam)',
                    }}>
                      {areaItem.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--chalk-dim), transparent)',
            margin: '2rem 0',
            opacity: 0.3,
          }} />

          {/* Modo de correcao */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--chalk-white)',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-kalam)',
            }}>
              <ChalkIcon icon={Sparkles} size={22} color="yellow" />
              Modo de Correcao
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
            }}>
              {/* Gabarito no Final */}
              <button
                onClick={() => setModoCorrecao('final')}
                style={{
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  border: modoCorrecao === 'final'
                    ? '2px solid rgba(168, 85, 247, 0.5)'
                    : '2px solid rgba(255,255,255,0.1)',
                  background: modoCorrecao === 'final'
                    ? 'rgba(168, 85, 247, 0.2)'
                    : 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  boxShadow: modoCorrecao === 'final'
                    ? '0 0 20px rgba(168, 85, 247, 0.1)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (modoCorrecao !== 'final') {
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (modoCorrecao !== 'final') {
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.1)';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.875rem' }}>🎓</span>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'var(--chalk-white)',
                    fontSize: '1.125rem',
                    fontFamily: 'var(--font-kalam)',
                  }}>
                    Gabarito no Final
                  </span>
                </div>
                <p style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  margin: 0,
                }}>
                  Simula o ENEM real. Veja todas as respostas e explicacoes somente ao finalizar.
                </p>
                {modoCorrecao === 'final' && (
                  <div style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#d8b4fe',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                  }}>
                    <span>✓</span> Selecionado
                  </div>
                )}
              </button>

              {/* Correcao Imediata */}
              <button
                onClick={() => setModoCorrecao('imediato')}
                style={{
                  padding: '1.25rem',
                  borderRadius: '0.75rem',
                  border: modoCorrecao === 'imediato'
                    ? '2px solid var(--accent-yellow)'
                    : '2px solid rgba(255,255,255,0.1)',
                  background: modoCorrecao === 'imediato'
                    ? 'var(--accent-yellow-dim)'
                    : 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  boxShadow: modoCorrecao === 'imediato'
                    ? '0 0 20px rgba(250, 204, 21, 0.1)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (modoCorrecao !== 'imediato') {
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (modoCorrecao !== 'imediato') {
                    e.currentTarget.style.border = '2px solid rgba(255,255,255,0.1)';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1.875rem' }}>⚡</span>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'var(--chalk-white)',
                    fontSize: '1.125rem',
                    fontFamily: 'var(--font-kalam)',
                  }}>
                    Correcao Imediata
                  </span>
                </div>
                <p style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  margin: 0,
                }}>
                  Modo estudo. Veja se acertou e a explicacao logo apos confirmar cada resposta.
                </p>
                {modoCorrecao === 'imediato' && (
                  <div style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#fde047',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                  }}>
                    <span>✓</span> Selecionado
                  </div>
                )}
              </button>
            </div>
          </div>

          <div style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--chalk-dim), transparent)',
            margin: '2rem 0',
            opacity: 0.3,
          }} />

          {/* Resumo e Info */}
          <div style={{
            marginBottom: '2rem',
            padding: '1rem',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '0.75rem',
          }}>
            <h4 style={{
              color: 'var(--chalk-white)',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-kalam)',
            }}>
              <Zap style={{ width: '1.25rem', height: '1.25rem', color: '#4ade80' }} />
              Sobre este Simulado
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                Questoes no estilo ENEM oficial
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                {modoCorrecao === 'final' ? 'Gabarito completo ao finalizar' : 'Feedback imediato por questao'}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                Progresso salvo automaticamente
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#4ade80' }}>✓</span>
                Ganhe FP ao concluir
              </li>
            </ul>
          </div>

          {/* Botoes de acao */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <button
              onClick={handleIniciarSimulado}
              disabled={loading}
              className="btn btn-yellow"
              style={{
                flex: 1,
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)',
                background: loading ? 'var(--chalk-dim)' : 'var(--accent-yellow)',
                color: '#1e293b',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                }
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    border: '2px solid currentColor',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }} />
                  Preparando...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Iniciar Simulado
                  <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </>
              )}
            </button>

            <button
              onClick={() => router.push('/enem')}
              className="btn"
              style={{
                padding: '1rem 1.5rem',
                fontWeight: '600',
                fontFamily: 'var(--font-kalam)',
                background: 'rgba(0,0,0,0.3)',
                color: 'var(--chalk-white)',
                border: '2px solid var(--wood-border)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                e.currentTarget.style.borderColor = 'var(--chalk-white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'var(--wood-border)';
              }}
            >
              ← Voltar
            </button>
          </div>
        </motion.div>

        {/* Stats rapidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stats-bar"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '1.5rem',
          }}
        >
          <div className="stat-item" style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--wood-border)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
          }}>
            <div className="stat-number" style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#4ade80',
              fontFamily: 'var(--font-kalam)',
            }}>
              90+
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.75rem',
            }}>
              Questoes
            </div>
          </div>
          <div className="stat-item" style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--wood-border)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
          }}>
            <div className="stat-number" style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#60a5fa',
              fontFamily: 'var(--font-kalam)',
            }}>
              100%
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.75rem',
            }}>
              Estilo ENEM
            </div>
          </div>
          <div className="stat-item" style={{
            background: 'var(--card-bg)',
            border: '2px solid var(--wood-border)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center',
          }}>
            <div className="stat-number" style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#c084fc',
              fontFamily: 'var(--font-kalam)',
            }}>
              +FP
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.75rem',
            }}>
              Recompensas
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
