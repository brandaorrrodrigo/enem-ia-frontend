/**
 * TIPOS DO DASHBOARD CENTRAL DO ALUNO - ENEM PRO
 * UX Educacional + Data Visualization
 */

// =====================================================
// 1. VISÃO GERAL
// =====================================================

export interface VisaoGeral {
  aluno: {
    nome: string;
    avatar_url?: string;
  };

  objetivo: {
    curso: string;
    universidade: string;
    nota_alvo: number;
    peso_curso?: {
      matematica: number;
      natureza: number;
      humanas: number;
      linguagens: number;
      redacao: number;
    };
  };

  situacao_atual: {
    nota_estimada: number; // Baseada em simulados
    nota_alvo: number;
    gap_pontos: number; // Diferença para meta
    percentual_alcancado: number; // 0-100%
    status: 'Crítico' | 'Atenção' | 'No Caminho' | 'Excelente';
    cor_status: '#ef4444' | '#f59e0b' | '#3b82f6' | '#22c55e';
  };

  progresso_por_area: Array<{
    area: 'Matemática' | 'Natureza' | 'Humanas' | 'Linguagens' | 'Redação';
    nota_atual: number;
    nota_necessaria: number;
    gap: number;
    percentual: number; // 0-100
    status: 'abaixo' | 'proximo' | 'atingiu' | 'superou';
  }>;

  proxima_meta: {
    descricao: string; // "Atingir 650 em Matemática"
    pontos_faltantes: number;
    prazo_dias: number;
    motivacao: string; // "Você está 73% do caminho!"
  };
}

// =====================================================
// 2. EVOLUÇÃO
// =====================================================

export interface Evolucao {
  historico_simulados: Array<{
    data: Date;
    nome: string; // "Simulado 3 - Matemática e Natureza"
    nota_geral: number;
    notas_por_area: {
      matematica?: number;
      natureza?: number;
      humanas?: number;
      linguagens?: number;
      redacao?: number;
    };
    questoes_respondidas: number;
    taxa_acerto: number; // 0-100
  }>;

  tendencia: {
    direcao: 'subindo' | 'estavel' | 'caindo';
    variacao_ultimos_7_dias: number; // +15 pontos
    variacao_percentual: number; // +2.3%
    mensagem: string; // "Você melhorou 15 pontos esta semana! 🎉"
  };

  comparacao_temporal: {
    mes_atual: number;
    mes_anterior: number;
    diferenca: number;
    grafico_mensal: Array<{
      mes: string; // "Set", "Out", "Nov"
      nota_media: number;
    }>;
  };

  melhores_performances: Array<{
    materia: string;
    melhoria: number; // +50 pontos
    periodo: string; // "últimos 30 dias"
  }>;

  areas_atencao: Array<{
    materia: string;
    queda: number; // -10 pontos
    motivo_provavel: string; // "Pouca prática recente"
  }>;
}

// =====================================================
// 3. MAPA DE ESTUDO ATUAL
// =====================================================

export interface MapaEstudo {
  plano_vigente: {
    criado_em: Date;
    validade_ate: Date;
    ultima_atualizacao: Date;
    total_topicos: number;
    topicos_concluidos: number;
    percentual_progresso: number; // 0-100
  };

  distribuicao_tempo: Array<{
    area: 'Matemática' | 'Natureza' | 'Humanas' | 'Linguagens' | 'Redação';
    percentual_recomendado: number; // % do tempo total
    horas_semanais: number;
    justificativa: string;
    cor: string; // Para gráfico pizza
  }>;

  topicos_prioritarios: Array<{
    id: string;
    materia: string;
    tema: string;
    prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
    status: 'pendente' | 'em_progresso' | 'dominado';

    // Métricas
    incidencia_enem: number; // 0-100% (frequência no ENEM)
    probabilidade_cair: number; // 0-100%
    seu_desempenho: number; // 0-100% (taxa de acerto)
    gap_conhecimento: number; // Diferença entre ideal e atual

    // Visual
    icone: '🔥' | '⚠️' | '💤'; // CAI MUITO / ÀS VEZES / RARO
    badge?: 'URGENTE' | 'ATENÇÃO' | 'REVISAR';
    cor_badge: string;

    // Ação
    tempo_estimado: number; // horas
    recursos: {
      modulos_biblioteca: number;
      questoes_disponiveis: number;
      simulados_recomendados: number;
    };

    // Insight IA
    recomendacao_ia: string; // "Dedique 4h esta semana. Alta chance de cair!"
  }>;

  semana_atual: {
    numero: number; // Semana 8 de 20
    topicos_da_semana: string[]; // ['Funções', 'Porcentagem', 'Estatística']
    carga_horaria_planejada: number;
    carga_cumprida: number;
    percentual_cumprimento: number;
    status: 'atrasado' | 'no_prazo' | 'adiantado';
  };
}

// =====================================================
// 4. EFICIÊNCIA DE ESTUDO
// =====================================================

