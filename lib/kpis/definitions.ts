/**
 * ENEM PRO - Definições Oficiais de KPIs
 *
 * Documento técnico com todas as métricas, fórmulas de cálculo
 * e frequências de atualização do sistema.
 */

import { Area, Periodo } from './types'

// ============================================
// CATEGORIA 1: EVOLUÇÃO ACADÊMICA
// ============================================

export const KPI_EVOLUCAO_ACADEMICA = {
  /**
   * KPI 1.1: Evolução Média de Nota por Área
   *
   * DEFINIÇÃO:
   * Mede quantos pontos o aluno ganhou em cada área do conhecimento
   * desde sua primeira avaliação até a mais recente.
   *
   * FÓRMULA:
   * Evolução = Nota Atual - Nota Inicial
   * Evolução % = ((Nota Atual - Nota Inicial) / Nota Inicial) × 100
   *
   * FONTE DE DADOS:
   * - Simulados realizados
   * - Micro-quizzes respondidos
   * - Questões práticas resolvidas
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Tempo real após cada simulado
   * - Recalculado diariamente para micro-quizzes
   *
   * AGREGAÇÃO ANÔNIMA:
   * - Média simples de todos os usuários ativos
   * - Mediana para reduzir impacto de outliers
   */
  evolucaoPorArea: {
    metrica: 'Evolução de Nota por Área',
    unidade: 'pontos',
    formula: 'Nota_Atual - Nota_Inicial',
    formulaPercentual: '((Nota_Atual - Nota_Inicial) / Nota_Inicial) × 100',
    fontes: ['simulados', 'micro_quizzes', 'questoes_praticas'],
    frequenciaAtualizacao: 'tempo_real',
    agregacao: 'media_e_mediana',
  },

  /**
   * KPI 1.2: Evolução Total Estimada
   *
   * DEFINIÇÃO:
   * Estimativa da nota total do ENEM baseada no desempenho
   * ponderado em todas as áreas.
   *
   * FÓRMULA:
   * Nota_Total_Estimada = (Linguagens + Matemática + Humanas + Natureza) / 4
   * (Redação é calculada separadamente quando disponível)
   *
   * MARGEM DE ERRO:
   * ±50 pontos (informado ao aluno)
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Atualizado após cada simulado completo
   * - Recalculado semanalmente com base em micro-quizzes
   */
  evolucaoTotal: {
    metrica: 'Evolução Total Estimada',
    unidade: 'pontos',
    formula: '(Ling + Mat + Hum + Nat) / 4',
    margemErro: 50,
    frequenciaAtualizacao: 'apos_simulado_ou_semanal',
    avisoTransparencia: 'Estimativa baseada em simulados. Resultado real pode variar.',
  },

  /**
   * KPI 1.3: Tempo Médio para Evolução Significativa
   *
   * DEFINIÇÃO:
   * Tempo necessário para o aluno ganhar marcos significativos
   * de pontuação (50, 100, 150 pontos).
   *
   * FÓRMULA:
   * Tempo = Data_Marco - Data_Inicial (em dias)
   *
   * MARCOS:
   * - 50 pontos: Evolução inicial
   * - 100 pontos: Evolução significativa
   * - 150 pontos: Evolução avançada
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Calculado quando marco é atingido
   * - Agregado mensalmente
   */
  tempoParaEvolucao: {
    metrica: 'Tempo para Evolução Significativa',
    unidade: 'dias',
    marcos: [50, 100, 150],
    formula: 'Data_Marco - Data_Inicial',
    frequenciaAtualizacao: 'ao_atingir_marco',
    agregacao: 'media_mensal',
  },
}

// ============================================
// CATEGORIA 2: EFICIÊNCIA DE ESTUDO
// ============================================

