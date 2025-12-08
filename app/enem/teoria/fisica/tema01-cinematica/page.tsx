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
 * Tema 01 - Cinemática
 */
export default function Tema01CinematicaPage() {
  return (
    <LousaLayout
      temaAtual="tema01-cinematica"
      titulo="🚗 Cinemática"
      badge="Tema 01"
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
        1. Cinemática
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
            A <strong style={{ color: '#ffd700' }}>cinemática</strong> estuda o movimento dos corpos
            sem se preocupar com suas causas. No ENEM, aparece em questões sobre{' '}
            <strong style={{ color: '#87ceeb' }}>velocidade média, gráficos de movimento,
            queda livre e lançamentos</strong>. É fundamental dominar a interpretação de gráficos!
          </p>
        </div>
      </motion.section>

      {/* Tópicos Fundamentais */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Tópicos Fundamentais">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Velocidade média e instantânea',
              'MRU (Movimento Retilíneo Uniforme)',
              'MRUV (Movimento Retilíneo Uniformemente Variado)',
              'Queda livre e lançamento vertical',
              'Interpretação de gráficos s×t e v×t',
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  position: 'relative',
                  paddingLeft: '2rem',
                  marginBottom: '0.75rem',
                  color: '#f5f5dc',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '0.5rem',
                    color: '#ffd700',
                    fontSize: '1.2rem',
                  }}
                >
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
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
                <strong>Velocidade Média:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Vm = Δs / Δt
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>MRU (Movimento Uniforme):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                s = s₀ + v·t
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>MRUV (Equações de Torricelli):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                v = v₀ + a·t
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                s = s₀ + v₀·t + (a·t²)/2
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                v² = v₀² + 2·a·Δs
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Queda Livre (g ≈ 10 m/s²):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.2rem', fontFamily: 'monospace' }}>
                h = (g·t²)/2 &nbsp;&nbsp;|&nbsp;&nbsp; v = g·t
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Velocidade Média">
          <p style={{ marginBottom: '1rem' }}>
            Um carro percorre <strong style={{ color: '#ffd700' }}>180 km</strong> em{' '}
            <strong style={{ color: '#ffd700' }}>2 horas</strong>. Qual sua velocidade média em m/s?
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
              Vm = 180 km / 2 h = <strong style={{ color: '#ffd700' }}>90 km/h</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Convertendo para m/s: 90 ÷ 3,6 = <strong style={{ color: '#ffd700' }}>25 m/s</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '1rem' }}>
              💡 Dica: Para converter km/h → m/s, divida por 3,6
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
        <CaixaExemplo numero={2} titulo="Queda Livre">
          <p style={{ marginBottom: '1rem' }}>
            Um objeto é solto do repouso de uma altura de <strong style={{ color: '#ffd700' }}>80 m</strong>.
            Quanto tempo leva para atingir o solo? (g = 10 m/s²)
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
              Usando h = (g·t²)/2:
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              80 = (10·t²)/2 → 80 = 5·t² → t² = 16
            </p>
            <p>
              t = <strong style={{ color: '#ffd700' }}>4 segundos</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Interpretação de Gráficos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Interpretação de Gráficos (MUITO IMPORTANTE!)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Gráfico s × t (posição × tempo):</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>Inclinação = velocidade</li>
                <li>Reta horizontal = repouso</li>
                <li>Reta inclinada = MRU</li>
                <li>Parábola = MRUV</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Gráfico v × t (velocidade × tempo):</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>Inclinação = aceleração</li>
                <li>Área sob a curva = deslocamento</li>
                <li>Reta horizontal = MRU</li>
                <li>Reta inclinada = MRUV</li>
              </ul>
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
          enunciado="Um motorista percorre a primeira metade de uma viagem a 60 km/h e a segunda metade a 40 km/h. Qual é a velocidade média em toda a viagem?"
          resolucao={[
            { texto: 'Seja d a distância total. Primeira metade: d/2 a 60 km/h' },
            { texto: 'Tempo 1: t₁ = (d/2) ÷ 60 = d/120' },
            { texto: 'Tempo 2: t₂ = (d/2) ÷ 40 = d/80' },
            { texto: 'Tempo total: t = d/120 + d/80 = 2d/240 + 3d/240 = 5d/240', destaque: true },
            { texto: 'Vm = d ÷ (5d/240) = 240/5 = 48 km/h' },
          ]}
          gabarito="48 km/h"
          dica="Velocidade média NÃO é a média aritmética das velocidades! Use sempre Vm = Δs/Δt"
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
            'Velocidade média = distância total / tempo total (não é média aritmética!)',
            'MRU: velocidade constante, gráfico s×t é uma reta',
            'MRUV: aceleração constante, gráfico v×t é uma reta',
            'Queda livre: v₀ = 0 e a = g ≈ 10 m/s²',
            'Área sob o gráfico v×t = deslocamento',
            'Para converter km/h → m/s: divida por 3,6',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
