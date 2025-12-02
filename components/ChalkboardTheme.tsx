// components/ChalkboardTheme.tsx
'use client';
import React from 'react';
import styles from './chalkboard.module.css';

type DisciplinaKey =
  | 'matematica' | 'fisica' | 'quimica' | 'biologia'
  | 'historia' | 'geografia' | 'redacao' | 'ingles'
  | 'literatura' | 'espanhol';

type Props = {
  children: React.ReactNode;
  disciplina?: DisciplinaKey;
};

const bgBy: Record<string, string> = {
  matematica: '#244f34',
  fisica: '#2a3d50',
  quimica: '#2f304f',
  biologia: '#2e4a36',
  historia: '#50342a',
  geografia: '#324f50',
  redacao: '#334155',
  ingles: '#2f4858',
  literatura: '#4a2f4d',
  espanhol: '#4a3a2f',
};

export default function ChalkboardTheme({ children, disciplina }: Props) {
  const style: React.CSSProperties = {
    backgroundColor: disciplina ? bgBy[disciplina] || '#25422d' : '#25422d',
  };

  return (
    <div className={styles.chalkWrapper} data-disciplina={disciplina} style={style}>
      <div className={styles.chalkOverlay} />
      {children}
    </div>
  );
}
