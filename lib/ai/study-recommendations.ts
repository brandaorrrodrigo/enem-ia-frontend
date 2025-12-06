// ========================================
// IA - RECOMENDACOES DE ESTUDO
// ========================================

import { AreaENEM, DificuldadeLabel } from '../types/questao';
import { SimuladoResultado } from '../questions/simulado-generator';

// ========================================
// TIPOS
// ========================================

export interface AreaFraca {
  area: AreaENEM;
  disciplina?: string;
  tema?: string;
  taxaAcerto: number;
  totalQuestoes: number;
  prioridade: 'critica' | 'alta' | 'media' | 'baixa';
  tendencia: 'melhorando' | 'estavel' | 'piorando';
}

export interface SugestaoEstudo {
  id: string;
  tipo: 'revisao' | 'treino' | 'simulado' | 'teoria';
  area?: AreaENEM;
  disciplina?: string;
  tema?: string;
  titulo: string;
  descricao: string;
  duracao: number;
  prioridade: 'alta' | 'media' | 'baixa';
  motivo: string;
}

export interface PlanoEstudo {
  id: string;
  nome: string;
  periodo: {
    inicio: string;
    fim: string;
    diasSemana: number[];
  };
  horasDiarias: number;
  foco: AreaENEM[];
  atividades: AtividadePlano[];
  progresso: number;
}

export interface AtividadePlano {
  dia: string;
  tipo: 'teoria' | 'exercicios' | 'simulado' | 'revisao' | 'descanso';
  area?: AreaENEM;
  disciplina?: string;
  descricao: string;
  duracao: number;
  concluida: boolean;
}

export interface PerfilEstudante {
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  areasFortes: AreaENEM[];
  areasFracas: AreaENEM[];
  tempoDisponivel: number;
  objetivo: 'aprovacao' | 'nota_maxima' | 'melhoria';
  dataProva?: string;
}

// ========================================
// ANALISE DE DESEMPENHO
// ========================================

/**
 * Analisa desempenho e identifica areas fracas
 */
export function analisarDesempenho(
  historico: SimuladoResultado[]
): {
  areassFracas: AreaFraca[];
  areasFortes: AreaENEM[];
  mediaGeral: number;
  tendenciaGeral: 'melhorando' | 'estavel' | 'piorando';
} {
  if (historico.length === 0) {
    return {
      areassFracas: [],
      areasFortes: [],
      mediaGeral: 0,
      tendenciaGeral: 'estavel',
    };
  }

  // Agregar dados por area
  const desempenhoPorArea: Record<AreaENEM, { acertos: number; total: number; historico: number[] }> = {
    matematica: { acertos: 0, total: 0, historico: [] },
    linguagens: { acertos: 0, total: 0, historico: [] },
    humanas: { acertos: 0, total: 0, historico: [] },
    natureza: { acertos: 0, total: 0, historico: [] },
    redacao: { acertos: 0, total: 0, historico: [] },
  };

  let totalAcertos = 0;
  let totalQuestoes = 0;
  const historicoNotas: number[] = [];

  historico.forEach((resultado) => {
    totalAcertos += resultado.acertos;
    totalQuestoes += resultado.total;
    historicoNotas.push(resultado.nota);

    // Agregar por area
    Object.entries(resultado.desempenhoPorArea || {}).forEach(([area, dados]) => {
      const areaKey = area as AreaENEM;
      if (desempenhoPorArea[areaKey]) {
        desempenhoPorArea[areaKey].acertos += dados.acertos;
        desempenhoPorArea[areaKey].total += dados.total;
        if (dados.total > 0) {
          desempenhoPorArea[areaKey].historico.push((dados.acertos / dados.total) * 100);
        }
      }
    });
  });

  // Calcular areas fracas
  const areassFracas: AreaFraca[] = [];
  const areasFortes: AreaENEM[] = [];

  Object.entries(desempenhoPorArea).forEach(([area, dados]) => {
    if (dados.total < 5) return; // Minimo de questoes

    const taxaAcerto = (dados.acertos / dados.total) * 100;
    const tendencia = calcularTendencia(dados.historico);

    if (taxaAcerto < 50) {
      areassFracas.push({
        area: area as AreaENEM,
        taxaAcerto,
        totalQuestoes: dados.total,
        prioridade: taxaAcerto < 30 ? 'critica' : taxaAcerto < 40 ? 'alta' : 'media',
        tendencia,
      });
    } else if (taxaAcerto >= 70) {
      areasFortes.push(area as AreaENEM);
    }
  });

  // Ordenar areas fracas por prioridade
  areassFracas.sort((a, b) => {
    const prioridadeOrdem = { critica: 0, alta: 1, media: 2, baixa: 3 };
    return prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
  });

  const mediaGeral = totalQuestoes > 0 ? (totalAcertos / totalQuestoes) * 100 : 0;
  const tendenciaGeral = calcularTendencia(historicoNotas);

  return {
    areassFracas,
    areasFortes,
    mediaGeral,
    tendenciaGeral,
  };
}

