'use client';

import { useState } from 'react';

// Componente FPCoin v3.0 - Moeda de FP com imagens reais
// Uso: <FPCoin /> ou <FPCoin size="sm" /> ou <FPCoin size="lg" />
// Para animacao de ganho: <FPCoin animate="gain" />
// Variante: <FPCoin variant={1} /> ou <FPCoin variant={2} />

interface FPCoinProps {
  size?: 'sm' | 'md' | 'lg';
  value?: number;
  showValue?: boolean;
  className?: string;
  animate?: 'none' | 'gain' | 'idle';
  variant?: 1 | 2;
}

export default function FPCoin({
  size = 'md',
  value,
  showValue = false,
  className = '',
  animate = 'idle',
  variant = 1
}: FPCoinProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    sm: { coin: 20, valueFontSize: '0.75rem' },
    md: { coin: 28, valueFontSize: '1rem' },
    lg: { coin: 40, valueFontSize: '1.25rem' }
  };

  const s = sizes[size];
  const imageSrc = variant === 1 ? '/moedafp1.png' : '/moedafp2.png';

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
        className="fp-coin-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${s.coin}px`,
          height: `${s.coin}px`,
          position: 'relative',
          cursor: 'default',
          animation: getAnimation(),
          // Hover: bounce suave
          transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
          transition: 'transform 0.18s ease-out, filter 0.18s ease-out',
          filter: isHovered
            ? 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 16px rgba(251, 191, 36, 0.5))'
            : 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 10px rgba(251, 191, 36, 0.25))'
        }}
        title="FP"
      >
        <img
          src={imageSrc}
          alt="FP"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block'
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
            filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 10px rgba(251, 191, 36, 0.25));
          }
          40% {
            transform: scale(1.2);
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 25px rgba(251, 191, 36, 0.7)) brightness(1.1);
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 10px rgba(251, 191, 36, 0.25));
          }
        }
      `}</style>
    </span>
  );
}
