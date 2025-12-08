'use client';

import { useState, useEffect } from 'react';

const CURSOS_SIMPLES = [
  { id: 'medicina', nome: 'Medicina', icone: '🏥', notaMedia: 800 },
  { id: 'engenharias', nome: 'Engenharias', icone: '⚙️', notaMedia: 750 },
  { id: 'direito', nome: 'Direito', icone: '⚖️', notaMedia: 760 },
  { id: 'psicologia', nome: 'Psicologia', icone: '🧠', notaMedia: 720 },
  { id: 'odontologia', nome: 'Odontologia', icone: '🦷', notaMedia: 740 },
  { id: 'ti', nome: 'TI / Computacao', icone: '💻', notaMedia: 740 },
  { id: 'outros', nome: 'Outros', icone: '📚', notaMedia: 680 }
];

interface CursoAlvoSelectorProps {
  userId: string;
  cursoAtual?: string | null;
  onCursoSelecionado?: (curso: string) => void;
  compact?: boolean;
}

export default function CursoAlvoSelector({
  userId,
  cursoAtual,
  onCursoSelecionado,
  compact = false
}: CursoAlvoSelectorProps) {
  const [curso, setCurso] = useState<string | null>(cursoAtual || null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cursoAtual) {
      setCurso(cursoAtual);
    }
  }, [cursoAtual]);

  const selecionarCurso = async (cursoNome: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/curso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          curso_nome: cursoNome
        })
      });

      const data = await response.json();

      if (data.success) {
        setCurso(cursoNome);
        setShowModal(false);
        onCursoSelecionado?.(cursoNome);
        // Salvar no localStorage para compatibilidade
        localStorage.setItem('user_curso_desejado', cursoNome);
      }
    } catch (error) {
      console.error('Erro ao selecionar curso:', error);
    }
    setLoading(false);
  };

  const cursoInfo = CURSOS_SIMPLES.find(c => c.nome === curso || c.id === curso?.toLowerCase());

  // Versao compacta
  if (compact && curso) {
    return (
      <div
        onClick={() => setShowModal(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          border: '2px solid var(--accent-yellow)',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <span>{cursoInfo?.icone || '🎯'}</span>
        <span style={{ fontFamily: 'var(--font-kalam)', color: 'var(--accent-yellow)' }}>
          Rumo a {cursoInfo?.nome || curso}!
        </span>
        <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>✏️</span>
      </div>
    );
  }

  return (
    <>
      {/* Card de Selecao */}
      <div
        className="card"
        style={{
          background: curso
            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%)'
            : 'rgba(255, 255, 255, 0.08)',
          border: curso ? '3px solid var(--accent-yellow)' : '3px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          padding: '1.5rem'
        }}
      >
        {curso ? (
          // Curso ja selecionado
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{cursoInfo?.icone || '🎯'}</span>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-kalam)',
                    fontSize: '1.5rem',
                    color: 'var(--accent-yellow)',
                    margin: 0
                  }}
                >
                  Rumo a {cursoInfo?.nome || curso}!
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-kalam)',
                    color: 'var(--chalk-dim)',
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.9rem'
                  }}
                >
                  Nota media de corte: ~{cursoInfo?.notaMedia || 700} pts
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Alterar curso alvo
            </button>
          </div>
        ) : (
          // Nenhum curso selecionado
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎯</span>
            <h3
              style={{
                fontFamily: 'var(--font-kalam)',
                fontSize: '1.3rem',
                color: 'var(--chalk-white)',
                margin: '0 0 0.5rem 0'
              }}
            >
              Escolha seu curso-alvo
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-kalam)',
                color: 'var(--chalk-dim)',
                margin: '0 0 1rem 0',
                fontSize: '0.9rem'
              }}
            >
              Defina seu objetivo para acompanhar seu progresso
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-yellow"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Definir Agora
            </button>
          </div>
        )}
      </div>

      {/* Modal de Selecao */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--chalkboard-green)',
              border: '4px solid var(--wood-light)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2
              style={{
                fontFamily: 'var(--font-kalam)',
                fontSize: '1.75rem',
                color: 'var(--accent-yellow)',
                margin: '0 0 1rem 0',
                textAlign: 'center'
              }}
            >
              🎯 Escolha seu Curso
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-kalam)',
                color: 'var(--chalk-dim)',
                textAlign: 'center',
                margin: '0 0 1.5rem 0'
              }}
            >
              Qual curso voce quer passar?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CURSOS_SIMPLES.map(c => (
                <button
                  key={c.id}
                  onClick={() => selecionarCurso(c.nome)}
                  disabled={loading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: curso === c.nome || curso === c.id
                      ? 'rgba(251, 191, 36, 0.3)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: curso === c.nome || curso === c.id
                      ? '2px solid var(--accent-yellow)'
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    cursor: loading ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{c.icone}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-kalam)',
                        fontSize: '1.1rem',
                        color: 'var(--chalk-white)',
                        fontWeight: 'bold'
                      }}
                    >
                      {c.nome}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-kalam)',
                        fontSize: '0.85rem',
                        color: 'var(--chalk-dim)'
                      }}
                    >
                      Nota media: ~{c.notaMedia} pts
                    </div>
                  </div>
                  {(curso === c.nome || curso === c.id) && (
                    <span style={{ color: 'var(--accent-yellow)', fontSize: '1.5rem' }}>✓</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn"
              style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '0.75rem',
                fontFamily: 'var(--font-kalam)'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
