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
            className="mb-10"
          >
            <div className="inline-flex items-center gap-4 text-7xl sm:text-8xl">
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
            className="text-4xl sm:text-5xl md:text-7xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-10 leading-tight relative z-10"
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
            className="text-2xl sm:text-3xl md:text-4xl font-['Caveat'] text-[var(--chalk-dim)] mb-16 max-w-3xl mx-auto relative z-10"
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
            <div className="card bg-gradient-to-br from-[rgba(255,215,0,0.15)] to-[rgba(255,179,71,0.1)]"
            >
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
                  <span className="text-2xl sm:text-3xl text-[var(--accent-yellow)] flex-shrink-0">{item.icon}</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-['Poppins'] text-[var(--chalk-white)] font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-12"
          >
            <Link
              href="/cadastro"
              className="inline-block btn-yellow px-10 sm:px-20 py-5 sm:py-7 text-2xl sm:text-3xl font-bold rounded-full shadow-2xl transform transition-all hover:scale-110 hover:shadow-[0_15px_50px_rgba(255,215,0,0.6)]"
            >
              COMEÇAR GRÁTIS AGORA
            </Link>
          </motion.div>

          {/* Badges de garantia */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap justify-center items-center gap-8 text-[var(--chalk-dim)] font-['Poppins'] text-base sm:text-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent-green)] text-2xl">✓</span>
              <span className="text-lg sm:text-xl">Sem cartão necessário</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent-green)] text-2xl">✓</span>
              <span className="text-lg sm:text-xl">Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--accent-green)] text-2xl">✓</span>
              <span className="text-lg sm:text-xl">100% seguro</span>
            </div>
          </motion.div>

          {/* Mensagem final com moldura */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <div className="card text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-['Caveat'] text-[var(--accent-yellow)] mb-6">
                "A diferença entre o sonho e a realidade é ação"
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-[var(--chalk-dim)] font-['Poppins']">
                Junte-se aos milhares de estudantes que escolheram estudar com inteligência
              </p>
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
