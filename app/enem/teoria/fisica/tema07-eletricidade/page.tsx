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
 * Tema 07 - Eletricidade
 */
export default function Tema07EletricidadePage() {
  return (
    <LousaLayout
      temaAtual="tema07-eletricidade"
      titulo="🔌 Eletricidade"
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
        7. Eletricidade
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
            A <strong style={{ color: '#ffd700' }}>eletricidade</strong> é um dos temas mais
            cobrados no ENEM! Aparece em questões sobre{' '}
            <strong style={{ color: '#87ceeb' }}>consumo de energia, conta de luz, circuitos
            elétricos</strong> e <strong style={{ color: '#98fb98' }}>potência de aparelhos</strong>.
            É muito contextualizado com situações do cotidiano.
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
                <strong>Corrente Elétrica (i):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Fluxo ordenado de cargas elétricas. Unidade: Ampère (A)
              </p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace', marginTop: '0.5rem' }}>
                i = ΔQ/Δt (carga por tempo)
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Tensão/DDP (U):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Diferença de potencial que "empurra" as cargas. Unidade: Volt (V)
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Resistência (R):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Oposição à passagem de corrente. Unidade: Ohm (Ω)
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Fórmulas Principais */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula titulo="Fórmulas Essenciais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Lei de Ohm:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.5rem', fontFamily: 'monospace' }}>
                U = R · i
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Potência Elétrica:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                P = U · i = R · i² = U²/R
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                Unidade: Watt (W)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Energia Consumida:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                E = P · Δt
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                Unidade comercial: kWh (quilowatt-hora)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Resistência do Fio:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                R = ρ · L/A
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                ρ = resistividade, L = comprimento, A = área
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Associação de Resistores */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Associação de Resistores">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Em Série:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0 }}>
                <li>Mesma corrente em todos</li>
                <li>Tensão se divide</li>
                <li>Req = R₁ + R₂ + R₃...</li>
              </ul>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Se um queima, todos apagam
              </p>
            </div>
            <div>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}>
                <strong>Em Paralelo:</strong>
              </p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0 }}>
                <li>Mesma tensão em todos</li>
                <li>Corrente se divide</li>
                <li>1/Req = 1/R₁ + 1/R₂...</li>
              </ul>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Circuito residencial é em paralelo!
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 - Conta de Luz */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Conta de Luz (MUITO COBRADO!)">
          <p style={{ marginBottom: '1rem' }}>
            Um chuveiro de <strong style={{ color: '#ffd700' }}>5.500 W</strong> é usado por{' '}
            <strong style={{ color: '#ffd700' }}>30 minutos</strong> diários.
            Se o kWh custa R$ 0,80, qual o custo mensal? (30 dias)
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
              Potência: 5.500 W = 5,5 kW
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Tempo diário: 30 min = 0,5 h
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Energia diária: 5,5 × 0,5 = 2,75 kWh
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Energia mensal: 2,75 × 30 = 82,5 kWh
            </p>
            <p>
              Custo: 82,5 × 0,80 = <strong style={{ color: '#ffd700' }}>R$ 66,00</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 - Lei de Ohm */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Aplicação da Lei de Ohm">
          <p style={{ marginBottom: '1rem' }}>
            Um resistor de <strong style={{ color: '#ffd700' }}>20 Ω</strong> está ligado a uma
            tensão de <strong style={{ color: '#ffd700' }}>120 V</strong>. Calcule a corrente e
            a potência dissipada.
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
              Corrente: i = U/R = 120/20 = <strong style={{ color: '#ffd700' }}>6 A</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Potência: P = U × i = 120 × 6 = <strong style={{ color: '#ffd700' }}>720 W</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Ou: P = U²/R = 120²/20 = 14400/20 = 720 W ✓
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Efeito Joule */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Efeito Joule">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              A passagem de corrente elétrica por um condutor produz calor.
              Este é o princípio de funcionamento de:
            </p>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
              <li>Chuveiro elétrico</li>
              <li>Ferro de passar</li>
              <li>Secador de cabelo</li>
              <li>Lâmpadas incandescentes</li>
              <li>Torradeiras</li>
            </ul>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>
                Q = R · i² · Δt = P · Δt
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                A energia elétrica é convertida em energia térmica (calor)
              </p>
            </div>
          </div>
        </CaixaProfessor>
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
          enunciado="Uma residência possui 10 lâmpadas de 60 W cada, ligadas em média 5 horas por dia. Se o kWh custa R$ 0,75, qual será o aumento na conta de luz ao final de 30 dias?"
          resolucao={[
            { texto: 'Potência total: 10 × 60 = 600 W = 0,6 kW' },
            { texto: 'Energia diária: 0,6 kW × 5 h = 3 kWh' },
            { texto: 'Energia mensal: 3 × 30 = 90 kWh', destaque: true },
            { texto: 'Custo: 90 × 0,75 = R$ 67,50' },
          ]}
          gabarito="R$ 67,50"
          dica="Sempre converta W para kW (÷1000) e minutos para horas (÷60) antes de calcular energia em kWh!"
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
            'Lei de Ohm: U = R × i',
            'Potência: P = U × i = R × i² = U²/R',
            'Energia: E = P × t (kWh = kW × hora)',
            'Série: mesma corrente, Req = soma das resistências',
            'Paralelo: mesma tensão, 1/Req = soma dos inversos',
            'Conta de luz: custo = energia (kWh) × tarifa (R$/kWh)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
