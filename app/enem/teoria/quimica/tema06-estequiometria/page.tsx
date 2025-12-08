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

export default function Tema06EstequiometriaPage() {
  return (
    <LousaLayout temaAtual="tema06-estequiometria" titulo="⚖️ Estequiometria" badge="Tema 06">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        6. Estequiometria
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>estequiometria</strong> é o cálculo das quantidades nas reações químicas.
            É um dos temas <strong style={{ color: '#87ceeb' }}>mais cobrados</strong> no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Conceitos Fundamentais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Mol:</strong></p>
              <p style={{ color: '#f5f5dc' }}>1 mol = 6,02 × 10²³ entidades (Número de Avogadro)</p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Massa Molar (M):</strong></p>
              <p style={{ color: '#f5f5dc' }}>Massa de 1 mol de substância. Unidade: g/mol</p>
              <p style={{ color: '#98fb98', fontSize: '0.9rem' }}>Numericamente igual à massa atômica/molecular</p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Volume Molar (CNTP):</strong></p>
              <p style={{ color: '#f5f5dc' }}>1 mol de gás = 22,4 L (nas CNTP: 0°C, 1 atm)</p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Relações Estequiométricas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                n = m/M &nbsp;&nbsp;|&nbsp;&nbsp; n = V/22,4 (CNTP) &nbsp;&nbsp;|&nbsp;&nbsp; n = N/6,02×10²³
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                n = nº de mols, m = massa, M = massa molar, V = volume, N = nº de partículas
              </p>
            </div>
            <p style={{ color: '#98fb98' }}>
              💡 Os coeficientes da equação balanceada indicam a proporção em MOLS!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Cálculo Estequiométrico">
          <p style={{ marginBottom: '1rem' }}>
            Na reação <strong style={{ color: '#ffd700' }}>2H₂ + O₂ → 2H₂O</strong>, quantos gramas de água são formados
            a partir de 4g de H₂? (M: H=1, O=16)
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>M(H₂) = 2 g/mol → n = 4/2 = 2 mol de H₂</p>
            <p style={{ marginBottom: '0.5rem' }}>Proporção: 2 mol H₂ : 2 mol H₂O = 1:1</p>
            <p style={{ marginBottom: '0.5rem' }}>Então: 2 mol de H₂O são formados</p>
            <p style={{ marginBottom: '0.5rem' }}>M(H₂O) = 18 g/mol → m = 2 × 18 = <strong style={{ color: '#ffd700' }}>36 g</strong></p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Pureza e Rendimento">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Pureza (P):</strong></p>
              <p style={{ color: '#f5f5dc' }}>Porcentagem de reagente puro na amostra</p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>massa pura = massa total × P/100</p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Rendimento (R):</strong></p>
              <p style={{ color: '#f5f5dc' }}>Quanto do produto esperado foi realmente obtido</p>
              <p style={{ color: '#98fb98', fontFamily: 'monospace' }}>R = (obtido/teórico) × 100%</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Quantos litros de O₂ (CNTP) são necessários para queimar completamente 12g de C? (C + O₂ → CO₂) (M: C=12)"
          resolucao={[
            { texto: 'n(C) = 12/12 = 1 mol' },
            { texto: 'Proporção: 1C : 1O₂ (coeficientes 1:1)' },
            { texto: '1 mol de O₂ é necessário', destaque: true },
            { texto: 'V = n × 22,4 = 1 × 22,4 = 22,4 L' },
          ]}
          gabarito="22,4 litros de O₂"
          dica="Nas CNTP: 1 mol de qualquer gás = 22,4 L"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            '1 mol = 6,02 × 10²³ entidades',
            'n = m/M (mols = massa/massa molar)',
            '1 mol de gás (CNTP) = 22,4 L',
            'Coeficientes = proporção em mols',
            'Rendimento = (obtido/teórico) × 100%',
            'Sempre balance a equação primeiro!',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
