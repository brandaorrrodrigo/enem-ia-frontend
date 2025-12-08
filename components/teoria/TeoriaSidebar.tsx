'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * Estrutura de um tema na sidebar
 */
interface TemaItem {
  numero: string;
  titulo: string;
  slug: string;
  icone: string;
}

/**
 * Lista de temas de Matemática - Volume 1
 */
const temasMatematica: TemaItem[] = [
  { numero: '01', titulo: 'Aritmética Essencial', slug: 'tema01-aritmetica', icone: '🔢' },
  { numero: '02', titulo: 'Porcentagens e Variações', slug: 'tema02-porcentagem', icone: '📊' },
  { numero: '03', titulo: 'Regra de Três e Escalas', slug: 'tema03-proporcoes', icone: '⚖️' },
  { numero: '04', titulo: 'Funções – Interpretação', slug: 'tema04-funcoes', icone: '📈' },
  { numero: '05', titulo: 'Função Afim (1º Grau)', slug: 'tema05-funcao-afim', icone: '📐' },
  { numero: '06', titulo: 'Função Quadrática', slug: 'tema06-funcao-quadratica', icone: '🎯' },
  { numero: '07', titulo: 'Progressões: PA e PG', slug: 'tema07-progressoes', icone: '🔄' },
  { numero: '08', titulo: 'Geometria Plana', slug: 'tema08-geometria-plana', icone: '📏' },
  { numero: '09', titulo: 'Estatística', slug: 'tema09-estatistica', icone: '📉' },
  { numero: '10', titulo: 'Probabilidade e Contagem', slug: 'tema10-probabilidade', icone: '🎲' },
];

interface TeoriaSidebarProps {
  /** Matéria atual (matematica, portugues, etc.) */
  materia?: string;
  /** Se a sidebar está expandida em mobile */
  mobileOpen?: boolean;
  /** Callback para fechar sidebar em mobile */
  onMobileClose?: () => void;
}

export default function TeoriaSidebar({
  materia = 'matematica',
  mobileOpen = false,
  onMobileClose,
}: TeoriaSidebarProps) {
  const pathname = usePathname();

  // Determina qual tema está ativo baseado na URL
  const temaAtivo = temasMatematica.find(tema =>
    pathname?.includes(tema.slug)
  );

  return (
    <>
      {/* Overlay para mobile */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: mobileOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          w-72 h-screen lg:h-auto
          bg-gradient-to-b from-[#1a472a] to-[#0d2818]
          border-r-4 border-[#6b4423]
          overflow-y-auto
          lg:translate-x-0 lg:block
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Cabeçalho da Sidebar */}
        <div className="p-4 border-b-2 border-[#6b4423]/50">
          <Link href="/enem/teoria/matematica" className="block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#f5a623] to-[#d4940f] rounded-lg p-3 text-center"
            >
              <h2
                className="text-[#1a1a2e] text-lg font-bold"
                style={{ fontFamily: "'Patrick Hand', cursive" }}
              >
                📚 Matemática
              </h2>
              <p className="text-[#1a1a2e]/70 text-xs mt-1">
                Base Teórica – Volume 1
              </p>
            </motion.div>
          </Link>
        </div>

        {/* Lista de Temas */}
        <nav className="p-3">
          <ul className="space-y-1">
            {temasMatematica.map((tema, index) => {
              const isAtivo = temaAtivo?.slug === tema.slug;
              const href = `/enem/teoria/matematica/${tema.slug}`;

              return (
                <motion.li
                  key={tema.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={href} onClick={onMobileClose}>
                    <motion.div
                      whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg
                        transition-all duration-200 cursor-pointer
                        ${isAtivo
                          ? 'bg-[#f5a623]/20 border-l-4 border-[#f5a623]'
                          : 'border-l-4 border-transparent hover:border-[#f5a623]/50'
                        }
                      `}
                    >
                      {/* Número do tema */}
                      <span
                        className={`
                          w-8 h-8 flex items-center justify-center
                          rounded-full text-sm font-bold
                          ${isAtivo
                            ? 'bg-[#f5a623] text-[#1a1a2e]'
                            : 'bg-[#2d5a3d] text-[#f5f5dc]'
                          }
                        `}
                        style={{ fontFamily: "'Patrick Hand', cursive" }}
                      >
                        {tema.numero}
                      </span>

                      {/* Título e ícone */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{tema.icone}</span>
                          <span
                            className={`
                              text-sm truncate
                              ${isAtivo ? 'text-[#f5a623] font-semibold' : 'text-[#f5f5dc]'}
                            `}
                          >
                            {tema.titulo}
                          </span>
                        </div>
                      </div>

                      {/* Indicador de ativo */}
                      {isAtivo && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-2 h-2 rounded-full bg-[#f5a623]"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="p-4 mt-auto border-t-2 border-[#6b4423]/50">
          <Link href="/enem/teoria">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 px-4 bg-[#2d5a3d] hover:bg-[#3d7a52]
                         text-[#f5f5dc] rounded-lg text-sm transition-colors
                         flex items-center justify-center gap-2"
            >
              <span>📖</span>
              <span>Todas as Matérias</span>
            </motion.button>
          </Link>

          <div className="mt-3 text-center">
            <span className="text-[#f5f5dc]/50 text-xs">
              ENEM PRO © 2025
            </span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

/**
 * Hook para usar a navegação entre temas
 */
export function useTemasNavegacao(temaAtualSlug: string) {
  const index = temasMatematica.findIndex(t => t.slug === temaAtualSlug);

  return {
    temaAtual: temasMatematica[index],
    temaAnterior: index > 0 ? temasMatematica[index - 1] : null,
    proximoTema: index < temasMatematica.length - 1 ? temasMatematica[index + 1] : null,
    totalTemas: temasMatematica.length,
    indiceAtual: index + 1,
  };
}

/**
 * Exporta a lista de temas para uso em outros componentes
 */
export { temasMatematica };
export type { TemaItem };
