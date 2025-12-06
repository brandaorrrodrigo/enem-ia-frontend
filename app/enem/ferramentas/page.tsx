'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';

interface Ferramenta {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  categoria: string;
  gratuito: boolean;
  link?: string;
  interno?: boolean;
  rota?: string;
}

const FERRAMENTAS: Ferramenta[] = [
  // FERRAMENTAS INTERNAS
  { id: '1', nome: 'Simulados ENEM', descricao: 'Faca simulados com questoes reais do ENEM e receba sua nota TRI.', icone: '📝', cor: 'from-blue-500 to-cyan-500', categoria: 'estudo', gratuito: true, interno: true, rota: '/enem/simulado' },
  { id: '2', nome: 'Gerador de Questoes IA', descricao: 'Gere questoes personalizadas com inteligencia artificial.', icone: '🤖', cor: 'from-purple-500 to-pink-500', categoria: 'estudo', gratuito: true, interno: true, rota: '/enem/gerador-questoes' },
  { id: '3', nome: 'Pomodoro Timer', descricao: 'Timer para estudos com a tecnica Pomodoro.', icone: '🍅', cor: 'from-red-500 to-orange-500', categoria: 'produtividade', gratuito: true, interno: true, rota: '/enem/pomodoro' },
  { id: '4', nome: 'Chatbot ENEM-IA', descricao: 'Tire duvidas com nosso assistente de estudos.', icone: '💬', cor: 'from-green-500 to-emerald-500', categoria: 'estudo', gratuito: true, interno: true, rota: '/enem/chatbot' },
  { id: '5', nome: 'Cronograma de Estudos', descricao: 'Organize seu plano de estudos semanal.', icone: '📅', cor: 'from-yellow-500 to-orange-500', categoria: 'produtividade', gratuito: true, interno: true, rota: '/enem/cronograma' },
  { id: '6', nome: 'Cadernos Inteligentes', descricao: 'Material de estudo completo organizado por area.', icone: '📚', cor: 'from-indigo-500 to-violet-500', categoria: 'estudo', gratuito: true, interno: true, rota: '/enem/biblioteca' },
  { id: '7', nome: 'Videoaulas', descricao: 'Aulas em video dos principais conteudos.', icone: '🎬', cor: 'from-pink-500 to-rose-500', categoria: 'estudo', gratuito: true, interno: true, rota: '/enem/videoaulas' },
  { id: '8', nome: 'Desafios Diarios', descricao: 'Desafios e metas diarias para manter o foco.', icone: '🎯', cor: 'from-cyan-500 to-blue-500', categoria: 'gamificacao', gratuito: true, interno: true, rota: '/enem/desafios' },
  { id: '9', nome: 'Ranking', descricao: 'Compita com outros estudantes e suba no ranking.', icone: '🏆', cor: 'from-amber-500 to-yellow-500', categoria: 'gamificacao', gratuito: true, interno: true, rota: '/enem/ranking' },
  { id: '10', nome: 'Gestao de Tempo', descricao: 'Tecnicas e estrategias para otimizar seus estudos.', icone: '⏰', cor: 'from-teal-500 to-cyan-500', categoria: 'produtividade', gratuito: true, interno: true, rota: '/enem/gestao-tempo' },

  // FERRAMENTAS EXTERNAS RECOMENDADAS
  { id: '11', nome: 'Notion', descricao: 'Organize suas anotacoes, resumos e planejamentos.', icone: '📓', cor: 'from-gray-600 to-gray-800', categoria: 'produtividade', gratuito: true, link: 'https://notion.so' },
  { id: '12', nome: 'Anki', descricao: 'Flashcards com repeticao espacada para memorizar.', icone: '🃏', cor: 'from-blue-600 to-blue-800', categoria: 'estudo', gratuito: true, link: 'https://apps.ankiweb.net' },
  { id: '13', nome: 'Forest', descricao: 'App para manter o foco plantando arvores virtuais.', icone: '🌳', cor: 'from-green-600 to-green-800', categoria: 'produtividade', gratuito: false, link: 'https://forestapp.cc' },
  { id: '14', nome: 'Quizlet', descricao: 'Crie e estude com flashcards interativos.', icone: '📚', cor: 'from-indigo-600 to-indigo-800', categoria: 'estudo', gratuito: true, link: 'https://quizlet.com' },
  { id: '15', nome: 'Google Calendar', descricao: 'Organize sua rotina e compromissos de estudo.', icone: '📆', cor: 'from-blue-500 to-blue-700', categoria: 'produtividade', gratuito: true, link: 'https://calendar.google.com' },
  { id: '16', nome: 'Wolfram Alpha', descricao: 'Resolva problemas de matematica passo a passo.', icone: '🔢', cor: 'from-orange-600 to-red-600', categoria: 'estudo', gratuito: true, link: 'https://wolframalpha.com' },
  { id: '17', nome: 'Spotify Focus', descricao: 'Playlists para concentracao e estudo.', icone: '🎵', cor: 'from-green-500 to-green-700', categoria: 'produtividade', gratuito: true, link: 'https://open.spotify.com/genre/focus-page' },
  { id: '18', nome: 'Khan Academy', descricao: 'Aulas gratuitas de matematica e ciencias.', icone: '🎓', cor: 'from-teal-600 to-teal-800', categoria: 'estudo', gratuito: true, link: 'https://pt.khanacademy.org' },
];

