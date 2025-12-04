'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
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
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      {/* Audio para notificacao */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2022/03/24/audio_805cb8c25d.mp3" />

      {/* Celebracao */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="card-ia p-8 text-center animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="title-ia-sm text-yellow-300 mb-2">Pomodoro Completo!</h2>
            <p className="text-3xl font-bold text-white">+{fpGanhoAgora} FP</p>
          </div>
        </div>
      )}

      {/* Slogan */}
      <div className="card-ia p-4 mb-6 mt-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 text-center">
        <p className="text-yellow-300 font-bold italic">
          "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Titulo */}
        <div className="text-center mb-6">
          <h1 className="title-ia mb-2">🍅 Pomodoro</h1>
          <p className="subtitle-ia mb-0">Foque nos estudos e ganhe FP!</p>
        </div>

        {/* Stats do dia */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="stat-ia">
            <span className="stat-ia-value">{pomodorosHoje}</span>
            <span className="stat-ia-label">Pomodoros Hoje</span>
          </div>
          <div className="stat-ia">
            <span className="stat-ia-value text-yellow-300">+{fpGanhoHoje}</span>
            <span className="stat-ia-label">FP Ganhos</span>
          </div>
        </div>

        {/* Seletor de Disciplina */}
        <div className="card-ia p-4 mb-6">
          <label className="text-white/70 text-sm mb-2 block">Estudando:</label>
          <select
            value={disciplinaAtual}
            onChange={(e) => setDisciplinaAtual(e.target.value)}
            disabled={isRunning}
            className="input-ia w-full"
          >
            {disciplinas.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Timer Principal */}
        <div className="card-ia p-8 mb-6">
          {/* Seletor de Modo */}
          <div className="flex gap-2 mb-6 justify-center">
            {(Object.keys(TIMER_CONFIGS) as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => mudarModo(m)}
                disabled={isRunning}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  modo === m
                    ? 'bg-yellow-400 text-slate-900'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 disabled:opacity-50'
                }`}
              >
                {TIMER_CONFIGS[m].emoji} {TIMER_CONFIGS[m].label}
              </button>
            ))}
          </div>

          {/* Display do Timer */}
          <div className="relative mb-6">
            {/* Circulo de Progresso */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
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
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl mb-2">{TIMER_CONFIGS[modo].emoji}</span>
                <span className="text-5xl font-bold text-white font-mono">
                  {formatarTempo(tempoRestante)}
                </span>
                <span className="text-white/60 mt-2">{TIMER_CONFIGS[modo].label}</span>
              </div>
            </div>
          </div>

          {/* Recompensa */}
          {modo === 'foco' && (
            <div className="text-center mb-6 bg-yellow-500/20 rounded-xl p-3 border border-yellow-400/30">
              <p className="text-yellow-300 font-bold">
                🎁 Recompensa: +{TIMER_CONFIGS.foco.fpReward} FP
                {pomodorosHoje % 4 === 3 && ' (+50 FP bonus!)'}
              </p>
            </div>
          )}

          {/* Controles */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={toggleTimer}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-400 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-slate-900'
              }`}
            >
              {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-4 rounded-xl font-bold text-lg bg-white/10 text-white/70 hover:bg-white/20 transition"
            >
              🔄 Resetar
            </button>
          </div>
        </div>

        {/* Historico de Sessoes */}
        <div className="card-ia p-6 mb-6">
          <h2 className="title-ia-sm mb-4">📊 Sessoes de Hoje</h2>

          {sessoes.length > 0 ? (
            <div className="space-y-2">
              {sessoes.slice().reverse().slice(0, 8).map((sessao, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    sessao.modo === 'foco'
                      ? 'bg-yellow-500/20 border border-yellow-400/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{TIMER_CONFIGS[sessao.modo].emoji}</span>
                    <div>
                      <p className="text-white font-semibold">{TIMER_CONFIGS[sessao.modo].label}</p>
                      <p className="text-white/60 text-xs">
                        {new Date(sessao.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  {sessao.modo === 'foco' && (
                    <span className="text-yellow-300 font-bold">+{TIMER_CONFIGS.foco.fpReward} FP</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🍅</span>
              <p className="text-white/70">Nenhuma sessao ainda hoje</p>
              <p className="text-white/50 text-sm">Inicie seu primeiro Pomodoro!</p>
            </div>
          )}
        </div>

        {/* Dicas */}
        <div className="card-ia p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30">
          <h3 className="text-white font-bold mb-3">💡 Tecnica Pomodoro</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>🎯 <strong className="text-white">Foco 25min:</strong> Concentre-se apenas nos estudos</li>
            <li>☕ <strong className="text-white">Pausa 5min:</strong> Levante, alongue, beba agua</li>
            <li>🌴 <strong className="text-white">Pausa 15min:</strong> A cada 4 pomodoros, descanse mais</li>
            <li>🎁 <strong className="text-white">Bonus:</strong> Ganhe +50 FP a cada 4 pomodoros!</li>
          </ul>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
