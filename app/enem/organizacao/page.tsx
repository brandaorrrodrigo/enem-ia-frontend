'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface Meta {
  id: string;
  titulo: string;
  tipo: 'diaria' | 'semanal' | 'mensal';
  progresso: number;
  total: number;
  concluida: boolean;
}

interface Habito {
  id: string;
  nome: string;
  emoji: string;
  diasConcluidos: string[];
}

export default function OrganizacaoPage() {
  const router = useRouter();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [showHabitoModal, setShowHabitoModal] = useState(false);
  const [novaMeta, setNovaMeta] = useState({ titulo: '', tipo: 'semanal' as const, total: 5 });
  const [novoHabito, setNovoHabito] = useState({ nome: '', emoji: '📚' });
  const [loading, setLoading] = useState(true);

  const emojisHabito = ['📚', '✍️', '🧠', '📝', '🎯', '⏰', '💪', '🔥', '📖', '🎓'];

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    // Carregar metas do localStorage
    const metasLocal = localStorage.getItem('organizacao_metas');
    if (metasLocal) {
      setMetas(JSON.parse(metasLocal));
    } else {
      const metasIniciais: Meta[] = [
        { id: '1', titulo: 'Fazer 5 simulados esta semana', tipo: 'semanal', progresso: 2, total: 5, concluida: false },
        { id: '2', titulo: 'Estudar 2 horas por dia', tipo: 'diaria', progresso: 0, total: 2, concluida: false },
        { id: '3', titulo: 'Revisar todas as materias', tipo: 'mensal', progresso: 12, total: 20, concluida: false },
      ];
      setMetas(metasIniciais);
      localStorage.setItem('organizacao_metas', JSON.stringify(metasIniciais));
    }

    // Carregar habitos do localStorage
    const habitosLocal = localStorage.getItem('organizacao_habitos');
    if (habitosLocal) {
      setHabitos(JSON.parse(habitosLocal));
    } else {
      const habitosIniciais: Habito[] = [
        { id: '1', nome: 'Revisar flashcards', emoji: '🃏', diasConcluidos: [] },
        { id: '2', nome: 'Ler 30 minutos', emoji: '📖', diasConcluidos: [] },
        { id: '3', nome: 'Fazer exercicios', emoji: '✏️', diasConcluidos: [] },
      ];
      setHabitos(habitosIniciais);
      localStorage.setItem('organizacao_habitos', JSON.stringify(habitosIniciais));
    }

    setLoading(false);
  };

  const salvarMetas = (novasMetas: Meta[]) => {
    setMetas(novasMetas);
    localStorage.setItem('organizacao_metas', JSON.stringify(novasMetas));
  };

  const salvarHabitos = (novosHabitos: Habito[]) => {
    setHabitos(novosHabitos);
    localStorage.setItem('organizacao_habitos', JSON.stringify(novosHabitos));
  };

  const adicionarMeta = () => {
    const meta: Meta = {
      id: Date.now().toString(),
      titulo: novaMeta.titulo,
      tipo: novaMeta.tipo,
      progresso: 0,
      total: novaMeta.total,
      concluida: false,
    };
    salvarMetas([...metas, meta]);
    setShowMetaModal(false);
    setNovaMeta({ titulo: '', tipo: 'semanal', total: 5 });
  };

  const atualizarProgresso = (id: string, incremento: number) => {
    const novasMetas = metas.map(m => {
      if (m.id === id) {
        const novoProgresso = Math.max(0, Math.min(m.progresso + incremento, m.total));
        return {
          ...m,
          progresso: novoProgresso,
          concluida: novoProgresso >= m.total,
        };
      }
      return m;
    });
    salvarMetas(novasMetas);
  };

  const removerMeta = (id: string) => {
    salvarMetas(metas.filter(m => m.id !== id));
  };

  const adicionarHabito = () => {
    const habito: Habito = {
      id: Date.now().toString(),
      nome: novoHabito.nome,
      emoji: novoHabito.emoji,
      diasConcluidos: [],
    };
    salvarHabitos([...habitos, habito]);
    setShowHabitoModal(false);
    setNovoHabito({ nome: '', emoji: '📚' });
  };

  const toggleHabitoHoje = (id: string) => {
    const hoje = new Date().toISOString().split('T')[0];
    const novosHabitos = habitos.map(h => {
      if (h.id === id) {
        const jaFeito = h.diasConcluidos.includes(hoje);
        return {
          ...h,
          diasConcluidos: jaFeito
            ? h.diasConcluidos.filter(d => d !== hoje)
            : [...h.diasConcluidos, hoje],
        };
      }
      return h;
    });
    salvarHabitos(novosHabitos);
  };

  const removerHabito = (id: string) => {
    salvarHabitos(habitos.filter(h => h.id !== id));
  };

  const getHabitoFeitoHoje = (habito: Habito): boolean => {
    const hoje = new Date().toISOString().split('T')[0];
    return habito.diasConcluidos.includes(hoje);
  };

  const getSequenciaHabito = (habito: Habito): number => {
    let sequencia = 0;
    const hoje = new Date();

    for (let i = 0; i < 30; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() - i);
      const dataStr = data.toISOString().split('T')[0];

      if (habito.diasConcluidos.includes(dataStr)) {
        sequencia++;
      } else if (i > 0) {
        break;
      }
    }

    return sequencia;
  };

  const getTipoLabel = (tipo: string): string => {
    switch (tipo) {
      case 'diaria': return '📅 Diaria';
      case 'semanal': return '📆 Semanal';
      case 'mensal': return '🗓️ Mensal';
      default: return tipo;
    }
  };

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  const metasConcluidas = metas.filter(m => m.concluida).length;
  const habitosHoje = habitos.filter(h => getHabitoFeitoHoje(h)).length;

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      {/* Header */}


      <div className="mb-8 pt-16">
        <h1 className="title-ia flex items-center gap-3 mb-2">
          📋 Organizacao e Planejamento
        </h1>
        <p className="subtitle-ia mb-0">
          Defina metas, acompanhe habitos e organize seus estudos
        </p>
      </div>

      {/* Estatisticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{metas.length}</span>
          <span className="stat-ia-label">🎯 Metas Ativas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{metasConcluidas}</span>
          <span className="stat-ia-label">✅ Concluidas</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{habitos.length}</span>
          <span className="stat-ia-label">🔄 Habitos</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{habitosHoje}/{habitos.length}</span>
          <span className="stat-ia-label">📅 Feitos Hoje</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Metas */}
        <div className="card-ia">
          <div className="flex items-center justify-between mb-6">
            <h2 className="title-ia-sm">🎯 Minhas Metas</h2>
            <button onClick={() => setShowMetaModal(true)} className="btn-ia-sm">
              ➕ Nova
            </button>
          </div>

          {metas.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-white/70 mb-4">Nenhuma meta definida</p>
              <button onClick={() => setShowMetaModal(true)} className="btn-ia">
                ➕ Criar Meta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {metas.map((meta) => (
                <div
                  key={meta.id}
                  className={`card-ia-sm ${meta.concluida ? 'bg-green-500/10 border-green-500/30' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className={`text-white font-bold ${meta.concluida ? 'line-through opacity-70' : ''}`}>
                        {meta.titulo}
                      </p>
                      <span className="text-white/60 text-xs">{getTipoLabel(meta.tipo)}</span>
                    </div>
                    <button
                      onClick={() => removerMeta(meta.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="progress-ia">
                        <div
                          className="progress-ia-bar"
                          style={{ width: `${(meta.progresso / meta.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-yellow-300 font-bold text-sm">
                      {meta.progresso}/{meta.total}
                    </span>
                  </div>

                  {!meta.concluida && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => atualizarProgresso(meta.id, -1)}
                        className="btn-ia-secondary text-sm flex-1"
                        disabled={meta.progresso === 0}
                      >
                        ➖
                      </button>
                      <button
                        onClick={() => atualizarProgresso(meta.id, 1)}
                        className="btn-ia text-sm flex-1"
                        disabled={meta.progresso >= meta.total}
                      >
                        ➕ Progresso
                      </button>
                    </div>
                  )}

                  {meta.concluida && (
                    <p className="text-green-400 text-sm mt-3 flex items-center gap-2">
                      ✅ Meta concluida!
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Habitos */}
        <div className="card-ia">
          <div className="flex items-center justify-between mb-6">
            <h2 className="title-ia-sm">🔄 Habitos Diarios</h2>
            <button onClick={() => setShowHabitoModal(true)} className="btn-ia-sm">
              ➕ Novo
            </button>
          </div>

          {habitos.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔄</div>
              <p className="text-white/70 mb-4">Nenhum habito cadastrado</p>
              <button onClick={() => setShowHabitoModal(true)} className="btn-ia">
                ➕ Criar Habito
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {habitos.map((habito) => {
                const feitoHoje = getHabitoFeitoHoje(habito);
                const sequencia = getSequenciaHabito(habito);

                return (
                  <div
                    key={habito.id}
                    className={`card-ia-sm flex items-center justify-between ${
                      feitoHoje ? 'bg-green-500/10 border-green-500/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleHabitoHoje(habito.id)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${
                          feitoHoje
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-white/30 hover:border-yellow-300'
                        }`}
                      >
                        {feitoHoje ? '✓' : habito.emoji}
                      </button>
                      <div>
                        <p className={`text-white font-semibold ${feitoHoje ? 'line-through opacity-70' : ''}`}>
                          {habito.nome}
                        </p>
                        {sequencia > 0 && (
                          <p className="text-yellow-300 text-xs">🔥 {sequencia} dias seguidos</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removerHabito(habito.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Links Rapidos */}
      <div className="card-ia mt-8">
        <h2 className="title-ia-sm mb-6">🚀 Acesso Rapido</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/enem/cronograma')}
            className="card-ia-sm text-center hover:scale-105 transition"
          >
            <div className="text-4xl mb-2">📅</div>
            <p className="text-white font-semibold text-sm">Cronograma</p>
          </button>
          <button
            onClick={() => router.push('/enem/tecnicas')}
            className="card-ia-sm text-center hover:scale-105 transition"
          >
            <div className="text-4xl mb-2">🧠</div>
            <p className="text-white font-semibold text-sm">Tecnicas</p>
          </button>
          <button
            onClick={() => router.push('/enem/simulado')}
            className="card-ia-sm text-center hover:scale-105 transition"
          >
            <div className="text-4xl mb-2">📝</div>
            <p className="text-white font-semibold text-sm">Simulados</p>
          </button>
          <button
            onClick={() => router.push('/enem/dashboard')}
            className="card-ia-sm text-center hover:scale-105 transition"
          >
            <div className="text-4xl mb-2">📊</div>
            <p className="text-white font-semibold text-sm">Dashboard</p>
          </button>
        </div>
      </div>

      {/* Modal Nova Meta */}
      {showMetaModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card-ia max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="title-ia-sm">🎯 Nova Meta</h2>
              <button onClick={() => setShowMetaModal(false)} className="text-white/60 hover:text-white text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Titulo da Meta</label>
                <input
                  type="text"
                  value={novaMeta.titulo}
                  onChange={(e) => setNovaMeta({ ...novaMeta, titulo: e.target.value })}
                  className="input-ia w-full"
                  placeholder="Ex: Fazer 5 simulados"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Tipo</label>
                <select
                  value={novaMeta.tipo}
                  onChange={(e) => setNovaMeta({ ...novaMeta, tipo: e.target.value as any })}
                  className="input-ia w-full"
                >
                  <option value="diaria">📅 Diaria</option>
                  <option value="semanal">📆 Semanal</option>
                  <option value="mensal">🗓️ Mensal</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Quantidade Total</label>
                <input
                  type="number"
                  value={novaMeta.total}
                  onChange={(e) => setNovaMeta({ ...novaMeta, total: Number(e.target.value) })}
                  className="input-ia w-full"
                  min={1}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowMetaModal(false)} className="btn-ia-secondary flex-1">
                  Cancelar
                </button>
                <button
                  onClick={adicionarMeta}
                  disabled={!novaMeta.titulo}
                  className="btn-ia flex-1 disabled:opacity-50"
                >
                  ✅ Criar Meta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Novo Habito */}
      {showHabitoModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card-ia max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="title-ia-sm">🔄 Novo Habito</h2>
              <button onClick={() => setShowHabitoModal(false)} className="text-white/60 hover:text-white text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Nome do Habito</label>
                <input
                  type="text"
                  value={novoHabito.nome}
                  onChange={(e) => setNovoHabito({ ...novoHabito, nome: e.target.value })}
                  className="input-ia w-full"
                  placeholder="Ex: Revisar flashcards"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Emoji</label>
                <div className="flex flex-wrap gap-2">
                  {emojisHabito.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNovoHabito({ ...novoHabito, emoji })}
                      className={`w-10 h-10 rounded-lg text-2xl flex items-center justify-center transition ${
                        novoHabito.emoji === emoji
                          ? 'bg-yellow-300/20 border-2 border-yellow-300'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowHabitoModal(false)} className="btn-ia-secondary flex-1">
                  Cancelar
                </button>
                <button
                  onClick={adicionarHabito}
                  disabled={!novoHabito.nome}
                  className="btn-ia flex-1 disabled:opacity-50"
                >
                  ✅ Criar Habito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChalkBackToTop />
    </div>
  );
}
