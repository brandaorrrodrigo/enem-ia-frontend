'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Questao {
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  disciplina: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
}

type Disciplina = 'Matematica' | 'Linguagens' | 'Ciencias Humanas' | 'Ciencias da Natureza' | 'Aleatorio';

interface ConfiguracaoSimulado {
  tempo: number; // em minutos
  questoes: number;
  disciplina: Disciplina;
}

const OPCOES_TEMPO = [
  { tempo: 5, questoes: 10, label: 'Relampago', emoji: '⚡', descricao: '30s por questao', fpMultiplier: 2 },
  { tempo: 10, questoes: 10, label: 'Rapido', emoji: '🏃', descricao: '1min por questao', fpMultiplier: 1.5 },
  { tempo: 20, questoes: 10, label: 'Normal', emoji: '📝', descricao: '2min por questao', fpMultiplier: 1.2 },
  { tempo: 30, questoes: 10, label: 'Tranquilo', emoji: '🧘', descricao: '3min por questao', fpMultiplier: 1 },
];

const DISCIPLINAS: { id: Disciplina; label: string; emoji: string; cor: string }[] = [
  { id: 'Aleatorio', label: 'Aleatorio', emoji: '🎲', cor: 'from-purple-500 to-pink-500' },
  { id: 'Matematica', label: 'Matematica', emoji: '📐', cor: 'from-blue-500 to-cyan-500' },
  { id: 'Linguagens', label: 'Linguagens', emoji: '📚', cor: 'from-green-500 to-emerald-500' },
  { id: 'Ciencias Humanas', label: 'Humanas', emoji: '🌍', cor: 'from-orange-500 to-amber-500' },
  { id: 'Ciencias da Natureza', label: 'Natureza', emoji: '🔬', cor: 'from-teal-500 to-green-500' },
];

