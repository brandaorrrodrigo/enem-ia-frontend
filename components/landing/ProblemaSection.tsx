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
    <section className="py-16 sm:py-20 lg:py-24 px-6 relative z-10">
      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-12 px-5 sm:px-8 lg:px-14 py-8 sm:py-10 lg:py-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-4 leading-tight">
            Estudar muito não é o mesmo que{' '}
            <span className="text-[var(--accent-yellow)]">estudar certo</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Lado Esquerdo - Problemas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card bg-[rgba(255,100,100,0.1)] border-l-4 border-[var(--accent-pink)] relative"
          >
            <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl sm:text-6xl flex-shrink-0">❌</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-['Patrick_Hand'] text-[var(--accent-pink)] leading-tight">
                  Estudo Tradicional
                </h3>
              </div>

              <ul className="space-y-4">
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
                    className="flex items-start gap-3 text-[var(--chalk-dim)] font-['Poppins'] text-base sm:text-lg leading-relaxed"
                  >
                    <span className="text-[var(--accent-pink)] text-2xl mt-0.5 flex-shrink-0">✗</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Lado Direito - Solução */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card bg-[rgba(180,255,200,0.1)] border-l-4 border-[var(--accent-green)] relative"
          >
            <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl sm:text-6xl flex-shrink-0">✅</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-['Patrick_Hand'] text-[var(--accent-green)] leading-tight">
                  Estudo Guiado por Dados
                </h3>
              </div>

              <ul className="space-y-4">
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
                    className="flex items-start gap-3 text-[var(--chalk-white)] font-['Poppins'] font-medium text-base sm:text-lg leading-relaxed"
                  >
                    <span className="text-[var(--accent-green)] text-2xl mt-0.5 flex-shrink-0">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-['Caveat'] text-[var(--accent-yellow)] mb-6 leading-relaxed">
            Pare de estudar às cegas. Comece a estudar com inteligência.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
