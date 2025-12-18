'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PlanosSection() {
  const planos = [
    {
      nome: 'ENEM PRO Lite',
      preco: 'Grátis',
      periodo: '',
      descricao: 'Para conhecer a plataforma',
      recursos: [
        'Acesso inicial à plataforma',
        'Simulados limitados',
        'Ranking e FP',
        'Dashboard básico'
      ],
      cta: 'Começar Grátis',
      link: '/cadastro',
      popular: false,
      cor: 'blue'
    },
    {
      nome: 'ENEM PRO',
      preco: 'R$ 39,90',
      periodo: '/ mês',
      precoAnual: 'R$ 349 / ano',
      descricao: 'Perfeito para quem quer resultados',
      recursos: [
        'Simulados ilimitados',
        'IA completa com explicações',
        'Dashboard de desempenho avançado',
        'Plano de estudos personalizado',
        'Estatísticas detalhadas',
        'Até 5 convites/mês'
      ],
      cta: 'Assinar Agora',
      link: '/cadastro',
      popular: true,
      cor: 'yellow'
    },
    {
      nome: 'ENEM PRO Premium',
      preco: 'R$ 69,90',
      periodo: '/ mês',
      precoAnual: 'R$ 599 / ano',
      descricao: 'Para quem busca excelência',
      recursos: [
        'Tudo do plano PRO',
        'Correção ilimitada de redação',
        'Mentoria por IA avançada',
        'Prioridade no suporte',
        'Acesso antecipado a features',
        'Até 10 convites/mês'
      ],
      cta: 'Assinar Premium',
      link: '/cadastro',
      popular: false,
      cor: 'purple'
    }
  ];

  const cores = {
    blue: {
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-[var(--accent-blue)]',
      text: 'text-[var(--accent-blue)]',
      bg: 'bg-[var(--accent-blue)]'
    },
    yellow: {
      gradient: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-[var(--accent-yellow)]',
      text: 'text-[var(--accent-yellow)]',
      bg: 'bg-[var(--accent-yellow)]'
    },
    purple: {
      gradient: 'from-purple-500/20 to-pink-500/20',
      border: 'border-[var(--accent-pink)]',
      text: 'text-[var(--accent-pink)]',
      bg: 'bg-[var(--accent-pink)]'
    }
  };

  return (
    <section id="planos" className="py-28 px-6 relative z-10">
      <div className="container max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 px-5 sm:px-8 lg:px-14 py-8 sm:py-10 lg:py-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-8 relative z-10 leading-tight">
            Escolha seu <span className="text-[var(--accent-yellow)]">plano</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl font-['Caveat'] text-[var(--chalk-dim)] max-w-3xl mx-auto relative z-10 leading-relaxed">
            Todos os planos garantem acesso à melhor plataforma de estudos para o ENEM
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto pt-8">
          {planos.map((plano, index) => {
            const cor = cores[plano.cor as keyof typeof cores];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`card relative ${plano.popular ? 'scale-105 md:scale-110' : ''}`}
              >
                {/* Badge "Mais Popular" */}
                {plano.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[var(--accent-yellow)] text-[#1a3328] px-8 py-3 rounded-full font-['Patrick_Hand'] text-base sm:text-lg font-bold shadow-lg whitespace-nowrap z-20">
                    MAIS POPULAR
                  </div>
                )}

                {/* Gradiente de fundo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cor.gradient} opacity-50 rounded-lg z-0`} />

                <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
                  {/* Nome do plano */}
                  <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-['Patrick_Hand'] ${cor.text} mb-3 text-center leading-tight`}>
                    {plano.nome}
                  </h3>

                  {/* Descrição */}
                  <p className="text-[var(--chalk-dim)] font-['Poppins'] text-base sm:text-lg text-center mb-8 leading-relaxed">
                    {plano.descricao}
                  </p>

                  {/* Preço */}
                  <div className="text-center mb-8">
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-['Patrick_Hand'] font-bold text-[var(--chalk-white)]">
                        {plano.preco}
                      </span>
                      {plano.periodo && (
                        <span className="text-xl sm:text-2xl lg:text-3xl text-[var(--chalk-dim)] mb-3 font-['Caveat']">
                          {plano.periodo}
                        </span>
                      )}
                    </div>
                    {plano.precoAnual && (
                      <p className="text-base sm:text-lg text-[var(--chalk-dim)] mt-3 font-['Poppins']">
                        ou {plano.precoAnual}
                      </p>
                    )}
                  </div>

                  {/* Recursos */}
                  <ul className="space-y-4 mb-10">
                    {plano.recursos.map((recurso, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 text-[var(--chalk-white)] font-['Poppins'] text-base sm:text-lg leading-relaxed"
                      >
                        <span className="text-[var(--accent-green)] text-xl sm:text-2xl mt-1 flex-shrink-0">✓</span>
                        <span>{recurso}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={plano.link}
                    className={`block w-full text-center px-6 py-4 sm:px-8 sm:py-5 min-h-[48px] rounded-full font-['Poppins'] font-bold text-base sm:text-lg lg:text-xl transition-all hover:scale-105 hover:shadow-2xl ${
                      plano.popular
                        ? 'bg-[var(--accent-yellow)] text-[#1a3328] shadow-lg hover:shadow-[0_10px_30px_rgba(255,215,0,0.5)]'
                        : 'bg-[rgba(255,255,255,0.15)] text-[var(--chalk-white)] border border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.25)]'
                    }`}
                  >
                    {plano.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Nota sobre pagamento anual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 px-5 sm:px-8 lg:px-14"
        >
          <p className="text-[var(--chalk-dim)] font-['Caveat'] text-xl sm:text-2xl lg:text-3xl mb-3 leading-relaxed">
            💡 Economia de até 26% no plano anual
          </p>
          <p className="text-[var(--chalk-dim)] font-['Poppins'] text-base sm:text-lg leading-relaxed">
            Todos os planos podem ser cancelados a qualquer momento
          </p>
        </motion.div>
      </div>
    </section>
  );
}
