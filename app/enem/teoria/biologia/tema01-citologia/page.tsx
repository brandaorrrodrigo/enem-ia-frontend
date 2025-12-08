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

export default function Tema01CitologiaPage() {
  return (
    <LousaLayout temaAtual="tema01-citologia" titulo="🔬 Citologia" badge="Tema 01">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        1. Citologia - Estudo das Células
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>citologia</strong> estuda a estrutura e função das células.
            No ENEM, é fundamental conhecer <strong style={{ color: '#87ceeb' }}>organelas e diferenças entre células</strong>!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Tipos de Células">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Procarionte</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>SEM núcleo organizado</li>
                <li>DNA circular no citoplasma</li>
                <li>Sem organelas membranosas</li>
                <li>Ex: bactérias, arqueas</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Eucarionte</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>COM núcleo organizado</li>
                <li>DNA linear em cromossomos</li>
                <li>Possui organelas membranosas</li>
                <li>Ex: animais, plantas, fungos</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Organelas e Funções">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Membrana Plasmática:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Controla entrada/saída de substâncias. Bicamada lipídica.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Núcleo:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Armazena DNA, controla a célula. Envoltório nuclear.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Mitocôndria:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Respiração celular. "Usina de energia" - produz ATP.</p>
              </div>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Ribossomos:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Síntese de proteínas. Presentes em todas as células.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Retículo Endoplasmático:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Rugoso (proteínas) e Liso (lipídios).</p>
              </div>
              <div>
                <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Complexo de Golgi:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Empacota e secreta substâncias.</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Célula Animal × Vegetal">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>Só célula VEGETAL tem:</strong>
            </p>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
              <li><strong style={{ color: '#98fb98' }}>Parede celular</strong> (celulose) - forma e rigidez</li>
              <li><strong style={{ color: '#98fb98' }}>Cloroplastos</strong> - fotossíntese</li>
              <li><strong style={{ color: '#98fb98' }}>Vacúolo central grande</strong> - armazena água</li>
            </ul>
            <p style={{ color: '#87ceeb', marginTop: '1rem' }}>
              💡 Células animais têm centríolos e lisossomos mais desenvolvidos.
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Transporte pela Membrana">
          <p style={{ marginBottom: '1rem' }}>
            Tipos de transporte através da membrana plasmática:
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Passivo (sem gasto de ATP):</strong></p>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0 0 1rem 0' }}>
              <li>Difusão simples: O₂, CO₂</li>
              <li>Difusão facilitada: glicose (com proteína)</li>
              <li>Osmose: movimento da água</li>
            </ul>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Ativo (com gasto de ATP):</strong></p>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
              <li>Bomba de Na⁺/K⁺</li>
              <li>Contra o gradiente de concentração</li>
            </ul>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Uma célula colocada em solução hipertônica irá perder água por osmose. O que acontecerá com uma célula vegetal nessa condição?"
          resolucao={[
            { texto: 'Hipertônico = mais soluto fora = água sai' },
            { texto: 'Célula murcha (perde água)', destaque: true },
            { texto: 'Membrana se afasta da parede celular' },
            { texto: 'Esse fenômeno chama-se PLASMÓLISE' },
          ]}
          gabarito="Plasmólise - membrana se afasta da parede celular"
          dica="Osmose: água vai do meio hipotônico (menos soluto) para o hipertônico (mais soluto)!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Procarionte: sem núcleo | Eucarionte: com núcleo',
            'Mitocôndria: respiração celular (ATP)',
            'Cloroplasto: fotossíntese (só vegetal)',
            'Ribossomo: síntese de proteínas',
            'Célula vegetal: parede celular + cloroplasto + vacúolo',
            'Osmose: água do hipo para hipertônico',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
