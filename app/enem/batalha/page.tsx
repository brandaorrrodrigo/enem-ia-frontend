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
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <FloatingNav />

        {/* Slogan */}
        <div
          className="card"
          style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            marginTop: '4rem',
            background: 'linear-gradient(to right, rgba(255, 217, 102, 0.2), rgba(255, 145, 77, 0.2))',
            border: '2px solid rgba(255, 217, 102, 0.3)',
            textAlign: 'center'
          }}
        >
          <p style={{
            color: 'var(--accent-yellow)',
            fontWeight: 'bold',
            fontStyle: 'italic',
            margin: 0
          }}>
            "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
          </p>
        </div>

        <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⚔️</div>
            <div className="header">
              <h1>Modo Batalha</h1>
              <p>Desafie outros estudantes em tempo real!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-bar" style={{ marginBottom: '2rem' }}>
            <div className="stat-item" style={{
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <span className="stat-number" style={{ color: '#22c55e' }}>{meusStats.vitorias}</span>
              <span className="stat-label">Vitorias</span>
            </div>
            <div className="stat-item" style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <span className="stat-number" style={{ color: '#ef4444' }}>{meusStats.derrotas}</span>
              <span className="stat-label">Derrotas</span>
            </div>
            <div className="stat-item" style={{
              backgroundColor: 'rgba(255, 217, 102, 0.2)',
              border: '1px solid rgba(255, 217, 102, 0.3)'
            }}>
              <span className="stat-number" style={{ color: 'var(--accent-yellow)' }}>{meusStats.empates}</span>
              <span className="stat-label">Empates</span>
            </div>
          </div>

          {/* Botao de Batalha */}
          <button
            onClick={buscarOponente}
            className="btn btn-yellow"
            style={{
              width: '100%',
              padding: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)'
            }}
          >
            ⚔️ ENCONTRAR OPONENTE
          </button>

          {/* Regras */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 className="card-title">📋 Como Funciona</h3>
            <ul style={{
              color: 'var(--chalk-dim)',
              listStyle: 'none',
              padding: 0,
              margin: '1rem 0 0 0'
            }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>1.</span>
                <span>Voce sera pareado com um oponente de nivel similar</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>2.</span>
                <span>Ambos respondem 5 questoes simultaneamente</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>3.</span>
                <span>15 segundos por questao - seja rapido!</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-yellow)' }}>4.</span>
                <span>Quem acertar mais, vence e ganha FP!</span>
              </li>
            </ul>

            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(255, 217, 102, 0.2)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255, 217, 102, 0.3)'
            }}>
              <p style={{
                color: 'var(--accent-yellow)',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 0
              }}>
                🎁 Vitoria: +50 FP base + 10 FP por acerto
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <a
            onClick={() => router.push('/enem')}
            style={{
              color: 'var(--accent-yellow)',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Voltar ao Menu
          </a>
        </div>
      </div>
    );
  }

  // Buscando Oponente
  if (battleState === 'buscando') {
    return (
      <div className="container" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          {!oponente ? (
            <>
              <div style={{
                width: '64px',
                height: '64px',
                border: '4px solid rgba(255, 217, 102, 0.2)',
                borderTop: '4px solid var(--accent-yellow)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1.5rem'
              }} />
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--chalk-white)',
                marginBottom: '1rem'
              }}>
                Buscando oponente...
              </h2>
              <p style={{ color: 'var(--chalk-dim)' }}>Encontrando alguem do seu nivel</p>
            </>
          ) : (
            <>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>⚔️</div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--chalk-white)',
                marginBottom: '1rem'
              }}>
                Oponente Encontrado!
              </h2>
              <div className="card" style={{ padding: '1.5rem', maxWidth: '24rem', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(to bottom right, #ef4444, #f97316)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {oponente.nome.charAt(0)}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', fontSize: '1.125rem', margin: '0 0 0.25rem 0' }}>
                      {oponente.nome}
                    </p>
                    <p style={{ color: 'var(--accent-yellow)', margin: '0 0 0.25rem 0' }}>
                      {oponente.pontosFP.toLocaleString()} FP
                    </p>
                    <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', margin: 0 }}>
                      {oponente.vitorias}V / {oponente.derrotas}D
                    </p>
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--chalk-dim)', marginTop: '1rem' }}>Preparando batalha...</p>
            </>
          )}
        </div>

        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Batalha
  if (battleState === 'batalha') {
    const questao = questoesBatalha[questaoAtual];
    const minhaResposta = minhasRespostas[questaoAtual];
    const oponenteResposta = oponenteRespostas[questaoAtual];

    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        {/* Header com VS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '0.875rem'
            }}>
              EU
            </div>
            <div>
              <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', margin: 0 }}>Voce</p>
              <p style={{ color: 'var(--accent-yellow)', fontSize: '0.875rem', margin: 0 }}>
                {minhasRespostas.filter((r, i) => r === questoesBatalha[i].correta).length} acertos
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--accent-yellow)' }}>VS</span>
            <p style={{ color: 'var(--chalk-dim)', fontSize: '0.75rem', margin: 0 }}>
              Questao {questaoAtual + 1}/5
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', margin: 0 }}>
                {oponente?.nome}
              </p>
              <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>
                {oponenteRespostas.filter((r, i) => r === questoesBatalha[i].correta).length} acertos
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, #ef4444, #f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {oponente?.nome.charAt(0)}
            </div>
          </div>
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>{questao.disciplina}</span>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: tempoQuestao <= 5 ? '#ef4444' : 'var(--accent-yellow)'
            }}>
              ⏱️ {tempoQuestao}s
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                height: '100%',
                backgroundColor: tempoQuestao <= 5 ? '#ef4444' : 'var(--accent-yellow)',
                transition: 'all 0.3s',
                width: `${(tempoQuestao / 15) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Status dos jogadores */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            backgroundColor: respondeu ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: respondeu ? '1px solid rgba(34, 197, 94, 0.3)' : 'none'
          }}>
            <p style={{ color: 'var(--chalk-dim)', fontSize: '0.75rem', margin: '0 0 0.25rem 0' }}>Voce</p>
            <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', margin: 0 }}>
              {respondeu ? '✓ Respondeu' : '⏳ Aguardando'}
            </p>
          </div>
          <div style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            backgroundColor: oponenteRespondeu ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            border: oponenteRespondeu ? '1px solid rgba(239, 68, 68, 0.3)' : 'none'
          }}>
            <p style={{ color: 'var(--chalk-dim)', fontSize: '0.75rem', margin: '0 0 0.25rem 0' }}>
              {oponente?.nome}
            </p>
            <p style={{ color: 'var(--chalk-white)', fontWeight: 'bold', margin: 0 }}>
              {oponenteRespondeu ? '✓ Respondeu' : '⏳ Aguardando'}
            </p>
          </div>
        </div>

        {/* Questao */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--chalk-white)', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            {questao.enunciado}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {questao.alternativas.map((alt, idx) => {
              let backgroundColor = 'rgba(255, 255, 255, 0.05)';
              let borderColor = 'rgba(255, 255, 255, 0.1)';
              let hoverBorderColor = 'rgba(255, 255, 255, 0.3)';

              if (respondeu && oponenteRespondeu) {
                if (idx === questao.correta) {
                  backgroundColor = 'rgba(34, 197, 94, 0.2)';
                  borderColor = '#22c55e';
                } else if (minhaResposta === idx || oponenteResposta === idx) {
                  backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  borderColor = '#ef4444';
                }
              } else if (minhaResposta === idx) {
                backgroundColor = 'rgba(255, 217, 102, 0.2)';
                borderColor = 'var(--accent-yellow)';
              }

              return (
                <button
                  key={idx}
                  onClick={() => responder(idx)}
                  disabled={respondeu}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'left',
                    backgroundColor,
                    border: `2px solid ${borderColor}`,
                    cursor: respondeu ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!respondeu) {
                      e.currentTarget.style.borderColor = hoverBorderColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!respondeu && minhaResposta !== idx) {
                      e.currentTarget.style.borderColor = borderColor;
                    }
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '0.75rem', color: 'var(--chalk-white)' }}>
                    {String.fromCharCode(65 + idx)})
                  </span>
                  <span style={{ color: 'var(--chalk-white)', flex: 1 }}>{alt}</span>
                  {respondeu && oponenteRespondeu && (
                    <span>
                      {minhaResposta === idx && '👤'}
                      {oponenteResposta === idx && '👊'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Resultado
  if (battleState === 'resultado') {
    const resultado = calcularResultado();

    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
          {/* Resultado Principal */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
              {resultado.resultado === 'vitoria' ? '🏆' : resultado.resultado === 'derrota' ? '😔' : '🤝'}
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: resultado.resultado === 'vitoria' ? '#22c55e' :
                     resultado.resultado === 'derrota' ? '#ef4444' : 'var(--accent-yellow)'
            }}>
              {resultado.resultado === 'vitoria' ? 'VITORIA!' :
               resultado.resultado === 'derrota' ? 'DERROTA' : 'EMPATE!'}
            </h1>

            {/* Placar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
                  {resultado.meusAcertos}
                </p>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', margin: 0 }}>Voce</p>
              </div>
              <div style={{ fontSize: '1.875rem', color: 'rgba(255, 255, 255, 0.3)' }}>VS</div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
                  {resultado.oponenteAcertos}
                </p>
                <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', margin: 0 }}>
                  {oponente?.nome}
                </p>
              </div>
            </div>

            {/* FP Ganho */}
            <div style={{
              backgroundColor: 'rgba(255, 217, 102, 0.2)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid rgba(255, 217, 102, 0.3)'
            }}>
              <p style={{ color: 'var(--accent-yellow)', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 0 0.25rem 0' }}>
                +{resultado.fpGanho} FP
              </p>
              <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem', margin: 0 }}>Pontos ganhos</p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 className="card-title">📊 Detalhes da Batalha</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--chalk-dim)' }}>Seus acertos</span>
                <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                  {resultado.meusAcertos}/5
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--chalk-dim)' }}>Acertos do oponente</span>
                <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                  {resultado.oponenteAcertos}/5
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--chalk-dim)' }}>Seu tempo total</span>
                <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                  {resultado.meuTempoTotal}s
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--chalk-dim)' }}>Tempo do oponente</span>
                <span style={{ color: 'var(--chalk-white)', fontWeight: 'bold' }}>
                  {resultado.oponenteTempoTotal}s
                </span>
              </div>
            </div>
          </div>

          {/* Botoes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setBattleState('menu');
                setOponente(null);
              }}
              className="btn btn-yellow"
              style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
            >
              ⚔️ Nova Batalha
            </button>
            <button
              onClick={() => router.push('/enem/feed')}
              className="btn"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              📱 Compartilhar no Feed
            </button>
            <button
              onClick={() => router.push('/enem')}
              className="btn"
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                border: '2px solid var(--accent-yellow)',
                color: 'var(--accent-yellow)'
              }}
            >
              🏠 Voltar ao Menu
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <a
            onClick={() => router.push('/enem')}
            style={{
              color: 'var(--accent-yellow)',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Voltar ao Menu
          </a>
        </div>
      </div>
    );
  }

  return null;
}
