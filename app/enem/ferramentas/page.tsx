'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
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
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">🛠️ Ferramentas Tecnologicas</h1>
        <p className="subtitle-ia mb-4">Apps e recursos para turbinar seus estudos</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{FERRAMENTAS.length}</span>
          <span className="stat-ia-label">Ferramentas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value text-green-400">{ferramentasInternas.length}</span>
          <span className="stat-ia-label">ENEM-IA</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value text-blue-400">{ferramentasExternas.length}</span>
          <span className="stat-ia-label">Externas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value text-yellow-300">{FERRAMENTAS.filter(f => f.gratuito).length}</span>
          <span className="stat-ia-label">Gratuitas</span>
        </div>
      </div>

      <div className="card-ia mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <p className="text-white/60 text-sm mb-2">Categoria:</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => (
                <button key={cat.id} onClick={() => setCategoriaAtiva(cat.id)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition flex items-center gap-1 ${categoriaAtiva === cat.id ? 'bg-yellow-400 text-slate-900' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                  <span>{cat.emoji}</span><span>{cat.nome}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={apenasInternas} onChange={(e) => setApenasInternas(e.target.checked)} className="w-5 h-5 rounded accent-yellow-400" />
            <span className="text-white/70">Apenas ferramentas ENEM-IA</span>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">🌟 Ferramentas ENEM-IA</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ferramentasFiltradas.filter(f => f.interno).map((ferramenta) => (
            <div key={ferramenta.id} onClick={() => handleClick(ferramenta)} className="card-ia hover:scale-[1.02] transition-all cursor-pointer group relative">
              <div className="absolute top-3 right-3">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs font-bold">ENEM-IA</span>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${ferramenta.cor} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                {ferramenta.icone}
              </div>
              <h3 className="text-white font-bold mb-2">{ferramenta.nome}</h3>
              <p className="text-white/60 text-sm mb-4">{ferramenta.descricao}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 capitalize">{ferramenta.categoria}</span>
                <button className="btn-ia text-sm py-1 px-3">Acessar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!apenasInternas && (
        <div className="mb-8">
          <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">🔗 Ferramentas Externas Recomendadas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ferramentasFiltradas.filter(f => !f.interno).map((ferramenta) => (
              <div key={ferramenta.id} onClick={() => handleClick(ferramenta)} className="card-ia hover:scale-[1.02] transition-all cursor-pointer group relative">
                <div className="absolute top-3 right-3">
                  {ferramenta.gratuito ? (
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold">Gratuito</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold">Pago</span>
                  )}
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${ferramenta.cor} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition`}>
                  {ferramenta.icone}
                </div>
                <h3 className="text-white font-bold mb-2">{ferramenta.nome}</h3>
                <p className="text-white/60 text-sm mb-4">{ferramenta.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40 capitalize">{ferramenta.categoria}</span>
                  <button className="btn-ia-secondary text-sm py-1 px-3">Abrir ↗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-ia bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="text-white font-bold mb-2">Dica: Combine as Ferramentas!</h3>
            <p className="text-white/70">Use o Pomodoro para gerenciar seu tempo, os Cadernos Inteligentes para estudar, o Gerador de Questoes para praticar, e o Chatbot para tirar duvidas. Assim voce aproveita o maximo da plataforma ENEM-IA!</p>
          </div>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
