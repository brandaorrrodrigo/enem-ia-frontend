/**
 * ENEM PRO - Sistema de Cálculo de KPIs
 *
 * Funções para calcular todas as métricas definidas
 * de forma consistente e auditável.
 */

import {
  Area,
  EvolucaoAcademica,
  EficienciaEstudo,
  EngajamentoInteligente,
  ResultadoFinal,
  KPICompleto,
  MetricasAgregadas,
} from './types'

// ============================================
// TIPOS AUXILIARES
// ============================================

interface Simulado {
  id: string
  data: Date
  notaPorArea: { [key in Area]: number }
  notaTotal: number
  tempoDecorrido: number // minutos
}

interface SessaoEstudo {
  id: string
  data: Date
  duracaoMinutos: number
  topicosEstudados: string[]
  areaFoco: Area
}

interface AtividadeDiaria {
  data: Date
  tempoAtivo: number // minutos
  atividadesRealizadas: number
}

// ============================================
// 1. CÁLCULO DE EVOLUÇÃO ACADÊMICA
// ============================================

export function calcularEvolucaoAcademica(
  simulados: Simulado[]
): EvolucaoAcademica {
  if (simulados.length === 0) {
    throw new Error('Necessário pelo menos 1 simulado para calcular evolução')
  }

  // Ordenar simulados por data
  const simuladosOrdenados = [...simulados].sort(
    (a, b) => a.data.getTime() - b.data.getTime()
  )

  const primeiroSimulado = simuladosOrdenados[0]
  const ultimoSimulado = simuladosOrdenados[simuladosOrdenados.length - 1]

  // Calcular evolução por área
  const areas: Area[] = ['linguagens', 'matematica', 'humanas', 'natureza', 'redacao']
  const evolucaoPorArea = {} as EvolucaoAcademica['evolucaoPorArea']

  areas.forEach((area) => {
    const notaInicial = primeiroSimulado.notaPorArea[area] || 0
    const notaAtual = ultimoSimulado.notaPorArea[area] || 0
    const evolucaoAbsoluta = notaAtual - notaInicial
    const evolucaoPercentual =
      notaInicial > 0 ? (evolucaoAbsoluta / notaInicial) * 100 : 0
    const tempoDecorrido = Math.floor(
      (ultimoSimulado.data.getTime() - primeiroSimulado.data.getTime()) /
        (1000 * 60 * 60 * 24)
    )

    evolucaoPorArea[area] = {
      notaInicial,
      notaAtual,
      evolucaoAbsoluta,
      evolucaoPercentual,
      tempoDecorrido,
    }
  })

  // Calcular evolução total
  const notaInicialEstimada = primeiroSimulado.notaTotal
  const notaAtualEstimada = ultimoSimulado.notaTotal
  const evolucaoAbsoluta = notaAtualEstimada - notaInicialEstimada
  const evolucaoPercentual =
    notaInicialEstimada > 0
      ? (evolucaoAbsoluta / notaInicialEstimada) * 100
      : 0

  // Calcular tempo para marcos de evolução
  const tempoParaEvolucao = {
    dias50Pontos: encontrarTempoParaMarco(simuladosOrdenados, 50),
    dias100Pontos: encontrarTempoParaMarco(simuladosOrdenados, 100),
    sairDePatamar: calcularTempoSaidaPatamar(simuladosOrdenados),
  }

  return {
    evolucaoPorArea,
    evolucaoTotal: {
      notaInicialEstimada,
      notaAtualEstimada,
      evolucaoAbsoluta,
      evolucaoPercentual,
    },
    tempoParaEvolucao,
  }
}

