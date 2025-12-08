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
 * Tema 01 - Aritmética Essencial
 */
export default function Tema01AritmeticaPage() {
  return (
    <LousaLayout
      temaAtual="tema01-aritmetica"
      titulo="🔢 Aritmética Essencial"
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
        1. Aritmética Essencial
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
            A <strong style={{ color: '#ffd700' }}>aritmética</strong> é usada em quase todas as questões
            de Matemática do ENEM, mesmo quando não aparece explicitamente. Ela surge em problemas
            envolvendo <strong style={{ color: '#87ceeb' }}>consumo, diferenças de valores, tabelas,
            reajustes, tempo e distância</strong>.
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
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {[
              'Operações e prioridades',
              'Manipulação de decimais e frações',
              'Somas e diferenças acumuladas',
              'Interpretação de unidades',
              'Cálculo mental inteligente',
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
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Aplicação Real">
          <p style={{ marginBottom: '1rem' }}>
            Um trabalhador recebe <strong style={{ color: '#ffd700' }}>R$ 1.800</strong> por mês
            e ganha um adicional de <strong style={{ color: '#ffd700' }}>R$ 120</strong> por produtividade.
            Qual é sua renda anual?
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
              Renda mensal total = 1800 + 120 = <strong style={{ color: '#ffd700' }}>R$ 1.920</strong>
            </p>
            <p>
              Renda anual = 1920 × 12 = <strong style={{ color: '#ffd700' }}>R$ 23.040</strong>
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Diferença Percentual e Absoluta">
          <p style={{ marginBottom: '1rem' }}>
            Um produto passou de <strong style={{ color: '#ffd700' }}>R$ 50</strong> para{' '}
            <strong style={{ color: '#ffd700' }}>R$ 65</strong>.
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
              <strong style={{ color: '#87ceeb' }}>Diferença absoluta:</strong> 65 – 50 ={' '}
              <strong style={{ color: '#ffd700' }}>R$ 15</strong>
            </p>
            <p>
              <strong style={{ color: '#87ceeb' }}>Diferença relativa:</strong> 15/50 = 0,30 ={' '}
              <strong style={{ color: '#ffd700' }}>30%</strong>
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
          enunciado="Uma cidade aumentou sua frota de ônibus de 240 para 300 veículos. Qual foi a variação percentual?"
          resolucao={[
            { texto: 'Identificar os valores: inicial = 240, final = 300' },
            { texto: 'Calcular a diferença: 300 – 240 = 60 veículos' },
            { texto: 'Calcular a variação percentual: 60 ÷ 240 = 0,25', destaque: true },
            { texto: 'Converter para porcentagem: 0,25 × 100 = 25%' },
          ]}
          gabarito="25%"
          dica="A variação percentual sempre é calculada sobre o valor INICIAL, não sobre o final."
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
            'Aritmética é sempre contextual no ENEM — leia o enunciado com atenção',
            'Erros frequentes: arredondar cedo demais e ignorar unidades',
            'Diferença absoluta = valor final – valor inicial',
            'Diferença relativa (%) = (diferença ÷ valor inicial) × 100',
            'Pratique cálculo mental para ganhar tempo na prova',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
