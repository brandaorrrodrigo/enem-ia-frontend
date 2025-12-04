'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChalkBackToTop from '@/components/ChalkBackToTop';
import FloatingNav from '@/components/FloatingNav';

interface StudyEvent {
  id: string;
  titulo: string;
  disciplina: string;
  data: string;
  horario: string;
  duracao: number;
  concluido: boolean;
  cor: string;
}

interface WeekDay {
  nome: string;
  abrev: string;
  data: Date;
}

export default function CronogramaPage() {
  const router = useRouter();
  const [eventos, setEventos] = useState<StudyEvent[]>([]);
  const [semanaSelecionada, setSemanaSelecionada] = useState<WeekDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    disciplina: 'Matematica',
    data: '',
    horario: '09:00',
    duracao: 60,
  });

  const disciplinas = [
    { value: 'Matematica', label: 'Matematica', cor: 'bg-blue-500', emoji: '📐' },
    { value: 'Linguagens', label: 'Linguagens', cor: 'bg-purple-500', emoji: '📚' },
    { value: 'Ciencias Humanas', label: 'Ciencias Humanas', cor: 'bg-amber-500', emoji: '🌍' },
    { value: 'Ciencias da Natureza', label: 'Ciencias da Natureza', cor: 'bg-green-500', emoji: '🔬' },
    { value: 'Redacao', label: 'Redacao', cor: 'bg-red-500', emoji: '✍️' },
  ];

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    // Gerar dias da semana atual
    const hoje = new Date();
    const primeiroDia = new Date(hoje);
    primeiroDia.setDate(hoje.getDate() - hoje.getDay());

    const diasSemana: WeekDay[] = [];
    const nomeDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const nomeCompleto = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

    for (let i = 0; i < 7; i++) {
      const dia = new Date(primeiroDia);
      dia.setDate(primeiroDia.getDate() + i);
      diasSemana.push({
        nome: nomeCompleto[i],
        abrev: nomeDias[i],
        data: dia,
      });
    }
    setSemanaSelecionada(diasSemana);

    // Carregar eventos do localStorage
    const eventosLocal = localStorage.getItem('cronograma_eventos');
    if (eventosLocal) {
      setEventos(JSON.parse(eventosLocal));
    } else {
      // Eventos exemplo
      const eventosExemplo: StudyEvent[] = [
        {
          id: '1',
          titulo: 'Revisao Equacoes',
          disciplina: 'Matematica',
          data: formatarData(diasSemana[1].data),
          horario: '09:00',
          duracao: 90,
          concluido: false,
          cor: 'bg-blue-500',
        },
        {
          id: '2',
          titulo: 'Interpretacao de Texto',
          disciplina: 'Linguagens',
          data: formatarData(diasSemana[2].data),
          horario: '14:00',
          duracao: 60,
          concluido: true,
          cor: 'bg-purple-500',
        },
        {
          id: '3',
          titulo: 'Historia do Brasil',
          disciplina: 'Ciencias Humanas',
          data: formatarData(diasSemana[3].data),
          horario: '10:00',
          duracao: 120,
          concluido: false,
          cor: 'bg-amber-500',
        },
      ];
      setEventos(eventosExemplo);
      localStorage.setItem('cronograma_eventos', JSON.stringify(eventosExemplo));
    }

    setLoading(false);
  };

  const formatarData = (data: Date): string => {
    return data.toISOString().split('T')[0];
  };

  const adicionarEvento = () => {
    const disciplinaInfo = disciplinas.find(d => d.value === novoEvento.disciplina);
    const evento: StudyEvent = {
      id: Date.now().toString(),
      titulo: novoEvento.titulo,
      disciplina: novoEvento.disciplina,
      data: novoEvento.data,
      horario: novoEvento.horario,
      duracao: novoEvento.duracao,
      concluido: false,
      cor: disciplinaInfo?.cor || 'bg-gray-500',
    };

    const novosEventos = [...eventos, evento];
    setEventos(novosEventos);
    localStorage.setItem('cronograma_eventos', JSON.stringify(novosEventos));
    setShowModal(false);
    setNovoEvento({
      titulo: '',
      disciplina: 'Matematica',
      data: '',
      horario: '09:00',
      duracao: 60,
    });
  };

  const toggleConcluido = (id: string) => {
    const novosEventos = eventos.map(e =>
      e.id === id ? { ...e, concluido: !e.concluido } : e
    );
    setEventos(novosEventos);
    localStorage.setItem('cronograma_eventos', JSON.stringify(novosEventos));
  };

  const removerEvento = (id: string) => {
    const novosEventos = eventos.filter(e => e.id !== id);
    setEventos(novosEventos);
    localStorage.setItem('cronograma_eventos', JSON.stringify(novosEventos));
  };

  const getEventosDia = (data: Date): StudyEvent[] => {
    const dataStr = formatarData(data);
    return eventos.filter(e => e.data === dataStr);
  };

  const isHoje = (data: Date): boolean => {
    const hoje = new Date();
    return data.toDateString() === hoje.toDateString();
  };

  if (loading) {
    return (
      <div className="container-ia min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-ia mx-auto mb-6"></div>
          <p className="title-ia-sm">Carregando cronograma...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ia min-h-screen py-8">
      <FloatingNav />
      {/* Header */}


      <div className="mb-8 pt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="title-ia flex items-center gap-3 mb-2">
              📅 Cronograma de Estudos
            </h1>
            <p className="subtitle-ia mb-0">
              Organize sua rotina de estudos para o ENEM
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn-ia flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            Adicionar Estudo
          </button>
        </div>
      </div>

      {/* Estatisticas da Semana */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-ia">
          <span className="stat-ia-value">{eventos.length}</span>
          <span className="stat-ia-label">📚 Total Planejado</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{eventos.filter(e => e.concluido).length}</span>
          <span className="stat-ia-label">✅ Concluidos</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{eventos.filter(e => !e.concluido).length}</span>
          <span className="stat-ia-label">⏳ Pendentes</span>
        </div>
        <div className="stat-ia">
          <span className="stat-ia-value">{Math.round(eventos.reduce((acc, e) => acc + e.duracao, 0) / 60)}h</span>
          <span className="stat-ia-label">⏱️ Horas Totais</span>
        </div>
      </div>

      {/* Calendario Semanal */}
      <div className="card-ia mb-8">
        <h2 className="title-ia-sm mb-6">🗓️ Esta Semana</h2>

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {semanaSelecionada.map((dia) => (
            <div
              key={dia.abrev}
              className={`rounded-xl p-2 md:p-4 transition-all ${
                isHoje(dia.data)
                  ? 'bg-yellow-300/20 border-2 border-yellow-300'
                  : 'bg-white/5 border-2 border-white/10'
              }`}
            >
              <div className="text-center mb-3">
                <p className={`text-xs md:text-sm font-bold ${isHoje(dia.data) ? 'text-yellow-300' : 'text-white/60'}`}>
                  {dia.abrev}
                </p>
                <p className={`text-lg md:text-2xl font-bold ${isHoje(dia.data) ? 'text-yellow-300' : 'text-white'}`}>
                  {dia.data.getDate()}
                </p>
              </div>

              <div className="space-y-1">
                {getEventosDia(dia.data).map((evento) => (
                  <div
                    key={evento.id}
                    className={`${evento.cor} rounded p-1 md:p-2 text-xs cursor-pointer hover:opacity-80 transition ${
                      evento.concluido ? 'opacity-50 line-through' : ''
                    }`}
                    onClick={() => toggleConcluido(evento.id)}
                    title={`${evento.titulo} - ${evento.horario}`}
                  >
                    <span className="hidden md:inline">{evento.horario}</span>
                    <span className="block truncate text-white font-semibold">{evento.titulo.substring(0, 10)}...</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="card-ia">
        <h2 className="title-ia-sm mb-6">📋 Todos os Estudos Planejados</h2>

        {eventos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-8xl mb-6">📅</div>
            <h3 className="text-white text-xl font-bold mb-3">Nenhum estudo planejado</h3>
            <p className="text-white/70 mb-6">Comece organizando sua rotina de estudos!</p>
            <button onClick={() => setShowModal(true)} className="btn-ia">
              ➕ Adicionar Primeiro Estudo
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {eventos.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()).map((evento) => {
              const disciplinaInfo = disciplinas.find(d => d.value === evento.disciplina);
              return (
                <div
                  key={evento.id}
                  className={`card-ia-sm flex justify-between items-center transition ${
                    evento.concluido ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleConcluido(evento.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                        evento.concluido
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-white/30 hover:border-yellow-300'
                      }`}
                    >
                      {evento.concluido && '✓'}
                    </button>

                    <div>
                      <p className={`text-white font-bold ${evento.concluido ? 'line-through' : ''}`}>
                        {evento.titulo}
                      </p>
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <span>{disciplinaInfo?.emoji}</span>
                        <span>{evento.disciplina}</span>
                        <span>•</span>
                        <span>{evento.duracao} min</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-yellow-300 font-bold">{evento.horario}</p>
                      <p className="text-white/60 text-xs">
                        {new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    <button
                      onClick={() => removerEvento(evento.id)}
                      className="text-red-400 hover:text-red-300 transition p-2"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Adicionar Evento */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="card-ia max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="title-ia-sm">➕ Novo Estudo</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Titulo</label>
                <input
                  type="text"
                  value={novoEvento.titulo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                  className="input-ia w-full"
                  placeholder="Ex: Revisao de Funcoes"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Disciplina</label>
                <select
                  value={novoEvento.disciplina}
                  onChange={(e) => setNovoEvento({ ...novoEvento, disciplina: e.target.value })}
                  className="input-ia w-full"
                >
                  {disciplinas.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.emoji} {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Data</label>
                  <input
                    type="date"
                    value={novoEvento.data}
                    onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                    className="input-ia w-full"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Horario</label>
                  <input
                    type="time"
                    value={novoEvento.horario}
                    onChange={(e) => setNovoEvento({ ...novoEvento, horario: e.target.value })}
                    className="input-ia w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Duracao (minutos)</label>
                <select
                  value={novoEvento.duracao}
                  onChange={(e) => setNovoEvento({ ...novoEvento, duracao: Number(e.target.value) })}
                  className="input-ia w-full"
                >
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1h30</option>
                  <option value={120}>2 horas</option>
                  <option value={180}>3 horas</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-ia-secondary flex-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={adicionarEvento}
                  disabled={!novoEvento.titulo || !novoEvento.data}
                  className="btn-ia flex-1 disabled:opacity-50"
                >
                  ✅ Salvar
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