function encontrarTempoParaMarco(
  simulados: Simulado[],
  marco: number
): number | null {
  const primeiro = simulados[0]

  for (let i = 1; i < simulados.length; i++) {
    const evolucao = simulados[i].notaTotal - primeiro.notaTotal

    if (evolucao >= marco) {
      return Math.floor(
        (simulados[i].data.getTime() - primeiro.data.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    }
  }

  return null // Ainda não atingiu o marco
}

function calcularTempoSaidaPatamar(simulados: Simulado[]): number | null {
  // Detecta quando aluno sai de platô (estagnação > 30 dias)
  // e volta a evoluir significativamente

  for (let i = 1; i < simulados.length - 1; i++) {
    const evolucaoAntes = simulados[i].notaTotal - simulados[i - 1].notaTotal
    const evolucaoDepois = simulados[i + 1].notaTotal - simulados[i].notaTotal
    const diasEstagnado = Math.floor(
      (simulados[i + 1].data.getTime() - simulados[i].data.getTime()) /
        (1000 * 60 * 60 * 24)
    )

    // Platô: < 10 pontos de evolução em 30+ dias
    const emPatamar = Math.abs(evolucaoAntes) < 10 && diasEstagnado > 30

    // Saiu do platô: > 30 pontos de evolução
    const saiuDoPatamar = evolucaoDepois > 30

    if (emPatamar && saiuDoPatamar) {
      return diasEstagnado
    }
  }

  return null
}

// ============================================
// 2. CÁLCULO DE EFICIÊNCIA DE ESTUDO
// ============================================

export function calcularEficienciaEstudo(
  simulados: Simulado[],
  sessoes: SessaoEstudo[],
  topicosAltaIncidencia: string[]
): EficienciaEstudo {
  // Calcular pontos ganhos por hora
  const horasTotais = sessoes.reduce(
    (acc, s) => acc + s.duracaoMinutos / 60,
    0
  )
  const evolucaoTotal =
    simulados.length > 1
      ? simulados[simulados.length - 1].notaTotal - simulados[0].notaTotal
      : 0

  const mediaGeral = horasTotais > 0 ? evolucaoTotal / horasTotais : 0

  // Calcular por área
  const areas: Area[] = ['linguagens', 'matematica', 'humanas', 'natureza', 'redacao']
  const porArea = {} as { [key in Area]: number }

  areas.forEach((area) => {
    const sessoesArea = sessoes.filter((s) => s.areaFoco === area)
    const horasArea = sessoesArea.reduce(
      (acc, s) => acc + s.duracaoMinutos / 60,
      0
    )

    const evolucaoArea =
      simulados.length > 1
        ? simulados[simulados.length - 1].notaPorArea[area] -
          simulados[0].notaPorArea[area]
        : 0

    porArea[area] = horasArea > 0 ? evolucaoArea / horasArea : 0
  })

  // Determinar tendência
  const ultimasHoras = sessoes.slice(-10)
  const primeirasHoras = sessoes.slice(0, 10)
  const tendenciaRecente =
    ultimasHoras.length > 0
      ? evolucaoTotal / (ultimasHoras.reduce((a, s) => a + s.duracaoMinutos, 0) / 60)
      : 0
  const tendenciaInicial =
    primeirasHoras.length > 0
      ? evolucaoTotal / (primeirasHoras.reduce((a, s) => a + s.duracaoMinutos, 0) / 60)
      : 0

  const tendencia: 'crescente' | 'estavel' | 'decrescente' =
    tendenciaRecente > tendenciaInicial * 1.1
      ? 'crescente'
      : tendenciaRecente < tendenciaInicial * 0.9
      ? 'decrescente'
      : 'estavel'

  // Calcular % tempo em tópicos de alta incidência
  const sessoesAltaIncidencia = sessoes.filter((s) =>
    s.topicosEstudados.some((t) => topicosAltaIncidencia.includes(t))
  )
  const horasAltaIncidencia = sessoesAltaIncidencia.reduce(
    (acc, s) => acc + s.duracaoMinutos / 60,
    0
  )
  const percentual = horasTotais > 0 ? (horasAltaIncidencia / horasTotais) * 100 : 0

  // Calcular economia de tempo vs estudo genérico
  // Assumindo que estudo genérico = 2x mais tempo em tópicos irrelevantes
  const horasEstudoGenerico = horasTotais * 1.5 // 50% mais tempo
  const horasEstudoOrientado = horasTotais
  const economiaPercentual = ((horasEstudoGenerico - horasEstudoOrientado) / horasEstudoGenerico) * 100

  return {
    pontosGanhosPorHora: {
      mediaGeral,
      porArea,
      tendencia,
    },
    tempoEmTopicosAlta: {
      percentual,
      horasEstudadas: horasAltaIncidencia,
      topicosEstudados: new Set(
        sessoesAltaIncidencia.flatMap((s) => s.topicosEstudados)
      ).size,
    },
    reducaoTopicosInuteis: {
      horasEconomizadas: horasEstudoGenerico - horasEstudoOrientado,
      percentualReducao: economiaPercentual,
      comparacaoEstudoGenerico: {
        horasEstudoGenerico,
        horasEstudoOrientado,
        economiaPercentual,
      },
    },
  }
}

// ============================================
// 3. CÁLCULO DE ENGAJAMENTO INTELIGENTE
// ============================================

export function calcularEngajamentoInteligente(
  atividades: AtividadeDiaria[],
  simulados: Simulado[]
): EngajamentoInteligente {
  // Ordenar atividades por data
  const atividadesOrdenadas = [...atividades].sort(
    (a, b) => a.data.getTime() - b.data.getTime()
  )

  // Calcular frequência semanal (últimos 7 dias)
  const hoje = new Date()
  const seteDiasAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000)
  const atividadesUltimaSemana = atividadesOrdenadas.filter(
    (a) => a.data >= seteDiasAtras
  )
  const diasAtivos = new Set(
    atividadesUltimaSemana.map((a) => a.data.toDateString())
  ).size

  // Calcular média das últimas 4 semanas
  const quatroSemanasAtras = new Date(hoje.getTime() - 28 * 24 * 60 * 60 * 1000)
  const atividadesUltimas4Semanas = atividadesOrdenadas.filter(
    (a) => a.data >= quatroSemanasAtras
  )
  const mediaUltimasSemanas =
    atividadesUltimas4Semanas.length > 0
      ? new Set(atividadesUltimas4Semanas.map((a) => a.data.toDateString())).size / 4
      : 0

  const statusFrequencia: 'alto' | 'medio' | 'baixo' =
    diasAtivos >= 5 ? 'alto' : diasAtivos >= 3 ? 'medio' : 'baixo'

  // Calcular simulados concluídos
  const areas: Area[] = ['linguagens', 'matematica', 'humanas', 'natureza', 'redacao']
  const porArea = {} as { [key in Area]: number }
  areas.forEach((area) => {
    porArea[area] = simulados.filter((s) => s.notaPorArea[area] > 0).length
  })

  const mediaNotaSimulados =
    simulados.length > 0
      ? simulados.reduce((acc, s) => acc + s.notaTotal, 0) / simulados.length
      : 0

  const evolucaoNosSimulados =
    simulados.length > 1
      ? simulados[simulados.length - 1].notaTotal - simulados[0].notaTotal
      : 0

  // Calcular streak atual
  let streakAtual = 0
  let melhorStreak = 0
  let streakTemporario = 0

  const datasUnicas = [
    ...new Set(atividadesOrdenadas.map((a) => a.data.toDateString())),
  ].sort()

  for (let i = 0; i < datasUnicas.length; i++) {
    if (i === 0) {
      streakTemporario = 1
    } else {
      const dataAnterior = new Date(datasUnicas[i - 1])
      const dataAtual = new Date(datasUnicas[i])
      const diferencaDias = Math.floor(
        (dataAtual.getTime() - dataAnterior.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diferencaDias === 1) {
        streakTemporario++
      } else {
        melhorStreak = Math.max(melhorStreak, streakTemporario)
        streakTemporario = 1
      }
    }

    // Streak atual é o mais recente
    if (i === datasUnicas.length - 1) {
      const ultimaData = new Date(datasUnicas[i])
      const diferencaHoje = Math.floor(
        (hoje.getTime() - ultimaData.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diferencaHoje <= 1) {
        streakAtual = streakTemporario
      }
    }
  }

  melhorStreak = Math.max(melhorStreak, streakTemporario)

  // Taxa de consistência (últimos 30 dias)
  const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000)
  const atividadesUltimos30Dias = atividadesOrdenadas.filter(
    (a) => a.data >= trintaDiasAtras
  )
  const diasAtivosUltimos30 = new Set(
    atividadesUltimos30Dias.map((a) => a.data.toDateString())
  ).size
  const taxaConsistencia = (diasAtivosUltimos30 / 30) * 100

  // Calcular retenção mensal
  const primeiraAtividade = atividadesOrdenadas[0]
  const ultimaAtividade = atividadesOrdenadas[atividadesOrdenadas.length - 1]
  const mesesAtivo = primeiraAtividade
    ? Math.floor(
        (hoje.getTime() - primeiraAtividade.data.getTime()) /
          (1000 * 60 * 60 * 24 * 30)
      )
    : 0

  const diasDesdeUltimoAcesso = Math.floor(
    (hoje.getTime() - ultimaAtividade.data.getTime()) / (1000 * 60 * 60 * 24)
  )

  const statusRetencao: 'ativo' | 'risco' | 'inativo' =
    diasDesdeUltimoAcesso <= 7
      ? 'ativo'
      : diasDesdeUltimoAcesso <= 14
      ? 'risco'
      : 'inativo'

  return {
    frequenciaSemanal: {
      diasAtivos,
      mediaUltimasSemanas,
      statusFrequencia,
    },
    simuladosConcluidos: {
      total: simulados.length,
      porArea,
      mediaNotaSimulados,
      evolucaoNosSimulados,
    },
    consistencia: {
      streakAtual,
      melhorStreak,
      taxaConsistencia,
    },
    retencaoMensal: {
      mesesAtivo,
      ultimoAcesso: ultimaAtividade ? ultimaAtividade.data : new Date(),
      statusRetencao,
    },
  }
}

// ============================================
// 4. FUNÇÕES AUXILIARES DE AGREGAÇÃO
// ============================================

export function agregarKPIsAnonimos(
  kpis: KPICompleto[]
): MetricasAgregadas {
  if (kpis.length === 0) {
    throw new Error('Nenhum KPI fornecido para agregação')
  }

  const totalUsuariosAtivos = kpis.length

  // Calcular médias
  const mediasEvolucao = {
    evolucaoMediaPontos:
      kpis.reduce(
        (acc, k) => acc + k.evolucaoAcademica.evolucaoTotal.evolucaoAbsoluta,
        0
      ) / totalUsuariosAtivos,
    tempoMedioParaEvolucao:
      kpis.reduce(
        (acc, k) => acc + (k.evolucaoAcademica.tempoParaEvolucao.dias100Pontos || 0),
        0
      ) /
      kpis.filter((k) => k.evolucaoAcademica.tempoParaEvolucao.dias100Pontos).length,
  }

  const mediasEficiencia = {
    pontosGanhosPorHoraMedio:
      kpis.reduce(
        (acc, k) => acc + k.eficienciaEstudo.pontosGanhosPorHora.mediaGeral,
        0
      ) / totalUsuariosAtivos,
    horasEconomizadasMedio:
      kpis.reduce(
        (acc, k) => acc + k.eficienciaEstudo.reducaoTopicosInuteis.horasEconomizadas,
        0
      ) / totalUsuariosAtivos,
  }

  const mediasEngajamento = {
    frequenciaSemanalmedia:
      kpis.reduce(
        (acc, k) => acc + k.engajamentoInteligente.frequenciaSemanal.diasAtivos,
        0
      ) / totalUsuariosAtivos,
    streakMedio:
      kpis.reduce(
        (acc, k) => acc + k.engajamentoInteligente.consistencia.streakAtual,
        0
      ) / totalUsuariosAtivos,
    simuladosConcluidos:
      kpis.reduce(
        (acc, k) => acc + k.engajamentoInteligente.simuladosConcluidos.total,
        0
      ) / totalUsuariosAtivos,
  }

  // Distribuições
  const distribuicaoPorFrequencia = {
    alto: kpis.filter(
      (k) => k.engajamentoInteligente.frequenciaSemanal.statusFrequencia === 'alto'
    ).length,
    medio: kpis.filter(
      (k) => k.engajamentoInteligente.frequenciaSemanal.statusFrequencia === 'medio'
    ).length,
    baixo: kpis.filter(
      (k) => k.engajamentoInteligente.frequenciaSemanal.statusFrequencia === 'baixo'
    ).length,
  }

  return {
    periodo: {
      inicio: new Date(Math.min(...kpis.map((k) => k.periodo.inicio.getTime()))),
      fim: new Date(Math.max(...kpis.map((k) => k.periodo.fim.getTime()))),
    },
    totalUsuariosAtivos,
    medias: {
      evolucaoAcademica: mediasEvolucao,
      eficienciaEstudo: mediasEficiencia,
      engajamento: mediasEngajamento,
      resultados: {
        percentualAtingiramAlvo: 0, // A ser calculado após ENEM
        percentualAprovados: 0,
        evolucaoEntreTentativas: 0,
      },
    },
    distribuicoes: {
      porNivel: {
        iniciante: 0, // A ser implementado
        intermediario: 0,
        avancado: 0,
      },
      porFrequencia: distribuicaoPorFrequencia,
    },
  }
}
