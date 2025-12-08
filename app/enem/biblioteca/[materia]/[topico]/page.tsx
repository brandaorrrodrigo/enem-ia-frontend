// app/enem/biblioteca/[materia]/[topico]/page.tsx
'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { CadernoData, CadernoModulo, CadernoQuestao } from '@/lib/types/caderno';
import FloatingBackButton from '@/components/FloatingBackButton';

interface PageProps {
  params: Promise<{ materia: string; topico: string }>;
}

export default function CadernoPage({ params }: PageProps) {
  const { materia, topico } = use(params);
  const [caderno, setCaderno] = useState<CadernoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moduloAtivo, setModuloAtivo] = useState<string | null>(null);
  const [quizAtivo, setQuizAtivo] = useState<{ moduloId: string; questaoIndex: number } | null>(null);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [modulosConcluidos, setModulosConcluidos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCaderno = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/biblioteca/${materia}/${topico}`);
        const data = await response.json();

        if (data.success) {
          setCaderno(data.data);
          if (data.data.modulos.length > 0) {
            setModuloAtivo(data.data.modulos[0].id);
          }
        } else {
          setError(data.error || 'Erro ao carregar conteudo');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchCaderno();
  }, [materia, topico]);

  const handleResponderQuestao = (questao: CadernoQuestao, resposta: string) => {
    setRespostaSelecionada(resposta);
    setMostrarResposta(true);
  };

  const concluirModulo = (moduloId: string) => {
    setModulosConcluidos(prev => new Set([...prev, moduloId]));
    // Aqui poderia salvar progresso no backend
  };

  const progresso = caderno
    ? Math.round((modulosConcluidos.size / caderno.modulos.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--chalkboard-green)' }}>
      <FloatingBackButton />
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>Carregando caderno...</p>
        </div>
      </div>
    );
  }

  if (error || !caderno) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--chalkboard-green)' }}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>
            Conteudo nao disponivel
          </h1>
          <p className="mb-6" style={{ color: 'var(--chalk-dim)' }}>
            {error || 'Conteudo ainda nao carregado. Aguarde atualizacoes.'}
          </p>
          <Link
            href="/enem/biblioteca"
            className="inline-block px-6 py-3 rounded-xl font-bold"
            style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--chalkboard-green)' }}
          >
            Voltar a Biblioteca
          </Link>
        </div>
      </div>
    );
  }

  const moduloAtual = caderno.modulos.find(m => m.id === moduloAtivo);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--chalkboard-green)', backgroundImage: 'var(--chalkboard-texture)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 py-3" style={{ backgroundColor: 'rgba(30, 41, 30, 0.95)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/enem/biblioteca" className="flex items-center gap-2" style={{ color: 'var(--chalk-dim)' }}>
              <span>←</span>
              <span style={{ fontFamily: 'var(--font-kalam)' }}>Biblioteca</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{caderno.icone}</span>
              <div>
                <h1 className="font-bold" style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>
                  {caderno.titulo}
                </h1>
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--chalk-dim)' }}>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${caderno.cor} text-white`}>
                    {caderno.nivel}
                  </span>
                  <span>•</span>
                  <span>{caderno.tempoEstimado}</span>
                  <span>•</span>
                  <span className="text-yellow-400">+{caderno.fpRecompensa} FP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--chalk-dim)' }}>
              <span>Progresso</span>
              <span>{progresso}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className={`h-full bg-gradient-to-r ${caderno.cor}`}
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Navegacao de modulos */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {caderno.modulos.map((modulo, index) => (
            <button
              key={modulo.id}
              onClick={() => {
                setModuloAtivo(modulo.id);
                setQuizAtivo(null);
                setMostrarResposta(false);
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold transition-all ${
                moduloAtivo === modulo.id
                  ? 'bg-gradient-to-r ' + caderno.cor + ' text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              style={{ color: moduloAtivo === modulo.id ? 'white' : 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}
            >
              <div className="flex items-center gap-2">
                {modulosConcluidos.has(modulo.id) && <span className="text-green-400">✓</span>}
                <span>Modulo {index + 1}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Conteudo do modulo */}
        <AnimatePresence mode="wait">
          {moduloAtual && (
            <motion.div
              key={moduloAtual.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Titulo do modulo */}
              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.1)' }}>
                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--chalk-white)', fontFamily: 'var(--font-kalam)' }}>
                  {moduloAtual.titulo}
                </h2>
                <p style={{ color: 'var(--chalk-dim)', lineHeight: 1.7 }}>
                  {moduloAtual.resumo}
                </p>
              </div>

              {/* Topicos */}
              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)' }}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--accent-yellow)', fontFamily: 'var(--font-kalam)' }}>
                  <span>📌</span> Topicos Principais
                </h3>
                <ul className="space-y-3">
                  {moduloAtual.topicos.map((topico, i) => (
                    <li key={i} className="flex gap-3" style={{ color: 'var(--chalk-white)' }}>
                      <span className="text-yellow-400 mt-1">•</span>
                      <span style={{ lineHeight: 1.6 }}>{topico}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exemplos */}
              {moduloAtual.exemplos && moduloAtual.exemplos.length > 0 && (
                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid rgba(34, 197, 94, 0.3)' }}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#4ade80', fontFamily: 'var(--font-kalam)' }}>
                    <span>💡</span> Exemplos Praticos
                  </h3>
                  <div className="space-y-3">
                    {moduloAtual.exemplos.map((exemplo, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <p style={{ color: 'var(--chalk-white)', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                          {exemplo}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formula (se houver) */}
              {moduloAtual.formula && (
                <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '2px solid rgba(234, 179, 8, 0.3)' }}>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--accent-yellow)', fontFamily: 'var(--font-kalam)' }}>
                    📐 Formula
                  </h3>
                  <p className="text-2xl font-mono" style={{ color: 'var(--chalk-white)' }}>
                    {moduloAtual.formula}
                  </p>
                </div>
              )}

              {/* Dicas */}
              {moduloAtual.dicas && moduloAtual.dicas.length > 0 && (
                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '2px solid rgba(147, 51, 234, 0.3)' }}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#a78bfa', fontFamily: 'var(--font-kalam)' }}>
                    <span>🎯</span> Dicas para o ENEM
                  </h3>
                  <ul className="space-y-2">
                    {moduloAtual.dicas.map((dica, i) => (
                      <li key={i} className="flex gap-3" style={{ color: 'var(--chalk-white)' }}>
                        <span className="text-purple-400">→</span>
                        <span>{dica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Questoes */}
              {moduloAtual.questoes && moduloAtual.questoes.length > 0 && (
                <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '2px solid rgba(59, 130, 246, 0.3)' }}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#60a5fa', fontFamily: 'var(--font-kalam)' }}>
                    <span>📝</span> Teste seus Conhecimentos
                  </h3>

                  {moduloAtual.questoes.map((questao, qIndex) => (
                    <div key={questao.id} className="mb-6 last:mb-0">
                      <p className="mb-4 font-medium" style={{ color: 'var(--chalk-white)', lineHeight: 1.6 }}>
                        <span className="text-blue-400 font-bold">Questao {qIndex + 1}:</span> {questao.enunciado}
                      </p>

                      <div className="space-y-2 mb-4">
                        {(['A', 'B', 'C', 'D', 'E'] as const).map((letra) => {
                          const isSelected = quizAtivo?.questaoIndex === qIndex && respostaSelecionada === letra;
                          const isCorrect = mostrarResposta && letra === questao.correta;
                          const isWrong = mostrarResposta && isSelected && letra !== questao.correta;

                          return (
                            <button
                              key={letra}
                              onClick={() => {
                                if (!mostrarResposta) {
                                  setQuizAtivo({ moduloId: moduloAtual.id, questaoIndex: qIndex });
                                  handleResponderQuestao(questao, letra);
                                }
                              }}
                              disabled={mostrarResposta && quizAtivo?.questaoIndex !== qIndex}
                              className={`w-full text-left p-3 rounded-lg transition-all ${
                                isCorrect
                                  ? 'bg-green-500/30 border-green-500'
                                  : isWrong
                                  ? 'bg-red-500/30 border-red-500'
                                  : isSelected
                                  ? 'bg-blue-500/30 border-blue-500'
                                  : 'bg-white/5 hover:bg-white/10 border-transparent'
                              }`}
                              style={{ border: '2px solid', borderColor: isCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#3b82f6' : 'transparent' }}
                            >
                              <span className="font-bold mr-2" style={{ color: 'var(--accent-yellow)' }}>{letra})</span>
                              <span style={{ color: 'var(--chalk-white)' }}>{questao.alternativas[letra]}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explicacao */}
                      {mostrarResposta && quizAtivo?.questaoIndex === qIndex && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-4 rounded-lg mt-4"
                          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                        >
                          <p className="font-bold mb-2" style={{ color: respostaSelecionada === questao.correta ? '#4ade80' : '#f87171' }}>
                            {respostaSelecionada === questao.correta ? '✓ Correto!' : '✗ Incorreto'}
                          </p>
                          <p style={{ color: 'var(--chalk-dim)', lineHeight: 1.6 }}>
                            <strong style={{ color: 'var(--accent-yellow)' }}>Explicacao:</strong> {questao.explicacao}
                          </p>
                          <button
                            onClick={() => {
                              setMostrarResposta(false);
                              setRespostaSelecionada(null);
                              setQuizAtivo(null);
                            }}
                            className="mt-3 px-4 py-2 rounded-lg text-sm font-bold"
                            style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--chalkboard-green)' }}
                          >
                            Proxima Questao
                          </button>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Botao Concluir Modulo */}
              {!modulosConcluidos.has(moduloAtual.id) && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => concluirModulo(moduloAtual.id)}
                    className="px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--chalkboard-green)' }}
                  >
                    ✓ Concluir Modulo
                  </button>
                </div>
              )}

              {modulosConcluidos.has(moduloAtual.id) && (
                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e' }}>
                    <span className="text-2xl">✓</span>
                    <span className="font-bold" style={{ color: '#4ade80' }}>Modulo Concluido!</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
