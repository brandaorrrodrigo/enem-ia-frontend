/**
 * GERADOR DE PLANOS DE ESTUDO PERSONALIZADO - ENEM PRO
 * Cria planos otimizados baseados em estatísticas e objetivos do aluno
 */

import type {
  PerfilAluno,
  PlanoEstudo,
  TopicoEstudo,
  EstatisticaTopico,
  ProbabilidadeTopico,
  DashboardEstatisticas,
  Prioridade,
} from '@/types/ai-systems';

// =====================================================
// GERADOR DE PLANOS
// =====================================================

export class GeradorPlanos {
  /**
   * Gera um plano de estudos personalizado
   */
  gerarPlano(
    perfil: PerfilAluno,
    estatisticas: EstatisticaTopico[],
    probabilidades: ProbabilidadeTopico[],
    desempenho?: DashboardEstatisticas
  ): PlanoEstudo {
    // 1. Calcular gaps e necessidades
    const analise = this.analisarPerfil(perfil);

    // 2. Priorizar áreas de estudo
    const prioridadesArea = this.definirPrioridadeAreas(perfil, analise);

    // 3. Selecionar tópicos prioritários
    const topicos = this.selecionarTopicos(
      perfil,
      estatisticas,
      probabilidades,
      desempenho,
      analise
    );

    // 4. Criar cronograma semanal
    const cronograma = this.criarCronograma(
      topicos,
      perfil.tempo_disponivel_semanal
    );

    // 5. Gerar orientações estratégicas
    const estrategia = this.gerarEstrategia(analise, topicos);
    const alertas = this.gerarAlertas(analise, perfil);
    const recomendacao = this.gerarRecomendacaoFinal(analise);

    const dataAtual = new Date();
    const validadeAte = new Date();
    validadeAte.setMonth(10); // Válido até novembro (ENEM)
    validadeAte.setDate(1);

    return {
      aluno_id: perfil.id,
      criado_em: dataAtual,
      validade_ate: validadeAte,
      perfil_aluno: {
        curso: perfil.curso_desejado,
        nota_atual_media: analise.nota_atual_media,
        nota_alvo: perfil.nota_alvo_total,
        gap_pontos: analise.gap_pontos,
      },
      prioridade_por_area: prioridadesArea,
      topicos_prioritarios: topicos,
      cronograma_semanal: cronograma,
      estrategia_geral: estrategia,
      alertas,
      recomendacao_final: recomendacao,
    };
  }

  /**
   * Atualiza plano baseado em progresso
   */
  atualizarPlano(
    planoAtual: PlanoEstudo,
    novoDesempenho: DashboardEstatisticas
  ): PlanoEstudo {
    // Reavaliar tópicos com base no progresso
    const topicosAtualizados = planoAtual.topicos_prioritarios.filter(
      (topico) => {
        const topicosDominados = novoDesempenho.topicos_dominados.map(
          (t) => t.tema
        );
        return !topicosDominados.includes(topico.tema);
      }
    );

    // Recalcular cronograma
    const cronogramaAtualizado = this.criarCronograma(
      topicosAtualizados,
      24 // Tempo padrão
    );

    return {
      ...planoAtual,
      topicos_prioritarios: topicosAtualizados,
      cronograma_semanal: cronogramaAtualizado,
      alertas: [
        ...planoAtual.alertas,
        `Plano atualizado em ${new Date().toLocaleDateString()} com base no seu progresso.`,
      ],
    };
  }

  // =====================================================
  // MÉTODOS PRIVADOS - ANÁLISE
  // =====================================================

  private analisarPerfil(perfil: PerfilAluno) {
    const { notas_atuais, nota_alvo_total } = perfil;

    const nota_atual_media =
      (notas_atuais.matematica +
        notas_atuais.natureza +
        notas_atuais.humanas +
        notas_atuais.linguagens +
        notas_atuais.redacao) /
      5;

    const gap_pontos = nota_alvo_total / 5 - nota_atual_media;

    // Calcular qual área precisa de mais atenção
    const gaps_por_area = {
      matematica: nota_alvo_total / 5 - notas_atuais.matematica,
      natureza: nota_alvo_total / 5 - notas_atuais.natureza,
      humanas: nota_alvo_total / 5 - notas_atuais.humanas,
      linguagens: nota_alvo_total / 5 - notas_atuais.linguagens,
      redacao: nota_alvo_total / 5 - notas_atuais.redacao,
    };

    return {
      nota_atual_media,
      gap_pontos,
      gaps_por_area,
      area_mais_fraca: this.identificarAreaMaisFraca(gaps_por_area),
      area_mais_forte: this.identificarAreaMaisForte(gaps_por_area),
    };
  }

