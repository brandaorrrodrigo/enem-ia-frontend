'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--chalkboard-bg)' }}>
      <FloatingNav />

      {/* Container principal */}
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: 'var(--chalk-white)',
            textShadow: '2px 2px 0 rgba(255,217,102,0.3)'
          }}>
            🤖 Gerador de Questões IA
          </h1>
          <p className="text-lg md:text-xl" style={{ color: 'var(--chalk-dim)' }}>
            Gere questões personalizadas para praticar
          </p>
        </div>

        {questoesGeradas.length === 0 ? (
          /* Formulário de Configuração */
          <div className="card max-w-2xl mx-auto" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <h2 className="card-title mb-6" style={{
              color: 'var(--chalk-white)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              ⚙️ Configure suas questões
            </h2>

            <div className="space-y-6">
              {/* Disciplina */}
              <div>
                <label className="block mb-2" style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem'
                }}>
                  📚 Disciplina
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {disciplinas.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => {
                        setDisciplina(d.value);
                        setTema('');
                      }}
                      className="chalkboard-card text-center transition-all hover:scale-105"
                      style={{
                        background: disciplina === d.value ? 'rgba(255, 217, 102, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                        border: disciplina === d.value ? '2px solid var(--accent-yellow)' : '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1rem'
                      }}
                    >
                      <div className="text-3xl mb-2">{d.emoji}</div>
                      <p style={{ color: 'var(--chalk-white)', fontSize: '0.875rem', fontWeight: '600' }}>
                        {d.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tema */}
              <div>
                <label className="block mb-2" style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem'
                }}>
                  📌 Tema (opcional)
                </label>
                <select
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  className="w-full p-3 rounded-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--chalk-white)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Todos os temas</option>
                  {temasDisponiveis.map((t) => (
                    <option key={t} value={t} style={{ background: 'var(--chalkboard-dark)' }}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dificuldade */}
              <div>
                <label className="block mb-2" style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem'
                }}>
                  📊 Dificuldade
                </label>
                <div className="flex gap-3">
                  {dificuldades.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDificuldade(d.value)}
                      className="flex-1 text-center transition-all hover:scale-105"
                      style={{
                        background: dificuldade === d.value ? 'rgba(255, 217, 102, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                        border: dificuldade === d.value ? '2px solid var(--accent-yellow)' : '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1rem'
                      }}
                    >
                      <div className="text-2xl mb-1">{d.emoji}</div>
                      <p style={{ color: 'var(--chalk-white)', fontSize: '0.875rem' }}>
                        {d.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantidade */}
              <div>
                <label className="block mb-2" style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem'
                }}>
                  🔢 Quantidade de questões
                </label>
                <div className="flex gap-3">
                  {[5, 10, 15, 20].map((n) => (
                    <button
                      key={n}
                      onClick={() => setQuantidade(n)}
                      className="flex-1 text-center transition-all hover:scale-105"
                      style={{
                        background: quantidade === n ? 'rgba(255, 217, 102, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                        border: quantidade === n ? '2px solid var(--accent-yellow)' : '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1rem'
                      }}
                    >
                      <p style={{
                        color: 'var(--chalk-white)',
                        fontSize: '1.125rem',
                        fontWeight: 'bold'
                      }}>
                        {n}
                      </p>
                      <p style={{
                        color: 'var(--chalk-dim)',
                        fontSize: '0.75rem'
                      }}>
                        questões
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Gerar */}
              <button
                onClick={gerarQuestoes}
                disabled={loading}
                className="btn btn-yellow w-full py-4 text-lg font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  background: loading ? 'rgba(255, 217, 102, 0.3)' : 'var(--accent-yellow)',
                  color: 'var(--chalkboard-dark)',
                  border: '2px solid var(--accent-yellow)',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    Gerando questões...
                  </span>
                ) : (
                  '🚀 Gerar Questões'
                )}
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 rounded-xl" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--chalk-white)' }}>
                💡 Como funciona
              </h3>
              <ul className="space-y-1" style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                <li>• A IA gera questões no estilo ENEM</li>
                <li>• Cada questão tem 5 alternativas</li>
                <li>• Ao finalizar, você vê sua pontuação</li>
                <li>• Explicações detalhadas para cada questão</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Questões Geradas */
          <div>
            {/* Header do Simulado */}
            <div className="card mb-6" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="card-title mb-1" style={{
                    color: 'var(--chalk-white)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {disciplinas.find(d => d.value === disciplina)?.emoji} {disciplina}
                    {tema && ` - ${tema}`}
                  </h2>
                  <p style={{ color: 'var(--chalk-dim)' }}>
                    {questoesGeradas.length} questões • {dificuldades.find(d => d.value === dificuldade)?.emoji} {dificuldade}
                  </p>
                </div>

                {!mostrarResultado ? (
                  <div className="flex gap-3">
                    <button
                      onClick={reiniciar}
                      className="btn px-4 py-2 rounded-lg transition-all hover:scale-105"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--chalk-white)',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      🔄 Recomeçar
                    </button>
                    <button
                      onClick={verificarRespostas}
                      disabled={Object.keys(respostasUsuario).length < questoesGeradas.length}
                      className="btn btn-yellow px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                      style={{
                        background: Object.keys(respostasUsuario).length < questoesGeradas.length
                          ? 'rgba(255, 217, 102, 0.3)'
                          : 'var(--accent-yellow)',
                        color: 'var(--chalkboard-dark)',
                        border: '2px solid var(--accent-yellow)',
                        cursor: Object.keys(respostasUsuario).length < questoesGeradas.length
                          ? 'not-allowed'
                          : 'pointer'
                      }}
                    >
                      ✅ Verificar Respostas
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={reiniciar}
                    className="btn btn-yellow px-4 py-2 rounded-lg transition-all hover:scale-105"
                    style={{
                      background: 'var(--accent-yellow)',
                      color: 'var(--chalkboard-dark)',
                      border: '2px solid var(--accent-yellow)'
                    }}
                  >
                    🔄 Gerar Novas Questões
                  </button>
                )}
              </div>
            </div>

            {/* Resultado */}
            {mostrarResultado && (
              <div className="card mb-6 text-center" style={{
                background: 'linear-gradient(135deg, rgba(255,217,102,0.2) 0%, rgba(255,217,102,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '2px solid var(--accent-yellow)',
                borderRadius: '16px',
                padding: '2rem'
              }}>
                <div className="text-6xl mb-4">
                  {calcularPontuacao().porcentagem >= 70 ? '🎉' : calcularPontuacao().porcentagem >= 50 ? '👍' : '📚'}
                </div>
                <h2 className="mb-2" style={{
                  color: 'var(--chalk-white)',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  Resultado Final
                </h2>
                <p className="text-4xl font-bold mb-2" style={{ color: 'var(--chalk-white)' }}>
                  {calcularPontuacao().acertos}/{calcularPontuacao().total}
                </p>
                <p className="text-xl" style={{ color: 'var(--accent-yellow)' }}>
                  {calcularPontuacao().porcentagem}% de acertos
                </p>
              </div>
            )}

            {/* Lista de Questões */}
            <div className="space-y-6">
              {questoesGeradas.map((questao, qIdx) => {
                const respostaUsuario = respostasUsuario[questao.id];
                const acertou = respostaUsuario === questao.respostaCorreta;

                return (
                  <div
                    key={questao.id}
                    className="chalkboard-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: mostrarResultado
                        ? acertou
                          ? '2px solid #10b981'
                          : '2px solid #ef4444'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                      borderLeft: mostrarResultado
                        ? acertou
                          ? '4px solid #10b981'
                          : '4px solid #ef4444'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '1.5rem'
                    }}
                  >
                    {/* Número e Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge px-3 py-1 rounded-full" style={{
                        background: 'var(--accent-yellow)',
                        color: 'var(--chalkboard-dark)',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}>
                        Questão {qIdx + 1}
                      </span>
                      {mostrarResultado && (
                        <span style={{
                          color: acertou ? '#10b981' : '#ef4444',
                          fontWeight: 'bold'
                        }}>
                          {acertou ? '✅ Correta' : '❌ Incorreta'}
                        </span>
                      )}
                    </div>

                    {/* Enunciado */}
                    <p className="mb-6 leading-relaxed" style={{
                      color: 'var(--chalk-white)',
                      fontSize: '1rem'
                    }}>
                      {questao.enunciado}
                    </p>

                    {/* Alternativas */}
                    <div className="space-y-2">
                      {questao.alternativas.map((alt, altIdx) => {
                        const letra = String.fromCharCode(65 + altIdx);
                        const selecionada = respostaUsuario === altIdx;
                        const isCorreta = altIdx === questao.respostaCorreta;

                        let estilo: React.CSSProperties = {
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '2px solid rgba(255, 255, 255, 0.1)',
                          color: 'var(--chalk-white)',
                          borderRadius: '12px',
                          padding: '1rem',
                          textAlign: 'left',
                          width: '100%',
                          cursor: mostrarResultado ? 'default' : 'pointer',
                          transition: 'all 0.2s'
                        };

                        if (mostrarResultado) {
                          if (isCorreta) {
                            estilo = {
                              ...estilo,
                              background: 'rgba(16, 185, 129, 0.2)',
                              border: '2px solid #10b981'
                            };
                          } else if (selecionada && !isCorreta) {
                            estilo = {
                              ...estilo,
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '2px solid #ef4444'
                            };
                          }
                        } else if (selecionada) {
                          estilo = {
                            ...estilo,
                            background: 'rgba(255, 217, 102, 0.2)',
                            border: '2px solid var(--accent-yellow)'
                          };
                        }

                        return (
                          <button
                            key={altIdx}
                            onClick={() => selecionarResposta(questao.id, altIdx)}
                            disabled={mostrarResultado}
                            style={estilo}
                            onMouseEnter={(e) => {
                              if (!mostrarResultado) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!mostrarResultado && !selecionada) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                              }
                            }}
                          >
                            <span style={{
                              fontWeight: 'bold',
                              color: 'var(--accent-yellow)',
                              marginRight: '0.75rem'
                            }}>
                              {letra})
                            </span>
                            <span style={{ color: 'var(--chalk-white)' }}>{alt}</span>
                            {mostrarResultado && isCorreta && (
                              <span style={{ marginLeft: '0.5rem', color: '#10b981' }}>✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explicação */}
                    {mostrarResultado && (
                      <div className="mt-6 p-4 rounded-xl" style={{
                        background: 'rgba(255, 217, 102, 0.1)',
                        border: '2px solid rgba(255, 217, 102, 0.3)'
                      }}>
                        <h4 className="font-bold mb-2" style={{ color: 'var(--accent-yellow)' }}>
                          💡 Explicação
                        </h4>
                        <p style={{ color: 'var(--chalk-white)' }}>
                          {questao.explicacao}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="footer mt-12 text-center">
          <button
            onClick={() => router.push('/enem')}
            className="btn px-6 py-3 rounded-lg transition-all hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--chalk-white)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              fontSize: '1rem'
            }}
          >
            ← Voltar para Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
