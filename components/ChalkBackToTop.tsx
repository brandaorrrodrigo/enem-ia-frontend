'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChalkDust {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function ChalkBackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [chalkDust, setChalkDust] = useState<ChalkDust[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mostrar botão quando rolar para baixo
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

  // Criar partículas de pó de giz
  const createDust = useCallback((x: number, y: number) => {
    const newDust: ChalkDust[] = [];
    for (let i = 0; i < 5; i++) {
      newDust.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }
    setChalkDust((prev) => [...prev, ...newDust].slice(-50)); // Limitar a 50 partículas
  }, []);

  // Efeito de pó ao mover o mouse sobre o botão
  useEffect(() => {
    if (isHovered || isDragging) {
      const interval = setInterval(() => {
        createDust(mousePos.x, mousePos.y);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered, isDragging, mousePos, createDust]);

  // Limpar partículas antigas
  useEffect(() => {
    const cleanup = setInterval(() => {
      setChalkDust((prev) => prev.filter((dust) => Date.now() - dust.id < 1000));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  const scrollToTop = () => {
    // Criar explosão de pó ao clicar
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createDust(mousePos.x, mousePos.y);
      }, i * 20);
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left + rect.width / 2,
      y: e.clientY - rect.top + rect.height / 2,
    });
  };

  return (
    <>
      {/* Partículas de pó de giz */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        <AnimatePresence>
          {chalkDust.map((dust) => (
            <motion.div
              key={dust.id}
              initial={{
                opacity: dust.opacity,
                scale: 1,
                x: dust.x + window.innerWidth - 100,
                y: dust.y + window.innerHeight - 100,
              }}
              animate={{
                opacity: 0,
                scale: 0,
                y: dust.y + window.innerHeight - 100 + 30,
                x: dust.x + window.innerWidth - 100 + (Math.random() - 0.5) * 40,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute rounded-full bg-white"
              style={{
                width: dust.size,
                height: dust.size,
                boxShadow: '0 0 4px rgba(255,255,255,0.8)',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Botão de giz */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsDragging(false);
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="fixed bottom-6 right-6 z-[9999] cursor-pointer group"
            style={{
              width: '60px',
              height: '60px',
              background: 'transparent',
              border: 'none',
              padding: 0,
            }}
            aria-label="Voltar ao topo"
          >
            {/* Sombra do giz */}
            <div
              className="absolute inset-0 rounded-lg opacity-30 blur-md"
              style={{
                background: 'rgba(255,255,255,0.5)',
                transform: 'translateY(4px)',
              }}
            />

            {/* Corpo do giz de cera */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-visible"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%)',
                borderRadius: '8px 8px 4px 4px',
                boxShadow: `
                  inset 0 2px 4px rgba(255,255,255,0.9),
                  inset 0 -2px 4px rgba(0,0,0,0.1),
                  0 4px 12px rgba(0,0,0,0.3),
                  0 2px 4px rgba(0,0,0,0.2)
                `,
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              {/* Textura de giz */}
              <div
                className="absolute inset-0 rounded-lg opacity-30"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      rgba(200,200,200,0.3) 2px,
                      rgba(200,200,200,0.3) 4px
                    )
                  `,
                }}
              />

              {/* Marcas de uso no giz */}
              <div
                className="absolute top-1 left-1 right-1 h-2 rounded opacity-20"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)',
                }}
              />

              {/* Ponta desgastada */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-3"
                style={{
                  background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
                  borderRadius: '0 0 50% 50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />

              {/* Seta para cima */}
              <motion.div
                animate={isHovered ? { y: [-2, 2, -2] } : { y: 0 }}
                transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
                className="relative z-10"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0b3d2e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.5))',
                  }}
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </motion.div>

              {/* Efeito de brilho */}
              <div
                className="absolute top-2 left-2 w-3 h-6 rounded-full opacity-60"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9), transparent)',
                }}
              />
            </div>

            {/* Partículas ao redor quando hover */}
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      x: Math.cos((i / 6) * Math.PI * 2) * 40,
                      y: Math.sin((i / 6) * Math.PI * 2) * 40,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                    }}
                  />
                ))}
              </>
            )}

            {/* Texto "TOPO" estilo giz */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              style={{
                fontFamily: "'Chalkduster', 'Comic Sans MS', cursive",
                fontSize: '12px',
                color: 'white',
                textShadow: '0 0 4px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '2px',
              }}
            >
              TOPO
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Rastro de giz na tela (quando arrasta) */}
      {isDragging && (
        <div
          className="fixed inset-0 pointer-events-none z-[9997]"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.05) 0%, transparent 100px)',
          }}
        />
      )}
    </>
  );
}
