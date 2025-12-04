'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Plataforma {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
  url: string;
  tipo: 'gratuita' | 'paga' | 'freemium';
  recursos: string[];
}

interface CanalYoutube {
  id: string;
  nome: string;
  descricao: string;
  inscritos: string;
  url: string;
  disciplinas: string[];
  icone: string;
}

const plataformasCompletas: Plataforma[] = [
  {
    id: '1',
    nome: 'Khan Academy',
    descricao: 'Plataforma gratuita com milhares de videoaulas e exercicios. Conteudo de matematica, ciencias e muito mais.',
    icone: '🎓',
    cor: 'from-green-500 to-emerald-600',
    url: 'https://pt.khanacademy.org/',
    tipo: 'gratuita',
    recursos: ['Videoaulas', 'Exercicios', 'Progresso', 'Certificados'],
  },
  {
    id: '2',
    nome: 'Coursera',
    descricao: 'Cursos de universidades renomadas do mundo todo. Muitos cursos gratuitos disponiveis.',
    icone: '🌐',
    cor: 'from-blue-500 to-blue-700',
    url: 'https://www.coursera.org/',
    tipo: 'freemium',
    recursos: ['Cursos universitarios', 'Certificados', 'Projetos praticos'],
  },
  {
    id: '3',
    nome: 'Stoodi',
    descricao: 'Plataforma brasileira focada em ENEM e vestibulares com videoaulas e exercicios.',
    icone: '📚',
    cor: 'from-purple-500 to-purple-700',
    url: 'https://www.stoodi.com.br/',
    tipo: 'freemium',
    recursos: ['Foco no ENEM', 'Plano de estudos', 'Simulados', 'Correcao de redacao'],
  },
  {
    id: '4',
    nome: 'Descomplica',
    descricao: 'Uma das maiores plataformas de educacao do Brasil com professores renomados.',
    icone: '🚀',
    cor: 'from-red-500 to-orange-500',
    url: 'https://descomplica.com.br/',
    tipo: 'paga',
    recursos: ['Professores top', 'Monitoria', 'App mobile', 'Material PDF'],
  },
  {
    id: '5',
    nome: 'Me Salva!',
    descricao: 'Videoaulas de exatas com didatica excelente. Ideal para quem tem dificuldade em matematica e fisica.',
    icone: '🆘',
    cor: 'from-cyan-500 to-teal-500',
    url: 'https://www.mesalva.com/',
    tipo: 'freemium',
    recursos: ['Foco em exatas', 'Exercicios resolvidos', 'Resumos'],
  },
  {
    id: '6',
    nome: 'Brasil Escola',
    descricao: 'Portal educacional gratuito com videoaulas, artigos e exercicios de todas as materias.',
    icone: '🇧🇷',
    cor: 'from-yellow-500 to-green-500',
    url: 'https://brasilescola.uol.com.br/',
    tipo: 'gratuita',
    recursos: ['Artigos', 'Videoaulas', 'Exercicios', 'Dicas ENEM'],
  },
];

const canaisYoutube: CanalYoutube[] = [
  {
    id: '1',
    nome: 'Professor Ferretto',
    descricao: 'Um dos melhores canais de matematica do Brasil. Didatica incrivel!',
    inscritos: '4M+',
    url: 'https://www.youtube.com/@ProfessorFerretto',
    disciplinas: ['Matematica'],
    icone: '📐',
  },
  {
    id: '2',
    nome: 'Fisica Total',
    descricao: 'Prof. Ivys Urquiza explica fisica de forma simples e direta.',
    inscritos: '1.5M+',
    url: 'https://www.youtube.com/@FisicaTotal',
    disciplinas: ['Fisica'],
    icone: '⚡',
  },
  {
    id: '3',
    nome: 'Se Liga Nessa Historia',
    descricao: 'Historia e atualidades com linguagem jovem e dinamica.',
    inscritos: '800K+',
    url: 'https://www.youtube.com/@SeLigaNessaHistoria',
    disciplinas: ['Historia', 'Atualidades'],
    icone: '🌍',
  },
  {
    id: '4',
    nome: 'Quimica Simples',
    descricao: 'Quimica descomplicada com experimentos e explicacoes claras.',
    inscritos: '600K+',
    url: 'https://www.youtube.com/@QuimicaSimples',
    disciplinas: ['Quimica'],
    icone: '🧪',
  },
  {
    id: '5',
    nome: 'Redacao e Gramatica',
    descricao: 'Dicas de redacao e gramatica para nota 1000.',
    inscritos: '500K+',
    url: 'https://www.youtube.com/@RedacaoeGramatica',
    disciplinas: ['Redacao', 'Portugues'],
    icone: '✍️',
  },
  {
    id: '6',
    nome: 'Biologia Total',
    descricao: 'Prof. Jubilut com aulas de biologia super didaticas.',
    inscritos: '3M+',
    url: 'https://www.youtube.com/@BiologiaTotal',
    disciplinas: ['Biologia'],
    icone: '🧬',
  },
  {
    id: '7',
    nome: 'Professor Noslen',
    descricao: 'Portugues e literatura com muito bom humor.',
    inscritos: '2M+',
    url: 'https://www.youtube.com/@ProfessorNoslen',
    disciplinas: ['Portugues', 'Literatura'],
    icone: '📖',
  },
  {
    id: '8',
    nome: 'Geografia Irada',
    descricao: 'Geografia atualizada e contexto para o ENEM.',
    inscritos: '400K+',
    url: 'https://www.youtube.com/@GeografiaIrada',
    disciplinas: ['Geografia'],
    icone: '🗺️',
  },
];

