'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChalkIcon } from './IconFix';
import {
  Home,
  FileText,
  LayoutDashboard,
  Trophy,
  Target,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const navLinks = [
  { href: '/enem', label: 'Inicio', icon: Home },
  { href: '/enem/simulado', label: 'Simulado', icon: FileText },
  { href: '/enem/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/enem/ranking', label: 'Ranking', icon: Trophy },
  { href: '/enem/desafios', label: 'Desafios', icon: Target },
  { href: '/enem/loja', label: 'Loja', icon: ShoppingBag },
];

export default function ChalkNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile quando mudar de pagina
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/enem') return pathname === '/enem';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-black/40 backdrop-blur-md border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/enem"
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Sparkles className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-yellow-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-kalam)' }}
              >
                <span className="text-white">ENEM</span>
                <span className="text-yellow-400">-IA</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                      active
                        ? 'text-yellow-400'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    style={{ fontFamily: 'var(--font-kalam)' }}
                  >
                    <ChalkIcon icon={Icon} size={18} className={active ? 'text-yellow-400' : ''} />
                    <span>{link.label}</span>
                    {active && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-yellow-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Profile Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/enem/perfil"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                  pathname === '/enem/perfil'
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                    : 'border-white/20 text-white/80 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-kalam)' }}>
                  Perfil
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden"
            >
              <div className="mx-4 mt-2 p-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          active
                            ? 'bg-yellow-400/20 text-yellow-400'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <ChalkIcon icon={Icon} size={20} className={active ? 'text-yellow-400' : ''} />
                        <span
                          className="font-medium"
                          style={{ fontFamily: 'var(--font-kalam)' }}
                        >
                          {link.label}
                        </span>
                        {active && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-yellow-400" />
                        )}
                      </Link>
                    );
                  })}

                  {/* Divider */}
                  <div className="my-2 border-t border-white/10" />

                  {/* Profile Link Mobile */}
                  <Link
                    href="/enem/perfil"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      pathname === '/enem/perfil'
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span
                      className="font-medium"
                      style={{ fontFamily: 'var(--font-kalam)' }}
                    >
                      Meu Perfil
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
