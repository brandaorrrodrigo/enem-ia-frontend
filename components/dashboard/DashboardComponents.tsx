/**
 * COMPONENTES VISUAIS DO DASHBOARD - ENEM PRO
 * Sub-componentes estilizados com Tailwind CSS
 */

'use client';

import type {
  VisaoGeral,
  Evolucao,
  MapaEstudo,
  EficienciaEstudo,
  PrevisaoResultado,
} from '@/types/dashboard';

// =====================================================
// COMPONENTES DE MÉTRICAS
// =====================================================

interface CardMetricaPrincipalProps {
  titulo: string;
  valor: string | number;
  subtitulo: string;
  cor: 'blue' | 'purple' | 'red' | 'green' | 'yellow' | 'gray';
  icone: string;
}

export function CardMetricaPrincipal({
  titulo,
  valor,
  subtitulo,
  cor,
  icone,
}: CardMetricaPrincipalProps) {
  const coresConfig = {
    blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50',
    purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50',
    red: 'from-red-500 to-red-600 text-red-600 bg-red-50',
    green: 'from-green-500 to-green-600 text-green-600 bg-green-50',
    yellow: 'from-yellow-500 to-yellow-600 text-yellow-600 bg-yellow-50',
    gray: 'from-gray-500 to-gray-600 text-gray-600 bg-gray-50',
  };

  const [gradient, textColor, bgColor] = coresConfig[cor].split(' ');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-transparent hover:border-current transition-all hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          {titulo}
        </h3>
        <span className="text-3xl">{icone}</span>
      </div>
      <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {valor}
      </div>
      <p className="text-sm text-slate-500">{subtitulo}</p>
    </div>
  );
}

export function CardMetricaSimples({
  titulo,
  valor,
  icone,
}: {
  titulo: string;
  valor: string | number;
  icone: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icone}</span>
        <span className="text-xs text-slate-600 uppercase font-medium">{titulo}</span>
      </div>
      <div className="text-2xl font-bold text-slate-800">{valor}</div>
    </div>
  );
}

// =====================================================
// BARRAS DE PROGRESSO
// =====================================================

export function BarraProgressoArea({
  data,
}: {
  data: VisaoGeral['progresso_por_area'][0];
}) {
  const getCorStatus = (status: string) => {
    const cores = {
      abaixo: 'bg-red-500',
      proximo: 'bg-yellow-500',
      atingiu: 'bg-blue-500',
      superou: 'bg-green-500',
    };
    return cores[status as keyof typeof cores] || 'bg-gray-500';
  };

  const getIconeArea = (area: string) => {
    const icones: Record<string, string> = {
      Matemática: '🔢',
      Natureza: '🔬',
      Humanas: '📚',
      Linguagens: '💬',
      Redação: '✍️',
    };
    return icones[area] || '📖';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getIconeArea(data.area)}</span>
          <span className="font-medium text-slate-700">{data.area}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">
            {data.nota_atual} / {data.nota_necessaria}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            data.status === 'superou' ? 'bg-green-100 text-green-700' :
            data.status === 'atingiu' ? 'bg-blue-100 text-blue-700' :
            data.status === 'proximo' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {data.gap > 0 ? `Faltam ${data.gap}` : 'Meta atingida!'}
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getCorStatus(data.status)}`}
          style={{ width: `${Math.min(100, data.percentual)}%` }}
        />
      </div>
    </div>
  );
}

export function BarraRetornoInvestimento({
  data,
}: {
  data: EficienciaEstudo['retorno_investimento'][0];
}) {
  const getCorEficiencia = (status: string) => {
    const cores = {
      excelente: 'bg-green-500',
      bom: 'bg-blue-500',
      regular: 'bg-yellow-500',
      baixo: 'bg-red-500',
    };
    return cores[status as keyof typeof cores] || 'bg-gray-500';
  };

  const maxEficiencia = 50; // pontos por hora (ajustar conforme necessário)
  const percentual = Math.min(100, (data.eficiencia / maxEficiencia) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-slate-700">{data.materia}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-600">{data.horas_investidas}h investidas</span>
          <span className="font-bold text-slate-800">{data.eficiencia.toFixed(1)} pts/h</span>
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getCorEficiencia(data.status)}`}
          style={{ width: `${percentual}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 italic">{data.recomendacao}</p>
    </div>
  );
}

// =====================================================
// ALERTAS E NOTIFICAÇÕES
// =====================================================

export function AlertaProximaMeta({
  data,
}: {
  data: VisaoGeral['proxima_meta'];
}) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">🎯</span>
        <div>
          <h3 className="text-lg font-semibold">Próxima Meta</h3>
          <p className="text-purple-100">{data.descricao}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-sm text-purple-100">Faltam</div>
          <div className="text-2xl font-bold">{data.pontos_faltantes} pts</div>
        </div>
        <div className="bg-white/20 rounded-lg p-3">
          <div className="text-sm text-purple-100">Prazo</div>
          <div className="text-2xl font-bold">{data.prazo_dias} dias</div>
        </div>
      </div>
      <p className="mt-4 text-center text-lg font-medium">{data.motivacao}</p>
    </div>
  );
}

export function AlertaEficiencia({
  data,
}: {
  data: EficienciaEstudo['alertas_eficiencia'][0];
}) {
  const getConfigAlerta = (tipo: string) => {
    const configs = {
      baixo_retorno: { cor: 'orange', icone: '⚠️', bgClass: 'bg-orange-50 border-orange-200' },
      muito_tempo: { cor: 'red', icone: '🔴', bgClass: 'bg-red-50 border-red-200' },
      pouca_pratica: { cor: 'yellow', icone: '💤', bgClass: 'bg-yellow-50 border-yellow-200' },
      revisar: { cor: 'blue', icone: '🔄', bgClass: 'bg-blue-50 border-blue-200' },
    };
    return configs[tipo as keyof typeof configs] || configs.revisar;
  };

  const config = getConfigAlerta(data.tipo);

  return (
    <div className={`${config.bgClass} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{config.icone}</span>
        <div className="flex-1">
          <p className="font-medium text-slate-800 mb-1">{data.mensagem}</p>
          <p className="text-sm text-slate-600 italic">💡 {data.acao_sugerida}</p>
        </div>
      </div>
    </div>
  );
}

