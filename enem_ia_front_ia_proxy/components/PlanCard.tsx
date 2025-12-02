"use client";
import React, { useState } from "react";
export default function PlanCard() {
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  async function gerarPlano() {
    try {
      setLoading(true); setErro(null); setOut(null);
      const res = await fetch("/api/ia/plano", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: "Rodrigo", horas_por_dia: 2, objetivo: "ENEM 2025", forcas: ["humanas"], fraquezas: ["fisica","matematica"], historico: [] }) });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json(); setOut(data);
    } catch (e:any) { setErro(e?.message || "Erro ao gerar plano."); } finally { setLoading(false); }
  }
  return (<div className="rounded-2xl p-5 shadow-md bg-white/70 text-gray-900">
    <h3 className="text-xl font-semibold">Plano de Estudo Personalizado (7 dias)</h3>
    <button onClick={gerarPlano} disabled={loading} className={`mt-3 px-4 py-2 rounded bg-blue-600 text-white ${loading ? "opacity-60" : "hover:bg-blue-700"}`}>{loading ? "Gerando..." : "Gerar plano agora"}</button>
    {erro && <p className="mt-3 text-red-600">{erro}</p>}
    {out && (<div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200"><pre className="whitespace-pre-wrap text-sm">{JSON.stringify(out, null, 2)}</pre></div>)}
  </div>);
}
