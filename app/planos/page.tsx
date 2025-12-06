'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, X, Star, Zap, Crown, Sparkles } from 'lucide-react';

interface Plano {
  id: string;
  nome: string;
  subtitulo: string;
  preco: string;
  precoAnual?: string;
  periodo: string;
  destaque: boolean;
  badge?: string;
  icon: React.ReactNode;
  recursos: { nome: string; incluido: boolean; destaque?: boolean }[];
  cta: string;
  ctaLink: string;
}

const PLANOS: Plano[] = [
  {
    id: 'lite',
    nome: 'ENEM PRO Lite',
    subtitulo: 'Para comecar a estudar',
    preco: 'Gratis',
    periodo: 'para sempre',
    destaque: false,
    icon: <Star className="w-8 h-8" />,
    recursos: [
      { nome: '10 simulados por mes', incluido: true },
      { nome: 'Questoes com explicacao basica', incluido: true },
      { nome: 'Dashboard de desempenho', incluido: true },
      { nome: 'Sistema de FP e ranking', incluido: true },
      { nome: 'Niveis ate Prata', incluido: true },
      { nome: 'Simulados ilimitados', incluido: false },
      { nome: 'Explicacoes por IA avancada', incluido: false },
      { nome: 'Plano de estudos personalizado', incluido: false },
      { nome: 'Correcao de redacao por IA', incluido: false },
      { nome: 'Suporte prioritario', incluido: false },
    ],
    cta: 'Comecar Gratis',
    ctaLink: '/cadastro',
  },
  {
    id: 'pro',
    nome: 'ENEM PRO',
    subtitulo: 'O mais escolhido',
    preco: 'R$ 29,90',
    precoAnual: 'R$ 19,90',
    periodo: '/mes',
    destaque: true,
    badge: 'MAIS POPULAR',
    icon: <Zap className="w-8 h-8" />,
    recursos: [
      { nome: 'Simulados ilimitados', incluido: true, destaque: true },
      { nome: 'Explicacoes completas por IA', incluido: true, destaque: true },
      { nome: 'Dashboard completo de desempenho', incluido: true },
      { nome: 'Comparacao com notas de corte SISU', incluido: true, destaque: true },
      { nome: 'Ranking global e desafios', incluido: true },
      { nome: 'Plano de estudos personalizado', incluido: true, destaque: true },
      { nome: 'Niveis ate Diamante', incluido: true },
      { nome: 'Flashcards inteligentes', incluido: true },
      { nome: '3 correcoes de redacao/mes', incluido: true },
      { nome: 'Suporte prioritario', incluido: false },
    ],
    cta: 'Assinar Agora',
    ctaLink: '/assinatura/mensal',
  },
  {
    id: 'premium',
    nome: 'ENEM PRO Premium',
    subtitulo: 'Para quem quer o maximo',
    preco: 'R$ 49,90',
    precoAnual: 'R$ 39,90',
    periodo: '/mes',
    destaque: false,
    badge: 'COMPLETO',
    icon: <Crown className="w-8 h-8" />,
    recursos: [
      { nome: 'Tudo do ENEM PRO', incluido: true, destaque: true },
      { nome: 'Correcoes de redacao ilimitadas', incluido: true, destaque: true },
      { nome: 'Mentoria com IA personalizada', incluido: true, destaque: true },
      { nome: 'Simulados cronometrados oficiais', incluido: true },
      { nome: 'Relatorios detalhados por competencia', incluido: true },
      { nome: 'Acesso a banco de 10.000+ questoes', incluido: true },
      { nome: 'Videoaulas exclusivas', incluido: true },
      { nome: 'Grupo VIP no WhatsApp', incluido: true },
      { nome: 'Suporte prioritario 24h', incluido: true, destaque: true },
      { nome: 'Garantia de satisfacao 30 dias', incluido: true },
    ],
    cta: 'Quero o Premium',
    ctaLink: '/assinatura/anual',
  },
];

