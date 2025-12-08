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

export default function Tema03GeneticaPage() {
  return (
    <LousaLayout temaAtual="tema03-genetica" titulo="🧬 Genética" badge="Tema 03">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        3. Genética
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>genética</strong> estuda a hereditariedade e variação dos seres vivos.
            <strong style={{ color: '#87ceeb' }}> Leis de Mendel e herança genética</strong> são muito cobrados no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Conceitos Fundamentais">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Gene:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Trecho de DNA que codifica uma característica.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Alelos:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Formas alternativas de um gene (A ou a).</p>
              </div>
              <div>
                <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Genótipo:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Constituição genética (AA, Aa, aa).</p>
              </div>
              <div>
                <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Fenótipo:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Característica observável.</p>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Homozigoto:</strong> AA ou aa (alelos iguais)</p>
              <p style={{ color: '#98fb98' }}><strong>Heterozigoto:</strong> Aa (alelos diferentes)</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="1ª Lei de Mendel - Segregação">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              "Cada característica é determinada por um par de fatores (alelos) que se separam na formação dos gametas."
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center' }}><strong>Cruzamento Aa × Aa</strong></p>
              <p style={{ color: '#f5f5dc', textAlign: 'center', fontFamily: 'monospace', marginTop: '0.5rem' }}>
                AA (25%) : Aa (50%) : aa (25%)
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', fontSize: '0.9rem' }}>
                Proporção fenotípica 3:1 (se A é dominante)
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="2ª Lei de Mendel - Segregação Independente">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              "Os genes de características diferentes se distribuem independentemente nos gametas."
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Diíbrido: AaBb × AaBb</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Gametas possíveis: AB, Ab, aB, ab</p>
              <p style={{ color: '#98fb98', marginTop: '0.5rem' }}>Proporção fenotípica: 9:3:3:1</p>
            </div>
            <p style={{ color: '#87ceeb' }}>
              💡 Só vale para genes em cromossomos diferentes ou distantes no mesmo cromossomo!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Heredograma">
          <p style={{ marginBottom: '1rem' }}>
            Símbolos importantes em heredogramas:
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
              <li>⬜ Homem normal | ⬛ Homem afetado</li>
              <li>⭕ Mulher normal | ⚫ Mulher afetada</li>
              <li>Linha horizontal: casamento</li>
              <li>Linha vertical: descendência</li>
            </ul>
            <p style={{ color: '#98fb98', marginTop: '1rem' }}>
              <strong>Dica:</strong> Se pais normais têm filho afetado, a característica é recessiva!
            </p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Herança Ligada ao Sexo">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Genes localizados nos cromossomos sexuais (X ou Y).
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Exemplos ligados ao X:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0' }}>
                <li>Daltonismo (Xᵈ)</li>
                <li>Hemofilia (Xʰ)</li>
              </ul>
              <p style={{ color: '#87ceeb', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Homens (XY) expressam qualquer alelo no X. Mulheres precisam de dois alelos recessivos.
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Um casal, ambos com visão normal para cores, tem um filho daltônico. Quais são os genótipos dos pais? (Daltonismo: gene recessivo ligado ao X)"
          resolucao={[
            { texto: 'Filho daltônico: XᵈY (recebeu Xᵈ da mãe)' },
            { texto: 'Mãe com visão normal, mas carrega Xᵈ', destaque: true },
            { texto: 'Mãe: XᴰXᵈ (portadora)' },
            { texto: 'Pai normal: XᴰY (não transmitiu X ao filho)' },
          ]}
          gabarito="Mãe: XᴰXᵈ | Pai: XᴰY"
          dica="Em herança ligada ao X, o filho homem herda o X da mãe e Y do pai!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Genótipo: genes | Fenótipo: característica visível',
            '1ª Lei: alelos se separam nos gametas',
            '2ª Lei: genes diferentes segregam independentemente',
            'Monoíbrido (Aa × Aa): 3:1 | Diíbrido: 9:3:3:1',
            'Herança ligada ao X: mais comum em homens',
            'Pais normais + filho afetado = característica recessiva',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
