/**
 * ANALISADOR DE ESTATÍSTICAS E PROBABILIDADES - ENEM PRO
 * Calcula incidência de tópicos e prevê tendências
 */

import type {
  QuestaoClassificada,
  EstatisticaTopico,
  ProbabilidadeTopico,
  Materia,
  StatusIncidencia,
  Tendencia,
} from '@/types/ai-systems';

// =====================================================
// ANALISADOR DE ESTATÍSTICAS
// =====================================================

export class AnalisadorEstatisticas {
  /**
   * Calcula estatísticas de incidência de tópicos
   */
  calcularEstatisticas(
    questoes: QuestaoClassificada[]
  ): EstatisticaTopico[] {
    // Agrupar questões por tema
    const grupos = this.agruparPorTema(questoes);
    const totalQuestoes = questoes.length;

    const estatisticas: EstatisticaTopico[] = [];

    for (const [chave, questoesGrupo] of Object.entries(grupos)) {
      const [materia, tema, subtema] = chave.split('|');

      const frequenciaAbsoluta = questoesGrupo.length;
      const frequenciaPercentual = (frequenciaAbsoluta / totalQuestoes) * 100;

      const anosAparicao = [
        ...new Set(
          questoesGrupo.map((q) => q.ano).filter((ano) => ano !== undefined)
        ),
      ].sort() as number[];

      const intervaloMedio = this.calcularIntervaloMedio(anosAparicao);
      const statusIncidente = this.classificarIncidencia(frequenciaPercentual);

      estatisticas.push({
        materia: materia as Materia,
        tema_principal: tema,
        subtema: subtema,
        frequencia_absoluta: frequenciaAbsoluta,
        frequencia_percentual: frequenciaPercentual,
        anos_em_que_apareceu: anosAparicao,
        intervalo_medio: intervaloMedio,
        status_incidente: statusIncidente,
        icone: this.obterIconeIncidencia(statusIncidente),
        ultima_atualizacao: new Date(),
        total_questoes_analisadas: totalQuestoes,
      });
    }

    // Ordenar por frequência (mais cobrados primeiro)
    return estatisticas.sort(
      (a, b) => b.frequencia_percentual - a.frequencia_percentual
    );
  }

  /**
   * Calcula probabilidades de tópicos para próximo ENEM
   */
  calcularProbabilidades(
    estatisticas: EstatisticaTopico[],
    anoAtual: number = new Date().getFullYear()
  ): ProbabilidadeTopico[] {
    const probabilidades: ProbabilidadeTopico[] = [];

    for (const stat of estatisticas) {
      const probabilidade = this.calcularProbabilidadeTopico(stat, anoAtual);
      probabilidades.push(probabilidade);
    }

    // Ordenar por probabilidade (mais provável primeiro)
    return probabilidades.sort(
      (a, b) => b.chance_estimada_percentual - a.chance_estimada_percentual
    );
  }

  /**
   * Retorna tópicos "quentes" (alta probabilidade)
   */
  obterTopicosQuentes(
    probabilidades: ProbabilidadeTopico[],
    limite: number = 20
  ): ProbabilidadeTopico[] {
    return probabilidades
      .filter((p) => p.tendencia === 'ALTA' || p.chance_estimada_percentual > 60)
      .slice(0, limite);
  }

  /**
   * Gera relatório de estatísticas por matéria
   */
  gerarRelatorioPorMateria(
    estatisticas: EstatisticaTopico[]
  ): Record<Materia, { total: number; topicos: EstatisticaTopico[] }> {
    const relatorio: any = {};

    for (const stat of estatisticas) {
      if (!relatorio[stat.materia]) {
        relatorio[stat.materia] = {
          total: 0,
          topicos: [],
        };
      }

      relatorio[stat.materia].total += stat.frequencia_absoluta;
      relatorio[stat.materia].topicos.push(stat);
    }

    return relatorio;
  }

  // =====================================================
  // MÉTODOS PRIVADOS
  // =====================================================

  private agruparPorTema(
    questoes: QuestaoClassificada[]
  ): Record<string, QuestaoClassificada[]> {
    const grupos: Record<string, QuestaoClassificada[]> = {};

    for (const questao of questoes) {
      const chave = `${questao.classificacao.materia}|${questao.classificacao.tema_principal}|${questao.classificacao.subtema}`;

      if (!grupos[chave]) {
        grupos[chave] = [];
      }

      grupos[chave].push(questao);
    }

    return grupos;
  }

  private calcularIntervaloMedio(anos: number[]): number {
    if (anos.length < 2) return 0;

    const intervalos: number[] = [];
    for (let i = 1; i < anos.length; i++) {
      intervalos.push(anos[i] - anos[i - 1]);
    }

    const soma = intervalos.reduce((acc, val) => acc + val, 0);
    return soma / intervalos.length;
  }

  private classificarIncidencia(
    frequenciaPercentual: number
  ): StatusIncidencia {
    if (frequenciaPercentual >= 60) return 'CAI MUITO';
    if (frequenciaPercentual >= 30) return 'CAI ÀS VEZES';
    return 'RARO';
  }

  private obterIconeIncidencia(
    status: StatusIncidencia
  ): '🔥' | '⚠️' | '💤' {
    switch (status) {
      case 'CAI MUITO':
        return '🔥';
      case 'CAI ÀS VEZES':
        return '⚠️';
      case 'RARO':
        return '💤';
    }
  }

