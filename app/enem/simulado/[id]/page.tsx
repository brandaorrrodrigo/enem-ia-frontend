'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Questao {
  id: number;
  enunciado: string;
  alternativas: string[];
}

interface SimuladoData {
  simulado_id: string;
  usuario_simulado_id: string;
  quantidade: number;
  questoes: Questao[];
  disciplina: string;
  questao_atual: number;
  respostas: { [key: number]: number };
}

export default function SimuladoPlayerPage() {
  const router = useRouter();
  const params = useParams();
  const simuladoId = params.id as string;

  const [simulado, setSimulado] = useState<SimuladoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [salvandoResposta, setSalvandoResposta] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Carrega simulado do localStorage
  useEffect(() => {
    const simuladoSalvo = localStorage.getItem('simulado_atual');

    if (!simuladoSalvo) {
      setError('Simulado não encontrado. Inicie um novo simulado.');
      setLoading(false);
      return;
    }

    const data: SimuladoData = JSON.parse(simuladoSalvo);

    if (data.usuario_simulado_id !== simuladoId) {
      setError('ID do simulado não corresponde.');
      setLoading(false);
      return;
    }

    setSimulado(data);
    setLoading(false);
  }, [simuladoId]);

  const questaoAtual = simulado?.questoes[simulado.questao_atual];
  const indiceAtual = simulado?.questao_atual ?? 0;
  const totalQuestoes = simulado?.questoes.length ?? 0;
  const respostaMarcada = simulado?.respostas[questaoAtual?.id ?? -1];

  const marcarAlternativa = async (alternativaIndex: number) => {
    if (!simulado || !questaoAtual) return;

    setSalvandoResposta(true);
    setError('');

    try {
      const userId = localStorage.getItem('user_email') || 'usuario@enem-ia.com';

      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          simulado_id: simulado.usuario_simulado_id,
          questao_id: questaoAtual.id,
          alternativa_marcada: alternativaIndex,
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar resposta');

      const novasRespostas = { ...simulado.respostas, [questaoAtual.id]: alternativaIndex };
      const simuladoAtualizado = { ...simulado, respostas: novasRespostas };

      setSimulado(simuladoAtualizado);
      localStorage.setItem('simulado_atual', JSON.stringify(simuladoAtualizado));
    } catch (err: any) {
      console.error('Erro ao marcar alternativa:', err);
      setError('Erro ao salvar resposta. Tente novamente.');
    } finally {
      setSalvandoResposta(false);
    }
  };

  const irParaQuestao = (indice: number) => {
    if (!simulado || indice < 0 || indice >= totalQuestoes) return;

    const simuladoAtualizado = { ...simulado, questao_atual: indice };
    setSimulado(simuladoAtualizado);
    localStorage.setItem('simulado_atual', JSON.stringify(simuladoAtualizado));
  };

  const finalizarSimulado = async () => {
    if (!simulado) return;

    const confirmacao = confirm(
      `Você respondeu ${Object.keys(simulado.respostas).length} de ${totalQuestoes} questões.\n\nDeseja realmente finalizar o simulado?`
    );

    if (!confirmacao) return;

    setFinalizando(true);
    setError('');

    try {
      const userId = localStorage.getItem('user_email') || 'usuario@enem-ia.com';

      const response = await fetch(`${BACKEND_URL}/api/enem/simulados/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          simulado_id: simulado.usuario_simulado_id,
        }),
      });

      if (!response.ok) throw new Error('Erro ao finalizar simulado');

      const resultado = await response.json();

      localStorage.setItem('ultimo_resultado', JSON.stringify(resultado));
      localStorage.removeItem('simulado_atual');

      router.push(`/enem/resultado/${simulado.usuario_simulado_id}`);
    } catch (err: any) {
      console.error('Erro ao finalizar simulado:', err);
      setError('Erro ao finalizar simulado. Tente novamente.');
    } finally {
      setFinalizando(false);
    }
  };

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando simulado...</p>
        </div>
      </div>
    );
  }

  if (error && !simulado) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="card-ia max-w-md bg-red-500/20 border-red-400">
          <h2 className="title-ia-sm text-red-200 mb-4">⚠️ Erro</h2>
          <p className="text-red-200/90 mb-6">{error}</p>
          <button onClick={() => router.push('/enem/simulado')} className="btn-ia">
            Voltar para Início
          </button>
        </div>
      </div>
    );
  }

  if (!simulado || !questaoAtual) return null;

  const progresso = Math.round((Object.keys(simulado.respostas).length / totalQuestoes) * 100);

  return (
    <div className="container-ia min-h-screen py-6">
      {/* Header com Progresso */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="card-ia-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-bold text-lg">
              📝 Questão {indiceAtual + 1} de {totalQuestoes}
            </span>
            <span className="badge-ia-info">
              {Object.keys(simulado.respostas).length} respondidas
            </span>
          </div>

          {/* Barra de Progresso */}
          <div className="progress-ia">
            <div className="progress-ia-bar" style={{ width: `${progresso}%` }}></div>
          </div>

          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-white/60">{progresso}% completo</span>
            <span className="text-yellow-300 font-semibold">
              {totalQuestoes - Object.keys(simulado.respostas).length} restantes
            </span>
          </div>
        </div>
      </div>

      {/* Card da Questão */}
      <div className="max-w-5xl mx-auto">
        <div className="card-ia">
          {/* Cabeçalho da Questão */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge-ia text-lg px-4 py-2">
              Q{indiceAtual + 1}
            </span>
            {simulado.disciplina && (
              <span className="badge-ia-info px-4 py-2">
                {simulado.disciplina}
              </span>
            )}
          </div>

          {/* Enunciado */}
          <div className="mb-8">
            <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
              {questaoAtual.enunciado}
            </p>
          </div>

          <div className="divider-ia"></div>

          {/* Alternativas */}
          <div className="space-y-4 my-8">
            {questaoAtual.alternativas.map((alternativa, index) => {
              const letra = String.fromCharCode(65 + index);
              const estaMarcada = respostaMarcada === index;

              return (
                <button
                  key={index}
                  onClick={() => marcarAlternativa(index)}
                  disabled={salvandoResposta}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                    estaMarcada
                      ? 'bg-yellow-300/20 border-yellow-300 transform scale-[1.02]'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                  } ${salvandoResposta ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`font-bold text-xl flex-shrink-0 ${
                      estaMarcada ? 'text-yellow-300' : 'text-white/60'
                    }`}>
                      {letra})
                    </span>
                    <span className="flex-1 text-white/90 text-lg leading-relaxed">
                      {alternativa}
                    </span>
                    {estaMarcada && (
                      <span className="text-yellow-300 text-2xl flex-shrink-0">✓</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="card-ia-sm bg-red-500/20 border-red-400 mb-6">
              <p className="text-red-200">⚠️ {error}</p>
            </div>
          )}

          {/* Navegação Principal */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => irParaQuestao(indiceAtual - 1)}
              disabled={indiceAtual === 0}
              className="btn-ia-secondary flex-1"
            >
              ← Anterior
            </button>

            <button
              onClick={finalizarSimulado}
              disabled={finalizando}
              className="btn-ia-outline border-red-400 text-red-300 hover:bg-red-500/10"
            >
              {finalizando ? '⏳ Finalizando...' : '🏁 Finalizar'}
            </button>

            <button
              onClick={() => irParaQuestao(indiceAtual + 1)}
              disabled={indiceAtual === totalQuestoes - 1}
              className="btn-ia flex-1"
            >
              Próxima →
            </button>
          </div>

          <div className="divider-ia"></div>

          {/* Mini Navegador */}
          <div>
            <p className="text-white/70 text-sm mb-4 font-semibold">
              🧭 Navegação Rápida
            </p>
            <div className="flex flex-wrap gap-2">
              {simulado.questoes.map((q, idx) => {
                const respondida = simulado.respostas[q.id] !== undefined;
                const atual = idx === indiceAtual;

                return (
                  <button
                    key={q.id}
                    onClick={() => irParaQuestao(idx)}
                    className={`w-12 h-12 rounded-lg font-bold transition-all ${
                      atual
                        ? 'bg-yellow-300 text-slate-900 transform scale-110'
                        : respondida
                        ? 'bg-green-500/30 text-green-200 hover:bg-green-500/50'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
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
