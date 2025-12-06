import { Questao, ExplicacaoIA, SugestaoEstudo, AreaFraca } from '../types';

// ========================================
// MODULO DE IA - EXPLICACOES E SUGESTOES
// ========================================

/**
 * Gera explicacao detalhada para uma questao
 */
export function explicarQuestao(questao: Questao): ExplicacaoIA {
  // Gera explicacao baseada na area e assunto
  const explicacaoBase = questao.explicacao;

  // Conceitos por area
  const conceitos: { [key: string]: { [key: string]: string } } = {
    matematica: {
      'Aritmetica': 'Operacoes fundamentais, divisibilidade, MMC e MDC',
      'Algebra': 'Equacoes, funcoes, polinomios e sistemas',
      'Geometria': 'Formas, areas, volumes e trigonometria',
      'Estatistica': 'Media, mediana, moda, probabilidade e graficos',
      'Porcentagem': 'Calculos proporcionais, aumentos e descontos',
      'Funcoes': 'Funcoes lineares, quadraticas, exponenciais e logaritmicas',
    },
    linguagens: {
      'Gramatica': 'Sintaxe, morfologia, semantica e ortografia',
      'Literatura': 'Movimentos literarios, autores e obras',
      'Interpretacao': 'Analise textual, inferencia e argumentacao',
      'Figuras de Linguagem': 'Metafora, metonimia, hiperbole, ironia e outras',
      'Generos Textuais': 'Estrutura e caracteristicas de diferentes tipos de texto',
    },
    humanas: {
      'Historia do Brasil': 'Colonizacao, Imperio, Republica e eventos marcantes',
      'Historia Geral': 'Antiguidade, Idade Media, Moderna e Contemporanea',
      'Geografia': 'Cartografia, clima, relevo, hidrografia e geopolitica',
      'Filosofia': 'Pensadores, correntes filosoficas e etica',
      'Sociologia': 'Teorias sociais, cultura e sociedade',
    },
    natureza: {
      'Biologia': 'Celula, genetica, ecologia, evolucao e fisiologia',
      'Fisica': 'Mecanica, termodinamica, optica, eletricidade e ondas',
      'Quimica': 'Atomistica, reacoes, estequiometria e quimica organica',
    }
  };

  // Dicas por area
  const dicasEstudo: { [key: string]: string[] } = {
    matematica: [
      'Pratique resolvendo muitos exercicios de diferentes niveis',
      'Revise as formulas e saiba quando aplicar cada uma',
      'Faca simulados cronometrados para ganhar velocidade',
      'Nao pule etapas - mostre todo o raciocinio',
    ],
    linguagens: [
      'Leia textos variados: jornais, literatura, artigos cientificos',
      'Pratique redacoes semanalmente seguindo a estrutura ENEM',
      'Estude os conectivos e sua funcao na argumentacao',
      'Revise as obras literarias obrigatorias',
    ],
    humanas: [
      'Faca mapas mentais conectando eventos historicos',
      'Relacione acontecimentos com o contexto atual',
      'Estude mapas e graficos com atencao',
      'Entenda as diferentes visoes dos pensadores',
    ],
    natureza: [
      'Entenda os conceitos antes de decorar formulas',
      'Relacione teoria com exemplos do cotidiano',
      'Pratique calculos e conversao de unidades',
      'Revise experimentos classicos e suas conclusoes',
    ]
  };

  const areaConceitos = conceitos[questao.area] || {};
  const conceito = areaConceitos[questao.assunto] ||
    `Conceitos fundamentais de ${questao.assunto} em ${questao.disciplina}`;

  const areaDicas = dicasEstudo[questao.area] || dicasEstudo.matematica;
  const dicaAleatoria = areaDicas[Math.floor(Math.random() * areaDicas.length)];

  return {
    questaoId: questao.id,
    explicacaoDetalhada: `${explicacaoBase}\n\nEsta questao aborda ${questao.assunto}, um tema importante em ${questao.disciplina}. No ENEM, este tipo de questao costuma aparecer com frequencia, exigindo que o estudante compreenda os conceitos basicos e saiba aplica-los em situacoes praticas.`,
    conceito: conceito,
    dicaEstudo: dicaAleatoria,
    recursosRelacionados: [
      `Revise: ${questao.disciplina} - ${questao.assunto}`,
      `Pratique mais questoes de ${questao.area}`,
      `Assista videoaulas sobre ${questao.assunto}`
    ]
  };
}

/**
 * Identifica areas fracas baseado nas estatisticas do usuario
 */
