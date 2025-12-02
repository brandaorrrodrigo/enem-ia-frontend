// components/ChalkLoader.tsx
'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

/** Disciplinas suportadas */
export type DisciplinaKey =
  | 'matematica' | 'fisica' | 'quimica' | 'biologia'
  | 'historia' | 'geografia' | 'redacao' | 'ingles'
  | 'literatura' | 'espanhol';

type Props = {
  disciplina: DisciplinaKey;
  materia: string;
  /** Dispara automaticamente a animação ao montar */
  auto?: boolean;
  /** Velocidade (ms por caractere) */
  typingSpeedMsPerChar?: number;
  /** Tempo mínimo de exibição antes de chamar onDone */
  minShowMs?: number;
  /** Callback ao terminar a animação */
  onDone?: () => void;
};

/** Linhas por disciplina (conteúdo que será "escrito" em giz) */
const LINES: Record<DisciplinaKey, string[]> = {
  matematica: [
    'Matemática — {MATERIA}',
    'f(x) = ax² + bx + c   Δ = b² − 4ac',
    'x = (−b ± √Δ) / 2a',
    'sen²θ + cos²θ = 1',
    'PA: a_n = a_1 + (n−1)·r  |  PG: a_n = a_1·q^(n−1)',
  ],
  fisica: [
    'Física — {MATERIA}',
    '1ª Lei: Inércia | 2ª: F = m·a | 3ª: Ação e Reação',
    'MRU: s = s₀ + v·t   |   MRUV: s = s₀ + v₀t + ½at²',
    'E_c = ½ m v²   |   E_p = m g h   |   P = τ·ω',
  ],
  quimica: [
    'Química — {MATERIA}',
    'pH = −log[H⁺] | pOH = −log[OH⁻] | pH + pOH = 14',
    'n = m/M  |  C = n/V  |  PV = nRT',
    'ΔE = q + w   |   ΔG = ΔH − TΔS',
  ],
  biologia: [
    'Biologia — {MATERIA}',
    'Ciclo de Krebs: Citrato → Isocitrato → α-Cetoglutarato',
    '→ Succinil‑CoA → Succinato → Fumarato → Malato → Oxaloacetato',
    'DNA: A‑T | C‑G  •  RNA: A‑U | C‑G',
  ],
  historia: [
    'História — {MATERIA}',
    '1789: Revolução Francesa — Liberdade, Igualdade, Fraternidade',
    'Idade Contemporânea → Industrialização → Imperialismo',
    'Brasil: Período Regencial → 2º Reinado → República',
  ],
  geografia: [
    'Geografia — {MATERIA}',
    'Climas do Brasil: Equatorial, Tropical, Semiárido, Subtropical',
    'Relevo: Planaltos, Planícies, Depressões',
    'Industrialização, Urbanização, Migrações internas',
  ],
  redacao: [
    'Redação — {MATERIA}',
    'Tese clara + Argumentos + Repertório sociocultural',
    'Coesão: conectivos | Coerência: progressão lógica',
    'Proposta de intervenção: agente + ação + modo + efeito + detalhamento',
  ],
  ingles: [
    'English — {MATERIA}',
    'Reading strategies: skimming, scanning, context clues',
    'Verb tenses: Simple, Continuous, Perfect',
    'Cognates & false friends | Topic, main idea, inference',
  ],
  literatura: [
    'Literatura — {MATERIA}',
    'Modernismo (1922/30/45): ruptura, linguagem coloquial, nacionalismo',
    'Quinhentismo, Barroco, Arcadismo, Romantismo, Realismo...',
    'Figuras de linguagem: metáfora, metonímia, hipérbole, ironia',
  ],
  espanhol: [
    'Español — {MATERIA}',
    'Pret. Indefinido × Imperfecto × Pret. Perfecto',
    'Falsos cognados | Perífrasis verbales | Conectores',
    'Comprensión lectora: idea principal, tono, intención',
  ],
};

/** Util: converte linhas substituindo {MATERIA} */
function resolveLines(d: DisciplinaKey, materia: string): string[] {
  const raw = LINES[d] || LINES['matematica'];
  return raw.map(l => l.replace('{MATERIA}', materia));
}

