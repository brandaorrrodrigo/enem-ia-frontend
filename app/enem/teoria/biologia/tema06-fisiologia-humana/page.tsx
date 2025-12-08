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

export default function Tema06FisiologiaHumanaPage() {
  return (
    <LousaLayout temaAtual="tema06-fisiologia-humana" titulo="❤️ Fisiologia Humana" badge="Tema 06">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        6. Fisiologia Humana
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>fisiologia humana</strong> estuda o funcionamento dos sistemas do corpo.
            <strong style={{ color: '#87ceeb' }}> Circulatório, digestório, nervoso e endócrino</strong> são muito cobrados!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Sistema Circulatório">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Circulação Dupla e Completa:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li><strong style={{ color: '#87ceeb' }}>Pequena:</strong> Coração ↔ Pulmões (hematose)</li>
                <li><strong style={{ color: '#ffd700' }}>Grande:</strong> Coração ↔ Corpo (nutrientes/O₂)</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Artérias:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Saem do coração. Paredes grossas. Alta pressão.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Veias:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Chegam ao coração. Válvulas. Baixa pressão.</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Sistema Digestório">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center' }}>
                Boca → Esôfago → Estômago → Intestino Delgado → Intestino Grosso
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Boca:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Amilase salivar (ptialina) → amido</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Estômago:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>HCl + pepsina → proteínas</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Intestino Delgado:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Absorção de nutrientes. Vilosidades.</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Fígado/Pâncreas:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Bile (emulsifica gorduras) + enzimas</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Sistema Nervoso">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>SNC</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Encéfalo + Medula espinhal</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Processa e integra informações</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>SNP</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Nervos + Gânglios</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Conecta SNC ao corpo</p>
              </div>
            </div>
            <div>
              <p style={{ color: '#ff6b6b' }}><strong>Neurônio:</strong> célula nervosa (dendritos → corpo → axônio)</p>
              <p style={{ color: '#ffd700' }}><strong>Sinapse:</strong> transmissão por neurotransmissores</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Sistema Endócrino - Hormônios">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Insulina (pâncreas):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>↓ Glicemia (entra nas células)</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Glucagon (pâncreas):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>↑ Glicemia (libera glicogênio)</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Adrenalina (suprarrenal):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Luta ou fuga. ↑ FC, ↑ glicemia</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>TSH/T3/T4 (tireoide):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Metabolismo. Precisa de iodo.</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Uma pessoa diabética tipo 1 não produz insulina. Por que precisa aplicar insulina antes das refeições?"
          resolucao={[
            { texto: 'Refeição → glicose no sangue aumenta' },
            { texto: 'Insulina faz glicose entrar nas células', destaque: true },
            { texto: 'Sem insulina → glicose fica no sangue (hiperglicemia)' },
            { texto: 'Aplicar antes permite absorver a glicose da refeição' },
          ]}
          gabarito="Insulina permite que a glicose entre nas células"
          dica="Insulina é a 'chave' que abre as células para a glicose entrar!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Circulação dupla: pequena (pulmão) + grande (corpo)',
            'Artérias saem do coração | Veias chegam',
            'Digestão: boca (amido) → estômago (proteína) → intestino (absorção)',
            'SNC: encéfalo + medula | SNP: nervos',
            'Insulina: ↓ glicemia | Glucagon: ↑ glicemia',
            'Tireoide: metabolismo (precisa de iodo)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
