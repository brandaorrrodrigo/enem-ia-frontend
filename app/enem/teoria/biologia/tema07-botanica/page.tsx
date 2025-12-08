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

export default function Tema07BotanicaPage() {
  return (
    <LousaLayout temaAtual="tema07-botanica" titulo="🌱 Botânica" badge="Tema 07">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        7. Botânica
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>botânica</strong> estuda as plantas: estrutura, fisiologia e reprodução.
            <strong style={{ color: '#87ceeb' }}> Grupos vegetais, tecidos e hormônios</strong> são temas importantes no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Grupos Vegetais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center' }}>
                <span style={{ color: '#98fb98' }}>Briófitas</span> →
                <span style={{ color: '#87ceeb' }}> Pteridófitas</span> →
                <span style={{ color: '#ffd700' }}> Gimnospermas</span> →
                <span style={{ color: '#ff6b6b' }}> Angiospermas</span>
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Briófitas (musgos):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Sem vasos. Dependem de água para reprodução.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Pteridófitas (samambaias):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Com vasos. Sem sementes. Esporos.</p>
              </div>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Gimnospermas (pinheiros):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Sementes nuas (sem fruto).</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Angiospermas:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Flores, frutos e sementes protegidas.</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Tecidos Vegetais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Meristemas</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Células indiferenciadas. Crescimento.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Primário (altura) | Secundário (espessura)</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Parênquima</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Preenchimento, fotossíntese, reserva.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Clorofiliano | Reserva | Aquífero</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Xilema:</strong> conduz seiva bruta (água + sais) - raiz → folhas</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Floema:</strong> conduz seiva elaborada (açúcares) - folhas → resto</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Transporte nas Plantas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Teoria da Coesão-Tensão (seiva bruta):</strong></p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Transpiração nas folhas cria tensão (puxa)</li>
                <li>Moléculas de água coesas (ligação de H)</li>
                <li>Água sobe da raiz até as folhas</li>
              </ol>
            </div>
            <p style={{ color: '#98fb98' }}>
              💡 Por isso plantas transpiram mais em dias quentes e secos!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Hormônios Vegetais">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Auxina:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Crescimento, fototropismo. Dominância apical.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Giberelina:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Alongamento do caule. Germinação.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Citocinina:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Divisão celular. Retarda envelhecimento.</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Etileno:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Amadurecimento de frutos. Gasoso.</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Por que frutas amadurecem mais rápido quando colocadas em saco fechado junto com uma banana madura?"
          resolucao={[
            { texto: 'Banana madura libera etileno (gás)' },
            { texto: 'Etileno é hormônio do amadurecimento', destaque: true },
            { texto: 'No saco fechado, etileno se acumula' },
            { texto: 'Outras frutas absorvem e amadurecem mais rápido' },
          ]}
          gabarito="Etileno liberado pela banana acelera amadurecimento"
          dica="Etileno é um hormônio gasoso! Por isso se espalha pelo ambiente."
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Briófitas: sem vasos | Pteridófitas: vasos, sem sementes',
            'Gimnospermas: sementes nuas | Angiospermas: frutos',
            'Xilema: seiva bruta (↑) | Floema: seiva elaborada',
            'Transpiração puxa água (coesão-tensão)',
            'Auxina: crescimento | Etileno: amadurecimento',
            'Estômatos: trocas gasosas (abrem com luz e água)',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
