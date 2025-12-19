'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      pergunta: 'Preciso de cartão para começar?',
      resposta: 'Não! O plano Lite é 100% gratuito e não exige cartão de crédito. Você pode começar agora mesmo e experimentar a plataforma sem compromisso.'
    },
    {
      pergunta: 'Posso cancelar a qualquer momento?',
      resposta: 'Sim, sem burocracias. Se você assinar um plano pago, pode cancelar quando quiser direto no seu painel. Não fazemos retenção nem cobramos multas.'
    },
    {
      pergunta: 'O ENEM PRO substitui um cursinho?',
      resposta: 'Sim, se você estudar com estratégia. Nossa plataforma oferece tudo que um cursinho oferece (conteúdo, questões, simulados, correção) mas com vantagens: estudo personalizado, feedback de IA instantâneo, flexibilidade total de horários e custo muito menor.'
    },
    {
      pergunta: 'Para quem é o ENEM PRO?',
      resposta: 'Para quem quer aprovação real. Se você está disposto a estudar de forma estratégica, acompanhar seus dados e evoluir com base em feedback constante, o ENEM PRO é para você. Funciona tanto para quem está começando quanto para quem já estuda há meses.'
    },
    {
      pergunta: 'Como funciona a correção de redação por IA?',
      resposta: 'Nossa IA foi treinada com as 5 competências do ENEM. Você escreve sua redação, envia pela plataforma e em minutos recebe um feedback detalhado por competência, com sugestões de melhoria e nota estimada.'
    },
    {
      pergunta: 'Posso usar no celular?',
      resposta: 'Sim! A plataforma é 100% responsiva e funciona perfeitamente em qualquer dispositivo - celular, tablet ou computador. Estude de onde estiver.'
    },
    {
      pergunta: 'O que são FP?',
      resposta: 'FP são pontos que você ganha ao completar simulados, desafios e atividades. Eles te ajudam a subir no ranking e competir em ligas. Não são moeda de compra, são marcadores do seu engajamento e evolução.'
    },
    {
      pergunta: 'Vou ter acesso a todas as questões do ENEM?',
      resposta: 'Sim! Temos um banco massivo com questões oficiais de todas as edições do ENEM, organizadas por matéria, competência e dificuldade. Você pode filtrar e praticar exatamente o que precisa.'
    }
  ];

  return (
    <section className="py-28 px-6 bg-[rgba(0,0,0,0.2)] relative z-10">
      <div className="container max-w-4xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-28 px-5 sm:px-8 lg:px-14 py-8 sm:py-10 lg:py-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-8 relative z-10 leading-tight">
            Perguntas <span className="text-[var(--accent-yellow)]">Frequentes</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-['Caveat'] text-[var(--chalk-dim)] max-w-4xl mx-auto relative z-40 leading-relaxed">
            Tudo que você precisa saber antes de começar
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card cursor-pointer overflow-hidden relative"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
                <div className="flex items-center justify-between gap-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-['Patrick_Hand'] text-[var(--chalk-white)] flex-1 leading-tight">
                    {faq.pergunta}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl sm:text-4xl text-[var(--accent-yellow)] flex-shrink-0"
                  >
                    {activeIndex === index ? '−' : '+'}
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0,
                    marginTop: activeIndex === index ? 20 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-base sm:text-lg lg:text-xl text-[var(--chalk-dim)] font-['Poppins'] leading-relaxed">
                    {faq.resposta}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 px-5 sm:px-8 lg:px-14"
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-['Caveat'] text-[var(--chalk-dim)] mb-6 leading-relaxed">
            Ainda tem dúvidas?
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--chalk-white)] font-['Poppins'] leading-relaxed">
            Experimente grátis e veja por você mesmo →
          </p>
        </motion.div>
      </div>
    </section>
  );
}
