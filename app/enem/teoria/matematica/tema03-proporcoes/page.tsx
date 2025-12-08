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
 * Tema 03 - Regra de Três, Proporções e Escalas
 */
export default function Tema03ProporcoesPage() {
  return (
    <LousaLayout
      temaAtual="tema03-proporcoes"
      titulo="⚖️ Regra de Três e Escalas"
      badge="Tema 03"
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
        3. Regra de Três, Proporções e Escalas
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
            Aparecem em <strong style={{ color: '#ffd700' }}>mapas, receitas, densidade, velocidade média,
            consumo de combustível</strong> e problemas de mistura. É fundamental saber identificar
            se as grandezas são <strong style={{ color: '#87ceeb' }}>diretas ou inversas</strong>.
          </p>
        </div>
      </motion.section>

      {/* Tipos de Grandezas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Tipos de Grandezas">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div
              style={{
                background: 'rgba(152, 251, 152, 0.1)',
                border: '2px solid #98fb98',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <h4 style={{ color: '#98fb98', fontFamily: "'Patrick Hand', cursive", fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                📈 Grandezas Diretas
              </h4>
              <p style={{ color: '#f5f5dc', fontSize: '1rem' }}>
                Quando uma <strong>aumenta</strong>, a outra também <strong>aumenta</strong>.
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Ex: mais produto → mais preço
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255, 160, 122, 0.1)',
                border: '2px solid #ffa07a',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <h4 style={{ color: '#ffa07a', fontFamily: "'Patrick Hand', cursive", fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                📉 Grandezas Inversas
              </h4>
              <p style={{ color: '#f5f5dc', fontSize: '1rem' }}>
                Uma <strong>aumenta</strong>, a outra <strong>diminui</strong>.
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Ex: mais trabalhadores → menos dias
              </p>
            </div>
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
        <CaixaExemplo numero={1} titulo="Exemplo 1 — Grandezas Diretas">
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#ffd700' }}>3 kg</strong> de ração custam{' '}
            <strong style={{ color: '#ffd700' }}>R$ 27</strong>. Quanto custam{' '}
            <strong style={{ color: '#87ceeb' }}>5 kg</strong>?
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
              Preço por kg = 27 ÷ 3 = R$ 9 por kg
            </p>
            <p>
              Para 5 kg = 5 × 9 = <strong style={{ color: '#ffd700' }}>R$ 45</strong>
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
        <CaixaExemplo numero={2} titulo="Exemplo 2 — Grandezas Inversas">
          <p style={{ marginBottom: '1rem' }}>
            Uma equipe leva <strong style={{ color: '#ffd700' }}>12 dias</strong> para executar
            uma obra com <strong style={{ color: '#ffd700' }}>8 trabalhadores</strong>.
            Com <strong style={{ color: '#87ceeb' }}>6 trabalhadores</strong>, quantos dias levará?
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
              Grandezas inversas: mais trabalhadores = menos dias
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              12 × (8/6) = 12 × 1,333...
            </p>
            <p>
              = <strong style={{ color: '#ffd700' }}>16 dias</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Fórmula de Escala */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaFormula descricao="Escala = Distância no mapa ÷ Distância real">
          E = d / D
        </CaixaFormula>
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
          enunciado="Um mapa foi desenhado com escala 1:250.000. A distância real entre duas cidades é 150 km. Qual a distância no mapa?"
          resolucao={[
            { texto: 'Converter 150 km para cm: 150 km = 150.000 m = 15.000.000 cm' },
            { texto: 'Escala 1:250.000 significa: 1 cm no mapa = 250.000 cm na realidade' },
            { texto: 'Distância no mapa = 15.000.000 ÷ 250.000', destaque: true },
            { texto: 'Distância no mapa = 60 cm' },
          ]}
          gabarito="60 cm"
          dica="Converta sempre para a mesma unidade antes de calcular. No ENEM, escalas geralmente estão em cm."
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
            'Verificar SEMPRE se é direta ou inversa antes de calcular',
            'Grandeza direta: mantém a mesma posição na regra de três',
            'Grandeza inversa: inverte a fração',
            'Escala: distância no mapa ÷ distância real',
            'Atenção às unidades: converter para a mesma unidade',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
