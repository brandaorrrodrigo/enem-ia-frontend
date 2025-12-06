'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  const [abaAtiva, setAbaAtiva] = useState<'plataformas' | 'youtube'>('plataformas');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'gratuita' | 'freemium' | 'paga'>('todos');

  const plataformasFiltradas = plataformasCompletas.filter(p =>
    filtroTipo === 'todos' || p.tipo === filtroTipo
  );

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'gratuita':
        return <span className="badge" style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}>GRATUITA</span>;
      case 'freemium':
        return <span className="badge" style={{ borderColor: 'var(--accent-yellow)', color: 'var(--accent-yellow)' }}>FREEMIUM</span>;
      case 'paga':
        return <span className="badge" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>PAGA</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>🎬 Videoaulas</h1>
        <p>Plataformas e canais recomendados para o ENEM</p>
      </div>

      {/* Estatisticas */}
      <div className="stats-bar">
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{plataformasCompletas.length}</div>
          <div className="stat-label">Plataformas</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{canaisYoutube.length}</div>
          <div className="stat-label">Canais YouTube</div>
        </div>
        <div className="stat-item" style={{ flexDirection: 'column', gap: '0' }}>
          <div className="stat-number">{plataformasCompletas.filter(p => p.tipo === 'gratuita').length}</div>
          <div className="stat-label">Gratuitas</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card" style={{ marginBottom: '35px' }}>
        <h2 className="card-title">📋 Escolha o Tipo</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setAbaAtiva('plataformas')}
            className={abaAtiva === 'plataformas' ? 'btn btn-yellow' : 'btn'}
          >
            🎓 Plataformas
          </button>
          <button
            onClick={() => setAbaAtiva('youtube')}
            className={abaAtiva === 'youtube' ? 'btn btn-yellow' : 'btn'}
          >
            📺 YouTube
          </button>
        </div>
      </div>

      {/* Plataformas Completas */}
      {abaAtiva === 'plataformas' && (
        <>
          {/* Filtro */}
          <div className="card" style={{ marginBottom: '30px' }}>
            <h2 className="card-title">🔍 Filtrar por Tipo</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { value: 'todos', label: 'Todas' },
                { value: 'gratuita', label: '🆓 Gratuitas' },
                { value: 'freemium', label: '⭐ Freemium' },
                { value: 'paga', label: '💳 Pagas' },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFiltroTipo(f.value as any)}
                  className={filtroTipo === f.value ? 'btn btn-yellow' : 'btn'}
                  style={{ fontSize: '0.875rem' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="category">
            <div className="category-title"><span>🎓</span>Plataformas Completas</div>
            <div className="cards-grid">
              {plataformasFiltradas.map((plat) => (
                <div key={plat.id} className="chalkboard-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{plat.icone}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--chalk-white)' }}>{plat.nome}</h3>
                      {getTipoBadge(plat.tipo)}
                    </div>
                  </div>

                  <p style={{ marginBottom: '1rem', color: 'var(--chalk-dim)', lineHeight: '1.5' }}>{plat.descricao}</p>

                  {/* Recursos */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {plat.recursos.map((rec, idx) => (
                      <span
                        key={idx}
                        className="badge"
                        style={{ fontSize: '0.75rem', borderColor: 'var(--chalk-faint)', color: 'var(--chalk-dim)' }}
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
                    className="btn btn-yellow"
                    style={{ width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none' }}
                  >
                    🔗 Acessar {plat.nome}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Canais YouTube */}
      {abaAtiva === 'youtube' && (
        <div className="category">
          <div className="category-title"><span>📺</span>Canais do YouTube</div>
          <div className="cards-grid">
            {canaisYoutube.map((canal) => (
              <div key={canal.id} className="chalkboard-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: 'var(--accent-red)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    {canal.icone}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--chalk-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{canal.nome}</h3>
                    <p style={{ color: 'var(--accent-red)', fontSize: '0.875rem', margin: '0.25rem 0 0 0', fontWeight: 600 }}>{canal.inscritos} inscritos</p>
                  </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--chalk-dim)', marginBottom: '0.75rem', lineHeight: '1.5' }}>{canal.descricao}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
                  {canal.disciplinas.map((disc, idx) => (
                    <span
                      key={idx}
                      className="badge"
                      style={{
                        borderColor: 'var(--accent-red)',
                        color: 'var(--accent-red)',
                        fontSize: '0.75rem'
                      }}
                    >
                      {disc}
                    </span>
                  ))}
                </div>

                <a
                  href={canal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  📺 Ver Canal
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dica */}
      <div className="card" style={{ marginTop: '40px', backgroundColor: 'rgba(14, 165, 233, 0.1)', borderColor: 'var(--accent-blue)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>💡</span>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', color: 'var(--accent-blue)' }}>Dica de Estudo</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', lineHeight: '1.75', color: 'var(--chalk-dim)' }}>
              <li>• Assista as aulas em velocidade 1.5x ou 2x para otimizar tempo</li>
              <li>• Faca anotacoes enquanto assiste</li>
              <li>• Pratique exercicios logo apos a aula</li>
              <li>• Use o Pomodoro para manter o foco</li>
            </ul>
          </div>
        </div>
      </div>

      <footer>
        <p><Link href="/enem">← Voltar ao Painel</Link></p>
      </footer>
    </div>
  );
}