export const KPI_EFICIENCIA_ESTUDO = {
  /**
   * KPI 2.1: Pontos Ganhos por Hora de Estudo
   *
   * DEFINIÇÃO:
   * Mede o ROI (retorno sobre investimento) do tempo de estudo.
   * Quantos pontos o aluno ganha para cada hora estudada.
   *
   * FÓRMULA:
   * Pontos/Hora = Evolução_Total / Horas_Estudadas_Total
   *
   * FONTE DE DADOS:
   * - Tempo de sessão registrado
   * - Evolução de nota nos simulados
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Recalculado semanalmente
   *
   * BENCHMARK:
   * - Bom: > 2 pontos/hora
   * - Médio: 1-2 pontos/hora
   * - Precisa melhorar: < 1 ponto/hora
   */
  pontosGanhosPorHora: {
    metrica: 'Pontos Ganhos por Hora de Estudo',
    unidade: 'pontos/hora',
    formula: 'Evolucao_Total / Horas_Estudadas_Total',
    fontes: ['tempo_sessao', 'evolucao_simulados'],
    frequenciaAtualizacao: 'semanal',
    benchmark: {
      bom: 2,
      medio: 1,
      baixo: 0.5,
    },
  },

  /**
   * KPI 2.2: % de Tempo em Tópicos de Alta Incidência
   *
   * DEFINIÇÃO:
   * Percentual do tempo de estudo dedicado a tópicos
   * que aparecem frequentemente no ENEM.
   *
   * FÓRMULA:
   * % = (Horas_Topicos_Alta / Horas_Totais) × 100
   *
   * CRITÉRIO "ALTA INCIDÊNCIA":
   * - Tópico aparece em 3+ das últimas 5 edições do ENEM
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Calculado em tempo real
   * - Agregado diariamente
   */
  tempoEmTopicosAlta: {
    metrica: '% Tempo em Tópicos de Alta Incidência',
    unidade: 'percentual',
    formula: '(Horas_Topicos_Alta / Horas_Totais) × 100',
    criterioAltaIncidencia: '3+ aparições nas últimas 5 edições ENEM',
    frequenciaAtualizacao: 'tempo_real',
    metaIdeal: 70, // 70% do tempo em tópicos relevantes
  },

  /**
   * KPI 2.3: Redução de Estudo em Tópicos de Baixo Retorno
   *
   * DEFINIÇÃO:
   * Quanto tempo o aluno economiza ao NÃO estudar
   * tópicos raramente cobrados no ENEM.
   *
   * FÓRMULA:
   * Horas_Economizadas = Horas_Estudo_Generico - Horas_Estudo_Orientado
   *
   * COMPARAÇÃO:
   * - Estudo Genérico: seguir todo o conteúdo escolar tradicional
   * - Estudo Orientado: seguir trilha da IA do ENEM PRO
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Calculado mensalmente
   */
  reducaoTopicosInuteis: {
    metrica: 'Redução de Estudo em Tópicos de Baixo Retorno',
    unidade: 'horas',
    formula: 'Horas_Estudo_Generico - Horas_Estudo_Orientado',
    comparacao: {
      estudoGenerico: 'Currículo escolar completo',
      estudoOrientado: 'Trilha IA personalizada',
    },
    frequenciaAtualizacao: 'mensal',
  },
}

// ============================================
// CATEGORIA 3: ENGAJAMENTO INTELIGENTE
// ============================================

export const KPI_ENGAJAMENTO = {
  /**
   * KPI 3.1: Frequência Semanal de Uso
   *
   * DEFINIÇÃO:
   * Número de dias por semana em que o aluno acessa
   * a plataforma e realiza alguma atividade.
   *
   * FÓRMULA:
   * Freq_Semanal = Dias_Ativos_Semana / 7
   *
   * CRITÉRIO "DIA ATIVO":
   * - Pelo menos 10 minutos de atividade
   * - Ou 1 simulado/quiz completo
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Calculado em tempo real
   * - Agregado semanalmente
   */
  frequenciaSemanal: {
    metrica: 'Frequência Semanal de Uso',
    unidade: 'dias/semana',
    formula: 'Dias_Ativos_Semana / 7',
    criterioDiaAtivo: {
      tempoMinimo: 10, // minutos
      ou: 'Quiz/Simulado completo',
    },
    frequenciaAtualizacao: 'tempo_real',
    classificacao: {
      alto: '5-7 dias/semana',
      medio: '3-4 dias/semana',
      baixo: '1-2 dias/semana',
    },
  },

  /**
   * KPI 3.2: Simulados Concluídos
   *
   * DEFINIÇÃO:
   * Total de simulados completos realizados pelo aluno.
   *
   * CRITÉRIO "COMPLETO":
   * - Todas as questões respondidas
   * - Tempo respeitado (ou simulado sem tempo)
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Incrementado imediatamente após conclusão
   */
  simuladosConcluidos: {
    metrica: 'Simulados Concluídos',
    unidade: 'quantidade',
    criterioCompleto: 'Todas as questões respondidas',
    frequenciaAtualizacao: 'tempo_real',
    metaRecomendada: {
      porMes: 4, // 1 por semana
      ate3MesesAntesEnem: 12,
    },
  },

  /**
   * KPI 3.3: Consistência (Streak Real)
   *
   * DEFINIÇÃO:
   * Número de dias consecutivos com atividade na plataforma.
   *
   * CRITÉRIO:
   * - Mesmo critério de "dia ativo" (10min ou quiz)
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Verificado diariamente à meia-noite
   */
  consistencia: {
    metrica: 'Consistência (Streak)',
    unidade: 'dias consecutivos',
    criterio: 'Mesmo de Frequência Semanal',
    frequenciaAtualizacao: 'diario_meia_noite',
    impacto: 'Estudos mostram que consistência > intensidade esporádica',
  },

  /**
   * KPI 3.4: Retenção Mensal
   *
   * DEFINIÇÃO:
   * % de usuários que continuam ativos mês após mês.
   *
   * FÓRMULA:
   * Retencao_Mes = (Ativos_Mes_N / Ativos_Mes_N-1) × 100
   *
   * CRITÉRIO "ATIVO NO MÊS":
   * - Pelo menos 1 acesso por semana
   * - Ou 4+ acessos no mês
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Calculado no último dia do mês
   */
  retencaoMensal: {
    metrica: 'Retenção Mensal',
    unidade: 'percentual',
    formula: '(Ativos_Mes_N / Ativos_Mes_N-1) × 100',
    criterioAtivoMes: '1 acesso/semana OU 4+ acessos/mês',
    frequenciaAtualizacao: 'fim_do_mes',
  },
}