  private identificarAreaMaisFraca(gaps: Record<string, number>): string {
    return Object.entries(gaps).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
  }

  private identificarAreaMaisForte(gaps: Record<string, number>): string {
    return Object.entries(gaps).reduce((a, b) =>
      a[1] < b[1] ? a : b
    )[0];
  }

  // =====================================================
  // MÉTODOS PRIVADOS - PRIORIZAÇÃO
  // =====================================================

  private definirPrioridadeAreas(perfil: PerfilAluno, analise: any) {
    const prioridades: PlanoEstudo['prioridade_por_area'] = [];

    // Matematica
    const pesoMatematica = this.calcularPesoArea(
      'Matemática',
      analise.gaps_por_area.matematica,
      perfil.curso_desejado
    );
    prioridades.push({
      area: 'Matemática',
      peso_estudo_percentual: pesoMatematica,
      justificativa: this.gerarJustificativaPeso(
        'Matemática',
        pesoMatematica,
        analise.gaps_por_area.matematica
      ),
    });

    // Natureza (Física, Química, Biologia)
    const pesoNatureza = this.calcularPesoArea(
      'Natureza',
      analise.gaps_por_area.natureza,
      perfil.curso_desejado
    );
    prioridades.push({
      area: 'Natureza',
      peso_estudo_percentual: pesoNatureza,
      justificativa: this.gerarJustificativaPeso(
        'Natureza',
        pesoNatureza,
        analise.gaps_por_area.natureza
      ),
    });

    // Humanas (História, Geografia, Sociologia, Filosofia)
    const pesoHumanas = this.calcularPesoArea(
      'Humanas',
      analise.gaps_por_area.humanas,
      perfil.curso_desejado
    );
    prioridades.push({
      area: 'Humanas',
      peso_estudo_percentual: pesoHumanas,
      justificativa: this.gerarJustificativaPeso(
        'Humanas',
        pesoHumanas,
        analise.gaps_por_area.humanas
      ),
    });

    // Linguagens (Português, Literatura, Inglês/Espanhol)
    const pesoLinguagens = this.calcularPesoArea(
      'Linguagens',
      analise.gaps_por_area.linguagens,
      perfil.curso_desejado
    );
    prioridades.push({
      area: 'Linguagens',
      peso_estudo_percentual: pesoLinguagens,
      justificativa: this.gerarJustificativaPeso(
        'Linguagens',
        pesoLinguagens,
        analise.gaps_por_area.linguagens
      ),
    });

    // Redação
    const pesoRedacao = this.calcularPesoArea(
      'Redação',
      analise.gaps_por_area.redacao,
      perfil.curso_desejado
    );
    prioridades.push({
      area: 'Redação',
      peso_estudo_percentual: pesoRedacao,
      justificativa: this.gerarJustificativaPeso(
        'Redação',
        pesoRedacao,
        analise.gaps_por_area.redacao
      ),
    });

    return prioridades;
  }

  private calcularPesoArea(
    area: string,
    gap: number,
    curso: string
  ): number {
    let peso = 20; // Base 20% para cada área

    // Ajustar com base no gap
    if (gap > 100) peso += 15; // Área muito fraca
    else if (gap > 50) peso += 10; // Área fraca
    else if (gap < 0) peso -= 10; // Área já atingiu meta

    // Ajustar com base no curso
    if (curso.toLowerCase().includes('engenharia') && area === 'Matemática')
      peso += 10;
    if (curso.toLowerCase().includes('medicina') && area === 'Natureza')
      peso += 10;
    if (curso.toLowerCase().includes('direito') && area === 'Humanas')
      peso += 10;

    return Math.max(5, Math.min(40, peso)); // Entre 5% e 40%
  }

