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

export default function Tema05EcologiaPage() {
  return (
    <LousaLayout temaAtual="tema05-ecologia" titulo="🌍 Ecologia" badge="Tema 05">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        5. Ecologia
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>ecologia</strong> estuda as relações entre os seres vivos e o ambiente.
            <strong style={{ color: '#87ceeb' }}> Cadeias alimentares, ciclos biogeoquímicos e impactos ambientais</strong> são muito cobrados!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Níveis de Organização">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center' }}>
                <span style={{ color: '#ffd700' }}>Indivíduo</span> →
                <span style={{ color: '#87ceeb' }}> População</span> →
                <span style={{ color: '#98fb98' }}> Comunidade</span> →
                <span style={{ color: '#ff6b6b' }}> Ecossistema</span> →
                <span style={{ color: '#ffd700' }}> Biosfera</span>
              </p>
            </div>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
              <li><strong style={{ color: '#87ceeb' }}>População:</strong> indivíduos da mesma espécie no mesmo local</li>
              <li><strong style={{ color: '#98fb98' }}>Comunidade:</strong> todas as populações de um local</li>
              <li><strong style={{ color: '#ff6b6b' }}>Ecossistema:</strong> comunidade + fatores abióticos</li>
            </ul>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Cadeia e Teia Alimentar">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#f5f5dc', textAlign: 'center' }}>
                <span style={{ color: '#98fb98' }}>Produtor</span> →
                <span style={{ color: '#87ceeb' }}> Consumidor 1°</span> →
                <span style={{ color: '#ffd700' }}> Consumidor 2°</span> →
                <span style={{ color: '#ff6b6b' }}> Consumidor 3°</span>
              </p>
            </div>
            <div>
              <p style={{ color: '#98fb98' }}><strong>Produtores:</strong> fotossintetizantes (plantas, algas)</p>
              <p style={{ color: '#87ceeb' }}><strong>Consumidores:</strong> herbívoros (1°), carnívoros (2°, 3°...)</p>
              <p style={{ color: '#ffd700' }}><strong>Decompositores:</strong> fungos e bactérias (reciclam matéria)</p>
            </div>
            <p style={{ color: '#ff6b6b' }}>
              ⚠️ A cada nível trófico, perde-se cerca de 90% da energia!
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Relações Ecológicas">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Harmônicas (+)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                <li>Mutualismo: ambos ganham, obrigatória (líquen)</li>
                <li>Protocooperação: ambos ganham, facultativa</li>
                <li>Comensalismo: um ganha, outro neutro</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Desarmônicas (-)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                <li>Predação: um mata e come o outro</li>
                <li>Parasitismo: um prejudica o outro</li>
                <li>Competição: disputa por recursos</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Ciclos Biogeoquímicos">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Ciclo do Carbono</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Fotossíntese (fixa CO₂) ↔ Respiração (libera CO₂)
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Combustíveis fósseis: carbono antigo</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Ciclo do Nitrogênio</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  N₂ atmosférico → bactérias fixadoras → NH₃/NO₃⁻
                </p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Plantas usam para fazer proteínas</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Problemas Ambientais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Efeito Estufa:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>CO₂, CH₄ retêm calor. Aquecimento global.</p>
              </div>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Chuva Ácida:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>SO₂, NOₓ + água = ácidos. pH baixo.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Eutrofização:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Excesso de nutrientes → algas → falta de O₂.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Magnificação Trófica:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Acúmulo de toxinas na cadeia alimentar.</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="O DDT, pesticida proibido, ainda é encontrado em altas concentrações em aves de rapina. Como isso é possível?"
          resolucao={[
            { texto: 'DDT se acumula nos tecidos (bioacumulação)' },
            { texto: 'Passa de presa para predador', destaque: true },
            { texto: 'Cada nível trófico concentra mais' },
            { texto: 'Aves de rapina: topo da cadeia = máxima concentração' },
          ]}
          gabarito="Magnificação trófica (bioacumulação)"
          dica="Substâncias não degradáveis se acumulam ao longo da cadeia alimentar!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Cadeia: produtor → consumidores → decompositores',
            'Energia: 10% passa para o próximo nível',
            'Mutualismo: + + obrigatório | Parasitismo: + -',
            'Ciclo C: fotossíntese (fixa) ↔ respiração (libera)',
            'Ciclo N: bactérias fixadoras = fundamentais',
            'Magnificação: toxinas se acumulam no topo',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