// ============================================
// CATEGORIA 4: RESULTADO FINAL
// ============================================

export const KPI_RESULTADO_FINAL = {
  /**
   * KPI 4.1: % de Alunos que Atingiram Nota-Alvo
   *
   * DEFINIÇÃO:
   * Percentual de alunos que definiram uma nota-alvo
   * e conseguiram atingi-la (ou chegar próximo).
   *
   * FÓRMULA:
   * % = (Atingiram_Alvo / Total_Com_Alvo_Definido) × 100
   *
   * CRITÉRIO "ATINGIU":
   * - Nota estimada >= Nota alvo - 50 pontos
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Calculado após divulgação oficial do ENEM
   * - Ou semanalmente para notas estimadas
   */
  atingiramNotaAlvo: {
    metrica: '% que Atingiram Nota-Alvo',
    unidade: 'percentual',
    formula: '(Atingiram_Alvo / Total_Com_Alvo_Definido) × 100',
    criterioAtingiu: 'Nota >= (Alvo - 50 pontos)',
    frequenciaAtualizacao: 'pos_enem_ou_semanal_estimado',
    avisoTransparencia: 'Baseado em notas estimadas até divulgação oficial',
  },

  /**
   * KPI 4.2: % de Aprovados por Curso
   *
   * DEFINIÇÃO:
   * Percentual de alunos aprovados em relação ao total
   * que se inscreveu para cada curso específico.
   *
   * FÓRMULA:
   * % = (Aprovados_Curso_X / Inscritos_Curso_X) × 100
   *
   * CRITÉRIO "APROVADO":
   * - Aluno reportou aprovação voluntariamente
   * - OU sistema detectou aprovação via integração SISU/PROUNI
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Após cada chamada do SISU/PROUNI
   * - Consolidado anualmente
   */
  aprovadosPorCurso: {
    metrica: '% Aprovados por Curso',
    unidade: 'percentual',
    formula: '(Aprovados_Curso_X / Inscritos_Curso_X) × 100',
    criterioAprovado: 'Autorrelatado OU integração SISU/PROUNI',
    frequenciaAtualizacao: 'pos_chamadas_sisu_prouni',
    limitacao: 'Depende de alunos reportarem aprovação voluntariamente',
  },

  /**
   * KPI 4.3: % de Aprovados por Universidade
   *
   * DEFINIÇÃO:
   * Similar ao KPI 4.2, mas agregado por universidade.
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Consolidado anualmente
   */
  aprovadosPorUniversidade: {
    metrica: '% Aprovados por Universidade',
    unidade: 'percentual',
    formula: '(Aprovados_Univ_Y / Inscritos_Univ_Y) × 100',
    frequenciaAtualizacao: 'anual',
  },

  /**
   * KPI 4.4: Evolução entre Tentativas do ENEM
   *
   * DEFINIÇÃO:
   * Quanto alunos que já fizeram o ENEM anteriormente
   * evoluíram entre uma tentativa e outra.
   *
   * FÓRMULA:
   * Evolucao = Nota_Tentativa_N - Nota_Tentativa_N-1
   *
   * SEGMENTAÇÃO:
   * - Primeira vez (baseline para comparação futura)
   * - Segunda tentativa
   * - Terceira ou mais tentativas
   *
   * FREQUÊNCIA DE ATUALIZAÇÃO:
   * - Após divulgação oficial do ENEM
   */
  evolucaoEntreTentativas: {
    metrica: 'Evolução Entre Tentativas ENEM',
    unidade: 'pontos',
    formula: 'Nota_Tentativa_N - Nota_Tentativa_N-1',
    segmentos: ['primeira_vez', 'segunda_tentativa', 'terceira_ou_mais'],
    frequenciaAtualizacao: 'pos_divulgacao_oficial_enem',
    impacto: 'KPI crítico para medir eficácia real do sistema',
  },
}

// ============================================
// METADADOS DO SISTEMA DE KPIs
// ============================================

export const METADADOS_KPIS = {
  versao: '1.0.0',
  ultimaAtualizacao: '2025-01-14',
  responsavel: 'Equipe ENEM PRO',

  principios: [
    'Transparência total',
    'Dados anonimizados',
    'Não prometer resultados individuais',
    'Honestidade sobre limitações',
  ],

  limitacoes: [
    'Notas estimadas têm margem de erro de ±50 pontos',
    'Resultado final depende do ENEM oficial',
    'Aprovação depende de fatores externos (concorrência, nota de corte)',
    'Sistema mede progresso, não garante aprovação',
  ],

  privacidade: {
    armazenamento: 'Dados agregados e anonimizados',
    identificacao: 'IDs internos, sem nomes ou CPFs',
    compartilhamento: 'Apenas métricas agregadas públicas',
    conformidade: 'LGPD',
  },
}
