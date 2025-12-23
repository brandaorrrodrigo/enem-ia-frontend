'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FPProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showValue?: boolean;
  height?: number;
  animated?: boolean;
  showSparkles?: boolean;
  onLevelUp?: () => void;
}

export default function FPProgressBar({
  current,
  max,
  label,
  showValue = true,
  height = 24,
  animated = true,
  showSparkles = true,
  onLevelUp
}: FPProgressBarProps) {
  const [prevCurrent, setPrevCurrent] = useState(current);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const percentage = Math.min((current / max) * 100, 100);
  const isNearComplete = percentage >= 90;

  useEffect(() => {
    if (current >= max && prevCurrent < max) {
      setIsLevelingUp(true);
      onLevelUp?.();
      setTimeout(() => setIsLevelingUp(false), 2000);
    }
    setPrevCurrent(current);
  }, [current, max, prevCurrent, onLevelUp]);

  return (
    <div style={{ width: '100%' }}>
      {/* Label */}
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            fontFamily: "'Patrick Hand', cursive"
          }}
        >
          <span style={{ color: 'var(--chalk-white)', fontSize: '0.875rem' }}>
            {label}
          </span>
          {showValue && (
            <span style={{ color: 'var(--accent-yellow)', fontWeight: 'bold', fontSize: '0.875rem' }}>
              {current.toLocaleString()} / {max.toLocaleString()} FP
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${height}px`,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '2px solid rgba(251, 191, 36, 0.3)',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${percentage}%`,
            background: isNearComplete
              ? [
                  'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  'linear-gradient(90deg, #f59e0b 0%, #d97706 50%, #fbbf24 100%)',
                  'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
                ]
              : 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
          }}
          transition={{
            width: { duration: animated ? 1 : 0, ease: 'easeOut' },
            background: { duration: 2, repeat: Infinity, ease: 'linear' }
          }}
          style={{
            height: '100%',
            borderRadius: '10px',
            position: 'relative',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
          }}
        >
          {/* Shine Effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              pointerEvents: 'none'
            }}
          />
        </motion.div>

        {/* Sparkles */}
        {showSparkles && percentage > 0 && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut'
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${Math.min(percentage, 95)}%`,
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px white',
                  pointerEvents: 'none'
                }}
              />
            ))}
          </>
        )}

        {/* Level Up Effect */}
        {isLevelingUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0 0 10px rgba(251, 191, 36, 1)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            🎉 LEVEL UP!
          </motion.div>
        )}

        {/* Coin Icon at the end */}
        {percentage > 10 && (
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: isNearComplete ? [1, 1.2, 1] : 1
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.5, repeat: Infinity }
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: `calc(${Math.min(percentage, 95)}% - 12px)`,
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          >
            <img
              src="/moedafp1.png"
              alt="FP"
              style={{
                width: `${height - 8}px`,
                height: `${height - 8}px`,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))'
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Progress percentage text */}
      {showValue && (
        <div style={{ textAlign: 'center', marginTop: '4px' }}>
          <motion.span
            animate={{ scale: isNearComplete ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{
              color: isNearComplete ? '#fbbf24' : 'var(--chalk-dim)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              fontFamily: "'Patrick Hand', cursive"
            }}
          >
            {percentage.toFixed(0)}%
          </motion.span>
        </div>
      )}
    </div>
  );
}
