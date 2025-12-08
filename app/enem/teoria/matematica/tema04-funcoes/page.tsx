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
 * Tema 04 - Funções – Interpretação Estrutural
 */
export default function Tema04FuncoesPage() {
  return (
    <LousaLayout
      temaAtual="tema04-funcoes"
      titulo="📈 Funções – Interpretação"
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
        4. Funções – Interpretação Estrutural
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
            <strong style={{ color: '#ffd700' }}>Funções</strong> descrevem relações entre grandezas.
            O ENEM cobra mais <strong style={{ color: '#87ceeb' }}>gráficos e interpretação</strong>{' '}
            do que manipulação algébrica.
          </p>
        </div>
      </motion.section>

      {/* Elementos de uma Função */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Elementos de uma Função">
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              { termo: 'Domínio', descricao: 'Valores de entrada (x)' },
              { termo: 'Imagem', descricao: 'Valores de saída (y)' },
              { termo: 'Crescimento', descricao: 'y aumenta quando x aumenta' },
              { termo: 'Decrescimento', descricao: 'y diminui quando x aumenta' },
              { termo: 'Taxa de variação', descricao: 'Quanto y muda por unidade de x' },
              { termo: 'Comportamento gráfico', descricao: 'Formato visual da função' },
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  borderLeft: '3px solid #87ceeb',
                }}
              >
                <strong style={{ color: '#ffd700' }}>{item.termo}:</strong>
                <br />
                <span style={{ fontSize: '0.95rem', color: '#f5f5dc' }}>{item.descricao}</span>
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
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Gráfico Crescente">
          <p style={{ marginBottom: '1rem' }}>
            Se a cada hora o nível de água sobe <strong style={{ color: '#ffd700' }}>0,3 cm</strong>,
            a função é <strong style={{ color: '#98fb98' }}>crescente e linear</strong>.
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
              <strong>Análise:</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              • Taxa de variação: <strong style={{ color: '#ffd700' }}>+0,3 cm/hora</strong> (constante)
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              • Função linear: y = 0,3x + b
            </p>
            <p>
              • Gráfico: <strong style={{ color: '#87ceeb' }}>reta com inclinação positiva</strong>
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Interpretação de Gráfico de Temperatura">
          <p>
            Mesmo sem fórmula, o ENEM quer que você{' '}
            <strong style={{ color: '#ffd700' }}>compare intervalos e variações</strong>.
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
              Perguntas típicas:
            </p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li>Em que intervalo a temperatura mais subiu?</li>
              <li>Qual foi a variação total?</li>
              <li>Em que momento atingiu o máximo/mínimo?</li>
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
          enunciado="O gráfico do saldo de um cartão mostra que entre os dias 5 e 10 o valor caiu de R$ 80 para R$ 20. Qual a variação média diária?"
          resolucao={[
            { texto: 'Identificar valores: dia 5 = R$ 80, dia 10 = R$ 20' },
            { texto: 'Variação total = 20 – 80 = –60 (negativo = queda)' },
            { texto: 'Intervalo de tempo = 10 – 5 = 5 dias' },
            { texto: 'Taxa de variação = –60 ÷ 5 = –12 por dia', destaque: true },
          ]}
          gabarito="–12 (reais por dia)"
          dica="Variação média = (valor final – valor inicial) ÷ intervalo de tempo"
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
            'Interpretar gráfico > manipular fórmula',
            'Taxa de variação = quanto y muda por unidade de x',
            'Gráfico crescente: sobe da esquerda para direita',
            'Gráfico decrescente: desce da esquerda para direita',
            'Sempre leia os eixos e suas unidades antes de responder',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
