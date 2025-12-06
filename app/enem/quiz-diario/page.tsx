'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';

interface Questao {
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  disciplina: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
}

const questoesDiarias: Questao[] = [
  {
    id: '1',
    enunciado: 'Qual e o resultado de 2³ + 3²?',
    alternativas: ['11', '17', '13', '15'],
    correta: 1,
    disciplina: 'Matematica',
    dificuldade: 'facil',
  },
  {
    id: '2',
    enunciado: 'Quem escreveu "Dom Casmurro"?',
    alternativas: ['Jose de Alencar', 'Machado de Assis', 'Jorge Amado', 'Graciliano Ramos'],
    correta: 1,
    disciplina: 'Linguagens',
    dificuldade: 'facil',
  },
  {
    id: '3',
    enunciado: 'Em que ano foi proclamada a Republica no Brasil?',
    alternativas: ['1822', '1889', '1891', '1888'],
    correta: 1,
    disciplina: 'Historia',
    dificuldade: 'medio',
  },
  {
    id: '4',
    enunciado: 'Qual e a formula da agua?',
    alternativas: ['H2O', 'CO2', 'NaCl', 'O2'],
    correta: 0,
    disciplina: 'Quimica',
    dificuldade: 'facil',
  },
  {
    id: '5',
    enunciado: 'Qual figura de linguagem esta presente em "O sol sorria para nos"?',
    alternativas: ['Metafora', 'Personificacao', 'Hiperbole', 'Metonimia'],
    correta: 1,
    disciplina: 'Linguagens',
    dificuldade: 'medio',
  },
];

