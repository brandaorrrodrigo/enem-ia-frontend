'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, X, Star, Zap, Crown, Sparkles, Swords, Target, Trophy, Users } from 'lucide-react';

interface Plano {
  id: string;
  nome: string;
  subtitulo: string;
  precoMensal: string;
  precoAnual: string;
  precoAnualMes: string;
  periodo: string;
  destaque: boolean;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
  recursos: { nome: string; incluido: boolean; destaque?: boolean }[];
  cta: string;
  ctaLink: string;
}

// Precos atualizados v3.0 - Sistema completo ENEM PRO
const PLANOS: Plano[] = [
  {
    id: 'lite',
    nome: 'ENEM PRO Lite',
    subtitulo: 'Para comecar a estudar',
    precoMensal: 'Gratis',
    precoAnual: 'Gratis',
    precoAnualMes: 'Gratis',
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
      { nome: 'Correcao de redacao por IA', incluido: false },
      { nome: 'Desafios 1v1', incluido: false },
      { nome: 'Convites para batalhas', incluido: false },
    ],
    cta: 'Comecar Gratis',
    ctaLink: '/cadastro',
  },
  {
    id: 'pro',
    nome: 'ENEM PRO',
    subtitulo: 'O plano mais escolhido',
    precoMensal: 'R$ 39,90',
    precoAnual: 'R$ 399,00',
    precoAnualMes: 'R$ 33,25',
    periodo: '/mes',
    destaque: true,
    badge: 'MAIS POPULAR',
    badgeColor: 'yellow',
    icon: <Zap className="w-8 h-8" />,
    recursos: [
      { nome: 'Simulados ilimitados', incluido: true, destaque: true },
      { nome: 'Explicacoes por IA (todas as materias)', incluido: true, destaque: true },
      { nome: 'Dashboard com evolucao e notas de corte', incluido: true },
      { nome: '3 redacoes/mes com correcao IA', incluido: true, destaque: true },
      { nome: 'Desafios 1v1 ilimitados (modo classico)', incluido: true, destaque: true },
      { nome: 'Participacao na Arena Semanal', incluido: true },
      { nome: '10 convites/mes para batalhas externas', incluido: true },
      { nome: 'Banco de Questoes Essenciais (curadoria ENEM)', incluido: true },
      { nome: 'Historico completo de desempenho', incluido: true },
      { nome: 'Sistema de niveis SFP (Fernanda Points)', incluido: true },
      { nome: 'Simulados TRI com nota real', incluido: false },
      { nome: 'Modos Turbo, Maratona e Transmitido', incluido: false },
    ],
    cta: 'Assinar PRO',
    ctaLink: '/assinatura/pro',
  },
  {
    id: 'premium',
    nome: 'ENEM PRO Premium',
    subtitulo: 'Maximo desempenho e recursos exclusivos',
    precoMensal: 'R$ 79,90',
    precoAnual: 'R$ 799,00',
    precoAnualMes: 'R$ 66,58',
    periodo: '/mes',
    destaque: false,
    badge: 'COMPLETO',
    badgeColor: 'purple',
    icon: <Crown className="w-8 h-8" />,
    recursos: [
      { nome: 'Tudo do plano PRO', incluido: true, destaque: true },
      { nome: 'Redacoes ilimitadas com correcao avancada', incluido: true, destaque: true },
      { nome: 'Simulados TRI com nota real estimada', incluido: true, destaque: true },
      { nome: 'Cronograma personalizado adaptativo', incluido: true },
      { nome: 'Banco completo de 150.000+ questoes', incluido: true },
      { nome: 'Filtros por habilidade e competencia ENEM', incluido: true },
      { nome: 'Relatorios de desempenho por competencia', incluido: true },
      { nome: 'Desafios Turbo, Maratona e Transmitidos', incluido: true, destaque: true },
      { nome: 'Modo AO VIVO com espectadores', incluido: true, destaque: true },
      { nome: '30 convites/mes para batalhas externas', incluido: true },
      { nome: '5 codigos de transmissoes publicas/mes', incluido: true },
      { nome: 'Suporte prioritario 24h', incluido: true },
      { nome: 'Acesso offline (PWA)', incluido: true },
      { nome: 'Garantia de satisfacao 30 dias', incluido: true },
    ],
    cta: 'Quero o Premium',
    ctaLink: '/assinatura/premium',
  },
];

