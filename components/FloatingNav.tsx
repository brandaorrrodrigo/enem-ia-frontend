'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Timer,
  Target,
  Trophy,
  Swords
} from 'lucide-react';
import { ChalkIcon } from './IconFix';

interface MenuItem {
  label: string;
  icon: typeof Home;
  url: string;
}

const menuItems: MenuItem[] = [
  { label: 'Inicio', icon: Home, url: '/enem' },
  { label: 'Dashboard', icon: LayoutDashboard, url: '/enem/dashboard' },
  { label: 'Simulado', icon: Timer, url: '/enem/simulado' },
  { label: 'Arena', icon: Swords, url: '/enem/arena' },
  { label: 'Desafios', icon: Target, url: '/enem/desafios' },
  { label: 'Ranking', icon: Trophy, url: '/enem/ranking' },
];

export default function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();
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

  // Fechar menu ao mudar de pagina
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const isActive = (url: string) => {
    if (url === '/enem') return pathname === '/enem';
    return pathname.startsWith(url);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 left-4 z-[9990] flex items-center gap-2"
        >
          {/* Botao Voltar - estilo giz */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all group overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ffd966 0%, #ffb347 100%)',
              boxShadow: '0 4px 15px rgba(255, 217, 102, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
            aria-label="Voltar"
          >
            {/* Textura de giz */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.3) 1px, transparent 2px, transparent 6px)',
              }}
            />
            <ArrowLeft className="w-5 h-5 text-slate-800 relative z-10" strokeWidth={2.5} />
          </motion.button>

          {/* Botao Menu Rapido */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className={`w-11 h-11 rounded-xl font-bold flex items-center justify-center transition-all border-2 ${
              showMenu
                ? 'bg-white text-slate-900 border-white'
                : 'bg-black/50 backdrop-blur-md text-white border-white/20 hover:border-white/40'
            }`}
            style={{
              boxShadow: showMenu
                ? '0 4px 15px rgba(255,255,255,0.3)'
                : '0 4px 15px rgba(0,0,0,0.3)',
            }}
            aria-label="Menu rapido"
          >
            {showMenu ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </motion.button>

          {/* Menu Dropdown */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute top-14 left-0 overflow-hidden min-w-[200px]"
              >
                <div
                  className="p-2 rounded-2xl border-2 border-white/15"
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {menuItems.map((item, idx) => {
                    const Icon = item.icon;
                    const active = isActive(item.url);

                    return (
                      <motion.button
                        key={item.url}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        onClick={() => {
                          router.push(item.url);
                          setShowMenu(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all text-left ${
                          active
                            ? 'bg-yellow-400/20 text-yellow-400'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <ChalkIcon
                          icon={Icon}
                          size={20}
                          color={active ? 'yellow' : 'white'}
                        />
                        <span
                          className="font-medium"
                          style={{ fontFamily: 'var(--font-kalam)' }}
                        >
                          {item.label}
                        </span>
                        {active && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 rounded-full bg-yellow-400"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
