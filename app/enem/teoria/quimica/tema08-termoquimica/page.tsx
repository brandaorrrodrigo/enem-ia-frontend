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

export default function Tema08TermoquimicaPage() {
  return (
    <LousaLayout temaAtual="tema08-termoquimica" titulo="🔥 Termoquímica" badge="Tema 08">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        8. Termoquímica
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>Termoquímica</strong> estuda as trocas de calor nas reações químicas.
            Entender <strong style={{ color: '#87ceeb' }}>entalpia e Lei de Hess</strong> é essencial para o ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Reações Exotérmicas e Endotérmicas">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Exotérmica</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Libera calor</li>
                <li>ΔH {'<'} 0 (negativo)</li>
                <li>H_produtos {'<'} H_reagentes</li>
                <li>Ex: combustão</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Endotérmica</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Absorve calor</li>
                <li>ΔH {'>'} 0 (positivo)</li>
                <li>H_produtos {'>'} H_reagentes</li>
                <li>Ex: fotossíntese</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Entalpia (H)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                ΔH = H_produtos - H_reagentes
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Entalpias Padrão:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Substâncias simples estáveis: ΔH°f = 0</li>
                <li>Entalpia de formação (ΔH°f): formar 1 mol a partir de substâncias simples</li>
                <li>Entalpia de combustão (ΔH°c): queimar 1 mol completamente</li>
              </ul>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Lei de Hess - FUNDAMENTAL!">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>A variação de entalpia de uma reação depende apenas dos estados inicial e final</strong>,
              não importando o caminho percorrido.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Como usar:</strong></p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0' }}>
                <li>Inverta reações se necessário (inverte sinal de ΔH)</li>
                <li>Multiplique reações se necessário (multiplica ΔH)</li>
                <li>Some as reações auxiliares = reação desejada</li>
                <li>Some os ΔH = ΔH da reação desejada</li>
              </ol>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Aplicando Lei de Hess">
          <p style={{ marginBottom: '1rem' }}>
            Calcule ΔH para: <strong style={{ color: '#ffd700' }}>C + ½O₂ → CO</strong>
          </p>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Dados: (I) C + O₂ → CO₂ &nbsp; ΔH = -394 kJ
          </p>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
            (II) CO + ½O₂ → CO₂ &nbsp; ΔH = -283 kJ
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>Queremos: C + ½O₂ → CO</p>
            <p style={{ marginBottom: '0.5rem' }}>Use (I) como está: C + O₂ → CO₂ &nbsp; ΔH = -394 kJ</p>
            <p style={{ marginBottom: '0.5rem' }}>Inverta (II): CO₂ → CO + ½O₂ &nbsp; ΔH = +283 kJ</p>
            <p style={{ marginBottom: '0.5rem' }}>Somando: C + ½O₂ → CO</p>
            <p style={{ color: '#ffd700' }}>ΔH = -394 + 283 = <strong>-111 kJ</strong></p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Energia de Ligação">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Energia necessária para <strong style={{ color: '#ffd700' }}>quebrar</strong> uma ligação (sempre positiva).
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center', fontFamily: 'monospace' }}>
                ΔH = Σ(ligações quebradas) - Σ(ligações formadas)
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Quebrar absorve (+) | Formar libera (-)
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="A combustão do metano (CH₄ + 2O₂ → CO₂ + 2H₂O) tem ΔH = -890 kJ/mol. A queima de 8g de metano libera quantos kJ? (MM CH₄ = 16 g/mol)"
          resolucao={[
            { texto: 'n = m/MM = 8/16 = 0,5 mol de CH₄' },
            { texto: 'ΔH = -890 kJ/mol (exotérmica)', destaque: true },
            { texto: 'Energia = 0,5 × 890 = 445 kJ liberados' },
          ]}
          gabarito="445 kJ liberados"
          dica="A entalpia de combustão é sempre dada por mol. Calcule os mols primeiro!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Exotérmica: libera calor, ΔH < 0',
            'Endotérmica: absorve calor, ΔH > 0',
            'ΔH = H_produtos - H_reagentes',
            'Lei de Hess: ΔH depende só do estado inicial e final',
            'Inverter reação: inverte sinal de ΔH',
            'Energia de ligação: quebrar (+) formar (-)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
