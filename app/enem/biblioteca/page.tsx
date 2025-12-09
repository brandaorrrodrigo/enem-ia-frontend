'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BibliotecaCard from '@/components/BibliotecaCard';

type Secao = 'cadernos' | 'resumos' | 'formulas';

interface Capitulo {
  title: string;
  slug: string;
  descricao: string;
  fpPotencial: number;
  icon: string;
}

const materias = [
  { id: 'matematica', nome: 'Matemática', icon: '🔢', color: '#3b82f6' },
  { id: 'portugues', nome: 'Português', icon: '📖', color: '#8b5cf6' },
  { id: 'fisica', nome: 'Física', icon: '⚛️', color: '#10b981' },
  { id: 'quimica', nome: 'Química', icon: '🧪', color: '#f59e0b' },
  { id: 'biologia', nome: 'Biologia', icon: '🧬', color: '#22c55e' },
  { id: 'historia', nome: 'História', icon: '🏛️', color: '#ef4444' },
  { id: 'geografia', nome: 'Geografia', icon: '🌍', color: '#06b6d4' },
  { id: 'filosofia', nome: 'Filosofia', icon: '🤔', color: '#a855f7' },
  { id: 'sociologia', nome: 'Sociologia', icon: '👥', color: '#ec4899' },
  { id: 'redacao', nome: 'Redação', icon: '✍️', color: '#f97316' },
];