/** Anima "digitação com giz" linha por linha */
export default function ChalkLoader({
  disciplina,
  materia,
  auto = true,
  typingSpeedMsPerChar = 26,
  minShowMs = 600,
  onDone,
}: Props) {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const lines = useMemo(() => resolveLines(disciplina, materia), [disciplina, materia]);

  const li = useRef(0);  // índice da linha
  const ci = useRef(0);  // índice do char
  const raf = useRef<number | null>(null);
  const tStart = useRef<number | null>(null);

  useEffect(() => {
    // reinicia quando disciplina/matéria mudar
    li.current = 0;
    ci.current = 0;
    setVisibleLines([]);
    setCurrentText('');
    setStarted(false);
    setDone(false);
    if (auto) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join('||')]);

  function tick() {
    const line = lines[li.current] ?? '';
    if (ci.current <= line.length) {
      setCurrentText(line.slice(0, ci.current));
      ci.current += 1;
      raf.current = window.setTimeout(tick, typingSpeedMsPerChar) as any;
    } else {
      // terminou a linha atual
      setVisibleLines(prev => [...prev, line]);
      setCurrentText('');
      li.current += 1;
      ci.current = 0;
      if (li.current < lines.length) {
        raf.current = window.setTimeout(tick, Math.max(220, typingSpeedMsPerChar * 4)) as any;
      } else {
        // terminou todas as linhas
        const now = Date.now();
        const elapsed = tStart.current ? now - tStart.current : 0;
        const rest = Math.max(0, minShowMs - elapsed);
        window.setTimeout(() => {
          setDone(true);
          onDone && onDone();
        }, rest);
      }
    }
  }

  function start() {
    if (started) return;
    setStarted(true);
    tStart.current = Date.now();
    tick();
  }

  useEffect(() => {
    return () => {
      if (raf.current) window.clearTimeout(raf.current as any);
    };
  }, []);

  // Se terminou, não renderiza mais nada (libera a tela)
  if (done) return null;

  return (
    <div className="chalk-loader">
      <div className="chalk-area">
        {visibleLines.map((l, idx) => (
          <div className="chalk-line" key={idx}>{l}</div>
        ))}
        {!!currentText && (
          <div className="chalk-line chalk-caret">
            {currentText}
            <span className="caret">▌</span>
          </div>
        )}
      </div>

      {/* estilos do overlay */}
      <style jsx>{`
        .chalk-loader{
          position: fixed;
          inset: 0;
          display: grid;
          place-items: start left;
          padding: 80px 32px 40px 32px;
          pointer-events: none;
          z-index: 1200;
        }
        .chalk-area{
          max-width: min(1100px, 92vw);
          font-family: 'Kalam', cursive;
          color: rgba(240,240,232,.92);
          text-shadow: 0 0 1px rgba(255,255,255,.7), 0 0 12px rgba(255,255,255,.08);
          line-height: 1.6;
          font-size: clamp(16px, 1.8vw, 22px);
          user-select: none;
        }
        .chalk-line{
          white-space: pre-wrap;
          will-change: contents;
          transform-origin: left center;
          animation: microJitter .12s infinite steps(2,end);
        }
        .chalk-line + .chalk-line{ margin-top: .25rem; }
        .chalk-caret .caret{
          display: inline-block;
          margin-left: .15rem;
          animation: blink .9s infinite;
        }
        @keyframes blink { 0%, 49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes microJitter {
          0%{ transform: translate(0,0) rotate(0deg) }
          50%{ transform: translate(.2px, .2px) rotate(-.05deg) }
          100%{ transform: translate(0,0) rotate(0deg) }
        }

        /* Responsivo: aproxima a escrita do topo em telas pequenas */
        @media (max-width: 640px){
          .chalk-loader{ padding: 70px 14px 24px 14px; }
          .chalk-area{ font-size: clamp(15px, 3.6vw, 20px); }
        }
      `}</style>
    </div>
  );
}
