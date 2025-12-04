'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

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
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando materiais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />

      {/* Header */}
      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">
          📦 Materiais de Estudo
        </h1>
        <p className="subtitle-ia mb-0">
          Resumos, mapas mentais, formulas e muito mais para sua preparacao
        </p>
      </div>

      {/* Filtros */}
      <div className="card-ia mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-white/80 text-sm mb-2">📁 Tipo de Material</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="input-ia w-full"
            >
              {tiposMaterial.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.emoji} {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-white/80 text-sm mb-2">📚 Disciplina</label>
            <select
              value={filtroDisciplina}
              onChange={(e) => setFiltroDisciplina(e.target.value)}
              className="input-ia w-full"
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

      {/* Estatisticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{materiais.length}</span>
          <span className="stat-ia-label">📦 Materiais</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{materiais.filter(m => m.tipo === 'resumo').length}</span>
          <span className="stat-ia-label">📝 Resumos</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{materiais.filter(m => m.tipo === 'mapa-mental').length}</span>
          <span className="stat-ia-label">🧠 Mapas Mentais</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{materiais.filter(m => !m.premium).length}</span>
          <span className="stat-ia-label">🆓 Gratuitos</span>
        </div>
      </div>

      {/* Grid de Materiais */}
      {materiaisFiltrados.length === 0 ? (
        <div className="card-ia text-center py-12">
          <div className="text-8xl mb-6">📦</div>
          <h3 className="text-white text-xl font-bold mb-3">Nenhum material encontrado</h3>
          <p className="text-white/70">Tente ajustar seus filtros.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materiaisFiltrados.map((material) => (
            <div
              key={material.id}
              className="card-ia hover:scale-[1.02] transition-all cursor-pointer group relative"
            >
              {/* Badge Premium */}
              {material.premium && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ PREMIUM
                </div>
              )}

              {/* Icone e Tipo */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-3xl group-hover:bg-white/20 transition">
                  {material.icone}
                </div>
                <div>
                  <span className="badge-ia text-xs">{getTipoLabel(material.tipo)}</span>
                  <p className="text-white/60 text-xs mt-1">{material.disciplina}</p>
                </div>
              </div>

              {/* Titulo e Descricao */}
              <h3 className="text-white font-bold mb-2">{material.titulo}</h3>
              <p className="text-white/70 text-sm line-clamp-2 mb-4">{material.descricao}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <span>⬇️</span>
                  {material.downloads.toLocaleString('pt-BR')} downloads
                </span>

                <button
                  className={`btn-ia-sm ${material.premium ? 'opacity-70' : ''}`}
                  disabled={material.premium}
                >
                  {material.premium ? '🔒 Premium' : '📥 Baixar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Categorias Rapidas */}
      <div className="card-ia mt-8">
        <h2 className="title-ia-sm mb-6">🚀 Acesso Rapido por Tipo</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tiposMaterial.filter(t => t.value !== 'todos').map((tipo) => {
            const count = materiais.filter(m => m.tipo === tipo.value).length;
            return (
              <button
                key={tipo.value}
                onClick={() => setFiltroTipo(tipo.value)}
                className={`card-ia-sm text-center hover:scale-105 transition ${
                  filtroTipo === tipo.value ? 'border-2 border-yellow-300' : ''
                }`}
              >
                <div className="text-4xl mb-2">{tipo.emoji}</div>
                <p className="text-white font-semibold text-sm">{tipo.label}</p>
                <p className="text-white/60 text-xs">{count} itens</p>
              </button>
            );
          })}
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
