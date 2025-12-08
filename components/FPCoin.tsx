'use client';

import { useState } from 'react';

// Componente FPCoin v2.0 - Moeda de FP estilo giz com animacoes refinadas
// Uso: <FPCoin /> ou <FPCoin size="sm" /> ou <FPCoin size="lg" />
// Para animacao de ganho: <FPCoin animate="gain" />

interface FPCoinProps {
  size?: 'sm' | 'md' | 'lg';
  value?: number;
  showValue?: boolean;
  className?: string;
  animate?: 'none' | 'gain' | 'idle';
}

export default function FPCoin({
  size = 'md',
  value,
  showValue = false,
  className = '',
  animate = 'idle'
}: FPCoinProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { coin: 20, font: 8, valueFontSize: '0.75rem' },
    md: { coin: 28, font: 11, valueFontSize: '1rem' },
    lg: { coin: 40, font: 16, valueFontSize: '1.25rem' }
  };

  const s = sizes[size];

  // Determinar animacao baseado no estado
  const getAnimation = () => {
    if (animate === 'gain') return 'fpCoinGain 0.4s ease-out';
    if (animate === 'none' || isHovered) return 'none';
    return 'none'; // Sem loop continuo - brilho apenas no hover
  };

  return (
    <span
      className={`fp-coin-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      <span
        className="fp-coin"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${s.coin}px`,
          height: `${s.coin}px`,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          boxShadow: isHovered
            ? `
              inset 0 2px 4px rgba(255, 255, 255, 0.5),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 3px 8px rgba(0, 0, 0, 0.35),
              0 0 16px rgba(251, 191, 36, 0.5)
            `
            : `
              inset 0 2px 4px rgba(255, 255, 255, 0.4),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 2px 6px rgba(0, 0, 0, 0.3),
              0 0 10px rgba(251, 191, 36, 0.25)
            `,
          border: '2px solid #d97706',
          fontFamily: "'Patrick Hand', cursive",
          fontSize: `${s.font}px`,
          fontWeight: 700,
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          animation: getAnimation(),
          position: 'relative',
          overflow: 'hidden',
          cursor: 'default',
          // Hover: bounce suave
          transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
          transition: 'transform 0.18s ease-out, box-shadow 0.18s ease-out'
        }}
        title="FP"
      >
        <span style={{ position: 'relative', zIndex: 2 }}>FP</span>
        {/* Brilho - apenas no hover */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: isHovered ? '100%' : '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            transition: 'left 0.5s ease-out',
            pointerEvents: 'none'
          }}
        />
      </span>
      {showValue && value !== undefined && (
        <span
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: s.valueFontSize,
            fontWeight: 700,
            color: 'var(--accent-yellow)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s ease-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {value.toLocaleString()}
        </span>
      )}
      <style jsx>{`
        @keyframes fpCoinGain {
          0% {
            transform: scale(1);
            box-shadow:
              inset 0 2px 4px rgba(255, 255, 255, 0.4),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 2px 6px rgba(0, 0, 0, 0.3),
              0 0 10px rgba(251, 191, 36, 0.25);
          }
          40% {
            transform: scale(1.2);
            box-shadow:
              inset 0 2px 6px rgba(255, 255, 255, 0.6),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 4px 12px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(251, 191, 36, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow:
              inset 0 2px 4px rgba(255, 255, 255, 0.4),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2),
              0 2px 6px rgba(0, 0, 0, 0.3),
              0 0 10px rgba(251, 191, 36, 0.25);
          }
        }
      `}</style>
    </span>
  );
}
