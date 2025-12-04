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
}

interface Oponente {
  id: string;
  nome: string;
  pontosFP: number;
  liga: string;
  vitorias: number;
  derrotas: number;
}

type BattleState = 'menu' | 'buscando' | 'batalha' | 'resultado';

const mockOponentes: Oponente[] = [
  { id: '1', nome: 'Ana Silva', pontosFP: 3200, liga: 'Ouro', vitorias: 45, derrotas: 23 },
  { id: '2', nome: 'Pedro Costa', pontosFP: 2800, liga: 'Ouro', vitorias: 38, derrotas: 31 },
  { id: '3', nome: 'Maria Santos', pontosFP: 4100, liga: 'Platina', vitorias: 67, derrotas: 19 },
  { id: '4', nome: 'Lucas Lima', pontosFP: 2500, liga: 'Prata', vitorias: 28, derrotas: 35 },
];

const questoesBatalha: Questao[] = [
  {
    id: '1',
    enunciado: 'Se f(x) = 2x + 3, qual e o valor de f(5)?',
    alternativas: ['10', '13', '15', '8'],
    correta: 1,
    disciplina: 'Matematica',
  },
  {
    id: '2',
    enunciado: 'Qual e o principal gas responsavel pelo efeito estufa?',
    alternativas: ['Oxigenio', 'Nitrogenio', 'Dioxido de Carbono', 'Hidrogenio'],
    correta: 2,
    disciplina: 'Ciencias da Natureza',
  },
  {
    id: '3',
    enunciado: 'Quem foi o primeiro presidente do Brasil?',
    alternativas: ['Getulio Vargas', 'Deodoro da Fonseca', 'Floriano Peixoto', 'Prudente de Morais'],
    correta: 1,
    disciplina: 'Historia',
  },
  {
    id: '4',
    enunciado: 'Qual figura de linguagem consiste em atribuir caracteristicas humanas a seres nao humanos?',
    alternativas: ['Metafora', 'Personificacao', 'Hiperbole', 'Ironia'],
    correta: 1,
    disciplina: 'Linguagens',
  },
  {
    id: '5',
    enunciado: 'Qual e a formula da velocidade media?',
    alternativas: ['v = d/t', 'v = d.t', 'v = t/d', 'v = d + t'],
    correta: 0,
    disciplina: 'Fisica',
  },
];

