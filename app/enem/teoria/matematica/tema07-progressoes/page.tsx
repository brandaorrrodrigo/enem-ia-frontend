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
 * Tema 07 - Progressões: PA e PG
 */
export default function Tema07ProgressoesPage() {
  return (
    <LousaLayout
      temaAtual="tema07-progressoes"
      titulo="🔄 Progressões: PA e PG"
      badge="Tema 07"
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
        7. Progressões: PA e PG
      </motion.h1>

      {/* Comparação PA vs PG */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CaixaProfessor titulo="Diferença Fundamental">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div
              style={{
                background: 'rgba(152, 251, 152, 0.1)',
                border: '2px solid #98fb98',
                borderRadius: '8px',
                padding: '1.25rem',
              }}
            >
              <h4 style={{ color: '#98fb98', fontFamily: "'Patrick Hand', cursive", fontSize: '1.4rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                PA – Progressão Aritmética
              </h4>
              <p style={{ color: '#f5f5dc', fontSize: '1rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#ffd700' }}>Soma constante</strong>
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', textAlign: 'center' }}>
                Cada termo = anterior + razão
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.75rem', textAlign: 'center' }}>
                <code style={{ color: '#ffd700' }}>2, 5, 8, 11, 14... (r = 3)</code>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(135, 206, 235, 0.1)',
                border: '2px solid #87ceeb',
                borderRadius: '8px',
                padding: '1.25rem',
              }}
            >
              <h4 style={{ color: '#87ceeb', fontFamily: "'Patrick Hand', cursive", fontSize: '1.4rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                PG – Progressão Geométrica
              </h4>
              <p style={{ color: '#f5f5dc', fontSize: '1rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#ffd700' }}>Multiplicação constante</strong>
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', textAlign: 'center' }}>
                Cada termo = anterior × razão
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', marginTop: '0.75rem', textAlign: 'center' }}>
                <code style={{ color: '#ffd700' }}>2, 6, 18, 54... (q = 3)</code>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Aplicações no ENEM */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '1.5rem' }}
      >
        <div
          style={{
            background: 'rgba(255, 215, 0, 0.1)',
            border: '2px dashed #ffd700',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
          <p style={{ color: '#ffd700', fontFamily: "'Patrick Hand', cursive", fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            📌 O ENEM usa progressões em:
          </p>
          <ul style={{ columns: 2, columnGap: '2rem', paddingLeft: '1.5rem', color: '#f5f5dc' }}>
            <li>Juros simples e compostos</li>
            <li>Crescimento populacional</li>
            <li>Contaminação viral</li>
            <li>Análise de tendências</li>
            <li>Depreciação de bens</li>
            <li>Economia e finanças</li>
          </ul>
        </div>
      </motion.section>

      {/* Exemplo PA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Exemplo PA — Salário com Aumentos Fixos">
          <p style={{ marginBottom: '1rem' }}>
            Um funcionário começa ganhando <strong style={{ color: '#ffd700' }}>R$ 500</strong> no
            1º mês e recebe aumento fixo de <strong style={{ color: '#87ceeb' }}>R$ 50</strong> por mês.
            Quanto ganhará no <strong style={{ color: '#98fb98' }}>10º mês</strong>?
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
              PA com a₁ = 500 e r = 50
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Fórmula: aₙ = a₁ + (n–1) × r
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              a₁₀ = 500 + (10–1) × 50
            </p>
            <p>
              a₁₀ = 500 + 9 × 50 = 500 + 450 = <strong style={{ color: '#ffd700' }}>R$ 950</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo PG */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Exemplo PG — Crescimento Populacional">
          <p style={{ marginBottom: '1rem' }}>
            Uma população cresce <strong style={{ color: '#ffd700' }}>5% ao mês</strong>.
            Se inicialmente há <strong style={{ color: '#87ceeb' }}>1000 habitantes</strong>,
            qual será a população após <strong style={{ color: '#98fb98' }}>3 meses</strong>?
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
              PG com P₀ = 1000 e q = 1,05 (crescimento de 5%)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Fórmula: P = P₀ × qⁿ
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              P = 1000 × 1,05³
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              P = 1000 × 1,157625
            </p>
            <p>
              P ≈ <strong style={{ color: '#ffd700' }}>1.157 habitantes</strong>
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
          enunciado="Uma bactéria dobra sua população a cada hora. Se inicialmente há 200 bactérias, quantas haverá após 5 horas?"
          resolucao={[
            { texto: 'Identificar: é uma PG pois a população MULTIPLICA por 2 a cada hora' },
            { texto: 'P₀ = 200 (população inicial)' },
            { texto: 'q = 2 (dobra = multiplica por 2)' },
            { texto: 'n = 5 (número de horas)' },
            { texto: 'P = 200 × 2⁵ = 200 × 32 = 6.400 bactérias', destaque: true },
          ]}
          gabarito="6.400 bactérias"
          dica="Dobrar = PG com q = 2. Se triplicasse, q = 3."
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
            'PA: soma constante → aₙ = a₁ + (n–1) × r',
            'PG: multiplicação constante → aₙ = a₁ × qⁿ⁻¹',
            'Juros simples = PA | Juros compostos = PG',
            'Saber reconhecer se é PA ou PG é mais importante que fórmulas',
            '"Dobra" = PG com q = 2 | "Triplica" = PG com q = 3',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