export function AlertaRitmo({
  progresso_ideal,
  progresso_real,
  status,
}: {
  progresso_ideal: number;
  progresso_real: number;
  status: 'adiantado' | 'no_prazo' | 'atrasado';
}) {
  const getConfigRitmo = () => {
    if (status === 'adiantado') {
      return {
        cor: 'green',
        icone: '🚀',
        titulo: 'Você está ADIANTADO!',
        mensagem: 'Continue assim, você está indo muito bem!',
        bgClass: 'bg-green-50 border-green-500',
      };
    } else if (status === 'no_prazo') {
      return {
        cor: 'blue',
        icone: '✅',
        titulo: 'No prazo perfeito',
        mensagem: 'Mantenha o ritmo de estudo atual.',
        bgClass: 'bg-blue-50 border-blue-500',
      };
    } else {
      return {
        cor: 'red',
        icone: '⚠️',
        titulo: 'Atenção: Você está ATRASADO',
        mensagem: 'Acelere o ritmo para alcançar sua meta!',
        bgClass: 'bg-red-50 border-red-500',
      };
    }
  };

  const config = getConfigRitmo();
  const diferenca = progresso_real - progresso_ideal;

  return (
    <div className={`${config.bgClass} border-l-4 rounded-r-lg p-5`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{config.icone}</span>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{config.titulo}</h3>
          <p className="text-slate-600">{config.mensagem}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-white rounded-lg p-3 text-center">
          <div className="text-xs text-slate-600">Progresso Ideal</div>
          <div className="text-xl font-bold text-slate-800">{progresso_ideal}%</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <div className="text-xs text-slate-600">Seu Progresso</div>
          <div className="text-xl font-bold text-slate-800">{progresso_real}%</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <div className="text-xs text-slate-600">Diferença</div>
          <div className={`text-xl font-bold ${diferenca >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {diferenca > 0 ? '+' : ''}{diferenca}%
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// CARDS DE PERFORMANCE
// =====================================================

export function CardMelhoresPerformances({
  dados,
}: {
  dados: Evolucao['melhores_performances'];
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>🏆</span>
        Melhores Performances
      </h3>
      <div className="space-y-3">
        {dados.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
          >
            <div>
              <p className="font-medium text-slate-800">{item.materia}</p>
              <p className="text-sm text-slate-600">{item.periodo}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-600">+{item.melhoria}</div>
              <div className="text-xs text-green-700">pontos</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardAreasAtencao({
  dados,
}: {
  dados: Evolucao['areas_atencao'];
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>⚠️</span>
        Áreas de Atenção
      </h3>
      <div className="space-y-3">
        {dados.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <div>
              <p className="font-medium text-slate-800">{item.materia}</p>
              <p className="text-sm text-slate-600 italic">{item.motivo_provavel}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-red-600">{item.queda}</div>
              <div className="text-xs text-red-700">pontos</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// CARDS DE MAPA DE ESTUDO
// =====================================================

export function CardSemanaAtual({ data }: { data: MapaEstudo['semana_atual'] }) {
  const getStatusColor = (status: string) => {
    const cores = {
      atrasado: 'bg-red-100 text-red-700 border-red-300',
      no_prazo: 'bg-blue-100 text-blue-700 border-blue-300',
      adiantado: 'bg-green-100 text-green-700 border-green-300',
    };
    return cores[status as keyof typeof cores] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">📅 Semana Atual</h3>
          <p className="text-slate-600">Semana {data.numero} de 20</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(data.status)}`}>
          {data.status === 'atrasado' ? '⚠️ Atrasado' : data.status === 'adiantado' ? '🚀 Adiantado' : '✅ No prazo'}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600">Carga horária cumprida</span>
          <span className="font-semibold">{data.carga_cumprida}h / {data.carga_horaria_planejada}h</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-full rounded-full ${
              data.percentual_cumprimento >= 80 ? 'bg-green-500' :
              data.percentual_cumprimento >= 50 ? 'bg-blue-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, data.percentual_cumprimento)}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Tópicos da semana:</p>
        <div className="flex flex-wrap gap-2">
          {data.topicos_da_semana.map((topico, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
            >
              {topico}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardTopicoPrioritario({
  data,
}: {
  data: MapaEstudo['topicos_prioritarios'][0];
}) {
  const getCorPrioridade = (prioridade: string) => {
    const cores = {
      ALTA: 'bg-red-100 text-red-700 border-red-300',
      MEDIA: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      BAIXA: 'bg-blue-100 text-blue-700 border-blue-300',
    };
    return cores[prioridade as keyof typeof cores] || 'bg-gray-100 text-gray-700';
  };

  const getCorStatus = (status: string) => {
    const cores = {
      pendente: 'bg-slate-100 text-slate-700',
      em_progresso: 'bg-blue-100 text-blue-700',
      dominado: 'bg-green-100 text-green-700',
    };
    return cores[status as keyof typeof cores] || 'bg-gray-100';
  };

  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{data.icone}</span>
          <div>
            <h4 className="font-semibold text-slate-800">{data.tema}</h4>
            <p className="text-sm text-slate-600">{data.materia}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getCorPrioridade(data.prioridade)}`}>
            {data.prioridade}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${getCorStatus(data.status)}`}>
            {data.status === 'pendente' ? 'Pendente' : data.status === 'em_progresso' ? 'Em andamento' : 'Dominado'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-xs text-slate-600">Incidência ENEM</div>
          <div className="text-lg font-bold text-blue-600">{data.incidencia_enem}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-600">Prob. Cair</div>
          <div className="text-lg font-bold text-purple-600">{data.probabilidade_cair}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-600">Seu Desempenho</div>
          <div className={`text-lg font-bold ${data.seu_desempenho >= 70 ? 'text-green-600' : data.seu_desempenho >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {data.seu_desempenho}%
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
        <p className="text-sm text-slate-700">
          <span className="font-semibold">🤖 IA:</span> {data.recomendacao_ia}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>⏱️ {data.tempo_estimado}h estimadas</span>
        <span>📚 {data.recursos.questoes_disponiveis} questões disponíveis</span>
      </div>
    </div>
  );
}

// =====================================================
// CARDS DE COMPARAÇÃO
// =====================================================

export function CardComparacaoMeta({
  data,
}: {
  data: EficienciaEstudo['comparacao_meta'];
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">🎯 Ritmo Necessário vs. Ritmo Atual</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h4 className="text-sm font-medium text-purple-800 mb-3">Ritmo Necessário</h4>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-purple-600">Questões/dia</span>
              <div className="text-2xl font-bold text-purple-700">{data.ritmo_necessario.questoes_por_dia}</div>
            </div>
            <div>
              <span className="text-xs text-purple-600">Horas/semana</span>
              <div className="text-2xl font-bold text-purple-700">{data.ritmo_necessario.horas_por_semana}</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Seu Ritmo Atual</h4>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-blue-600">Questões/dia</span>
              <div className="text-2xl font-bold text-blue-700">{data.ritmo_atual.questoes_por_dia}</div>
            </div>
            <div>
              <span className="text-xs text-blue-600">Horas/semana</span>
              <div className="text-2xl font-bold text-blue-700">{data.ritmo_atual.horas_por_semana}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${
        data.status === 'acima' ? 'bg-green-50 border border-green-200' :
        data.status === 'dentro' ? 'bg-blue-50 border border-blue-200' :
        'bg-red-50 border border-red-200'
      }`}>
        <p className="text-sm font-semibold text-slate-800 mb-1">
          {data.status === 'acima' ? '✅ Excelente!' : data.status === 'dentro' ? '👍 Bom ritmo' : '⚠️ Atenção'}
        </p>
        <p className="text-sm text-slate-700">{data.ajuste_necessario}</p>
      </div>
    </div>
  );
}

// =====================================================
// CARDS DE CENÁRIOS
// =====================================================

export function CardCenario({
  tipo,
  data,
}: {
  tipo: 'otimista' | 'realista' | 'critico';
  data: PrevisaoResultado['cenarios']['otimista'];
}) {
  const getConfig = () => {
    if (tipo === 'otimista') {
      return {
        cor: 'green',
        icone: '🚀',
        titulo: 'Cenário Otimista',
        bgClass: 'bg-green-50 border-green-300',
        textColor: 'text-green-700',
      };
    } else if (tipo === 'realista') {
      return {
        cor: 'blue',
        icone: '🎯',
        titulo: 'Cenário Realista',
        bgClass: 'bg-blue-50 border-blue-300',
        textColor: 'text-blue-700',
      };
    } else {
      return {
        cor: 'red',
        icone: '⚠️',
        titulo: 'Cenário Crítico',
        bgClass: 'bg-red-50 border-red-300',
        textColor: 'text-red-700',
      };
    }
  };

  const config = getConfig();

  return (
    <div className={`${config.bgClass} border rounded-xl p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{config.icone}</span>
        <h3 className={`font-semibold ${config.textColor}`}>{config.titulo}</h3>
      </div>

      <p className="text-sm text-slate-700 mb-4">{data.descricao}</p>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-xs text-slate-600 mb-1">Nota Projetada</div>
          <div className={`text-4xl font-bold ${config.textColor}`}>{data.nota_projetada}</div>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-700 mb-2">
          {tipo === 'critico' ? 'Riscos:' : 'Requisitos:'}
        </p>
        <ul className="space-y-1">
          {(tipo === 'critico' ? (data as any).riscos : data.requisitos)?.map((item: string, idx: number) => (
            <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
              <span>{tipo === 'critico' ? '⚠️' : '✓'}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =====================================================
// CARDS DE RECOMENDAÇÕES IA
// =====================================================

export function CardRecomendacaoIA({
  data,
}: {
  data: PrevisaoResultado['recomendacoes_ia'][0];
}) {
  const getConfigPrioridade = (prioridade: string) => {
    if (prioridade === 'urgente') {
      return {
        bgClass: 'bg-red-50 border-red-300',
        badgeClass: 'bg-red-500 text-white',
        label: '🚨 URGENTE',
      };
    } else if (prioridade === 'importante') {
      return {
        bgClass: 'bg-yellow-50 border-yellow-300',
        badgeClass: 'bg-yellow-500 text-white',
        label: '⚡ IMPORTANTE',
      };
    } else {
      return {
        bgClass: 'bg-blue-50 border-blue-300',
        badgeClass: 'bg-blue-500 text-white',
        label: '💡 SUGESTÃO',
      };
    }
  };

  const config = getConfigPrioridade(data.prioridade);

  return (
    <div className={`${config.bgClass} border rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{data.icone}</span>
        <span className={`${config.badgeClass} px-3 py-1 rounded-full text-xs font-bold`}>
          {config.label}
        </span>
      </div>

      <p className="text-slate-800 font-medium mb-2">{data.mensagem}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600 italic">Impacto estimado:</span>
        <span className="font-semibold text-green-600">{data.impacto_estimado}</span>
      </div>
    </div>
  );
}

// =====================================================
// GRÁFICOS (Placeholders - implementar com biblioteca de charts)
// =====================================================

export function GraficoEvolucao({
  dados,
}: {
  dados: Evolucao['historico_simulados'];
}) {
  // TODO: Implementar com recharts ou outra biblioteca de gráficos
  return (
    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
      <div className="text-center text-slate-500">
        <p className="mb-2">📊 Gráfico de Evolução</p>
        <p className="text-sm">
          {dados.length} simulados realizados
        </p>
        <p className="text-xs mt-2 italic">
          (Implementar com biblioteca de gráficos como Recharts)
        </p>
      </div>
    </div>
  );
}

export function GraficoPizza({
  dados,
}: {
  dados: MapaEstudo['distribuicao_tempo'];
}) {
  // TODO: Implementar com recharts ou outra biblioteca de gráficos
  return (
    <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
      <div className="text-center text-slate-500">
        <p className="mb-2">🥧 Gráfico Pizza</p>
        <p className="text-sm">
          Distribuição de tempo por área
        </p>
        <p className="text-xs mt-2 italic">
          (Implementar com biblioteca de gráficos como Recharts)
        </p>
      </div>
    </div>
  );
}
