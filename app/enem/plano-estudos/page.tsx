'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ChalkBackToTop from '@/components/ChalkBackToTop';

interface MetaUsuario {
  notaDesejada: number;
  curso: string;
  universidade: string;
  horasDisponiveis: number;
  diasDisponiveis: string[];
  nivelAtual: 'iniciante' | 'intermediario' | 'avancado';
  areasFortes: string[];
  areasFracas: string[];
}

interface PlanoSemanal {
  dia: string;
  atividades: {
    horario: string;
    duracao: number;
    area: string;
    tipo: string;
    descricao: string;
    prioridade: 'alta' | 'media' | 'baixa';
  }[];
}

interface Checkpoint {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  meta: string;
  concluido: boolean;
}

const cursosPopulares = [
  'Medicina', 'Direito', 'Engenharia Civil', 'Engenharia de Computação',
  'Psicologia', 'Administração', 'Enfermagem', 'Arquitetura',
  'Ciência da Computação', 'Odontologia', 'Nutrição', 'Fisioterapia',
  'Pedagogia', 'Jornalismo', 'Design', 'Biologia', 'Química', 'Física',
  'Matemática', 'História', 'Letras', 'Economia', 'Contabilidade'
];

const universidadesPopulares = [
  'USP', 'UNICAMP', 'UNESP', 'UFMG', 'UFRJ', 'UFSC', 'UFRGS',
  'UnB', 'UFPR', 'UFPE', 'UFC', 'UFBA', 'UFG', 'UFES',
  'UFSCAR', 'UNIFESP', 'UFABC', 'ITA', 'IME', 'Outra'
];

const diasSemana = [
  { id: 'seg', nome: 'Segunda' },
  { id: 'ter', nome: 'Terça' },
  { id: 'qua', nome: 'Quarta' },
  { id: 'qui', nome: 'Quinta' },
  { id: 'sex', nome: 'Sexta' },
  { id: 'sab', nome: 'Sábado' },
  { id: 'dom', nome: 'Domingo' }
];

const areas = [
  { id: 'linguagens', nome: 'Linguagens', icone: '📚', cor: 'bg-purple-500' },
  { id: 'humanas', nome: 'Humanas', icone: '🌍', cor: 'bg-yellow-500' },
  { id: 'natureza', nome: 'Natureza', icone: '🔬', cor: 'bg-green-500' },
  { id: 'matematica', nome: 'Matemática', icone: '📐', cor: 'bg-cyan-500' },
  { id: 'redacao', nome: 'Redação', icone: '✍️', cor: 'bg-pink-500' }
];

