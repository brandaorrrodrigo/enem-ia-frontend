/**
 * DASHBOARD CENTRAL DO ALUNO - ENEM PRO
 * UX Educacional + Data Visualization
 */

'use client';

import { useState, useEffect } from 'react';
import type { DashboardAluno } from '@/types/dashboard';
import {
  CardMetricaPrincipal,
  CardMetricaSimples,
  BarraProgressoArea,
  BarraRetornoInvestimento,
  AlertaProximaMeta,
  AlertaEficiencia,
  AlertaRitmo,
  CardMelhoresPerformances,
  CardAreasAtencao,
  CardSemanaAtual,
  CardTopicoPrioritario,
  CardComparacaoMeta,
  CardCenario,
  CardRecomendacaoIA,
  GraficoEvolucao,
  GraficoPizza,
} from './DashboardComponents';

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function DashboardAluno({ userId }: { userId: string }) {
  const [dashboard, setDashboard] = useState<DashboardAluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDashboard();
  }, [userId]);

  async function carregarDashboard() {
    try {
      const response = await fetch(`/api/dashboard/${userId}`);
      const data = await response.json();
      setDashboard(data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingDashboard />;
  if (!dashboard) return <ErroDashboard />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <HeaderDashboard
          nome={dashboard.visao_geral.aluno.nome}
          curso={dashboard.visao_geral.objetivo.curso}
          universidade={dashboard.visao_geral.objetivo.universidade}
          atualizadoEm={dashboard.atualizado_em}
        />

        {/* 1. VISÃO GERAL */}
        <SecaoVisaoGeral data={dashboard.visao_geral} />

        {/* 2. EVOLUÇÃO */}
        <SecaoEvolucao data={dashboard.evolucao} />

        {/* 3. MAPA DE ESTUDO */}
        <SecaoMapaEstudo data={dashboard.mapa_estudo} />

        {/* 4. EFICIÊNCIA */}
        <SecaoEficiencia data={dashboard.eficiencia} />

        {/* 5. PREVISÃO */}
        <SecaoPrevisao data={dashboard.previsao} />
      </div>
    </div>
  );
}

// =====================================================
// SEÇÃO 1: VISÃO GERAL
// =====================================================

function SecaoVisaoGeral({ data }: { data: DashboardAluno['visao_geral'] }) {
  const { situacao_atual, progresso_por_area, proxima_meta } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">📊 Visão Geral</h2>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardMetricaPrincipal
          titulo="Nota Estimada"
          valor={situacao_atual.nota_estimada}
          subtitulo="baseada nos seus simulados"
          cor="blue"
          icone="📈"
        />

        <CardMetricaPrincipal
          titulo="Nota-Alvo"
          valor={situacao_atual.nota_alvo}
          subtitulo={`${data.objetivo.curso} - ${data.objetivo.universidade}`}
          cor="purple"
          icone="🎯"
        />

        <CardMetricaPrincipal
          titulo="Faltam"
          valor={situacao_atual.gap_pontos}
          subtitulo="pontos para sua meta"
          cor={situacao_atual.gap_pontos > 100 ? 'red' : 'green'}
          icone="⚡"
        />

        <CardMetricaPrincipal
          titulo="Progresso"
          valor={`${situacao_atual.percentual_alcancado}%`}
          subtitulo={situacao_atual.status}
          cor={getCorStatus(situacao_atual.status)}
          icone="🏆"
        />
      </div>

      {/* Progresso por Área */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Progresso por Área</h3>
        <div className="space-y-3">
          {progresso_por_area.map((area) => (
            <BarraProgressoArea key={area.area} data={area} />
          ))}
        </div>
      </div>

      {/* Próxima Meta */}
      <AlertaProximaMeta data={proxima_meta} />
    </section>
  );
}

// =====================================================
// SEÇÃO 2: EVOLUÇÃO
// =====================================================

function SecaoEvolucao({ data }: { data: DashboardAluno['evolucao'] }) {
  const { historico_simulados, tendencia, melhores_performances, areas_atencao } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">📈 Sua Evolução</h2>

      {/* Mensagem de Tendência */}
      <div className={`bg-${getTendenciaCor(tendencia.direcao)}-50 border-l-4 border-${getTendenciaCor(tendencia.direcao)}-500 p-4 rounded-r-lg`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getTendenciaIcone(tendencia.direcao)}</span>
          <div>
            <p className="font-semibold text-slate-800">{tendencia.mensagem}</p>
            <p className="text-sm text-slate-600">
              Variação: {tendencia.variacao_ultimos_7_dias > 0 ? '+' : ''}
              {tendencia.variacao_ultimos_7_dias} pontos ({tendencia.variacao_percentual > 0 ? '+' : ''}
              {tendencia.variacao_percentual}%)
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de Evolução */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Evolução nos Simulados</h3>
        <GraficoEvolucao dados={historico_simulados} />
      </div>

      {/* Grid: Melhores Performances + Áreas de Atenção */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardMelhoresPerformances dados={melhores_performances} />
        <CardAreasAtencao dados={areas_atencao} />
      </div>
    </section>
  );
}

// =====================================================
// SEÇÃO 3: MAPA DE ESTUDO
// =====================================================

function SecaoMapaEstudo({ data }: { data: DashboardAluno['mapa_estudo'] }) {
  const { plano_vigente, distribuicao_tempo, topicos_prioritarios, semana_atual } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">🗺️ Seu Mapa de Estudo</h2>

      {/* Status do Plano */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Plano Personalizado IA</h3>
            <p className="text-blue-100">
              {plano_vigente.topicos_concluidos} de {plano_vigente.total_topicos} tópicos dominados
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{plano_vigente.percentual_progresso}%</div>
            <div className="text-sm text-blue-100">completo</div>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all"
            style={{ width: `${plano_vigente.percentual_progresso}%` }}
          />
        </div>
      </div>

      {/* Semana Atual */}
      <CardSemanaAtual data={semana_atual} />

      {/* Distribuição de Tempo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Distribuição Recomendada (IA)</h3>
          <GraficoPizza dados={distribuicao_tempo} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Horas por Semana</h3>
          <div className="space-y-3">
            {distribuicao_tempo.map((item) => (
              <div key={item.area} className="flex justify-between items-center">
                <span className="text-slate-700">{item.area}</span>
                <span className="font-semibold">{item.horas_semanais}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tópicos Prioritários */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🔥 Tópicos Prioritários (Alta Incidência + Sua Lacuna)</h3>
        <div className="space-y-3">
          {topicos_prioritarios.slice(0, 10).map((topico) => (
            <CardTopicoPrioritario key={topico.id} data={topico} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// SEÇÃO 4: EFICIÊNCIA
// =====================================================

function SecaoEficiencia({ data }: { data: DashboardAluno['eficiencia'] }) {
  const { metricas_gerais, retorno_investimento, alertas_eficiencia, comparacao_meta } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">⚡ Eficiência de Estudo</h2>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <CardMetricaSimples
          titulo="Total de Horas"
          valor={metricas_gerais.total_horas_estudadas}
          icone="⏱️"
        />
        <CardMetricaSimples
          titulo="Questões Resolvidas"
          valor={metricas_gerais.total_questoes_resolvidas}
          icone="✍️"
        />
        <CardMetricaSimples
          titulo="Simulados Feitos"
          valor={metricas_gerais.total_simulados_feitos}
          icone="📝"
        />
        <CardMetricaSimples
          titulo="Questões/Hora"
          valor={metricas_gerais.media_questoes_por_hora.toFixed(1)}
          icone="🎯"
        />
        <CardMetricaSimples
          titulo="Tempo/Questão"
          valor={`${Math.round(metricas_gerais.tempo_medio_por_questao / 60)}min`}
          icone="⏲️"
        />
      </div>

      {/* Alertas de Eficiência */}
      {alertas_eficiencia.length > 0 && (
        <div className="space-y-2">
          {alertas_eficiencia.map((alerta, idx) => (
            <AlertaEficiencia key={idx} data={alerta} />
          ))}
        </div>
      )}

      {/* Retorno do Investimento */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">💰 Retorno por Hora de Estudo</h3>
        <div className="space-y-3">
          {retorno_investimento.map((item) => (
            <BarraRetornoInvestimento key={item.materia} data={item} />
          ))}
        </div>
      </div>

      {/* Comparação com Meta */}
      <CardComparacaoMeta data={comparacao_meta} />
    </section>
  );
}

// =====================================================
// SEÇÃO 5: PREVISÃO
// =====================================================

function SecaoPrevisao({ data }: { data: DashboardAluno['previsao'] }) {
  const { probabilidade_aprovacao, cenarios, dias_ate_enem, progresso_ideal_ate_hoje, progresso_real, status_ritmo } = data;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">🔮 Previsão e Cenários</h2>

      {/* Probabilidade de Aprovação */}
      <div className={`bg-gradient-to-r ${getGradientProbabilidade(probabilidade_aprovacao.percentual)} text-white rounded-xl shadow-lg p-8 text-center`}>
        <div className="text-6xl font-bold mb-2">{probabilidade_aprovacao.percentual}%</div>
        <div className="text-xl mb-1">{probabilidade_aprovacao.status}</div>
        <div className="text-lg opacity-90">{probabilidade_aprovacao.mensagem_motivacional}</div>
        <div className="mt-4 text-sm opacity-75">Faltam {dias_ate_enem} dias para o ENEM</div>
      </div>

      {/* Status do Ritmo */}
      <AlertaRitmo
        progresso_ideal={progresso_ideal_ate_hoje}
        progresso_real={progresso_real}
        status={status_ritmo}
      />

      {/* Cenários */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardCenario tipo="otimista" data={cenarios.otimista} />
        <CardCenario tipo="realista" data={cenarios.realista} />
        <CardCenario tipo="critico" data={cenarios.critico} />
      </div>

      {/* Recomendações IA */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🤖 Recomendações da IA</h3>
        <div className="space-y-3">
          {data.recomendacoes_ia.map((rec, idx) => (
            <CardRecomendacaoIA key={idx} data={rec} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =====================================================
// COMPONENTES AUXILIARES
// (implementação completa nos próximos arquivos)
// =====================================================

function LoadingDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4" />
        <p className="text-slate-600">Carregando seu dashboard...</p>
      </div>
    </div>
  );
}

function ErroDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-slate-600">Erro ao carregar dashboard</p>
      </div>
    </div>
  );
}

function HeaderDashboard({ nome, curso, universidade, atualizadoEm }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Olá, {nome}! 👋</h1>
          <p className="text-slate-600">
            {curso} - {universidade}
          </p>
        </div>
        <div className="text-right text-sm text-slate-500">
          Atualizado: {new Date(atualizadoEm).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
}

// Funções auxiliares
function getCorStatus(status: string): "blue" | "gray" | "green" | "purple" | "red" | "yellow" {
  const cores: Record<string, "blue" | "gray" | "green" | "purple" | "red" | "yellow"> = {
    'Crítico': 'red',
    'Atenção': 'yellow',
    'No Caminho': 'blue',
    'Excelente': 'green'
  };
  return (cores[status] as "blue" | "gray" | "green" | "purple" | "red" | "yellow") || 'gray';
}

function getTendenciaCor(direcao: string): string {
  return direcao === 'subindo' ? 'green' : direcao === 'caindo' ? 'red' : 'blue';
}

function getTendenciaIcone(direcao: string): string {
  return direcao === 'subindo' ? '📈' : direcao === 'caindo' ? '📉' : '➡️';
}

function getGradientProbabilidade(prob: number): string {
  if (prob >= 80) return 'from-green-500 to-emerald-600';
  if (prob >= 60) return 'from-blue-500 to-cyan-600';
  if (prob >= 40) return 'from-yellow-500 to-orange-600';
  return 'from-red-500 to-rose-600';
}

// Exportar sub-componentes para uso modular
export {
  SecaoVisaoGeral,
  SecaoEvolucao,
  SecaoMapaEstudo,
  SecaoEficiencia,
  SecaoPrevisao
};
