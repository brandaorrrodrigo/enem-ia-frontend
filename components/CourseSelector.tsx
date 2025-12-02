'use client';

import { useState, useEffect } from 'react';

interface Course {
  id: string;
  nome: string;
  ies: string;
  campus?: string;
  turno?: string;
  notaCorte: number;
  anoReferencia: number;
}

interface CourseSelectorProps {
  userId: string;
}

export default function CourseSelector({ userId }: CourseSelectorProps) {
  const [cursoAtual, setCursoAtual] = useState<Course | null>(null);
  const [cursos, setCursos] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Buscar curso atual do usuário
  useEffect(() => {
    fetchCursoAtual();
  }, [userId]);

  const fetchCursoAtual = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/enem/cursos/user/curso?user_id=${userId}`);
      const data = await response.json();

      if (data.has_curso && data.curso) {
        setCursoAtual(data.curso);
      }
    } catch (error) {
      console.error('Erro ao buscar curso atual:', error);
    } finally {
      setLoading(false);
    }
  };

  const buscarCursos = async () => {
    try {
      setSearching(true);
      const url = search
        ? `${BACKEND_URL}/api/enem/cursos/cursos?search=${encodeURIComponent(search)}`
        : `${BACKEND_URL}/api/enem/cursos/cursos`;

      const response = await fetch(url);
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
    } finally {
      setSearching(false);
    }
  };

  const selecionarCurso = async (courseId: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/enem/cursos/user/curso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, course_id: courseId })
      });

      const data = await response.json();

      if (data.success && data.curso) {
        setCursoAtual(data.curso);
        setShowModal(false);
        // Resetar busca
        setSearch('');
        setCursos([]);
      }
    } catch (error) {
      console.error('Erro ao selecionar curso:', error);
      alert('Erro ao selecionar curso. Tente novamente.');
    }
  };

  const removerCurso = async () => {
    if (!confirm('Deseja realmente remover o curso alvo?')) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/enem/cursos/user/curso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, course_id: null })
      });

      const data = await response.json();

      if (data.success) {
        setCursoAtual(null);
      }
    } catch (error) {
      console.error('Erro ao remover curso:', error);
      alert('Erro ao remover curso. Tente novamente.');
    }
  };

  const abrirModal = () => {
    setShowModal(true);
    // Buscar cursos populares ao abrir
    buscarCursos();
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
        <h3 className="text-xl font-bold mb-4">🎯 Meu Curso Alvo</h3>
        <div className="animate-pulse bg-white/20 h-20 rounded-xl"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
        <h3 className="text-xl font-bold mb-4">🎯 Meu Curso Alvo</h3>

        {cursoAtual ? (
          <div className="space-y-3">
            <div className="bg-yellow-400/20 p-4 rounded-xl border border-yellow-400/30">
              <p className="font-bold text-lg">{cursoAtual.nome}</p>
              <p className="text-sm text-white/80">{cursoAtual.ies}</p>
              {cursoAtual.campus && (
                <p className="text-xs text-white/60">📍 {cursoAtual.campus}</p>
              )}
              {cursoAtual.turno && (
                <p className="text-xs text-white/60">🕐 {cursoAtual.turno}</p>
              )}
              <p className="mt-2 text-yellow-300 font-semibold">
                Nota de Corte: {cursoAtual.notaCorte.toFixed(1)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={abrirModal}
                className="flex-1 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm"
              >
                Alterar
              </button>
              <button
                onClick={removerCurso}
                className="bg-red-500/30 hover:bg-red-500/40 px-4 py-2 rounded-lg transition text-sm"
              >
                Remover
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🎯</div>
            <p className="text-white/70 mb-4 leading-relaxed">
              Defina seu curso alvo para comparar sua nota com a nota de corte
            </p>
            <button
              onClick={abrirModal}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-6 py-4 rounded-xl transition text-lg"
              style={{ boxShadow: '0 4px 20px rgba(255, 217, 102, 0.3)' }}
            >
              + Escolher Meu Curso Alvo
            </button>
          </div>
        )}
      </div>

      {/* Modal de seleção */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">Escolha seu curso alvo</h3>
            <p className="text-white/70 text-sm mb-4">
              Selecione o curso que você deseja passar para comparar sua nota com a nota de corte
            </p>

            {/* Barra de busca */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Buscar curso ou universidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && buscarCursos()}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={buscarCursos}
                disabled={searching}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {searching ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {/* Lista de cursos */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {cursos.length > 0 ? (
                cursos.map(curso => (
                  <button
                    key={curso.id}
                    onClick={() => selecionarCurso(curso.id)}
                    className="w-full text-left bg-slate-700 hover:bg-slate-600 p-4 rounded-xl transition border border-slate-600 hover:border-yellow-400/50"
                  >
                    <p className="font-bold text-white">{curso.nome}</p>
                    <p className="text-sm text-white/70">{curso.ies}</p>
                    {curso.campus && (
                      <p className="text-xs text-white/50 mt-1">📍 {curso.campus}</p>
                    )}
                    {curso.turno && (
                      <p className="text-xs text-white/50">🕐 {curso.turno}</p>
                    )}
                    <p className="text-yellow-300 text-sm mt-2 font-semibold">
                      Nota de Corte: {curso.notaCorte.toFixed(1)} ({curso.anoReferencia})
                    </p>
                  </button>
                ))
              ) : (
                <div className="text-center text-white/50 py-8">
                  {searching ? (
                    <p>Buscando cursos...</p>
                  ) : (
                    <p>Use a busca acima para encontrar cursos</p>
                  )}
                </div>
              )}
            </div>

            {/* Botão fechar */}
            <button
              onClick={() => {
                setShowModal(false);
                setSearch('');
                setCursos([]);
              }}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition text-white font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
