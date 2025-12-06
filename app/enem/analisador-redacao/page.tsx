'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';

interface Competencia {
  id: number;
  nome: string;
  descricao: string;
  nota: number;
  feedback: string;
  sugestoes: string[];
  cor: string;
}

interface AnaliseRedacao {
  id: string;
  data: string;
  tema: string;
  texto: string;
  competencias: Competencia[];
  notaTotal: number;
  feedbackGeral: string;
  pontosFortes: string[];
  pontosMelhorar: string[];
  repertorios: string[];
}

interface HistoricoRedacao {
  id: string;
  data: string;
  tema: string;
  notaTotal: number;
}

const competenciasBase: Omit<Competencia, 'nota' | 'feedback' | 'sugestoes'>[] = [
  {
    id: 1,
    nome: 'Competência 1',
    descricao: 'Domínio da norma culta da língua escrita',
    cor: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    nome: 'Competência 2',
    descricao: 'Compreensão da proposta e aplicação de conceitos',
    cor: 'from-purple-500 to-purple-700'
  },
  {
    id: 3,
    nome: 'Competência 3',
    descricao: 'Seleção e organização das informações',
    cor: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 4,
    nome: 'Competência 4',
    descricao: 'Conhecimento dos mecanismos linguísticos',
    cor: 'from-orange-500 to-orange-700'
  },
  {
    id: 5,
    nome: 'Competência 5',
    descricao: 'Proposta de intervenção para o problema',
    cor: 'from-pink-500 to-pink-700'
  }
];

const temasExemplo = [
  'Os desafios da educação digital no Brasil',
  'A persistência da violência contra a mulher na sociedade brasileira',
  'O estigma associado às doenças mentais na sociedade brasileira',
  'Democratização do acesso ao cinema no Brasil',
  'Manipulação do comportamento do usuário pelo controle de dados na internet',
  'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
  'O problema do abandono de animais no Brasil',
  'Desafios para a valorização de comunidades e povos tradicionais no Brasil'
];

