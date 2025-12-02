/**
 * Página de Execução de Simulado ENEM
 *
 * Permite ao usuário:
 * - Ver questões uma por vez (enunciado + 5 alternativas A-E)
 * - Marcar/alterar respostas
 * - Navegar entre questões
 * - Finalizar simulado
 * - Ver resultado com nota TRI
 * - Comparar com nota de corte
 * - Revisar questões erradas
 *
 * Fluxo de API:
 * 1. Carrega dados do localStorage (vindos da página anterior)
 * 2. Para cada resposta: POST /api/enem/simulados/answer
 * 3. Ao finalizar: POST /api/enem/simulados/finish
 * 4. (Opcional) POST /api/enem/simulados/compare-score
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  BACKEND_URL,
  type Questao,
  type AnswerRequest,
  type AnswerResponse,
  type FinishRequest,
  type FinishResponse,
  type CompareScoreRequest,
  type CompareScoreResponse,
  indiceParaLetra,
} from '@/types/simulado';
import ResultModal from '@/components/enem/ResultModal';

interface SimuladoAtual {
  usuario_simulado_id: string;
  simulado_id: string;
  questoes: Questao[];
  quantidade: number;
  disciplina: string | null;
}

export default function SimuladoExecucaoPage() {
  const params = useParams();
  const router = useRouter();
  const usuarioSimuladoId = params.id as string;

  // Estados principais
  const [simulado, setSimulado] = useState<SimuladoAtual | null>(null);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<Map<number, number | null>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de finalização
  const [finalizando, setFinalizando] = useState(false);
  const [resultado, setResultado] = useState<FinishResponse | null>(null);
  const [comparacao, setComparacao] = useState<CompareScoreResponse | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mostrarErros, setMostrarErros] = useState(false);

  // Email do usuário (por enquanto mockado)
  const userId = 'aluno@example.com';

  /**
   * PASSO 1: Carregar dados do simulado do localStorage
   */
  useEffect(() => {
    const dados = localStorage.getItem('simulado_atual');

    if (!dados) {
      setError('Simulado não encontrado. Redirecionando...');
      setTimeout(() => router.push('/simulado'), 2000);
      return;
    }

    try {
      const parsed: SimuladoAtual = JSON.parse(dados);

      // Valida se o ID bate
      if (parsed.usuario_simulado_id !== usuarioSimuladoId) {
        throw new Error('ID do simulado não corresponde');
      }

      setSimulado(parsed);
      console.log('📚 Simulado carregado:', parsed);
    } catch (err: any) {
      console.error('❌ Erro ao carregar simulado:', err);
      setError('Erro ao carregar simulado. Tente novamente.');
      setTimeout(() => router.push('/simulado'), 2000);
    }
  }, [usuarioSimuladoId, router]);

  /**
   * PASSO 2: Marcar/Alterar Resposta
   *
   * Chama: POST /api/enem/simulados/answer
   * Atualiza estado local de respostas
   */
  async function marcarResposta(alternativaIndice: number) {
    if (!simulado) return;

    const questao = simulado.questoes[questaoAtual];

    try {
      setLoading(true);
      setError(null);

      console.log(`📝 Marcando resposta: Q${questao.id} → ${indiceParaLetra(alternativaIndice)}`);

      // Atualiza estado local imediatamente (UX otimista)
      const novasRespostas = new Map(respostas);
      novasRespostas.set(questao.id, alternativaIndice);
      setRespostas(novasRespostas);

      // Monta request
      const requestBody: AnswerRequest = {
        user_id: userId,
        simulado_id: usuarioSimuladoId,
        questao_id: questao.id,
        alternativa_marcada: alternativaIndice,
      };

      // Chama API
      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Erro ${response.status}`);
      }

      const data: AnswerResponse = await response.json();
      console.log('✅ Resposta salva:', data);

    } catch (err: any) {
      console.error('❌ Erro ao salvar resposta:', err);
      setError('Erro ao salvar resposta. Tente novamente.');

      // Reverte mudança otimista
      const novasRespostas = new Map(respostas);
      novasRespostas.delete(questao.id);
      setRespostas(novasRespostas);
    } finally {
      setLoading(false);
    }
  }

  /**
   * PASSO 3: Finalizar Simulado
   *
   * Chama: POST /api/enem/simulados/finish
   * Recebe: { nota, acertos, erros, erros_detalhados }
   */
  async function finalizarSimulado() {
    if (!simulado) return;

    // Confirma finalização
    const respondidas = respostas.size;
    const total = simulado.questoes.length;

    if (respondidas < total) {
      const confirma = window.confirm(
        `Você respondeu ${respondidas} de ${total} questões.\n\n` +
        `Questões não respondidas serão marcadas como erradas.\n\n` +
        `Deseja realmente finalizar?`
      );

      if (!confirma) return;
    }

    try {
      setFinalizando(true);
      setError(null);

      console.log('🏁 Finalizando simulado:', usuarioSimuladoId);

      // Monta request
      const requestBody: FinishRequest = {
        user_id: userId,
        simulado_id: usuarioSimuladoId,
      };

      // Chama API
      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Erro ${response.status}`);
      }

      const data: FinishResponse = await response.json();
      console.log('✅ Simulado finalizado:', data);

      setResultado(data);
      setMostrarResultado(true);

      // Remove do localStorage (simulado concluído)
      localStorage.removeItem('simulado_atual');

    } catch (err: any) {
      console.error('❌ Erro ao finalizar simulado:', err);
      setError(err.message || 'Erro ao finalizar simulado. Tente novamente.');
    } finally {
      setFinalizando(false);
    }
  }

  /**
   * PASSO 4 (Opcional): Comparar com Nota de Corte
   *
   * Chama: POST /api/enem/simulados/compare-score
   * Recebe: { passou, nota_usuario, nota_corte, diferenca, mensagem }
   */
  async function compararComNotaDeCorte(curso: string, universidade: string) {
    if (!resultado) return;

    try {
      console.log('🎯 Comparando com nota de corte:', { curso, universidade });

      const requestBody: CompareScoreRequest = {
        user_id: userId,
        simulado_id: usuarioSimuladoId,
        curso: curso,
        universidade: universidade,
        ano: new Date().getFullYear(),
      };

      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/compare-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `Erro ${response.status}`);
      }

      const data: CompareScoreResponse = await response.json();
      console.log('✅ Comparação realizada:', data);

      setComparacao(data);

    } catch (err: any) {
      console.error('❌ Erro ao comparar nota:', err);
      // Não bloqueia a exibição do resultado
    }
  }

  // Navegação
  const proximaQuestao = () => {
    if (simulado && questaoAtual < simulado.questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  };

  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const irParaQuestao = (indice: number) => {
    setQuestaoAtual(indice);
  };

  // Renderização condicional
  if (!simulado) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0a1a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '2rem', marginBottom: 16 }}>⏳</div>
          <div style={{ fontSize: '1.2rem' }}>
            {error || 'Carregando simulado...'}
          </div>
        </div>
      </div>
    );
  }

  const questao = simulado.questoes[questaoAtual];
  const respostaAtual = respostas.get(questao.id);
  const progresso = Math.round(((questaoAtual + 1) / simulado.questoes.length) * 100);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a1a0a',
        padding: 24,
      }}
    >
      {/* Container Principal */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          paddingTop: 20,
        }}
      >
        {/* Cabeçalho com Progresso */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #4CAF50',
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: '1.1rem', color: '#4CAF50', fontWeight: 'bold' }}>
              📝 Questão {questaoAtual + 1} de {simulado.questoes.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#aaa' }}>
              {simulado.disciplina || 'Todas as Áreas'}
            </div>
          </div>

          {/* Barra de Progresso */}
          <div
            style={{
              width: '100%',
              height: 8,
              backgroundColor: '#0d1f14',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progresso}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s',
              }}
            />
          </div>

          <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: 8 }}>
            Respondidas: {respostas.size} / {simulado.questoes.length} ({progresso}%)
          </div>
        </div>

        {/* Card da Questão */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '2px solid #4CAF50',
            borderRadius: 16,
            padding: 32,
            marginBottom: 24,
          }}
        >
          {/* Enunciado */}
          <div
            style={{
              fontSize: '1.1rem',
              color: '#fff',
              lineHeight: 1.8,
              marginBottom: 32,
              whiteSpace: 'pre-wrap',
            }}
          >
            {questao.enunciado}
          </div>

          {/* Alternativas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {questao.alternativas.map((alternativa, indice) => {
              const letra = indiceParaLetra(indice);
              const selecionada = respostaAtual === indice;

              return (
                <button
                  key={indice}
                  onClick={() => marcarResposta(indice)}
                  disabled={loading || finalizando}
                  style={{
                    padding: '16px 20px',
                    backgroundColor: selecionada ? '#4CAF50' : '#0d1f14',
                    color: '#fff',
                    border: selecionada ? '2px solid #4CAF50' : '1px solid #444',
                    borderRadius: 8,
                    fontSize: '1rem',
                    textAlign: 'left',
                    cursor: loading || finalizando ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    opacity: loading || finalizando ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && !finalizando && !selecionada) {
                      e.currentTarget.style.backgroundColor = '#1a3a1a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selecionada) {
                      e.currentTarget.style.backgroundColor = '#0d1f14';
                    }
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: 12 }}>
                    ({letra})
                  </span>
                  {alternativa}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div
            style={{
              backgroundColor: '#1f0d0d',
              border: '2px solid #F44336',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: '0.95rem', color: '#F44336' }}>
              ❌ {error}
            </div>
          </div>
        )}

        {/* Navegação */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <button
            onClick={questaoAnterior}
            disabled={questaoAtual === 0 || loading || finalizando}
            style={{
              flex: 1,
              padding: '14px 20px',
              backgroundColor: questaoAtual === 0 ? '#333' : '#555',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: questaoAtual === 0 || loading || finalizando ? 'not-allowed' : 'pointer',
              opacity: questaoAtual === 0 ? 0.5 : 1,
            }}
          >
            ← Anterior
          </button>

          {questaoAtual < simulado.questoes.length - 1 ? (
            <button
              onClick={proximaQuestao}
              disabled={loading || finalizando}
              style={{
                flex: 1,
                padding: '14px 20px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading || finalizando ? 'not-allowed' : 'pointer',
              }}
            >
              Próxima →
            </button>
          ) : (
            <button
              onClick={finalizarSimulado}
              disabled={loading || finalizando}
              style={{
                flex: 1,
                padding: '14px 20px',
                backgroundColor: finalizando ? '#666' : '#FF9800',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: loading || finalizando ? 'not-allowed' : 'pointer',
                boxShadow: finalizando ? 'none' : '0 4px 12px rgba(255, 152, 0, 0.4)',
              }}
            >
              {finalizando ? '⏳ Finalizando...' : '🏁 Finalizar Simulado'}
            </button>
          )}
        </div>

        {/* Mapa de Questões */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: '0.9rem',
              color: '#aaa',
              marginBottom: 12,
            }}
          >
            🗺️ Mapa de Questões (clique para navegar)
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
              gap: 8,
            }}
          >
            {simulado.questoes.map((q, idx) => {
              const respondida = respostas.has(q.id);
              const atual = idx === questaoAtual;

              return (
                <button
                  key={q.id}
                  onClick={() => irParaQuestao(idx)}
                  disabled={loading || finalizando}
                  style={{
                    padding: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    backgroundColor: atual
                      ? '#4CAF50'
                      : respondida
                      ? '#1a3a1a'
                      : '#0d1f14',
                    color: '#fff',
                    border: atual ? '2px solid #4CAF50' : '1px solid #444',
                    borderRadius: 6,
                    cursor: loading || finalizando ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {idx + 1}
                  {respondida && !atual && ' ✓'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Resultado */}
      {mostrarResultado && resultado && (
        <ResultModal
          resultado={resultado}
          comparacao={comparacao}
          onClose={() => {
            setMostrarResultado(false);
            router.push('/simulado');
          }}
          onVerErros={() => {
            setMostrarResultado(false);
            setMostrarErros(true);
          }}
        />
      )}

      {/* Tela de Revisão de Erros */}
      {mostrarErros && resultado && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
            overflowY: 'auto',
          }}
          onClick={() => setMostrarErros(false)}
        >
          <div
            style={{
              backgroundColor: '#1a1a1a',
              border: '2px solid #F44336',
              borderRadius: 16,
              padding: 32,
              maxWidth: 900,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: '1.8rem',
                color: '#F44336',
                marginBottom: 24,
              }}
            >
              📝 Revisão de Questões Erradas
            </h2>

            {resultado.erros_detalhados.map((erro, idx) => (
              <div
                key={erro.questao_id}
                style={{
                  backgroundColor: '#0d1f14',
                  border: '1px solid #F44336',
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: '#aaa',
                    marginBottom: 8,
                  }}
                >
                  Questão {idx + 1} de {resultado.erros_detalhados.length} erradas
                </div>

                <div
                  style={{
                    fontSize: '1.05rem',
                    color: '#fff',
                    lineHeight: 1.7,
                    marginBottom: 20,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {erro.enunciado}
                </div>

                {erro.alternativas.map((alt, altIdx) => {
                  const letra = indiceParaLetra(altIdx);
                  const correta = altIdx === erro.correta;
                  const marcada = altIdx === erro.marcada;

                  return (
                    <div
                      key={altIdx}
                      style={{
                        padding: '12px 16px',
                        marginBottom: 8,
                        backgroundColor: correta
                          ? '#0d1f14'
                          : marcada
                          ? '#1f0d0d'
                          : '#0a0a0a',
                        border: correta
                          ? '2px solid #4CAF50'
                          : marcada
                          ? '2px solid #F44336'
                          : '1px solid #333',
                        borderRadius: 8,
                        color: '#fff',
                        fontSize: '0.95rem',
                      }}
                    >
                      <span style={{ fontWeight: 'bold', marginRight: 8 }}>
                        ({letra})
                      </span>
                      {alt}
                      {correta && (
                        <span style={{ color: '#4CAF50', marginLeft: 8 }}>
                          ✓ Correta
                        </span>
                      )}
                      {marcada && !correta && (
                        <span style={{ color: '#F44336', marginLeft: 8 }}>
                          ✗ Sua resposta
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <button
              onClick={() => setMostrarErros(false)}
              style={{
                width: '100%',
                padding: '14px 20px',
                backgroundColor: '#555',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ✖️ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
