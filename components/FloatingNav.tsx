'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingNav() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar quando rolar para cima ou no topo
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowMenu(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { label: 'Inicio', emoji: '🏠', url: '/enem' },
    { label: 'Dashboard', emoji: '📊', url: '/enem/dashboard' },
    { label: 'Simulado', emoji: '⏳', url: '/enem/simulado-relogio' },
    { label: 'Arena', emoji: '🏟️', url: '/enem/arena' },
    { label: 'Desafios', emoji: '🎯', url: '/enem/desafios' },
    { label: 'Ranking', emoji: '🏆', url: '/enem/ranking' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed top-4 left-4 z-[9999] flex items-center gap-2"
        >
          {/* Botao Voltar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-slate-900 font-bold shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            style={{ boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)' }}
            aria-label="Voltar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Botao Menu Rapido */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className={`w-12 h-12 rounded-full font-bold shadow-lg flex items-center justify-center transition-all ${
              showMenu
                ? 'bg-white text-slate-900'
                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
            }`}
            aria-label="Menu rapido"
          >
            <span className="text-xl">{showMenu ? '✕' : '☰'}</span>
          </motion.button>

          {/* Menu Dropdown */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -10 }}
                className="absolute top-14 left-0 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden min-w-[180px]"
              >
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.url}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      router.push(item.url);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-white hover:bg-white/10 transition-colors text-left"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

