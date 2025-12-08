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

export default function Tema09MicrobiologiaPage() {
  return (
    <LousaLayout temaAtual="tema09-microbiologia" titulo="🦠 Microbiologia" badge="Tema 09">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        9. Microbiologia
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>microbiologia</strong> estuda organismos microscópicos.
            <strong style={{ color: '#87ceeb' }}> Vírus, bactérias, fungos e protozoários</strong> são temas essenciais no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Vírus">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Características:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Acelulares (não são células!)</li>
                <li>Parasitas intracelulares obrigatórios</li>
                <li>Material genético: DNA OU RNA</li>
                <li>Cápsula proteica (capsídeo)</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Doenças virais:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Gripe, COVID-19, dengue, AIDS, sarampo, catapora, hepatite</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Prevenção:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Vacinas (imunização ativa). Antibióticos NÃO funcionam!</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Bactérias">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Características:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Procariontes (sem núcleo organizado)</li>
                <li>DNA circular no citoplasma</li>
                <li>Parede celular de peptidoglicano</li>
                <li>Reprodução: divisão binária</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Doenças bacterianas:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Tuberculose, cólera, tétano, sífilis, meningite bacteriana</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Tratamento:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Antibióticos (atacam a parede celular ou ribossomos)</p>
              </div>
            </div>
            <p style={{ color: '#ffd700' }}>
              💡 Nem toda bactéria é ruim! Flora intestinal, fixação de N₂, fermentação.
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Fungos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Características:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Eucariontes (com núcleo)</li>
                <li>Parede celular de quitina</li>
                <li>Heterotróficos por absorção</li>
                <li>Decompositores ou parasitas</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Importância:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Decomposição, fermentação (pão, cerveja), antibióticos (penicilina)</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Doenças (micoses):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Candidíase, pé-de-atleta, tinha, histoplasmose</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Protozoários">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ color: '#f5f5dc', marginBottom: '1rem' }}>
              Eucariontes unicelulares. Podem ser parasitas.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Amebíase:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Entamoeba. Água/alimentos contaminados.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Malária:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Plasmodium. Mosquito Anopheles.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Doença de Chagas:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Trypanosoma. Barbeiro (fezes).</p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Leishmaniose:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Leishmania. Mosquito-palha.</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="O uso indiscriminado de antibióticos contribui para o surgimento de 'superbactérias'. Por que antibióticos não devem ser usados contra gripes?"
          resolucao={[
            { texto: 'Gripe é causada por VÍRUS' },
            { texto: 'Antibióticos só matam BACTÉRIAS', destaque: true },
            { texto: 'Uso errado seleciona bactérias resistentes' },
            { texto: 'Para vírus: vacinas e antivirais' },
          ]}
          gabarito="Antibióticos não funcionam contra vírus"
          dica="Antibiótico = anti + biótico (contra seres vivos). Vírus não são considerados vivos!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Vírus: acelulares, parasitas obrigatórios, DNA OU RNA',
            'Bactérias: procariontes, antibióticos funcionam',
            'Fungos: eucariontes, quitina, decomposição/fermentação',
            'Protozoários: eucariontes unicelulares, muitos parasitas',
            'Vacinas: prevenção viral | Antibióticos: tratamento bacteriano',
            'Superbactérias: seleção por uso inadequado de antibióticos',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
