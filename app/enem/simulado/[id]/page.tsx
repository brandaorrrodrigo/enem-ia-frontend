'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Questao } from '@/lib/types';
import { SimuladoConfig, salvarSimuladoEmAndamento, carregarSimuladoEmAndamento } from '@/lib/questions';
import FloatingNav from '@/components/FloatingNav';
import FloatingBackButton from '@/components/FloatingBackButton';

export default function SimuladoPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const simuladoId = params.id as string;

  const [simulado, setSimulado] = useState<SimuladoConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<number | null>(null);

  useEffect(() => {
    const simuladoSalvo = carregarSimuladoEmAndamento();

    if (!simuladoSalvo) {
      setError('Simulado não encontrado. Inicie um novo simulado.');
      setLoading(false);
      return;
    }

    if (simuladoSalvo.id !== simuladoId) {
      setError('ID do simulado não corresponde.');
      setLoading(false);
      return;
    }

    setSimulado(simuladoSalvo);
    setLoading(false);
  }, [simuladoId]);

  // Atualiza alternativa selecionada quando muda de questão
  useEffect(() => {
    if (simulado) {
      const questaoAtual = simulado.questoes[simulado.questaoAtual];
      if (questaoAtual) {
        const respostaExistente = simulado.respostas[questaoAtual.id];
        setAlternativaSelecionada(respostaExistente !== undefined ? respostaExistente : null);
      }
    }
  }, [simulado?.questaoAtual]);

  const questaoAtual = simulado?.questoes[simulado.questaoAtual];
  const indiceAtual = simulado?.questaoAtual ?? 0;
  const totalQuestoes = simulado?.questoes.length ?? 0;
  const modoCorrecao = simulado?.modoCorrecao ?? 'final';

  // Verifica se a questão atual já foi confirmada (modo imediato)
  const questaoConfirmada = questaoAtual
    ? simulado?.respostasConfirmadas?.[questaoAtual.id] === true
    : false;

  // Seleciona alternativa (ainda não confirma)
  const selecionarAlternativa = (alternativaIndex: number) => {
    if (!simulado || !questaoAtual || questaoConfirmada) return;
    setAlternativaSelecionada(alternativaIndex);
  };

  // Confirma a resposta (para modo imediato)
  const confirmarResposta = () => {
    if (!simulado || !questaoAtual || alternativaSelecionada === null) return;

    const novasRespostas = { ...simulado.respostas, [questaoAtual.id]: alternativaSelecionada };
    const novasConfirmadas = { ...simulado.respostasConfirmadas, [questaoAtual.id]: true };

    const simuladoAtualizado: SimuladoConfig = {
      ...simulado,
      respostas: novasRespostas,
      respostasConfirmadas: novasConfirmadas
    };

    setSimulado(simuladoAtualizado);
    salvarSimuladoEmAndamento(simuladoAtualizado);
  };

  // Marca resposta (modo final - sem confirmação individual)
  const marcarResposta = () => {
    if (!simulado || !questaoAtual || alternativaSelecionada === null) return;

    const novasRespostas = { ...simulado.respostas, [questaoAtual.id]: alternativaSelecionada };

    const simuladoAtualizado: SimuladoConfig = {
      ...simulado,
      respostas: novasRespostas
    };

    setSimulado(simuladoAtualizado);
    salvarSimuladoEmAndamento(simuladoAtualizado);
  };

  const irParaQuestao = (indice: number) => {
    if (!simulado || indice < 0 || indice >= totalQuestoes) return;

    // No modo final, salva a resposta atual antes de mudar
    if (modoCorrecao === 'final' && alternativaSelecionada !== null && questaoAtual) {
      const novasRespostas = { ...simulado.respostas, [questaoAtual.id]: alternativaSelecionada };
      const simuladoAtualizado: SimuladoConfig = {
        ...simulado,
        respostas: novasRespostas,
        questaoAtual: indice
      };
      setSimulado(simuladoAtualizado);
      salvarSimuladoEmAndamento(simuladoAtualizado);
    } else {
      const simuladoAtualizado: SimuladoConfig = { ...simulado, questaoAtual: indice };
      setSimulado(simuladoAtualizado);
      salvarSimuladoEmAndamento(simuladoAtualizado);
    }
  };

  const proximaQuestao = () => {
    if (indiceAtual < totalQuestoes - 1) {
      irParaQuestao(indiceAtual + 1);
    }
  };

  const finalizarSimulado = () => {
    if (!simulado) return;

    const respondidas = Object.keys(simulado.respostas).length;
    const confirmacao = confirm(
      `Você respondeu ${respondidas} de ${totalQuestoes} questões.\n\nDeseja realmente finalizar o simulado?`
    );

    if (!confirmacao) return;

    let acertos = 0;
    const detalhes: any[] = [];

    simulado.questoes.forEach(q => {
      const resposta = simulado.respostas[q.id];
      const acertou = resposta === q.correta;
      if (acertou) acertos++;

      detalhes.push({
        id: q.id,
        area: q.area,
        disciplina: q.disciplina,
        assunto: q.assunto,
        enunciado: q.enunciado,
        alternativas: q.alternativas,
        correta: q.correta,
        respostaUsuario: resposta,
        acertou,
        explicacao: q.explicacao
      });
    });

    const nota = Math.round((acertos / totalQuestoes) * 1000);
    const tempoGasto = Math.round((Date.now() - new Date(simulado.inicio).getTime()) / 60000);

    const fpGanho = acertos * 10 + (nota >= 700 ? 100 : nota >= 500 ? 50 : 20);
    const pontosGanhos = acertos * 5 + (nota >= 700 ? 50 : nota >= 500 ? 25 : 10);

    const resultado = {
      id: simulado.id,
      acertos,
      total: totalQuestoes,
      nota,
      tempoMinutos: tempoGasto,
      area: simulado.area,
      detalhes,
      data: new Date().toISOString(),
      fpGanho,
      pontosGanhos
    };

    localStorage.setItem('ultimo_resultado_simulado', JSON.stringify(resultado));

    // Histórico
    const historicoStr = localStorage.getItem('historico_simulados') || '[]';
    const historico = JSON.parse(historicoStr);
    historico.unshift({
      id: resultado.id,
      data: resultado.data,
      nota: resultado.nota,
      acertos: resultado.acertos,
      total: resultado.total,
      area: resultado.area,
      tempoMinutos: resultado.tempoMinutos
    });
    localStorage.setItem('historico_simulados', JSON.stringify(historico.slice(0, 50)));

    // FP e Pontos
    const fpAtual = parseInt(localStorage.getItem('fp_total') || '0');
    const pontosAtual = parseInt(localStorage.getItem('pontos_total') || '0');
    localStorage.setItem('fp_total', String(fpAtual + fpGanho));
    localStorage.setItem('pontos_total', String(pontosAtual + pontosGanhos));

    // Limpar simulado em andamento
    localStorage.removeItem('simulado_em_andamento');

    setMostrarResultado(true);
  };

  // ========== TELA DE RESULTADO ==========
  if (mostrarResultado) {
    const resultadoStr = localStorage.getItem('ultimo_resultado_simulado');
    if (!resultadoStr) return null;
    const resultado = JSON.parse(resultadoStr);
    const porcentagem = Math.round((resultado.acertos / resultado.total) * 100);

    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--chalkboard-bg)',
        color: 'var(--chalk-white)',
        paddingTop: '80px',
        paddingBottom: '40px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}>
      <FloatingBackButton />
        <FloatingNav />

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div className="header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '12px',
              color: 'var(--accent-yellow)',
              textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
            }}>
              Simulado Finalizado!
            </h1>
            <p style={{ color: 'var(--chalk-dim)', fontSize: '1.1rem' }}>
              Confira seu desempenho
            </p>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div className="stat-item" style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div className="stat-number" style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--accent-green)',
                marginBottom: '8px'
              }}>
                {resultado.acertos}/{resultado.total}
              </div>
              <div className="stat-label" style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.9rem'
              }}>
                Acertos
              </div>
            </div>

            <div className="stat-item" style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div className="stat-number" style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--accent-blue)',
                marginBottom: '8px'
              }}>
                {porcentagem}%
              </div>
              <div className="stat-label" style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.9rem'
              }}>
                Aproveitamento
              </div>
            </div>

            <div className="stat-item" style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div className="stat-number" style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--accent-yellow)',
                marginBottom: '8px'
              }}>
                {resultado.nota}
              </div>
              <div className="stat-label" style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.9rem'
              }}>
                Nota TRI
              </div>
            </div>

            <div className="stat-item" style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '24px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div className="stat-number" style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--accent-purple)',
                marginBottom: '8px'
              }}>
                {resultado.tempoMinutos}min
              </div>
              <div className="stat-label" style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.9rem'
              }}>
                Tempo
              </div>
            </div>
          </div>

          {/* Recompensas */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(255,193,7,0.15) 0%, rgba(156,39,176,0.15) 100%)',
            border: '2px solid var(--accent-yellow)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <h3 className="card-title" style={{
              fontSize: '1.4rem',
              marginBottom: '16px',
              color: 'var(--accent-yellow)'
            }}>
              Recompensas Ganhas
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '60px' }}>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-yellow)',
                  marginBottom: '4px'
                }}>
                  +{resultado.fpGanho}
                </div>
                <div style={{ color: 'var(--chalk-dim)', fontSize: '0.9rem' }}>FP</div>
              </div>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--accent-purple)',
                  marginBottom: '4px'
                }}>
                  +{resultado.pontosGanhos}
                </div>
                <div style={{ color: 'var(--chalk-dim)', fontSize: '0.9rem' }}>Pontos</div>
              </div>
            </div>
          </div>

          {/* Mensagem motivacional */}
          <div className="card" style={{
            background: porcentagem >= 70
              ? 'rgba(76,175,80,0.2)'
              : porcentagem >= 50
              ? 'rgba(255,193,7,0.2)'
              : 'rgba(244,67,54,0.2)',
            border: `2px solid ${
              porcentagem >= 70
                ? 'var(--accent-green)'
                : porcentagem >= 50
                ? 'var(--accent-yellow)'
                : 'var(--accent-red)'
            }`,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {porcentagem >= 70
                ? 'Excelente! Continue assim!'
                : porcentagem >= 50
                ? 'Bom trabalho! Pode melhorar!'
                : 'Continue estudando! Você consegue!'}
            </p>
          </div>

          {/* Botões de ação */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '40px'
          }}>
            <button
              onClick={() => router.push('/enem/simulado')}
              className="btn btn-yellow"
              style={{
                background: 'var(--accent-yellow)',
                color: '#000',
                padding: '14px 32px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Novo Simulado
            </button>
            <button
              onClick={() => router.push('/enem')}
              className="btn"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--chalk-white)',
                padding: '14px 32px',
                borderRadius: '8px',
                border: '2px solid rgba(255,255,255,0.3)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Voltar ao Menu
            </button>
          </div>

          {/* Gabarito Comentado */}
          <div className="card" style={{
            background: 'rgba(255,255,255,0.05)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '32px'
          }}>
            <h2 className="card-title" style={{
              fontSize: '1.8rem',
              marginBottom: '24px',
              color: 'var(--chalk-white)',
              borderBottom: '2px solid rgba(255,255,255,0.2)',
              paddingBottom: '12px'
            }}>
              Gabarito Comentado
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {resultado.detalhes.map((d: any, idx: number) => (
                <div
                  key={d.id}
                  className="chalkboard-card"
                  style={{
                    background: d.acertou
                      ? 'rgba(76,175,80,0.1)'
                      : 'rgba(244,67,54,0.1)',
                    border: `2px solid ${d.acertou ? 'var(--accent-green)' : 'var(--accent-red)'}`,
                    borderRadius: '12px',
                    padding: '20px'
                  }}
                >
                  {/* Tags da questão */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <span className="badge" style={{
                      background: d.acertou ? 'var(--accent-green)' : 'var(--accent-red)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {d.acertou ? '✓' : '✗'} Q{idx + 1}
                    </span>
                    <span className="badge" style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: 'var(--chalk-white)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.85rem'
                    }}>
                      {d.area}
                    </span>
                    {d.disciplina && (
                      <span className="badge" style={{
                        background: 'rgba(33,150,243,0.2)',
                        color: 'var(--accent-blue)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}>
                        {d.disciplina}
                      </span>
                    )}
                    {d.assunto && (
                      <span className="badge" style={{
                        background: 'rgba(156,39,176,0.2)',
                        color: 'var(--accent-purple)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}>
                        {d.assunto}
                      </span>
                    )}
                  </div>

                  {/* Enunciado */}
                  <p style={{
                    color: 'var(--chalk-white)',
                    marginBottom: '16px',
                    lineHeight: '1.6'
                  }}>
                    {d.enunciado}
                  </p>

                  {/* Alternativas */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {d.alternativas.map((alt: string, i: number) => (
                      <div
                        key={i}
                        style={{
                          background: i === d.correta
                            ? 'rgba(76,175,80,0.3)'
                            : i === d.respostaUsuario && !d.acertou
                            ? 'rgba(244,67,54,0.3)'
                            : 'rgba(255,255,255,0.05)',
                          border: `2px solid ${
                            i === d.correta
                              ? 'var(--accent-green)'
                              : i === d.respostaUsuario && !d.acertou
                              ? 'var(--accent-red)'
                              : 'transparent'
                          }`,
                          borderRadius: '8px',
                          padding: '12px',
                          color: i === d.correta || (i === d.respostaUsuario && !d.acertou)
                            ? 'var(--chalk-white)'
                            : 'var(--chalk-dim)',
                          fontSize: '0.95rem'
                        }}
                      >
                        {String.fromCharCode(65 + i)}) {alt}
                        {i === d.correta && ' ✓ Correta'}
                        {i === d.respostaUsuario && i !== d.correta && ' ← Sua resposta'}
                      </div>
                    ))}
                    {d.respostaUsuario === undefined && (
                      <div style={{
                        color: 'var(--accent-yellow)',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        padding: '8px'
                      }}>
                        ⚠️ Questão não respondida
                      </div>
                    )}
                  </div>

                  {/* Explicação */}
                  <div style={{
                    background: 'rgba(33,150,243,0.1)',
                    border: '2px solid var(--accent-blue)',
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <p style={{
                      color: 'var(--accent-blue)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                      <strong style={{ display: 'block', marginBottom: '8px' }}>💡 Explicação:</strong>
                      {d.explicacao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="footer" style={{
            marginTop: '40px',
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '2px solid rgba(255,255,255,0.1)'
          }}>
            <button
              onClick={() => router.push('/enem')}
              style={{
                background: 'transparent',
                color: 'var(--chalk-dim)',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              ← Voltar ao menu principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== TELA DE LOADING ==========
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--chalkboard-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px',
            animation: 'spin 1s linear infinite'
          }}>
            🔄
          </div>
          <p style={{ color: 'var(--chalk-white)', fontSize: '1.2rem' }}>
            Carregando simulado...
          </p>
        </div>
      </div>
    );
  }

  // ========== TELA DE ERRO ==========
  if (error || !simulado) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--chalkboard-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}>
        <FloatingNav />
        <div className="card" style={{
          maxWidth: '500px',
          background: 'rgba(255,255,255,0.05)',
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: 'var(--accent-red)',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            ⚠️ Erro
          </h2>
          <p style={{
            color: 'var(--chalk-dim)',
            marginBottom: '24px',
            fontSize: '1.1rem'
          }}>
            {error || 'Simulado não encontrado'}
          </p>
          <button
            onClick={() => router.push('/enem/simulado')}
            className="btn btn-yellow"
            style={{
              background: 'var(--accent-yellow)',
              color: '#000',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Iniciar Novo Simulado
          </button>
        </div>
      </div>
    );
  }

  if (!questaoAtual) return null;

  const progresso = Math.round((Object.keys(simulado.respostas).length / totalQuestoes) * 100);

  // ========== TELA DO SIMULADO ==========
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--chalkboard-bg)',
      color: 'var(--chalk-white)',
      paddingTop: '80px',
      paddingBottom: '40px',
      paddingLeft: '16px',
      paddingRight: '16px'
    }}>
      <FloatingNav />

      {/* Header com progresso */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '24px' }}>
        <div className="card" style={{
          background: 'rgba(255,255,255,0.05)',
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <span style={{
              color: 'var(--chalk-white)',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              Questão {indiceAtual + 1} de {totalQuestoes}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge" style={{
                background: modoCorrecao === 'imediato'
                  ? 'rgba(255,193,7,0.2)'
                  : 'rgba(156,39,176,0.2)',
                color: modoCorrecao === 'imediato'
                  ? 'var(--accent-yellow)'
                  : 'var(--accent-purple)',
                border: `1px solid ${modoCorrecao === 'imediato' ? 'var(--accent-yellow)' : 'var(--accent-purple)'}`,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                {modoCorrecao === 'imediato' ? '⚡ Correção Imediata' : '🎓 Gabarito no Final'}
              </span>
              <span className="badge" style={{
                background: 'rgba(76,175,80,0.2)',
                color: 'var(--accent-green)',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                {Object.keys(simulado.respostas).length} respondidas
              </span>
            </div>
          </div>

          {/* Barra de progresso */}
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            height: '12px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, var(--accent-green) 0%, #4caf50 100%)',
              height: '100%',
              width: `${progresso}%`,
              transition: 'width 0.3s ease',
              borderRadius: '20px'
            }}></div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
            fontSize: '0.9rem'
          }}>
            <span style={{ color: 'var(--chalk-dim)' }}>{progresso}% completo</span>
            <span style={{ color: 'var(--accent-yellow)', fontWeight: '500' }}>
              {totalQuestoes - Object.keys(simulado.respostas).length} restantes
            </span>
          </div>
        </div>
      </div>

      {/* Card da questão */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card" style={{
          background: 'rgba(255,255,255,0.05)',
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          padding: '32px'
        }}>
          {/* Tags da questão */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <span className="badge" style={{
              background: 'var(--accent-green)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              Q{indiceAtual + 1}
            </span>
            <span className="badge" style={{
              background: 'rgba(33,150,243,0.2)',
              color: 'var(--accent-blue)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem'
            }}>
              {questaoAtual.area}
            </span>
            {questaoAtual.disciplina && (
              <span className="badge" style={{
                background: 'rgba(156,39,176,0.2)',
                color: 'var(--accent-purple)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                {questaoAtual.disciplina}
              </span>
            )}
            {questaoAtual.dificuldade && (
              <span className="badge" style={{
                background: questaoAtual.dificuldade === 'facil'
                  ? 'rgba(76,175,80,0.2)'
                  : questaoAtual.dificuldade === 'medio'
                  ? 'rgba(255,193,7,0.2)'
                  : 'rgba(244,67,54,0.2)',
                color: questaoAtual.dificuldade === 'facil'
                  ? 'var(--accent-green)'
                  : questaoAtual.dificuldade === 'medio'
                  ? 'var(--accent-yellow)'
                  : 'var(--accent-red)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                {questaoAtual.dificuldade}
              </span>
            )}
          </div>

          {/* Enunciado */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              color: 'var(--chalk-white)',
              fontSize: '1.15rem',
              lineHeight: '1.8'
            }}>
              {questaoAtual.enunciado}
            </p>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            margin: '24px 0'
          }}></div>

          {/* Alternativas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {questaoAtual.alternativas.map((alternativa, index) => {
              const letra = String.fromCharCode(65 + index);
              const estaSelecionada = alternativaSelecionada === index;
              const eCorreta = index === questaoAtual.correta;
              const respostaUsuario = simulado.respostas[questaoAtual.id];
              const usuarioRespondeu = respostaUsuario !== undefined;
              const usuarioAcertou = respostaUsuario === questaoAtual.correta;

              // Determina o estilo baseado no modo
              let backgroundStyle = 'rgba(255,255,255,0.05)';
              let borderStyle = 'rgba(255,255,255,0.2)';
              let textColor = 'var(--chalk-white)';

              if (modoCorrecao === 'imediato' && questaoConfirmada) {
                // Modo imediato: mostrar resultado após confirmação
                if (eCorreta) {
                  backgroundStyle = 'rgba(76,175,80,0.3)';
                  borderStyle = 'var(--accent-green)';
                } else if (index === respostaUsuario && !usuarioAcertou) {
                  backgroundStyle = 'rgba(244,67,54,0.3)';
                  borderStyle = 'var(--accent-red)';
                } else {
                  backgroundStyle = 'rgba(255,255,255,0.05)';
                  borderStyle = 'rgba(255,255,255,0.1)';
                  textColor = 'var(--chalk-dim)';
                }
              } else {
                // Ainda não confirmou ou modo final
                if (estaSelecionada) {
                  backgroundStyle = 'rgba(76,175,80,0.2)';
                  borderStyle = 'var(--accent-green)';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => selecionarAlternativa(index)}
                  disabled={questaoConfirmada}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${borderStyle}`,
                    background: backgroundStyle,
                    color: textColor,
                    cursor: questaoConfirmada ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                  }}
                >
                  <span style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                    color: modoCorrecao === 'imediato' && questaoConfirmada
                      ? eCorreta
                        ? 'var(--accent-green)'
                        : index === respostaUsuario
                        ? 'var(--accent-red)'
                        : 'rgba(255,255,255,0.4)'
                      : estaSelecionada
                      ? 'var(--accent-green)'
                      : 'rgba(255,255,255,0.6)'
                  }}>
                    {letra})
                  </span>
                  <span style={{ flex: 1, lineHeight: '1.6' }}>
                    {alternativa}
                  </span>
                  {/* Ícones de feedback */}
                  {modoCorrecao === 'imediato' && questaoConfirmada && eCorreta && (
                    <span style={{ color: 'var(--accent-green)', fontSize: '1.5rem', flexShrink: 0 }}>✓</span>
                  )}
                  {modoCorrecao === 'imediato' && questaoConfirmada && index === respostaUsuario && !usuarioAcertou && (
                    <span style={{ color: 'var(--accent-red)', fontSize: '1.5rem', flexShrink: 0 }}>✗</span>
                  )}
                  {!questaoConfirmada && estaSelecionada && (
                    <span style={{ color: 'var(--accent-green)', fontSize: '1.5rem', flexShrink: 0 }}>●</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explicação (modo imediato após confirmação) */}
          {modoCorrecao === 'imediato' && questaoConfirmada && (
            <div style={{
              background: 'rgba(33,150,243,0.1)',
              border: '2px solid var(--accent-blue)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <h4 style={{
                color: 'var(--accent-blue)',
                fontWeight: 'bold',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                💡 Explicação
              </h4>
              <p style={{
                color: 'var(--chalk-white)',
                lineHeight: '1.6'
              }}>
                {questaoAtual.explicacao}
              </p>
            </div>
          )}

          {/* Aviso de ultima questao */}
          {indiceAtual === totalQuestoes - 1 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(255,193,7,0.2) 100%)',
              border: '2px solid var(--accent-green)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <p style={{
                color: 'var(--accent-green)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                🎯 Esta e a ultima questao!
              </p>
              <p style={{
                color: 'var(--chalk-dim)',
                fontSize: '0.95rem'
              }}>
                Apos responder, clique em <strong style={{ color: 'var(--accent-green)' }}>"Finalizar Simulado"</strong> para ver seus resultados.
              </p>
            </div>
          )}

          {/* Botões de ação */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <button
              onClick={() => irParaQuestao(indiceAtual - 1)}
              disabled={indiceAtual === 0}
              className="btn"
              style={{
                flex: '1 1 auto',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                background: indiceAtual === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                color: indiceAtual === 0 ? 'rgba(255,255,255,0.3)' : 'var(--chalk-white)',
                border: `2px solid ${indiceAtual === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                cursor: indiceAtual === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Anterior
            </button>

            {/* Botão central: Confirmar (imediato) ou Marcar (final) */}
            {modoCorrecao === 'imediato' && !questaoConfirmada && (
              <button
                onClick={confirmarResposta}
                disabled={alternativaSelecionada === null}
                className="btn btn-yellow"
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  background: alternativaSelecionada === null
                    ? 'rgba(255,193,7,0.2)'
                    : 'var(--accent-yellow)',
                  color: alternativaSelecionada === null ? 'rgba(255,193,7,0.5)' : '#000',
                  border: 'none',
                  cursor: alternativaSelecionada === null ? 'not-allowed' : 'pointer'
                }}
              >
                ✓ Confirmar Resposta
              </button>
            )}

            {modoCorrecao === 'final' && alternativaSelecionada !== null && simulado.respostas[questaoAtual.id] !== alternativaSelecionada && (
              <button
                onClick={marcarResposta}
                className="btn"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,193,7,0.2)',
                  border: '2px solid var(--accent-yellow)',
                  color: 'var(--accent-yellow)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                💾 Salvar Resposta
              </button>
            )}

            {/* Botao Finalizar - destaque maior na ultima questao */}
            <button
              onClick={finalizarSimulado}
              className="btn"
              style={{
                padding: indiceAtual === totalQuestoes - 1 ? '14px 32px' : '12px 24px',
                background: indiceAtual === totalQuestoes - 1
                  ? 'var(--accent-green)'
                  : 'rgba(244,67,54,0.2)',
                border: indiceAtual === totalQuestoes - 1
                  ? 'none'
                  : '2px solid var(--accent-red)',
                color: indiceAtual === totalQuestoes - 1
                  ? '#fff'
                  : 'var(--accent-red)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: indiceAtual === totalQuestoes - 1 ? 'bold' : '600',
                fontSize: indiceAtual === totalQuestoes - 1 ? '1.1rem' : '1rem',
                flex: indiceAtual === totalQuestoes - 1 ? '1 1 auto' : 'none',
                boxShadow: indiceAtual === totalQuestoes - 1 ? '0 4px 15px rgba(76,175,80,0.4)' : 'none'
              }}
            >
              {indiceAtual === totalQuestoes - 1 ? '✅ Finalizar Simulado e Ver Resultado' : '🏁 Finalizar'}
            </button>

            {/* Botao Proxima - escondido na ultima questao */}
            {indiceAtual < totalQuestoes - 1 && (
              <button
                onClick={proximaQuestao}
                className="btn btn-yellow"
                style={{
                  flex: '1 1 auto',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  background: 'var(--accent-yellow)',
                  color: '#000',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Próxima →
              </button>
            )}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            margin: '24px 0'
          }}></div>

          {/* Navegação rápida */}
          <div>
            <p style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.9rem',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              🧭 Navegação Rápida
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {simulado.questoes.map((q, idx) => {
                const respondida = simulado.respostas[q.id] !== undefined;
                const confirmada = simulado.respostasConfirmadas?.[q.id] === true;
                const atual = idx === indiceAtual;

                // No modo imediato, mostra verde/vermelho se já confirmou
                let bgColor = 'rgba(255,255,255,0.1)';
                let textColor = 'rgba(255,255,255,0.6)';
                let borderColor = 'transparent';
                let scale = '1';

                if (atual) {
                  bgColor = 'var(--accent-green)';
                  textColor = '#fff';
                  scale = '1.1';
                } else if (modoCorrecao === 'imediato' && confirmada) {
                  const acertou = simulado.respostas[q.id] === q.correta;
                  bgColor = acertou ? 'rgba(76,175,80,0.5)' : 'rgba(244,67,54,0.5)';
                  textColor = acertou ? 'var(--accent-green)' : 'var(--accent-red)';
                } else if (respondida) {
                  bgColor = 'rgba(76,175,80,0.3)';
                  textColor = 'var(--accent-green)';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => irParaQuestao(idx)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      background: bgColor,
                      color: textColor,
                      border: `2px solid ${borderColor}`,
                      cursor: 'pointer',
                      transform: `scale(${scale})`
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