export default function PlanoEstudosPage() {
  const [etapa, setEtapa] = useState<'config' | 'plano'>('config');
  const [meta, setMeta] = useState<MetaUsuario>({
    notaDesejada: 700,
    curso: '',
    universidade: '',
    horasDisponiveis: 3,
    diasDisponiveis: ['seg', 'ter', 'qua', 'qui', 'sex'],
    nivelAtual: 'intermediario',
    areasFortes: [],
    areasFracas: []
  });
  const [planoGerado, setPlanoGerado] = useState<PlanoSemanal[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('enem-plano-estudos');
    if (saved) {
      const dados = JSON.parse(saved);
      setMeta(dados.meta);
      setPlanoGerado(dados.plano);
      setCheckpoints(dados.checkpoints);
      if (dados.plano.length > 0) {
        setEtapa('plano');
      }
    }
  }, []);

  const gerarPlano = () => {
    setSalvando(true);

    // Gerar plano baseado nas preferências
    const plano: PlanoSemanal[] = [];

    const tiposAtividade = [
      { tipo: 'teoria', descricao: 'Estudo de teoria e conceitos' },
      { tipo: 'questoes', descricao: 'Resolução de questões' },
      { tipo: 'revisao', descricao: 'Revisão com flashcards' },
      { tipo: 'simulado', descricao: 'Simulado ou treino' },
      { tipo: 'redacao', descricao: 'Prática de redação' }
    ];

    // Distribuir áreas fracas com mais frequência
    const areasOrdenadas = [...areas].sort((a, b) => {
      const aFraca = meta.areasFracas.includes(a.id) ? -1 : 0;
      const bFraca = meta.areasFracas.includes(b.id) ? -1 : 0;
      return aFraca - bFraca;
    });

    meta.diasDisponiveis.forEach((diaId, idx) => {
      const dia = diasSemana.find(d => d.id === diaId);
      if (!dia) return;

      const atividades: PlanoSemanal['atividades'] = [];
      const horasPorDia = meta.horasDisponiveis;
      let horasRestantes = horasPorDia;

      // Área principal do dia (rotaciona entre as áreas)
      const areaPrincipal = areasOrdenadas[idx % areasOrdenadas.length];
      const areaSecundaria = areasOrdenadas[(idx + 1) % areasOrdenadas.length];

      // Primeira atividade - Teoria
      if (horasRestantes >= 1) {
        atividades.push({
          horario: '08:00',
          duracao: 60,
          area: areaPrincipal.id,
          tipo: 'Teoria',
          descricao: `Estudo de ${areaPrincipal.nome} - Conceitos e teoria`,
          prioridade: (meta.areasFracas.includes(areaPrincipal.id) ? 'alta' : 'media') as 'alta' | 'media' | 'baixa'
        });
        horasRestantes -= 1;
      }

      // Segunda atividade - Questões
      if (horasRestantes >= 1) {
        atividades.push({
          horario: '09:30',
          duracao: 60,
          area: areaPrincipal.id,
          tipo: 'Questões',
          descricao: `Questões comentadas de ${areaPrincipal.nome}`,
          prioridade: 'alta' as const
        });
        horasRestantes -= 1;
      }

      // Terceira atividade - Área secundária ou Redação
      if (horasRestantes >= 1) {
        const isRedacao = idx % 3 === 0;
        atividades.push({
          horario: '14:00',
          duracao: 60,
          area: isRedacao ? 'redacao' : areaSecundaria.id,
          tipo: isRedacao ? 'Redação' : 'Teoria',
          descricao: isRedacao
            ? 'Prática de redação ou estudo de repertórios'
            : `Estudo de ${areaSecundaria.nome}`,
          prioridade: 'media' as const
        });
        horasRestantes -= 1;
      }

      // Revisão no final (se sobrar tempo)
      if (horasRestantes >= 0.5) {
        atividades.push({
          horario: '19:00',
          duracao: 30,
          area: areaPrincipal.id,
          tipo: 'Revisão',
          descricao: 'Flashcards e revisão espaçada',
          prioridade: 'baixa' as const
        });
      }

      plano.push({
        dia: dia.nome,
        atividades
      });
    });

    // Gerar checkpoints mensais
    const novosCheckpoints: Checkpoint[] = [];
    const mesesAteENEM = 6; // Aproximado

    for (let i = 1; i <= mesesAteENEM; i++) {
      const prazo = new Date();
      prazo.setMonth(prazo.getMonth() + i);

      let metaMensal = '';
      if (i === 1) metaMensal = 'Dominar conceitos básicos de todas as áreas';
      else if (i === 2) metaMensal = 'Alcançar 60% de acertos em questões';
      else if (i === 3) metaMensal = 'Completar primeiro simulado completo';
      else if (i === 4) metaMensal = 'Alcançar 70% de acertos + escrever 4 redações';
      else if (i === 5) metaMensal = 'Simulados semanais + revisão intensiva';
      else metaMensal = 'Revisão final e simulados cronometrados';

      novosCheckpoints.push({
        id: `cp-${i}`,
        titulo: `Checkpoint ${i}`,
        descricao: `Mês ${i} de preparação`,
        prazo: prazo.toISOString().split('T')[0],
        meta: metaMensal,
        concluido: false
      });
    }

    setPlanoGerado(plano);
    setCheckpoints(novosCheckpoints);
    setEtapa('plano');

    // Salvar no localStorage
    localStorage.setItem('enem-plano-estudos', JSON.stringify({
      meta,
      plano,
      checkpoints: novosCheckpoints
    }));

    setSalvando(false);
  };

  const toggleAreaForte = (areaId: string) => {
    setMeta(prev => ({
      ...prev,
      areasFortes: prev.areasFortes.includes(areaId)
        ? prev.areasFortes.filter(a => a !== areaId)
        : [...prev.areasFortes, areaId],
      areasFracas: prev.areasFracas.filter(a => a !== areaId)
    }));
  };

  const toggleAreaFraca = (areaId: string) => {
    setMeta(prev => ({
      ...prev,
      areasFracas: prev.areasFracas.includes(areaId)
        ? prev.areasFracas.filter(a => a !== areaId)
        : [...prev.areasFracas, areaId],
      areasFortes: prev.areasFortes.filter(a => a !== areaId)
    }));
  };

  const toggleDia = (diaId: string) => {
    setMeta(prev => ({
      ...prev,
      diasDisponiveis: prev.diasDisponiveis.includes(diaId)
        ? prev.diasDisponiveis.filter(d => d !== diaId)
        : [...prev.diasDisponiveis, diaId]
    }));
  };

  const toggleCheckpoint = (cpId: string) => {
    const novosCheckpoints = checkpoints.map(cp =>
      cp.id === cpId ? { ...cp, concluido: !cp.concluido } : cp
    );
    setCheckpoints(novosCheckpoints);

    const saved = localStorage.getItem('enem-plano-estudos');
    if (saved) {
      const dados = JSON.parse(saved);
      dados.checkpoints = novosCheckpoints;
      localStorage.setItem('enem-plano-estudos', JSON.stringify(dados));
    }
  };

  const getPrioridadeCor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'border-red-500 bg-red-500/10';
      case 'media': return 'border-yellow-500 bg-yellow-500/10';
      case 'baixa': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  if (etapa === 'config') {
    return (
      <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
        <FloatingNav />
        <ChalkBackToTop />

        <div className="container-ia py-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="title-ia text-3xl md:text-4xl mb-4">
              🎯 Plano de Estudos Personalizado
            </h1>
            <p className="text-gray-400">
              Configure suas metas e preferências para gerar um plano de estudos sob medida.
            </p>
          </div>

          <div className="card-ia p-6 space-y-8">
            {/* Nota Desejada */}
            <div>
              <label className="block text-lg font-bold mb-3">🏆 Qual sua nota desejada no ENEM?</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="400"
                  max="900"
                  step="50"
                  value={meta.notaDesejada}
                  onChange={(e) => setMeta(prev => ({ ...prev, notaDesejada: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-3xl font-bold text-emerald-400 w-20 text-center">{meta.notaDesejada}</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {meta.notaDesejada >= 800 ? '🔥 Meta ambiciosa! Requer dedicação intensa.' :
                 meta.notaDesejada >= 700 ? '💪 Ótima meta! Competitivo para boas universidades.' :
                 meta.notaDesejada >= 600 ? '👍 Meta equilibrada. Alcançável com estudo consistente.' :
                 '📚 Meta inicial. Bom ponto de partida!'}
              </p>
            </div>

            {/* Curso e Universidade */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">📚 Curso desejado</label>
                <select
                  value={meta.curso}
                  onChange={(e) => setMeta(prev => ({ ...prev, curso: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Selecione o curso...</option>
                  {cursosPopulares.map(curso => (
                    <option key={curso} value={curso}>{curso}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">🏛️ Universidade alvo</label>
                <select
                  value={meta.universidade}
                  onChange={(e) => setMeta(prev => ({ ...prev, universidade: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">Selecione a universidade...</option>
                  {universidadesPopulares.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Horas Disponíveis */}
            <div>
              <label className="block font-bold mb-3">⏰ Quantas horas por dia você pode estudar?</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 8].map(h => (
                  <button
                    key={h}
                    onClick={() => setMeta(prev => ({ ...prev, horasDisponiveis: h }))}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      meta.horasDisponiveis === h
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
            </div>

            {/* Dias Disponíveis */}
            <div>
              <label className="block font-bold mb-3">📅 Quais dias você pode estudar?</label>
              <div className="flex gap-2 flex-wrap">
                {diasSemana.map(dia => (
                  <button
                    key={dia.id}
                    onClick={() => toggleDia(dia.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      meta.diasDisponiveis.includes(dia.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {dia.nome.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Nível Atual */}
            <div>
              <label className="block font-bold mb-3">📊 Qual seu nível atual de conhecimento?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'iniciante', label: 'Iniciante', desc: 'Estou começando do zero' },
                  { id: 'intermediario', label: 'Intermediário', desc: 'Tenho base, preciso aprofundar' },
                  { id: 'avancado', label: 'Avançado', desc: 'Domino a maioria, preciso revisar' }
                ].map(nivel => (
                  <button
                    key={nivel.id}
                    onClick={() => setMeta(prev => ({ ...prev, nivelAtual: nivel.id as MetaUsuario['nivelAtual'] }))}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      meta.nivelAtual === nivel.id
                        ? 'bg-emerald-600 border-2 border-emerald-400'
                        : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-bold">{nivel.label}</div>
                    <div className="text-xs text-gray-300">{nivel.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Áreas Fortes */}
            <div>
              <label className="block font-bold mb-3">💪 Quais são suas áreas FORTES?</label>
              <div className="flex gap-2 flex-wrap">
                {areas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => toggleAreaForte(area.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      meta.areasFortes.includes(area.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <span>{area.icone}</span>
                    <span>{area.nome}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Áreas Fracas */}
            <div>
              <label className="block font-bold mb-3">📈 Quais são suas áreas que precisam de MAIS FOCO?</label>
              <div className="flex gap-2 flex-wrap">
                {areas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => toggleAreaFraca(area.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      meta.areasFracas.includes(area.id)
                        ? 'bg-yellow-600 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <span>{area.icone}</span>
                    <span>{area.nome}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Gerar Plano */}
            <button
              onClick={gerarPlano}
              disabled={salvando || meta.diasDisponiveis.length === 0}
              className={`w-full btn-ia py-4 text-lg ${
                salvando || meta.diasDisponiveis.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {salvando ? '🔄 Gerando plano...' : '🚀 Gerar Meu Plano de Estudos'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
      <FloatingNav />
      <ChalkBackToTop />

      <div className="container-ia py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="title-ia text-2xl md:text-3xl mb-2">
              🎯 Seu Plano de Estudos
            </h1>
            <p className="text-gray-400">
              {meta.curso && meta.universidade
                ? `Meta: ${meta.curso} na ${meta.universidade} • Nota: ${meta.notaDesejada}`
                : `Meta: ${meta.notaDesejada} pontos no ENEM`}
            </p>
          </div>
          <button
            onClick={() => setEtapa('config')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            ⚙️ Reconfigurar
          </button>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-emerald-400">{meta.diasDisponiveis.length}</div>
            <div className="text-gray-400 text-sm">Dias/Semana</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-blue-400">{meta.horasDisponiveis}h</div>
            <div className="text-gray-400 text-sm">Horas/Dia</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-purple-400">
              {meta.diasDisponiveis.length * meta.horasDisponiveis}h
            </div>
            <div className="text-gray-400 text-sm">Horas/Semana</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-yellow-400">{meta.notaDesejada}</div>
            <div className="text-gray-400 text-sm">Nota Meta</div>
          </div>
        </div>

        {/* Plano Semanal */}
        <div className="card-ia p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📅 Cronograma Semanal</h2>
          <div className="space-y-4">
            {planoGerado.map((dia, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 text-emerald-400">{dia.dia}</h3>
                <div className="space-y-2">
                  {dia.atividades.map((ativ, aIdx) => {
                    const area = areas.find(a => a.id === ativ.area);
                    return (
                      <div
                        key={aIdx}
                        className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${getPrioridadeCor(ativ.prioridade)}`}
                      >
                        <div className="text-2xl">{area?.icone}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ativ.tipo}</span>
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
                              {ativ.duracao}min
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{ativ.descricao}</p>
                        </div>
                        <div className="text-sm text-gray-400">{ativ.horario}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkpoints */}
        <div className="card-ia p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🏁 Checkpoints de Progresso</h2>
          <div className="space-y-3">
            {checkpoints.map((cp, idx) => (
              <div
                key={cp.id}
                className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                  cp.concluido ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => toggleCheckpoint(cp.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  cp.concluido ? 'bg-emerald-500' : 'bg-white/20'
                }`}>
                  {cp.concluido ? '✓' : idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${cp.concluido ? 'line-through text-gray-400' : ''}`}>
                    {cp.titulo}
                  </h3>
                  <p className="text-sm text-gray-400">{cp.meta}</p>
                </div>
                <div className="text-right text-sm">
                  <div className="text-gray-400">Prazo</div>
                  <div>{new Date(cp.prazo).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas */}
        <div className="card-ia p-6">
          <h2 className="text-xl font-bold mb-4">💡 Dicas para Seguir o Plano</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-emerald-400 mb-2">🎯 Consistência</h3>
              <p className="text-sm text-gray-400">
                Estudar um pouco todos os dias é melhor do que estudar muito em poucos dias.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-blue-400 mb-2">📊 Acompanhe</h3>
              <p className="text-sm text-gray-400">
                Use as estatísticas para monitorar seu progresso e ajustar o plano.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-purple-400 mb-2">🔄 Flexibilidade</h3>
              <p className="text-sm text-gray-400">
                Se perder um dia, não desanime. Ajuste e continue no próximo.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-yellow-400 mb-2">⚡ Áreas Fracas</h3>
              <p className="text-sm text-gray-400">
                Dedique mais tempo às áreas que você indicou como fracas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