const capitulosPorMateria: Record<string, Capitulo[]> = {
  matematica: [
    {
      title: 'Funções',
      slug: 'funcoes',
      descricao: 'Tipos de funções, domínio, imagem e gráficos',
      fpPotencial: 50,
      icon: '📊',
    },
    {
      title: 'Razão e Proporção',
      slug: 'razao-proporcao',
      descricao: 'Regra de três, porcentagem e aplicações',
      fpPotencial: 40,
      icon: '⚖️',
    },
    {
      title: 'Geometria Espacial',
      slug: 'geometria-espacial',
      descricao: 'Volumes e áreas de sólidos geométricos',
      fpPotencial: 60,
      icon: '🎲',
    },
    {
      title: 'Trigonometria',
      slug: 'trigonometria',
      descricao: 'Seno, cosseno, tangente e aplicações',
      fpPotencial: 55,
      icon: '📐',
    },
    {
      title: 'Estatística',
      slug: 'estatistica',
      descricao: 'Média, mediana, moda e gráficos',
      fpPotencial: 45,
      icon: '📈',
    },
  ],
  portugues: [
    {
      title: 'Interpretação de Texto',
      slug: 'interpretacao-texto',
      descricao: 'Técnicas de leitura e compreensão textual',
      fpPotencial: 50,
      icon: '🔍',
    },
    {
      title: 'Gramática',
      slug: 'gramatica',
      descricao: 'Sintaxe, morfologia e concordância',
      fpPotencial: 45,
      icon: '📝',
    },
    {
      title: 'Literatura Brasileira',
      slug: 'literatura-brasileira',
      descricao: 'Movimentos literários e obras importantes',
      fpPotencial: 55,
      icon: '📚',
    },
    {
      title: 'Figuras de Linguagem',
      slug: 'figuras-linguagem',
      descricao: 'Metáfora, metonímia e outras figuras',
      fpPotencial: 40,
      icon: '🎭',
    },
  ],
  fisica: [
    {
      title: 'Cinemática',
      slug: 'cinematica',
      descricao: 'Movimento uniforme e variado',
      fpPotencial: 50,
      icon: '🚗',
    },
    {
      title: 'Dinâmica',
      slug: 'dinamica',
      descricao: 'Leis de Newton e aplicações',
      fpPotencial: 55,
      icon: '⚡',
    },
    {
      title: 'Eletricidade',
      slug: 'eletricidade',
      descricao: 'Circuitos elétricos e corrente',
      fpPotencial: 60,
      icon: '💡',
    },
    {
      title: 'Óptica',
      slug: 'optica',
      descricao: 'Reflexão, refração e lentes',
      fpPotencial: 45,
      icon: '🔦',
    },
  ],
  quimica: [
    {
      title: 'Química Orgânica',
      slug: 'quimica-organica',
      descricao: 'Funções orgânicas e nomenclatura',
      fpPotencial: 60,
      icon: '🧪',
    },
    {
      title: 'Estequiometria',
      slug: 'estequiometria',
      descricao: 'Cálculos químicos e mol',
      fpPotencial: 55,
      icon: '⚗️',
    },
    {
      title: 'Termoquímica',
      slug: 'termoquimica',
      descricao: 'Entalpia e reações exotérmicas',
      fpPotencial: 50,
      icon: '🔥',
    },
    {
      title: 'Eletroquímica',
      slug: 'eletroquimica',
      descricao: 'Pilhas e eletrólise',
      fpPotencial: 55,
      icon: '🔋',
    },
  ],
  biologia: [
    {
      title: 'Citologia',
      slug: 'citologia',
      descricao: 'Estrutura e função celular',
      fpPotencial: 50,
      icon: '🔬',
    },
    {
      title: 'Genética',
      slug: 'genetica',
      descricao: 'Leis de Mendel e hereditariedade',
      fpPotencial: 60,
      icon: '🧬',
    },
    {
      title: 'Ecologia',
      slug: 'ecologia',
      descricao: 'Ecossistemas e relações ecológicas',
      fpPotencial: 55,
      icon: '🌿',
    },
    {
      title: 'Evolução',
      slug: 'evolucao',
      descricao: 'Teorias evolutivas e seleção natural',
      fpPotencial: 50,
      icon: '🦎',
    },
  ],
  historia: [
    {
      title: 'Brasil Colônia',
      slug: 'brasil-colonia',
      descricao: 'Descobrimento e colonização',
      fpPotencial: 50,
      icon: '⛵',
    },
    {
      title: 'Revolução Industrial',
      slug: 'revolucao-industrial',
      descricao: 'Transformações econômicas e sociais',
      fpPotencial: 55,
      icon: '🏭',
    },
    {
      title: 'Guerras Mundiais',
      slug: 'guerras-mundiais',
      descricao: 'Primeira e Segunda Guerra Mundial',
      fpPotencial: 60,
      icon: '⚔️',
    },
    {
      title: 'Ditadura Militar',
      slug: 'ditadura-militar',
      descricao: 'Brasil no período militar',
      fpPotencial: 55,
      icon: '🪖',
    },
  ],
  geografia: [
    {
      title: 'Geologia',
      slug: 'geologia',
      descricao: 'Estrutura da Terra e relevo',
      fpPotencial: 50,
      icon: '🏔️',
    },
    {
      title: 'Climatologia',
      slug: 'climatologia',
      descricao: 'Climas e fenômenos atmosféricos',
      fpPotencial: 55,
      icon: '🌤️',
    },
    {
      title: 'Geografia Urbana',
      slug: 'geografia-urbana',
      descricao: 'Urbanização e problemas urbanos',
      fpPotencial: 50,
      icon: '🏙️',
    },
    {
      title: 'Geopolítica',
      slug: 'geopolitica',
      descricao: 'Conflitos e relações internacionais',
      fpPotencial: 60,
      icon: '🗺️',
    },
  ],
  filosofia: [
    {
      title: 'Filosofia Antiga',
      slug: 'filosofia-antiga',
      descricao: 'Sócrates, Platão e Aristóteles',
      fpPotencial: 50,
      icon: '🏛️',
    },
    {
      title: 'Ética e Moral',
      slug: 'etica-moral',
      descricao: 'Teorias éticas e valores',
      fpPotencial: 45,
      icon: '⚖️',
    },
    {
      title: 'Filosofia Moderna',
      slug: 'filosofia-moderna',
      descricao: 'Descartes, Kant e Iluminismo',
      fpPotencial: 55,
      icon: '💡',
    },
  ],
  sociologia: [
    {
      title: 'Estratificação Social',
      slug: 'estratificacao-social',
      descricao: 'Classes sociais e desigualdade',
      fpPotencial: 50,
      icon: '📊',
    },
    {
      title: 'Movimentos Sociais',
      slug: 'movimentos-sociais',
      descricao: 'Manifestações e transformações sociais',
      fpPotencial: 55,
      icon: '✊',
    },
    {
      title: 'Cultura e Sociedade',
      slug: 'cultura-sociedade',
      descricao: 'Identidade cultural e diversidade',
      fpPotencial: 50,
      icon: '🎭',
    },
  ],
  redacao: [
    {
      title: 'Estrutura da Redação',
      slug: 'estrutura-redacao',
      descricao: 'Introdução, desenvolvimento e conclusão',
      fpPotencial: 60,
      icon: '📄',
    },
    {
      title: 'Argumentação',
      slug: 'argumentacao',
      descricao: 'Tipos de argumentos e persuasão',
      fpPotencial: 65,
      icon: '💬',
    },
    {
      title: 'Proposta de Intervenção',
      slug: 'proposta-intervencao',
      descricao: 'Como criar soluções eficazes',
      fpPotencial: 70,
      icon: '🎯',
    },
    {
      title: 'Repertório Sociocultural',
      slug: 'repertorio-sociocultural',
      descricao: 'Como usar referências na redação',
      fpPotencial: 55,
      icon: '📚',
    },
  ],
};