// Banco de questões expandido
const bancoQuestoes: Questao[] = [
  // Matemática
  { id: 'm1', enunciado: 'Qual é o valor de 2³ + 3²?', alternativas: ['11', '17', '13', '15'], correta: 1, disciplina: 'Matematica', dificuldade: 'facil' },
  { id: 'm2', enunciado: 'Se f(x) = 2x + 5, qual é o valor de f(3)?', alternativas: ['8', '11', '13', '6'], correta: 1, disciplina: 'Matematica', dificuldade: 'facil' },
  { id: 'm3', enunciado: 'Qual é a raiz quadrada de 144?', alternativas: ['11', '12', '13', '14'], correta: 1, disciplina: 'Matematica', dificuldade: 'facil' },
  { id: 'm4', enunciado: 'Em uma PA de razão 3 e primeiro termo 2, qual é o 5º termo?', alternativas: ['11', '14', '17', '20'], correta: 1, disciplina: 'Matematica', dificuldade: 'medio' },
  { id: 'm5', enunciado: 'Qual é o valor de log₁₀(1000)?', alternativas: ['2', '3', '4', '10'], correta: 1, disciplina: 'Matematica', dificuldade: 'medio' },
  { id: 'm6', enunciado: 'Se sen(x) = 0.5, qual pode ser o valor de x?', alternativas: ['30°', '45°', '60°', '90°'], correta: 0, disciplina: 'Matematica', dificuldade: 'medio' },
  { id: 'm7', enunciado: 'Qual é a área de um círculo de raio 5? (use π = 3.14)', alternativas: ['31.4', '78.5', '15.7', '157'], correta: 1, disciplina: 'Matematica', dificuldade: 'facil' },
  { id: 'm8', enunciado: 'Resolva: 3x - 7 = 14', alternativas: ['x = 5', 'x = 7', 'x = 3', 'x = 21'], correta: 1, disciplina: 'Matematica', dificuldade: 'facil' },
  { id: 'm9', enunciado: 'Qual é o MMC de 12 e 18?', alternativas: ['6', '36', '72', '216'], correta: 1, disciplina: 'Matematica', dificuldade: 'facil' },
  { id: 'm10', enunciado: 'Uma função quadrática tem raízes 2 e 5. Qual é a soma das raízes?', alternativas: ['3', '7', '10', '-7'], correta: 1, disciplina: 'Matematica', dificuldade: 'medio' },

  // Linguagens
  { id: 'l1', enunciado: 'Quem escreveu "Dom Casmurro"?', alternativas: ['José de Alencar', 'Machado de Assis', 'Jorge Amado', 'Graciliano Ramos'], correta: 1, disciplina: 'Linguagens', dificuldade: 'facil' },
  { id: 'l2', enunciado: 'Qual figura de linguagem está presente em "O sol sorria para nós"?', alternativas: ['Metáfora', 'Personificação', 'Hipérbole', 'Metonímia'], correta: 1, disciplina: 'Linguagens', dificuldade: 'medio' },
  { id: 'l3', enunciado: '"A vida é uma viagem" é um exemplo de:', alternativas: ['Comparação', 'Metáfora', 'Hipérbole', 'Ironia'], correta: 1, disciplina: 'Linguagens', dificuldade: 'facil' },
  { id: 'l4', enunciado: 'O Modernismo brasileiro teve início em que ano?', alternativas: ['1912', '1922', '1932', '1942'], correta: 1, disciplina: 'Linguagens', dificuldade: 'medio' },
  { id: 'l5', enunciado: 'Qual é o plural de "cidadão"?', alternativas: ['cidadãos', 'cidadões', 'cidadães', 'cidadãis'], correta: 0, disciplina: 'Linguagens', dificuldade: 'facil' },
  { id: 'l6', enunciado: '"Vossa Excelência" é usado para se dirigir a:', alternativas: ['Papa', 'Juiz', 'Professor', 'Médico'], correta: 1, disciplina: 'Linguagens', dificuldade: 'medio' },
  { id: 'l7', enunciado: 'O que é um substantivo coletivo?', alternativas: ['Nome próprio', 'Palavra que indica grupo', 'Adjetivo', 'Verbo'], correta: 1, disciplina: 'Linguagens', dificuldade: 'facil' },
  { id: 'l8', enunciado: 'Quem foi o principal autor do Romantismo brasileiro?', alternativas: ['Machado de Assis', 'José de Alencar', 'Castro Alves', 'Olavo Bilac'], correta: 1, disciplina: 'Linguagens', dificuldade: 'medio' },
  { id: 'l9', enunciado: '"Grande Sertão: Veredas" foi escrito por:', alternativas: ['Graciliano Ramos', 'João Guimarães Rosa', 'Jorge Amado', 'Érico Veríssimo'], correta: 1, disciplina: 'Linguagens', dificuldade: 'medio' },
  { id: 'l10', enunciado: 'Qual é a função sintática do sujeito?', alternativas: ['Recebe a ação', 'Pratica a ação', 'Modifica o verbo', 'Completa o sentido'], correta: 1, disciplina: 'Linguagens', dificuldade: 'facil' },

  // Ciências Humanas
  { id: 'h1', enunciado: 'Em que ano foi proclamada a República no Brasil?', alternativas: ['1822', '1889', '1891', '1888'], correta: 1, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h2', enunciado: 'Quem foi o primeiro presidente do Brasil?', alternativas: ['Getúlio Vargas', 'Deodoro da Fonseca', 'Floriano Peixoto', 'Prudente de Morais'], correta: 1, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h3', enunciado: 'A Revolução Francesa ocorreu em que ano?', alternativas: ['1776', '1789', '1799', '1815'], correta: 1, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h4', enunciado: 'Qual era o lema da Revolução Francesa?', alternativas: ['Paz e Amor', 'Liberdade, Igualdade, Fraternidade', 'Ordem e Progresso', 'Pátria e Família'], correta: 1, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h5', enunciado: 'A Segunda Guerra Mundial terminou em que ano?', alternativas: ['1943', '1944', '1945', '1946'], correta: 2, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h6', enunciado: 'O que foi a Guerra Fria?', alternativas: ['Guerra no Ártico', 'Conflito EUA x URSS', 'Guerra no inverno', 'Conflito na Antártida'], correta: 1, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h7', enunciado: 'Qual filósofo disse "Penso, logo existo"?', alternativas: ['Platão', 'Aristóteles', 'Descartes', 'Kant'], correta: 2, disciplina: 'Ciencias Humanas', dificuldade: 'medio' },
  { id: 'h8', enunciado: 'O Iluminismo surgiu em qual século?', alternativas: ['XVI', 'XVII', 'XVIII', 'XIX'], correta: 2, disciplina: 'Ciencias Humanas', dificuldade: 'medio' },
  { id: 'h9', enunciado: 'Qual foi a capital do Brasil antes de Brasília?', alternativas: ['São Paulo', 'Salvador', 'Rio de Janeiro', 'Recife'], correta: 2, disciplina: 'Ciencias Humanas', dificuldade: 'facil' },
  { id: 'h10', enunciado: 'O Muro de Berlim caiu em que ano?', alternativas: ['1985', '1987', '1989', '1991'], correta: 2, disciplina: 'Ciencias Humanas', dificuldade: 'medio' },

  // Ciências da Natureza
  { id: 'n1', enunciado: 'Qual é a fórmula da água?', alternativas: ['H2O', 'CO2', 'NaCl', 'O2'], correta: 0, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n2', enunciado: 'Qual é o maior planeta do Sistema Solar?', alternativas: ['Saturno', 'Júpiter', 'Netuno', 'Urano'], correta: 1, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n3', enunciado: 'Qual é a unidade de medida de força no SI?', alternativas: ['Joule', 'Watt', 'Newton', 'Pascal'], correta: 2, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n4', enunciado: 'O que é a fotossíntese?', alternativas: ['Respiração', 'Produção de alimento pelas plantas', 'Divisão celular', 'Reprodução'], correta: 1, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n5', enunciado: 'Qual é o gás mais abundante na atmosfera?', alternativas: ['Oxigênio', 'Nitrogênio', 'CO2', 'Argônio'], correta: 1, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n6', enunciado: 'Qual é a velocidade da luz aproximadamente?', alternativas: ['300.000 km/s', '150.000 km/s', '1.000.000 km/s', '30.000 km/s'], correta: 0, disciplina: 'Ciencias da Natureza', dificuldade: 'medio' },
  { id: 'n7', enunciado: 'O DNA é composto por quantas fitas?', alternativas: ['1', '2', '3', '4'], correta: 1, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n8', enunciado: 'Qual é o símbolo químico do ouro?', alternativas: ['Ag', 'Au', 'Fe', 'Cu'], correta: 1, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
  { id: 'n9', enunciado: 'O que são mitocôndrias?', alternativas: ['Núcleo da célula', 'Organelas de energia', 'Membrana celular', 'Cromossomos'], correta: 1, disciplina: 'Ciencias da Natureza', dificuldade: 'medio' },
  { id: 'n10', enunciado: 'Qual é a fórmula da velocidade média?', alternativas: ['v = d/t', 'v = d×t', 'v = t/d', 'v = d+t'], correta: 0, disciplina: 'Ciencias da Natureza', dificuldade: 'facil' },
];

type EstadoSimulado = 'config' | 'jogando' | 'resultado';

export default function SimuladoRelogioPage() {
  const router = useRouter();
  const [estado, setEstado] = useState<EstadoSimulado>('config');
  const [config, setConfig] = useState<ConfiguracaoSimulado>({ tempo: 10, questoes: 10, disciplina: 'Aleatorio' });
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<(number | null)[]>([]);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [tempoInicial, setTempoInicial] = useState(0);
  const [questoesRespondidas, setQuestoesRespondidas] = useState(0);
  const [fpMultiplier, setFpMultiplier] = useState(1);

  // Timer
  useEffect(() => {
    if (estado === 'jogando' && tempoRestante > 0) {
      const timer = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            finalizarSimulado();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [estado, tempoRestante]);

  const selecionarQuestoes = useCallback((disciplina: Disciplina, quantidade: number) => {
    let questoesFiltradas = bancoQuestoes;

    if (disciplina !== 'Aleatorio') {
      questoesFiltradas = bancoQuestoes.filter(q => q.disciplina === disciplina);
    }

    // Embaralhar e selecionar
    const embaralhadas = [...questoesFiltradas].sort(() => Math.random() - 0.5);
    return embaralhadas.slice(0, Math.min(quantidade, embaralhadas.length));
  }, []);

  const iniciarSimulado = () => {
    const questoesSelecionadas = selecionarQuestoes(config.disciplina, config.questoes);
    setQuestoes(questoesSelecionadas);
    setRespostas(new Array(questoesSelecionadas.length).fill(null));
    setTempoRestante(config.tempo * 60);
    setTempoInicial(config.tempo * 60);
    setQuestaoAtual(0);
    setQuestoesRespondidas(0);

    const opcaoTempo = OPCOES_TEMPO.find(o => o.tempo === config.tempo);
    setFpMultiplier(opcaoTempo?.fpMultiplier || 1);

    setEstado('jogando');
  };

  const responder = (alternativa: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = alternativa;
    setRespostas(novasRespostas);
    setQuestoesRespondidas(prev => prev + 1);

    // Próxima questão automaticamente
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
    } else {
      finalizarSimulado();
    }
  };

  const pularQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
    }
  };

  const finalizarSimulado = () => {
    setEstado('resultado');

    // Calcular e salvar FP
    const acertos = respostas.filter((r, i) => r === questoes[i]?.correta).length;
    const fpBase = acertos * 10;
    const fpTotal = Math.round(fpBase * fpMultiplier);

    // Bonus por tempo restante
    const tempoUsado = tempoInicial - tempoRestante;
    const bonusTempo = tempoRestante > 0 ? Math.round((tempoRestante / tempoInicial) * 20) : 0;

    const fpFinal = fpTotal + bonusTempo;

    // Salvar no localStorage
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      user.pontosFP = (user.pontosFP || 0) + fpFinal;
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const calcularResultado = () => {
    const acertos = respostas.filter((r, i) => r === questoes[i]?.correta).length;
    const respondidas = respostas.filter(r => r !== null).length;
    const fpBase = acertos * 10;
    const fpComMultiplier = Math.round(fpBase * fpMultiplier);
    const bonusTempo = tempoRestante > 0 ? Math.round((tempoRestante / tempoInicial) * 20) : 0;
    const fpTotal = fpComMultiplier + bonusTempo;
    const porcentagem = respondidas > 0 ? Math.round((acertos / respondidas) * 100) : 0;

    return { acertos, respondidas, total: questoes.length, fpTotal, porcentagem, bonusTempo };
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  };

  // Componente da Ampulheta
  const Ampulheta = ({ progresso }: { progresso: number }) => {
    const altura = Math.max(0, Math.min(100, progresso));

    return (
      <div className="relative w-24 h-32 mx-auto">
      <FloatingBackButton />
        {/* Contorno da ampulheta */}
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Parte superior */}
          <path
            d="M10,10 L90,10 L90,20 L55,65 L55,75 L90,120 L90,130 L10,130 L10,120 L45,75 L45,65 L10,20 Z"
            fill="none"
            stroke="var(--accent-yellow)"
            strokeWidth="4"
          />

          {/* Areia no topo (diminui) */}
          <clipPath id="topClip">
            <path d="M15,15 L85,15 L85,20 L55,60 L45,60 L15,20 Z" />
          </clipPath>
          <rect
            x="15"
            y={15 + (45 * (100 - altura) / 100)}
            width="70"
            height={45 * altura / 100}
            fill="var(--accent-yellow)"
            clipPath="url(#topClip)"
            className="transition-all duration-1000"
          />

          {/* Areia caindo (linha central) */}
          {altura > 0 && altura < 100 && (
            <line
              x1="50"
              y1="60"
              x2="50"
              y2="80"
              stroke="var(--accent-yellow)"
              strokeWidth="3"
              className="animate-pulse"
            />
          )}

          {/* Areia no fundo (aumenta) */}
          <clipPath id="bottomClip">
            <path d="M15,125 L85,125 L85,120 L55,80 L45,80 L15,120 Z" />
          </clipPath>
          <rect
            x="15"
            y={125 - (45 * (100 - altura) / 100)}
            width="70"
            height={45 * (100 - altura) / 100}
            fill="var(--accent-yellow)"
            clipPath="url(#bottomClip)"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Tempo */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span
            className="text-2xl font-bold font-mono"
            style={{
              color: tempoRestante < 60 ? 'var(--error-red)' : 'var(--accent-yellow)',
              animation: tempoRestante < 60 ? 'pulse 1s infinite' : 'none'
            }}
          >
            {formatarTempo(tempoRestante)}
          </span>
        </div>
      </div>
    );
  };

  // TELA DE CONFIGURAÇÃO
  if (estado === 'config') {
    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <FloatingNav />

        {/* Header */}
        <div className="header" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '5rem', textAlign: 'center', marginBottom: '1rem' }}>⏳</div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--chalk-white)',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            Simulado Contra o Relogio
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--chalk-dim)',
            textAlign: 'center'
          }}>
            Responda o maximo de questoes antes do tempo acabar!
          </p>
        </div>

        {/* Slogan */}
        <div
          className="card"
          style={{
            maxWidth: '42rem',
            margin: '0 auto 2rem',
            padding: '1rem',
            background: 'linear-gradient(to right, rgba(251, 191, 36, 0.2), rgba(251, 146, 60, 0.2))',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            textAlign: 'center'
          }}
        >
          <p style={{
            color: 'var(--accent-yellow)',
            fontWeight: 'bold',
            fontStyle: 'italic'
          }}>
            "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
          </p>
        </div>

        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          {/* Seleção de Tempo */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 className="card-title">⏱️ Escolha o Tempo</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              {OPCOES_TEMPO.map((opcao) => (
                <button
                  key={opcao.tempo}
                  onClick={() => setConfig({ ...config, tempo: opcao.tempo, questoes: opcao.questoes })}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: config.tempo === opcao.tempo
                      ? 'var(--accent-yellow)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: config.tempo === opcao.tempo
                      ? 'var(--board-dark)'
                      : 'var(--chalk-white)',
                    transform: config.tempo === opcao.tempo ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (config.tempo !== opcao.tempo) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (config.tempo !== opcao.tempo) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{opcao.emoji}</div>
                  <div style={{ fontWeight: 'bold' }}>{opcao.label}</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    {opcao.tempo} min / {opcao.questoes} questoes
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.6 }}>
                    {opcao.descricao}
                  </div>
                  {opcao.fpMultiplier > 1 && (
                    <div style={{
                      fontSize: '0.75rem',
                      marginTop: '0.5rem',
                      fontWeight: 'bold',
                      color: config.tempo === opcao.tempo
                        ? 'var(--board-dark)'
                        : 'var(--accent-yellow)'
                    }}>
                      {opcao.fpMultiplier}x FP!
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Seleção de Disciplina */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 className="card-title">📚 Escolha a Materia</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.75rem'
            }}>
              {DISCIPLINAS.map((disc) => (
                <button
                  key={disc.id}
                  onClick={() => setConfig({ ...config, disciplina: disc.id })}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: config.disciplina === disc.id
                      ? `linear-gradient(to bottom right, ${disc.cor.includes('purple') ? '#a855f7' : disc.cor.includes('blue') ? '#3b82f6' : disc.cor.includes('green') && !disc.cor.includes('teal') ? '#10b981' : disc.cor.includes('orange') ? '#f97316' : '#14b8a6'}, ${disc.cor.includes('pink') ? '#ec4899' : disc.cor.includes('cyan') ? '#06b6d4' : disc.cor.includes('emerald') ? '#10b981' : disc.cor.includes('amber') ? '#f59e0b' : '#10b981'})`
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--chalk-white)',
                    transform: config.disciplina === disc.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (config.disciplina !== disc.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (config.disciplina !== disc.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{disc.emoji}</div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{disc.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Resumo e Iniciar */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))',
              border: '2px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <h2 className="card-title">📋 Resumo</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--chalk-white)'
                }}>
                  {config.tempo}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)'
                }}>
                  minutos
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--chalk-white)'
                }}>
                  {config.questoes}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)'
                }}>
                  questoes
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-yellow)'
                }}>
                  {OPCOES_TEMPO.find(o => o.tempo === config.tempo)?.fpMultiplier || 1}x
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--chalk-dim)'
                }}>
                  multiplicador FP
                </p>
              </div>
            </div>

            <button
              onClick={iniciarSimulado}
              className="btn btn-yellow"
              style={{
                width: '100%',
                padding: '1.25rem',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)'
              }}
            >
              ⏳ INICIAR SIMULADO
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <button
            onClick={() => router.push('/enem')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--chalk-dim)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            ← Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  // TELA DO SIMULADO
  if (estado === 'jogando') {
    const questao = questoes[questaoAtual];
    const progressoTempo = (tempoRestante / tempoInicial) * 100;

    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        {/* Header com ampulheta */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          maxWidth: '64rem',
          margin: '0 auto 1.5rem'
        }}>
          <div>
            <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
              Questao {questaoAtual + 1} de {questoes.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span className="badge">{questao?.disciplina}</span>
              <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                Respondidas: {questoesRespondidas}
              </span>
            </div>
          </div>

          <Ampulheta progresso={progressoTempo} />
        </div>

        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          {/* Barra de progresso das questões */}
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
            {questoes.map((_, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: '0.5rem',
                  borderRadius: '9999px',
                  transition: 'all 0.2s',
                  background: respostas[idx] !== null
                    ? respostas[idx] === questoes[idx].correta
                      ? 'var(--success-green)'
                      : 'var(--error-red)'
                    : idx === questaoAtual
                    ? 'var(--accent-yellow)'
                    : 'rgba(255, 255, 255, 0.2)'
                }}
              />
            ))}
          </div>

          {/* Questão */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{
              color: 'var(--chalk-white)',
              fontSize: '1.125rem',
              marginBottom: '1.5rem',
              lineHeight: '1.75'
            }}>
              {questao?.enunciado}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {questao?.alternativas.map((alt, idx) => (
                <button
                  key={idx}
                  onClick={() => responder(idx)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    color: 'var(--chalk-white)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-yellow)';
                    e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <span style={{
                    fontWeight: 'bold',
                    marginRight: '0.75rem',
                    color: 'var(--accent-yellow)'
                  }}>
                    {String.fromCharCode(65 + idx)})
                  </span>
                  <span>{alt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Controles */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={pularQuestao}
              disabled={questaoAtual >= questoes.length - 1}
              className="btn"
              style={{
                flex: 1,
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                opacity: questaoAtual >= questoes.length - 1 ? 0.5 : 1,
                cursor: questaoAtual >= questoes.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ⏭️ Pular
            </button>
            <button
              onClick={finalizarSimulado}
              className="btn"
              style={{
                flex: 1,
                padding: '1rem',
                background: '#ef4444'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ef4444';
              }}
            >
              🏁 Finalizar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TELA DE RESULTADO
  if (estado === 'resultado') {
    const resultado = calcularResultado();

    return (
      <div className="container" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
              {resultado.porcentagem >= 80 ? '🏆' : resultado.porcentagem >= 60 ? '🎉' : resultado.porcentagem >= 40 ? '📚' : '💪'}
            </div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              marginBottom: '0.5rem'
            }}>
              {resultado.porcentagem >= 80 ? 'Excelente!' : resultado.porcentagem >= 60 ? 'Muito Bem!' : resultado.porcentagem >= 40 ? 'Bom Trabalho!' : 'Continue Praticando!'}
            </h1>

            {/* Stats */}
            <div className="stats-bar" style={{ marginBottom: '1.5rem' }}>
              <div className="stat-item">
                <div className="stat-number">{resultado.acertos}/{resultado.respondidas}</div>
                <div className="stat-label">Acertos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{resultado.porcentagem}%</div>
                <div className="stat-label">Aproveitamento</div>
              </div>
            </div>

            {/* FP Ganhos */}
            <div style={{
              background: 'rgba(251, 191, 36, 0.2)',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                color: 'var(--accent-yellow)',
                fontWeight: 'bold',
                fontSize: '2rem'
              }}>
                +{resultado.fpTotal} FP
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--chalk-dim)'
              }}>
                Base: {resultado.acertos * 10} × {fpMultiplier} + Bonus tempo: {resultado.bonusTempo}
              </p>
            </div>

            {/* Detalhes */}
            <div style={{
              textAlign: 'left',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--chalk-dim)',
                marginBottom: '0.5rem'
              }}>
                Detalhes:
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                fontSize: '0.875rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--chalk-dim)' }}>Questoes respondidas</span>
                  <span style={{ color: 'var(--chalk-white)' }}>
                    {resultado.respondidas} de {resultado.total}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--chalk-dim)' }}>Tempo restante</span>
                  <span style={{ color: 'var(--chalk-white)' }}>{formatarTempo(tempoRestante)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--chalk-dim)' }}>Multiplicador</span>
                  <span style={{ color: 'var(--accent-yellow)' }}>{fpMultiplier}x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revisão das questões */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 className="card-title">📝 Revisao</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: '16rem',
              overflowY: 'auto'
            }}>
              {questoes.map((q, idx) => {
                const respondida = respostas[idx] !== null;
                const acertou = respostas[idx] === q.correta;

                return (
                  <div
                    key={q.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      background: !respondida
                        ? 'rgba(255, 255, 255, 0.05)'
                        : acertou
                        ? 'rgba(16, 185, 129, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                      border: !respondida
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : acertou
                        ? '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)'
                    }}
                  >
      <FloatingBackButton />
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                          {idx + 1}.
                        </span>
                        <span className="badge" style={{ fontSize: '0.75rem' }}>
                          {q.disciplina}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.875rem', color: 'var(--chalk-white)' }}>
                        {!respondida ? '⏭️ Pulada' : acertou ? '✅ Correta' : '❌ Errada'}
                      </span>
                    </div>
                    {!acertou && respondida && (
                      <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--chalk-dim)',
                        marginTop: '0.25rem'
                      }}>
                        Resposta: {q.alternativas[q.correta]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                setEstado('config');
                setQuestoes([]);
                setRespostas([]);
              }}
              className="btn btn-yellow"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem'
              }}
            >
              ⏳ Jogar Novamente
            </button>
            <button
              onClick={() => router.push('/enem')}
              className="btn"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              🏠 Voltar ao Menu
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <button
            onClick={() => router.push('/enem')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--chalk-dim)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            ← Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  return null;
}
