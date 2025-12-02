// components/ChalkboardLayer.tsx
"use client";

import React, { useMemo } from "react";
import { DisciplinaKey } from "./ChalkLoader";

type Props = {
  theme: DisciplinaKey;
};

const SCRIBBLES: Record<DisciplinaKey, string[]> = {
  matematica: [
    "∫ f(x)dx = F(x)+C    e^{iπ}+1 = 0    a² + b² = c²",
    "sen²θ + cos²θ = 1    Δ = b² - 4ac    y = mx + b",
    "lim (1 + 1/x)^x = e    ∑ 1/n² = π²/6"
  ],
  fisica: [
    "F = ma    Δx = v₀t + ½at²    τ = r × F",
    "E = hν    λ = h/p    v = s/t",
    "Princípio da Ação e Reação"
  ],
  quimica: [
    "PV = nRT    pH = -log[H⁺]    pH + pOH = 14",
    "ΔG = ΔH - TΔS    Kw = 10⁻¹⁴",
    "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O"
  ],
  biologia: [
    "DNA → RNA → Proteína    ATP↑",
    "Mitose: P-M-A-T    Meiose I/II",
    "Krebs: Acetil-CoA→Citrato→α-CG→Malato→OAA"
  ],
  historia: [
    "1789 Revolução Francesa",
    "1930 Era Vargas",
    "1988 Constituição Cidadã"
  ],
  geografia: [
    "Latitude / Longitude",
    "Biomas do Brasil",
    "Urbanização — Migrações — Clima"
  ],
  redacao: [
    "Tese — Argumento — Repertório — Intervenção",
    "Coesão / Coerência",
    "Agente — Ação — Modo — Efeito"
  ],
  ingles: [
    "Reading — Main idea — Context clues",
    "Inference — Tone — Details",
    "Phrasal verbs: look up / take off / give in"
  ],
  literatura: [
    "Trovadorismo — Classicismo — Barroco",
    "Modernismo (22/30/45)",
    "Metáfora — Antítese — Ironia"
  ],
  espanhol: [
    "Pretérito — Imperfecto",
    "Conectores: además, sin embargo",
    "Idea principal — detalles"
  ],
};

export default function ChalkboardLayer({ theme }: Props) {
  const scribbles = useMemo(() => SCRIBBLES[theme], [theme]);

  return (
    <div className="chalk-layer">

      {/* Textura da lousa */}
      <div className="chalk-texture" />

      {/* Linhas de equações/flutuando */}
      <div className="chalk-equations">
        {scribbles.map((line, index) => (
          <div key={index} className={`chalk-line line-${index}`}>
            {line}
          </div>
        ))}
      </div>

      {/* Doodles específicos por disciplina */}
      <div className="chalk-doodles">
        {theme === "matematica" && (
          <>
            <div className="doodle" style={{ top: "70%", left: "10%" }}>
              Δ = b² - 4ac
            </div>
            <svg className="doodle" style={{ top: "20%", right: "5%" }} width="180" height="80">
              <path d="M10 60 L160 60 M85 15 Q120 50 160 60" stroke="currentColor" fill="none" strokeWidth="2"/>
            </svg>
          </>
        )}

        {theme === "fisica" && (
          <div className="doodle" style={{ top: "35%", left: "5%" }}>
            g ≈ 9,8 m/s²
          </div>
        )}

        {theme === "quimica" && (
          <div className="doodle" style={{ top: "15%", right: "8%" }}>
            ΔG = ΔH - TΔS
          </div>
        )}

        {theme === "biologia" && (
          <div className="doodle" style={{ top: "20%", left: "12%" }}>
            ATP ↑
          </div>
        )}
      </div>

      {/* Estilos scoped */}
      <style jsx>{`
        .chalk-layer {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .chalk-texture {
          position: absolute;
          inset: 0;
          background: #0d5f3a;
          background-image:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 4px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 4px);
        }

        .chalk-equations {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          color: rgba(240,240,232,0.14);
          font-size: 1.2rem;
        }

        .chalk-line {
          position: absolute;
          white-space: nowrap;
          animation: chalk-scroll 40s linear infinite;
        }

        .line-1 { top: 10%; animation-duration: 38s; }
        .line-2 { top: 40%; animation-duration: 42s; opacity: 0.10; }
        .line-3 { top: 70%; animation-duration: 48s; opacity: 0.08; }

        @keyframes chalk-scroll {
          0% { transform: translateX(120%); }
          100% { transform: translateX(-140%); }
        }

        .chalk-doodles {
          position: absolute;
          inset: 0;
          font-size: 1.4rem;
          color: rgba(240,240,232,0.20);
        }

        .doodle {
          position: absolute;
        }
.chalk-overlay-writing {
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 1000;
  pointer-events: none;
}

      `}</style>
    </div>
  );
}
