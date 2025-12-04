'use client';

import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import ChalkBackToTop from '@/components/ChalkBackToTop';

interface DadosEstudo {
  data: string;
  minutos: number;
  questoesRespondidas: number;
  acertos: number;
  area: string;
}

interface DesempenhoArea {
  area: string;
  nome: string;
  cor: string;
  icone: string;
  questoesTotal: number;
  acertosTotal: number;
  tempoTotal: number;
  ultimoEstudo: string | null;
  evolucao: number[];
}

interface Meta {
  id: string;
  tipo: 'diaria' | 'semanal' | 'mensal';
  descricao: string;
  meta: number;
  atual: number;
  unidade: string;
}

export default function EstatisticasPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<'7dias' | '30dias' | '90dias'>('30dias');
  const [dadosEstudo, setDadosEstudo] = useState<DadosEstudo[]>([]);
  const [desempenhoAreas, setDesempenhoAreas] = useState<DesempenhoArea[]>([]);
  const [metas, setMetas] = useState<Meta[]>([]);

  useEffect(() => {
    // Carregar dados do localStorage ou gerar dados de exemplo
    const gerarDadosExemplo = () => {
      const dados: DadosEstudo[] = [];
      const areas = ['linguagens', 'humanas', 'natureza', 'matematica', 'redacao'];

      for (let i = 0; i < 90; i++) {
        const data = new Date();
        data.setDate(data.getDate() - i);

        // Simular dias com estudo (70% de chance)
        if (Math.random() > 0.3) {
          const area = areas[Math.floor(Math.random() * areas.length)];
          const questoes = Math.floor(Math.random() * 20) + 5;
          dados.push({
            data: data.toISOString().split('T')[0],
            minutos: Math.floor(Math.random() * 120) + 30,
            questoesRespondidas: questoes,
            acertos: Math.floor(questoes * (0.5 + Math.random() * 0.4)),
            area
          });
        }
      }
      return dados;
    };

    const saved = localStorage.getItem('enem-dados-estudo');
    const dados = saved ? JSON.parse(saved) : gerarDadosExemplo();

    if (!saved) {
      localStorage.setItem('enem-dados-estudo', JSON.stringify(dados));
    }

    setDadosEstudo(dados);

    // Calcular desempenho por área
    const areasConfig = [
      { area: 'linguagens', nome: 'Linguagens', cor: 'from-purple-500 to-purple-700', icone: '📚' },
      { area: 'humanas', nome: 'Ciências Humanas', cor: 'from-yellow-500 to-yellow-700', icone: '🌍' },
      { area: 'natureza', nome: 'Ciências da Natureza', cor: 'from-green-500 to-green-700', icone: '🔬' },
      { area: 'matematica', nome: 'Matemática', cor: 'from-cyan-500 to-cyan-700', icone: '📐' },
      { area: 'redacao', nome: 'Redação', cor: 'from-pink-500 to-pink-700', icone: '✍️' }
    ];

    const desempenho: DesempenhoArea[] = areasConfig.map(config => {
      const dadosArea = dados.filter((d: DadosEstudo) => d.area === config.area);
      const ultimoDado = dadosArea.sort((a: DadosEstudo, b: DadosEstudo) =>
        new Date(b.data).getTime() - new Date(a.data).getTime())[0];

      // Evolução semanal (últimas 4 semanas)
      const evolucao = [0, 1, 2, 3].map(semana => {
        const inicioSemana = new Date();
        inicioSemana.setDate(inicioSemana.getDate() - (semana + 1) * 7);
        const fimSemana = new Date();
        fimSemana.setDate(fimSemana.getDate() - semana * 7);

        const dadosSemana = dadosArea.filter((d: DadosEstudo) => {
          const dataD = new Date(d.data);
          return dataD >= inicioSemana && dataD < fimSemana;
        });

        if (dadosSemana.length === 0) return 0;
        const totalQuestoes = dadosSemana.reduce((acc: number, d: DadosEstudo) => acc + d.questoesRespondidas, 0);
        const totalAcertos = dadosSemana.reduce((acc: number, d: DadosEstudo) => acc + d.acertos, 0);
        return totalQuestoes > 0 ? Math.round((totalAcertos / totalQuestoes) * 100) : 0;
      }).reverse();

      return {
        ...config,
        questoesTotal: dadosArea.reduce((acc: number, d: DadosEstudo) => acc + d.questoesRespondidas, 0),
        acertosTotal: dadosArea.reduce((acc: number, d: DadosEstudo) => acc + d.acertos, 0),
        tempoTotal: dadosArea.reduce((acc: number, d: DadosEstudo) => acc + d.minutos, 0),
        ultimoEstudo: ultimoDado?.data || null,
        evolucao
      };
    });

    setDesempenhoAreas(desempenho);

    // Metas
    const hoje = new Date().toISOString().split('T')[0];
    const dadosHoje = dados.filter((d: DadosEstudo) => d.data === hoje);
    const minutosHoje = dadosHoje.reduce((acc: number, d: DadosEstudo) => acc + d.minutos, 0);
    const questoesHoje = dadosHoje.reduce((acc: number, d: DadosEstudo) => acc + d.questoesRespondidas, 0);

    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    const dadosSemana = dados.filter((d: DadosEstudo) => new Date(d.data) >= inicioSemana);
    const minutosSemana = dadosSemana.reduce((acc: number, d: DadosEstudo) => acc + d.minutos, 0);

    setMetas([
      { id: '1', tipo: 'diaria', descricao: 'Estudar hoje', meta: 60, atual: minutosHoje, unidade: 'min' },
      { id: '2', tipo: 'diaria', descricao: 'Questões hoje', meta: 20, atual: questoesHoje, unidade: 'questões' },
      { id: '3', tipo: 'semanal', descricao: 'Tempo semanal', meta: 420, atual: minutosSemana, unidade: 'min' },
      { id: '4', tipo: 'semanal', descricao: 'Simulados', meta: 2, atual: 1, unidade: 'simulados' }
    ]);
  }, []);

  const getDadosPeriodo = () => {
    const dias = periodoSelecionado === '7dias' ? 7 : periodoSelecionado === '30dias' ? 30 : 90;
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    return dadosEstudo.filter(d => new Date(d.data) >= dataLimite);
  };

  const dadosPeriodo = getDadosPeriodo();

  const estatisticasGerais = {
    tempoTotal: dadosPeriodo.reduce((acc, d) => acc + d.minutos, 0),
    questoesTotal: dadosPeriodo.reduce((acc, d) => acc + d.questoesRespondidas, 0),
    acertosTotal: dadosPeriodo.reduce((acc, d) => acc + d.acertos, 0),
    diasEstudados: new Set(dadosPeriodo.map(d => d.data)).size,
    mediaDiaria: dadosPeriodo.length > 0
      ? Math.round(dadosPeriodo.reduce((acc, d) => acc + d.minutos, 0) / new Set(dadosPeriodo.map(d => d.data)).size)
      : 0
  };

  const taxaAcerto = estatisticasGerais.questoesTotal > 0
    ? Math.round((estatisticasGerais.acertosTotal / estatisticasGerais.questoesTotal) * 100)
    : 0;

  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas > 0) return `${horas}h ${mins}min`;
    return `${mins}min`;
  };

  // Calcular previsão de nota
  const calcularPrevisaoNota = () => {
    if (desempenhoAreas.length === 0) return 0;

    const mediaGeral = desempenhoAreas.reduce((acc, area) => {
      const taxa = area.questoesTotal > 0 ? (area.acertosTotal / area.questoesTotal) : 0;
      return acc + taxa;
    }, 0) / desempenhoAreas.length;

    // Fórmula simplificada: taxa de acerto * 1000 (nota máxima)
    // Com ajustes baseados no tempo de estudo
    const bonus = Math.min(estatisticasGerais.tempoTotal / 100, 50);
    return Math.round(mediaGeral * 900 + bonus);
  };

  const previsaoNota = calcularPrevisaoNota();

  // Gerar gráfico de barras simples para os últimos 7 dias
  const ultimos7Dias = () => {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
      const data = new Date();
      data.setDate(data.getDate() - i);
      const dataStr = data.toISOString().split('T')[0];
      const dadosDia = dadosEstudo.filter(d => d.data === dataStr);
      const minutos = dadosDia.reduce((acc, d) => acc + d.minutos, 0);
      dias.push({
        data: dataStr,
        dia: data.toLocaleDateString('pt-BR', { weekday: 'short' }),
        minutos
      });
    }
    return dias;
  };

  const grafico7Dias = ultimos7Dias();
  const maxMinutos = Math.max(...grafico7Dias.map(d => d.minutos), 60);

  return (
    <main className="min-h-screen bg-[#0D1F22] text-white pt-16 pb-24">
      <FloatingNav />
      <ChalkBackToTop />

      <div className="container-ia py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="title-ia text-3xl md:text-4xl mb-4">
            📊 Estatísticas e Analytics
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Acompanhe seu progresso, identifique pontos fracos e visualize sua evolução rumo ao ENEM.
          </p>
        </div>

        {/* Seletor de Período */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: '7dias', label: '7 dias' },
            { id: '30dias', label: '30 dias' },
            { id: '90dias', label: '90 dias' }
          ].map(periodo => (
            <button
              key={periodo.id}
              onClick={() => setPeriodoSelecionado(periodo.id as typeof periodoSelecionado)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                periodoSelecionado === periodo.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {periodo.label}
            </button>
          ))}
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-emerald-400">{formatarTempo(estatisticasGerais.tempoTotal)}</div>
            <div className="text-gray-400 text-sm">Tempo Total</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-blue-400">{estatisticasGerais.questoesTotal}</div>
            <div className="text-gray-400 text-sm">Questões</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-purple-400">{taxaAcerto}%</div>
            <div className="text-gray-400 text-sm">Taxa de Acerto</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-yellow-400">{estatisticasGerais.diasEstudados}</div>
            <div className="text-gray-400 text-sm">Dias Ativos</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-pink-400">{estatisticasGerais.mediaDiaria}min</div>
            <div className="text-gray-400 text-sm">Média Diária</div>
          </div>
          <div className="stat-ia text-center">
            <div className="text-3xl font-bold text-cyan-400">{previsaoNota}</div>
            <div className="text-gray-400 text-sm">Nota Prevista</div>
          </div>
        </div>

        {/* Gráfico de Atividade (últimos 7 dias) */}
        <div className="card-ia p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📈 Atividade dos Últimos 7 Dias</h2>
          <div className="flex items-end justify-between h-40 gap-2">
            {grafico7Dias.map((dia, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center justify-end h-32">
                  <div
                    className={`w-full rounded-t transition-all ${
                      dia.minutos > 0 ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' : 'bg-white/10'
                    }`}
                    style={{ height: `${Math.max((dia.minutos / maxMinutos) * 100, 5)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-2">{dia.dia}</div>
                <div className="text-xs text-gray-500">{dia.minutos > 0 ? `${dia.minutos}m` : '-'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Metas */}
        <div className="card-ia p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🎯 Suas Metas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {metas.map(meta => {
              const progresso = Math.min((meta.atual / meta.meta) * 100, 100);
              const concluida = meta.atual >= meta.meta;

              return (
                <div key={meta.id} className={`bg-white/5 rounded-lg p-4 ${concluida ? 'border border-emerald-500/50' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{meta.descricao}</span>
                    <span className={`text-sm ${concluida ? 'text-emerald-400' : 'text-gray-400'}`}>
                      {meta.atual}/{meta.meta} {meta.unidade}
                    </span>
                  </div>
                  <div className="progress-ia">
                    <div
                      className={`progress-bar-ia ${concluida ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                  {concluida && (
                    <div className="text-xs text-emerald-400 mt-1">✅ Meta atingida!</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desempenho por Área */}
        <div className="card-ia p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📚 Desempenho por Área</h2>
          <div className="space-y-4">
            {desempenhoAreas.map(area => {
              const taxaArea = area.questoesTotal > 0
                ? Math.round((area.acertosTotal / area.questoesTotal) * 100)
                : 0;

              return (
                <div key={area.area} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{area.icone}</span>
                      <div>
                        <h3 className="font-bold">{area.nome}</h3>
                        <p className="text-sm text-gray-400">
                          {area.questoesTotal} questões • {formatarTempo(area.tempoTotal)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        taxaArea >= 70 ? 'text-emerald-400' :
                        taxaArea >= 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {taxaArea}%
                      </div>
                      <div className="text-xs text-gray-400">acertos</div>
                    </div>
                  </div>

                  {/* Mini gráfico de evolução */}
                  <div className="flex items-end gap-1 h-8">
                    {area.evolucao.map((valor, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t bg-gradient-to-t ${area.cor}`}
                        style={{ height: `${Math.max(valor, 10)}%`, opacity: 0.5 + (idx * 0.15) }}
                        title={`Semana ${idx + 1}: ${valor}%`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>4 sem atrás</span>
                    <span>Esta semana</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pontos Fracos e Fortes */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pontos Fortes */}
          <div className="card-ia p-6">
            <h2 className="text-lg font-bold text-emerald-400 mb-4">💪 Seus Pontos Fortes</h2>
            {desempenhoAreas
              .filter(a => a.questoesTotal > 0)
              .sort((a, b) => (b.acertosTotal / b.questoesTotal) - (a.acertosTotal / a.questoesTotal))
              .slice(0, 3)
              .map((area, idx) => (
                <div key={area.area} className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{area.icone}</span>
                  <div className="flex-1">
                    <div className="font-medium">{area.nome}</div>
                    <div className="text-sm text-gray-400">
                      {Math.round((area.acertosTotal / area.questoesTotal) * 100)}% de acertos
                    </div>
                  </div>
                  <span className="text-emerald-400">#{idx + 1}</span>
                </div>
              ))}
            {desempenhoAreas.filter(a => a.questoesTotal > 0).length === 0 && (
              <p className="text-gray-400 text-sm">Responda mais questões para ver seus pontos fortes.</p>
            )}
          </div>

          {/* Pontos a Melhorar */}
          <div className="card-ia p-6">
            <h2 className="text-lg font-bold text-yellow-400 mb-4">📈 Pontos a Melhorar</h2>
            {desempenhoAreas
              .filter(a => a.questoesTotal > 0)
              .sort((a, b) => (a.acertosTotal / a.questoesTotal) - (b.acertosTotal / b.questoesTotal))
              .slice(0, 3)
              .map((area, idx) => (
                <div key={area.area} className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{area.icone}</span>
                  <div className="flex-1">
                    <div className="font-medium">{area.nome}</div>
                    <div className="text-sm text-gray-400">
                      {Math.round((area.acertosTotal / area.questoesTotal) * 100)}% de acertos
                    </div>
                  </div>
                  <span className="text-yellow-400">⚠️</span>
                </div>
              ))}
            {desempenhoAreas.filter(a => a.questoesTotal > 0).length === 0 && (
              <p className="text-gray-400 text-sm">Responda mais questões para identificar pontos a melhorar.</p>
            )}
          </div>
        </div>

        {/* Previsão de Nota */}
        <div className="card-ia p-6 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-emerald-500/30">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">🎯 Previsão de Nota no ENEM</h2>
            <p className="text-gray-400 mb-4">Baseado no seu desempenho atual</p>

            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mb-4">
              {previsaoNota}
            </div>

            <div className="flex justify-center gap-8 text-sm">
              <div>
                <span className="text-gray-400">Mínimo estimado:</span>
                <span className="text-yellow-400 ml-2">{Math.max(previsaoNota - 80, 0)}</span>
              </div>
              <div>
                <span className="text-gray-400">Máximo estimado:</span>
                <span className="text-emerald-400 ml-2">{Math.min(previsaoNota + 80, 1000)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              * Previsão baseada em taxa de acertos, tempo de estudo e constância.
              Continue estudando para aumentar sua nota!
            </p>
          </div>
        </div>

        {/* Dicas */}
        <div className="mt-8 card-ia p-6">
          <h2 className="text-xl font-bold mb-4">💡 Dicas Personalizadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {estatisticasGerais.mediaDiaria < 60 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="font-bold text-yellow-400 mb-2">⏰ Aumente seu tempo de estudo</h3>
                <p className="text-sm text-gray-400">
                  Você está estudando em média {estatisticasGerais.mediaDiaria} minutos por dia.
                  Tente aumentar para 1-2 horas diárias.
                </p>
              </div>
            )}
            {taxaAcerto < 60 && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h3 className="font-bold text-orange-400 mb-2">📚 Revise o conteúdo</h3>
                <p className="text-sm text-gray-400">
                  Sua taxa de acerto está em {taxaAcerto}%. Foque em revisar os conteúdos
                  antes de fazer mais questões.
                </p>
              </div>
            )}
            {desempenhoAreas.some(a => a.questoesTotal === 0) && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-bold text-blue-400 mb-2">🎯 Diversifique os estudos</h3>
                <p className="text-sm text-gray-400">
                  Algumas áreas ainda não têm dados. Estude todas as matérias
                  para um desempenho equilibrado.
                </p>
              </div>
            )}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <h3 className="font-bold text-emerald-400 mb-2">🔥 Mantenha a constância</h3>
              <p className="text-sm text-gray-400">
                Estudar um pouco todos os dias é melhor do que estudar muito
                em poucos dias. Mantenha o ritmo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
