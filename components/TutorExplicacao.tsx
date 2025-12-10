'use client';

import { useState, useRef, useEffect } from 'react';
import type {
  ExplicarRequest,
  ExplicacaoResponse,
  ReexplicarRequest,
  ReexplicacaoResponse,
  MensagemChat,
  ErrorResponse,
} from '@/lib/types/enem';

// ============================================================================
// PROPS DO COMPONENTE
// ============================================================================

interface TutorExplicacaoProps {
  questaoId: number;
  respostaUsuario: 'A' | 'B' | 'C' | 'D' | 'E';
  respostaCorreta?: 'A' | 'B' | 'C' | 'D' | 'E';
  enunciado?: string;
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function TutorExplicacao({
  questaoId,
  respostaUsuario,
  respostaCorreta,
  enunciado,
  disciplina,
  assunto,
  dificuldade,
}: TutorExplicacaoProps) {
  // Estado
  const [explicacoes, setExplicacoes] = useState<MensagemChat[]>([]);
  const [loadingExplicar, setLoadingExplicar] = useState(false);
  const [loadingReexplicar, setLoadingReexplicar] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativaAtual, setTentativaAtual] = useState(0);
  const [duvidaTexto, setDuvidaTexto] = useState('');
  const [explicacaoVisivel, setExplicacaoVisivel] = useState(false);
  const [limiteAtingido, setLimiteAtingido] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll quando novas mensagens aparecem
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [explicacoes]);

  // ============================================================================
  // FUNÇÃO: CHAMAR /api/explicar
  // ============================================================================

  async function chamarExplicar() {
    setLoadingExplicar(true);
    setErro(null);

    try {
      const payload: ExplicarRequest = {
        questao_id: questaoId,
        resposta_usuario: respostaUsuario,
        resposta_correta: respostaCorreta,
        enunciado,
        disciplina,
        assunto,
        dificuldade,
        contexto_adicional: null,
      };

      const res = await fetch('/api/explicar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData: ErrorResponse = await res.json().catch(() => ({
          error: 'Erro desconhecido',
        }));

        if (res.status === 429) {
          setErro('Muitas requisições. Por favor, aguarde alguns instantes.');
        } else if (res.status === 504) {
          setErro('A requisição demorou muito para responder. Tente novamente.');
        } else {
          setErro(errorData.error || `Erro ${res.status}: Não foi possível obter a explicação.`);
        }
        return;
      }

      const data: ExplicacaoResponse = await res.json();

      if (data.ok && data.explicacao) {
        setExplicacoes((prev) => [
          ...prev,
          {
            tipo: 'explicar',
            texto: data.explicacao,
            timestamp: new Date(),
          },
        ]);
        setExplicacaoVisivel(true);
        setTentativaAtual(1); // Primeira explicação já dada
      } else {
        setErro('Resposta inválida do servidor.');
      }
    } catch (err: any) {
      console.error('Erro ao chamar /api/explicar:', err);
      if (err.name === 'AbortError') {
        setErro('A requisição foi cancelada. Tente novamente.');
      } else {
        setErro('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    } finally {
      setLoadingExplicar(false);
    }
  }

  // ============================================================================
  // FUNÇÃO: CHAMAR /api/reexplicar
  // ============================================================================

  async function chamarReexplicar(duvidaEspecifica?: string) {
    if (limiteAtingido) {
      setErro('Você atingiu o limite de reexplicações para esta questão.');
      return;
    }

    setLoadingReexplicar(true);
    setErro(null);

    // Se há dúvida específica, adicionar ao chat
    if (duvidaEspecifica && duvidaEspecifica.trim()) {
      setExplicacoes((prev) => [
        ...prev,
        {
          tipo: 'duvida_usuario',
          texto: duvidaEspecifica,
          timestamp: new Date(),
        },
      ]);
    }

    try {
      const tentativa = Math.min(tentativaAtual + 1, 5);
      const ultimaExplicacao =
        explicacoes.length > 0
          ? explicacoes[explicacoes.length - 1].texto
          : null;

      const payload: ReexplicarRequest = {
        questao_id: questaoId,
        resposta_usuario: respostaUsuario,
        resposta_correta: respostaCorreta,
        explicacao_anterior: ultimaExplicacao,
        duvida_especifica: duvidaEspecifica?.trim() || null,
        tentativa_numero: tentativa,
        nivel_escolar: 'medio',
      };

      const res = await fetch('/api/reexplicar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData: ErrorResponse = await res.json().catch(() => ({
          error: 'Erro desconhecido',
        }));

        if (res.status === 429) {
          // Verifica se é limite de tentativas ou rate limit geral
          if (errorData.error.includes('limite')) {
            setLimiteAtingido(true);
            setErro(
              'Você atingiu o limite de reexplicações para esta questão. Tente revisar o conteúdo ou buscar outras fontes de estudo.'
            );
          } else {
            setErro('Muitas requisições. Por favor, aguarde alguns instantes.');
          }
        } else if (res.status === 504) {
          setErro('A requisição demorou muito para responder. Tente novamente.');
        } else {
          setErro(errorData.error || `Erro ${res.status}: Não foi possível reexplicar.`);
        }
        return;
      }

      const data: ReexplicacaoResponse = await res.json();

      if (data.ok && data.explicacao) {
        setExplicacoes((prev) => [
          ...prev,
          {
            tipo: 'reexplicar',
            texto: data.explicacao,
            tentativa: data.tentativa_numero,
            timestamp: new Date(),
            nivel_simplificacao: data.nivel_simplificacao,
            sugestoes: data.sugestoes_estudo,
            recursos: data.recursos_adicionais,
          },
        ]);
        setTentativaAtual(data.tentativa_numero);
        setDuvidaTexto(''); // Limpa o campo de dúvida
      } else {
        setErro('Resposta inválida do servidor.');
      }
    } catch (err: any) {
      console.error('Erro ao chamar /api/reexplicar:', err);
      if (err.name === 'AbortError') {
        setErro('A requisição foi cancelada. Tente novamente.');
      } else {
        setErro('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    } finally {
      setLoadingReexplicar(false);
    }
  }

  // ============================================================================
  // RENDERIZAÇÃO
  // ============================================================================

  const acertou = respostaCorreta && respostaUsuario === respostaCorreta;
  const MAX_TENTATIVAS = 5;

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
      {/* Cabeçalho da questão */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Questão {questaoId}
            {disciplina && (
              <span className="ml-2 text-sm font-normal text-gray-600">
                • {disciplina}
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            {acertou !== undefined && (
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  acertou
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {acertou ? '✓ Acertou' : '✗ Errou'}
              </span>
            )}
          </div>
        </div>

        {assunto && (
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Assunto:</span> {assunto}
          </p>
        )}

        {respostaCorreta && (
          <div className="mt-2 text-sm text-gray-700">
            <span className="font-medium">Sua resposta:</span>{' '}
            <span className={acertou ? 'text-green-600' : 'text-red-600'}>
              {respostaUsuario}
            </span>
            {!acertou && (
              <>
                {' '}
                → <span className="text-green-600">Correta: {respostaCorreta}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Botão inicial "Ver explicação" */}
      {!explicacaoVisivel && (
        <div>
          <button
            onClick={chamarExplicar}
            disabled={loadingExplicar}
            className="btn-primary w-full sm:w-auto"
          >
            {loadingExplicar ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Gerando explicação...
              </span>
            ) : (
              '🧑‍🏫 Ver explicação'
            )}
          </button>
        </div>
      )}

      {/* Thread de chat (explicações e reexplicações) */}
      {explicacaoVisivel && (
        <div>
          {/* Container de mensagens */}
          <div
            ref={chatContainerRef}
            className="space-y-4 max-h-96 overflow-y-auto mb-4 pr-2"
          >
            {explicacoes.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.tipo === 'duvida_usuario' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={
                    msg.tipo === 'duvida_usuario'
                      ? 'chat-bubble-user'
                      : 'chat-bubble-tutor'
                  }
                >
                  {/* Badge de tentativa para reexplicações */}
                  {msg.tipo === 'reexplicar' && msg.tentativa && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Tentativa {msg.tentativa}/{MAX_TENTATIVAS}
                      </span>
                      {msg.nivel_simplificacao && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded capitalize">
                          {msg.nivel_simplificacao.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Texto da mensagem */}
                  <div className="whitespace-pre-wrap">{msg.texto}</div>

                  {/* Sugestões e recursos (apenas em reexplicações) */}
                  {msg.tipo === 'reexplicar' && (
                    <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                      {msg.sugestoes && msg.sugestoes.length > 0 && (
                        <div className="mb-2">
                          <p className="font-semibold text-gray-700 mb-1">
                            💡 Sugestões de estudo:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {msg.sugestoes.map((sug, i) => (
                              <li key={i}>{sug}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {msg.recursos && msg.recursos.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-700 mb-1">
                            📚 Recursos adicionais:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {msg.recursos.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              ⚠️ {erro}
            </div>
          )}

          {/* Controles de reexplicação */}
          {!limiteAtingido && tentativaAtual < MAX_TENTATIVAS && (
            <div className="space-y-3">
              {/* Botão rápido "Não entendi" */}
              <button
                onClick={() => chamarReexplicar()}
                disabled={loadingReexplicar}
                className="btn-secondary w-full sm:w-auto"
              >
                {loadingReexplicar ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Gerando nova explicação...
                  </span>
                ) : (
                  `🔄 Não entendi, explicar de novo (${tentativaAtual}/${MAX_TENTATIVAS})`
                )}
              </button>

              {/* Campo de dúvida específica */}
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  value={duvidaTexto}
                  onChange={(e) => setDuvidaTexto(e.target.value)}
                  placeholder="Me diga o que você não entendeu..."
                  disabled={loadingReexplicar}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  rows={2}
                />
                <button
                  onClick={() => {
                    if (duvidaTexto.trim()) {
                      chamarReexplicar(duvidaTexto);
                    }
                  }}
                  disabled={loadingReexplicar || !duvidaTexto.trim()}
                  className="btn-primary whitespace-nowrap"
                >
                  💬 Explicar essa parte
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                {tentativaAtual === 0 && 'Clique acima para receber uma nova explicação mais simples'}
                {tentativaAtual === 1 && 'Explicação simplificada disponível'}
                {tentativaAtual === 2 && 'Explicação muito simples disponível'}
                {tentativaAtual >= 3 && 'Modo ELI5 (Explain Like I\'m 5) disponível'}
              </p>
            </div>
          )}

          {/* Aviso de limite atingido */}
          {(limiteAtingido || tentativaAtual >= MAX_TENTATIVAS) && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              <p className="font-semibold mb-1">Limite de tentativas atingido</p>
              <p>
                Você utilizou todas as {MAX_TENTATIVAS} tentativas de reexplicação para esta questão.
                Recomendamos revisar o material de estudo ou consultar outras fontes.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
