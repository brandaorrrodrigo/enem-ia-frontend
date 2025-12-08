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
 * Tema 03 - Energia e Trabalho
 */
export default function Tema03EnergiaPage() {
  return (
    <LousaLayout
      temaAtual="tema03-energia"
      titulo="⚡ Energia e Trabalho"
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
        3. Energia e Trabalho
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
            <strong style={{ color: '#ffd700' }}>Energia</strong> é a capacidade de realizar trabalho.
            No ENEM, esse tema aparece em questões sobre <strong style={{ color: '#87ceeb' }}>
            eficiência energética, consumo de eletrodomésticos, fontes de energia</strong> e a
            famosa <strong style={{ color: '#98fb98' }}>conservação de energia mecânica</strong>.
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
        <CaixaProfessor titulo="Tipos de Energia">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Energia Cinética (Ec):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Energia associada ao movimento de um corpo.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Energia Potencial Gravitacional (Epg):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Energia associada à posição (altura) de um corpo.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Energia Potencial Elástica (Epe):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Energia armazenada em molas ou materiais elásticos.
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}>
                <strong>Energia Mecânica (Em):</strong>
              </p>
              <p style={{ color: '#f5f5dc' }}>
                Soma da energia cinética com as energias potenciais.
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
                <strong>Trabalho de uma força:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                τ = F · d · cos(θ)
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                (θ = ângulo entre a força e o deslocamento)
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Energia Cinética:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Ec = (m · v²) / 2
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Energia Potencial Gravitacional:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                Epg = m · g · h
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Potência:</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                P = τ / Δt = F · v
              </p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                Unidade: Watt (W) = J/s
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}>
                <strong>Rendimento (Eficiência):</strong>
              </p>
              <p style={{ color: '#ffd700', fontSize: '1.3rem', fontFamily: 'monospace' }}>
                η = (Pútil / Ptotal) × 100%
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      {/* Conservação de Energia */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Conservação da Energia Mecânica">
          <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
            Se não houver forças dissipativas (atrito, resistência do ar), a energia mecânica
            se conserva:
          </p>
          <p style={{ color: '#98fb98', fontSize: '1.3rem', fontFamily: 'monospace', textAlign: 'center', marginBottom: '1rem' }}>
            Ec₁ + Ep₁ = Ec₂ + Ep₂
          </p>
          <p style={{ color: '#87ceeb' }}>
            💡 Muito usado em problemas de queda livre, montanha-russa, pêndulo!
          </p>
        </CaixaProfessor>
      </motion.section>

      {/* Exemplo 1 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaExemplo numero={1} titulo="Conservação de Energia">
          <p style={{ marginBottom: '1rem' }}>
            Uma bola de <strong style={{ color: '#ffd700' }}>2 kg</strong> é solta do repouso de uma
            altura de <strong style={{ color: '#ffd700' }}>5 m</strong>. Com que velocidade atinge o solo?
            (g = 10 m/s², despreze o atrito)
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
              No topo: Ec = 0, Ep = m·g·h = 2·10·5 = 100 J
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              No solo: Ep = 0, toda energia vira cinética
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              100 = (2·v²)/2 → v² = 100 → v = 10 m/s
            </p>
            <p>
              v = <strong style={{ color: '#ffd700' }}>10 m/s</strong>
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Exemplo 2 - Potência */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '1.5rem' }}
      >
        <CaixaExemplo numero={2} titulo="Potência e Consumo">
          <p style={{ marginBottom: '1rem' }}>
            Um chuveiro de <strong style={{ color: '#ffd700' }}>5.500 W</strong> é usado por
            <strong style={{ color: '#ffd700' }}> 20 minutos</strong> por dia. Qual o consumo mensal
            em kWh? (considere 30 dias)
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
              Tempo diário: 20 min = 20/60 h = 1/3 h
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Energia diária: 5,5 × (1/3) = 1,83 kWh
            </p>
            <p>
              Consumo mensal: 1,83 × 30 = <strong style={{ color: '#ffd700' }}>55 kWh</strong>
            </p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '1rem' }}>
              💡 kWh = quilowatt-hora (energia). kW = quilowatt (potência).
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      {/* Rendimento */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        style={{ marginTop: '2rem' }}
      >
        <CaixaProfessor titulo="Rendimento - Tema Frequente!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              O rendimento indica quanto da energia fornecida é efetivamente aproveitada:
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                η = (Energia útil / Energia total) × 100%
              </p>
            </div>
            <div>
              <p style={{ color: '#87ceeb' }}>Exemplos típicos no ENEM:</p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Lâmpada LED: ~90% de rendimento</li>
                <li>Lâmpada incandescente: ~5% de rendimento</li>
                <li>Motor de carro: ~25-30% de rendimento</li>
                <li>Usina hidrelétrica: ~90% de rendimento</li>
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
          enunciado="Uma família quer reduzir o consumo de energia. Seu chuveiro elétrico de 6.000 W é usado por 30 minutos diários. Se trocarem por um modelo de 4.500 W mantendo o mesmo tempo de banho, qual será a economia mensal em kWh? (30 dias)"
          resolucao={[
            { texto: 'Chuveiro antigo: 6.000 W = 6 kW' },
            { texto: 'Consumo antigo: 6 × 0,5h × 30 = 90 kWh/mês' },
            { texto: 'Chuveiro novo: 4.500 W = 4,5 kW' },
            { texto: 'Consumo novo: 4,5 × 0,5h × 30 = 67,5 kWh/mês', destaque: true },
            { texto: 'Economia: 90 - 67,5 = 22,5 kWh/mês' },
          ]}
          gabarito="22,5 kWh"
          dica="Energia = Potência × Tempo. Converta sempre para as mesmas unidades (kW e horas)!"
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
            'Trabalho: τ = F·d·cos(θ) - só há trabalho se houver deslocamento',
            'Ec = mv²/2 | Epg = mgh | Epe = kx²/2',
            'Conservação: sem atrito, Em inicial = Em final',
            'Potência: P = τ/t = F·v (unidade: Watt)',
            'Consumo elétrico: Energia (kWh) = Potência (kW) × Tempo (h)',
            'Rendimento: η = (útil/total) × 100%',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
