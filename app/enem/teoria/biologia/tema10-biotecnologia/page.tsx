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

export default function Tema10BiotecnologiaPage() {
  return (
    <LousaLayout temaAtual="tema10-biotecnologia" titulo="🧪 Biotecnologia" badge="Tema 10">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        10. Biotecnologia
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>biotecnologia</strong> usa seres vivos para desenvolver produtos e processos.
            <strong style={{ color: '#87ceeb' }}> DNA recombinante, transgênicos e clonagem</strong> são temas atuais no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Engenharia Genética">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>DNA Recombinante:</strong></p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                <li>Cortar DNA com enzimas de restrição</li>
                <li>Inserir gene de interesse em plasmídeo (vetor)</li>
                <li>Introduzir em bactéria (hospedeiro)</li>
                <li>Bactéria produz a proteína desejada</li>
              </ol>
            </div>
            <div>
              <p style={{ color: '#98fb98' }}><strong>Aplicações:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0' }}>
                <li>Insulina humana produzida por bactérias</li>
                <li>Hormônio do crescimento</li>
                <li>Vacinas recombinantes (ex: hepatite B)</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Organismos Transgênicos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Organismos que receberam genes de <strong style={{ color: '#ffd700' }}>outra espécie</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Vantagens:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                  <li>Maior produtividade</li>
                  <li>Resistência a pragas</li>
                  <li>Tolerância a herbicidas</li>
                  <li>Enriquecimento nutricional</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Preocupações:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                  <li>Efeitos na saúde (longo prazo)</li>
                  <li>Impacto ambiental</li>
                  <li>Contaminação genética</li>
                  <li>Patentes e monopólios</li>
                </ul>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Clonagem">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Clonagem Reprodutiva</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Cria indivíduo geneticamente idêntico.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ex: Ovelha Dolly (1996)</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Clonagem Terapêutica</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Produz células-tronco para tratamentos.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Não gera indivíduo completo.</p>
              </div>
            </div>
            <p style={{ color: '#ff6b6b' }}>
              ⚠️ Clonagem reprodutiva em humanos é proibida por questões éticas!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Técnicas Importantes">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>PCR (Reação em Cadeia da Polimerase):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Amplifica (copia) DNA. Usado em testes diagnósticos, perícia criminal.</p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Eletroforese:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Separa fragmentos de DNA por tamanho. Teste de paternidade.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>CRISPR-Cas9:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Edição gênica precisa. "Tesoura molecular". Revolucionário!</p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Células-Tronco">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Células <strong style={{ color: '#ffd700' }}>indiferenciadas</strong> que podem se transformar em vários tipos celulares.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Embrionárias:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Totipotentes/Pluripotentes. Questões éticas.</p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Adultas:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Multipotentes. Cordão umbilical, medula óssea.</p>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Por que a insulina humana produzida por bactérias transgênicas é preferível à insulina de porcos, usada anteriormente?"
          resolucao={[
            { texto: 'Insulina suína é similar, mas não idêntica à humana' },
            { texto: 'Pode causar reações alérgicas em alguns pacientes', destaque: true },
            { texto: 'Bactérias com gene humano produzem insulina HUMANA' },
            { texto: 'Produção em larga escala, mais acessível' },
          ]}
          gabarito="Insulina idêntica à humana, sem reações alérgicas"
          dica="DNA recombinante permite produzir proteínas humanas em bactérias!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'DNA recombinante: cortar + inserir + clonar',
            'Transgênicos: genes de outra espécie',
            'PCR: amplifica DNA | Eletroforese: separa DNA',
            'CRISPR: edição gênica precisa (tesoura molecular)',
            'Células-tronco: indiferenciadas, podem virar outros tipos',
            'Questões éticas: clonagem humana, embriões, patentes',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
