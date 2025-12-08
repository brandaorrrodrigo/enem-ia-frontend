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

export default function Tema03LigacoesPage() {
  return (
    <LousaLayout temaAtual="tema03-ligacoes" titulo="🔗 Ligações Químicas" badge="Tema 03">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        3. Ligações Químicas
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            As <strong style={{ color: '#ffd700' }}>ligações químicas</strong> unem átomos para formar moléculas e compostos.
            No ENEM, é essencial saber diferenciar <strong style={{ color: '#87ceeb' }}>ligação iônica, covalente e metálica</strong>.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Tipos de Ligações">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Ligação Iônica:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Metal + Ametal. Transferência de elétrons. Forma íons (cátions e ânions).</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: NaCl, CaO, MgCl₂</p>
            </div>
            <div>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Ligação Covalente:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Ametal + Ametal (ou H). Compartilhamento de elétrons.</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: H₂O, CO₂, NH₃, CH₄</p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Ligação Metálica:</strong></p>
              <p style={{ color: '#f5f5dc' }}>Metal + Metal. "Mar de elétrons" livres entre cátions.</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: Fe, Cu, Au, ligas metálicas</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Propriedades dos Compostos">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Iônicos</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Sólidos cristalinos</li>
                <li>Alto ponto de fusão</li>
                <li>Conduzem fundidos ou em solução</li>
                <li>Solúveis em água (maioria)</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Covalentes</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Podem ser sólidos, líquidos ou gases</li>
                <li>Baixo ponto de fusão (maioria)</li>
                <li>Não conduzem (isolantes)</li>
                <li>Solubilidade variável</li>
              </ul>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Identificando Ligações">
          <p style={{ marginBottom: '1rem' }}>
            Classifique as ligações em: <strong style={{ color: '#ffd700' }}>NaCl, H₂O, Fe</strong>
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>NaCl: Na (metal) + Cl (ametal) = <strong style={{ color: '#ffd700' }}>Iônica</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>H₂O: H + O (ametais) = <strong style={{ color: '#ffd700' }}>Covalente</strong></p>
            <p>Fe: Metal puro = <strong style={{ color: '#ffd700' }}>Metálica</strong></p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Forças Intermoleculares">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>Forças entre moléculas (não confundir com ligações!):</p>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Ligação de Hidrogênio:</strong> A mais forte. H ligado a F, O ou N.</p>
            </div>
            <div>
              <p style={{ color: '#98fb98' }}><strong>Dipolo-Dipolo:</strong> Entre moléculas polares.</p>
            </div>
            <div>
              <p style={{ color: '#87ceeb' }}><strong>Van der Waals (dispersão):</strong> A mais fraca. Todas as moléculas.</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="A água (H₂O) tem ponto de ebulição muito maior que o H₂S, apesar de ter menor massa molecular. Isso ocorre devido a:"
          resolucao={[
            { texto: 'H₂O faz ligações de hidrogênio (H ligado a O)' },
            { texto: 'H₂S não faz ligação de hidrogênio (S não é F, O ou N)', destaque: true },
            { texto: 'Ligações de H são mais fortes que dipolo-dipolo' },
          ]}
          gabarito="Ligações de hidrogênio na água"
          dica="Ligação de hidrogênio: H ligado a F, O ou N. Aumenta muito o ponto de ebulição!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Iônica: metal + ametal → transferência de elétrons',
            'Covalente: ametal + ametal → compartilhamento',
            'Metálica: metal + metal → mar de elétrons',
            'Compostos iônicos: alto PF, conduzem fundidos',
            'Ligação de H: H com F, O ou N (mais forte intermolecular)',
            'Polaridade: moléculas assimétricas tendem a ser polares',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
