'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 z-10">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">📚</div>
        <div className="absolute top-40 right-20 text-6xl">🎯</div>
        <div className="absolute bottom-20 left-1/4 text-6xl">🏆</div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-10 relative z-10"
            style={{
              textShadow: '3px 3px 0px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.1)',
              lineHeight: '1.2'
            }}
          >
            ENEM PRO
            <br />
            <span className="text-[var(--accent-yellow)]">
              Estude com Estratégia.
            </span>
            <br />
            <span className="text-5xl md:text-6xl">
              Passe com Inteligência.
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-['Caveat'] text-[var(--chalk-dim)] mb-16 max-w-4xl mx-auto leading-relaxed relative z-10"
          >
            A primeira plataforma que une IA, estatística real do ENEM, simulados inteligentes
            e gamificação para maximizar sua nota.
          </motion.p>

          {/* Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: '📝', text: 'Simulados personalizados' },
              { icon: '🎯', text: 'Banco massivo de questões' },
              { icon: '✍️', text: 'Correção de redação por IA' },
              { icon: '🎮', text: 'Gamificação com ranking' },
              { icon: '📊', text: 'Plano de estudos por nota-alvo' },
              { icon: '🤖', text: 'Tutor inteligente 24/7' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-4 bg-[rgba(255,255,255,0.08)] backdrop-blur-sm px-6 py-5 rounded-lg border border-[rgba(255,255,255,0.15)]"
              >
                <span className="text-3xl sm:text-4xl">{item.icon}</span>
                <span className="text-base sm:text-lg md:text-xl text-[var(--chalk-white)] font-['Poppins'] font-medium">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/cadastro"
              className="btn-yellow px-12 py-6 text-xl sm:text-2xl font-bold rounded-full shadow-2xl transform transition-all hover:scale-110 hover:shadow-[0_10px_40px_rgba(255,215,0,0.6)] inline-block"
            >
              Começar Grátis
            </Link>
            <Link
              href="#planos"
              className="btn px-12 py-6 text-xl sm:text-2xl font-semibold rounded-full transform transition-all hover:scale-105 inline-block"
            >
              Ver Planos
            </Link>
          </motion.div>

          {/* Badge "Sem cartão necessário" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-8 text-[var(--chalk-dim)] font-['Caveat'] text-xl sm:text-2xl"
          >
            ✓ Sem cartão necessário para começar
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
