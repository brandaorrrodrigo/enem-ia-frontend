'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';

type TimerMode = 'foco' | 'pausa_curta' | 'pausa_longa';

interface Sessao {
  modo: TimerMode;
  duracao: number;
  completada: boolean;
  data: Date;
}

const TIMER_CONFIGS = {
  foco: { duracao: 25 * 60, label: 'Foco', emoji: '🎯', fpReward: 25 },
  pausa_curta: { duracao: 5 * 60, label: 'Pausa Curta', emoji: '☕', fpReward: 0 },
  pausa_longa: { duracao: 15 * 60, label: 'Pausa Longa', emoji: '🌴', fpReward: 5 },
};

export default function PomodoroPage() {
  const router = useRouter();
  const [modo, setModo] = useState<TimerMode>('foco');
  const [tempoRestante, setTempoRestante] = useState(TIMER_CONFIGS.foco.duracao);
  const [isRunning, setIsRunning] = useState(false);
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [pomodorosHoje, setPomodorosHoje] = useState(0);
  const [fpGanhoHoje, setFpGanhoHoje] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [fpGanhoAgora, setFpGanhoAgora] = useState(0);
  const [disciplinaAtual, setDisciplinaAtual] = useState('Geral');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const disciplinas = [
    'Geral',
    'Matematica',
    'Linguagens',
    'Ciencias Humanas',
    'Ciencias da Natureza',
    'Redacao',
  ];

  useEffect(() => {
    // Carregar dados do localStorage
    const hoje = new Date().toDateString();
    const pomodorosData = localStorage.getItem('pomodoros_hoje');
    const fpData = localStorage.getItem('fp_pomodoro_hoje');
    const dataUltimo = localStorage.getItem('pomodoro_data');

    if (dataUltimo === hoje) {
      setPomodorosHoje(parseInt(pomodorosData || '0'));
      setFpGanhoHoje(parseInt(fpData || '0'));
    } else {
      // Novo dia, resetar contadores
      localStorage.setItem('pomodoro_data', hoje);
      localStorage.setItem('pomodoros_hoje', '0');
      localStorage.setItem('fp_pomodoro_hoje', '0');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && tempoRestante > 0) {
      interval = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0 && isRunning) {
      completarSessao();
    }

    return () => clearInterval(interval);
  }, [isRunning, tempoRestante]);

  const completarSessao = () => {
    setIsRunning(false);

    const config = TIMER_CONFIGS[modo];
    const fpGanho = config.fpReward;

    // Adicionar sessao
    const novaSessao: Sessao = {
      modo,
      duracao: config.duracao,
      completada: true,
      data: new Date(),
    };
    setSessoes((prev) => [...prev, novaSessao]);

    // Atualizar contadores
    if (modo === 'foco') {
      const novosPomodorosHoje = pomodorosHoje + 1;
      setPomodorosHoje(novosPomodorosHoje);
      localStorage.setItem('pomodoros_hoje', novosPomodorosHoje.toString());

      // Bonus por sequencia de pomodoros
      let fpTotal = fpGanho;
      if (novosPomodorosHoje % 4 === 0) {
        fpTotal += 50; // Bonus a cada 4 pomodoros
      }

      const novoFpHoje = fpGanhoHoje + fpTotal;
      setFpGanhoHoje(novoFpHoje);
      localStorage.setItem('fp_pomodoro_hoje', novoFpHoje.toString());

      // Adicionar FP ao usuario
      const userLocal = localStorage.getItem('user');
      if (userLocal) {
        const user = JSON.parse(userLocal);
        user.pontosFP = (user.pontosFP || 0) + fpTotal;
        localStorage.setItem('user', JSON.stringify(user));
      }

      setFpGanhoAgora(fpTotal);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }

    // Tocar som
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    // Sugerir proximo modo
    if (modo === 'foco') {
      const pomodorosCompletos = sessoes.filter(s => s.modo === 'foco').length + 1;
      if (pomodorosCompletos % 4 === 0) {
        setModo('pausa_longa');
        setTempoRestante(TIMER_CONFIGS.pausa_longa.duracao);
      } else {
        setModo('pausa_curta');
        setTempoRestante(TIMER_CONFIGS.pausa_curta.duracao);
      }
    } else {
      setModo('foco');
      setTempoRestante(TIMER_CONFIGS.foco.duracao);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTempoRestante(TIMER_CONFIGS[modo].duracao);
  };

  const mudarModo = (novoModo: TimerMode) => {
    if (isRunning) return;
    setModo(novoModo);
    setTempoRestante(TIMER_CONFIGS[novoModo].duracao);
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  };

  const progresso = ((TIMER_CONFIGS[modo].duracao - tempoRestante) / TIMER_CONFIGS[modo].duracao) * 100;

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <FloatingNav />
      {/* Audio para notificacao */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/24/audio_805cb8c25d.mp3" />

      {/* Celebracao */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="card p-8 text-center animate-bounce">
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{
              fontSize: '1.5rem',
              color: 'var(--accent-yellow)',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-handwriting)'
            }}>
              Pomodoro Completo!
            </h2>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--chalk-white)' }}>
              +{fpGanhoAgora} FP
            </p>
          </div>
        </div>
      )}

      {/* Slogan */}
      <div className="card" style={{
        padding: '1rem',
        marginBottom: '1.5rem',
        marginTop: '4rem',
        background: 'linear-gradient(to right, rgba(251, 191, 36, 0.2), rgba(249, 115, 22, 0.2))',
        border: '2px solid rgba(251, 191, 36, 0.3)',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'var(--accent-yellow)',
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontFamily: 'var(--font-handwriting)'
        }}>
          "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
        </p>
      </div>

      <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
        {/* Titulo */}
        <div className="header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-handwriting)',
            color: 'var(--chalk-white)',
            marginBottom: '0.5rem'
          }}>
            🍅 Pomodoro
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--chalk-dim)',
            fontFamily: 'var(--font-handwriting)',
            marginBottom: 0
          }}>
            Foque nos estudos e ganhe FP!
          </p>
        </div>

        {/* Stats do dia */}
        <div className="stats-bar" style={{ marginBottom: '1.5rem' }}>
          <div className="stat-item">
            <span className="stat-number">{pomodorosHoje}</span>
            <span className="stat-label">Pomodoros Hoje</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" style={{ color: 'var(--accent-yellow)' }}>+{fpGanhoHoje}</span>
            <span className="stat-label">FP Ganhos</span>
          </div>
        </div>

        {/* Seletor de Disciplina */}
        <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
          <label style={{
            color: 'var(--chalk-dim)',
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
            display: 'block',
            fontFamily: 'var(--font-handwriting)'
          }}>
            Estudando:
          </label>
          <select
            value={disciplinaAtual}
            onChange={(e) => setDisciplinaAtual(e.target.value)}
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid var(--chalk-dim)',
              borderRadius: '0.5rem',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1rem',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.5 : 1
            }}
          >
            {disciplinas.map((d) => (
              <option key={d} value={d} style={{ backgroundColor: '#1e293b', color: 'white' }}>{d}</option>
            ))}
          </select>
        </div>

        {/* Timer Principal */}
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          {/* Seletor de Modo */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {(Object.keys(TIMER_CONFIGS) as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => mudarModo(m)}
                disabled={isRunning}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-handwriting)',
                  backgroundColor: modo === m ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                  color: modo === m ? '#0f172a' : 'var(--chalk-dim)',
                  opacity: isRunning && modo !== m ? 0.5 : 1
                }}
              >
                {TIMER_CONFIGS[m].emoji} {TIMER_CONFIGS[m].label}
              </button>
            ))}
          </div>

          {/* Display do Timer */}
          <div style={{ marginBottom: '1.5rem' }}>
            {/* Circulo de Progresso */}
            <div style={{ position: 'relative', width: '16rem', height: '16rem', margin: '0 auto' }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke={modo === 'foco' ? '#fbbf24' : modo === 'pausa_curta' ? '#34d399' : '#60a5fa'}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progresso / 100)}
                  style={{ transition: 'all 1s' }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '3.75rem', marginBottom: '0.5rem' }}>{TIMER_CONFIGS[modo].emoji}</span>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'var(--chalk-white)',
                  fontFamily: 'monospace'
                }}>
                  {formatarTempo(tempoRestante)}
                </span>
                <span style={{
                  color: 'var(--chalk-dim)',
                  marginTop: '0.5rem',
                  fontFamily: 'var(--font-handwriting)'
                }}>
                  {TIMER_CONFIGS[modo].label}
                </span>
              </div>
            </div>
          </div>

          {/* Recompensa */}
          {modo === 'foco' && (
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              backgroundColor: 'rgba(234, 179, 8, 0.2)',
              borderRadius: '0.75rem',
              padding: '0.75rem',
              border: '1px solid rgba(234, 179, 8, 0.3)'
            }}>
              <p style={{
                color: 'var(--accent-yellow)',
                fontWeight: 'bold',
                fontFamily: 'var(--font-handwriting)',
                margin: 0
              }}>
                🎁 Recompensa: +{TIMER_CONFIGS.foco.fpReward} FP
                {pomodorosHoje % 4 === 3 && ' (+50 FP bonus!)'}
              </p>
            </div>
          )}

          {/* Controles */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={toggleTimer}
              className="btn btn-yellow"
              style={{
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                backgroundColor: isRunning ? '#ef4444' : 'var(--accent-yellow)',
                color: isRunning ? 'white' : '#0f172a'
              }}
            >
              {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
            </button>
            <button
              onClick={resetTimer}
              className="btn"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1.125rem'
              }}
            >
              🔄 Resetar
            </button>
          </div>
        </div>

        {/* Historico de Sessoes */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 className="card-title">📊 Sessoes de Hoje</h2>

          {sessoes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sessoes.slice().reverse().slice(0, 8).map((sessao, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: sessao.modo === 'foco' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: sessao.modo === 'foco' ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{TIMER_CONFIGS[sessao.modo].emoji}</span>
                    <div>
                      <p style={{
                        color: 'var(--chalk-white)',
                        fontWeight: 600,
                        fontFamily: 'var(--font-handwriting)',
                        margin: 0
                      }}>
                        {TIMER_CONFIGS[sessao.modo].label}
                      </p>
                      <p style={{
                        color: 'var(--chalk-dim)',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-handwriting)',
                        margin: 0
                      }}>
                        {new Date(sessao.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  {sessao.modo === 'foco' && (
                    <span style={{
                      color: 'var(--accent-yellow)',
                      fontWeight: 'bold',
                      fontFamily: 'var(--font-handwriting)'
                    }}>
                      +{TIMER_CONFIGS.foco.fpReward} FP
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <span style={{ fontSize: '3.75rem', marginBottom: '1rem', display: 'block' }}>🍅</span>
              <p style={{
                color: 'var(--chalk-dim)',
                fontFamily: 'var(--font-handwriting)',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                Nenhuma sessao ainda hoje
              </p>
              <p style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-handwriting)',
                margin: 0
              }}>
                Inicie seu primeiro Pomodoro!
              </p>
            </div>
          )}
        </div>

        {/* Dicas */}
        <div className="card" style={{
          padding: '1.5rem',
          background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
          border: '2px solid rgba(6, 182, 212, 0.3)'
        }}>
          <h3 style={{
            color: 'var(--chalk-white)',
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.25rem'
          }}>
            💡 Tecnica Pomodoro
          </h3>
          <ul style={{
            color: 'var(--chalk-dim)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-handwriting)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingLeft: '1.5rem',
            margin: 0
          }}>
            <li>🎯 <strong style={{ color: 'var(--chalk-white)' }}>Foco 25min:</strong> Concentre-se apenas nos estudos</li>
            <li>☕ <strong style={{ color: 'var(--chalk-white)' }}>Pausa 5min:</strong> Levante, alongue, beba agua</li>
            <li>🌴 <strong style={{ color: 'var(--chalk-white)' }}>Pausa 15min:</strong> A cada 4 pomodoros, descanse mais</li>
            <li>🎁 <strong style={{ color: 'var(--chalk-white)' }}>Bonus:</strong> Ganhe +50 FP a cada 4 pomodoros!</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="footer" style={{ marginTop: '3rem' }}>
        <button
          onClick={() => router.push('/enem')}
          className="btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Voltar ao Painel
        </button>
      </div>
    </div>
  );
}
