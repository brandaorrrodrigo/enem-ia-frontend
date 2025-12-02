"use client";
import React from "react";
import ExplicadorIA from "@/components/ExplicadorIA";
import PlanCard from "@/components/PlanCard";
export default function LabsIA() {
  return (<div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-200">
    <div className="max-w-4xl mx-auto grid gap-6">
      <h1 className="text-3xl font-bold">Labs • IA Integrada (Explicação + Plano)</h1>
      <ExplicadorIA
        usuario="Rodrigo"
        enunciado={"Um corpo de massa m se move com velocidade constante v em trajetória reta. Qual é a força resultante?"}
        alternativas={{ "A": "m·a", "B": "Zero", "C": "m·v", "D": "m·g", "E": "F = Δp/Δt" }}
        respostaUsuario={2}
        correta={1}
      />
      <PlanCard />
    </div>
  </div>);
}