export default function QuizDiarioPage() {
  const router = useRouter();
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>(new Array(5).fill(null));
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(300); // 5 minutos
  const [quizIniciado, setQuizIniciado] = useState(false);
  const [jaFezHoje, setJaFezHoje] = useState(false);
  const [streakAtual, setStreakAtual] = useState(0);

  useEffect(() => {
    // Verificar se ja fez o quiz hoje
    const ultimoQuiz = localStorage.getItem('ultimo_quiz_diario');
    const hoje = new Date().toDateString();

    if (ultimoQuiz === hoje) {
      setJaFezHoje(true);
    }

    // Carregar streak
    const streak = parseInt(localStorage.getItem('quiz_streak') || '0');
    setStreakAtual(streak);
  }, []);

  useEffect(() => {
    if (quizIniciado && tempoRestante > 0 && !mostrarResultado) {
      const timer = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (tempoRestante === 0 && !mostrarResultado) {
      finalizarQuiz();
    }
  }, [quizIniciado, tempoRestante, mostrarResultado]);

  const iniciarQuiz = () => {
    setQuizIniciado(true);
  };

  const selecionarResposta = (alternativa: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = alternativa;
    setRespostas(novasRespostas);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoesDiarias.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      finalizarQuiz();
    }
  };

  const finalizarQuiz = () => {
    setMostrarResultado(true);

    // Salvar que fez o quiz hoje
    localStorage.setItem('ultimo_quiz_diario', new Date().toDateString());

    // Calcular acertos e atualizar streak
    const acertos = respostas.filter((r, i) => r === questoesDiarias[i].correta).length;

    if (acertos >= 3) {
      const novoStreak = streakAtual + 1;
      localStorage.setItem('quiz_streak', novoStreak.toString());
      setStreakAtual(novoStreak);
    } else {
      localStorage.setItem('quiz_streak', '0');
    }

    // Adicionar FP
    const fpGanho = acertos * 10 + (acertos === 5 ? 25 : 0); // Bonus perfeito
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      user.pontosFP = (user.pontosFP || 0) + fpGanho;
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const calcularResultado = () => {
    const acertos = respostas.filter((r, i) => r === questoesDiarias[i].correta).length;
    const fpGanho = acertos * 10 + (acertos === 5 ? 25 : 0);
    return { acertos, total: questoesDiarias.length, fpGanho };
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}:${seg.toString().padStart(2, '0')}`;
  };

  // Tela de ja fez hoje
  if (jaFezHoje && !quizIniciado) {
    return (
      <div className="container min-h-screen py-8 px-4" style={{ background: 'var(--chalkboard)' }}>
        <FloatingNav />

        <div className="max-w-2xl mx-auto mt-16">
          <div className="card p-8 text-center">
            <div className="text-8xl mb-6">✅</div>

            <div className="header text-center mb-6">
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--chalk-white)',
                marginBottom: '1rem'
              }}>
                Quiz Diario Completo!
              </h1>
              <p style={{ color: 'var(--chalk-dim)', fontSize: '1.1rem' }}>
                Voce ja completou o quiz de hoje. Volte amanha para manter sua streak!
              </p>
            </div>

            <div className="stat-item mb-6" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <p className="stat-label" style={{ color: 'var(--chalk-dim)', marginBottom: '0.5rem' }}>
                Sua streak atual
              </p>
              <p className="stat-number" style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'var(--accent-orange)'
              }}>
                {streakAtual}🔥
              </p>
            </div>

            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn btn-yellow w-full"
              style={{ padding: '1rem', fontSize: '1.1rem' }}
            >
              📝 Fazer um Simulado
            </button>
          </div>

          <div className="footer mt-8">
            <button
              onClick={() => router.push('/enem')}
              style={{
                color: 'var(--chalk-dim)',
                textDecoration: 'none',
                fontSize: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto'
              }}
            >
              ← Voltar para o Hub ENEM
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela inicial
  if (!quizIniciado) {
    return (
      <div className="container min-h-screen py-8 px-4" style={{ background: 'var(--chalkboard)' }}>
        <FloatingNav />

        <div className="max-w-2xl mx-auto mt-16">
          <div className="card p-8 text-center">
            <div className="text-8xl mb-6">🎯</div>

            <div className="header text-center mb-6">
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--chalk-white)',
                marginBottom: '1rem'
              }}>
                Quiz Diario
              </h1>
            </div>

            <div style={{
              background: 'linear-gradient(to right, rgba(251, 191, 36, 0.2), rgba(249, 115, 22, 0.2))',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
              <p style={{
                color: 'var(--accent-yellow)',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: '1.1rem'
              }}>
                "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
              </p>
            </div>

            <p style={{
              color: 'var(--chalk-dim)',
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              Responda 5 questoes rapidas e ganhe FP! Complete o quiz diariamente para manter sua streak.
            </p>

            <div className="stats-bar mb-6" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem'
            }}>
              <div className="stat-item">
                <p className="stat-number">5</p>
                <p className="stat-label">Questoes</p>
              </div>
              <div className="stat-item">
                <p className="stat-number">5min</p>
                <p className="stat-label">Tempo</p>
              </div>
              <div className="stat-item">
                <p className="stat-number" style={{ color: 'var(--accent-yellow)' }}>+75</p>
                <p className="stat-label">FP Max</p>
              </div>
            </div>

            {streakAtual > 0 && (
              <div style={{
                background: 'rgba(249, 115, 22, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}>
                <p style={{
                  color: 'var(--accent-orange)',
                  fontWeight: 'bold',
                  marginBottom: '0.25rem'
                }}>
                  🔥 Streak: {streakAtual} dias
                </p>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.9rem' }}>
                  Nao perca! Acerte 3+ para manter.
                </p>
              </div>
            )}

            <button
              onClick={iniciarQuiz}
              className="btn btn-yellow w-full"
              style={{ padding: '1.25rem', fontSize: '1.2rem' }}
            >
              🚀 Comecar Quiz
            </button>
          </div>

          <div className="footer mt-8">
            <button
              onClick={() => router.push('/enem')}
              style={{
                color: 'var(--chalk-dim)',
                textDecoration: 'none',
                fontSize: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto'
              }}
            >
              ← Voltar para o Hub ENEM
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela de resultado
  if (mostrarResultado) {
    const resultado = calcularResultado();
    const perfeito = resultado.acertos === resultado.total;

    return (
      <div className="container min-h-screen py-8 px-4" style={{ background: 'var(--chalkboard)' }}>
        <FloatingNav />

        <div className="max-w-2xl mx-auto mt-8">
          <div className="card p-8 text-center">
            <div className="text-8xl mb-6">
              {perfeito ? '🏆' : resultado.acertos >= 3 ? '🎉' : '📚'}
            </div>

            <div className="header text-center mb-6">
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--chalk-white)',
                marginBottom: '0.5rem'
              }}>
                {perfeito ? 'PERFEITO!' : resultado.acertos >= 3 ? 'Muito Bem!' : 'Continue Estudando!'}
              </h1>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div className="stat-item" style={{ padding: '1.5rem' }}>
                <p className="stat-number" style={{ fontSize: '2.5rem' }}>
                  {resultado.acertos}/{resultado.total}
                </p>
                <p className="stat-label">Acertos</p>
              </div>
              <div className="stat-item" style={{
                padding: '1.5rem',
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.3)'
              }}>
                <p className="stat-number" style={{
                  fontSize: '2.5rem',
                  color: 'var(--accent-yellow)'
                }}>
                  +{resultado.fpGanho}
                </p>
                <p className="stat-label">FP Ganhos</p>
              </div>
            </div>

            {resultado.acertos >= 3 && (
              <div style={{
                background: 'rgba(249, 115, 22, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(249, 115, 22, 0.3)'
              }}>
                <p style={{ color: 'var(--accent-orange)', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  🔥 Streak mantida!
                </p>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.9rem' }}>
                  Agora voce tem {streakAtual} dias seguidos!
                </p>
              </div>
            )}

            {perfeito && (
              <div style={{
                background: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(168, 85, 247, 0.3)'
              }}>
                <p style={{ color: '#c084fc', fontWeight: 'bold' }}>
                  ⭐ Bonus Perfeito: +25 FP
                </p>
              </div>
            )}

            {/* Revisao das questoes */}
            <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                Revisao:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {questoesDiarias.map((q, idx) => (
                  <div
                    key={q.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: respostas[idx] === q.correta
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                      border: respostas[idx] === q.correta
                        ? '1px solid rgba(34, 197, 94, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)'
                    }}
                  >
                    <p style={{ color: 'var(--chalk-white)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {idx + 1}. {q.disciplina}
                    </p>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.8rem' }}>
                      {respostas[idx] === q.correta
                        ? '✓ Correta'
                        : `✗ Resposta: ${q.alternativas[q.correta]}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => router.push('/enem/feed')}
                className="btn btn-yellow w-full"
                style={{ padding: '0.75rem' }}
              >
                📱 Ver Feed Social
              </button>
              <button
                onClick={() => router.push('/enem/simulado')}
                className="btn w-full"
                style={{
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid var(--chalk-dim)'
                }}
              >
                📝 Fazer Simulado Completo
              </button>
            </div>
          </div>

          <div className="footer mt-8">
            <button
              onClick={() => router.push('/enem')}
              style={{
                color: 'var(--chalk-dim)',
                textDecoration: 'none',
                fontSize: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto'
              }}
            >
              ← Voltar para o Hub ENEM
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tela do quiz
  const questao = questoesDiarias[questaoAtual];

  return (
    <div className="container min-h-screen py-8 px-4" style={{ background: 'var(--chalkboard)' }}>
      <FloatingNav />

      <div className="max-w-3xl mx-auto mt-8">
        {/* Header com timer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--chalk-dim)' }}>
              Questao {questaoAtual + 1}/{questoesDiarias.length}
            </span>
            <span className="badge">{questao.disciplina}</span>
          </div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: tempoRestante < 60 ? '#f87171' : 'var(--accent-yellow)'
          }}>
            ⏱️ {formatarTempo(tempoRestante)}
          </div>
        </div>

        {/* Barra de progresso */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '999px',
          marginBottom: '1.5rem',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'var(--accent-yellow)',
            width: `${((questaoAtual + 1) / questoesDiarias.length) * 100}%`,
            transition: 'width 0.3s ease',
            borderRadius: '999px'
          }} />
        </div>

        {/* Questao */}
        <div className="card p-6 mb-6">
          <p style={{
            color: 'var(--chalk-white)',
            fontSize: '1.25rem',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            {questao.enunciado}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {questao.alternativas.map((alt, idx) => (
              <button
                key={idx}
                onClick={() => selecionarResposta(idx)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  background: respostas[questaoAtual] === idx
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: respostas[questaoAtual] === idx
                    ? '2px solid var(--accent-yellow)'
                    : '2px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (respostas[questaoAtual] !== idx) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (respostas[questaoAtual] !== idx) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                <span style={{ fontWeight: 'bold', marginRight: '0.75rem', color: 'var(--chalk-white)' }}>
                  {String.fromCharCode(65 + idx)})
                </span>
                <span style={{ color: 'var(--chalk-white)' }}>{alt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Botao de avancar */}
        <button
          onClick={proximaQuestao}
          disabled={respostas[questaoAtual] === null}
          className="btn btn-yellow w-full"
          style={{
            padding: '1.25rem',
            fontSize: '1.2rem',
            opacity: respostas[questaoAtual] === null ? 0.5 : 1,
            cursor: respostas[questaoAtual] === null ? 'not-allowed' : 'pointer'
          }}
        >
          {questaoAtual < questoesDiarias.length - 1 ? 'Proxima Questao →' : '🏁 Finalizar Quiz'}
        </button>

        <div className="footer mt-8">
          <button
            onClick={() => {
              if (confirm('Tem certeza que deseja sair? Seu progresso sera perdido.')) {
                router.push('/enem');
              }
            }}
            style={{
              color: 'var(--chalk-dim)',
              textDecoration: 'none',
              fontSize: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'block',
              margin: '0 auto'
            }}
          >
            ← Voltar para o Hub ENEM
          </button>
        </div>
      </div>
    </div>
  );
}
