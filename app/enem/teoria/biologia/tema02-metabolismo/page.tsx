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

export default function Tema02MetabolismoPage() {
  return (
    <LousaLayout temaAtual="tema02-metabolismo" titulo="⚡ Metabolismo Energético" badge="Tema 02">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        2. Metabolismo Energético
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            O <strong style={{ color: '#ffd700' }}>metabolismo energético</strong> envolve as reações que produzem e consomem energia.
            <strong style={{ color: '#87ceeb' }}> Fotossíntese, respiração e fermentação</strong> são os processos principais!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Fotossíntese">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                6CO₂ + 12H₂O + luz → C₆H₁₂O₆ + 6O₂ + 6H₂O
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Fase Clara (Fotoquímica)</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  <li>Ocorre nos tilacoides</li>
                  <li>Depende da luz</li>
                  <li>Fotólise da água: H₂O → O₂</li>
                  <li>Produz ATP e NADPH</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Fase Escura (Ciclo de Calvin)</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  <li>Ocorre no estroma</li>
                  <li>Não depende diretamente da luz</li>
                  <li>Fixa CO₂</li>
                  <li>Produz glicose (C₆H₁₂O₆)</li>
                </ul>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Respiração Celular Aeróbica">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (≈38)
              </p>
            </div>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>3 Etapas:</strong></p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li><strong style={{ color: '#98fb98' }}>Glicólise</strong> (citoplasma): glicose → 2 piruvato + 2 ATP</li>
                <li><strong style={{ color: '#87ceeb' }}>Ciclo de Krebs</strong> (matriz mitocondrial): piruvato → CO₂ + NADH</li>
                <li><strong style={{ color: '#ffd700' }}>Cadeia Respiratória</strong> (cristas mitocondriais): NADH → ATP (maioria)</li>
              </ol>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Fermentação (Respiração Anaeróbica)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Ocorre <strong style={{ color: '#ffd700' }}>sem oxigênio</strong>. Rendimento baixo: apenas 2 ATP.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Fermentação Alcoólica</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Glicose → Etanol + CO₂</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: leveduras (pão, cerveja)</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Fermentação Lática</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Glicose → Ácido Lático</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: músculos (câimbra), iogurte</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Comparação de Processos">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <table style={{ width: '100%', color: '#f5f5dc', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Processo</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Local</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Saldo ATP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem', color: '#98fb98' }}>Fotossíntese</td>
                  <td style={{ padding: '0.5rem' }}>Cloroplasto</td>
                  <td style={{ padding: '0.5rem' }}>Produz glicose</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', color: '#87ceeb' }}>Resp. Aeróbica</td>
                  <td style={{ padding: '0.5rem' }}>Mitocôndria</td>
                  <td style={{ padding: '0.5rem' }}>≈38 ATP</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem', color: '#ffd700' }}>Fermentação</td>
                  <td style={{ padding: '0.5rem' }}>Citoplasma</td>
                  <td style={{ padding: '0.5rem' }}>2 ATP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Durante exercício intenso, os músculos podem realizar fermentação lática. Por que isso causa dor muscular (câimbra)?"
          resolucao={[
            { texto: 'O₂ insuficiente para respiração aeróbica' },
            { texto: 'Células fazem fermentação lática', destaque: true },
            { texto: 'Produz ácido lático no músculo' },
            { texto: 'Acúmulo de ácido lático causa dor' },
          ]}
          gabarito="Acúmulo de ácido lático pela fermentação"
          dica="Sem O₂ suficiente, a célula recorre à fermentação, que produz ácido lático!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Fotossíntese: CO₂ + H₂O + luz → glicose + O₂',
            'O₂ vem da fotólise da água (fase clara)',
            'Respiração: glicose + O₂ → CO₂ + H₂O + ATP',
            'Glicólise: citoplasma | Krebs: matriz | Cadeia: cristas',
            'Fermentação: sem O₂, apenas 2 ATP',
            'Lática: ácido lático | Alcoólica: etanol + CO₂',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
