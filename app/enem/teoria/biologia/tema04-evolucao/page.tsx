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

export default function Tema04EvolucaoPage() {
  return (
    <LousaLayout temaAtual="tema04-evolucao" titulo="🦎 Evolução" badge="Tema 04">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        4. Evolução
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>evolução</strong> explica como as espécies mudam ao longo do tempo.
            <strong style={{ color: '#87ceeb' }}> Darwin, seleção natural e evidências evolutivas</strong> são temas centrais no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Lamarck × Darwin">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Lamarck (ultrapassado)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Lei do uso e desuso</li>
                <li>Herança de caracteres adquiridos</li>
                <li>Ex: girafas esticaram o pescoço</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Darwin (aceito)</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Seleção natural</li>
                <li>Variação + sobrevivência diferencial</li>
                <li>Ex: girafas com pescoço longo sobreviveram</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Seleção Natural">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Indivíduos mais <strong style={{ color: '#ffd700' }}>adaptados</strong> ao ambiente têm maior chance de sobreviver e deixar descendentes.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Pilares da Seleção Natural:</strong></p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0' }}>
                <li>Variação genética na população</li>
                <li>Produção de mais descendentes que o ambiente suporta</li>
                <li>Luta pela sobrevivência</li>
                <li>Sobrevivência dos mais aptos</li>
                <li>Transmissão de características vantajosas</li>
              </ol>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Evidências da Evolução">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Fósseis:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Registros de seres do passado. Formas intermediárias.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Anatomia Comparada:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Órgãos homólogos e análogos.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Embriologia:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Embriões semelhantes = ancestral comum.</p>
              </div>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Bioquímica:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>DNA similar indica parentesco.</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Homologia × Analogia">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Órgãos Homólogos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Mesma origem embrionária</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Funções podem ser diferentes</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: braço humano, asa de morcego, nadadeira de baleia</p>
                <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>= Ancestral comum (DIVERGÊNCIA)</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Órgãos Análogos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Origens diferentes</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Mesma função</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: asa de inseto e asa de ave</p>
                <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>= Adaptação similar (CONVERGÊNCIA)</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Especiação">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Formação de novas espécies por <strong style={{ color: '#ffd700' }}>isolamento reprodutivo</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Alopátrica</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Isolamento geográfico (barreira física)</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Simpátrica</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Sem isolamento geográfico (comportamental/temporal)</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Bactérias resistentes a antibióticos são um problema crescente. Como a teoria de Darwin explica esse fenômeno?"
          resolucao={[
            { texto: 'Há variação genética natural nas bactérias' },
            { texto: 'Algumas já são naturalmente resistentes', destaque: true },
            { texto: 'Antibiótico seleciona as resistentes (sobrevivem)' },
            { texto: 'Resistentes se reproduzem mais = população resistente' },
          ]}
          gabarito="Seleção natural: o antibiótico seleciona bactérias já resistentes"
          dica="A resistência não surge pelo uso do antibiótico - ela já existia! O antibiótico apenas seleciona."
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Lamarck: uso/desuso + herança adquirida (ultrapassado)',
            'Darwin: seleção natural + variação',
            'Seleção natural: mais aptos sobrevivem e reproduzem',
            'Homólogos: mesma origem, funções diferentes (divergência)',
            'Análogos: origens diferentes, mesma função (convergência)',
            'Especiação: isolamento → nova espécie',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
