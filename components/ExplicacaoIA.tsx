"use client";

import { useState } from "react";

type ExplicacaoIAProps = {
  questaoId: number;
  disciplina?: string;
  assunto?: string;
  dificuldade?: string;
  enunciado?: string;
  respostaUsuario: string; // A-E
  respostaCorreta?: string; // A-E
};

type ApiResponse = {
  ok: boolean;
  explicacao?: string;
  questao_id?: number;
  cached?: boolean;
  tempo_processamento?: number;
  modelo_usado?: string;
  timestamp?: string;
  resposta_era_correta?: boolean | null;
  nivel_confianca?: string | null;
  error?: string;
};

export function ExplicacaoIA(props: ExplicacaoIAProps) {
  const [loading, setLoading] = useState(false);
  const [explicacao, setExplicacao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [reexplicando, setReexplicando] = useState(false);

  async function chamarAPI(path: "/api/explicar" | "/api/reexplicar") {
    setLoading(true);
    setErro(null);

    try {
      const body = {
        questao_id: props.questaoId,
        resposta_usuario: props.respostaUsuario,
        resposta_correta: props.respostaCorreta,
        enunciado: props.enunciado,
        disciplina: props.disciplina,
        assunto: props.assunto,
        dificuldade: props.dificuldade,
        contexto_adicional:
          "Explique de forma muito didática para um aluno do ensino médio se preparando para o ENEM.",
      };

      const resp = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data: ApiResponse = await resp.json();

      if (!resp.ok || !data.ok) {
        console.error("Erro API IA:", data);
        setErro(data.error || "Erro ao gerar explicação.");
        return;
      }

      setExplicacao(data.explicacao || "Sem texto retornado da IA.");
    } catch (e: any) {
      console.error(e);
      setErro(e?.message || "Falha na conexão com a IA.");
    } finally {
      setLoading(false);
      setReexplicando(false);
    }
  }

  const handleExplicar = () => {
    chamarAPI("/api/explicar");
  };

  const handleReexplicar = () => {
    setReexplicando(true);
    chamarAPI("/api/reexplicar");
  };

  return (
    <div className="mt-6 p-4 rounded-xl border border-emerald-700 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50 shadow-lg space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400 text-xs">
            IA
          </span>
          Explicação inteligente da questão
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleExplicar}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading && !reexplicando ? "Gerando..." : "Gerar explicação"}
          </button>
        </div>
      </div>

      {erro && (
        <div className="text-xs sm:text-sm text-red-300 bg-red-900/30 border border-red-500/40 rounded-lg px-3 py-2">
          {erro}
        </div>
      )}

      {explicacao && (
        <div className="mt-2 space-y-3">
          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {explicacao}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mt-2 pt-2 border-t border-emerald-700/70">
            <p className="text-[11px] sm:text-xs text-emerald-200/80">
              Se ainda não ficou claro, peça uma explicação alternativa mais
              simples.
            </p>
            <button
              onClick={handleReexplicar}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-emerald-800 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading && reexplicando
                ? "Reexplicando..."
                : "Não entendi, explique de outra forma"}
            </button>
          </div>
        </div>
      )}

      {!explicacao && !erro && (
        <p className="text-[11px] sm:text-xs text-emerald-200/80">
          Depois de responder a questão, clique em{" "}
          <span className="font-semibold">"Gerar explicação"</span> para ver
          uma explicação passo a passo, com exemplos do dia a dia.
        </p>
      )}
    </div>
  );
}