export function identificarAreassFracas(
  estatisticasPorArea: { [area: string]: { questoes: number; acertos: number } },
  estatisticasPorDisciplina: { [disciplina: string]: { questoes: number; acertos: number } },
  limiteMinimo: number = 5
): AreaFraca[] {
  const areassFracas: AreaFraca[] = [];

  // Analisa por area
  Object.entries(estatisticasPorArea).forEach(([area, stats]) => {
    if (stats.questoes >= limiteMinimo) {
      const taxaAcerto = (stats.acertos / stats.questoes) * 100;

      if (taxaAcerto < 50) {
        areassFracas.push({
          area,
          taxaAcerto,
          totalQuestoes: stats.questoes,
          prioridade: taxaAcerto < 30 ? 'alta' : 'media'
        });
      }
    }
  });

  // Analisa por disciplina
  Object.entries(estatisticasPorDisciplina).forEach(([disciplina, stats]) => {
    if (stats.questoes >= limiteMinimo) {
      const taxaAcerto = (stats.acertos / stats.questoes) * 100;

      if (taxaAcerto < 50) {
        areassFracas.push({
          area: 'geral',
          disciplina,
          taxaAcerto,
          totalQuestoes: stats.questoes,
          prioridade: taxaAcerto < 30 ? 'alta' : taxaAcerto < 40 ? 'media' : 'baixa'
        });
      }
    }
  });

  // Ordena por prioridade e taxa de acerto
  return areassFracas.sort((a, b) => {
    const prioridadeOrdem = { alta: 0, media: 1, baixa: 2 };
    const diff = prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
    if (diff !== 0) return diff;
    return a.taxaAcerto - b.taxaAcerto;
  });
}

/**
 * Gera sugestoes de estudo personalizadas
 */
export function gerarSugestoesEstudo(areassFracas: AreaFraca[]): SugestaoEstudo[] {
  const sugestoes: SugestaoEstudo[] = [];

  areassFracas.slice(0, 5).forEach(areaFraca => {
    const assunto = areaFraca.disciplina || areaFraca.area;

    let motivo = '';
    if (areaFraca.prioridade === 'alta') {
      motivo = `Sua taxa de acerto em ${assunto} esta em ${areaFraca.taxaAcerto.toFixed(0)}%. E urgente melhorar!`;
    } else if (areaFraca.prioridade === 'media') {
      motivo = `Voce pode melhorar em ${assunto}. Taxa atual: ${areaFraca.taxaAcerto.toFixed(0)}%`;
    } else {
      motivo = `${assunto} precisa de mais pratica. Taxa: ${areaFraca.taxaAcerto.toFixed(0)}%`;
    }

    sugestoes.push({
      assunto,
      prioridade: areaFraca.prioridade,
      motivo,
      questoesRecomendadas: [], // IDs seriam preenchidos com base no filtro
      tempoEstimado: areaFraca.prioridade === 'alta' ? 60 : areaFraca.prioridade === 'media' ? 45 : 30
    });
  });

  return sugestoes;
}

/**
 * Gera plano de estudo semanal
 */
export function gerarPlanoSemanal(areassFracas: AreaFraca[]): {
  dia: string;
  atividade: string;
  area: string;
  duracao: number;
}[] {
  const diasSemana = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
  const plano: { dia: string; atividade: string; area: string; duracao: number }[] = [];

  // Distribui areas fracas pelos dias
  const areasParaEstudar = areassFracas.length > 0
    ? areassFracas.map(a => a.disciplina || a.area)
    : ['matematica', 'linguagens', 'humanas', 'natureza'];

  diasSemana.forEach((dia, idx) => {
    if (dia === 'Domingo') {
      plano.push({
        dia,
        atividade: 'Simulado completo ou revisao geral',
        area: 'todas',
        duracao: 120
      });
    } else {
      const areaIdx = idx % areasParaEstudar.length;
      const area = areasParaEstudar[areaIdx];

      plano.push({
        dia,
        atividade: `Estudo focado + 20 questoes de ${area}`,
        area,
        duracao: 60
      });
    }
  });

  return plano;
}

/**
 * Gera feedback motivacional baseado no desempenho
 */
export function gerarFeedbackMotivacional(
  acertos: number,
  total: number,
  streak: number
): { mensagem: string; emoji: string; cor: string } {
  const porcentagem = (acertos / total) * 100;

  if (porcentagem >= 90) {
    return {
      mensagem: 'Incrivel! Voce esta dominando o conteudo!',
      emoji: '🏆',
      cor: 'emerald'
    };
  } else if (porcentagem >= 70) {
    return {
      mensagem: 'Otimo trabalho! Continue assim e vai arrasar no ENEM!',
      emoji: '🌟',
      cor: 'blue'
    };
  } else if (porcentagem >= 50) {
    return {
      mensagem: 'Bom progresso! Foque nas areas que errou para melhorar.',
      emoji: '💪',
      cor: 'yellow'
    };
  } else if (porcentagem >= 30) {
    return {
      mensagem: 'Nao desanime! Revise os conceitos basicos e tente novamente.',
      emoji: '📚',
      cor: 'orange'
    };
  } else {
    return {
      mensagem: 'Hora de voltar ao basico. Assista videoaulas e leia a teoria.',
      emoji: '🎯',
      cor: 'red'
    };
  }
}

// Exporta tudo
export default {
  explicarQuestao,
  identificarAreassFracas,
  gerarSugestoesEstudo,
  gerarPlanoSemanal,
  gerarFeedbackMotivacional
};
