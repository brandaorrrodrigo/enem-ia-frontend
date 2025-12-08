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

export default function Tema05RepertoriosPage() {
  return (
    <LousaLayout temaAtual="tema05-repertorios" titulo="Repertorio Sociocultural" badge="Tema 05">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: "'Patrick Hand', cursive", color: '#ffd700', fontSize: '2.5rem',
          textShadow: '0 0 2px rgba(255, 215, 0, 0.8), 2px 2px 0 rgba(0, 0, 0, 0.4)', marginBottom: '1.5rem' }}>
        5. Repertorio Sociocultural
      </motion.h1>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: '#f5f5dc', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            O <strong style={{ color: '#ffd700' }}>repertorio sociocultural</strong> e essencial para a Competencia 2.
            Sao <strong style={{ color: '#87ceeb' }}>referencias externas</strong> que comprovam seus argumentos.
          </p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Tipos de Repertorio">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>Filosofia</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Pensadores e suas ideias</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Kant, Rousseau, Sartre, Bauman</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>Sociologia</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Analises da sociedade</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Durkheim, Marx, Weber, Bourdieu</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>Historia</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Fatos e periodos historicos</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Brasil Colonia, Ditadura, Revolucoes</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>Dados e Pesquisas</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Estatisticas e estudos</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>IBGE, OMS, ONU, IPEA</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#dda0dd' }}><strong>Literatura</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Obras e autores</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Machado, Graciliano, Clarice</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffa500' }}><strong>Atualidades</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Eventos recentes</p>
                <p style={{ color: '#87ceeb', fontSize: '0.8rem' }}>Pandemia, Tecnologia, Meio Ambiente</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Filosofos Versateis">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ffd700' }}><strong>Zygmunt Bauman</strong> - Modernidade Liquida</p>
              <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                Relacoes frageis, sociedade do consumo, individualizacao. <br/>
                <em>Uso: Redes sociais, relacoes humanas, consumismo</em>
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#87ceeb' }}><strong>Hannah Arendt</strong> - Banalidade do Mal</p>
              <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                Pessoas comuns cometendo atrocidades por omissao ou obediencia. <br/>
                <em>Uso: Violencia, preconceito, negligencia</em>
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#98fb98' }}><strong>Immanuel Kant</strong> - Imperativo Categorico</p>
              <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                "O ser humano e aquilo que a educacao faz dele." <br/>
                <em>Uso: Educacao, etica, cidadania</em>
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ color: '#ff6b6b' }}><strong>Michel Foucault</strong> - Sociedade Disciplinar</p>
              <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>
                Controle social, vigilancia, normalizacao. <br/>
                <em>Uso: Prisoes, saude mental, tecnologia</em>
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '2rem' }}>
        <CaixaProfessor titulo="Obras Literarias Uteis">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ffd700' }}><strong>"1984" - George Orwell</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Controle estatal, vigilancia, manipulacao</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#87ceeb' }}><strong>"Vidas Secas" - Graciliano Ramos</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Desigualdade, seca, migracao</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#98fb98' }}><strong>"O Cortico" - Aluisio Azevedo</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Moradia, urbanizacao, pobreza</p>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: '#ff6b6b' }}><strong>"Dom Casmurro" - Machado de Assis</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem' }}>Relacoes sociais, aparencias</p>
              </div>
            </div>
          </div>
        </CaixaProfessor>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{ marginTop: '2rem' }}>
        <CaixaExemplo numero={1} titulo="Como Usar o Repertorio">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: '#ff6b6b' }}><strong>ERRADO (repertorio solto):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  "A saude mental e importante. Zygmunt Bauman fala sobre modernidade liquida.
                  Por isso, devemos cuidar da saude mental."
                </p>
              </div>
              <div>
                <p style={{ color: '#98fb98' }}><strong>CERTO (repertorio articulado):</strong></p>
                <p style={{ color: '#f5f5dc', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  "A fragilidade dos vinculos sociais, conceituada pelo sociologo Zygmunt Bauman como
                  caracteristica da 'modernidade liquida', contribui para o aumento de transtornos
                  mentais, ja que os individuos enfrentam maior isolamento e inseguranca emocional."
                </p>
              </div>
            </div>
          </div>
        </CaixaExemplo>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: '2rem' }}>
        <CaixaFormula titulo="Repertorios Coringas">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <p style={{ color: '#f5f5dc' }}>
              Esses repertorios se aplicam a <strong style={{ color: '#ffd700' }}>muitos temas</strong>:
            </p>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <p style={{ color: '#f5f5dc' }}>
                <strong style={{ color: '#ffd700' }}>1.</strong> Constituicao Federal de 1988 (direitos fundamentais)
              </p>
              <p style={{ color: '#f5f5dc' }}>
                <strong style={{ color: '#ffd700' }}>2.</strong> Declaracao Universal dos Direitos Humanos (ONU, 1948)
              </p>
              <p style={{ color: '#f5f5dc' }}>
                <strong style={{ color: '#ffd700' }}>3.</strong> Mito da Caverna (Platao) - alienacao, conhecimento
              </p>
              <p style={{ color: '#f5f5dc' }}>
                <strong style={{ color: '#ffd700' }}>4.</strong> Contrato Social (Rousseau) - papel do Estado
              </p>
              <p style={{ color: '#f5f5dc' }}>
                <strong style={{ color: '#ffd700' }}>5.</strong> Filme "Que Horas Ela Volta?" - desigualdade social
              </p>
            </div>
          </div>
        </CaixaFormula>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
        <QuestaoInterativa
          numero={1}
          tipo="Pratica"
          enunciado="O que diferencia um repertorio 'legitimado' de um repertorio comum?"
          resolucao={[
            { texto: 'Repertorio legitimado vem de fonte confiavel e reconhecida', destaque: true },
            { texto: 'Precisa estar articulado com a argumentacao' },
            { texto: 'Deve contribuir para a defesa do ponto de vista' },
            { texto: 'Nao pode ser informacao de senso comum' },
          ]}
          gabarito="Repertorio legitimado e produtivo quando bem articulado"
          dica="Evite citar 'estudos mostram que...' sem especificar a fonte!"
        />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ marginTop: '2rem' }}>
        <CaixaResumo
          titulo="Resumo - Repertorios"
          itens={[
            'Tipos: filosofia, sociologia, historia, dados, literatura',
            'Filosofos coringas: Bauman, Arendt, Kant, Foucault',
            'Sempre ARTICULE o repertorio com seu argumento',
            'Cite a fonte: autor, obra, organizacao',
            'Evite repertorios muito comuns (Gandhi, Steve Jobs)',
            'Repertorios coringas: CF/88, DUDH, Mito da Caverna',
          ]}
        />
      </motion.section>
    </LousaLayout>
  );
}
