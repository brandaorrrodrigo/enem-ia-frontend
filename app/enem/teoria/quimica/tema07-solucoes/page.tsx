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

export default function Tema07SolucoesPage() {
  return (
    <LousaLayout temaAtual="tema07-solucoes" titulo="🧪 Soluções" badge="Tema 07">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        7. Soluções
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            <strong style={{ color: '#ffd700' }}>Soluções</strong> são misturas homogêneas de soluto (dissolvido) e solvente (dissolve).
            No ENEM, concentração e diluição são <strong style={{ color: '#87ceeb' }}>muito cobrados</strong>!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Tipos de Concentração">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Concentração Comum (C):</strong></p>
              <p style={{ color: '#f5f5dc', fontFamily: 'monospace' }}>C = m₁/V (g/L)</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>m₁ = massa do soluto, V = volume da solução</p>
            </div>
            <div>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Concentração Molar (M):</strong></p>
              <p style={{ color: '#f5f5dc', fontFamily: 'monospace' }}>M = n/V = m₁/(MM × V) (mol/L)</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>n = número de mols, MM = massa molar</p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Título ou Fração Mássica (τ):</strong></p>
              <p style={{ color: '#f5f5dc', fontFamily: 'monospace' }}>τ = m₁/m (adimensional ou %)</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>m = massa total da solução</p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Relação entre Concentrações">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                C = M × MM &nbsp;&nbsp;|&nbsp;&nbsp; C = τ × d × 1000
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                d = densidade da solução (g/mL)
              </p>
            </div>
            <p style={{ color: '#98fb98' }}>
              💡 ppm (partes por milhão): 1 ppm = 1 mg/L = 1 mg/kg
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Calculando Concentração">
          <p style={{ marginBottom: '1rem' }}>
            Dissolveu-se 20g de NaOH em água suficiente para 500 mL de solução.
            Qual a concentração em g/L e mol/L? (MM NaOH = 40 g/mol)
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>C = m/V = 20/0,5 = <strong style={{ color: '#ffd700' }}>40 g/L</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>n = m/MM = 20/40 = 0,5 mol</p>
            <p style={{ marginBottom: '0.5rem' }}>M = n/V = 0,5/0,5 = <strong style={{ color: '#ffd700' }}>1 mol/L</strong></p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ou: M = C/MM = 40/40 = 1 mol/L</p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Diluição de Soluções">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Ao adicionar solvente, a <strong style={{ color: '#ffd700' }}>quantidade de soluto não muda</strong>,
              apenas a concentração diminui.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                C₁ × V₁ = C₂ × V₂
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', marginTop: '0.5rem' }}>
                ou M₁ × V₁ = M₂ × V₂
              </p>
            </div>
            <p style={{ color: '#98fb98' }}>
              💡 Funciona para qualquer unidade de concentração, desde que seja a mesma nos dois lados!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Mistura de Soluções de Mesmo Soluto">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center', fontFamily: 'monospace' }}>
                C₁V₁ + C₂V₂ = C_f × V_f
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                V_f = V₁ + V₂ (volume final = soma dos volumes)
              </p>
            </div>
            <p style={{ color: '#98fb98' }}>
              A concentração final é uma média ponderada pelos volumes!
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Uma solução de NaCl 2 mol/L deve ser diluída para obter 500 mL de solução 0,5 mol/L. Que volume da solução original deve ser usado?"
          resolucao={[
            { texto: 'Diluição: M₁V₁ = M₂V₂' },
            { texto: '2 × V₁ = 0,5 × 500' },
            { texto: '2V₁ = 250', destaque: true },
            { texto: 'V₁ = 125 mL' },
          ]}
          gabarito="125 mL da solução original"
          dica="Na diluição, a quantidade de soluto (n = M × V) permanece constante!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'C = m/V (g/L) | M = n/V (mol/L)',
            'C = M × MM (relaciona g/L e mol/L)',
            'Título: τ = m₁/m (fração mássica)',
            'Diluição: C₁V₁ = C₂V₂ (soluto constante)',
            'Mistura: C₁V₁ + C₂V₂ = C_f × V_f',
            'ppm = mg/L = mg/kg',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
