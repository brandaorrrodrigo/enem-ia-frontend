"use client";
import React, { useState } from "react";
type Props = { usuario: string; enunciado: string; alternativas?: Record<string,string>; respostaUsuario?: number; correta?: number; };
export default function ExplicadorIA({ usuario, enunciado, alternativas, respostaUsuario, correta }: Props) {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string|null>(null);
  const [sessionId, setSessionId] = useState<string|null>(null);
  const [explicacao, setExplicacao] = useState<string|null>(null);
  const [nivel, setNivel] = useState<number>(1);
  const [finalizado, setFinalizado] = useState(false);
  async function pedirExplicacao() {
    try {
      setLoading(true); setErro(null); setFinalizado(false); setNivel(1);
      const res = await fetch("/api/ia/explicacao", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questao_id: 0, enunciado, alternativas, resposta_usuario: respostaUsuario, correta, usuario }) });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json(); setSessionId(data.session_id); setExplicacao(`${data.explicacao}\n\n${data.followup}`);
    } catch (e:any) { setErro(e?.message || "Erro ao gerar explicação."); } finally { setLoading(false); }
  }
  async function enviarFeedback(entendeu: boolean) {
    if (!sessionId) return;
    try {
      setLoading(true); setErro(null);
      const res = await fetch("/api/ia/explicacao/feedback", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, entendeu, usuario }) });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (entendeu) { setFinalizado(true); setExplicacao(data.mensagem + "\n- " + data.sugestoes.join("\n- ")); return; }
      if (data.encerrar_se_nao_entender) { setExplicacao(data.explicacao + "\n\nSe ainda não entendeu, vamos propor vídeo/áudio e exemplos práticos."); setFinalizado(true); return; }
      setNivel(data.nivel || (nivel + 1)); setExplicacao(`${data.explicacao}\n\n${data.pergunta}`);
    } catch (e:any) { setErro(e?.message || "Erro ao enviar feedback."); } finally { setLoading(false); }
  }
  return (<div className="rounded-2xl p-5 shadow-md bg-white/70 text-gray-900">
    <h3 className="text-xl font-semibold">Explicação com IA</h3>
    <p className="mt-2 text-sm opacity-80">Usuário: <strong>{usuario}</strong></p>
    <div className="mt-3 p-3 bg-gray-100 rounded"><p className="font-medium">Enunciado</p><p className="mt-1 whitespace-pre-wrap">{enunciado}</p></div>
    {alternativas && (<div className="mt-3 p-3 bg-gray-100 rounded"><p className="font-medium">Alternativas</p><ul className="list-disc list-inside mt-1">
      {Object.entries(alternativas).map(([k,v]) => (<li key={k}><strong>{k})</strong> {v}</li>))}</ul></div>)}
    <div className="mt-4 flex gap-2"><button onClick={pedirExplicacao} disabled={loading} className={`px-4 py-2 rounded bg-indigo-600 text-white ${loading ? "opacity-60" : "hover:bg-indigo-700"}`}>{loading ? "Gerando..." : "Gerar explicação"}</button><span className="text-sm opacity-70">Nível atual: {nivel}</span></div>
    {erro && <p className="mt-3 text-red-600">{erro}</p>}
    {explicacao && (<div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
      <p className="whitespace-pre-wrap">{explicacao}</p>
      {!finalizado && (<div className="mt-3 flex gap-2">
        <button onClick={()=>enviarFeedback(true)} disabled={loading} className={`px-4 py-2 rounded bg-green-600 text-white ${loading ? "opacity-60" : "hover:bg-green-700"}`}>Entendi ✅</button>
        <button onClick={()=>enviarFeedback(false)} disabled={loading} className={`px-4 py-2 rounded bg-yellow-600 text-white ${loading ? "opacity-60" : "hover:bg-yellow-700"}`}>Não entendi ❓</button>
      </div>)}
    </div>)}
  </div>);
}