export default function BibliotecaPage() {
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>('cadernos');
  const [materiaAtiva, setMateriaAtiva] = useState('matematica');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e2a18 0%, #1a3d28 50%, #0e2a18 100%)',
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '40px', textAlign: 'center' }}
        >
          <h1
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '48px',
              color: '#fff',
              marginBottom: '16px',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            📚 Biblioteca ENEM PRO
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Todo o conteúdo do ENEM organizado para você estudar de forma eficiente
          </p>
        </motion.div>

        {/* Seções Principais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'cadernos' as Secao, nome: 'CADERNOS DE ESTUDO', icon: '📖' },
            { id: 'resumos' as Secao, nome: 'RESUMOS / MAPAS MENTAIS', icon: '🗺️' },
            { id: 'formulas' as Secao, nome: 'FÓRMULAS / MEMORIZAÇÃO', icon: '🧠' },
          ].map((secao) => (
            <button
              key={secao.id}
              onClick={() => setSecaoAtiva(secao.id)}
              style={{
                padding: '16px 32px',
                background:
                  secaoAtiva === secao.id
                    ? 'linear-gradient(135deg, #8b5a2b 0%, #a0714d 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                border:
                  secaoAtiva === secao.id
                    ? '3px solid rgba(139, 90, 43, 0.8)'
                    : '3px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                boxShadow:
                  secaoAtiva === secao.id
                    ? '0 6px 20px rgba(139, 90, 43, 0.4)'
                    : '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (secaoAtiva !== secao.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (secaoAtiva !== secao.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {secao.icon} {secao.nome}
            </button>
          ))}
        </motion.div>

        {/* Abas de Matérias */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            overflowX: 'auto',
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
            border: '2px solid rgba(139, 90, 43, 0.3)',
          }}
        >
          {materias.map((materia) => (
            <button
              key={materia.id}
              onClick={() => setMateriaAtiva(materia.id)}
              style={{
                padding: '12px 24px',
                background:
                  materiaAtiva === materia.id
                    ? materia.color
                    : 'rgba(255, 255, 255, 0.1)',
                border: '2px solid',
                borderColor:
                  materiaAtiva === materia.id
                    ? materia.color
                    : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                color: '#fff',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
                boxShadow:
                  materiaAtiva === materia.id
                    ? `0 4px 16px ${materia.color}40`
                    : 'none',
              }}
            >
              {materia.icon} {materia.nome}
            </button>
          ))}
        </motion.div>

        {/* Grid de Capítulos */}
        <motion.div
          key={materiaAtiva}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {capitulosPorMateria[materiaAtiva]?.map((capitulo, index) => (
            <motion.div
              key={capitulo.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BibliotecaCard
                title={capitulo.title}
                slug={capitulo.slug}
                materia={materiaAtiva}
                descricao={capitulo.descricao}
                fpPotencial={capitulo.fpPotencial}
                icon={capitulo.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mensagem se não houver capítulos */}
        {(!capitulosPorMateria[materiaAtiva] ||
          capitulosPorMateria[materiaAtiva].length === 0) && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              border: '2px dashed rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚧</div>
            <h3
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
              }}
            >
              Em breve!
            </h3>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Estamos preparando conteúdo incrível para esta matéria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
