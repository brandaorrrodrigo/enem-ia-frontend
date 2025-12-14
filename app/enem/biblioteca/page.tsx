'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BibliotecaCard from '@/components/BibliotecaCard';
import { MATERIAS } from '@/data/biblioteca';

type Secao = 'cadernos' | 'resumos' | 'formulas';

export default function BibliotecaPage() {
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>('cadernos');
  const [materiaAtiva, setMateriaAtiva] = useState('matematica');

  // Se a seção for "formulas", mostra apenas a matéria de Fórmulas & Memorização
  const materiasExibidas = secaoAtiva === 'formulas'
    ? MATERIAS.filter((m) => m.id === 'formulas-memorizacao')
    : MATERIAS.filter((m) => m.id !== 'formulas-memorizacao');

  // Quando mudar de seção, ajusta a matéria ativa
  const handleSecaoChange = (secao: Secao) => {
    setSecaoAtiva(secao);
    if (secao === 'formulas') {
      setMateriaAtiva('formulas-memorizacao');
    } else if (materiaAtiva === 'formulas-memorizacao') {
      setMateriaAtiva('matematica');
    }
  };

  const materiaAtualData = materiasExibidas.find((m) => m.id === materiaAtiva);

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
              onClick={() => handleSecaoChange(secao.id)}
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
          {materiasExibidas.map((materia) => (
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
          {materiaAtualData?.modulos.map((modulo, index) => (
            <motion.div
              key={modulo.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BibliotecaCard
                title={modulo.title}
                slug={modulo.slug}
                materia={materiaAtiva}
                descricao={modulo.descricao}
                icon={modulo.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mensagem se não houver capítulos */}
        {(!materiaAtualData || materiaAtualData.modulos.length === 0) && (
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
