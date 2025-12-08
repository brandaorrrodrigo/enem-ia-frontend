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
 * Tema 06 - Função Quadrática (2º Grau)
 */
export default function Tema06FuncaoQuadraticaPage() {
  return (
    <LousaLayout
      temaAtual="tema06-funcao-quadratica"
      titulo="🎯 Função Quadrática"
      badge="Tema 06"
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
        6. Função Quadrática (2º Grau)
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
            Usada para problemas de <strong style={{ color: '#ffd700' }}>máximos e mínimos</strong>,
            trajetória de projéteis, lucro máximo e área otimizada.
          </p>
        </div>
      </motion.section>

      {/* Modelo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaFormula descricao="Modelo geral da função do 2º grau">
          f(x) = ax² + bx + c
        </CaixaFormula>
      </motion.section>

      {/* Concavidade */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Concavidade e Ponto de Extremo">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div
              style={{
                background: 'rgba(152, 251, 152, 0.1)',
                border: '2px solid #98fb98',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⌒</span>
              <strong style={{ color: '#98fb98', fontFamily: "'Patrick Hand', cursive", fontSize: '1.2rem' }}>
                a {'>'} 0
              </strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Concavidade para <strong>cima</strong>
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>
                Ponto de <strong>MÍNIMO</strong>
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255, 160, 122, 0.1)',
                border: '2px solid #ffa07a',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⌣</span>
              <strong style={{ color: '#ffa07a', fontFamily: "'Patrick Hand', cursive", fontSize: '1.2rem' }}>
                a {'<'} 0
              </strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Concavidade para <strong>baixo</strong>
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>
                Ponto de <strong>MÁXIMO</strong>
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Fórmula do Vértice */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaFormula descricao="Fórmula do vértice (ponto de máximo ou mínimo)">
          xᵥ = –b / (2a)
        </CaixaFormula>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Lucro Máximo">
          <p style={{ marginBottom: '1rem' }}>
            A função de lucro de uma empresa é <strong style={{ color: '#ffd700' }}>L(x) = –5x² + 100x</strong>.
            Qual a quantidade que maximiza o lucro?
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
              Identificar: a = –5, b = 100
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Como a {'<'} 0, a parábola tem <strong style={{ color: '#ffa07a' }}>máximo</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              xᵥ = –100 / (2 × (–5)) = –100 / (–10) = <strong style={{ color: '#ffd700' }}>10</strong>
            </p>
            <p style={{ color: '#87ceeb' }}>
              Resposta: 10 unidades maximizam o lucro
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Área Máxima">
          <p style={{ marginBottom: '1rem' }}>
            Problemas de <strong style={{ color: '#ffd700' }}>área máxima</strong> aparecem quando
            há uma restrição de perímetro ou de materiais disponíveis.
          </p>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#87ceeb' }}>
              Estrutura típica:
            </p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#f5f5dc' }}>
              <li>Expressar uma variável em função da outra</li>
              <li>Substituir na fórmula da área</li>
              <li>Encontrar o vértice da parábola resultante</li>
            </ul>
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
          enunciado="Uma bola é lançada e sua altura em metros é dada por h(t) = –4t² + 16t, onde t é o tempo em segundos. Qual é a altura máxima atingida pela bola?"
          resolucao={[
            { texto: 'Identificar os coeficientes: a = –4, b = 16' },
            { texto: 'Como a < 0, a parábola tem ponto de máximo' },
            { texto: 'Calcular t do vértice: t = –16 / (2 × (–4)) = –16 / (–8) = 2 segundos', destaque: true },
            { texto: 'Substituir t = 2 na função: h(2) = –4(2)² + 16(2)' },
            { texto: 'h(2) = –4(4) + 32 = –16 + 32 = 16 metros' },
          ]}
          gabarito="16 m"
          dica="O vértice responde 70% das questões de função quadrática no ENEM!"
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
            'f(x) = ax² + bx + c → gráfico é uma parábola',
            'a > 0: concavidade para cima (mínimo)',
            'a < 0: concavidade para baixo (máximo)',
            'Vértice: xᵥ = –b/(2a) → ponto de máximo ou mínimo',
            'O vértice responde 70% das questões de quadrática no ENEM',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
