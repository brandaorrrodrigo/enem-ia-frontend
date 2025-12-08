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

export default function Tema04FuncoesInorganicasPage() {
  return (
    <LousaLayout temaAtual="tema04-funcoes-inorganicas" titulo="🧪 Funções Inorgânicas" badge="Tema 04">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        4. Funções Inorgânicas
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            As <strong style={{ color: '#ffd700' }}>funções inorgânicas</strong> são grupos de compostos com propriedades semelhantes:
            <strong style={{ color: '#87ceeb' }}> ácidos, bases, sais e óxidos</strong>. Tema muito cobrado no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Ácidos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Liberam H⁺ em água. Fórmula geral: <strong style={{ color: '#ffd700' }}>HₓA</strong>
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Exemplos importantes:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0' }}>
                <li>HCl - ácido clorídrico (estômago)</li>
                <li>H₂SO₄ - ácido sulfúrico (bateria)</li>
                <li>HNO₃ - ácido nítrico (fertilizantes)</li>
                <li>H₃PO₄ - ácido fosfórico (refrigerantes)</li>
                <li>H₂CO₃ - ácido carbônico (chuva ácida natural)</li>
              </ul>
            </div>
            <p style={{ color: '#98fb98' }}>pH {'<'} 7 | Sabor azedo | Corroem metais</p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Bases (Hidróxidos)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Liberam OH⁻ em água. Fórmula geral: <strong style={{ color: '#ffd700' }}>M(OH)ₓ</strong>
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Exemplos importantes:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0' }}>
                <li>NaOH - hidróxido de sódio (soda cáustica)</li>
                <li>Ca(OH)₂ - hidróxido de cálcio (cal)</li>
                <li>Mg(OH)₂ - hidróxido de magnésio (leite de magnésia)</li>
                <li>Al(OH)₃ - hidróxido de alumínio (antiácido)</li>
                <li>NH₄OH - hidróxido de amônio (amoníaco)</li>
              </ul>
            </div>
            <p style={{ color: '#98fb98' }}>pH {'>'} 7 | Sabor adstringente | Escorregadias</p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Sais e Óxidos">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Sais</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Produto de ácido + base (neutralização)</p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>NaCl - sal de cozinha</li>
                <li>NaHCO₃ - bicarbonato</li>
                <li>CaCO₃ - mármore/calcário</li>
                <li>CaSO₄ - gesso</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Óxidos</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Elemento + Oxigênio</p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>CO₂ - gás carbônico</li>
                <li>H₂O - água</li>
                <li>Fe₂O₃ - ferrugem</li>
                <li>CaO - cal virgem</li>
              </ul>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Reação de Neutralização">
          <p style={{ marginBottom: '1rem' }}>
            Qual sal é formado na reação entre HCl e NaOH?
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem', fontFamily: 'monospace' }}>HCl + NaOH → NaCl + H₂O</p>
            <p>Ácido + Base → <strong style={{ color: '#ffd700' }}>Sal + Água</strong></p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              O cátion vem da base (Na⁺), o ânion vem do ácido (Cl⁻)
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="O leite de magnésia, usado como antiácido, contém Mg(OH)₂. Ao reagir com o HCl do estômago, qual sal é formado?"
          resolucao={[
            { texto: 'Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O' },
            { texto: 'Base + Ácido → Sal + Água', destaque: true },
            { texto: 'Cátion Mg²⁺ + Ânion Cl⁻ = MgCl₂' },
          ]}
          gabarito="Cloreto de magnésio (MgCl₂)"
          dica="Na neutralização: cátion da base + ânion do ácido = sal"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Ácidos: liberam H⁺, pH < 7, fórmula HₓA',
            'Bases: liberam OH⁻, pH > 7, fórmula M(OH)ₓ',
            'Sais: ácido + base → sal + água',
            'Óxidos ácidos: reagem com base (CO₂, SO₂)',
            'Óxidos básicos: reagem com ácido (CaO, Na₂O)',
            'Neutralização: HCl + NaOH → NaCl + H₂O',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
