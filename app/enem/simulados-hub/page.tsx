'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ChalkBackToTop from '@/components/ChalkBackToTop';

interface Simulado {
  id: string;
  titulo: string;
  tipo: 'completo' | 'area' | 'rapido';
  area?: string;
  questoes: number;
  tempo: number;
  dificuldade: 'facil' | 'medio' | 'dificil';
  fpRecompensa: number;
  descricao: string;
  icone: string;
  cor: string;
  disponivel: boolean;
  tentativas: number;
  melhorNota?: number;
}

interface SimuladoRealizado {
  id: string;
  simuladoId: string;
  data: string;
  acertos: number;
  total: number;
  tempo: number;
  nota: number;
}

const simuladosDisponiveis: Simulado[] = [
  {
    id: 'enem-completo-1',
    titulo: 'ENEM Completo - Edição 1',
    tipo: 'completo',
    questoes: 180,
    tempo: 330,
    dificuldade: 'medio',
    fpRecompensa: 500,
    descricao: 'Simulado completo com 180 questões no formato oficial ENEM',
    icone: '📝',
    cor: 'from-emerald-500 to-emerald-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'enem-completo-2',
    titulo: 'ENEM Completo - Edição 2',
    tipo: 'completo',
    questoes: 180,
    tempo: 330,
    dificuldade: 'medio',
    fpRecompensa: 500,
    descricao: 'Segunda edição do simulado completo ENEM-IA',
    icone: '📋',
    cor: 'from-blue-500 to-blue-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'enem-completo-3',
    titulo: 'ENEM Intensivo - Edição Difícil',
    tipo: 'completo',
    questoes: 180,
    tempo: 300,
    dificuldade: 'dificil',
    fpRecompensa: 750,
    descricao: 'Simulado desafiador para testar seus limites',
    icone: '🔥',
    cor: 'from-red-500 to-red-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'linguagens-1',
    titulo: 'Linguagens e Códigos',
    tipo: 'area',
    area: 'linguagens',
    questoes: 45,
    tempo: 90,
    dificuldade: 'medio',
    fpRecompensa: 150,
    descricao: 'Português, Literatura, Inglês/Espanhol e Artes',
    icone: '📚',
    cor: 'from-purple-500 to-purple-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'redacao-1',
    titulo: 'Redação ENEM',
    tipo: 'area',
    area: 'redacao',
    questoes: 1,
    tempo: 60,
    dificuldade: 'medio',
    fpRecompensa: 200,
    descricao: 'Proposta de redação com tema inédito',
    icone: '✍️',
    cor: 'from-pink-500 to-pink-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'humanas-1',
    titulo: 'Ciências Humanas',
    tipo: 'area',
    area: 'humanas',
    questoes: 45,
    tempo: 90,
    dificuldade: 'medio',
    fpRecompensa: 150,
    descricao: 'História, Geografia, Filosofia e Sociologia',
    icone: '🌍',
    cor: 'from-yellow-500 to-yellow-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'natureza-1',
    titulo: 'Ciências da Natureza',
    tipo: 'area',
    area: 'natureza',
    questoes: 45,
    tempo: 90,
    dificuldade: 'medio',
    fpRecompensa: 150,
    descricao: 'Biologia, Física e Química',
    icone: '🔬',
    cor: 'from-green-500 to-green-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'matematica-1',
    titulo: 'Matemática e suas Tecnologias',
    tipo: 'area',
    area: 'matematica',
    questoes: 45,
    tempo: 90,
    dificuldade: 'medio',
    fpRecompensa: 150,
    descricao: 'Álgebra, Geometria, Estatística e mais',
    icone: '📐',
    cor: 'from-cyan-500 to-cyan-700',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'rapido-linguagens',
    titulo: 'Sprint Linguagens',
    tipo: 'rapido',
    area: 'linguagens',
    questoes: 15,
    tempo: 20,
    dificuldade: 'facil',
    fpRecompensa: 50,
    descricao: 'Revisão rápida de Linguagens',
    icone: '⚡',
    cor: 'from-indigo-400 to-indigo-600',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'rapido-humanas',
    titulo: 'Sprint Humanas',
    tipo: 'rapido',
    area: 'humanas',
    questoes: 15,
    tempo: 20,
    dificuldade: 'facil',
    fpRecompensa: 50,
    descricao: 'Revisão rápida de Humanas',
    icone: '⚡',
    cor: 'from-amber-400 to-amber-600',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'rapido-natureza',
    titulo: 'Sprint Natureza',
    tipo: 'rapido',
    area: 'natureza',
    questoes: 15,
    tempo: 20,
    dificuldade: 'facil',
    fpRecompensa: 50,
    descricao: 'Revisão rápida de Natureza',
    icone: '⚡',
    cor: 'from-teal-400 to-teal-600',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'rapido-matematica',
    titulo: 'Sprint Matemática',
    tipo: 'rapido',
    area: 'matematica',
    questoes: 15,
    tempo: 20,
    dificuldade: 'facil',
    fpRecompensa: 50,
    descricao: 'Revisão rápida de Matemática',
    icone: '⚡',
    cor: 'from-sky-400 to-sky-600',
    disponivel: true,
    tentativas: 0
  },
  {
    id: 'rapido-misto',
    titulo: 'Sprint Misto',
    tipo: 'rapido',
    questoes: 20,
    tempo: 25,
    dificuldade: 'medio',
    fpRecompensa: 75,
    descricao: 'Questões de todas as áreas',
    icone: '🎯',
    cor: 'from-rose-400 to-rose-600',
    disponivel: true,
    tentativas: 0
  }
];