export default function BatalhaPage() {
  const router = useRouter();
  const [battleState, setBattleState] = useState<BattleState>('menu');
  const [oponente, setOponente] = useState<Oponente | null>(null);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [minhasRespostas, setMinhasRespostas] = useState<(number | null)[]>([]);
  const [oponenteRespostas, setOponenteRespostas] = useState<(number | null)[]>([]);
  const [meuTempo, setMeuTempo] = useState<number[]>([]);
  const [oponenteTempo, setOponenteTempo] = useState<number[]>([]);
  const [tempoQuestao, setTempoQuestao] = useState(15);
  const [respondeu, setRespondeu] = useState(false);
  const [oponenteRespondeu, setOponenteRespondeu] = useState(false);
  const [meusStats, setMeusStats] = useState({ vitorias: 0, derrotas: 0, empates: 0 });

  useEffect(() => {
    // Carregar stats
    const statsLocal = localStorage.getItem('batalha_stats');
    if (statsLocal) {
      setMeusStats(JSON.parse(statsLocal));
    }
  }, []);

  useEffect(() => {
    if (battleState === 'batalha' && !respondeu && tempoQuestao > 0) {
      const timer = setInterval(() => {
        setTempoQuestao((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (tempoQuestao === 0 && !respondeu) {
      // Tempo esgotado, resposta nula
      responder(-1);
    }
  }, [battleState, tempoQuestao, respondeu]);

  useEffect(() => {
    // Simular resposta do oponente
    if (battleState === 'batalha' && !oponenteRespondeu) {
      const tempoResposta = Math.random() * 8 + 3; // 3-11 segundos
      const timer = setTimeout(() => {
        const acertou = Math.random() > 0.4; // 60% de chance de acertar
        const resposta = acertou ? questoesBatalha[questaoAtual].correta : (questoesBatalha[questaoAtual].correta + 1) % 4;
        setOponenteRespostas((prev) => [...prev, resposta]);
        setOponenteTempo((prev) => [...prev, Math.round(tempoResposta)]);
        setOponenteRespondeu(true);
      }, tempoResposta * 1000);
      return () => clearTimeout(timer);
    }
  }, [battleState, questaoAtual, oponenteRespondeu]);

  useEffect(() => {
    // Passar para proxima questao quando ambos responderem
    if (respondeu && oponenteRespondeu) {
      const timer = setTimeout(() => {
        if (questaoAtual < questoesBatalha.length - 1) {
          setQuestaoAtual((prev) => prev + 1);
          setRespondeu(false);
          setOponenteRespondeu(false);
          setTempoQuestao(15);
        } else {
          finalizarBatalha();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [respondeu, oponenteRespondeu, questaoAtual]);

  const buscarOponente = () => {
    setBattleState('buscando');
    // Simular busca
    setTimeout(() => {
      const oponenteAleatorio = mockOponentes[Math.floor(Math.random() * mockOponentes.length)];
      setOponente(oponenteAleatorio);
      setTimeout(() => {
        setBattleState('batalha');
        setQuestaoAtual(0);
        setMinhasRespostas([]);
        setOponenteRespostas([]);
        setMeuTempo([]);
        setOponenteTempo([]);
        setTempoQuestao(15);
        setRespondeu(false);
        setOponenteRespondeu(false);
      }, 2000);
    }, 3000);
  };

  const responder = (alternativa: number) => {
    if (respondeu) return;
    setMinhasRespostas((prev) => [...prev, alternativa]);
    setMeuTempo((prev) => [...prev, 15 - tempoQuestao]);
    setRespondeu(true);
  };

  const finalizarBatalha = () => {
    setBattleState('resultado');

    // Calcular resultado
    const meusAcertos = minhasRespostas.filter((r, i) => r === questoesBatalha[i].correta).length;
    const oponenteAcertos = oponenteRespostas.filter((r, i) => r === questoesBatalha[i].correta).length;

    let novoStats = { ...meusStats };
    let fpGanho = 0;

    if (meusAcertos > oponenteAcertos) {
      novoStats.vitorias++;
      fpGanho = 50 + meusAcertos * 10;
    } else if (meusAcertos < oponenteAcertos) {
      novoStats.derrotas++;
      fpGanho = meusAcertos * 5; // Menor recompensa por derrota
    } else {
      novoStats.empates++;
      fpGanho = 25 + meusAcertos * 7;
    }

    setMeusStats(novoStats);
    localStorage.setItem('batalha_stats', JSON.stringify(novoStats));

    // Adicionar FP
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      user.pontosFP = (user.pontosFP || 0) + fpGanho;
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const calcularResultado = () => {
    const meusAcertos = minhasRespostas.filter((r, i) => r === questoesBatalha[i].correta).length;
    const oponenteAcertos = oponenteRespostas.filter((r, i) => r === questoesBatalha[i].correta).length;
    const meuTempoTotal = meuTempo.reduce((a, b) => a + b, 0);
    const oponenteTempoTotal = oponenteTempo.reduce((a, b) => a + b, 0);

    let resultado: 'vitoria' | 'derrota' | 'empate';
    let fpGanho = 0;

    if (meusAcertos > oponenteAcertos) {
      resultado = 'vitoria';
      fpGanho = 50 + meusAcertos * 10;
    } else if (meusAcertos < oponenteAcertos) {
      resultado = 'derrota';
      fpGanho = meusAcertos * 5;
    } else {
      resultado = 'empate';
      fpGanho = 25 + meusAcertos * 7;
    }

    return { meusAcertos, oponenteAcertos, meuTempoTotal, oponenteTempoTotal, resultado, fpGanho };
  };

  // Menu Principal
  if (battleState === 'menu') {
    return (
      <div className="container-ia min-h-screen py-8">
        <FloatingNav />

        {/* Slogan */}
        <div className="card-ia p-4 mb-6 mt-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 text-center">
          <p className="text-yellow-300 font-bold italic">
            "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">⚔️</div>
            <h1 className="title-ia mb-2">Modo Batalha</h1>
            <p className="subtitle-ia mb-0">Desafie outros estudantes em tempo real!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="stat-ia bg-green-500/20 border border-green-400/30">
              <span className="stat-ia-value text-green-400">{meusStats.vitorias}</span>
              <span className="stat-ia-label">Vitorias</span>
            </div>
            <div className="stat-ia bg-red-500/20 border border-red-400/30">
              <span className="stat-ia-value text-red-400">{meusStats.derrotas}</span>
              <span className="stat-ia-label">Derrotas</span>
            </div>
            <div className="stat-ia bg-yellow-500/20 border border-yellow-400/30">
              <span className="stat-ia-value text-yellow-400">{meusStats.empates}</span>
              <span className="stat-ia-label">Empates</span>
            </div>
          </div>

          {/* Botao de Batalha */}
          <button
            onClick={buscarOponente}
            className="btn-ia w-full py-6 text-xl font-bold mb-6"
            style={{ boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)' }}
          >
            ⚔️ ENCONTRAR OPONENTE
          </button>

          {/* Regras */}
          <div className="card-ia p-6">
            <h3 className="text-white font-bold mb-4">📋 Como Funciona</h3>
            <ul className="text-white/70 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">1.</span>
                <span>Voce sera pareado com um oponente de nivel similar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">2.</span>
                <span>Ambos respondem 5 questoes simultaneamente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">3.</span>
                <span>15 segundos por questao - seja rapido!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">4.</span>
                <span>Quem acertar mais, vence e ganha FP!</span>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
              <p className="text-yellow-300 text-sm font-bold text-center">
                🎁 Vitoria: +50 FP base + 10 FP por acerto
              </p>
            </div>
          </div>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // Buscando Oponente
  if (battleState === 'buscando') {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          {!oponente ? (
            <>
              <div className="spinner-ia mx-auto mb-6"></div>
              <h2 className="title-ia-sm mb-4">Buscando oponente...</h2>
              <p className="text-white/60">Encontrando alguem do seu nivel</p>
            </>
          ) : (
            <>
              <div className="text-8xl mb-6">⚔️</div>
              <h2 className="title-ia-sm mb-4">Oponente Encontrado!</h2>
              <div className="card-ia p-6 max-w-sm mx-auto">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl font-bold text-white">
                    {oponente.nome.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg">{oponente.nome}</p>
                    <p className="text-yellow-300">{oponente.pontosFP.toLocaleString()} FP</p>
                    <p className="text-white/60 text-sm">
                      {oponente.vitorias}V / {oponente.derrotas}D
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-white/60 mt-4">Preparando batalha...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Batalha
  if (battleState === 'batalha') {
    const questao = questoesBatalha[questaoAtual];
    const minhaResposta = minhasRespostas[questaoAtual];
    const oponenteResposta = oponenteRespostas[questaoAtual];

    return (
      <div className="container-ia min-h-screen py-8">
        {/* Header com VS */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white">
              EU
            </div>
            <div>
              <p className="text-white font-bold">Voce</p>
              <p className="text-yellow-300 text-sm">
                {minhasRespostas.filter((r, i) => r === questoesBatalha[i].correta).length} acertos
              </p>
            </div>
          </div>

          <div className="text-center">
            <span className="text-3xl font-bold text-yellow-300">VS</span>
            <p className="text-white/60 text-xs">Questao {questaoAtual + 1}/5</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white font-bold">{oponente?.nome}</p>
              <p className="text-red-400 text-sm">
                {oponenteRespostas.filter((r, i) => r === questoesBatalha[i].correta).length} acertos
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-bold text-white">
              {oponente?.nome.charAt(0)}
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 text-sm">{questao.disciplina}</span>
            <span className={`text-xl font-bold ${tempoQuestao <= 5 ? 'text-red-400' : 'text-yellow-300'}`}>
              ⏱️ {tempoQuestao}s
            </span>
          </div>
          <div className="progress-ia">
            <div
              className={`progress-ia-bar transition-all ${tempoQuestao <= 5 ? 'bg-red-500' : ''}`}
              style={{ width: `${(tempoQuestao / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* Status dos jogadores */}
        <div className="flex gap-4 mb-6">
          <div className={`flex-1 p-3 rounded-xl text-center ${respondeu ? 'bg-green-500/20 border border-green-400/30' : 'bg-white/5'}`}>
            <p className="text-white/60 text-xs">Voce</p>
            <p className="text-white font-bold">{respondeu ? '✓ Respondeu' : '⏳ Aguardando'}</p>
          </div>
          <div className={`flex-1 p-3 rounded-xl text-center ${oponenteRespondeu ? 'bg-red-500/20 border border-red-400/30' : 'bg-white/5'}`}>
            <p className="text-white/60 text-xs">{oponente?.nome}</p>
            <p className="text-white font-bold">{oponenteRespondeu ? '✓ Respondeu' : '⏳ Aguardando'}</p>
          </div>
        </div>

        {/* Questao */}
        <div className="card-ia p-6 mb-6">
          <p className="text-white text-lg mb-6">{questao.enunciado}</p>

          <div className="space-y-3">
            {questao.alternativas.map((alt, idx) => {
              let btnClass = 'bg-white/5 border-2 border-white/10 hover:border-white/30';

              if (respondeu && oponenteRespondeu) {
                if (idx === questao.correta) {
                  btnClass = 'bg-green-500/20 border-2 border-green-400';
                } else if (minhaResposta === idx || oponenteResposta === idx) {
                  btnClass = 'bg-red-500/20 border-2 border-red-400';
                }
              } else if (minhaResposta === idx) {
                btnClass = 'bg-yellow-400/20 border-2 border-yellow-400';
              }

              return (
                <button
                  key={idx}
                  onClick={() => responder(idx)}
                  disabled={respondeu}
                  className={`w-full p-4 rounded-xl text-left transition-all ${btnClass} disabled:cursor-default`}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + idx)})</span>
                  <span className="text-white">{alt}</span>
                  {respondeu && oponenteRespondeu && (
                    <span className="float-right">
                      {minhaResposta === idx && '👤'}
                      {oponenteResposta === idx && '👊'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // Resultado
  if (battleState === 'resultado') {
    const resultado = calcularResultado();

    return (
      <div className="container-ia min-h-screen py-8">
        <div className="max-w-lg mx-auto">
          {/* Resultado Principal */}
          <div className="card-ia p-8 text-center mb-6">
            <div className="text-8xl mb-4">
              {resultado.resultado === 'vitoria' ? '🏆' : resultado.resultado === 'derrota' ? '😔' : '🤝'}
            </div>
            <h1 className={`title-ia-sm mb-2 ${
              resultado.resultado === 'vitoria' ? 'text-green-400' :
              resultado.resultado === 'derrota' ? 'text-red-400' : 'text-yellow-300'
            }`}>
              {resultado.resultado === 'vitoria' ? 'VITORIA!' :
               resultado.resultado === 'derrota' ? 'DERROTA' : 'EMPATE!'}
            </h1>

            {/* Placar */}
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">{resultado.meusAcertos}</p>
                <p className="text-white/60 text-sm">Voce</p>
              </div>
              <div className="text-3xl text-white/30">VS</div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-400">{resultado.oponenteAcertos}</p>
                <p className="text-white/60 text-sm">{oponente?.nome}</p>
              </div>
            </div>

            {/* FP Ganho */}
            <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-400/30">
              <p className="text-yellow-300 font-bold text-2xl">+{resultado.fpGanho} FP</p>
              <p className="text-white/60 text-sm">Pontos ganhos</p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="card-ia p-6 mb-6">
            <h3 className="text-white font-bold mb-4">📊 Detalhes da Batalha</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Seus acertos</span>
                <span className="text-white font-bold">{resultado.meusAcertos}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Acertos do oponente</span>
                <span className="text-white font-bold">{resultado.oponenteAcertos}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Seu tempo total</span>
                <span className="text-white font-bold">{resultado.meuTempoTotal}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Tempo do oponente</span>
                <span className="text-white font-bold">{resultado.oponenteTempoTotal}s</span>
              </div>
            </div>
          </div>

          {/* Botoes */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setBattleState('menu');
                setOponente(null);
              }}
              className="btn-ia w-full py-4 text-lg"
            >
              ⚔️ Nova Batalha
            </button>
            <button
              onClick={() => router.push('/enem/feed')}
              className="btn-ia-secondary w-full py-4"
            >
              📱 Compartilhar no Feed
            </button>
            <button
              onClick={() => router.push('/enem')}
              className="btn-ia-outline w-full py-4"
            >
              🏠 Voltar ao Menu
            </button>
          </div>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  return null;
}
