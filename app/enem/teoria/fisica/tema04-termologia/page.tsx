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
 * Tema 04 - Termologia
 */
export default function Tema04TermologiaPage() {
  return (
    <LousaLayout
      temaAtual="tema04-termologia"
      titulo="🌡️ Termologia"
      badge="Tema 04"
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
        4. Termologia
      </motion.h1>

      {/* Visão Geral */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
          Visão Geral
        </h2>

        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: '#f5f5dc',
            fontSize: '1.1rem',
            lineHeight: 1.8,
          }}
        >
          <p>
            A <strong style={{ color: '#ffd700' }}>termologia</strong> estuda o calor e a temperatura.
            No ENEM, aparece em questões sobre <strong style={{ color: '#87ceeb' }}>escalas termométricas,
            dilatação térmica, calorimetria</strong> e <strong style={{ color: '#98fb98' }}>mudanças de
            estado físico</strong>. É um tema muito contextualizado com situações do dia a dia!
          </p>
        </div>
      </motion.section>

      {/* Conceitos Básicos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Conceitos Fundamentais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Temperatura:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Medida da agitação das moléculas. Quanto mais agitadas, maior a temperatura.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Calor:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Energia térmica em trânsito. Flui do corpo mais quente para o mais frio.
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb' }}>
                ⚠️ Calor NÃO é temperatura! Calor é energia, temperatura é uma grandeza.
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Escalas Termométricas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Escalas Termométricas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Conversão Celsius ↔ Fahrenheit:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                C/5 = (F - 32)/9
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Conversão Celsius ↔ Kelvin:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                K = C + 273
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', marginBottom: '0.5rem' }}>
                <strong>Pontos de referência:</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Água congela: 0°C = 32°F = 273K
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Água ferve: 100°C = 212°F = 373K
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Fórmulas de Calorimetria */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Calorimetria - Fórmulas Essenciais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Calor Sensível (muda temperatura):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Q = m · c · ΔT
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                c = calor específico (ex: água = 1 cal/g·°C)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Calor Latente (muda estado):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Q = m · L
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                L = calor latente de mudança de estado
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Equilíbrio Térmico:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Q(cedido) + Q(recebido) = 0
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Dilatação */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Dilatação Térmica">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Dilatação Linear:</strong>
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>
                ΔL = L₀ · α · ΔT
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Dilatação Superficial:</strong>
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>
                ΔA = A₀ · β · ΔT &nbsp;&nbsp;(β = 2α)
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Dilatação Volumétrica:</strong>
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>
                ΔV = V₀ · γ · ΔT &nbsp;&nbsp;(γ = 3α)
              </p>
            </div>
            <p style={{ color: '#87ceeb', marginTop: '0.5rem' }}>
              💡 No ENEM: juntas de dilatação em pontes, trilhos de trem, fios elétricos
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Conversão de Escalas">
          <p style={{ marginBottom: '1rem' }}>
            Um termômetro marca <strong style={{ color: '#ffd700' }}>77°F</strong>. Qual é essa
            temperatura em graus Celsius?
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
              Usando C/5 = (F - 32)/9:
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              C/5 = (77 - 32)/9 = 45/9 = 5
            </p>
            <p>
              C = 5 × 5 = <strong style={{ color: '#ffd700' }}>25°C</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Calorimetria">
          <p style={{ marginBottom: '1rem' }}>
            Quantas calorias são necessárias para aquecer <strong style={{ color: '#ffd700' }}>500 g</strong>{' '}
            de água de <strong style={{ color: '#ffd700' }}>20°C</strong> para{' '}
            <strong style={{ color: '#ffd700' }}>80°C</strong>? (c = 1 cal/g·°C)
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
              Q = m · c · ΔT
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Q = 500 × 1 × (80 - 20)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Q = 500 × 60
            </p>
            <p>
              Q = <strong style={{ color: '#ffd700' }}>30.000 cal = 30 kcal</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Mudanças de Estado */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Mudanças de Estado Físico">
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ color: '#f5f5dc', textAlign: 'center', marginBottom: '1rem' }}>
              SÓLIDO ⟷ LÍQUIDO ⟷ GASOSO
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Absorvem calor:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0 }}>
                  <li>Fusão (sólido → líquido)</li>
                  <li>Vaporização (líquido → gás)</li>
                  <li>Sublimação (sólido → gás)</li>
                </ul>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Liberam calor:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0 }}>
                  <li>Solidificação (líquido → sólido)</li>
                  <li>Condensação (gás → líquido)</li>
                  <li>Ressublimação (gás → sólido)</li>
                </ul>
              </div>
            </div>
            <p style={{ color: '#98fb98', marginTop: '1rem', textAlign: 'center' }}>
              ⚠️ Durante a mudança de estado, a temperatura permanece constante!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Questão Estilo ENEM */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
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
          enunciado="Uma barra de ferro de 2 metros de comprimento, a 20°C, é aquecida até 120°C. Sabendo que o coeficiente de dilatação linear do ferro é α = 12 × 10⁻⁶ °C⁻¹, qual será o aumento no comprimento da barra?"
          resolucao={[
            { texto: 'Dados: L₀ = 2 m, ΔT = 120 - 20 = 100°C' },
            { texto: 'α = 12 × 10⁻⁶ °C⁻¹' },
            { texto: 'ΔL = L₀ · α · ΔT', destaque: true },
            { texto: 'ΔL = 2 × 12 × 10⁻⁶ × 100' },
            { texto: 'ΔL = 2400 × 10⁻⁶ = 0,0024 m = 2,4 mm' },
          ]}
          gabarito="2,4 mm"
          dica="Na dilatação, o aumento é proporcional ao comprimento inicial e à variação de temperatura."
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
            'Temperatura ≠ Calor (temperatura é estado, calor é energia em trânsito)',
            'Conversão: C/5 = (F-32)/9 e K = C + 273',
            'Calor sensível: Q = m·c·ΔT (muda temperatura)',
            'Calor latente: Q = m·L (muda estado, T constante)',
            'Dilatação: ΔL = L₀·α·ΔT',
            'Equilíbrio térmico: Qcedido + Qrecebido = 0',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
