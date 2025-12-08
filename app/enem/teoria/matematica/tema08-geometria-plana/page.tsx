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
 * Tema 08 - Geometria Plana
 */
export default function Tema08GeometriaPlanaPage() {
  return (
    <LousaLayout
      temaAtual="tema08-geometria-plana"
      titulo="📏 Geometria Plana"
      badge="Tema 08"
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
        8. Geometria Plana
      </motion.h1>

      {/* Onde Aparece */}
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
            Aparece em problemas de <strong style={{ color: '#ffd700' }}>pisos, áreas, pinturas,
            terrenos, embalagens</strong> e cortes de figuras.
          </p>
        </div>
      </motion.section>

      {/* Fórmulas Essenciais */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Fórmulas Essenciais">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              { nome: 'Triângulo', formula: 'A = (b × h) / 2', icone: '△' },
              { nome: 'Retângulo', formula: 'A = b × h', icone: '▭' },
              { nome: 'Quadrado', formula: 'A = L²', icone: '□' },
              { nome: 'Círculo', formula: 'A = πr²', icone: '○' },
              { nome: 'Trapézio', formula: 'A = (B + b) × h / 2', icone: '⏢' },
              { nome: 'Losango', formula: 'A = (D × d) / 2', icone: '◇' },
            ].map((fig, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>
                  {fig.icone}
                </span>
                <strong style={{ color: '#ffd700', fontFamily: "'Patrick Hand', cursive", fontSize: '1.1rem' }}>
                  {fig.nome}
                </strong>
                <p style={{ color: '#87ceeb', fontSize: '0.95rem', marginTop: '0.5rem', fontFamily: "'Patrick Hand', cursive" }}>
                  {fig.formula}
                </p>
              </div>
            ))}
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
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Área de Pintura">
          <p style={{ marginBottom: '1rem' }}>
            Uma parede mede <strong style={{ color: '#ffd700' }}>6 × 3 m</strong> e tem uma porta de{' '}
            <strong style={{ color: '#87ceeb' }}>1 × 2 m</strong>. Qual a área útil para pintura?
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
              Área da parede = 6 × 3 = 18 m²
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Área da porta = 1 × 2 = 2 m²
            </p>
            <p>
              Área útil = 18 – 2 = <strong style={{ color: '#ffd700' }}>16 m²</strong>
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Piso Necessário">
          <p style={{ marginBottom: '1rem' }}>
            Uma sala retangular mede <strong style={{ color: '#ffd700' }}>4 × 5 m</strong>.
            Quantos metros quadrados de piso são necessários?
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
            <p>
              Área = 4 × 5 = <strong style={{ color: '#ffd700' }}>20 m²</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Dica de Unidades */}
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
            ⚠️ ATENÇÃO com unidades!
          </p>
          <p style={{ color: '#f5f5dc' }}>
            <strong>1 m² = 10.000 cm²</strong> (não 100!)<br />
            Sempre converta para a mesma unidade ANTES de calcular.
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
          enunciado="Um terreno quadrado possui área de 900 m². Qual é a medida do lado desse terreno?"
          resolucao={[
            { texto: 'Terreno quadrado: A = L²' },
            { texto: 'Sabemos que A = 900 m²' },
            { texto: 'Então: L² = 900' },
            { texto: 'L = √900 = 30 metros', destaque: true },
          ]}
          gabarito="30 m"
          dica="Para encontrar o lado quando se tem a área de um quadrado, extraia a raiz quadrada."
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
            'SEMPRE converter unidades antes de calcular',
            'Triângulo: A = (b × h) / 2',
            'Retângulo: A = b × h | Quadrado: A = L²',
            'Círculo: A = πr² | Circunferência: C = 2πr',
            'Área com "buracos" = área total – área dos buracos',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