/**
 * Calcula tendencia de uma serie
 */
function calcularTendencia(serie: number[]): 'melhorando' | 'estavel' | 'piorando' {
  if (serie.length < 3) return 'estavel';

  const ultimos = serie.slice(-5);
  const primeiros = ultimos.slice(0, Math.floor(ultimos.length / 2));
  const segundos = ultimos.slice(Math.floor(ultimos.length / 2));

  const mediaPrimeiros = primeiros.reduce((a, b) => a + b, 0) / primeiros.length;
  const mediaSegundos = segundos.reduce((a, b) => a + b, 0) / segundos.length;

  const diferenca = mediaSegundos - mediaPrimeiros;

  if (diferenca > 5) return 'melhorando';
  if (diferenca < -5) return 'piorando';
  return 'estavel';
}

// ========================================
// GERACAO DE SUGESTOES
// ========================================

/**
 * Gera sugestoes de estudo personalizadas
 */
export function gerarSugestoesEstudo(
  analise: ReturnType<typeof analisarDesempenho>,
  perfil?: PerfilEstudante
): SugestaoEstudo[] {
  const sugestoes: SugestaoEstudo[] = [];
  const tempoDisponivel = perfil?.tempoDisponivel || 60;

  // Sugestoes para areas fracas
  analise.areassFracas.slice(0, 3).forEach((areaFraca, idx) => {
    sugestoes.push({
      id: `sug_${Date.now()}_${idx}`,
      tipo: areaFraca.prioridade === 'critica' ? 'teoria' : 'treino',
      area: areaFraca.area,
      titulo: `Reforco em ${areaFraca.area}`,
      descricao: areaFraca.prioridade === 'critica'
        ? `Revise os conceitos basicos de ${areaFraca.area}. Taxa atual: ${areaFraca.taxaAcerto.toFixed(0)}%`
        : `Pratique questoes de ${areaFraca.area} para melhorar seu desempenho`,
      duracao: Math.min(tempoDisponivel / 2, 45),
      prioridade: areaFraca.prioridade === 'critica' ? 'alta' : 'media',
      motivo: `Sua taxa de acerto em ${areaFraca.area} esta em ${areaFraca.taxaAcerto.toFixed(0)}%`,
    });
  });

  // Sugestao de simulado
  if (analise.mediaGeral > 0) {
    sugestoes.push({
      id: `sug_simulado_${Date.now()}`,
      tipo: 'simulado',
      titulo: 'Simulado de Consolidacao',
      descricao: analise.areassFracas.length > 0
        ? `Simulado focado em ${analise.areassFracas.map(a => a.area).join(', ')}`
        : 'Simulado geral para manter o ritmo de estudos',
      duracao: Math.min(tempoDisponivel, 60),
      prioridade: 'media',
      motivo: 'Simulados regulares ajudam a manter o ritmo e identificar pontos de melhoria',
    });
  }

  // Sugestao para areas fortes (manter)
  if (analise.areasFortes.length > 0) {
    sugestoes.push({
      id: `sug_manutencao_${Date.now()}`,
      tipo: 'revisao',
      area: analise.areasFortes[0],
      titulo: `Revisao de ${analise.areasFortes[0]}`,
      descricao: 'Revisao rapida para manter seu bom desempenho',
      duracao: 20,
      prioridade: 'baixa',
      motivo: 'Voce esta indo bem nesta area. Continue praticando para manter!',
    });
  }

  return sugestoes;
}

// ========================================
// GERACAO DE PLANO DE ESTUDO
// ========================================

/**
 * Gera plano de estudo semanal
 */
export function gerarPlanoSemanal(
  analise: ReturnType<typeof analisarDesempenho>,
  perfil: PerfilEstudante
): PlanoEstudo {
  const hoje = new Date();
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay() + 1);
  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);

  const diasSemana = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

  // Determinar areas de foco
  const areasFoco = analise.areassFracas.slice(0, 2).map(a => a.area);
  if (areasFoco.length === 0) {
    areasFoco.push('matematica', 'linguagens' as AreaENEM);
  }

  // Gerar atividades
  const atividades: AtividadePlano[] = diasSemana.map((dia, idx) => {
    const diaSemana = idx;

    // Domingo = simulado ou descanso
    if (diaSemana === 6) {
      return {
        dia,
        tipo: perfil.objetivo === 'nota_maxima' ? 'simulado' : 'descanso',
        descricao: perfil.objetivo === 'nota_maxima'
          ? 'Simulado completo ou por area'
          : 'Descanso e revisao leve',
        duracao: perfil.objetivo === 'nota_maxima' ? 120 : 30,
        concluida: false,
      };
    }

    // Sabado = revisao geral
    if (diaSemana === 5) {
      return {
        dia,
        tipo: 'revisao',
        descricao: 'Revisao dos conteudos da semana',
        duracao: perfil.tempoDisponivel * 60,
        concluida: false,
      };
    }

    // Dias de semana = alternar entre areas fracas
    const areaIdx = diaSemana % areasFoco.length;
    const area = areasFoco[areaIdx];
    const tipoAtividade = diaSemana % 2 === 0 ? 'teoria' : 'exercicios';

    return {
      dia,
      tipo: tipoAtividade,
      area,
      descricao: tipoAtividade === 'teoria'
        ? `Estudo teorico de ${area}`
        : `Resolucao de questoes de ${area}`,
      duracao: perfil.tempoDisponivel * 60,
      concluida: false,
    };
  });

  return {
    id: `plano_${Date.now()}`,
    nome: `Plano Semanal - ${inicioSemana.toLocaleDateString('pt-BR')}`,
    periodo: {
      inicio: inicioSemana.toISOString(),
      fim: fimSemana.toISOString(),
      diasSemana: perfil.objetivo === 'nota_maxima' ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5],
    },
    horasDiarias: perfil.tempoDisponivel,
    foco: areasFoco,
    atividades,
    progresso: 0,
  };
}

