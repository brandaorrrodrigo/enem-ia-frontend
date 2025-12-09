'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BibliotecaCardProps {
  title: string;
  slug: string;
  materia: string;
  descricao: string;
  icon?: string;
}

export default function BibliotecaCard({
  title,
  slug,
  materia,
  descricao,
  icon = '📚'
}: BibliotecaCardProps) {
  const router = useRouter();
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    // Carregar progresso do localStorage
    const progressoSalvo = localStorage.getItem(`biblioteca_${materia}_${slug}`);
    if (progressoSalvo) {
      setProgresso(parseInt(progressoSalvo));
    }
  }, [materia, slug]);

  const handleEstudar = () => {
    router.push(`/enem/biblioteca/${materia}/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="biblioteca-card"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '3px solid rgba(139, 90, 43, 0.6)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 12px 40px rgba(139, 90, 43, 0.4)',
      }}
    >
      {/* Barra de madeira superior */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #8b5a2b 0%, #a0714d 50%, #8b5a2b 100%)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Ícone e Título */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '32px' }}>{icon}</span>
          <h3
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '24px',
              color: '#fff',
              margin: 0,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {title}
          </h3>
        </div>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            lineHeight: '1.5',
          }}
        >
          {descricao}
        </p>
      </div>

      {/* Barra de Progresso */}
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <span>Progresso</span>
          <span>{progresso}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(139, 90, 43, 0.4)',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>

      {/* Mensagem informativa */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          padding: '8px 12px',
          background: 'rgba(59, 130, 246, 0.15)',
          border: '2px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '8px',
        }}
      >
        <span style={{ fontSize: '20px' }}>🎓</span>
        <span
          style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Este módulo contribui para seu domínio da disciplina
        </span>
      </div>

      {/* Botão Estudar */}
      <button
        onClick={handleEstudar}
        style={{
          width: '100%',
          padding: '14px',
          background: 'linear-gradient(135deg, #8b5a2b 0%, #a0714d 100%)',
          border: '3px solid rgba(139, 90, 43, 0.8)',
          borderRadius: '12px',
          color: '#fff',
          fontFamily: "'Patrick Hand', cursive",
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #a0714d 0%, #8b5a2b 100%)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #8b5a2b 0%, #a0714d 100%)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        }}
      >
        📖 Estudar agora
      </button>

      {/* Badge de novo (se necessário) */}
      {progresso === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '6px 12px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            border: '2px solid rgba(239, 68, 68, 0.8)',
            borderRadius: '20px',
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '12px',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
          }}
        >
          Novo
        </div>
      )}
    </motion.div>
  );
}
