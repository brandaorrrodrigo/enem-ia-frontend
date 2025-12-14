'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FloatingBackButton from '@/components/FloatingBackButton';
import { RESUMOS_ENEM } from '@/data/resumos-enem';

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
    // Converter resumos ENEM para o formato Material
    const materiaisData: Material[] = RESUMOS_ENEM.map(resumo => ({
      id: resumo.id,
      titulo: resumo.titulo,
      tipo: 'resumo',
      disciplina: resumo.disciplina,
      descricao: resumo.descricao,
      icone: resumo.icone,
      downloads: resumo.downloads,
      premium: resumo.premium,
      url: `/enem/materiais/${resumo.slug}`
    }));

    // Adicionar materiais hardcoded adicionais se necessário
    const materiaisAdicionais: Material[] = [
      // RESUMOS MATEMÁTICA
      {
        id: 'res-mat-001',
        titulo: 'Resumo Completo - Funcoes',
        tipo: 'resumo',
        disciplina: 'Matematica',
        descricao: 'Resumo completo de funcoes: afim, quadratica, exponencial, logaritmica e modular',
        icone: '📝',
        downloads: 2847,
        premium: false,
      },
      {
        id: 'res-mat-002',
        titulo: 'Resumo - Geometria Plana',
        tipo: 'resumo',
        disciplina: 'Matematica',
        descricao: 'Formulas e conceitos de areas e perimetros de figuras planas',
        icone: '📝',
        downloads: 3421,
        premium: false,
      },
      {
        id: 'res-mat-003',
        titulo: 'Resumo - Estatistica Basica',
        tipo: 'resumo',
        disciplina: 'Matematica',
        descricao: 'Medidas de tendencia central e interpretacao de graficos',
        icone: '📝',
        downloads: 2956,
        premium: false,
      },
      {
        id: 'res-mat-004',
        titulo: 'Resumo - Progressoes (PA e PG)',
        tipo: 'resumo',
        disciplina: 'Matematica',
        descricao: 'Progressao aritmetica e geometrica com formulas e aplicacoes',
        icone: '📝',
        downloads: 2134,
        premium: false,
      },
      {
        id: 'res-mat-005',
        titulo: 'Resumo - Trigonometria',
        tipo: 'resumo',
        disciplina: 'Matematica',
        descricao: 'Seno, cosseno, tangente, lei dos senos e cossenos',
        icone: '📝',
        downloads: 2789,
        premium: false,
      },

      // RESUMOS FÍSICA
      {
        id: 'res-fis-001',
        titulo: 'Resumo - Cinematica',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Movimento uniforme e uniformemente variado',
        icone: '📝',
        downloads: 3156,
        premium: false,
      },
      {
        id: 'res-fis-002',
        titulo: 'Resumo - Leis de Newton',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'As tres leis de Newton e aplicacoes',
        icone: '📝',
        downloads: 3892,
        premium: false,
      },
      {
        id: 'res-fis-003',
        titulo: 'Resumo - Energia e Trabalho',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Trabalho, potencia e conservacao de energia',
        icone: '📝',
        downloads: 2678,
        premium: false,
      },
      {
        id: 'res-fis-004',
        titulo: 'Resumo - Termodinamica',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Leis da termodinamica, calor e temperatura',
        icone: '📝',
        downloads: 2234,
        premium: false,
      },
      {
        id: 'res-fis-005',
        titulo: 'Resumo - Eletricidade',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Corrente eletrica, resistencia, circuitos e Lei de Ohm',
        icone: '📝',
        downloads: 2901,
        premium: false,
      },

      // RESUMOS QUÍMICA
      {
        id: 'res-qui-001',
        titulo: 'Resumo - Tabela Periodica',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Propriedades periodicas e classificacao dos elementos',
        icone: '📝',
        downloads: 4123,
        premium: false,
      },
      {
        id: 'res-qui-002',
        titulo: 'Resumo - Ligacoes Quimicas',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Ionica, covalente e metalica com exemplos',
        icone: '📝',
        downloads: 3456,
        premium: false,
      },
      {
        id: 'res-qui-003',
        titulo: 'Resumo - Funcoes Inorganicas',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Acidos, bases, sais e oxidos',
        icone: '📝',
        downloads: 2987,
        premium: false,
      },
      {
        id: 'res-qui-004',
        titulo: 'Resumo - Estequiometria',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Calculos quimicos, mol e proporcoes',
        icone: '📝',
        downloads: 3234,
        premium: false,
      },
      {
        id: 'res-qui-005',
        titulo: 'Resumo - Quimica Organica',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Funcoes organicas e nomenclatura',
        icone: '📝',
        downloads: 3678,
        premium: false,
      },

      // RESUMOS BIOLOGIA
      {
        id: 'res-bio-001',
        titulo: 'Resumo - Citologia',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Estrutura e organelas da celula eucarionte e procarionte',
        icone: '📝',
        downloads: 4567,
        premium: false,
      },
      {
        id: 'res-bio-002',
        titulo: 'Resumo - Genetica Classica',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Leis de Mendel e padroes de heranca',
        icone: '📝',
        downloads: 3987,
        premium: false,
      },
      {
        id: 'res-bio-003',
        titulo: 'Resumo - Ecologia',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Cadeias alimentares, ciclos biogeoquimicos e biomas',
        icone: '📝',
        downloads: 4234,
        premium: false,
      },
      {
        id: 'res-bio-004',
        titulo: 'Resumo - Evolucao',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Teorias evolutivas, selecao natural e especiacao',
        icone: '📝',
        downloads: 2876,
        premium: false,
      },
      {
        id: 'res-bio-005',
        titulo: 'Resumo - Fisiologia Humana',
        tipo: 'resumo',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Sistemas cardiovascular, respiratorio, nervoso e outros',
        icone: '📝',
        downloads: 3456,
        premium: false,
      },

      // RESUMOS HISTÓRIA
      {
        id: 'res-his-001',
        titulo: 'Resumo - Brasil Imperio',
        tipo: 'resumo',
        disciplina: 'Ciencias Humanas',
        descricao: 'Do Primeiro Reinado a Proclamacao da Republica',
        icone: '📝',
        downloads: 3789,
        premium: false,
      },
      {
        id: 'res-his-002',
        titulo: 'Resumo - Era Vargas',
        tipo: 'resumo',
        disciplina: 'Ciencias Humanas',
        descricao: 'Republica Velha, Revolucao de 1930 e Estado Novo',
        icone: '📝',
        downloads: 3234,
        premium: false,
      },
      {
        id: 'res-his-003',
        titulo: 'Resumo - Ditadura Militar',
        tipo: 'resumo',
        disciplina: 'Ciencias Humanas',
        descricao: 'Golpe de 1964, AI-5 e redemocratizacao',
        icone: '📝',
        downloads: 4123,
        premium: false,
      },
      {
        id: 'res-his-004',
        titulo: 'Resumo - Revolucoes Industriais',
        tipo: 'resumo',
        disciplina: 'Ciencias Humanas',
        descricao: 'Primeira, Segunda e Terceira Revolucao Industrial',
        icone: '📝',
        downloads: 2987,
        premium: false,
      },
      {
        id: 'res-his-005',
        titulo: 'Resumo - Guerras Mundiais',
        tipo: 'resumo',
        disciplina: 'Ciencias Humanas',
        descricao: 'Primeira e Segunda Guerra Mundial: causas e consequencias',
        icone: '📝',
        downloads: 4567,
        premium: false,
      },

      // RESUMOS PORTUGUÊS
      {
        id: 'res-por-001',
        titulo: 'Resumo - Figuras de Linguagem',
        tipo: 'resumo',
        disciplina: 'Linguagens',
        descricao: 'Principais figuras de linguagem cobradas no ENEM',
        icone: '📝',
        downloads: 5234,
        premium: false,
      },
      {
        id: 'res-por-002',
        titulo: 'Resumo - Concordancia Verbal e Nominal',
        tipo: 'resumo',
        disciplina: 'Linguagens',
        descricao: 'Regras de concordancia com exemplos praticos',
        icone: '📝',
        downloads: 3987,
        premium: false,
      },
      {
        id: 'res-por-003',
        titulo: 'Resumo - Movimentos Literarios',
        tipo: 'resumo',
        disciplina: 'Linguagens',
        descricao: 'Do Barroco ao Modernismo: caracteristicas e autores',
        icone: '📝',
        downloads: 4123,
        premium: false,
      },
      {
        id: 'res-por-004',
        titulo: 'Resumo - Crase',
        tipo: 'resumo',
        disciplina: 'Linguagens',
        descricao: 'Uso da crase e casos especiais',
        icone: '📝',
        downloads: 2876,
        premium: false,
      },
      {
        id: 'res-por-005',
        titulo: 'Resumo - Interpretacao de Texto',
        tipo: 'resumo',
        disciplina: 'Linguagens',
        descricao: 'Tecnicas e estrategias para interpretacao textual',
        icone: '📝',
        downloads: 5678,
        premium: false,
      },

      // MAPAS MENTAIS
      {
        id: 'map-mat-001',
        titulo: 'Mapa Mental - Funcoes',
        tipo: 'mapa-mental',
        disciplina: 'Matematica',
        descricao: 'Visao geral de todos os tipos de funcoes',
        icone: '🧠',
        downloads: 1987,
        premium: false,
      },
      {
        id: 'map-fis-001',
        titulo: 'Mapa Mental - Leis de Newton',
        tipo: 'mapa-mental',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Resumo visual das tres leis com aplicacoes',
        icone: '🧠',
        downloads: 2134,
        premium: false,
      },
      {
        id: 'map-qui-001',
        titulo: 'Mapa Mental - Tabela Periodica',
        tipo: 'mapa-mental',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Propriedades periodicas e familias importantes',
        icone: '🧠',
        downloads: 2456,
        premium: false,
      },
      {
        id: 'map-bio-001',
        titulo: 'Mapa Mental - Ecologia',
        tipo: 'mapa-mental',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Mapa mental completo sobre cadeias alimentares e ciclos',
        icone: '🧠',
        downloads: 2789,
        premium: false,
      },
      {
        id: 'map-his-001',
        titulo: 'Mapa Mental - Revolucoes',
        tipo: 'mapa-mental',
        disciplina: 'Ciencias Humanas',
        descricao: 'Revolucao Francesa, Industrial e Russa',
        icone: '🧠',
        downloads: 1876,
        premium: false,
      },

      // FÓRMULAS
      {
        id: 'for-mat-001',
        titulo: 'Formulas de Matematica',
        tipo: 'formula',
        disciplina: 'Matematica',
        descricao: 'Todas as formulas de matematica para o ENEM organizadas por tema',
        icone: '📐',
        downloads: 4567,
        premium: false,
      },
      {
        id: 'for-fis-001',
        titulo: 'Formulas de Fisica',
        tipo: 'formula',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Todas as formulas de fisica para o ENEM organizadas por tema',
        icone: '📐',
        downloads: 3987,
        premium: false,
      },
      {
        id: 'for-qui-001',
        titulo: 'Formulas de Quimica',
        tipo: 'formula',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Tabela periodica comentada e principais formulas de quimica',
        icone: '📐',
        downloads: 3456,
        premium: false,
      },

      // EXERCÍCIOS
      {
        id: 'exe-mat-001',
        titulo: 'Exercicios de Geometria',
        tipo: 'exercicio',
        disciplina: 'Matematica',
        descricao: '50 exercicios de geometria plana e espacial com gabarito comentado',
        icone: '✏️',
        downloads: 2890,
        premium: false,
      },
      {
        id: 'exe-mat-002',
        titulo: 'Exercicios de Probabilidade',
        tipo: 'exercicio',
        disciplina: 'Matematica',
        descricao: '30 questoes de probabilidade e estatistica nivel ENEM',
        icone: '✏️',
        downloads: 2234,
        premium: false,
      },
      {
        id: 'exe-fis-001',
        titulo: 'Exercicios de Cinematica',
        tipo: 'exercicio',
        disciplina: 'Ciencias da Natureza',
        descricao: '40 questoes de MU, MUV e queda livre',
        icone: '✏️',
        downloads: 1987,
        premium: false,
      },
      {
        id: 'exe-qui-001',
        titulo: 'Exercicios de Estequiometria',
        tipo: 'exercicio',
        disciplina: 'Ciencias da Natureza',
        descricao: '35 questoes de calculos quimicos',
        icone: '✏️',
        downloads: 2123,
        premium: false,
      },
      {
        id: 'exe-bio-001',
        titulo: 'Exercicios de Genetica',
        tipo: 'exercicio',
        disciplina: 'Ciencias da Natureza',
        descricao: '45 questoes de genetica classica e molecular',
        icone: '✏️',
        downloads: 2456,
        premium: false,
      },

      // FLASHCARDS
      {
        id: 'fla-his-001',
        titulo: 'Flashcards - Datas Historicas',
        tipo: 'flashcard',
        disciplina: 'Ciencias Humanas',
        descricao: '100 flashcards com as principais datas e eventos da historia do Brasil',
        icone: '🃏',
        downloads: 1987,
        premium: false,
      },
      {
        id: 'fla-por-001',
        titulo: 'Flashcards - Conectivos',
        tipo: 'flashcard',
        disciplina: 'Linguagens',
        descricao: 'Conectivos essenciais para melhorar a coesao textual',
        icone: '🃏',
        downloads: 2567,
        premium: false,
      },
      {
        id: 'fla-qui-001',
        titulo: 'Flashcards - Elementos Quimicos',
        tipo: 'flashcard',
        disciplina: 'Ciencias da Natureza',
        descricao: '118 flashcards com simbolos e propriedades',
        icone: '🃏',
        downloads: 1876,
        premium: false,
      },
      {
        id: 'fla-bio-001',
        titulo: 'Flashcards - Organelas Celulares',
        tipo: 'flashcard',
        disciplina: 'Ciencias da Natureza',
        descricao: 'Flashcards com funcoes de cada organela',
        icone: '🃏',
        downloads: 2234,
        premium: false,
      },

      // VIDEOAULAS (PREMIUM)
      {
        id: 'vid-por-001',
        titulo: 'Videoaula - Interpretacao de Texto',
        tipo: 'video',
        disciplina: 'Linguagens',
        descricao: 'Tecnicas avancadas de interpretacao de texto para questoes do ENEM',
        icone: '🎬',
        downloads: 1456,
        premium: true,
      },
      {
        id: 'vid-red-001',
        titulo: 'Videoaula - Redacao Dissertativa',
        tipo: 'video',
        disciplina: 'Linguagens',
        descricao: 'Como estruturar uma redacao nota 1000 passo a passo',
        icone: '🎬',
        downloads: 2987,
        premium: true,
      },
      {
        id: 'vid-mat-001',
        titulo: 'Videoaula - Funcoes Avancadas',
        tipo: 'video',
        disciplina: 'Matematica',
        descricao: 'Resolucao de questoes dificeis de funcoes',
        icone: '🎬',
        downloads: 1234,
        premium: true,
      },
    ];

    // Combinar resumos ENEM com materiais adicionais
    const todosMateriais = [...materiaisData, ...materiaisAdicionais];
    setMateriais(todosMateriais);
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
