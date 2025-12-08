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

export default function Tema10TemasFrequentesPage() {
  return (
    <LousaLayout temaAtual="tema10-temas-frequentes" titulo="Temas Frequentes" badge="Tema 10">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        10. Temas Frequentes do ENEM
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            Conhecer os <strong style={{ color: '#ffd700' }}>temas mais cobrados</strong> ajuda na preparacao.
            O ENEM prioriza <strong style={{ color: '#87ceeb' }}>questoes sociais brasileiras</strong>.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Historico de Temas (2009-2023)">
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#ffd700' }}>2023:</strong> Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#87ceeb' }}>2022:</strong> Desafios para a valorizacao de comunidades e povos tradicionais no Brasil</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#98fb98' }}>2021:</strong> Invisibilidade e registro civil: garantia de acesso a cidadania no Brasil</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#dda0dd' }}>2020:</strong> O estigma associado as doencas mentais na sociedade brasileira</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#ffa500' }}>2019:</strong> Democratizacao do acesso ao cinema no Brasil</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#ff6b6b' }}>2018:</strong> Manipulacao do comportamento do usuario pelo controle de dados na internet</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#ffd700' }}>2017:</strong> Desafios para a formacao educacional de surdos no Brasil</p>
            <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}><strong style={{ color: '#87ceeb' }}>2016:</strong> Caminhos para combater a intolerancia religiosa no Brasil</p>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Eixos Tematicos Recorrentes">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Direitos e Cidadania</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
                  <li>Grupos vulneraveis</li>
                  <li>Inclusao social</li>
                  <li>Direitos humanos</li>
                  <li>Democracia</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Saude Publica</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
                  <li>Saude mental</li>
                  <li>Vacinacao</li>
                  <li>SUS e acesso</li>
                  <li>Epidemias</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Educacao</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
                  <li>Desigualdade educacional</li>
                  <li>Tecnologia no ensino</li>
                  <li>Educacao inclusiva</li>
                  <li>Evasao escolar</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Tecnologia</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
                  <li>Privacidade digital</li>
                  <li>Fake news</li>
                  <li>Redes sociais</li>
                  <li>Inteligencia artificial</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#dda0dd' }}><strong>Meio Ambiente</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
                  <li>Desmatamento</li>
                  <li>Recursos hidricos</li>
                  <li>Sustentabilidade</li>
                  <li>Mudancas climaticas</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500' }}><strong>Cultura e Sociedade</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.8rem' }}>
                  <li>Intolerancia</li>
                  <li>Patrimonio cultural</li>
                  <li>Acesso a cultura</li>
                  <li>Tradicoes populares</li>
                </ul>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Possiveis Temas para 2024/2025">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,215,0,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,215,0,0.3)' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>ALTA PROBABILIDADE:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Impactos da IA no mercado de trabalho</li>
                <li>Saude mental de jovens e redes sociais</li>
                <li>Etarismo (preconceito contra idosos)</li>
                <li>Seguranca alimentar e fome no Brasil</li>
                <li>Violencia nas escolas</li>
                <li>Mobilidade urbana sustentavel</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>MEDIA PROBABILIDADE:</strong></p>
              <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                <li>Economia criativa e trabalho informal</li>
                <li>Direitos das pessoas com deficiencia</li>
                <li>Moradia e deficit habitacional</li>
                <li>Acesso a justica e sistema carcerario</li>
                <li>Patrimonio cultural e memoria historica</li>
              </ul>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Repertorios por Tema">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ffd700' }}><strong>Tecnologia e Redes Sociais:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Bauman (modernidade liquida), "1984" (Orwell), "Black Mirror", LGPD, Shoshana Zuboff (capitalismo de vigilancia)
                </p>
              </div>
              <div>
                <p style={{ color: '#87ceeb' }}><strong>Saude Mental:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  OMS, Freud, Janeiro Branco, CVV, "As Vantagens de Ser Invisivel", setembro amarelo
                </p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>Educacao:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Paulo Freire, Kant, PISA, IDEB, "Sociedade dos Poetas Mortos", Art. 205 CF
                </p>
              </div>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>Meio Ambiente:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                  Acordos de Paris, Greta Thunberg, IBAMA, Art. 225 CF, Marina Silva, Chico Mendes
                </p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Dicas para Qualquer Tema">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Antes da prova:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                  <li>Tenha repertorios coringas memorizados</li>
                  <li>Pratique escrever sobre diversos temas</li>
                  <li>Acompanhe noticias e atualidades</li>
                  <li>Tenha modelos de introducao decorados</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Durante a prova:</strong></p>
                <ul style={{ color: '#f5f5dc', paddingLeft: '1rem', margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                  <li>Leia a proposta VARIAS vezes</li>
                  <li>Destaque as palavras-chave</li>
                  <li>Faca um rascunho antes</li>
                  <li>Adapte seus repertorios ao tema</li>
                </ul>
              </div>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Reflexao"
          enunciado="Por que o ENEM sempre cobra temas relacionados a problemas sociais brasileiros?"
          resolucao={[
            { texto: 'A prova avalia capacidade de analise critica da realidade' },
            { texto: 'Cidadania e reflexao social sao valores da educacao brasileira', destaque: true },
            { texto: 'A proposta de intervencao exige solucoes para problemas reais' },
            { texto: 'A redacao busca formar cidadaos conscientes' },
          ]}
          gabarito="O ENEM forma cidadaos criticos e engajados com a realidade"
          dica="Voce esta sendo avaliado como CIDADAO, nao apenas como estudante!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Temas Frequentes"
          itens={[
            'ENEM prioriza questoes sociais brasileiras',
            'Eixos: direitos, saude, educacao, tecnologia, meio ambiente',
            'Temas em alta: IA, saude mental, etarismo, fome',
            'Tenha repertorios coringas para varios temas',
            'Acompanhe noticias e atualidades',
            'Adapte seus conhecimentos ao tema da prova!',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
