'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FloatingBackButton from '@/components/FloatingBackButton';

interface Material {
  id: string;
  titulo: string;
  tipo: string;
  disciplina: string;
  descricao: string;
  icone: string;
  url?: string;
  downloads: number;
  premium: boolean;
}

export default function MateriaisPage() {
  const router = useRouter();
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroDisciplina, setFiltroDisciplina] = useState('todos');
  const [loading, setLoading] = useState(true);

  const tiposMaterial = [
    { value: 'todos', label: 'Todos os Tipos', emoji: '📦' },
    { value: 'resumo', label: 'Resumos', emoji: '📝' },
    { value: 'mapa-mental', label: 'Mapas Mentais', emoji: '🧠' },
    { value: 'formula', label: 'Formulas', emoji: '📐' },
    { value: 'video', label: 'Videoaulas', emoji: '🎬' },
    { value: 'exercicio', label: 'Exercicios', emoji: '✏️' },
    { value: 'flashcard', label: 'Flashcards', emoji: '🃏' },
  ];

  const disciplinas = [
    { value: 'todos', label: 'Todas as Disciplinas', emoji: '📚' },
    { value: 'Matematica', label: 'Matematica', emoji: '📐' },
    { value: 'Linguagens', label: 'Linguagens', emoji: '📖' },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', emoji: '🌍' },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', emoji: '🔬' },
    { value: 'Redacao', label: 'Redacao', emoji: '✍️' },
  ];

  useEffect(() => {
    carregarMateriais();
  }, []);

  const carregarMateriais = () => {
    const materiaisData: Material[] = [
      {
        id: '1',
        titulo: 'Resumo Completo - Funcoes',
        tipo: 'resumo',
        disciplina: 'Matematica',
        descricao: 'Resumo de todas as funcoes cobradas no ENEM: 1o grau, 2o grau, exponencial e logaritmica.',
        icone: '📝',
        downloads: 1520,
        premium: false,
      },
      {
        id: '2',
        titulo: 'Mapa Mental - Ecologia',
        tipo: 'mapa-mental',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Mapa mental completo sobre cadeias alimentares, ciclos biogeoquimicos e biomas.',
        icone: '🧠',
        downloads: 980,
        premium: false,
      },
      {
        id: '3',
        titulo: 'Formulas de Fisica',
        tipo: 'formula',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Todas as formulas de fisica para o ENEM organizadas por tema.',
        icone: '📐',
        downloads: 2340,
        premium: false,
      },
      {
        id: '4',
        titulo: 'Videoaula - Interpretacao de Texto',
        tipo: 'video',
        disciplina: 'Linguagens',
        descricao: 'Tecnicas avancadas de interpretacao de texto para questoes do ENEM.',
        icone: '🎬',
        downloads: 756,
        premium: true,
      },
      {
        id: '5',
        titulo: 'Exercicios de Geometria',
        tipo: 'exercicio',
        disciplina: 'Matematica',
        descricao: '50 exercicios de geometria plana e espacial com gabarito comentado.',
        icone: '✏️',
        downloads: 1890,
        premium: false,
      },
      {
        id: '6',
        titulo: 'Flashcards - Datas Historicas',
        tipo: 'flashcard',
        disciplina: 'Ciencias Humanas',
        descricao: '100 flashcards com as principais datas e eventos da historia do Brasil.',
        icone: '🃏',
        downloads: 670,
        premium: false,
      },
      {
        id: '7',
        titulo: 'Resumo - Movimentos Literarios',
        tipo: 'resumo',
        disciplina: 'Linguagens',
        descricao: 'Do Barroco ao Modernismo: caracteristicas e autores de cada movimento.',
        icone: '📝',
        downloads: 1120,
        premium: false,
      },
      {
        id: '8',
        titulo: 'Mapa Mental - Revolucoes',
        tipo: 'mapa-mental',
        disciplina: 'Ciencias Humanas',
        descricao: 'Revolucao Francesa, Industrial e Russa em um mapa mental completo.',
        icone: '🧠',
        downloads: 890,
        premium: false,
      },
      {
        id: '9',
        titulo: 'Formulas de Quimica',
        tipo: 'formula',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Tabela periodica comentada e principais formulas de quimica.',
        icone: '📐',
        downloads: 1650,
        premium: false,
      },
      {
        id: '10',
        titulo: 'Videoaula - Redacao Dissertativa',
        tipo: 'video',
        disciplina: 'Redacao',
        descricao: 'Como estruturar uma redacao nota 1000 passo a passo.',
        icone: '🎬',
        downloads: 3200,
        premium: true,
      },
      {
        id: '11',
        titulo: 'Exercicios de Probabilidade',
        tipo: 'exercicio',
        disciplina: 'Matematica',
        descricao: '30 questoes de probabilidade e estatistica nivel ENEM.',
        icone: '✏️',
        downloads: 1430,
        premium: false,
      },
      {
        id: '12',
        titulo: 'Flashcards - Conectivos',
        tipo: 'flashcard',
        disciplina: 'Redacao',
        descricao: 'Conectivos essenciais para melhorar a coesao textual.',
        icone: '🃏',
        downloads: 2100,
        premium: false,
      },
    ];

    setMateriais(materiaisData);
    setLoading(false);
  };

  const materiaisFiltrados = materiais.filter(material => {
    const matchTipo = filtroTipo === 'todos' || material.tipo === filtroTipo;
    const matchDisciplina = filtroDisciplina === 'todos' || material.disciplina === filtroDisciplina;
    return matchTipo && matchDisciplina;
  });

  const getTipoLabel = (tipo: string): string => {
    const t = tiposMaterial.find(t => t.value === tipo);
    return t ? t.label : tipo;
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FloatingBackButton />
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 24px' }}></div>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--chalk-white)' }}>Carregando materiais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>📦 Materiais de Estudo</h1>
        <p>Resumos, mapas mentais, formulas e muito mais para sua preparacao</p>
      </div>

      {/* Estatisticas */}
      <div className="stats-bar">
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{materiais.length}</div>
          <div className="stat-label">Materiais</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{materiais.filter(m => m.tipo === 'resumo').length}</div>
          <div className="stat-label">Resumos</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{materiais.filter(m => m.tipo === 'mapa-mental').length}</div>
          <div className="stat-label">Mapas Mentais</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{materiais.filter(m => !m.premium).length}</div>
          <div className="stat-label">Gratuitos</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ marginBottom: '35px' }}>
        <h2 className="card-title">📋 Filtrar Materiais</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              color: 'var(--chalk-dim)'
            }}>
              📁 Tipo de Material
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="input"
              style={{ width: '100%' }}
            >
              {tiposMaterial.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.emoji} {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.9rem',
              color: 'var(--chalk-dim)'
            }}>
              📚 Disciplina
            </label>
            <select
              value={filtroDisciplina}
              onChange={(e) => setFiltroDisciplina(e.target.value)}
              className="input"
              style={{ width: '100%' }}
            >
              {disciplinas.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.emoji} {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Materiais */}
      {materiaisFiltrados.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '5rem', marginBottom: '24px' }}>📦</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '12px',
            color: 'var(--chalk-white)'
          }}>
            Nenhum material encontrado
          </h3>
          <p style={{ color: 'var(--chalk-dim)' }}>Tente ajustar seus filtros.</p>
        </div>
      ) : (
        <div className="category">
          <div className="category-title">
            <span>📦</span>
            Materiais Disponiveis
          </div>
          <div className="cards-grid">
            {materiaisFiltrados.map((material) => (
              <div key={material.id} className="chalkboard-card">
                {/* Badge Premium */}
                {material.premium && (
                  <div className="badge" style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'var(--accent-yellow)',
                    color: '#1e293b',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    zIndex: 10
                  }}>
                    ⭐ PREMIUM
                  </div>
                )}

                {/* Icone e Tipo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    transition: 'background 0.2s'
                  }}>
                    {material.icone}
                  </div>
                  <div>
                    <span className="badge" style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      display: 'inline-block'
                    }}>
                      {getTipoLabel(material.tipo)}
                    </span>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--chalk-faint)',
                      marginTop: '4px'
                    }}>
                      {material.disciplina}
                    </p>
                  </div>
                </div>

                {/* Titulo e Descricao */}
                <h3 style={{
                  fontWeight: 700,
                  marginBottom: '8px',
                  fontSize: '1rem',
                  color: 'var(--chalk-white)'
                }}>
                  {material.titulo}
                </h3>
                <p style={{
                  color: 'var(--chalk-dim)',
                  fontSize: '0.875rem',
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {material.descricao}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  marginTop: 'auto'
                }}>
                  <span style={{
                    color: 'var(--chalk-faint)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>⬇️</span>
                    {material.downloads.toLocaleString('pt-BR')} downloads
                  </span>

                  <button
                    className={material.premium ? 'btn' : 'btn btn-yellow'}
                    style={{
                      padding: '6px 16px',
                      fontSize: '0.875rem',
                      opacity: material.premium ? 0.7 : 1,
                      cursor: material.premium ? 'not-allowed' : 'pointer'
                    }}
                    disabled={material.premium}
                  >
                    {material.premium ? '🔒 Premium' : '📥 Baixar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categorias Rapidas */}
      <div className="card" style={{ marginTop: '35px' }}>
        <h2 className="card-title">🚀 Acesso Rapido por Tipo</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px'
        }}>
          {tiposMaterial.filter(t => t.value !== 'todos').map((tipo) => {
            const count = materiais.filter(m => m.tipo === tipo.value).length;
            const isActive = filtroTipo === tipo.value;
            return (
              <button
                key={tipo.value}
                onClick={() => setFiltroTipo(tipo.value)}
                className="btn"
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  border: isActive ? '2px solid var(--accent-yellow)' : undefined,
                  background: isActive ? 'rgba(252, 211, 77, 0.1)' : undefined
                }}
              >
                <div style={{ fontSize: '2.5rem' }}>{tipo.emoji}</div>
                <p style={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  margin: 0,
                  color: 'var(--chalk-white)'
                }}>
                  {tipo.label}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--chalk-faint)',
                  margin: 0
                }}>
                  {count} itens
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>
          <Link href="/enem">← Voltar ao Painel</Link>
        </p>
      </footer>
    </div>
  );
}
