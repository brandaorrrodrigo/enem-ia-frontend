'use client';

import { useState, useEffect, useCallback } from 'react';
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
        {/* Contorno da ampulheta */}
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Parte superior */}
          <path
            d="M10,10 L90,10 L90,20 L55,65 L55,75 L90,120 L90,130 L10,130 L10,120 L45,75 L45,65 L10,20 Z"
            fill="none"
            stroke="#fbbf24"
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
            fill="#fbbf24"
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
              stroke="#fbbf24"
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
            fill="#fbbf24"
            clipPath="url(#bottomClip)"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Tempo */}
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span className={`text-2xl font-bold font-mono ${tempoRestante < 60 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}`}>
            {formatarTempo(tempoRestante)}
          </span>
        </div>
      </div>
    );
  };

  // TELA DE CONFIGURAÇÃO
  if (estado === 'config') {
    return (
      <div className="container-ia min-h-screen py-8">
        <FloatingNav />

        {/* Slogan */}
        <div className="card-ia p-4 mb-6 mt-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 text-center">
          <p className="text-yellow-300 font-bold italic">
            "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">⏳</div>
            <h1 className="title-ia mb-2">Simulado Contra o Relogio</h1>
            <p className="subtitle-ia mb-0">Responda o maximo de questoes antes do tempo acabar!</p>
          </div>

          {/* Seleção de Tempo */}
          <div className="card-ia p-6 mb-6">
            <h2 className="text-white font-bold text-lg mb-4">⏱️ Escolha o Tempo</h2>
            <div className="grid grid-cols-2 gap-3">
              {OPCOES_TEMPO.map((opcao) => (
                <button
                  key={opcao.tempo}
                  onClick={() => setConfig({ ...config, tempo: opcao.tempo, questoes: opcao.questoes })}
                  className={`p-4 rounded-xl transition-all ${
                    config.tempo === opcao.tempo
                      ? 'bg-yellow-400 text-slate-900 scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="text-3xl mb-2">{opcao.emoji}</div>
                  <div className="font-bold">{opcao.label}</div>
                  <div className="text-sm opacity-70">{opcao.tempo} min / {opcao.questoes} questoes</div>
                  <div className="text-xs mt-1 opacity-60">{opcao.descricao}</div>
                  {opcao.fpMultiplier > 1 && (
                    <div className={`text-xs mt-2 font-bold ${config.tempo === opcao.tempo ? 'text-slate-900' : 'text-yellow-300'}`}>
                      {opcao.fpMultiplier}x FP!
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Seleção de Disciplina */}
          <div className="card-ia p-6 mb-6">
            <h2 className="text-white font-bold text-lg mb-4">📚 Escolha a Materia</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {DISCIPLINAS.map((disc) => (
                <button
                  key={disc.id}
                  onClick={() => setConfig({ ...config, disciplina: disc.id })}
                  className={`p-4 rounded-xl transition-all ${
                    config.disciplina === disc.id
                      ? `bg-gradient-to-br ${disc.cor} text-white scale-105`
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="text-3xl mb-2">{disc.emoji}</div>
                  <div className="font-bold text-sm">{disc.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Resumo e Iniciar */}
          <div className="card-ia p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/30">
            <h2 className="text-white font-bold text-lg mb-4">📋 Resumo</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{config.tempo}</p>
                <p className="text-white/60 text-sm">minutos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{config.questoes}</p>
                <p className="text-white/60 text-sm">questoes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-300">{OPCOES_TEMPO.find(o => o.tempo === config.tempo)?.fpMultiplier || 1}x</p>
                <p className="text-white/60 text-sm">multiplicador FP</p>
              </div>
            </div>

            <button
              onClick={iniciarSimulado}
              className="btn-ia w-full py-5 text-xl font-bold"
              style={{ boxShadow: '0 8px 30px rgba(255, 217, 102, 0.4)' }}
            >
              ⏳ INICIAR SIMULADO
            </button>
          </div>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // TELA DO SIMULADO
  if (estado === 'jogando') {
    const questao = questoes[questaoAtual];
    const progressoTempo = (tempoRestante / tempoInicial) * 100;

    return (
      <div className="container-ia min-h-screen py-8">
        {/* Header com ampulheta */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-white/60 text-sm">Questao {questaoAtual + 1} de {questoes.length}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge-ia">{questao?.disciplina}</span>
              <span className="text-white/50 text-sm">Respondidas: {questoesRespondidas}</span>
            </div>
          </div>

          <Ampulheta progresso={progressoTempo} />
        </div>

        {/* Barra de progresso das questões */}
        <div className="flex gap-1 mb-6">
          {questoes.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full transition-all ${
                respostas[idx] !== null
                  ? respostas[idx] === questoes[idx].correta
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : idx === questaoAtual
                  ? 'bg-yellow-400'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Questão */}
        <div className="card-ia p-6 mb-6">
          <p className="text-white text-lg mb-6">{questao?.enunciado}</p>

          <div className="space-y-3">
            {questao?.alternativas.map((alt, idx) => (
              <button
                key={idx}
                onClick={() => responder(idx)}
                className="w-full p-4 rounded-xl text-left transition-all bg-white/5 border-2 border-white/10 hover:border-yellow-400 hover:bg-yellow-400/10"
              >
                <span className="font-bold mr-3 text-yellow-300">{String.fromCharCode(65 + idx)})</span>
                <span className="text-white">{alt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-4">
          <button
            onClick={pularQuestao}
            disabled={questaoAtual >= questoes.length - 1}
            className="btn-ia-secondary flex-1 py-4 disabled:opacity-50"
          >
            ⏭️ Pular
          </button>
          <button
            onClick={finalizarSimulado}
            className="btn-ia flex-1 py-4 bg-red-500 hover:bg-red-400"
          >
            🏁 Finalizar
          </button>
        </div>

        <ChalkBackToTop />
      </div>
    );
  }

  // TELA DE RESULTADO
  if (estado === 'resultado') {
    const resultado = calcularResultado();

    return (
      <div className="container-ia min-h-screen py-8">
        <div className="max-w-lg mx-auto">
          <div className="card-ia p-8 text-center mb-6">
            <div className="text-8xl mb-4">
              {resultado.porcentagem >= 80 ? '🏆' : resultado.porcentagem >= 60 ? '🎉' : resultado.porcentagem >= 40 ? '📚' : '💪'}
            </div>
            <h1 className="title-ia-sm mb-2">
              {resultado.porcentagem >= 80 ? 'Excelente!' : resultado.porcentagem >= 60 ? 'Muito Bem!' : resultado.porcentagem >= 40 ? 'Bom Trabalho!' : 'Continue Praticando!'}
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold text-white">{resultado.acertos}/{resultado.respondidas}</p>
                <p className="text-white/60 text-sm">Acertos</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold text-white">{resultado.porcentagem}%</p>
                <p className="text-white/60 text-sm">Aproveitamento</p>
              </div>
            </div>

            {/* FP Ganhos */}
            <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-400/30 mb-6">
              <p className="text-yellow-300 font-bold text-3xl">+{resultado.fpTotal} FP</p>
              <p className="text-white/60 text-sm">
                Base: {resultado.acertos * 10} × {fpMultiplier} + Bonus tempo: {resultado.bonusTempo}
              </p>
            </div>

            {/* Detalhes */}
            <div className="text-left bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white/60 text-sm mb-2">Detalhes:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Questoes respondidas</span>
                  <span className="text-white">{resultado.respondidas} de {resultado.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Tempo restante</span>
                  <span className="text-white">{formatarTempo(tempoRestante)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Multiplicador</span>
                  <span className="text-yellow-300">{fpMultiplier}x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revisão das questões */}
          <div className="card-ia p-6 mb-6">
            <h2 className="text-white font-bold mb-4">📝 Revisao</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {questoes.map((q, idx) => {
                const respondida = respostas[idx] !== null;
                const acertou = respostas[idx] === q.correta;

                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-lg ${
                      !respondida
                        ? 'bg-white/5 border border-white/10'
                        : acertou
                        ? 'bg-green-500/20 border border-green-400/30'
                        : 'bg-red-500/20 border border-red-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 text-sm">{idx + 1}.</span>
                        <span className="badge-ia text-xs">{q.disciplina}</span>
                      </div>
                      <span className="text-sm">
                        {!respondida ? '⏭️ Pulada' : acertou ? '✅ Correta' : '❌ Errada'}
                      </span>
                    </div>
                    {!acertou && respondida && (
                      <p className="text-white/60 text-xs mt-1">
                        Resposta: {q.alternativas[q.correta]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setEstado('config');
                setQuestoes([]);
                setRespostas([]);
              }}
              className="btn-ia w-full py-4 text-lg"
            >
              ⏳ Jogar Novamente
            </button>
            <button
              onClick={() => router.push('/enem')}
              className="btn-ia-secondary w-full py-4"
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