  private gerarJustificativaPeso(
    area: string,
    peso: number,
    gap: number
  ): string {
    if (gap > 100) {
      return `${area} é sua área mais fraca (gap de ${gap.toFixed(0)} pontos). Foque ${peso}% do seu tempo aqui.`;
    } else if (gap < 0) {
      return `${area} já atingiu sua meta. Mantenha com ${peso}% de revisão.`;
    } else {
      return `${area} precisa de ${gap.toFixed(0)} pontos. Dedique ${peso}% do tempo.`;
    }
  }

  private selecionarTopicos(
    perfil: PerfilAluno,
    estatisticas: EstatisticaTopico[],
    probabilidades: ProbabilidadeTopico[],
    desempenho: DashboardEstatisticas | undefined,
    analise: any
  ): TopicoEstudo[] {
    const topicos: TopicoEstudo[] = [];

    // Combinar estatísticas com probabilidades
    const topicosCombinados = estatisticas.map((stat) => {
      const prob = probabilidades.find(
        (p) => p.tema_principal === stat.tema_principal
      );
      return { stat, prob };
    });

    // Filtrar tópicos já dominados
    const topicosDominados = desempenho?.topicos_dominados.map(
      (t) => t.tema
    ) || [];

    // Selecionar top tópicos
    const topicosOrdenados = topicosCombinados
      .filter(({ stat }) => !topicosDominados.includes(stat.tema_principal))
      .sort((a, b) => {
        const scoreA = this.calcularScorePrioridade(a.stat, a.prob);
        const scoreB = this.calcularScorePrioridade(b.stat, b.prob);
        return scoreB - scoreA;
      });

    // Pegar top 30 tópicos
    for (const { stat, prob } of topicosOrdenados.slice(0, 30)) {
      const prioridade = this.definirPrioridade(stat, prob);

      topicos.push({
        materia: stat.materia,
        tema: stat.tema_principal,
        prioridade,
        impacto_estimado: this.estimarImpacto(stat, prob),
        motivo: prob?.justificativa || stat.tema_principal,
        tempo_estimado: this.estimarTempoEstudo(prioridade),
        recursos: {
          modulos_biblioteca: [], // Pode ser preenchido com base no tema
          questoes_pratica: Math.min(50, stat.frequencia_absoluta * 2),
          simulados: prioridade === 'ALTA' ? 3 : prioridade === 'MEDIA' ? 2 : 1,
        },
      });
    }

    return topicos;
  }

  private calcularScorePrioridade(
    stat: EstatisticaTopico,
    prob?: ProbabilidadeTopico
  ): number {
    let score = stat.frequencia_percentual * 2; // Peso da frequência

    if (prob) {
      score += prob.chance_estimada_percentual; // Peso da probabilidade
      if (prob.tendencia === 'ALTA') score += 20;
      else if (prob.tendencia === 'MEDIA') score += 10;
    }

    return score;
  }

  private definirPrioridade(
    stat: EstatisticaTopico,
    prob?: ProbabilidadeTopico
  ): Prioridade {
    const score = this.calcularScorePrioridade(stat, prob);

    if (score >= 100) return 'ALTA';
    if (score >= 50) return 'MEDIA';
    return 'BAIXA';
  }

  private estimarImpacto(
    stat: EstatisticaTopico,
    prob?: ProbabilidadeTopico
  ): string {
    const pontos = Math.round(stat.frequencia_percentual * 10);
    return `+${pontos} pontos estimados | ${prob?.chance_estimada_percentual || 50}% de chance de cair`;
  }

  private estimarTempoEstudo(prioridade: Prioridade): number {
    switch (prioridade) {
      case 'ALTA':
        return 4; // 4 horas
      case 'MEDIA':
        return 2; // 2 horas
      case 'BAIXA':
        return 1; // 1 hora
    }
  }

  // =====================================================
  // MÉTODOS PRIVADOS - CRONOGRAMA
  // =====================================================