const CATEGORIAS = [
  { id: 'todos', nome: 'Todas', emoji: '📦' },
  { id: 'estudo', nome: 'Estudo', emoji: '📚' },
  { id: 'produtividade', nome: 'Produtividade', emoji: '⚡' },
  { id: 'gamificacao', nome: 'Gamificacao', emoji: '🎮' },
];

export default function FerramentasPage() {
  const router = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [apenasInternas, setApenasInternas] = useState(false);

  const ferramentasFiltradas = FERRAMENTAS.filter(f => {
    const matchCategoria = categoriaAtiva === 'todos' || f.categoria === categoriaAtiva;
    const matchInternas = !apenasInternas || f.interno;
    return matchCategoria && matchInternas;
  });

  const ferramentasInternas = FERRAMENTAS.filter(f => f.interno);
  const ferramentasExternas = FERRAMENTAS.filter(f => !f.interno);

  const handleClick = (ferramenta: Ferramenta) => {
    if (ferramenta.interno && ferramenta.rota) {
      router.push(ferramenta.rota);
    } else if (ferramenta.link) {
      window.open(ferramenta.link, '_blank');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--chalkboard-bg)' }}>
      <FloatingNav />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 pt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3" style={{
          color: 'var(--chalk-white)',
          fontFamily: 'var(--font-handwriting)'
        }}>
          🛠️ Ferramentas Tecnologicas
        </h1>
        <p className="text-lg md:text-xl" style={{ color: 'var(--chalk-dim)' }}>
          Apps e recursos para turbinar seus estudos
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 text-center" style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '0.5rem'
          }}>
            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--chalk-white)' }}>
              {FERRAMENTAS.length}
            </div>
            <div className="text-sm" style={{ color: 'var(--chalk-dim)' }}>Ferramentas</div>
          </div>

          <div className="card p-4 text-center" style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '0.5rem'
          }}>
            <div className="text-3xl font-bold mb-1" style={{ color: '#4ade80' }}>
              {ferramentasInternas.length}
            </div>
            <div className="text-sm" style={{ color: 'var(--chalk-dim)' }}>ENEM-IA</div>
          </div>

          <div className="card p-4 text-center" style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '0.5rem'
          }}>
            <div className="text-3xl font-bold mb-1" style={{ color: '#60a5fa' }}>
              {ferramentasExternas.length}
            </div>
            <div className="text-sm" style={{ color: 'var(--chalk-dim)' }}>Externas</div>
          </div>

          <div className="card p-4 text-center" style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '0.5rem'
          }}>
            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent-yellow)' }}>
              {FERRAMENTAS.filter(f => f.gratuito).length}
            </div>
            <div className="text-sm" style={{ color: 'var(--chalk-dim)' }}>Gratuitas</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="card p-6 mb-8" style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '0.75rem'
        }}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <p className="text-sm mb-3 font-semibold" style={{ color: 'var(--chalk-dim)' }}>
                Categoria:
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                    style={{
                      backgroundColor: categoriaAtiva === cat.id ? 'var(--accent-yellow)' : 'rgba(255, 255, 255, 0.1)',
                      color: categoriaAtiva === cat.id ? 'var(--chalkboard-bg)' : 'var(--chalk-dim)',
                      border: categoriaAtiva === cat.id ? 'none' : '2px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.nome}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={apenasInternas}
                onChange={(e) => setApenasInternas(e.target.checked)}
                className="w-5 h-5 rounded"
                style={{ accentColor: 'var(--accent-yellow)' }}
              />
              <span style={{ color: 'var(--chalk-dim)' }}>Apenas ferramentas ENEM-IA</span>
            </label>
          </div>
        </div>

        {/* Ferramentas ENEM-IA */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{
            color: 'var(--chalk-white)',
            fontFamily: 'var(--font-handwriting)'
          }}>
            🌟 Ferramentas ENEM-IA
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ferramentasFiltradas.filter(f => f.interno).map((ferramenta) => (
              <div
                key={ferramenta.id}
                onClick={() => handleClick(ferramenta)}
                className="chalkboard-card group cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <div className="absolute top-4 right-4">
                  <span className="badge" style={{
                    backgroundColor: 'rgba(74, 222, 128, 0.2)',
                    color: '#4ade80',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    ENEM-IA
                  </span>
                </div>

                <div className={`w-14 h-14 bg-gradient-to-br ${ferramenta.cor} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                  {ferramenta.icone}
                </div>

                <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--chalk-white)' }}>
                  {ferramenta.nome}
                </h3>

                <p className="text-sm mb-4" style={{ color: 'var(--chalk-dim)' }}>
                  {ferramenta.descricao}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs capitalize" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                    {ferramenta.categoria}
                  </span>
                  <button className="btn btn-yellow" style={{
                    backgroundColor: 'var(--accent-yellow)',
                    color: 'var(--chalkboard-bg)',
                    padding: '0.25rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Acessar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ferramentas Externas */}
        {!apenasInternas && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{
              color: 'var(--chalk-white)',
              fontFamily: 'var(--font-handwriting)'
            }}>
              🔗 Ferramentas Externas Recomendadas
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ferramentasFiltradas.filter(f => !f.interno).map((ferramenta) => (
                <div
                  key={ferramenta.id}
                  onClick={() => handleClick(ferramenta)}
                  className="chalkboard-card group cursor-pointer"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div className="absolute top-4 right-4">
                    {ferramenta.gratuito ? (
                      <span className="badge" style={{
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        color: '#60a5fa',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        Gratuito
                      </span>
                    ) : (
                      <span className="badge" style={{
                        backgroundColor: 'rgba(250, 204, 21, 0.2)',
                        color: '#facc15',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        Pago
                      </span>
                    )}
                  </div>

                  <div className={`w-14 h-14 bg-gradient-to-br ${ferramenta.cor} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                    {ferramenta.icone}
                  </div>

                  <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--chalk-white)' }}>
                    {ferramenta.nome}
                  </h3>

                  <p className="text-sm mb-4" style={{ color: 'var(--chalk-dim)' }}>
                    {ferramenta.descricao}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs capitalize" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                      {ferramenta.categoria}
                    </span>
                    <button className="btn" style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'var(--chalk-white)',
                      padding: '0.25rem 1rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer'
                    }}>
                      Abrir ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dica */}
        <div className="card p-6" style={{
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          borderColor: 'rgba(168, 85, 247, 0.3)',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '0.75rem'
        }}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="font-bold mb-2 text-lg" style={{ color: 'var(--chalk-white)' }}>
                Dica: Combine as Ferramentas!
              </h3>
              <p style={{ color: 'var(--chalk-dim)' }}>
                Use o Pomodoro para gerenciar seu tempo, os Cadernos Inteligentes para estudar, o Gerador de Questoes para praticar, e o Chatbot para tirar duvidas. Assim voce aproveita o maximo da plataforma ENEM-IA!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer mt-12 pt-8 pb-4 text-center" style={{
          borderTop: '2px solid var(--border-color)'
        }}>
          <a
            href="/enem"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--chalk-white)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
