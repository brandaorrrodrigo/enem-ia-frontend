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

export default function Tema05ReacoesPage() {
  return (
    <LousaLayout temaAtual="tema05-reacoes" titulo="💥 Reações Químicas" badge="Tema 05">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        5. Reações Químicas
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            <strong style={{ color: '#ffd700' }}>Reações químicas</strong> são transformações onde substâncias se convertem em outras.
            No ENEM, é essencial saber <strong style={{ color: '#87ceeb' }}>identificar tipos de reações e balancear equações</strong>.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Tipos de Reações">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Síntese (Adição):</strong></p>
              <p style={{ color: '#f5f5dc' }}>A + B → AB</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: 2H₂ + O₂ → 2H₂O</p>
            </div>
            <div>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Decomposição (Análise):</strong></p>
              <p style={{ color: '#f5f5dc' }}>AB → A + B</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: 2H₂O → 2H₂ + O₂ (eletrólise)</p>
            </div>
            <div>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Simples Troca:</strong></p>
              <p style={{ color: '#f5f5dc' }}>A + BC → AC + B</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: Zn + 2HCl → ZnCl₂ + H₂</p>
            </div>
            <div>
              <p style={{ color: '#ff6b6b', marginBottom: '0.5rem' }}><strong>Dupla Troca:</strong></p>
              <p style={{ color: '#f5f5dc' }}>AB + CD → AD + CB</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Ex: NaCl + AgNO₃ → NaNO₃ + AgCl↓</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Balanceamento de Equações">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              <strong style={{ color: '#ffd700' }}>Lei de Lavoisier:</strong> A massa dos reagentes = massa dos produtos.
              "Na natureza nada se cria, nada se perde, tudo se transforma."
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Método por tentativa:</strong></p>
              <ol style={{ color: '#f5f5dc', paddingLeft: '1.5rem', margin: '0.5rem 0 0 0' }}>
                <li>Comece pelo elemento que aparece menos vezes</li>
                <li>Balance metais primeiro, depois ametais</li>
                <li>Deixe H e O por último</li>
                <li>Verifique todos os elementos</li>
              </ol>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Balanceando Equação">
          <p style={{ marginBottom: '1rem' }}>
            Balance: <strong style={{ color: '#ffd700' }}>Fe + O₂ → Fe₂O₃</strong>
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>Fe: 1 reagente, 2 produto → colocar 2Fe</p>
            <p style={{ marginBottom: '0.5rem' }}>O: 2 reagente, 3 produto → MMC(2,3) = 6</p>
            <p style={{ marginBottom: '0.5rem' }}>Preciso de 6 oxigênios: 3O₂ e 2Fe₂O₃</p>
            <p style={{ color: '#ffd700', fontFamily: 'monospace' }}>4Fe + 3O₂ → 2Fe₂O₃</p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Oxidação e Redução (Redox)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Oxidação</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Perde elétrons</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>NOX aumenta</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Agente redutor</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Redução</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Ganha elétrons</p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>NOX diminui</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Agente oxidante</p>
              </div>
            </div>
            <p style={{ color: '#87ceeb' }}>💡 Macete: "PERCA = Oxidação" (Perde Elétrons, Redutor, Cede, Aumenta NOX)</p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Na reação 2Mg + O₂ → 2MgO, o magnésio sofre oxidação ou redução? Justifique."
          resolucao={[
            { texto: 'Mg (reagente): NOX = 0 (substância simples)' },
            { texto: 'Mg no MgO: NOX = +2', destaque: true },
            { texto: 'NOX aumentou de 0 para +2' },
            { texto: 'Aumento de NOX = perdeu elétrons = OXIDAÇÃO' },
          ]}
          gabarito="Oxidação (NOX aumentou de 0 para +2)"
          dica="Oxidação: perde elétrons, NOX aumenta | Redução: ganha elétrons, NOX diminui"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Síntese: A + B → AB | Decomposição: AB → A + B',
            'Simples troca: A + BC → AC + B',
            'Dupla troca: AB + CD → AD + CB',
            'Lavoisier: massa reagentes = massa produtos',
            'Oxidação: perde e⁻, NOX ↑ | Redução: ganha e⁻, NOX ↓',
            'NOX: substância simples = 0, H = +1 (geralmente), O = -2',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
