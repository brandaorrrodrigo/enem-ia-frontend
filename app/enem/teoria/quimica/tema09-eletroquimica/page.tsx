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

export default function Tema09EletroquimicaPage() {
  return (
    <LousaLayout temaAtual="tema09-eletroquimica" titulo="⚡ Eletroquímica" badge="Tema 09">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        9. Eletroquímica
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>Eletroquímica</strong> estuda a relação entre reações químicas e corrente elétrica.
            <strong style={{ color: '#87ceeb' }}> Pilhas e eletrólise</strong> são temas frequentes no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Pilhas (Células Galvânicas)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Reação química <strong style={{ color: '#ffd700' }}>espontânea</strong> produz corrente elétrica.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Ânodo (-)</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  <li>Polo negativo</li>
                  <li>Ocorre OXIDAÇÃO</li>
                  <li>Perde elétrons</li>
                  <li>Metal mais reativo</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Cátodo (+)</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  <li>Polo positivo</li>
                  <li>Ocorre REDUÇÃO</li>
                  <li>Ganha elétrons</li>
                  <li>Metal menos reativo</li>
                </ul>
              </div>
            </div>
            <p style={{ color: '#87ceeb' }}>
              💡 Macete: "<strong>Ânodo</strong> = <strong>A</strong>limentador (perde e⁻) | Na pilha, polo (-) é o ânodo"
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Potencial da Pilha (ΔE°)">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', textAlign: 'center', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                ΔE° = E°_cátodo - E°_ânodo
              </p>
              <p style={{ color: '#87ceeb', textAlign: 'center', marginTop: '0.5rem' }}>
                ou ΔE° = E°_redução - E°_oxidação
              </p>
            </div>
            <div>
              <p style={{ color: '#98fb98' }}><strong>Fila de Reatividade (simplificada):</strong></p>
              <p style={{ color: '#f5f5dc', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                Li {'>'} K {'>'} Ca {'>'} Na {'>'} Mg {'>'} Al {'>'} Zn {'>'} Fe {'>'} Ni {'>'} Sn {'>'} H {'>'} Cu {'>'} Ag {'>'} Au
              </p>
              <p style={{ color: '#87ceeb', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Mais reativo = menor potencial de redução = melhor oxidante
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Pilha Zn-Cu">
          <p style={{ marginBottom: '1rem' }}>
            Dados: E°(Zn²⁺/Zn) = -0,76V | E°(Cu²⁺/Cu) = +0,34V
          </p>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Resolução:</strong></p>
            <p style={{ marginBottom: '0.5rem' }}>Zn é mais reativo → sofre oxidação (ânodo)</p>
            <p style={{ marginBottom: '0.5rem' }}>Cu é menos reativo → sofre redução (cátodo)</p>
            <p style={{ marginBottom: '0.5rem' }}>ΔE° = E°_cátodo - E°_ânodo</p>
            <p style={{ marginBottom: '0.5rem' }}>ΔE° = +0,34 - (-0,76) = <strong style={{ color: '#ffd700' }}>+1,10 V</strong></p>
            <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>ΔE° {'>'} 0 → reação espontânea!</p>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Eletrólise">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Corrente elétrica força reação <strong style={{ color: '#ffd700' }}>NÃO espontânea</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Ânodo (+)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Oxidação</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ligado ao polo + da fonte</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Cátodo (-)</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Redução</p>
                <p style={{ color: '#87ceeb', fontSize: '0.85rem' }}>Ligado ao polo - da fonte</p>
              </div>
            </div>
            <p style={{ color: '#98fb98' }}>
              ⚠️ Na eletrólise os polos se INVERTEM em relação à pilha!
            </p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Leis de Faraday">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', fontFamily: 'monospace' }}>Q = i × t</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>Q = carga (C), i = corrente (A), t = tempo (s)</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', fontFamily: 'monospace' }}>n = Q / (n_e × F)</p>
              <p style={{ color: '#87ceeb', fontSize: '0.9rem' }}>n_e = elétrons transferidos, F = 96500 C/mol</p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Em uma pilha, o eletrodo de zinco vai se desgastando enquanto o de cobre aumenta de massa. Explique esse fenômeno."
          resolucao={[
            { texto: 'Zn é mais reativo que Cu' },
            { texto: 'Zn sofre oxidação: Zn → Zn²⁺ + 2e⁻ (dissolve)', destaque: true },
            { texto: 'Cu²⁺ sofre redução: Cu²⁺ + 2e⁻ → Cu (deposita)' },
            { texto: 'Zn vai para solução, Cu deposita no eletrodo' },
          ]}
          gabarito="Zn oxida e dissolve; Cu²⁺ reduz e deposita"
          dica="O metal mais reativo é o ânodo e sofre oxidação, perdendo massa!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Pilha: reação espontânea → eletricidade',
            'Pilha: Ânodo (-) oxida | Cátodo (+) reduz',
            'ΔE° = E°_cátodo - E°_ânodo (> 0 = espontânea)',
            'Eletrólise: eletricidade → reação forçada',
            'Eletrólise: Ânodo (+) oxida | Cátodo (-) reduz',
            'Faraday: Q = i × t, F = 96500 C/mol',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
