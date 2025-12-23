'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Coin {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  variant: 1 | 2;
  size: number;
}

interface FPCelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
  coinCount?: number;
  duration?: number;
}

export default function FPCelebration({
  isActive,
  onComplete,
  coinCount = 30,
  duration = 3000
}: FPCelebrationProps) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Gerar moedas aleatórias
      const newCoins: Coin[] = [];
      for (let i = 0; i < coinCount; i++) {
        newCoins.push({
          id: i,
          x: Math.random() * 100, // Posição horizontal em %
          delay: Math.random() * 0.5, // Delay inicial
          duration: 1.5 + Math.random() * 1, // Duração da queda
          rotation: Math.random() * 720 - 360, // Rotação aleatória
          variant: Math.random() > 0.7 ? 2 : 1, // 30% chance de moeda especial
          size: 30 + Math.random() * 20 // Tamanho variado
        });
      }
      setCoins(newCoins);
      setShowFireworks(true);

      // Limpar após duração
      const timer = setTimeout(() => {
        setCoins([]);
        setShowFireworks(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, coinCount, duration, onComplete]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {/* Fogos de artifício de fundo */}
      <AnimatePresence>
        {showFireworks && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`firework-${i}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  ease: 'easeOut'
                }}
                style={{
                  position: 'absolute',
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: i % 2 === 0
                    ? 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, transparent 70%)'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Chuva de moedas */}
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          initial={{ y: -100, x: `${coin.x}vw`, opacity: 0, rotate: 0, scale: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 1, 0],
            rotate: coin.rotation,
            scale: [0, 1.2, 1, 0.8]
          }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            ease: 'easeIn'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <motion.img
            src={coin.variant === 1 ? '/moedafp1.png' : '/moedafp2.png'}
            alt="FP"
            whileHover={{ scale: 1.3, rotate: 360 }}
            style={{
              width: `${coin.size}px`,
              height: `${coin.size}px`,
              objectFit: 'contain',
              filter: coin.variant === 2
                ? 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))'
                : 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
          />
        </motion.div>
      ))}

      {/* Partículas de brilho */}
      {showFireworks && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{
                x: '50vw',
                y: '50vh',
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent-yellow)',
                boxShadow: '0 0 6px var(--accent-yellow)'
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
