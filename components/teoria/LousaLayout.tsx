'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import TeoriaSidebar, { useTemasNavegacao } from './TeoriaSidebar';

interface LousaLayoutProps {
  children: React.ReactNode;
  /** Slug do tema atual (ex: 'tema01-aritmetica') */
  temaAtual?: string;
  /** Título da página */
  titulo?: string;
  /** Badge/categoria */
  badge?: string;
}

/**
 * Layout principal com lousa verde e moldura de madeira
 * Inclui sidebar e navegação entre temas
 */
export default function LousaLayout({
  children,
  temaAtual,
  titulo = 'Matemática ENEM PRO',
  badge = 'Volume 1',
}: LousaLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const navegacao = temaAtual ? useTemasNavegacao(temaAtual) : null;

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      }}
    >
      {/* Sidebar */}
      <TeoriaSidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Botão mobile para abrir sidebar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-4 left-4 z-30
                     bg-[#f5a623] text-[#1a1a2e] p-3 rounded-full
                     shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>

        {/* Container da Lousa */}
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho Amarelo */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, #f5a623 0%, #d4940f 100%)',
              padding: '1rem 2rem',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <h1
              style={{
                fontFamily: "'Patrick Hand', cursive",
                color: '#1a1a2e',
                fontSize: '1.5rem',
                margin: 0,
              }}
            >
              {titulo}
            </h1>
            <span
              style={{
                background: '#1a1a2e',
                color: '#f5a623',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {badge}
            </span>
          </motion.header>

          {/* Moldura de Madeira */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'linear-gradient(180deg, #8b5a2b 0%, #6b4423 20%, #4a3728 80%, #3d2817 100%)',
              borderRadius: '0 0 12px 12px',
              padding: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
              position: 'relative',
            }}
          >
            {/* Borda interna da moldura */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                right: '8px',
                bottom: '8px',
                border: '3px solid #3d2817',
                borderRadius: '8px',
                pointerEvents: 'none',
              }}
            />

            {/* Superfície da Lousa */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'linear-gradient(145deg, #1a472a 0%, #2d5a3d 50%, #1a472a 100%)',
                borderRadius: '4px',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '600px',
              }}
            >
              {/* Textura da lousa */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%)
                  `,
                  pointerEvents: 'none',
                }}
              />

              {/* Conteúdo */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
              </div>

              {/* Navegação entre temas */}
              {navegacao && (
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '3rem',
                    paddingTop: '2rem',
                    borderTop: '2px dashed rgba(255, 255, 255, 0.2)',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  {/* Botão Anterior */}
                  {navegacao.temaAnterior ? (
                    <Link href={`/enem/teoria/matematica/${navegacao.temaAnterior.slug}`}>
                      <motion.div
                        whileHover={{ x: -4, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#f5f5dc',
                          padding: '0.75rem 1.25rem',
                          borderRadius: '8px',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                        }}
                      >
                        <span>←</span>
                        <span>{navegacao.temaAnterior.titulo}</span>
                      </motion.div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {/* Indicador de posição */}
                  <div
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.9rem',
                      alignSelf: 'center',
                    }}
                  >
                    {navegacao.indiceAtual} / {navegacao.totalTemas}
                  </div>

                  {/* Botão Próximo */}
                  {navegacao.proximoTema ? (
                    <Link href={`/enem/teoria/matematica/${navegacao.proximoTema.slug}`}>
                      <motion.div
                        whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#f5f5dc',
                          padding: '0.75rem 1.25rem',
                          borderRadius: '8px',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{navegacao.proximoTema.titulo}</span>
                        <span>→</span>
                      </motion.div>
                    </Link>
                  ) : (
                    <Link href="/enem/teoria/matematica">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: '#f5a623',
                          color: '#1a1a2e',
                          padding: '0.75rem 1.25rem',
                          borderRadius: '8px',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <span>🏠</span>
                        <span>Voltar ao Índice</span>
                      </motion.div>
                    </Link>
                  )}
                </motion.nav>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
