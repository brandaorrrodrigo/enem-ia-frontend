// components/DisciplinasTabs.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export type DisciplinaKey =
  | 'matematica' | 'fisica' | 'quimica' | 'biologia'
  | 'historia' | 'geografia' | 'redacao' | 'ingles'
  | 'literatura' | 'espanhol';

const DISCIPLINAS: Array<{ key: DisciplinaKey; label: string; materia: string }> = [
  { key: 'matematica', label: 'Matemática', materia: 'Funções do 2º grau' },
  { key: 'fisica', label: 'Física', materia: 'Leis de Newton' },
  { key: 'quimica', label: 'Química', materia: 'Soluções & pH' },
  { key: 'biologia', label: 'Biologia', materia: 'Ciclo de Krebs' },
  { key: 'historia', label: 'História', materia: 'Revolução Francesa' },
  { key: 'geografia', label: 'Geografia', materia: 'Climas do Brasil' },
  { key: 'redacao', label: 'Redação', materia: 'Tese e intervenção' },
  { key: 'ingles', label: 'Inglês', materia: 'Reading strategies' },
  { key: 'literatura', label: 'Literatura', materia: 'Modernismo (22/30/45)' },
  { key: 'espanhol', label: 'Espanhol', materia: 'Pretérito vs. Imperfecto' },
];

export default function DisciplinasTabs() {
  const pathname = usePathname();
  const search = useSearchParams();
  const materiaQS = search.get('materia') || '';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1500,
        display: 'flex',
        gap: 8,
        padding: '10px 14px',
        background: 'rgba(3, 15, 10, .55)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {DISCIPLINAS.map((d) => {
        const active = pathname?.endsWith(`/disciplinas/${d.key}`);
        const materia = materiaQS || d.materia;
        return (
          <Link
            key={d.key}
            href={{ pathname: `/disciplinas/${d.key}`, query: { materia } }}
            style={{
              textDecoration: 'none',
              color: active ? '#1a1a1a' : '#f0f0e8',
              background: active ? 'var(--amarelo, #fef08a)' : 'rgba(255,255,255,.12)',
              padding: '8px 12px',
              borderRadius: 10,
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,.15)',
              boxShadow: active ? '0 0 0 2px rgba(0,0,0,.15) inset' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {d.label}
          </Link>
        );
      })}
    </nav>
  );
}
