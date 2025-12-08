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

export default function Tema10QuimicaOrganicaPage() {
  return (
    <LousaLayout temaAtual="tema10-quimica-organica" titulo="🧬 Química Orgânica" badge="Tema 10">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        10. Química Orgânica
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>Química Orgânica</strong> estuda os compostos de carbono.
            No ENEM, identificar <strong style={{ color: '#87ceeb' }}>funções orgânicas e nomenclatura</strong> é fundamental!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Características do Carbono">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
              <li><strong style={{ color: '#ffd700' }}>Tetravalente:</strong> faz 4 ligações</li>
              <li><strong style={{ color: '#87ceeb' }}>Forma cadeias:</strong> abertas, fechadas, ramificadas</li>
              <li><strong style={{ color: '#98fb98' }}>Ligações:</strong> simples, duplas ou triplas</li>
            </ul>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Classificação do Carbono:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Primário (1°): ligado a 1 carbono</li>
                <li>Secundário (2°): ligado a 2 carbonos</li>
                <li>Terciário (3°): ligado a 3 carbonos</li>
                <li>Quaternário (4°): ligado a 4 carbonos</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Principais Funções Orgânicas">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Hidrocarbonetos</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                <li>Alcano: C-C (simples)</li>
                <li>Alceno: C=C (dupla)</li>
                <li>Alcino: C≡C (tripla)</li>
                <li>Aromático: anel benzênico</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Oxigenadas</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                <li>Álcool: -OH</li>
                <li>Aldeído: -CHO</li>
                <li>Cetona: C=O (meio)</li>
                <li>Ác. Carboxílico: -COOH</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Nitrogenadas</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                <li>Amina: -NH₂, -NHR, -NR₂</li>
                <li>Amida: -CONH₂</li>
                <li>Nitrila: -C≡N</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Outras</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                <li>Éter: R-O-R'</li>
                <li>Éster: -COO-</li>
                <li>Haleto: -X (F, Cl, Br, I)</li>
              </ul>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Nomenclatura IUPAC">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center' }}>
                <strong>PREFIXO + INFIXO + SUFIXO</strong>
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', fontSize: '0.9rem' }}>
                (nº carbonos) + (tipo ligação) + (função)
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Prefixos:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  1C: met- | 2C: et- | 3C: prop-<br/>
                  4C: but- | 5C: pent- | 6C: hex-
                </p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Infixos:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Simples: -an-<br/>
                  Dupla: -en-<br/>
                  Tripla: -in-
                </p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Identificando Funções">
          <p style={{ marginBottom: '1rem' }}>
            Identifique a função: <strong style={{ color: '#ffd700' }}>CH₃-CH₂-OH</strong>
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>Grupo funcional: -OH ligado a carbono saturado</p>
            <p style={{ marginBottom: '0.5rem' }}>Função: <strong style={{ color: '#ffd700' }}>ÁLCOOL</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>2 carbonos (et-) + ligação simples (-an-) + álcool (-ol)</p>
            <p style={{ color: '#87ceeb' }}>Nome: <strong>Etanol</strong></p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Isomeria">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Isomeria Plana:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Cadeia: diferente arranjo de carbonos</li>
                <li>Posição: diferente posição do grupo funcional</li>
                <li>Função: mesma fórmula, funções diferentes</li>
              </ul>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Isomeria Espacial:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: 0 }}>
                <li>Geométrica (cis-trans): em duplas com grupos diferentes</li>
                <li>Óptica: carbono quiral (4 grupos diferentes)</li>
              </ul>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="A aspirina (ácido acetilsalicílico) apresenta grupos funcionais éster e ácido carboxílico em sua estrutura. Quais são as características desses grupos?"
          resolucao={[
            { texto: 'Ácido carboxílico: grupo -COOH' },
            { texto: 'Éster: grupo -COO- (carbonila ligada a oxigênio)', destaque: true },
            { texto: 'Ácido carboxílico: caráter ácido, libera H⁺' },
            { texto: 'Éster: produto de ácido + álcool, aroma característico' },
          ]}
          gabarito="Éster (-COO-) e Ác. Carboxílico (-COOH)"
          dica="O grupo -COOH é ácido carboxílico. Quando o H é substituído por R, vira éster!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Carbono: tetravalente, forma 4 ligações',
            'Álcool: -OH | Aldeído: -CHO | Cetona: C=O',
            'Ácido carboxílico: -COOH | Éster: -COO-',
            'Amina: -NH₂ | Amida: -CONH₂',
            'Nomenclatura: prefixo + infixo + sufixo',
            'Isomeria: mesma fórmula, estrutura diferente',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
