'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function ChalkBackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mostrar botao quando rolar para baixo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 z-[9999] cursor-pointer group"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ffd966 0%, #ffb347 100%)',
            boxShadow: '0 4px 15px rgba(255, 217, 102, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="Voltar ao topo"
        >
          {/* Textura de giz */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.3) 1px, transparent 2px, transparent 6px)',
              borderRadius: '14px',
            }}
          />

          {/* Icone de seta */}
          <motion.div
            animate={isHovered ? { y: [-2, 2, -2] } : { y: 0 }}
            transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0 }}
            className="relative z-10"
          >
            <ChevronUp
              className="w-6 h-6"
              style={{
                color: 'var(--chalkboard-green, #0b3d2e)',
                strokeWidth: 3,
              }}
            />
          </motion.div>

          {/* Efeito de brilho */}
          <div
            className="absolute top-1 left-1 w-4 h-4 rounded-full opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8), transparent)',
            }}
          />

          {/* Tooltip "TOPO" */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 10, x: '-50%' }}
                className="absolute -top-10 left-1/2 whitespace-nowrap px-3 py-1 rounded-lg"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'var(--font-kalam)',
                  fontSize: '12px',
                  color: 'var(--accent-yellow)',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  border: '1px solid rgba(255, 217, 102, 0.3)',
                }}
              >
                TOPO
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