export default function PlanosPage() {
  const [periodoAnual, setPeriodoAnual] = useState(false);

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{
        backgroundColor: 'var(--chalkboard-green)',
        backgroundImage: 'var(--chalkboard-texture)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          </Link>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)',
              marginBottom: '0.5rem'
            }}
          >
            Planos ENEM PRO
          </h1>
          <p
            style={{
              color: 'var(--chalk-dim)',
              fontSize: '1.25rem',
              fontFamily: 'var(--font-kalam)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Escolha o plano ideal para sua jornada ate a aprovacao
          </p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          <span
            style={{
              color: !periodoAnual ? 'var(--accent-yellow)' : 'var(--chalk-dim)',
              fontWeight: !periodoAnual ? 'bold' : 'normal',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            Mensal
          </span>
          <button
            onClick={() => setPeriodoAnual(!periodoAnual)}
            style={{
              width: '60px',
              height: '32px',
              borderRadius: '16px',
              backgroundColor: periodoAnual ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.3s ease'
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '4px',
                left: periodoAnual ? '32px' : '4px',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            />
          </button>
          <span
            style={{
              color: periodoAnual ? 'var(--accent-yellow)' : 'var(--chalk-dim)',
              fontWeight: periodoAnual ? 'bold' : 'normal',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            Anual
          </span>
          {periodoAnual && (
            <span
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.3)',
                color: '#86efac',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Economize 33%
            </span>
          )}
        </div>

        {/* Cards de Planos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {PLANOS.map((plano) => (
            <div
              key={plano.id}
              style={{
                backgroundColor: plano.destaque
                  ? 'rgba(251, 191, 36, 0.1)'
                  : 'rgba(255, 255, 255, 0.08)',
                border: plano.destaque
                  ? '3px solid var(--accent-yellow)'
                  : '3px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                transform: plano.destaque ? 'scale(1.02)' : 'scale(1)',
                boxShadow: plano.destaque
                  ? '0 10px 40px rgba(251, 191, 36, 0.2)'
                  : '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Badge */}
              {plano.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: plano.destaque ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.2)',
                    color: plano.destaque ? 'var(--chalkboard-green)' : 'var(--chalk-white)',
                    padding: '0.25rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {plano.badge}
                </div>
              )}

              {/* Icon e Nome */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: plano.destaque
                      ? 'rgba(251, 191, 36, 0.2)'
                      : 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    color: plano.destaque ? 'var(--accent-yellow)' : 'var(--chalk-white)'
                  }}
                >
                  {plano.icon}
                </div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: plano.destaque ? 'var(--accent-yellow)' : 'var(--chalk-white)',
                    fontFamily: 'var(--font-kalam)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {plano.nome}
                </h2>
                <p
                  style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {plano.subtitulo}
                </p>
              </div>

              {/* Preco */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: plano.destaque ? 'var(--accent-yellow)' : 'var(--chalk-white)',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {periodoAnual && plano.precoAnual ? plano.precoAnual : plano.preco}
                </div>
                <div
                  style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {plano.periodo}
                </div>
                {periodoAnual && plano.precoAnual && (
                  <div
                    style={{
                      color: '#86efac',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    Cobrado anualmente
                  </div>
                )}
              </div>

              {/* Recursos */}
              <ul style={{ marginBottom: '1.5rem' }}>
                {plano.recursos.map((recurso, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {recurso.incluido ? (
                      <Check
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: recurso.destaque ? 'var(--accent-yellow)' : '#86efac' }}
                      />
                    ) : (
                      <X
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: 'rgba(255, 255, 255, 0.3)' }}
                      />
                    )}
                    <span
                      style={{
                        color: recurso.incluido ? 'var(--chalk-white)' : 'var(--chalk-dim)',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-kalam)',
                        fontWeight: recurso.destaque ? 'bold' : 'normal'
                      }}
                    >
                      {recurso.nome}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plano.ctaLink}>
                <button
                  className={plano.destaque ? 'btn btn-yellow' : 'btn'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {plano.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div
          style={{
            maxWidth: '800px',
            margin: '4rem auto 0',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}
          >
            Perguntas Frequentes
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                pergunta: 'Posso cancelar a qualquer momento?',
                resposta: 'Sim! Voce pode cancelar sua assinatura a qualquer momento pelo painel do aluno, sem multas ou burocracia.'
              },
              {
                pergunta: 'Preciso de cartao de credito para o plano gratuito?',
                resposta: 'Nao! O plano Lite e 100% gratuito e nao requer nenhum dado de pagamento.'
              },
              {
                pergunta: 'Como funciona a garantia de 30 dias?',
                resposta: 'Se voce nao ficar satisfeito nos primeiros 30 dias do plano Premium, devolvemos 100% do seu dinheiro.'
              },
              {
                pergunta: 'Posso trocar de plano depois?',
                resposta: 'Claro! Voce pode fazer upgrade ou downgrade do seu plano a qualquer momento.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px'
                }}
              >
                <h3
                  style={{
                    color: 'var(--chalk-white)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {faq.pergunta}
                </h3>
                <p
                  style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {faq.resposta}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            borderRadius: '20px',
            border: '2px solid rgba(251, 191, 36, 0.3)'
          }}
        >
          <Sparkles
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: 'var(--accent-yellow)' }}
          />
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-kalam)',
              marginBottom: '0.5rem'
            }}
          >
            Pronto para conquistar sua vaga?
          </h2>
          <p
            style={{
              color: 'var(--chalk-dim)',
              fontSize: '1rem',
              fontFamily: 'var(--font-kalam)',
              marginBottom: '1.5rem',
              maxWidth: '500px',
              margin: '0 auto 1.5rem'
            }}
          >
            Junte-se a milhares de estudantes que ja estao se preparando com o ENEM PRO
          </p>
          <Link href="/cadastro">
            <button
              className="btn btn-yellow"
              style={{
                padding: '1rem 3rem',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Comecar Agora - E Gratis!
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link
            href="/"
            style={{
              color: 'var(--chalk-dim)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-kalam)'
            }}
          >
            ← Voltar ao inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