export default function AnalisadorRedacaoPage() {
  const [texto, setTexto] = useState('');
  const [tema, setTema] = useState('');
  const [analisando, setAnalisando] = useState(false);
  const [analise, setAnalise] = useState<AnaliseRedacao | null>(null);
  const [historico, setHistorico] = useState<HistoricoRedacao[]>([]);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState<'escrever' | 'resultado'>('escrever');

  useEffect(() => {
    const saved = localStorage.getItem('enem-redacao-historico');
    if (saved) {
      setHistorico(JSON.parse(saved));
    }
  }, []);

  const contarPalavras = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const contarLinhas = (text: string) => {
    return text.split('\n').length;
  };

  const analisarRedacao = async () => {
    if (!texto.trim() || !tema.trim()) {
      alert('Por favor, preencha o tema e o texto da redação.');
      return;
    }

    if (contarPalavras(texto) < 100) {
      alert('A redação deve ter pelo menos 100 palavras para análise.');
      return;
    }

    setAnalisando(true);

    // Simular análise (em produção, seria uma chamada à API de IA)
    await new Promise(resolve => setTimeout(resolve, 3000));

    const palavras = contarPalavras(texto);
    const linhas = contarLinhas(texto);

    // Análise simulada baseada em características do texto
    const temIntroducao = texto.toLowerCase().includes('atualmente') ||
                          texto.toLowerCase().includes('no brasil') ||
                          texto.toLowerCase().includes('na sociedade');
    const temConclusao = texto.toLowerCase().includes('portanto') ||
                         texto.toLowerCase().includes('dessa forma') ||
                         texto.toLowerCase().includes('diante disso');
    const temConectivos = (texto.match(/além disso|porém|contudo|entretanto|todavia|assim|dessa forma|nesse sentido/gi) || []).length;
    const temRepertorios = (texto.match(/segundo|de acordo com|conforme|como afirma|como diz/gi) || []).length;
    const temProposta = texto.toLowerCase().includes('governo') ||
                        texto.toLowerCase().includes('medidas') ||
                        texto.toLowerCase().includes('políticas públicas') ||
                        texto.toLowerCase().includes('é necessário');

    // Calcular notas por competência
    const gerarNota = (base: number, bonus: number) => {
      const nota = Math.min(200, Math.max(40, base + bonus));
      return Math.round(nota / 40) * 40; // Arredondar para múltiplos de 40
    };

    const competencias: Competencia[] = [
      {
        ...competenciasBase[0],
        nota: gerarNota(120, palavras > 250 ? 40 : 0),
        feedback: palavras > 250
          ? 'Bom domínio da norma culta. Texto bem estruturado com poucos desvios.'
          : 'Texto curto pode limitar a demonstração do domínio da língua.',
        sugestoes: [
          'Revise a concordância verbal e nominal',
          'Atenção ao uso de vírgulas',
          'Evite repetição de palavras'
        ]
      },
      {
        ...competenciasBase[1],
        nota: gerarNota(120, temIntroducao ? 40 : 0),
        feedback: temIntroducao
          ? 'Boa compreensão do tema com contextualização adequada.'
          : 'Procure contextualizar melhor o tema na introdução.',
        sugestoes: [
          'Apresente uma tese clara na introdução',
          'Conecte seus argumentos ao tema proposto',
          'Use repertório sociocultural pertinente'
        ]
      },
      {
        ...competenciasBase[2],
        nota: gerarNota(120, temRepertorios > 0 ? 40 : 0),
        feedback: temRepertorios > 0
          ? 'Boa seleção de informações e argumentos.'
          : 'Inclua mais dados, citações ou exemplos para enriquecer o texto.',
        sugestoes: [
          'Use dados estatísticos quando possível',
          'Cite pensadores, autores ou obras',
          'Traga exemplos concretos do cotidiano'
        ]
      },
      {
        ...competenciasBase[3],
        nota: gerarNota(100, temConectivos * 20),
        feedback: temConectivos > 2
          ? 'Bom uso de conectivos e coesão textual.'
          : 'Utilize mais conectivos para melhorar a fluidez do texto.',
        sugestoes: [
          'Use conjunções: além disso, porém, contudo',
          'Evite começar frases da mesma forma',
          'Crie transições entre parágrafos'
        ]
      },
      {
        ...competenciasBase[4],
        nota: gerarNota(100, temProposta && temConclusao ? 60 : temProposta ? 20 : 0),
        feedback: temProposta && temConclusao
          ? 'Proposta de intervenção presente e detalhada.'
          : 'A proposta de intervenção precisa ser mais elaborada.',
        sugestoes: [
          'Indique QUEM vai agir (agente)',
          'Diga O QUE será feito (ação)',
          'Explique COMO será feito (meio)',
          'Mencione PARA QUE (finalidade)',
          'Cite um DETALHAMENTO adicional'
        ]
      }
    ];

    const notaTotal = competencias.reduce((acc, c) => acc + c.nota, 0);

    const novaAnalise: AnaliseRedacao = {
      id: Date.now().toString(),
      data: new Date().toISOString(),
      tema,
      texto,
      competencias,
      notaTotal,
      feedbackGeral: notaTotal >= 800
        ? 'Excelente redação! Você demonstra domínio das competências avaliadas.'
        : notaTotal >= 600
        ? 'Boa redação! Com alguns ajustes, você pode alcançar notas ainda maiores.'
        : notaTotal >= 400
        ? 'Redação satisfatória. Foque nos pontos de melhoria indicados.'
        : 'Redação precisa de melhorias. Revise as sugestões em cada competência.',
      pontosFortes: [
        temIntroducao ? 'Boa contextualização do tema' : '',
        temConectivos > 2 ? 'Uso adequado de conectivos' : '',
        temRepertorios > 0 ? 'Presença de repertório sociocultural' : '',
        temProposta ? 'Proposta de intervenção presente' : '',
        palavras > 250 ? 'Texto com desenvolvimento adequado' : ''
      ].filter(Boolean),
      pontosMelhorar: [
        !temIntroducao ? 'Melhorar a introdução e contextualização' : '',
        temConectivos <= 2 ? 'Usar mais conectivos e operadores argumentativos' : '',
        temRepertorios === 0 ? 'Incluir citações e repertório sociocultural' : '',
        !temProposta ? 'Elaborar melhor a proposta de intervenção' : '',
        !temConclusao ? 'Desenvolver a conclusão' : ''
      ].filter(Boolean),
      repertorios: [
        '"A educação é a arma mais poderosa que você pode usar para mudar o mundo" - Nelson Mandela',
        'Constituição Federal de 1988 - Artigo 5º: Todos são iguais perante a lei',
        'Zygmunt Bauman - Modernidade Líquida e relações sociais',
        'Michel Foucault - Relações de poder e disciplina',
        'Hannah Arendt - A banalidade do mal'
      ]
    };

    setAnalise(novaAnalise);
    setAbaSelecionada('resultado');
    setAnalisando(false);

    // Salvar no histórico
    const novoHistorico: HistoricoRedacao = {
      id: novaAnalise.id,
      data: novaAnalise.data,
      tema: novaAnalise.tema,
      notaTotal: novaAnalise.notaTotal
    };

    const historicoAtualizado = [novoHistorico, ...historico].slice(0, 20);
    setHistorico(historicoAtualizado);
    localStorage.setItem('enem-redacao-historico', JSON.stringify(historicoAtualizado));
  };

  const novaRedacao = () => {
    setTexto('');
    setTema('');
    setAnalise(null);
    setAbaSelecionada('escrever');
  };

  const estatisticas = {
    total: historico.length,
    media: historico.length > 0
      ? Math.round(historico.reduce((acc, h) => acc + h.notaTotal, 0) / historico.length)
      : 0,
    melhor: historico.length > 0 ? Math.max(...historico.map(h => h.notaTotal)) : 0,
    ultima: historico[0]?.notaTotal || 0
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--chalk-dark)',
      color: 'var(--chalk-white)',
      paddingTop: '4rem',
      paddingBottom: '6rem'
    }}>
      <FloatingNav />

      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <div className="header" style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--chalk-white)',
            marginBottom: '1rem',
            fontFamily: 'var(--font-chalk)'
          }}>
            ✍️ Analisador de Redação ENEM-IA
          </h1>
          <p style={{
            color: 'var(--chalk-dim)',
            maxWidth: '42rem',
            margin: '0 auto',
            fontSize: '1rem'
          }}>
            Escreva sua redação e receba uma análise detalhada das 5 competências do ENEM
            com sugestões de melhoria e repertórios sugeridos.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="stats-bar" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'var(--chalk-board)',
          borderRadius: '0.5rem',
          border: '3px solid var(--chalk-border)'
        }}>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--accent-green)'
            }}>
              {estatisticas.total}
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem'
            }}>
              Redações Analisadas
            </div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--accent-blue)'
            }}>
              {estatisticas.media}
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem'
            }}>
              Nota Média
            </div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--accent-yellow)'
            }}>
              {estatisticas.melhor}
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem'
            }}>
              Melhor Nota
            </div>
          </div>
          <div className="stat-item" style={{ textAlign: 'center' }}>
            <div className="stat-number" style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--accent-pink)'
            }}>
              {estatisticas.ultima}
            </div>
            <div className="stat-label" style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem'
            }}>
              Última Nota
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setMostrarHistorico(!mostrarHistorico)}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--chalk-board)',
              color: 'var(--chalk-white)',
              border: '2px solid var(--chalk-border)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-yellow)';
              e.currentTarget.style.color = 'var(--chalk-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--chalk-board)';
              e.currentTarget.style.color = 'var(--chalk-white)';
            }}
          >
            📜 {mostrarHistorico ? 'Ocultar Histórico' : 'Ver Histórico'}
          </button>
          {analise && (
            <button
              onClick={novaRedacao}
              className="btn btn-yellow"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--accent-yellow)',
                color: 'var(--chalk-dark)',
                border: '2px solid var(--chalk-border)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 214, 10, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ✨ Nova Redação
            </button>
          )}
        </div>

        {/* Histórico */}
        {mostrarHistorico && (
          <div className="card" style={{
            background: 'var(--chalk-board)',
            border: '3px solid var(--chalk-border)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h2 className="card-title" style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-chalk)'
            }}>
              📜 Histórico de Redações
            </h2>
            {historico.length === 0 ? (
              <p style={{
                color: 'var(--chalk-dim)',
                textAlign: 'center',
                padding: '1rem'
              }}>
                Você ainda não analisou nenhuma redação.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {historico.map((h, idx) => (
                  <div
                    key={idx}
                    className="chalkboard-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <h3 style={{
                        fontWeight: '600',
                        color: 'var(--chalk-white)',
                        marginBottom: '0.25rem'
                      }}>
                        {h.tema}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--chalk-dim)'
                      }}>
                        {new Date(h.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: h.notaTotal >= 800 ? 'var(--accent-green)' :
                             h.notaTotal >= 600 ? 'var(--accent-blue)' :
                             h.notaTotal >= 400 ? 'var(--accent-yellow)' : 'var(--accent-pink)'
                    }}>
                      {h.notaTotal}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Abas */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setAbaSelecionada('escrever')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              cursor: 'pointer',
              border: abaSelecionada === 'escrever' ? '2px solid var(--accent-yellow)' : '2px solid var(--chalk-border)',
              background: abaSelecionada === 'escrever' ? 'var(--accent-yellow)' : 'var(--chalk-board)',
              color: abaSelecionada === 'escrever' ? 'var(--chalk-dark)' : 'var(--chalk-dim)'
            }}
          >
            ✏️ Escrever
          </button>
          <button
            onClick={() => setAbaSelecionada('resultado')}
            disabled={!analise}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              cursor: analise ? 'pointer' : 'not-allowed',
              border: abaSelecionada === 'resultado' ? '2px solid var(--accent-yellow)' : '2px solid var(--chalk-border)',
              background: abaSelecionada === 'resultado' ? 'var(--accent-yellow)' :
                         analise ? 'var(--chalk-board)' : 'rgba(255, 255, 255, 0.05)',
              color: abaSelecionada === 'resultado' ? 'var(--chalk-dark)' :
                     analise ? 'var(--chalk-dim)' : 'rgba(255, 255, 255, 0.3)',
              opacity: analise ? 1 : 0.5
            }}
          >
            📊 Resultado
          </button>
        </div>

        {abaSelecionada === 'escrever' ? (
          <div className="card" style={{
            background: 'var(--chalk-board)',
            border: '3px solid var(--chalk-border)',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            {/* Tema */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--chalk-white)'
              }}>
                Tema da Redação
              </label>
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Digite o tema ou selecione um abaixo..."
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid var(--chalk-border)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  color: 'var(--chalk-white)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-yellow)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--chalk-border)'}
              />
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '0.75rem'
              }}>
                {temasExemplo.slice(0, 4).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTema(t)}
                    className="badge"
                    style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '1rem',
                      border: '1px solid var(--chalk-border)',
                      color: 'var(--chalk-dim)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.color = 'var(--chalk-white)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'var(--chalk-dim)';
                    }}
                  >
                    {t.substring(0, 40)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Área de texto */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--chalk-white)'
              }}>
                Sua Redação
              </label>
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua redação aqui... (mínimo 100 palavras)"
                rows={20}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid var(--chalk-border)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  color: 'var(--chalk-white)',
                  fontSize: '0.875rem',
                  lineHeight: '1.75',
                  fontFamily: 'monospace',
                  resize: 'none',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-yellow)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--chalk-border)'}
              />
            </div>

            {/* Contadores */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--chalk-dim)'
            }}>
              <span>📝 {contarPalavras(texto)} palavras</span>
              <span>📄 {contarLinhas(texto)} linhas</span>
              <span>✏️ {texto.length} caracteres</span>
            </div>

            {/* Botão Analisar */}
            <button
              onClick={analisarRedacao}
              disabled={analisando || contarPalavras(texto) < 100}
              className="btn btn-yellow"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                background: (analisando || contarPalavras(texto) < 100) ? 'rgba(255, 214, 10, 0.5)' : 'var(--accent-yellow)',
                color: 'var(--chalk-dark)',
                border: '2px solid var(--chalk-border)',
                borderRadius: '0.5rem',
                cursor: (analisando || contarPalavras(texto) < 100) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: (analisando || contarPalavras(texto) < 100) ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!analisando && contarPalavras(texto) >= 100) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 214, 10, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {analisando ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span> Analisando sua redação...
                </span>
              ) : (
                '🚀 Analisar Redação'
              )}
            </button>

            {contarPalavras(texto) < 100 && texto.length > 0 && (
              <p style={{
                textAlign: 'center',
                color: 'var(--accent-yellow)',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }}>
                Escreva pelo menos 100 palavras para análise ({100 - contarPalavras(texto)} restantes)
              </p>
            )}
          </div>
        ) : analise && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Nota Total */}
            <div className="card" style={{
              background: 'var(--chalk-board)',
              border: '3px solid var(--chalk-border)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'var(--chalk-white)',
                fontFamily: 'var(--font-chalk)'
              }}>
                📊 Resultado da Análise
              </h2>
              <div style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: analise.notaTotal >= 800 ? 'var(--accent-green)' :
                       analise.notaTotal >= 600 ? 'var(--accent-blue)' :
                       analise.notaTotal >= 400 ? 'var(--accent-yellow)' : 'var(--accent-pink)'
              }}>
                {analise.notaTotal}
              </div>
              <p style={{ color: 'var(--chalk-dim)' }}>de 1000 pontos</p>
              <p style={{ marginTop: '1rem', color: 'var(--chalk-white)' }}>
                {analise.feedbackGeral}
              </p>
            </div>

            {/* Competências */}
            <div className="card" style={{
              background: 'var(--chalk-board)',
              border: '3px solid var(--chalk-border)',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'var(--chalk-white)',
                fontFamily: 'var(--font-chalk)'
              }}>
                📋 Análise por Competência
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {analise.competencias.map((comp) => (
                  <div
                    key={comp.id}
                    className="chalkboard-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h4 style={{ fontWeight: 'bold', color: 'var(--chalk-white)' }}>
                          {comp.nome}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                          {comp.descricao}
                        </p>
                      </div>
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: comp.nota >= 160 ? 'var(--accent-green)' :
                               comp.nota >= 120 ? 'var(--accent-blue)' :
                               comp.nota >= 80 ? 'var(--accent-yellow)' : 'var(--accent-pink)'
                      }}>
                        {comp.nota}
                      </div>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '0.5rem'
                    }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${(comp.nota / 200) * 100}%`,
                          background: `linear-gradient(to right, ${comp.cor})`,
                          transition: 'width 0.5s ease'
                        }}
                      />
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--chalk-white)',
                      marginBottom: '0.5rem'
                    }}>
                      {comp.feedback}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {comp.sugestoes.map((sug, idx) => (
                        <span
                          key={idx}
                          className="badge"
                          style={{
                            fontSize: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            color: 'var(--chalk-dim)'
                          }}
                        >
                          💡 {sug}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pontos Fortes e a Melhorar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              <div className="card" style={{
                background: 'var(--chalk-board)',
                border: '3px solid var(--chalk-border)',
                borderRadius: '0.5rem',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-green)',
                  marginBottom: '1rem'
                }}>
                  ✅ Pontos Fortes
                </h3>
                {analise.pontosFortes.length > 0 ? (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {analise.pontosFortes.map((ponto, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--chalk-white)'
                        }}
                      >
                        <span style={{ color: 'var(--accent-green)' }}>•</span>
                        {ponto}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                    Continue praticando para identificar seus pontos fortes.
                  </p>
                )}
              </div>

              <div className="card" style={{
                background: 'var(--chalk-board)',
                border: '3px solid var(--chalk-border)',
                borderRadius: '0.5rem',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-yellow)',
                  marginBottom: '1rem'
                }}>
                  ⚠️ Pontos a Melhorar
                </h3>
                {analise.pontosMelhorar.length > 0 ? (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {analise.pontosMelhorar.map((ponto, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--chalk-white)'
                        }}
                      >
                        <span style={{ color: 'var(--accent-yellow)' }}>•</span>
                        {ponto}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: 'var(--chalk-dim)', fontSize: '0.875rem' }}>
                    Parabéns! Sua redação está bem estruturada.
                  </p>
                )}
              </div>
            </div>

            {/* Repertórios Sugeridos */}
            <div className="card" style={{
              background: 'var(--chalk-board)',
              border: '3px solid var(--chalk-border)',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: 'var(--accent-pink)',
                marginBottom: '1rem'
              }}>
                📚 Repertórios Sugeridos
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--chalk-dim)',
                marginBottom: '1rem'
              }}>
                Use estas referências para enriquecer suas próximas redações:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {analise.repertorios.map((rep, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      color: 'var(--chalk-white)'
                    }}
                  >
                    {rep}
                  </div>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={novaRedacao}
                className="btn btn-yellow"
                style={{
                  padding: '0.75rem 2rem',
                  background: 'var(--accent-yellow)',
                  color: 'var(--chalk-dark)',
                  border: '2px solid var(--chalk-border)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 214, 10, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ✨ Escrever Nova Redação
              </button>
            </div>
          </div>
        )}

        {/* Dicas */}
        {abaSelecionada === 'escrever' && (
          <div className="card" style={{
            marginTop: '2rem',
            background: 'var(--chalk-board)',
            border: '3px solid var(--chalk-border)',
            borderRadius: '0.5rem',
            padding: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-chalk)'
            }}>
              💡 Dicas para uma Redação Nota 1000
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              <div className="chalkboard-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: 'var(--accent-blue)',
                  marginBottom: '0.5rem'
                }}>
                  📝 Estrutura
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                  Introdução com tese clara, 2 parágrafos de desenvolvimento e conclusão com proposta.
                </p>
              </div>
              <div className="chalkboard-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: 'var(--accent-pink)',
                  marginBottom: '0.5rem'
                }}>
                  📚 Repertório
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                  Use citações de filósofos, dados estatísticos e referências culturais.
                </p>
              </div>
              <div className="chalkboard-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: 'var(--accent-green)',
                  marginBottom: '0.5rem'
                }}>
                  🔗 Conectivos
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                  Use além disso, portanto, contudo, dessa forma para conectar ideias.
                </p>
              </div>
              <div className="chalkboard-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: 'var(--accent-orange)',
                  marginBottom: '0.5rem'
                }}>
                  🎯 Proposta
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                  Inclua agente, ação, meio, finalidade e detalhamento na intervenção.
                </p>
              </div>
              <div className="chalkboard-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: 'var(--accent-pink)',
                  marginBottom: '0.5rem'
                }}>
                  ✏️ Revisão
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                  Revise ortografia, concordância e coerência antes de enviar.
                </p>
              </div>
              <div className="chalkboard-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontWeight: 'bold',
                  color: 'var(--accent-yellow)',
                  marginBottom: '0.5rem'
                }}>
                  📏 Tamanho
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                  Escreva entre 25 e 30 linhas para um bom desenvolvimento.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer" style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '2px solid var(--chalk-border)',
        textAlign: 'center'
      }}>
        <a
          href="/enem"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-yellow)',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Voltar para ENEM-IA
        </a>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
