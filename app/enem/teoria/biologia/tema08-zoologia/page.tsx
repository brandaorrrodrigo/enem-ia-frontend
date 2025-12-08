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

export default function Tema08ZoologiaPage() {
  return (
    <LousaLayout temaAtual="tema08-zoologia" titulo="🦋 Zoologia" badge="Tema 08">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        8. Zoologia
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>zoologia</strong> estuda os animais: classificação, anatomia e fisiologia.
            <strong style={{ color: '#87ceeb' }}> Invertebrados e vertebrados</strong> são temas frequentes no ENEM!
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Invertebrados">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Poríferos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Esponjas. Sem tecidos. Filtração.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Cnidários</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Água-viva, coral. Cnidócitos (urticantes).</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Platelmintos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Vermes achatados. Tênia, esquistossomo.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Nematelmintos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Vermes cilíndricos. Lombriga, ancilóstomo.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Anelídeos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Segmentados. Minhoca. Sistema fechado.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Moluscos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Corpo mole. Caracol, polvo, mexilhão.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Artrópodes</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Exoesqueleto, patas articuladas. Maior grupo!</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Equinodermos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Estrela-do-mar, ouriço. Sistema ambulacral.</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Artrópodes - O Maior Filo">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ color: '#ffd700' }}><strong>Insetos:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>3 pares de patas. 1 par de antenas. Traquéias.</p>
            </div>
            <div>
              <p style={{ color: '#98fb98' }}><strong>Aracnídeos:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>4 pares de patas. Sem antenas. Filotraquéias.</p>
            </div>
            <div>
              <p style={{ color: '#87ceeb' }}><strong>Crustáceos:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>5+ pares de patas. 2 pares de antenas. Brânquias.</p>
            </div>
            <div>
              <p style={{ color: '#ff6b6b' }}><strong>Miriápodes:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Muitas patas. Centopeias, piolhos-de-cobra.</p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Vertebrados">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Peixes</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Brânquias. Pecilotérmicos. Ovíparos.</p>
                <p style={{ color: '#98fb98', fontSize: '0.8rem' }}>Ósseos (maioria) ou Cartilaginosos (tubarão)</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Anfíbios</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Vida dupla (água/terra). Metamorfose.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Pele úmida. Dependem de água.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Répteis</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Escamas. Ovo com casca. Pele impermeável.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Primeiro grupo 100% terrestre.</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Aves</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Penas. Homeotérmicas. Ossos pneumáticos.</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Siringe (canto). Sem bexiga urinária.</p>
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Mamíferos</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>Pelos, glândulas mamárias, diafragma. Homeotérmicos.</p>
              <p style={{ color: '#98fb98', fontSize: '0.85rem' }}>Monotremados (ovíparos) | Marsupiais (bolsa) | Placentários</p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Verminoses - Doenças Importantes">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#ffd700' }}>Teníase:</strong> tênia (platelminto), carne crua</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#87ceeb' }}>Cisticercose:</strong> ovos de tênia no cérebro</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#98fb98' }}>Esquistossomose:</strong> caramujo, água contaminada</p>
              <p style={{ color: '#f5f5dc' }}><strong style={{ color: '#ff6b6b' }}>Ascaridíase:</strong> lombriga, falta de saneamento</p>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Estilo ENEM"
          enunciado="Os anfíbios foram os primeiros vertebrados terrestres, mas ainda dependem da água para reprodução. Por quê?"
          resolucao={[
            { texto: 'Ovos sem casca (não protegem da dessecação)' },
            { texto: 'Fecundação externa na maioria', destaque: true },
            { texto: 'Larvas (girinos) respiram por brânquias' },
            { texto: 'Metamorfose: girino aquático → adulto terrestre' },
          ]}
          gabarito="Ovos sem casca e fecundação externa exigem ambiente aquático"
          dica="A independência da água veio com os répteis (ovo com casca)!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo ENEM PRO"
          itens={[
            'Artrópodes: exoesqueleto + patas articuladas (maior filo)',
            'Insetos: 3 pares patas | Aracnídeos: 4 pares',
            'Peixes: brânquias | Anfíbios: metamorfose',
            'Répteis: ovo com casca | Aves: penas, homeotérmicos',
            'Mamíferos: pelos, glândulas mamárias, diafragma',
            'Verminoses: saneamento básico é a melhor prevenção',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