export interface EficienciaEstudo {
  metricas_gerais: {
    total_horas_estudadas: number;
    total_questoes_resolvidas: number;
    total_simulados_feitos: number;
    media_questoes_por_hora: number;
    tempo_medio_por_questao: number; // segundos
  };

  retorno_investimento: Array<{
    materia: string;
    horas_investidas: number;
    ganho_pontos: number;
    eficiencia: number; // pontos/hora
    status: 'excelente' | 'bom' | 'regular' | 'baixo';
    cor: string;
    recomendacao: string;
  }>;

  alertas_eficiencia: Array<{
    tipo: 'baixo_retorno' | 'muito_tempo' | 'pouca_pratica' | 'revisar';
    materia: string;
    mensagem: string; // "Você está gastando muito tempo em X mas o retorno é baixo"
    acao_sugerida: string; // "Reduza 30% do tempo em X e aumente em Y"
    icone: string; // ⚠️ ou 💡
    prioridade: 'alta' | 'media' | 'baixa';
  }>;

  comparacao_meta: {
    ritmo_necessario: {
      questoes_por_dia: number;
      horas_por_semana: number;
      simulados_por_mes: number;
    };
    ritmo_atual: {
      questoes_por_dia: number;
      horas_por_semana: number;
      simulados_por_mes: number;
    };
    status: 'acima' | 'dentro' | 'abaixo';
    ajuste_necessario: string; // "+5 questões/dia para manter meta"
  };

  topicos_baixo_retorno: Array<{
    tema: string;
    horas_gastas: number;
    melhoria_obtida: number; // %
    motivo: 'incidência baixa' | 'já domina' | 'complexidade alta';
    sugestao: string; // "Reduza foco neste tópico"
  }>;
}

// =====================================================
// 5. PREVISÃO E CENÁRIOS
// =====================================================

export interface PrevisaoResultado {
  probabilidade_aprovacao: {
    percentual: number; // 0-100
    status: 'Muito Baixa' | 'Baixa' | 'Moderada' | 'Alta' | 'Muito Alta';
    cor: string;
    mensagem_motivacional: string;
  };

  cenarios: {
    otimista: {
      descricao: string; // "Se mantiver ritmo acelerado"
      nota_projetada: number;
      probabilidade: number; // %
      requisitos: string[]; // ["Estudar 25h/semana", "Taxa 80% acerto"]
    };
    realista: {
      descricao: string; // "Mantendo ritmo atual"
      nota_projetada: number;
      probabilidade: number;
      requisitos: string[];
    };
    critico: {
      descricao: string; // "Se ritmo cair"
      nota_projetada: number;
      probabilidade: number;
      riscos: string[]; // ["Perder foco em X", "Reduzir prática"]
    };
  };

  projecao_temporal: Array<{
    data: Date;
    nota_projetada_min: number;
    nota_projetada_max: number;
    nota_projetada_media: number;
    confianca: number; // 0-100%
  }>;

  fatores_criticos: Array<{
    fator: string; // "Matemática precisa subir 80 pontos"
    impacto: 'alto' | 'medio' | 'baixo';
    status_atual: 'critico' | 'atencao' | 'ok';
    acao_recomendada: string;
  }>;

  recomendacoes_ia: Array<{
    tipo: 'aumentar_tempo' | 'mudar_topico' | 'fazer_simulado' | 'revisar';
    prioridade: 'urgente' | 'importante' | 'sugestao';
    mensagem: string;
    impacto_estimado: string; // "+20 pontos esperados"
    icone: string;
  }>;

  dias_ate_enem: number;
  progresso_ideal_ate_hoje: number; // % que deveria ter alcançado
  progresso_real: number; // % real alcançado
  status_ritmo: 'adiantado' | 'no_prazo' | 'atrasado';
}

// =====================================================
// DASHBOARD COMPLETO
// =====================================================

export interface DashboardAluno {
  visao_geral: VisaoGeral;
  evolucao: Evolucao;
  mapa_estudo: MapaEstudo;
  eficiencia: EficienciaEstudo;
  previsao: PrevisaoResultado;

  // Metadados
  atualizado_em: Date;
  proxima_atualizacao: Date;
  versao_ia: string;
}

// =====================================================
// WIDGETS E CARDS
// =====================================================

export interface CardMetrica {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  variacao?: {
    valor: number;
    tipo: 'positiva' | 'negativa' | 'neutra';
    periodo: string; // "vs. semana passada"
  };
  icone?: string;
  cor?: string;
  acao?: {
    label: string;
    href: string;
  };
}

export interface GraficoConfig {
  tipo: 'linha' | 'barra' | 'pizza' | 'radar' | 'area';
  dados: any[];
  cores: string[];
  labels: string[];
  legenda?: boolean;
  tooltip?: boolean;
}

export interface AlertaDashboard {
  id: string;
  tipo: 'sucesso' | 'alerta' | 'info' | 'urgente';
  titulo: string;
  mensagem: string;
  acao?: {
    label: string;
    onClick: () => void;
  };
  dismissible: boolean;
  icone: string;
  cor: string;
}
