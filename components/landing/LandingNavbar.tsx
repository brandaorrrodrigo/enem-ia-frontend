'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(26, 51, 40, 0)', 'rgba(26, 51, 40, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-2xl backdrop-blur-md' : ''
      }`}
    >
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-['Patrick_Hand'] font-bold text-[var(--accent-yellow)]"
              style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.3), 0 0 20px rgba(255,235,150,0.3)'
              }}
            >
              ENEM PRO
            </motion.div>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#planos"
              className="text-[var(--chalk-white)] font-['Poppins'] font-medium hover:text-[var(--accent-yellow)] transition-colors"
            >
              Planos
            </a>
            <a
              href="#diferenciais"
              className="text-[var(--chalk-white)] font-['Poppins'] font-medium hover:text-[var(--accent-yellow)] transition-colors"
            >
              Diferenciais
            </a>
            <Link
              href="/login"
              className="text-[var(--chalk-white)] font-['Poppins'] font-medium hover:text-[var(--accent-yellow)] transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="btn-yellow px-6 py-2 rounded-full font-['Poppins'] font-bold text-sm shadow-lg hover:scale-105 transition-transform"
            >
              Começar Grátis
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/login"
              className="text-[var(--chalk-white)] font-['Poppins'] text-sm font-medium"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="btn-yellow px-4 py-2 rounded-full font-['Poppins'] font-bold text-sm"
            >
              Grátis
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