export default function VideoaulasPage() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState<'plataformas' | 'youtube'>('plataformas');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'gratuita' | 'freemium' | 'paga'>('todos');

  const plataformasFiltradas = plataformasCompletas.filter(p =>
    filtroTipo === 'todos' || p.tipo === filtroTipo
  );

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'gratuita':
        return <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-400/30">GRATUITA</span>;
      case 'freemium':
        return <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-400/30">FREEMIUM</span>;
      case 'paga':
        return <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full border border-red-400/30">PAGA</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />

      {/* Header */}
      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">
          🎬 Videoaulas
        </h1>
        <p className="subtitle-ia mb-0">
          Plataformas e canais recomendados para estudar para o ENEM
        </p>
      </div>

      {/* Slogan */}
      <div className="card-ia p-4 mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 text-center">
        <p className="text-yellow-300 font-bold italic">
          "Diversao e conhecimento: a combinacao perfeita para sua aprovacao!"
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAbaAtiva('plataformas')}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            abaAtiva === 'plataformas'
              ? 'bg-yellow-400 text-slate-900'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          🎓 Plataformas Completas
        </button>
        <button
          onClick={() => setAbaAtiva('youtube')}
          className={`px-6 py-3 rounded-xl font-bold transition ${
            abaAtiva === 'youtube'
              ? 'bg-yellow-400 text-slate-900'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          📺 Canais do YouTube
        </button>
      </div>

      {/* Plataformas Completas */}
      {abaAtiva === 'plataformas' && (
        <>
          {/* Filtro */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { value: 'todos', label: 'Todas' },
              { value: 'gratuita', label: '🆓 Gratuitas' },
              { value: 'freemium', label: '⭐ Freemium' },
              { value: 'paga', label: '💳 Pagas' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFiltroTipo(f.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                  filtroTipo === f.value
                    ? 'bg-white text-slate-900'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {plataformasFiltradas.map((plat) => (
              <div
                key={plat.id}
                className="card-ia overflow-hidden hover:scale-[1.02] transition-transform"
              >
                {/* Header colorido */}
                <div className={`bg-gradient-to-r ${plat.cor} p-4 -mx-5 -mt-5 mb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{plat.icone}</span>
                      <h3 className="text-white font-bold text-xl">{plat.nome}</h3>
                    </div>
                    {getTipoBadge(plat.tipo)}
                  </div>
                </div>

                <p className="text-white/80 mb-4">{plat.descricao}</p>

                {/* Recursos */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {plat.recursos.map((rec, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded"
                    >
                      {rec}
                    </span>
                  ))}
                </div>

                {/* Botao */}
                <a
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ia w-full py-3 text-center block"
                >
                  🔗 Acessar {plat.nome}
                </a>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Canais YouTube */}
      {abaAtiva === 'youtube' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {canaisYoutube.map((canal) => (
            <div
              key={canal.id}
              className="card-ia hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {canal.icone}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold truncate">{canal.nome}</h3>
                  <p className="text-red-400 text-sm">{canal.inscritos} inscritos</p>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-3">{canal.descricao}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {canal.disciplinas.map((disc, idx) => (
                  <span
                    key={idx}
                    className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded border border-red-400/30"
                  >
                    {disc}
                  </span>
                ))}
              </div>

              <a
                href={canal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ia-secondary w-full py-2 text-center block text-sm"
              >
                📺 Ver Canal
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Dica */}
      <div className="card-ia p-6 mt-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30">
        <div className="flex items-start gap-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="text-white font-bold mb-2">Dica de Estudo</h3>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Assista as aulas em velocidade 1.5x ou 2x para otimizar tempo</li>
              <li>• Faca anotacoes enquanto assiste</li>
              <li>• Pratique exercicios logo apos a aula</li>
              <li>• Use o Pomodoro para manter o foco</li>
            </ul>
          </div>
        </div>
      </div>

      <ChalkBackToTop />
    </div>
  );
}
