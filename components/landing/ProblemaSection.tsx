'use client';

import { motion } from 'framer-motion';

export default function ProblemaSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-28 px-6 relative z-10">
      <div className="container max-w-6xl mx-auto relative z-20">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-8 relative z-10">
            Estudar muito não é o mesmo que{' '}
            <span className="text-[var(--accent-yellow)]">estudar certo</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Lado Esquerdo - Problemas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card bg-[rgba(255,100,100,0.1)] border-l-4 border-[var(--accent-pink)]"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl">❌</span>
              <h3 className="text-3xl sm:text-4xl font-['Patrick_Hand'] text-[var(--accent-pink)]">
                Estudo Tradicional
              </h3>
            </div>

            <ul className="space-y-5">
              {[
                'Você perde tempo em conteúdos que quase não caem',
                'Não sabe se está realmente evoluindo',
                'Não tem feedback imediato',
                'Estuda "no escuro", sem direção clara',
                'Não sabe seus pontos fracos e fortes',
                'Desmotivação por falta de progresso visível'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 text-[var(--chalk-dim)] font-['Poppins'] text-base sm:text-lg md:text-xl"
                >
                  <span className="text-[var(--accent-pink)] text-2xl mt-1 flex-shrink-0">✗</span>
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Lado Direito - Solução */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card bg-[rgba(180,255,200,0.1)] border-l-4 border-[var(--accent-green)]"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl">✅</span>
              <h3 className="text-3xl sm:text-4xl font-['Patrick_Hand'] text-[var(--accent-green)]">
                Estudo Guiado por Dados
              </h3>
            </div>

            <ul className="space-y-5">
              {[
                'Foco no que realmente cai no ENEM',
                'Acompanhamento em tempo real da sua evolução',
                'Feedback imediato com IA em cada questão',
                'Plano personalizado baseado na sua meta',
                'Dashboard completo de pontos fortes e fracos',
                'Gamificação que mantém você motivado'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 text-[var(--chalk-white)] font-['Poppins'] font-medium text-base sm:text-lg md:text-xl"
                >
                  <span className="text-[var(--accent-green)] text-2xl mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-['Caveat'] text-[var(--accent-yellow)] mb-8 relative z-10">
            Pare de estudar às cegas. Comece a estudar com inteligência.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
