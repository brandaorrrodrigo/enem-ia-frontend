'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LousaLayout from '@/components/teoria/LousaLayout';
import QuestaoInterativa, {
  CaixaExemplo,
  CaixaFormula,
  CaixaResumo,
  CaixaProfessor,
} from '@/components/teoria/QuestaoInterativa';

/**
 * Tema 10 - Probabilidade e Contagem
 */
export default function Tema10ProbabilidadePage() {
  return (
    <LousaLayout
      temaAtual="tema10-probabilidade"
      titulo="🎲 Probabilidade e Contagem"
      badge="Tema 10"
    >
      {/* Título do Tema */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: "'Patrick Hand', cursive",
          color: '#ffd700',
          fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)',
          marginBottom: '1.5rem',
        }}
      >
        10. Probabilidade e Contagem
      </motion.h1>

      {/* Fórmula Principal */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CaixaFormula descricao="Fórmula básica de probabilidade">
          P = casos favoráveis / casos possíveis
        </CaixaFormula>
      </motion.section>

      {/* Conceitos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Conceitos Importantes">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <strong style={{ color: '#ffd700' }}>Espaço amostral</strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Todos os resultados possíveis
              </p>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                border: '2px solid rgba(152, 251, 152, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <strong style={{ color: '#98fb98' }}>Evento</strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                O que queremos que aconteça
              </p>
            </div>

            <div
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                border: '2px solid rgba(135, 206, 235, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <strong style={{ color: '#87ceeb' }}>0 ≤ P ≤ 1</strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Probabilidade sempre entre 0 e 1 (ou 0% a 100%)
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Moeda">
          <p style={{ marginBottom: '1rem' }}>
            Ao lançar uma moeda honesta, qual a probabilidade de sair <strong style={{ color: '#ffd700' }}>cara</strong>?
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
              <strong>Resolução:</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Casos possíveis: cara ou coroa = <strong style={{ color: '#87ceeb' }}>2</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Casos favoráveis (cara): <strong style={{ color: '#98fb98' }}>1</strong>
            </p>
            <p>
              P(cara) = 1/2 = <strong style={{ color: '#ffd700' }}>50%</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Saque sem Reposição">
          <p style={{ marginBottom: '1rem' }}>
            Uma caixa contém <strong style={{ color: '#ffa07a' }}>3 bolas vermelhas</strong> e{' '}
            <strong style={{ color: '#87ceeb' }}>2 bolas azuis</strong>.
            Qual a probabilidade de sacar uma bola azul?
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
              <strong>Resolução:</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Total de bolas = 3 + 2 = <strong style={{ color: '#87ceeb' }}>5</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Bolas azuis = <strong style={{ color: '#87ceeb' }}>2</strong>
            </p>
            <p>
              P(azul) = 2/5 = <strong style={{ color: '#ffd700' }}>0,4 ou 40%</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Alerta de Erro Comum */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '1.5rem' }}
      >
        <div
          style={{
            background: 'rgba(220, 38, 38, 0.15)',
            border: '2px solid #ffa07a',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <p style={{ color: '#ffa07a', fontWeight: 600, marginBottom: '0.5rem' }}>
            ⚠️ Erro mais comum no ENEM
          </p>
          <p style={{ color: '#f5f5dc' }}>
            A maioria dos erros em probabilidade vem de <strong>contagem incorreta</strong>
            dos casos possíveis ou favoráveis. Leia o enunciado com atenção e liste os casos!
          </p>
        </div>
      </motion.section>

      {/* Questão Estilo ENEM */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '2rem' }}
      >
        <h2
          style={{
            fontFamily: "'Patrick Hand', cursive",
            color: '#87ceeb',
            fontSize: '1.8rem',
            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.3)',
            marginBottom: '1rem',
          }}
        >
          Questão Estilo ENEM
        </h2>

        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM (Original)"
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas verdes. Ao retirar uma bola aleatoriamente, qual a probabilidade de ela ser verde?"
          resolucao={[
            { texto: 'Contar total de bolas: 4 vermelhas + 6 verdes = 10 bolas' },
            { texto: 'Contar casos favoráveis (verdes): 6 bolas' },
            { texto: 'Aplicar a fórmula: P = favoráveis / possíveis', destaque: true },
            { texto: 'P(verde) = 6/10 = 0,6 = 60%' },
          ]}
          gabarito="60% (ou 6/10 ou 0,6)"
          dica="Sempre simplifique frações quando possível: 6/10 = 3/5"
        />
      </motion.section>

      {/* Resumo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'P = casos favoráveis ÷ casos possíveis',
            'Probabilidade sempre entre 0 (impossível) e 1 (certo)',
            'Maioria dos erros vem de contagem incorreta',
            'Liste os casos antes de calcular',
            'Com reposição: probabilidades se multiplicam independentemente',
            'Sem reposição: denominador diminui a cada retirada',
          ]}
        />
      </motion.section>

      {/* Parabéns */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: '2rem' }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(245, 166, 35, 0.2) 0%, rgba(245, 166, 35, 0.1) 100%)',
            border: '2px solid #f5a623',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎉</span>
          <h3
            style={{
              fontFamily: "'Patrick Hand', cursive",
              color: '#f5a623',
              fontSize: '1.8rem',
              marginBottom: '0.75rem',
            }}
          >
            Parabéns!
          </h3>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: '#f5f5dc',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Você completou os <strong style={{ color: '#f5a623' }}>10 temas</strong> de Matemática do Volume 1!<br />
            Continue praticando com questões e revisões para consolidar o conhecimento.
          </p>
        </div>
      </motion.section>
    </LousaLayout>
  );
}
