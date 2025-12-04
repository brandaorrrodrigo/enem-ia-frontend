'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface QuestaoGerada {
  id: string;
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao: string;
  disciplina: string;
  tema: string;
  dificuldade: string;
}

export default function GeradorQuestoesPage() {
  const router = useRouter();
  const [disciplina, setDisciplina] = useState('Matematica');
  const [tema, setTema] = useState('');
  const [dificuldade, setDificuldade] = useState('medio');
  const [quantidade, setQuantidade] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questoesGeradas, setQuestoesGeradas] = useState<QuestaoGerada[]>([]);
  const [respostasUsuario, setRespostasUsuario] = useState<Record<string, number>>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const disciplinas = [
    { value: 'Matematica', label: 'Matematica', emoji: '📐', temas: ['Funcoes', 'Geometria', 'Probabilidade', 'Algebra', 'Aritmetica'] },
    { value: 'Linguagens', label: 'Linguagens', emoji: '📖', temas: ['Interpretacao', 'Gramatica', 'Literatura', 'Generos Textuais'] },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', emoji: '🌍', temas: ['Historia do Brasil', 'Historia Geral', 'Geografia', 'Filosofia', 'Sociologia'] },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', emoji: '🔬', temas: ['Fisica', 'Quimica', 'Biologia', 'Ecologia'] },
  ];

  const dificuldades = [
    { value: 'facil', label: 'Facil', emoji: '🟢' },
    { value: 'medio', label: 'Medio', emoji: '🟡' },
    { value: 'dificil', label: 'Dificil', emoji: '🔴' },
  ];

  const temasDisponiveis = disciplinas.find(d => d.value === disciplina)?.temas || [];

  const gerarQuestoes = async () => {
    setLoading(true);
    setQuestoesGeradas([]);
    setRespostasUsuario({});
    setMostrarResultado(false);

    try {
      // Simular geracao de questoes
      await new Promise(resolve => setTimeout(resolve, 2000));

      const questoes: QuestaoGerada[] = [];
      const temaEscolhido = tema || temasDisponiveis[0];

      for (let i = 0; i < quantidade; i++) {
        const questao = gerarQuestaoExemplo(disciplina, temaEscolhido, dificuldade, i);
        questoes.push(questao);
      }

      setQuestoesGeradas(questoes);
    } catch (error) {
      console.error('Erro ao gerar questoes:', error);
    } finally {
      setLoading(false);
    }
  };

  const gerarQuestaoExemplo = (disc: string, tem: string, dif: string, idx: number): QuestaoGerada => {
    const questoesExemplo: Record<string, QuestaoGerada[]> = {
      'Matematica': [
        {
          id: `mat-${idx}`,
          enunciado: 'Uma loja oferece 20% de desconto em todos os produtos. Se uma camiseta custa R$ 80,00, qual sera o valor final apos o desconto?',
          alternativas: ['R$ 60,00', 'R$ 64,00', 'R$ 68,00', 'R$ 72,00', 'R$ 76,00'],
          respostaCorreta: 1,
          explicacao: 'Desconto de 20% sobre R$ 80,00: 80 × 0,20 = R$ 16,00. Valor final: 80 - 16 = R$ 64,00.',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
        {
          id: `mat2-${idx}`,
          enunciado: 'Qual e o valor de x na equacao 3x + 9 = 24?',
          alternativas: ['x = 3', 'x = 4', 'x = 5', 'x = 6', 'x = 7'],
          respostaCorreta: 2,
          explicacao: '3x + 9 = 24 → 3x = 24 - 9 → 3x = 15 → x = 15/3 → x = 5',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
        {
          id: `mat3-${idx}`,
          enunciado: 'Um retangulo tem base 8 cm e altura 5 cm. Qual e sua area?',
          alternativas: ['13 cm²', '26 cm²', '40 cm²', '48 cm²', '52 cm²'],
          respostaCorreta: 2,
          explicacao: 'Area do retangulo = base × altura = 8 × 5 = 40 cm²',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
      ],
      'Linguagens': [
        {
          id: `lin-${idx}`,
          enunciado: '"Havia muitas pessoas na praca." Nesta oracao, o sujeito e classificado como:',
          alternativas: ['Sujeito simples', 'Sujeito composto', 'Sujeito indeterminado', 'Sujeito inexistente', 'Sujeito oculto'],
          respostaCorreta: 3,
          explicacao: 'O verbo "haver" no sentido de existir e impessoal, portanto nao possui sujeito (sujeito inexistente).',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
        {
          id: `lin2-${idx}`,
          enunciado: 'Qual figura de linguagem esta presente em "O sol sorria para nos"?',
          alternativas: ['Metafora', 'Hiperbole', 'Prosopopeia', 'Metonimia', 'Antitese'],
          respostaCorreta: 2,
          explicacao: 'Prosopopeia (ou personificacao) atribui caracteristicas humanas a seres inanimados. O sol nao pode "sorrir".',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
      ],
      'Ciencias Humanas': [
        {
          id: `hum-${idx}`,
          enunciado: 'Em que ano foi proclamada a Republica no Brasil?',
          alternativas: ['1822', '1889', '1891', '1930', '1964'],
          respostaCorreta: 1,
          explicacao: 'A Proclamacao da Republica ocorreu em 15 de novembro de 1889, liderada pelo Marechal Deodoro da Fonseca.',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
        {
          id: `hum2-${idx}`,
          enunciado: 'Qual e a principal caracteristica do clima equatorial?',
          alternativas: ['Baixas temperaturas', 'Chuvas escassas', 'Altas temperaturas e chuvas abundantes', 'Estacoes bem definidas', 'Baixa umidade'],
          respostaCorreta: 2,
          explicacao: 'O clima equatorial caracteriza-se por altas temperaturas durante todo o ano e chuvas abundantes e regulares.',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
      ],
      'Ciencias da Natureza': [
        {
          id: `nat-${idx}`,
          enunciado: 'Qual organela celular e responsavel pela respiracao celular?',
          alternativas: ['Ribossomo', 'Lisossomo', 'Mitocondria', 'Complexo de Golgi', 'Reticulo endoplasmatico'],
          respostaCorreta: 2,
          explicacao: 'A mitocondria e a organela responsavel pela respiracao celular aerobica, produzindo ATP para a celula.',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
        {
          id: `nat2-${idx}`,
          enunciado: 'Qual e a formula quimica da agua?',
          alternativas: ['H2O', 'CO2', 'NaCl', 'H2SO4', 'NH3'],
          respostaCorreta: 0,
          explicacao: 'A agua e composta por 2 atomos de hidrogenio e 1 atomo de oxigenio, resultando em H2O.',
          disciplina: disc,
          tema: tem,
          dificuldade: dif,
        },
      ],
    };

    const questoesDisciplina = questoesExemplo[disc] || questoesExemplo['Matematica'];
    const questao = { ...questoesDisciplina[idx % questoesDisciplina.length] };
    questao.id = `${disc}-${Date.now()}-${idx}`;
    return questao;
  };

  const selecionarResposta = (questaoId: string, alternativaIdx: number) => {
    if (!mostrarResultado) {
      setRespostasUsuario(prev => ({
        ...prev,
        [questaoId]: alternativaIdx,
      }));
    }
  };

  const verificarRespostas = () => {
    setMostrarResultado(true);
  };

  const calcularPontuacao = (): { acertos: number; total: number; porcentagem: number } => {
    let acertos = 0;
    questoesGeradas.forEach(q => {
      if (respostasUsuario[q.id] === q.respostaCorreta) {
        acertos++;
      }
    });
    return {
      acertos,
      total: questoesGeradas.length,
      porcentagem: Math.round((acertos / questoesGeradas.length) * 100),
    };
  };

  const reiniciar = () => {
    setQuestoesGeradas([]);
    setRespostasUsuario({});
    setMostrarResultado(false);
  };

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      {/* Header */}


      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">
          🤖 Gerador de Questoes IA
        </h1>
        <p className="subtitle-ia mb-0">
          Gere questoes personalizadas para praticar
        </p>
      </div>

      {questoesGeradas.length === 0 ? (
        /* Formulario de Configuracao */
        <div className="card-ia max-w-2xl mx-auto">
          <h2 className="title-ia-sm mb-6">⚙️ Configure suas questoes</h2>

          <div className="space-y-6">
            {/* Disciplina */}
            <div>
              <label className="block text-white/80 text-sm mb-2">📚 Disciplina</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {disciplinas.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      setDisciplina(d.value);
                      setTema('');
                    }}
                    className={`card-ia-sm text-center transition hover:scale-105 ${
                      disciplina === d.value ? 'border-2 border-yellow-300 bg-yellow-300/10' : ''
                    }`}
                  >
                    <div className="text-3xl mb-2">{d.emoji}</div>
                    <p className="text-white text-sm font-semibold">{d.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tema */}
            <div>
              <label className="block text-white/80 text-sm mb-2">📌 Tema (opcional)</label>
              <select
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="input-ia w-full"
              >
                <option value="">Todos os temas</option>
                {temasDisponiveis.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Dificuldade */}
            <div>
              <label className="block text-white/80 text-sm mb-2">📊 Dificuldade</label>
              <div className="flex gap-3">
                {dificuldades.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDificuldade(d.value)}
                    className={`flex-1 card-ia-sm text-center transition hover:scale-105 ${
                      dificuldade === d.value ? 'border-2 border-yellow-300 bg-yellow-300/10' : ''
                    }`}
                  >
                    <div className="text-2xl mb-1">{d.emoji}</div>
                    <p className="text-white text-sm">{d.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <label className="block text-white/80 text-sm mb-2">🔢 Quantidade de questoes</label>
              <div className="flex gap-3">
                {[5, 10, 15, 20].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuantidade(n)}
                    className={`flex-1 card-ia-sm text-center transition hover:scale-105 ${
                      quantidade === n ? 'border-2 border-yellow-300 bg-yellow-300/10' : ''
                    }`}
                  >
                    <p className="text-white font-bold text-lg">{n}</p>
                    <p className="text-white/60 text-xs">questoes</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Botao Gerar */}
            <button
              onClick={gerarQuestoes}
              disabled={loading}
              className="btn-ia w-full py-4 text-lg font-bold disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="spinner-ia-sm inline-block mr-2"></span>
                  Gerando questoes...
                </>
              ) : (
                '🚀 Gerar Questoes'
              )}
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              💡 Como funciona
            </h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• A IA gera questoes no estilo ENEM</li>
              <li>• Cada questao tem 5 alternativas</li>
              <li>• Ao finalizar, voce ve sua pontuacao</li>
              <li>• Explicacoes detalhadas para cada questao</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Questoes Geradas */
        <div>
          {/* Header do Simulado */}
          <div className="card-ia mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="title-ia-sm mb-1">
                  {disciplinas.find(d => d.value === disciplina)?.emoji} {disciplina}
                  {tema && ` - ${tema}`}
                </h2>
                <p className="text-white/60">
                  {questoesGeradas.length} questoes • {dificuldades.find(d => d.value === dificuldade)?.emoji} {dificuldade}
                </p>
              </div>

              {!mostrarResultado ? (
                <div className="flex gap-3">
                  <button onClick={reiniciar} className="btn-ia-secondary">
                    🔄 Recomecar
                  </button>
                  <button
                    onClick={verificarRespostas}
                    disabled={Object.keys(respostasUsuario).length < questoesGeradas.length}
                    className="btn-ia disabled:opacity-50"
                  >
                    ✅ Verificar Respostas
                  </button>
                </div>
              ) : (
                <button onClick={reiniciar} className="btn-ia">
                  🔄 Gerar Novas Questoes
                </button>
              )}
            </div>
          </div>

          {/* Resultado */}
          {mostrarResultado && (
            <div className="card-ia mb-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(255,217,102,0.2) 0%, rgba(255,217,102,0.05) 100%)' }}>
              <div className="text-6xl mb-4">
                {calcularPontuacao().porcentagem >= 70 ? '🎉' : calcularPontuacao().porcentagem >= 50 ? '👍' : '📚'}
              </div>
              <h2 className="title-ia-sm mb-2">Resultado Final</h2>
              <p className="text-white text-4xl font-bold mb-2">
                {calcularPontuacao().acertos}/{calcularPontuacao().total}
              </p>
              <p className="text-yellow-300 text-xl">
                {calcularPontuacao().porcentagem}% de acertos
              </p>
            </div>
          )}

          {/* Lista de Questoes */}
          <div className="space-y-6">
            {questoesGeradas.map((questao, qIdx) => {
              const respostaUsuario = respostasUsuario[questao.id];
              const acertou = respostaUsuario === questao.respostaCorreta;

              return (
                <div
                  key={questao.id}
                  className={`card-ia ${
                    mostrarResultado
                      ? acertou
                        ? 'border-l-4 border-l-green-500'
                        : 'border-l-4 border-l-red-500'
                      : ''
                  }`}
                >
                  {/* Numero e Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge-ia">Questao {qIdx + 1}</span>
                    {mostrarResultado && (
                      <span className={acertou ? 'text-green-400' : 'text-red-400'}>
                        {acertou ? '✅ Correta' : '❌ Incorreta'}
                      </span>
                    )}
                  </div>

                  {/* Enunciado */}
                  <p className="text-white mb-6 leading-relaxed">{questao.enunciado}</p>

                  {/* Alternativas */}
                  <div className="space-y-2">
                    {questao.alternativas.map((alt, altIdx) => {
                      const letra = String.fromCharCode(65 + altIdx);
                      const selecionada = respostaUsuario === altIdx;
                      const isCorreta = altIdx === questao.respostaCorreta;

                      let estilo = 'bg-white/5 border-white/10 hover:bg-white/10';
                      if (mostrarResultado) {
                        if (isCorreta) {
                          estilo = 'bg-green-500/20 border-green-500';
                        } else if (selecionada && !isCorreta) {
                          estilo = 'bg-red-500/20 border-red-500';
                        }
                      } else if (selecionada) {
                        estilo = 'bg-yellow-300/20 border-yellow-300';
                      }

                      return (
                        <button
                          key={altIdx}
                          onClick={() => selecionarResposta(questao.id, altIdx)}
                          disabled={mostrarResultado}
                          className={`w-full p-4 rounded-xl border-2 text-left transition ${estilo} disabled:cursor-default`}
                        >
                          <span className="font-bold text-yellow-300 mr-3">{letra})</span>
                          <span className="text-white">{alt}</span>
                          {mostrarResultado && isCorreta && (
                            <span className="ml-2 text-green-400">✓</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explicacao */}
                  {mostrarResultado && (
                    <div className="mt-6 p-4 bg-yellow-300/10 border-2 border-yellow-300/30 rounded-xl">
                      <h4 className="text-yellow-300 font-bold mb-2">💡 Explicacao</h4>
                      <p className="text-white/90">{questao.explicacao}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ChalkBackToTop />
    </div>
  );
}
