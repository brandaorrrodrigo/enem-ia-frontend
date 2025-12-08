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

export default function Tema03IntroducaoPage() {
  return (
    <LousaLayout temaAtual="tema03-introducao" titulo="Modelos de Introducao" badge="Tema 03">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        3. Modelos de Introducao
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            A <strong style={{ color: '#ffd700' }}>introducao</strong> e sua primeira impressao no corretor.
            Deve conter <strong style={{ color: '#87ceeb' }}>contextualizacao + tese</strong> em 5-7 linhas.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Modelo 1: Alusao Historica">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Estrutura:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                [Fato historico] + [Conexao com o presente] + [Tese]
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo (tema: Saude Mental):</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "Durante a Revolucao Industrial, trabalhadores enfrentavam jornadas exaustivas que
                comprometiam sua saude fisica e mental. Atualmente, mesmo com avancos trabalhistas,
                a sociedade brasileira ainda enfrenta desafios semelhantes, evidenciados pelo aumento
                de casos de ansiedade e depressao. Nesse sentido, e necessario discutir os impactos
                do trabalho excessivo na saude mental dos brasileiros."
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Modelo 2: Citacao de Autoridade">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Estrutura:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                [Citacao] + [Quem disse] + [Aplicacao ao tema] + [Tese]
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo (tema: Educacao):</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "Segundo o filosofo Immanuel Kant, 'o ser humano e aquilo que a educacao faz dele'.
                Contudo, no Brasil contemporaneo, a realidade educacional apresenta desafios que
                impedem a plena formacao dos cidadaos, como a desigualdade de acesso e a
                precariedade das estruturas escolares."
              </p>
            </div>
            <p style={{ color: '#ffd700', fontSize: '0.9rem' }}>
              Autores uteis: Kant, Rousseau, Paulo Freire, Zygmunt Bauman, Hannah Arendt
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Modelo 3: Comparacao ou Contraste">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Estrutura:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                [Situacao ideal/outro pais] + [Realidade brasileira] + [Tese]
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo (tema: Mobilidade Urbana):</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "Na Holanda, o incentivo ao uso de bicicletas transformou as cidades em modelos de
                mobilidade sustentavel. No Brasil, entretanto, a falta de infraestrutura cicloviaria
                e o predominio dos automoveis agravam problemas como poluicao e congestionamentos.
                Assim, faz-se necessario repensar o modelo de transporte urbano brasileiro."
              </p>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Modelo 4: Conceituacao">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: '#87ceeb', marginBottom: '0.5rem' }}><strong>Estrutura:</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                  [Definicao do conceito-chave] + [Problematizacao] + [Tese]
                </p>
              </div>
              <div>
                <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo (tema: Fake News):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  "Fake news, termo em ingles que significa 'noticias falsas', refere-se a informacoes
                  inveridicas disseminadas como verdadeiras. No contexto brasileiro, esse fenomeno
                  se intensificou com o avanco das redes sociais, gerando consequencias graves
                  para a democracia e a saude publica."
                </p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Modelo 5: Dados Estatisticos">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700', marginBottom: '0.5rem' }}><strong>Estrutura:</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem' }}>
                [Dado impactante + fonte] + [Analise] + [Tese]
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98', marginBottom: '0.5rem' }}><strong>Exemplo (tema: Violencia):</strong></p>
              <p style={{ color: '#f5f5dc', fontSize: '0.9rem', fontStyle: 'italic' }}>
                "Segundo dados do Atlas da Violencia, o Brasil registrou mais de 45 mil homicidios
                em 2022, colocando o pais entre os mais violentos do mundo. Esses numeros alarmantes
                revelam a urgencia de politicas publicas eficazes para garantir a seguranca da
                populacao brasileira."
              </p>
            </div>
            <p style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>
              Cuidado: Nao invente dados! Use fontes confiaveis (IBGE, OMS, IPEA, ONU)
            </p>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Pratica"
          enunciado="Qual modelo de introducao e mais versatil para qualquer tema?"
          resolucao={[
            { texto: 'Alusao historica funciona para muitos temas' },
            { texto: 'Citacao de autoridade e sempre bem-vista', destaque: true },
            { texto: 'Comparacao exige conhecimento de outros paises' },
            { texto: 'Dados estatisticos precisam ser memorizados' },
          ]}
          gabarito="Citacao e alusao historica sao os mais versateis"
          dica="Tenha 2-3 modelos decorados para usar conforme o tema!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Introducoes"
          itens={[
            'Alusao Historica: fato passado + presente + tese',
            'Citacao: frase de autoridade + aplicacao + tese',
            'Comparacao: outro pais/ideal + Brasil + tese',
            'Conceituacao: definicao + problematizacao + tese',
            'Dados: estatistica + fonte + analise + tese',
            'Sempre termine com sua TESE clara!',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