export default function PlanosPage() {
  const [periodoAnual, setPeriodoAnual] = useState(false);

  const getPrecoExibido = (plano: Plano) => {
    if (plano.id === 'lite') return 'Gratis';
    return periodoAnual ? plano.precoAnualMes : plano.precoMensal;
  };

  const getPrecoTotal = (plano: Plano) => {
    if (plano.id === 'lite') return null;
    return periodoAnual ? plano.precoAnual : null;
  };

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
            marginBottom: '3rem',
            flexWrap: 'wrap'
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
            Anual (a vista)
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
              Economize ~17%
            </span>
          )}
        </div>

        {/* Cards de Planos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                  : plano.badgeColor === 'purple'
                    ? 'rgba(168, 85, 247, 0.1)'
                    : 'rgba(255, 255, 255, 0.08)',
                border: plano.destaque
                  ? '3px solid var(--accent-yellow)'
                  : plano.badgeColor === 'purple'
                    ? '3px solid rgba(168, 85, 247, 0.5)'
                    : '3px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                transform: plano.destaque ? 'scale(1.02)' : 'scale(1)',
                boxShadow: plano.destaque
                  ? '0 10px 40px rgba(251, 191, 36, 0.2)'
                  : plano.badgeColor === 'purple'
                    ? '0 10px 40px rgba(168, 85, 247, 0.15)'
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
                    backgroundColor: plano.destaque
                      ? 'var(--accent-yellow)'
                      : plano.badgeColor === 'purple'
                        ? '#a855f7'
                        : 'rgba(255, 255, 255, 0.2)',
                    color: plano.destaque || plano.badgeColor === 'purple'
                      ? 'var(--chalkboard-green)'
                      : 'var(--chalk-white)',
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
                      : plano.badgeColor === 'purple'
                        ? 'rgba(168, 85, 247, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    color: plano.destaque
                      ? 'var(--accent-yellow)'
                      : plano.badgeColor === 'purple'
                        ? '#a855f7'
                        : 'var(--chalk-white)'
                  }}
                >
                  {plano.icon}
                </div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: plano.destaque
                      ? 'var(--accent-yellow)'
                      : plano.badgeColor === 'purple'
                        ? '#c084fc'
                        : 'var(--chalk-white)',
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
                    color: plano.destaque
                      ? 'var(--accent-yellow)'
                      : plano.badgeColor === 'purple'
                        ? '#c084fc'
                        : 'var(--chalk-white)',
                    fontFamily: 'var(--font-kalam)'
                  }}
                >
                  {getPrecoExibido(plano)}
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
                {getPrecoTotal(plano) && (
                  <div
                    style={{
                      color: '#86efac',
                      fontSize: '0.85rem',
                      marginTop: '0.5rem',
                      fontFamily: 'var(--font-kalam)',
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}
                  >
                    Total: {getPrecoTotal(plano)} (a vista)
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
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {recurso.incluido ? (
                      <Check
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: recurso.destaque ? 'var(--accent-yellow)' : '#86efac' }}
                      />
                    ) : (
                      <X
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                    fontFamily: 'var(--font-kalam)',
                    backgroundColor: plano.badgeColor === 'purple' && !plano.destaque
                      ? '#a855f7'
                      : undefined,
                    borderColor: plano.badgeColor === 'purple' && !plano.destaque
                      ? '#a855f7'
                      : undefined
                  }}
                >
                  {plano.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparativo de Batalhas */}
        <div
          style={{
            maxWidth: '900px',
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
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Swords className="w-6 h-6" style={{ color: 'var(--accent-yellow)' }} />
            Modos de Batalha 1v1
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}
          >
            {[
              {
                nome: 'Classico',
                descricao: '10 questoes, 30s cada',
                icon: <Target className="w-5 h-5" />,
                pro: true,
                premium: true
              },
              {
                nome: 'Turbo',
                descricao: '5 questoes, 15s cada',
                icon: <Zap className="w-5 h-5" />,
                pro: false,
                premium: true
              },
              {
                nome: 'Maratona',
                descricao: '20 questoes, 45s cada',
                icon: <Trophy className="w-5 h-5" />,
                pro: false,
                premium: true
              },
              {
                nome: 'Transmitido',
                descricao: 'Ao vivo com espectadores',
                icon: <Users className="w-5 h-5" />,
                pro: false,
                premium: true
              }
            ].map((modo, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    color: 'var(--accent-yellow)',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {modo.icon}
                </div>
                <h4
                  style={{
                    color: 'var(--chalk-white)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-kalam)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {modo.nome}
                </h4>
                <p
                  style={{
                    color: 'var(--chalk-dim)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-kalam)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {modo.descricao}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: modo.pro ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: modo.pro ? '#86efac' : '#fca5a5',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    PRO: {modo.pro ? 'Sim' : 'Nao'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: modo.premium ? 'rgba(168, 85, 247, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: modo.premium ? '#c084fc' : '#fca5a5',
                      fontFamily: 'var(--font-kalam)'
                    }}
                  >
                    Premium: {modo.premium ? 'Sim' : 'Nao'}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
                resposta: 'Sim. Voce pode cancelar sua assinatura a qualquer momento pelo painel do aluno, sem multas ou burocracia.'
              },
              {
                pergunta: 'Preciso de cartao de credito para o plano gratuito?',
                resposta: 'Nao. O plano ENEM PRO Lite e 100% gratuito e nao exige cadastro de cartao de credito.'
              },
              {
                pergunta: 'Como funciona a garantia de 30 dias?',
                resposta: 'Se voce nao ficar satisfeito com o plano ENEM PRO Premium nos primeiros 30 dias, devolvemos 100% do valor pago.'
              },
              {
                pergunta: 'O que sao FP (Fernanda Points)?',
                resposta: 'FP sao os pontos do sistema de gamificacao do ENEM PRO. Voce ganha FP ao estudar, vencer batalhas, completar desafios e subir no ranking. Use FP para desbloquear itens na loja e subir de nivel!'
              },
              {
                pergunta: 'Como funcionam os convites para batalhas?',
                resposta: 'Convites permitem desafiar amigos que nao sao assinantes para batalhas 1v1. O plano PRO inclui 10 convites/mes e o Premium inclui 30 convites/mes. Voce tambem pode comprar convites extras na loja com FP.'
              },
              {
                pergunta: 'Qual a diferenca entre os modos de batalha?',
                resposta: 'Classico (10 questoes, 30s) esta disponivel para PRO e Premium. Turbo (5 questoes, 15s), Maratona (20 questoes, 45s) e Transmitido (ao vivo) sao exclusivos do Premium.'
              },
              {
                pergunta: 'O plano anual e cobrado de uma vez?',
                resposta: 'Sim, o plano anual e pago a vista em uma unica cobranca, com desconto de aproximadamente 17% em relacao ao pagamento mensal.'
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
              marginBottom: '1rem',
              maxWidth: '500px',
              margin: '0 auto 1rem'
            }}
          >
            Junte-se a milhares de estudantes que ja estao se preparando com o ENEM PRO
          </p>
          <p
            style={{
              color: '#86efac',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-kalam)',
              marginBottom: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto 1.5rem',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            🎁 Ganhe 200 FP ao criar sua conta + 100 FP ao completar o perfil + 200 FP ao concluir seu primeiro simulado!
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
