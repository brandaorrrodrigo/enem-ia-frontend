'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTAFinalSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden z-10">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,215,0,0.05)] to-transparent z-0" />

      <div className="container max-w-5xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Decoração superior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 px-5 sm:px-8 lg:px-14"
          >
            <div className="inline-flex items-center gap-4 text-6xl sm:text-7xl lg:text-8xl">
              <span>🎯</span>
              <span>📚</span>
              <span>🏆</span>
            </div>
          </motion.div>

          {/* Título principal */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-10 leading-tight relative z-10 px-5 sm:px-8 lg:px-14"
          >
            Seu sonho não merece{' '}
            <span className="text-[var(--accent-yellow)]">
              estudo genérico
            </span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[44px] font-['Caveat'] text-[var(--chalk-dim)] mb-16 max-w-4xl mx-auto relative z-40 leading-relaxed px-5 sm:px-8 lg:px-14"
          >
            Cada dia conta. Cada questão importa. Cada decisão molda seu futuro.
          </motion.p>

          {/* Card de destaque com moldura de madeira */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="card bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(255,179,71,0.1)] relative"
            >
              <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
                <div className="space-y-5">
                  {[
                    { icon: '✓', text: 'Estudo baseado em dados reais do ENEM' },
                    { icon: '✓', text: 'IA que te guia em cada passo do caminho' },
                    { icon: '✓', text: 'Gamificação que mantém você motivado' },
                    { icon: '✓', text: 'Comece grátis, sem cartão, agora mesmo' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-4 text-left"
                    >
                      <span className="text-xl sm:text-2xl lg:text-3xl text-[var(--accent-yellow)] flex-shrink-0">{item.icon}</span>
                      <span className="text-base sm:text-lg lg:text-xl font-['Poppins'] text-[var(--chalk-white)] font-medium leading-relaxed">
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-12 px-5 sm:px-8 lg:px-14"
          >
            <Link
              href="/cadastro"
              className="inline-block btn-yellow px-8 sm:px-12 lg:px-20 py-4 sm:py-5 lg:py-7 min-h-[48px] text-lg sm:text-xl lg:text-2xl font-bold rounded-full shadow-2xl transform transition-all hover:scale-110 hover:shadow-[0_15px_50px_rgba(255,215,0,0.6)]"
            >
              COMEÇAR GRÁTIS AGORA
            </Link>
          </motion.div>

          {/* Mensagem final com moldura */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 mb-12 max-w-3xl mx-auto relative z-30"
          >
            <div className="card text-center relative">
              <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-['Caveat'] text-[var(--accent-yellow)] mb-6 leading-relaxed">
                  "A diferença entre o sonho e a realidade é ação"
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-[var(--chalk-dim)] font-['Poppins'] leading-relaxed">
                  Junte-se aos milhares de estudantes que escolheram estudar com inteligência
                </p>
              </div>
            </div>
          </motion.div>

          {/* Badges de garantia */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12 text-[var(--chalk-dim)] font-['Poppins'] px-5 sm:px-8 lg:px-14 relative z-20"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-[var(--accent-green)] text-2xl sm:text-3xl lg:text-4xl">✓</span>
              <span className="text-[44px] font-medium">Sem cartão necessário</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-[var(--accent-green)] text-2xl sm:text-3xl lg:text-4xl">✓</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-medium">Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-[var(--accent-green)] text-2xl sm:text-3xl lg:text-4xl">✓</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-medium">100% seguro</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute top-20 left-10 text-5xl opacity-20">✨</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20">🌟</div>
      <div className="absolute bottom-20 left-1/4 text-5xl opacity-20">💫</div>
      <div className="absolute bottom-32 right-1/3 text-5xl opacity-20">⭐</div>
    </section>
  );
}
