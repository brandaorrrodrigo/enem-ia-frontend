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
 * Tema 09 - Estatística – Média, Mediana, Moda
 */
export default function Tema09EstatisticaPage() {
  return (
    <LousaLayout
      temaAtual="tema09-estatistica"
      titulo="📉 Estatística"
      badge="Tema 09"
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
        9. Estatística – Média, Mediana, Moda
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
            Aplicada em <strong style={{ color: '#ffd700' }}>gráficos, tabelas, pesquisas</strong> e
            distribuição de notas. Um dos temas mais frequentes no ENEM!
          </p>
        </div>
      </motion.section>

      {/* Medidas de Tendência Central */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Medidas de Tendência Central">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div
              style={{
                background: 'rgba(152, 251, 152, 0.1)',
                border: '2px solid #98fb98',
                borderRadius: '8px',
                padding: '1.25rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📊</span>
              <strong style={{ color: '#98fb98', fontFamily: "'Patrick Hand', cursive", fontSize: '1.3rem' }}>
                MÉDIA
              </strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Soma de todos ÷ quantidade
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Sofre influência de extremos
              </p>
            </div>

            <div
              style={{
                background: 'rgba(135, 206, 235, 0.1)',
                border: '2px solid #87ceeb',
                borderRadius: '8px',
                padding: '1.25rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📍</span>
              <strong style={{ color: '#87ceeb', fontFamily: "'Patrick Hand', cursive", fontSize: '1.3rem' }}>
                MEDIANA
              </strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Valor central (ordenado)
              </p>
              <p style={{ color: '#98fb98', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                NÃO sofre com extremos
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '2px solid #ffd700',
                borderRadius: '8px',
                padding: '1.25rem',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🔁</span>
              <strong style={{ color: '#ffd700', fontFamily: "'Patrick Hand', cursive", fontSize: '1.3rem' }}>
                MODA
              </strong>
              <p style={{ color: '#f5f5dc', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                Valor mais frequente
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Pode não existir ou haver mais de uma
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 - Média Ponderada */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Média Ponderada">
          <p style={{ marginBottom: '1rem' }}>
            Um aluno tirou nota <strong style={{ color: '#ffd700' }}>7</strong> com peso{' '}
            <strong style={{ color: '#87ceeb' }}>3</strong> e nota{' '}
            <strong style={{ color: '#ffd700' }}>9</strong> com peso{' '}
            <strong style={{ color: '#87ceeb' }}>2</strong>. Qual a média?
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
              Média ponderada = (nota₁ × peso₁ + nota₂ × peso₂) ÷ (soma dos pesos)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Média = (7 × 3 + 9 × 2) ÷ (3 + 2)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Média = (21 + 18) ÷ 5 = 39 ÷ 5
            </p>
            <p>
              Média = <strong style={{ color: '#ffd700' }}>7,8</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 - Mediana */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Mediana">
          <p style={{ marginBottom: '1rem' }}>
            Dados ordenados: <strong style={{ color: '#ffd700' }}>2, 4, 6, 8</strong>. Qual a mediana?
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
              São 4 valores (par) → mediana = média dos 2 centrais
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Valores centrais: 4 e 6
            </p>
            <p>
              Mediana = (4 + 6) ÷ 2 = <strong style={{ color: '#ffd700' }}>5</strong>
            </p>
          </div>

          <div
            style={{
              background: 'rgba(135, 206, 235, 0.15)',
              border: '1px solid #87ceeb',
              borderRadius: '6px',
              padding: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#87ceeb', fontSize: '0.95rem' }}>
              💡 <strong>Dica:</strong> Se ímpar, pega o valor do meio direto. Se par, média dos dois centrais.
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
          enunciado="Um estudante tirou as seguintes notas em 4 provas: 10, 8, 7 e 5. Qual foi sua média aritmética?"
          resolucao={[
            { texto: 'Somar todas as notas: 10 + 8 + 7 + 5 = 30' },
            { texto: 'Contar quantas notas: 4 notas' },
            { texto: 'Dividir soma pela quantidade: 30 ÷ 4', destaque: true },
            { texto: 'Média = 7,5' },
          ]}
          gabarito="7,5"
          dica="Média aritmética simples = soma de todos os valores ÷ quantidade de valores"
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
            'Média sofre influência de valores extremos; mediana não',
            'Média ponderada: soma (valor × peso) ÷ soma dos pesos',
            'Mediana: ordenar dados e pegar o valor central',
            'Moda: valor que mais aparece (pode haver mais de uma)',
            'No ENEM, gráficos de estatística exigem leitura atenta dos eixos',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