  private calcularProbabilidadeTopico(
    estatistica: EstatisticaTopico,
    anoAtual: number
  ): ProbabilidadeTopico {
    const {
      materia,
      tema_principal,
      frequencia_percentual,
      anos_em_que_apareceu,
      intervalo_medio,
    } = estatistica;

    // Fatores de análise
    const frequenciaHistorica = frequencia_percentual;

    const ultimoAno =
      anos_em_que_apareceu.length > 0
        ? Math.max(...anos_em_que_apareceu)
        : anoAtual - 10;
    const tempoDesdeUltima = anoAtual - ultimoAno;

    // Calcular tendência
    let tendenciaCrescimento: 'crescente' | 'estável' | 'decrescente' =
      'estável';
    if (anos_em_que_apareceu.length >= 3) {
      const ultimos3 = anos_em_que_apareceu.slice(-3);
      const gaps = ultimos3
        .slice(1)
        .map((ano, i) => ano - ultimos3[i]);
      const mediaGaps = gaps.reduce((a, b) => a + b, 0) / gaps.length;

      if (mediaGaps < intervalo_medio * 0.8) tendenciaCrescimento = 'crescente';
      else if (mediaGaps > intervalo_medio * 1.2)
        tendenciaCrescimento = 'decrescente';
    }

    // Calcular probabilidade estimada
    let chanceEstimada = frequenciaHistorica;

    // Ajustes baseados em tempo
    if (tempoDesdeUltima >= intervalo_medio * 1.5) {
      chanceEstimada += 15; // Aumenta chance se faz tempo que não cai
    } else if (tempoDesdeUltima < 1) {
      chanceEstimada -= 20; // Reduz se caiu recentemente
    }

    // Ajuste por tendência
    if (tendenciaCrescimento === 'crescente') chanceEstimada += 10;
    else if (tendenciaCrescimento === 'decrescente') chanceEstimada -= 10;

    // Limitar entre 0-100
    chanceEstimada = Math.max(0, Math.min(100, chanceEstimada));

    // Classificar tendência
    const tendencia: Tendencia =
      chanceEstimada >= 70 ? 'ALTA' : chanceEstimada >= 40 ? 'MEDIA' : 'BAIXA';

    // Gerar justificativa
    const justificativa = this.gerarJustificativa({
      frequenciaHistorica,
      tempoDesdeUltima,
      tendenciaCrescimento,
      chanceEstimada,
    });

    // Gerar recomendação
    const recomendacao = this.gerarRecomendacao(tendencia, chanceEstimada);

    // Calcular confiança
    const confianca = this.calcularConfianca(anos_em_que_apareceu.length);

    return {
      materia,
      tema_principal,
      chance_estimada_percentual: Math.round(chanceEstimada),
      tendencia,
      justificativa,
      recomendacao_estudo: recomendacao,
      fatores: {
        frequencia_historica: frequenciaHistorica,
        tempo_desde_ultima_aparicao: tempoDesdeUltima,
        tendencia_crescimento: tendenciaCrescimento,
        peso_competencia_inep: 5, // Pode ser ajustado com dados INEP reais
      },
      calculado_em: new Date(),
      confianca,
    };
  }

  private gerarJustificativa(fatores: {
    frequenciaHistorica: number;
    tempoDesdeUltima: number;
    tendenciaCrescimento: string;
    chanceEstimada: number;
  }): string {
    let just = `Tópico com ${fatores.frequenciaHistorica.toFixed(1)}% de incidência histórica. `;

    if (fatores.tempoDesdeUltima >= 2) {
      just += `Não aparece há ${fatores.tempoDesdeUltima} anos, aumentando probabilidade. `;
    } else if (fatores.tempoDesdeUltima === 0) {
      just += `Caiu recentemente, reduzindo probabilidade de recorrência imediata. `;
    }

    if (fatores.tendenciaCrescimento === 'crescente') {
      just += `Tendência crescente de cobrança nos últimos anos.`;
    } else if (fatores.tendenciaCrescimento === 'decrescente') {
      just += `Tendência decrescente, mas ainda relevante.`;
    }

    return just;
  }

  private gerarRecomendacao(
    tendencia: Tendencia,
    chance: number
  ): string {
    if (tendencia === 'ALTA') {
      return `PRIORIDADE MÁXIMA: Dedique tempo significativo a este tópico. Chance de ${chance}% de cair.`;
    } else if (tendencia === 'MEDIA') {
      return `PRIORIDADE MÉDIA: Estude após dominar tópicos de alta prioridade.`;
    } else {
      return `PRIORIDADE BAIXA: Foque apenas se sobrar tempo de estudo.`;
    }
  }

  private calcularConfianca(qtdAnosAnalisados: number): number {
    // Quanto mais anos de dados, maior a confiança
    if (qtdAnosAnalisados >= 10) return 90;
    if (qtdAnosAnalisados >= 5) return 75;
    if (qtdAnosAnalisados >= 3) return 60;
    return 40;
  }
}

// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================

/**
 * Exemplo de uso completo
 */
export async function exemploAnaliseCompleta() {
  // Dados fictícios para demonstração
  const questoesClassificadas: QuestaoClassificada[] = [
    // ... questões classificadas
  ];

  const analisador = new AnalisadorEstatisticas();

  // 1. Calcular estatísticas
  const estatisticas =
    analisador.calcularEstatisticas(questoesClassificadas);
  console.log('Estatísticas:', estatisticas);

  // 2. Calcular probabilidades
  const probabilidades = analisador.calcularProbabilidades(estatisticas, 2025);
  console.log('Probabilidades:', probabilidades);

  // 3. Obter tópicos quentes
  const topicosQuentes = analisador.obterTopicosQuentes(probabilidades, 10);
  console.log('Tópicos Quentes 🔥:', topicosQuentes);

  // 4. Relatório por matéria
  const relatorio = analisador.gerarRelatorioPorMateria(estatisticas);
  console.log('Relatório por Matéria:', relatorio);
}
