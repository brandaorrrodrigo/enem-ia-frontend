'use client';

import {
  LandingNavbar,
  HeroSection,
  ProblemaSection,
  ComoFuncionaSection,
  DiferenciaisSection,
  ProvaSocialSection,
  PlanosSection,
  FAQSection,
  CTAFinalSection
} from '@/components/landing';

/**
 * ENEM PRO - Landing Page Oficial
 *
 * Landing page de alta conversão com foco em:
 * - Copywriting persuasivo
 * - Identidade visual ENEM PRO (lousa verde escura)
 * - Animações suaves com Framer Motion
 * - Responsividade mobile-first
 * - CTAs estratégicos
 *
 * Estrutura:
 * 1. Hero Section - Título forte + CTAs
 * 2. Problema Real - Comparação estudo tradicional vs guiado
 * 3. Como Funciona - 3 passos simples
 * 4. Diferenciais - O que ninguém tem
 * 5. Prova Social - Badges e garantias
 * 6. Planos e Preços - 3 opções claras
 * 7. FAQ - Perguntas frequentes
 * 8. CTA Final - Última chamada para ação
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar fixa */}
      <LandingNavbar />

      {/* Hero Section - Primeira impressão (com padding top para compensar navbar) */}
      <div className="pt-20">
        <HeroSection />
      </div>

      {/* Problema Real do Estudante */}
      <ProblemaSection />

      {/* Como Funciona (3 passos) */}
      <ComoFuncionaSection />

      {/* Diferenciais (O que ninguém tem) */}
      <DiferenciaisSection />

      {/* Prova Social */}
      <ProvaSocialSection />

      {/* Planos e Preços */}
      <PlanosSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Final */}
      <CTAFinalSection />

      {/* Footer com moldura de madeira */}
      <footer className="py-12 px-6 relative z-10">
        <div className="container max-w-6xl mx-auto relative z-20">
          <div className="card">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Sobre */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-['Patrick_Hand'] text-[var(--accent-yellow)] mb-4">
                ENEM PRO
              </h3>
              <p className="text-base sm:text-lg text-[var(--chalk-dim)] font-['Poppins']">
                A plataforma de estudos que une IA, estatística real do ENEM e gamificação
                para maximizar sua nota.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="text-xl sm:text-2xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-4">
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-[var(--chalk-dim)] font-['Poppins'] text-base sm:text-lg">
                <li>
                  <a href="#planos" className="hover:text-[var(--accent-yellow)] transition-colors">
                    Ver Planos
                  </a>
                </li>
                <li>
                  <a href="/cadastro" className="hover:text-[var(--accent-yellow)] transition-colors">
                    Criar Conta
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-[var(--accent-yellow)] transition-colors">
                    Fazer Login
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-xl sm:text-2xl font-['Patrick_Hand'] text-[var(--chalk-white)] mb-4">
                Precisa de Ajuda?
              </h4>
              <p className="text-base sm:text-lg text-[var(--chalk-dim)] font-['Poppins'] mb-2">
                Estamos aqui para te ajudar a conquistar sua aprovação.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="card text-center mt-8 relative">
            <div className="relative z-10 px-5 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
              <p className="text-base sm:text-lg text-[var(--chalk-dim)] font-['Poppins']">
                &copy; {new Date().getFullYear()} ENEM PRO. Todos os direitos reservados.
              </p>
              <p className="text-lg sm:text-xl text-[var(--chalk-dim)] font-['Caveat'] mt-2">
                Feito com 💚 para estudantes que querem resultados reais
              </p>
            </div>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
