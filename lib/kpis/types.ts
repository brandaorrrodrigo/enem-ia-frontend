/**
 * ENEM PRO - Sistema de KPIs Oficiais
 * Tipos TypeScript para métricas educacionais
 */

// ============================================
// TIPOS BASE
// ============================================

export type Area = 'linguagens' | 'matematica' | 'humanas' | 'natureza' | 'redacao'
export type Periodo = 'dia' | 'semana' | 'mes' | 'trimestre' | 'ano'
export type NivelAluno = 'iniciante' | 'intermediario' | 'avancado'

// ============================================
// 1. EVOLUÇÃO ACADÊMICA
// ============================================

export interface EvolucaoAcademica {
  // Evolução média de nota por área
  evolucaoPorArea: {
    [key in Area]: {
      notaInicial: number
      notaAtual: number
      evolucaoAbsoluta: number // pontos ganhos
      evolucaoPercentual: number // % de melhoria
      tempoDecorrido: number // dias desde primeira avaliação
    }
  }

  // Evolução total estimada
  evolucaoTotal: {
    notaInicialEstimada: number
    notaAtualEstimada: number
    evolucaoAbsoluta: number
    evolucaoPercentual: number
  }

  // Tempo médio para evolução significativa
  tempoParaEvolucao: {
    dias50Pontos: number | null // tempo para ganhar 50 pontos
    dias100Pontos: number | null // tempo para ganhar 100 pontos
    sairDePatamar: number | null // tempo para sair de platô
  }
}

// ============================================
// 2. EFICIÊNCIA DE ESTUDO
// ============================================

export interface EficienciaEstudo {
  // Pontos ganhos por hora de estudo
  pontosGanhosPorHora: {
    mediaGeral: number
    porArea: { [key in Area]: number }
    tendencia: 'crescente' | 'estavel' | 'decrescente'
  }

  // % de tempo em tópicos de alta incidência
  tempoEmTopicosAlta: {
    percentual: number
    horasEstudadas: number
    topicosEstudados: number
  }

  // Redução de estudo em tópicos de baixo retorno
  reducaoTopicosInuteis: {
    horasEconomizadas: number
    percentualReducao: number
    comparacaoEstudoGenerico: {
      horasEstudoGenerico: number
      horasEstudoOrientado: number
      economiaPercentual: number
    }
  }
}

// ============================================
// 3. ENGAJAMENTO INTELIGENTE
// ============================================

export interface EngajamentoInteligente {
  // Frequência semanal de uso
  frequenciaSemanal: {
    diasAtivos: number // 0-7
    mediaUltimasSemanas: number
    statusFrequencia: 'alto' | 'medio' | 'baixo'
  }

  // Simulados concluídos
  simuladosConcluidos: {
    total: number
    porArea: { [key in Area]: number }
    mediaNotaSimulados: number
    evolucaoNosSimulados: number // diferença primeira vs última tentativa
  }

  // Consistência (streak real)
  consistencia: {
    streakAtual: number // dias consecutivos
    melhorStreak: number
    taxaConsistencia: number // % dos últimos 30 dias com atividade
  }

  // Retenção mensal
  retencaoMensal: {
    mesesAtivo: number
    ultimoAcesso: Date
    statusRetencao: 'ativo' | 'risco' | 'inativo'
  }
}

// ============================================
// 4. RESULTADO FINAL
// ============================================

export interface ResultadoFinal {
  // % de alunos que atingiram nota-alvo
  atingiramNotaAlvo: {
    total: number
    percentual: number
    notaMediaAlvo: number
    notaMediaAtingida: number
  }

  // % de aprovados por curso
  aprovadosPorCurso: {
    [curso: string]: {
      totalInscritos: number
      totalAprovados: number
      percentualAprovacao: number
      notaCorteMedia: number
    }
  }

  // % de aprovados por universidade
  aprovadosPorUniversidade: {
    [universidade: string]: {
      totalInscritos: number
      totalAprovados: number
      percentualAprovacao: number
    }
  }

  // Evolução entre tentativas do ENEM
  evolucaoEntreTentativas: {
    primeiraVez: {
      total: number
      mediaEstimada: number
    }
    segundaTentativa: {
      total: number
      mediaAnterior: number
      mediaAtual: number
      evolucao: number
    }
    terceiraTentativaOuMais: {
      total: number
      mediaAnterior: number
      mediaAtual: number
      evolucao: number
    }
  }
}

// ============================================
// KPI AGREGADO COMPLETO
// ============================================

export interface KPICompleto {
  usuarioId: string
  periodo: {
    inicio: Date
    fim: Date
    diasDecorridos: number
  }

  evolucaoAcademica: EvolucaoAcademica
  eficienciaEstudo: EficienciaEstudo
  engajamentoInteligente: EngajamentoInteligente
  resultadoFinal: ResultadoFinal | null // null se ENEM ainda não ocorreu

  metadados: {
    calculadoEm: Date
    versaoCalculo: string
    confiabilidade: 'alta' | 'media' | 'baixa' // baseado em quantidade de dados
  }
}

// ============================================
// MÉTRICAS AGREGADAS (ANONIMIZADAS)
// ============================================

export interface MetricasAgregadas {
  periodo: {
    inicio: Date
    fim: Date
  }

  totalUsuariosAtivos: number

  // Médias gerais
  medias: {
    evolucaoAcademica: {
      evolucaoMediaPontos: number
      tempoMedioParaEvolucao: number
    }

    eficienciaEstudo: {
      pontosGanhosPorHoraMedio: number
      horasEconomizadasMedio: number
    }

    engajamento: {
      frequenciaSemanalmedia: number
      streakMedio: number
      simuladosConcluidos: number
    }

    resultados: {
      percentualAtingiramAlvo: number
      percentualAprovados: number
      evolucaoEntreTentativas: number
    }
  }

  // Distribuições
  distribuicoes: {
    porNivel: {
      iniciante: number
      intermediario: number
      avancado: number
    }

    porFrequencia: {
      alto: number // 5-7 dias/semana
      medio: number // 3-4 dias/semana
      baixo: number // 1-2 dias/semana
    }
  }
}
