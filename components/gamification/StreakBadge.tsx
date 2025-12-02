'use client';

import React from 'react';

interface StreakBadgeProps {
  dias: number;
  emRisco?: boolean;
  compact?: boolean;
}

export default function StreakBadge({ dias, emRisco = false, compact = false }: StreakBadgeProps) {
  if (dias === 0) {
    return null;
  }

  const getIcone = () => {
    if (dias >= 30) return '🔥🔥🔥';
    if (dias >= 14) return '🔥🔥';
    return '🔥';
  };

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 8px',
          backgroundColor: emRisco ? '#1f0d0d' : '#1a0d00',
          border: emRisco ? '1px solid #F44336' : '1px solid #FF9800',
          borderRadius: 20,
          fontSize: '0.85rem',
        }}
      >
        <span>{getIcone()}</span>
        <span style={{ color: emRisco ? '#F44336' : '#FF9800', fontWeight: 'bold' }}>
          {dias}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        backgroundColor: emRisco ? '#1f0d0d' : '#1a0d00',
        border: emRisco ? '2px solid #F44336' : '2px solid #FF9800',
        borderRadius: 12,
      }}
    >
      <div style={{ fontSize: '2rem' }}>{getIcone()}</div>
      <div>
        <div
          style={{
            color: emRisco ? '#F44336' : '#FF9800',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {dias} {dias === 1 ? 'dia' : 'dias'}
        </div>
        <div style={{ color: '#aaa', fontSize: '0.85rem' }}>
          {emRisco ? 'Sequência em risco!' : 'Sequência de estudos'}
        </div>
      </div>
    </div>
  );
}