/**
 * Gera plano intensivo para vespera de prova
 */
export function gerarPlanoIntensivo(
  diasAteProva: number,
  areassFracas: AreaFraca[]
): AtividadePlano[] {
  const atividades: AtividadePlano[] = [];
  const areas = areassFracas.length > 0
    ? areassFracas.map(a => a.area)
    : ['matematica', 'linguagens', 'humanas', 'natureza'] as AreaENEM[];

  for (let dia = 0; dia < Math.min(diasAteProva, 7); dia++) {
    const data = new Date();
    data.setDate(data.getDate() + dia);
    const diaStr = data.toLocaleDateString('pt-BR', { weekday: 'long' });

    // Ultimo dia = revisao leve
    if (dia === diasAteProva - 1) {
      atividades.push({
        dia: diaStr,
        tipo: 'revisao',
        descricao: 'Revisao leve e descanso. Confie no que voce estudou!',
        duracao: 60,
        concluida: false,
      });
      continue;
    }

    // Penultimo dia = simulado
    if (dia === diasAteProva - 2) {
      atividades.push({
        dia: diaStr,
        tipo: 'simulado',
        descricao: 'Ultimo simulado antes da prova',
        duracao: 180,
        concluida: false,
      });
      continue;
    }

    // Demais dias = foco em areas fracas
    const areaFoco = areas[dia % areas.length];
    atividades.push({
      dia: diaStr,
      tipo: dia % 2 === 0 ? 'teoria' : 'exercicios',
      area: areaFoco,
      descricao: `Revisao intensiva de ${areaFoco}`,
      duracao: 120,
      concluida: false,
    });
  }

  return atividades;
}

// ========================================
// FEEDBACK MOTIVACIONAL
// ========================================

export interface FeedbackMotivacional {
  mensagem: string;
  emoji: string;
  cor: 'green' | 'blue' | 'yellow' | 'orange' | 'red';
  proximoObjetivo: string;
  dicaDoDia: string;
}

/**
 * Gera feedback motivacional baseado no desempenho
 */
export function gerarFeedbackMotivacional(
  nota: number,
  streak: number,
  meta?: number
): FeedbackMotivacional {
  const dicasDoDia = [
    'Faca pausas regulares para manter o foco',
    'Hidrate-se! Beber agua ajuda na concentracao',
    'Revise os erros do ultimo simulado',
    'Ensine o conteudo para alguem - isso ajuda a fixar',
    'Nao deixe de dormir bem. O descanso e essencial!',
  ];

  const dicaAleatoria = dicasDoDia[Math.floor(Math.random() * dicasDoDia.length)];

  if (nota >= 80) {
    return {
      mensagem: streak > 5
        ? `Fantastico! ${streak} dias seguidos estudando e nota ${nota}%! Voce esta voando!`
        : `Excelente desempenho! Nota ${nota}% e muito bom!`,
      emoji: '🏆',
      cor: 'green',
      proximoObjetivo: 'Mantenha o ritmo e mire nos 90%!',
      dicaDoDia: dicaAleatoria,
    };
  }

  if (nota >= 60) {
    return {
      mensagem: `Bom trabalho! Nota ${nota}%. Voce esta no caminho certo!`,
      emoji: '🌟',
      cor: 'blue',
      proximoObjetivo: `Faltam ${(meta || 80) - nota}% para sua meta!`,
      dicaDoDia: dicaAleatoria,
    };
  }

  if (nota >= 40) {
    return {
      mensagem: `Nota ${nota}%. Nao desanime! Cada erro e uma oportunidade de aprender.`,
      emoji: '💪',
      cor: 'yellow',
      proximoObjetivo: 'Foque nas areas que mais errou',
      dicaDoDia: dicaAleatoria,
    };
  }

  return {
    mensagem: `Nota ${nota}%. Hora de voltar ao basico. Voce consegue!`,
    emoji: '📚',
    cor: 'orange',
    proximoObjetivo: 'Revise a teoria antes de fazer mais questoes',
    dicaDoDia: dicaAleatoria,
  };
}
