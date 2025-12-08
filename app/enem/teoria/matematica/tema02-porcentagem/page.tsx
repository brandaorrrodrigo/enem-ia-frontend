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
 * Tema 02 - Porcentagens e Variações Sucessivas
 */
export default function Tema02PorcentagemPage() {
  return (
    <LousaLayout
      temaAtual="tema02-porcentagem"
      titulo="📊 Porcentagens e Variações"
      badge="Tema 02"
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
        2. Porcentagens e Variações Sucessivas
      </motion.h1>

      {/* Visão Geral */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#f5f5dc',
            fontSize: '1.1rem',
            lineHeight: 1.8,
          }}
        >
          <p>
            A <strong style={{ color: '#ffd700' }}>porcentagem</strong> domina boa parte da prova.
            O ENEM gosta de interpretar variações, comparar cenários e trabalhar com{' '}
            <strong style={{ color: '#87ceeb' }}>crescimento composto</strong>.
          </p>
        </div>
      </motion.section>

      {/* Conceitos Essenciais */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Conceitos Essenciais">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <strong style={{ color: '#98fb98' }}>Aumento percentual:</strong>
              <CaixaFormula descricao="Multiplicar pelo fator de aumento">
                novo = antigo × (1 + p)
              </CaixaFormula>
            </div>

            <div>
              <strong style={{ color: '#ffa07a' }}>Desconto percentual:</strong>
              <CaixaFormula descricao="Multiplicar pelo fator de desconto">
                novo = antigo × (1 – p)
              </CaixaFormula>
            </div>

            <div
              style={{
                background: 'rgba(220, 38, 38, 0.2)',
                border: '2px solid #ffa07a',
                borderRadius: '8px',
                padding: '1rem',
                marginTop: '0.5rem',
              }}
            >
              <p style={{ color: '#ffa07a', fontWeight: 600, margin: 0 }}>
                ⚠️ ATENÇÃO: Duas variações sucessivas NUNCA se somam diretamente!
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
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Aumento Sucessivo">
          <p style={{ marginBottom: '1rem' }}>
            Uma mercadoria custava <strong style={{ color: '#ffd700' }}>R$ 100</strong>, teve aumento de{' '}
            <strong style={{ color: '#98fb98' }}>20%</strong> e depois de{' '}
            <strong style={{ color: '#98fb98' }}>10%</strong>.
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
              Preço final = 100 × 1,20 × 1,10
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Preço final = 100 × 1,32 = <strong style={{ color: '#ffd700' }}>R$ 132</strong>
            </p>
            <p style={{ color: '#87ceeb' }}>
              Aumento total real = <strong style={{ color: '#ffd700' }}>32%</strong> (não 30%!)
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Desconto com Taxa">
          <p style={{ marginBottom: '1rem' }}>
            Produto de <strong style={{ color: '#ffd700' }}>R$ 80</strong> com desconto de{' '}
            <strong style={{ color: '#ffa07a' }}>15%</strong>:
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>
              Fator de desconto = 1 – 0,15 = 0,85
            </p>
            <p>
              Preço final = 80 × 0,85 = <strong style={{ color: '#ffd700' }}>R$ 68</strong>
            </p>
          </div>
        </CaixaExemplo>
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
          enunciado="Um curso on-line custava R$ 200. Em janeiro teve desconto de 25%. Em fevereiro sofreu novo desconto de 10%. Qual o preço final?"
          resolucao={[
            { texto: 'Valor inicial: R$ 200' },
            { texto: 'Primeiro desconto (25%): 200 × 0,75 = R$ 150' },
            { texto: 'Segundo desconto (10%): 150 × 0,90 = R$ 135', destaque: true },
            { texto: 'Ou diretamente: 200 × 0,75 × 0,90 = R$ 135' },
          ]}
          gabarito="R$ 135"
          dica="Nunca some os descontos! 25% + 10% ≠ 35%. Multiplique os fatores."
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
            'Aumentos sucessivos = multiplicar os fatores (1 + p₁) × (1 + p₂)',
            'Descontos sucessivos = multiplicar os fatores (1 – p₁) × (1 – p₂)',
            'NUNCA some percentuais em variações sucessivas',
            'Aumento de 20% seguido de 10% = 32% (não 30%)',
            'Desconto de 25% seguido de 10% = 32,5% de desconto total',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
