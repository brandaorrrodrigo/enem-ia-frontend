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
 * Tema 05 - Função Afim (1º Grau)
 */
export default function Tema05FuncaoAfimPage() {
  return (
    <LousaLayout
      temaAtual="tema05-funcao-afim"
      titulo="📐 Função Afim (1º Grau)"
      badge="Tema 05"
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
        5. Função Afim (1º Grau)
      </motion.h1>

      {/* Modelo Fundamental */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CaixaFormula descricao="Modelo fundamental da função do 1º grau">
          f(x) = ax + b
        </CaixaFormula>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div
            style={{
              background: 'rgba(152, 251, 152, 0.15)',
              border: '2px solid #98fb98',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>📊</span>
            <strong style={{ color: '#98fb98', fontFamily: "'Patrick Hand', cursive", fontSize: '1.2rem' }}>
              a = taxa de variação
            </strong>
            <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Quanto y muda por unidade de x
            </p>
          </div>

          <div
            style={{
              background: 'rgba(135, 206, 235, 0.15)',
              border: '2px solid #87ceeb',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🎯</span>
            <strong style={{ color: '#87ceeb', fontFamily: "'Patrick Hand', cursive", fontSize: '1.2rem' }}>
              b = valor inicial
            </strong>
            <p style={{ color: '#f5f5dc', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Valor de y quando x = 0
            </p>
          </div>
        </div>
      </motion.section>

      {/* Aplicações Típicas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Aplicações Típicas no ENEM">
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {[
              'Planos de internet e telefonia (fixo + consumo)',
              'Tarifas de energia elétrica',
              'Custos de produção (fixo + variável)',
              'Táxis e transporte por aplicativo',
              'Aluguel de equipamentos',
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

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Plano Telefônico">
          <p style={{ marginBottom: '1rem' }}>
            Um plano de celular custa <strong style={{ color: '#ffd700' }}>R$ 30</strong> fixos
            mais <strong style={{ color: '#87ceeb' }}>R$ 0,20</strong> por minuto excedente.
            Quanto custa usar <strong style={{ color: '#98fb98' }}>100 minutos</strong> excedentes?
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
              <strong>Função:</strong> C(x) = 30 + 0,20x
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Para 100 minutos:
            </p>
            <p>
              C(100) = 30 + 0,20 × 100 = 30 + 20 = <strong style={{ color: '#ffd700' }}>R$ 50</strong>
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Comparação entre Dois Planos">
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#98fb98' }}>Plano A:</strong> 20 + 0,10x<br />
            <strong style={{ color: '#87ceeb' }}>Plano B:</strong> 35 + 0,05x
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
              <strong>Para descobrir quando são iguais:</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              20 + 0,10x = 35 + 0,05x
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              0,10x – 0,05x = 35 – 20
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              0,05x = 15
            </p>
            <p>
              x = <strong style={{ color: '#ffd700' }}>300 minutos</strong>
            </p>
            <p style={{ color: '#87ceeb', marginTop: '0.75rem', fontSize: '0.95rem' }}>
              Até 300 min: Plano A é melhor | Acima de 300 min: Plano B é melhor
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
          enunciado="Uma fábrica tem custo fixo de R$ 2.000 e custo variável de R$ 8 por unidade produzida. Qual a função custo?"
          resolucao={[
            { texto: 'Identificar os elementos: custo fixo = 2000, custo variável = 8 por unidade' },
            { texto: 'O custo variável depende da quantidade x' },
            { texto: 'Custo variável total = 8x' },
            { texto: 'Função custo: C(x) = custo fixo + custo variável', destaque: true },
          ]}
          gabarito="C(x) = 2000 + 8x"
          dica="Custo fixo = termo independente (b), custo variável por unidade = coeficiente angular (a)"
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
            'f(x) = ax + b → a é a taxa, b é o valor inicial',
            'Taxa positiva (a > 0) = função crescente',
            'Taxa negativa (a < 0) = função decrescente',
            'Para comparar planos: igualar as funções e encontrar x',
            'Interpretar taxa e intercepto é o mais cobrado no ENEM',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