  private criarCronograma(
    topicos: TopicoEstudo[],
    horasSemanais: number
  ): PlanoEstudo['cronograma_semanal'] {
    const semanas: PlanoEstudo['cronograma_semanal'] = [];
    const totalSemanas = 20; // ~5 meses até o ENEM

    let topicoIndex = 0;

    for (let semana = 1; semana <= totalSemanas; semana++) {
      const topicosS emana: string[] = [];
      let cargaHoraria = 0;

      while (cargaHoraria < horasSemanais && topicoIndex < topicos.length) {
        const topico = topicos[topicoIndex];
        topicos Semana.push(topico.tema);
        cargaHoraria += topico.tempo_estimado;
        topicoIndex++;
      }

      semanas.push({
        semana,
        topicos: topicosSemana,
        carga_horaria: Math.min(cargaHoraria, horasSemanais),
        objetivos: this.gerarObjetivosSemana(topicosSemana, semana),
      });
    }

    return semanas;
  }

  private gerarObjetivosSemana(topicos: string[], semana: number): string[] {
    return [
      `Estudar ${topicos.length} tópico(s) prioritário(s)`,
      `Resolver pelo menos 20 questões relacionadas`,
      `Revisar anotações e mapas mentais`,
      semana % 4 === 0 ? 'Fazer simulado de revisão' : 'Praticar exercícios',
    ];
  }

  // =====================================================
  // MÉTODOS PRIVADOS - ORIENTAÇÕES
  // =====================================================

  private gerarEstrategia(analise: any, topicos: TopicoEstudo[]): string {
    const topicosAlta = topicos.filter((t) => t.prioridade === 'ALTA').length;

    return `
Seu plano prioriza ${topicosAlta} tópicos de ALTA prioridade com base em:
1. Estatísticas reais do ENEM (o que mais cai)
2. Probabilidade de cair no próximo exame
3. Seu desempenho atual e lacunas

FOCO: ${analise.area_mais_fraca} (sua área mais fraca)
REVISÃO: ${analise.area_mais_forte} (já está boa)

Siga a ordem dos tópicos para maximizar seu resultado!
    `.trim();
  }

  private gerarAlertas(analise: any, perfil: PerfilAluno): string[] {
    const alertas: string[] = [];

    if (analise.gap_pontos > 150) {
      alertas.push(
        '⚠️ Gap grande detectado. Considere focar apenas em tópicos de ALTA prioridade.'
      );
    }

    if (perfil.tempo_disponivel_semanal < 15) {
      alertas.push(
        '⏰ Tempo limitado. Priorize qualidade sobre quantidade.'
      );
    }

    if (analise.gaps_por_area.redacao > 100) {
      alertas.push(
        '✍️ Redação precisa de atenção urgente. Pratique pelo menos 1 redação por semana.'
      );
    }

    return alertas;
  }

  private gerarRecomendacaoFinal(analise: any): string {
    return `
Para atingir sua meta de ${analise.gap_pontos.toFixed(0)} pontos a mais:
- Estude de forma ESTRATÉGICA, não linear
- Priorize tópicos que REALMENTE caem
- Resolva questões ENEM, não apenas teoria
- Revise tópicos dominados a cada 2 semanas
- Faça simulados mensais para medir progresso

🎯 Com este plano personalizado, você está focado no que importa!
    `.trim();
  }
}

// =====================================================
// EXEMPLO DE USO
// =====================================================

export async function exemploGeracaoPlano() {
  const gerador = new GeradorPlanos();

  const perfilExemplo: PerfilAluno = {
    id: 'aluno-123',
    nome: 'João Silva',
    curso_desejado: 'Medicina',
    universidade_desejada: 'USP',
    nota_alvo_total: 750,
    notas_atuais: {
      matematica: 600,
      natureza: 550,
      humanas: 580,
      linguagens: 620,
      redacao: 700,
    },
    questoes_respondidas: 500,
    acertos_por_materia: {} as any,
    tempo_disponivel_semanal: 20,
  };

  const estatisticas: EstatisticaTopico[] = []; // Dados reais
  const probabilidades: ProbabilidadeTopico[] = []; // Dados reais

  const plano = gerador.gerarPlano(perfil Exemplo, estatisticas, probabilidades);

  console.log('Plano Gerado:', JSON.stringify(plano, null, 2));
}