export default function SimuladosHubPage() {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroArea, setFiltroArea] = useState<string>('todas');
  const [historico, setHistorico] = useState<SimuladoRealizado[]>([]);
  const [simuladoSelecionado, setSimuladoSelecionado] = useState<Simulado | null>(null);
  const [mostrarHistorico, setMostrarHistorico] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('enem-simulados-historico');
    if (saved) {
      setHistorico(JSON.parse(saved));
    }
  }, []);

  const tipos = [
    { id: 'todos', label: 'Todos', icone: '📋' },
    { id: 'completo', label: 'Completos', icone: '📝' },
    { id: 'area', label: 'Por Área', icone: '📊' },
    { id: 'rapido', label: 'Rápidos', icone: '⚡' }
  ];

  const areas = [
    { id: 'todas', label: 'Todas', cor: 'bg-gray-600' },
    { id: 'linguagens', label: 'Linguagens', cor: 'bg-purple-600' },
    { id: 'humanas', label: 'Humanas', cor: 'bg-yellow-600' },
    { id: 'natureza', label: 'Natureza', cor: 'bg-green-600' },
    { id: 'matematica', label: 'Matemática', cor: 'bg-cyan-600' },
    { id: 'redacao', label: 'Redação', cor: 'bg-pink-600' }
  ];

  const simuladosFiltrados = simuladosDisponiveis.filter(s => {
    if (filtroTipo !== 'todos' && s.tipo !== filtroTipo) return false;
    if (filtroArea !== 'todas' && s.area !== filtroArea) return false;
    return true;
  });

  const estatisticas = {
    total: historico.length,
    mediaAcertos: historico.length > 0
      ? Math.round(historico.reduce((acc, h) => acc + (h.acertos / h.total * 100), 0) / historico.length)
      : 0,
    tempoTotal: historico.reduce((acc, h) => acc + h.tempo, 0),
    melhorNota: historico.length > 0 ? Math.max(...historico.map(h => h.nota)) : 0
  };

  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas > 0) return `${horas}h ${mins}min`;
    return `${mins} min`;
  };

  const getDificuldadeLabel = (dif: string) => {
    switch (dif) {
      case 'facil': return { label: 'Fácil', cor: 'bg-green-500' };
      case 'medio': return { label: 'Médio', cor: 'bg-yellow-500' };
      case 'dificil': return { label: 'Difícil', cor: 'bg-red-500' };
      default: return { label: 'Médio', cor: 'bg-yellow-500' };
    }
  };

  const iniciarSimulado = (simulado: Simulado) => {
    localStorage.setItem('enem-simulado-atual', JSON.stringify(simulado));
    window.location.href = `/enem/simulado/${simulado.id}`;
  };

  return (
    <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
      <FloatingNav />
      <ChalkBackToTop />

      <div className="container-ia py-8">
        <div className="text-center mb-8">
          <h1 className="title-ia text-3xl md:text-4xl mb-4">
            📝 Central de Simulados ENEM-IA
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pratique com simulados completos, por área ou rápidos.
            Acompanhe seu progresso e prepare-se para o ENEM!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-emerald-400">{estatisticas.total}</div>
            <div className="text-gray-400 text-sm">Simulados Feitos</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-blue-400">{estatisticas.mediaAcertos}%</div>
            <div className="text-gray-400 text-sm">Média de Acertos</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-purple-400">{formatarTempo(estatisticas.tempoTotal)}</div>
            <div className="text-gray-400 text-sm">Tempo Total</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-yellow-400">{estatisticas.melhorNota}</div>
            <div className="text-gray-400 text-sm">Melhor Nota</div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMostrarHistorico(!mostrarHistorico)}
            className="btn-ia flex items-center gap-2"
          >
            📊 {mostrarHistorico ? 'Ver Simulados' : 'Ver Histórico'}
          </button>
        </div>

        {mostrarHistorico ? (
          <div className="card-ia p-6">
            <h2 className="text-xl font-bold mb-4">📜 Histórico de Simulados</h2>
            {historico.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Você ainda não realizou nenhum simulado. Comece agora!
              </p>
            ) : (
              <div className="space-y-3">
                {historico.slice().reverse().map((h, idx) => {
                  const simulado = simuladosDisponiveis.find(s => s.id === h.simuladoId);
                  return (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{simulado?.titulo || 'Simulado'}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(h.data).toLocaleDateString('pt-BR')} • {h.acertos}/{h.total} acertos
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">{h.nota}</div>
                        <div className="text-xs text-gray-400">{Math.round(h.acertos/h.total*100)}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tipos.map(tipo => (
                <button
                  key={tipo.id}
                  onClick={() => setFiltroTipo(tipo.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filtroTipo === tipo.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tipo.icone} {tipo.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {areas.map(area => (
                <button
                  key={area.id}
                  onClick={() => setFiltroArea(area.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filtroArea === area.id
                      ? `${area.cor} text-white`
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {simuladosFiltrados.map(simulado => {
                const dif = getDificuldadeLabel(simulado.dificuldade);
                const historicoSimulado = historico.filter(h => h.simuladoId === simulado.id);
                const melhorResultado = historicoSimulado.length > 0
                  ? Math.max(...historicoSimulado.map(h => h.nota))
                  : null;

                return (
                  <div
                    key={simulado.id}
                    className="card-ia overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
                    onClick={() => setSimuladoSelecionado(simulado)}
                  >
                    <div className={`bg-gradient-to-r ${simulado.cor} p-4`}>
                      <div className="flex items-center justify-between">
                        <span className="text-4xl">{simulado.icone}</span>
                        <span className={`${dif.cor} px-2 py-1 rounded text-xs font-bold`}>
                          {dif.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mt-2">{simulado.titulo}</h3>
                    </div>

                    <div className="p-4">
                      <p className="text-gray-400 text-sm mb-3">{simulado.descricao}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs">
                          📝 {simulado.questoes} questões
                        </span>
                        <span className="bg-white/10 px-2 py-1 rounded text-xs">
                          ⏱️ {formatarTempo(simulado.tempo)}
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">
                          🎯 +{simulado.fpRecompensa} FP
                        </span>
                      </div>

                      {melhorResultado && (
                        <div className="bg-yellow-500/20 rounded p-2 mb-3 text-center">
                          <span className="text-yellow-400 text-sm">
                            🏆 Melhor nota: {melhorResultado}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          iniciarSimulado(simulado);
                        }}
                        className="w-full btn-ia py-2"
                      >
                        {historicoSimulado.length > 0 ? 'Refazer Simulado' : 'Iniciar Simulado'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {simuladoSelecionado && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSimuladoSelecionado(null)}
          >
            <div
              className="bg-[#1a2f33] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-r ${simuladoSelecionado.cor} p-6 rounded-t-2xl`}>
                <div className="text-5xl mb-3">{simuladoSelecionado.icone}</div>
                <h2 className="text-2xl font-bold">{simuladoSelecionado.titulo}</h2>
                <p className="text-white/80 mt-2">{simuladoSelecionado.descricao}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{simuladoSelecionado.questoes}</div>
                    <div className="text-gray-400 text-sm">Questões</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">{formatarTempo(simuladoSelecionado.tempo)}</div>
                    <div className="text-gray-400 text-sm">Duração</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-400">+{simuladoSelecionado.fpRecompensa}</div>
                    <div className="text-gray-400 text-sm">FP Recompensa</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold">
                      {getDificuldadeLabel(simuladoSelecionado.dificuldade).label}
                    </div>
                    <div className="text-gray-400 text-sm">Dificuldade</div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-yellow-400 mb-2">⚠️ Instruções</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• O tempo começará a contar assim que iniciar</li>
                    <li>• Você pode pausar e retomar depois</li>
                    <li>• Suas respostas são salvas automaticamente</li>
                    <li>• Ao finalizar, você verá seu resultado detalhado</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSimuladoSelecionado(null)}
                    className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => iniciarSimulado(simuladoSelecionado)}
                    className="flex-1 btn-ia py-3"
                  >
                    🚀 Iniciar Agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 card-ia p-6">
          <h2 className="text-xl font-bold mb-4">💡 Dicas para Simulados</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-emerald-400 mb-2">🎯 Simulado Completo</h3>
              <p className="text-sm text-gray-400">
                Faça em ambiente silencioso, sem interrupções. Simule as condições reais do ENEM.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-blue-400 mb-2">📊 Por Área</h3>
              <p className="text-sm text-gray-400">
                Ideal para identificar pontos fracos e focar o estudo em áreas específicas.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-purple-400 mb-2">⚡ Rápidos</h3>
              <p className="text-sm text-gray-400">
                Perfeitos para revisão diária e manter o ritmo de estudos.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-yellow-400 mb-2">📈 Evolução</h3>
              <p className="text-sm text-gray-400">
                Refaça simulados para ver sua evolução. A prática leva à perfeição!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
