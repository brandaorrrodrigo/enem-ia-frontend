'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
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
      <div className="container-ia min-h-screen py-8">
        <FloatingNav />

        <div className="card-ia p-8 text-center max-w-lg mx-auto mt-16">
          <div className="text-8xl mb-6">✅</div>
          <h1 className="title-ia-sm mb-4">Quiz Diario Completo!</h1>
          <p className="text-white/70 mb-6">
            Voce ja completou o quiz de hoje. Volte amanha para manter sua streak!
          </p>

          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <p className="text-white/60 text-sm">Sua streak atual</p>
            <p className="text-4xl font-bold text-orange-400">{streakAtual}🔥</p>
          </div>

          <button
            onClick={() => router.push('/enem/simulado')}
            className="btn-ia w-full py-3"
          >
            📝 Fazer um Simulado
          </button>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // Tela inicial
  if (!quizIniciado) {
    return (
      <div className="container-ia min-h-screen py-8">
        <FloatingNav />

        <div className="card-ia p-8 text-center max-w-lg mx-auto mt-16">
          <div className="text-8xl mb-6">🎯</div>
          <h1 className="title-ia-sm mb-4">Quiz Diario</h1>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 mb-6 border border-yellow-400/30">
            <p className="text-yellow-300 font-bold italic">
              "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
            </p>
          </div>

          <p className="text-white/70 mb-6">
            Responda 5 questoes rapidas e ganhe FP! Complete o quiz diariamente para manter sua streak.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-white">5</p>
              <p className="text-white/60 text-xs">Questoes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-white">5min</p>
              <p className="text-white/60 text-xs">Tempo</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-yellow-300">+75</p>
              <p className="text-white/60 text-xs">FP Max</p>
            </div>
          </div>

          {streakAtual > 0 && (
            <div className="bg-orange-500/20 rounded-xl p-4 mb-6 border border-orange-400/30">
              <p className="text-orange-300 font-bold">🔥 Streak: {streakAtual} dias</p>
              <p className="text-white/60 text-sm">Nao perca! Acerte 3+ para manter.</p>
            </div>
          )}

          <button onClick={iniciarQuiz} className="btn-ia w-full py-4 text-lg">
            🚀 Comecar Quiz
          </button>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // Tela de resultado
  if (mostrarResultado) {
    const resultado = calcularResultado();
    const perfeito = resultado.acertos === resultado.total;

    return (
      <div className="container-ia min-h-screen py-8">
        <div className="card-ia p-8 text-center max-w-lg mx-auto">
          <div className="text-8xl mb-6">{perfeito ? '🏆' : resultado.acertos >= 3 ? '🎉' : '📚'}</div>

          <h1 className="title-ia-sm mb-2">
            {perfeito ? 'PERFEITO!' : resultado.acertos >= 3 ? 'Muito Bem!' : 'Continue Estudando!'}
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-3xl font-bold text-white">{resultado.acertos}/{resultado.total}</p>
              <p className="text-white/60 text-sm">Acertos</p>
            </div>
            <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-400/30">
              <p className="text-3xl font-bold text-yellow-300">+{resultado.fpGanho}</p>
              <p className="text-white/60 text-sm">FP Ganhos</p>
            </div>
          </div>

          {resultado.acertos >= 3 && (
            <div className="bg-orange-500/20 rounded-xl p-4 mb-6 border border-orange-400/30">
              <p className="text-orange-300 font-bold">🔥 Streak mantida!</p>
              <p className="text-white/60 text-sm">Agora voce tem {streakAtual} dias seguidos!</p>
            </div>
          )}

          {perfeito && (
            <div className="bg-purple-500/20 rounded-xl p-4 mb-6 border border-purple-400/30">
              <p className="text-purple-300 font-bold">⭐ Bonus Perfeito: +25 FP</p>
            </div>
          )}

          {/* Revisao das questoes */}
          <div className="text-left mb-6">
            <p className="text-white font-bold mb-3">Revisao:</p>
            <div className="space-y-2">
              {questoesDiarias.map((q, idx) => (
                <div
                  key={q.id}
                  className={`p-3 rounded-lg ${
                    respostas[idx] === q.correta
                      ? 'bg-green-500/20 border border-green-400/30'
                      : 'bg-red-500/20 border border-red-400/30'
                  }`}
                >
                  <p className="text-white/80 text-sm">{idx + 1}. {q.disciplina}</p>
                  <p className="text-white/60 text-xs">
                    {respostas[idx] === q.correta ? '✓ Correta' : `✗ Resposta: ${q.alternativas[q.correta]}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/enem/feed')}
              className="btn-ia w-full py-3"
            >
              📱 Ver Feed Social
            </button>
            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn-ia-secondary w-full py-3"
            >
              📝 Fazer Simulado Completo
            </button>
          </div>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // Tela do quiz
  const questao = questoesDiarias[questaoAtual];

  return (
    <div className="container-ia min-h-screen py-8">
      {/* Header com timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-white/60">Questao {questaoAtual + 1}/{questoesDiarias.length}</span>
          <span className="badge-ia">{questao.disciplina}</span>
        </div>
        <div className={`text-xl font-bold ${tempoRestante < 60 ? 'text-red-400' : 'text-yellow-300'}`}>
          ⏱️ {formatarTempo(tempoRestante)}
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="progress-ia mb-6">
        <div
          className="progress-ia-bar transition-all"
          style={{ width: `${((questaoAtual + 1) / questoesDiarias.length) * 100}%` }}
        />
      </div>

      {/* Questao */}
      <div className="card-ia p-6 mb-6">
        <p className="text-white text-lg mb-6">{questao.enunciado}</p>

        <div className="space-y-3">
          {questao.alternativas.map((alt, idx) => (
            <button
              key={idx}
              onClick={() => selecionarResposta(idx)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                respostas[questaoAtual] === idx
                  ? 'bg-yellow-400/20 border-2 border-yellow-400'
                  : 'bg-white/5 border-2 border-white/10 hover:border-white/30'
              }`}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + idx)})</span>
              <span className="text-white">{alt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Botao de avancar */}
      <button
        onClick={proximaQuestao}
        disabled={respostas[questaoAtual] === null}
        className="btn-ia w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {questaoAtual < questoesDiarias.length - 1 ? 'Proxima Questao →' : '🏁 Finalizar Quiz'}
      </button>

      <ChalkBackToTop />
    </div>
  );
}
