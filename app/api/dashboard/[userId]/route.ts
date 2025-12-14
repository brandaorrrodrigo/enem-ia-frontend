/**
 * API ENDPOINT: Dashboard Central do Aluno
 * GET /api/dashboard/[userId]
 *
 * Retorna dados completos do dashboard personalizado
 */

import { NextRequest, NextResponse } from 'next/server';
import type { DashboardAluno } from '@/types/dashboard';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // TODO: Buscar dados reais do banco de dados
    // const aluno = await db.aluno.findUnique({ where: { id: userId } });
    // const simulados = await db.simulado.findMany({ where: { alunoId: userId } });
    // const questoes = await db.questaoResolvida.findMany({ where: { alunoId: userId } });

    // TODO: Usar IA para gerar insights
    // import { GeradorPlanos } from '@/lib/ai/gerador-planos';
    // import { AnalisadorEstatisticas } from '@/lib/ai/analisador-estatisticas';
    // const plano = gerador.gerarPlano(...);

    // Por enquanto, retornar dados mock completos para demonstração
    const dashboardData: DashboardAluno = gerarDashboardMock(userId);

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Erro ao gerar dashboard:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar dashboard' },
      { status: 500 }
    );
  }
}

// =====================================================
// FUNÇÃO DE MOCK PARA DEMONSTRAÇÃO
// =====================================================

function gerarDashboardMock(userId: string): DashboardAluno {
  return {
    visao_geral: {
      aluno: {
        nome: 'João Silva',
        avatar_url: '/avatars/default.png',
      },
      objetivo: {
        curso: 'Medicina',
        universidade: 'USP',
        nota_alvo: 850,
        peso_curso: {
          matematica: 3,
          natureza: 4,
          humanas: 1,
          linguagens: 2,
          redacao: 3,
        },
      },
      situacao_atual: {
        nota_estimada: 720,
        nota_alvo: 850,
        gap_pontos: 130,
        percentual_alcancado: 84.7,
        status: 'No Caminho',
        cor_status: '#3b82f6',
      },
      progresso_por_area: [
        {
          area: 'Matemática',
          nota_atual: 700,
          nota_necessaria: 850,
          gap: 150,
          percentual: 82.3,
          status: 'abaixo',
        },
        {
          area: 'Natureza',
          nota_atual: 680,
          nota_necessaria: 800,
          gap: 120,
          percentual: 85,
          status: 'proximo',
        },
        {
          area: 'Humanas',
          nota_atual: 750,
          nota_necessaria: 750,
          gap: 0,
          percentual: 100,
          status: 'atingiu',
        },
        {
          area: 'Linguagens',
          nota_atual: 720,
          nota_necessaria: 700,
          gap: -20,
          percentual: 102.8,
          status: 'superou',
        },
        {
          area: 'Redação',
          nota_atual: 800,
          nota_necessaria: 800,
          gap: 0,
          percentual: 100,
          status: 'atingiu',
        },
      ],
      proxima_meta: {
        descricao: 'Atingir 750 pontos em Matemática',
        pontos_faltantes: 50,
        prazo_dias: 14,
        motivacao: 'Você está a 73% do caminho! Continue firme!',
      },
    },

    evolucao: {
      historico_simulados: [
        {
          data: new Date('2025-01-01'),
          nome: 'Simulado 1 - Matemática',
          nota_geral: 680,
          notas_por_area: { matematica: 680 },
          questoes_respondidas: 45,
          taxa_acerto: 75.5,
        },
        {
          data: new Date('2025-01-08'),
          nome: 'Simulado 2 - Natureza',
          nota_geral: 700,
          notas_por_area: { natureza: 700 },
          questoes_respondidas: 45,
          taxa_acerto: 77.8,
        },
        {
          data: new Date('2025-01-15'),
          nome: 'Simulado 3 - Geral',
          nota_geral: 720,
          notas_por_area: {
            matematica: 700,
            natureza: 680,
            humanas: 750,
            linguagens: 720,
          },
          questoes_respondidas: 180,
          taxa_acerto: 80.0,
        },
        {
          data: new Date('2025-01-22'),
          nome: 'Simulado 4 - Matemática + Natureza',
          nota_geral: 690,
          notas_por_area: {
            matematica: 685,
            natureza: 695,
          },
          questoes_respondidas: 90,
          taxa_acerto: 76.6,
        },
        {
          data: new Date('2025-01-29'),
          nome: 'Simulado 5 - Humanas + Linguagens',
          nota_geral: 735,
          notas_por_area: {
            humanas: 745,
            linguagens: 725,
          },
          questoes_respondidas: 90,
          taxa_acerto: 81.1,
        },
      ],

      tendencia: {
        direcao: 'subindo',
        variacao_ultimos_7_dias: 20,
        variacao_percentual: 2.8,
        mensagem: 'Você melhorou 20 pontos esta semana! 🎉',
      },

      comparacao_temporal: {
        mes_atual: 720,
        mes_anterior: 680,
        diferenca: 40,
        grafico_mensal: [
          { mes: 'Nov', nota_media: 650 },
          { mes: 'Dez', nota_media: 680 },
          { mes: 'Jan', nota_media: 720 },
        ],
      },

      melhores_performances: [
        {
          materia: 'Humanas',
          melhoria: 70,
          periodo: 'últimos 30 dias',
        },
        {
          materia: 'Matemática',
          melhoria: 50,
          periodo: 'últimos 30 dias',
        },
        {
          materia: 'Linguagens',
          melhoria: 45,
          periodo: 'últimos 30 dias',
        },
      ],

      areas_atencao: [
        {
          materia: 'Natureza',
          queda: -10,
          motivo_provavel: 'Pouca prática recente',
        },
      ],
    },

    mapa_estudo: {
      plano_vigente: {
        criado_em: new Date('2025-01-01'),
        validade_ate: new Date('2025-06-01'),
        ultima_atualizacao: new Date('2025-01-15'),
        total_topicos: 50,
        topicos_concluidos: 28,
        percentual_progresso: 56,
      },

      distribuicao_tempo: [
        {
          area: 'Matemática',
          percentual_recomendado: 35,
          horas_semanais: 7,
          justificativa: 'Maior gap e peso alto no curso',
          cor: '#3b82f6',
        },
        {
          area: 'Natureza',
          percentual_recomendado: 30,
          horas_semanais: 6,
          justificativa: 'Peso muito alto no curso',
          cor: '#10b981',
        },
        {
          area: 'Humanas',
          percentual_recomendado: 15,
          horas_semanais: 3,
          justificativa: 'Meta já atingida, manutenção',
          cor: '#f59e0b',
        },
        {
          area: 'Linguagens',
          percentual_recomendado: 10,
          horas_semanais: 2,
          justificativa: 'Meta superada, manutenção',
          cor: '#8b5cf6',
        },
        {
          area: 'Redação',
          percentual_recomendado: 10,
          horas_semanais: 2,
          justificativa: 'Meta atingida, prática regular',
          cor: '#ef4444',
        },
      ],

      topicos_prioritarios: [
        {
          id: '1',
          materia: 'Matemática',
          tema: 'Funções',
          prioridade: 'ALTA',
          status: 'em_progresso',
          incidencia_enem: 85,
          probabilidade_cair: 90,
          seu_desempenho: 60,
          gap_conhecimento: 30,
          icone: '🔥',
          badge: 'URGENTE',
          cor_badge: '#ef4444',
          tempo_estimado: 8,
          recursos: {
            modulos_biblioteca: 5,
            questoes_disponiveis: 150,
            simulados_recomendados: 3,
          },
          recomendacao_ia:
            'Dedique 8h esta semana. Alta chance de cair e você está abaixo do ideal.',
        },
        {
          id: '2',
          materia: 'Física',
          tema: 'Eletromagnetismo',
          prioridade: 'ALTA',
          status: 'pendente',
          incidencia_enem: 75,
          probabilidade_cair: 80,
          seu_desempenho: 50,
          gap_conhecimento: 30,
          icone: '🔥',
          badge: 'ATENÇÃO',
          cor_badge: '#f59e0b',
          tempo_estimado: 6,
          recursos: {
            modulos_biblioteca: 4,
            questoes_disponiveis: 100,
            simulados_recomendados: 2,
          },
          recomendacao_ia:
            'Foco urgente. Tópico muito cobrado e você está abaixo.',
        },
        {
          id: '3',
          materia: 'Química',
          tema: 'Estequiometria',
          prioridade: 'ALTA',
          status: 'pendente',
          incidencia_enem: 80,
          probabilidade_cair: 85,
          seu_desempenho: 55,
          gap_conhecimento: 30,
          icone: '🔥',
          badge: 'URGENTE',
          cor_badge: '#ef4444',
          tempo_estimado: 7,
          recursos: {
            modulos_biblioteca: 6,
            questoes_disponiveis: 120,
            simulados_recomendados: 2,
          },
          recomendacao_ia:
            'Prioridade máxima. Tópico muito frequente no ENEM.',
        },
        {
          id: '4',
          materia: 'Matemática',
          tema: 'Porcentagem',
          prioridade: 'MEDIA',
          status: 'em_progresso',
          incidencia_enem: 70,
          probabilidade_cair: 75,
          seu_desempenho: 65,
          gap_conhecimento: 10,
          icone: '⚠️',
          badge: 'REVISAR',
          cor_badge: '#3b82f6',
          tempo_estimado: 4,
          recursos: {
            modulos_biblioteca: 3,
            questoes_disponiveis: 80,
            simulados_recomendados: 1,
          },
          recomendacao_ia:
            'Você já tem boa base. Reforce com exercícios práticos.',
        },
        {
          id: '5',
          materia: 'Biologia',
          tema: 'Genética',
          prioridade: 'ALTA',
          status: 'pendente',
          incidencia_enem: 90,
          probabilidade_cair: 95,
          seu_desempenho: 45,
          gap_conhecimento: 50,
          icone: '🔥',
          badge: 'URGENTE',
          cor_badge: '#ef4444',
          tempo_estimado: 10,
          recursos: {
            modulos_biblioteca: 7,
            questoes_disponiveis: 200,
            simulados_recomendados: 4,
          },
          recomendacao_ia:
            'CRÍTICO! Genética é o tópico mais cobrado em Biologia. Prioridade máxima.',
        },
        {
          id: '6',
          materia: 'História',
          tema: 'Brasil República',
          prioridade: 'MEDIA',
          status: 'dominado',
          incidencia_enem: 65,
          probabilidade_cair: 70,
          seu_desempenho: 85,
          gap_conhecimento: -15,
          icone: '⚠️',
          badge: null,
          cor_badge: '',
          tempo_estimado: 2,
          recursos: {
            modulos_biblioteca: 4,
            questoes_disponiveis: 90,
            simulados_recomendados: 1,
          },
          recomendacao_ia:
            'Você domina este tópico. Mantenha com revisões rápidas.',
        },
        {
          id: '7',
          materia: 'Geografia',
          tema: 'Cartografia',
          prioridade: 'MEDIA',
          status: 'em_progresso',
          incidencia_enem: 60,
          probabilidade_cair: 65,
          seu_desempenho: 70,
          gap_conhecimento: -5,
          icone: '⚠️',
          badge: null,
          cor_badge: '',
          tempo_estimado: 3,
          recursos: {
            modulos_biblioteca: 3,
            questoes_disponiveis: 70,
            simulados_recomendados: 1,
          },
          recomendacao_ia:
            'Bom desempenho. Continue praticando para manter.',
        },
        {
          id: '8',
          materia: 'Matemática',
          tema: 'Geometria Plana',
          prioridade: 'ALTA',
          status: 'pendente',
          incidencia_enem: 75,
          probabilidade_cair: 80,
          seu_desempenho: 58,
          gap_conhecimento: 22,
          icone: '🔥',
          badge: 'ATENÇÃO',
          cor_badge: '#f59e0b',
          tempo_estimado: 6,
          recursos: {
            modulos_biblioteca: 5,
            questoes_disponiveis: 130,
            simulados_recomendados: 2,
          },
          recomendacao_ia:
            'Foco em áreas e perímetros. Muito cobrado!',
        },
        {
          id: '9',
          materia: 'Português',
          tema: 'Interpretação de Textos',
          prioridade: 'MEDIA',
          status: 'dominado',
          incidencia_enem: 95,
          probabilidade_cair: 100,
          seu_desempenho: 80,
          gap_conhecimento: -15,
          icone: '⚠️',
          badge: null,
          cor_badge: '',
          tempo_estimado: 2,
          recursos: {
            modulos_biblioteca: 10,
            questoes_disponiveis: 250,
            simulados_recomendados: 2,
          },
          recomendacao_ia:
            'Excelente! Mantenha com leitura diária.',
        },
        {
          id: '10',
          materia: 'Física',
          tema: 'Mecânica',
          prioridade: 'ALTA',
          status: 'em_progresso',
          incidencia_enem: 85,
          probabilidade_cair: 90,
          seu_desempenho: 62,
          gap_conhecimento: 28,
          icone: '🔥',
          badge: 'URGENTE',
          cor_badge: '#ef4444',
          tempo_estimado: 8,
          recursos: {
            modulos_biblioteca: 6,
            questoes_disponiveis: 140,
            simulados_recomendados: 3,
          },
          recomendacao_ia:
            'Foque em Leis de Newton e Energia. Base essencial!',
        },
      ],

      semana_atual: {
        numero: 8,
        topicos_da_semana: ['Funções', 'Porcentagem', 'Estatística'],
        carga_horaria_planejada: 20,
        carga_cumprida: 15,
        percentual_cumprimento: 75,
        status: 'no_prazo',
      },
    },

    eficiencia: {
      metricas_gerais: {
        total_horas_estudadas: 120,
        total_questoes_resolvidas: 850,
        total_simulados_feitos: 15,
        media_questoes_por_hora: 7.08,
        tempo_medio_por_questao: 510, // segundos
      },

      retorno_investimento: [
        {
          materia: 'Humanas',
          horas_investidas: 30,
          ganho_pontos: 70,
          eficiencia: 2.33,
          status: 'excelente',
          cor: '#10b981',
          recomendacao: 'Excelente retorno! Continue com essa matéria.',
        },
        {
          materia: 'Matemática',
          horas_investidas: 40,
          ganho_pontos: 50,
          eficiencia: 1.25,
          status: 'bom',
          cor: '#3b82f6',
          recomendacao: 'Bom retorno. Mantenha o foco.',
        },
        {
          materia: 'Linguagens',
          horas_investidas: 20,
          ganho_pontos: 45,
          eficiencia: 2.25,
          status: 'excelente',
          cor: '#10b981',
          recomendacao: 'Muito bom! Otimize ainda mais o tempo.',
        },
        {
          materia: 'Natureza',
          horas_investidas: 35,
          ganho_pontos: 20,
          eficiencia: 0.57,
          status: 'regular',
          cor: '#f59e0b',
          recomendacao:
            'Retorno regular. Revise sua estratégia de estudo.',
        },
        {
          materia: 'Redação',
          horas_investidas: 15,
          ganho_pontos: 50,
          eficiencia: 3.33,
          status: 'excelente',
          cor: '#10b981',
          recomendacao: 'Melhor retorno! Parabéns.',
        },
      ],

      alertas_eficiencia: [
        {
          tipo: 'baixo_retorno',
          materia: 'Natureza',
          mensagem:
            'Você está gastando muito tempo em Natureza mas o retorno é baixo',
          acao_sugerida:
            'Revise seu método de estudo. Talvez precise de explicações mais claras ou vídeos.',
          icone: '⚠️',
          prioridade: 'alta',
        },
        {
          tipo: 'pouca_pratica',
          materia: 'Redação',
          mensagem: 'Você não pratica redação há 5 dias',
          acao_sugerida:
            'Escreva pelo menos 1 redação por semana para manter o ritmo.',
          icone: '💤',
          prioridade: 'media',
        },
      ],

      comparacao_meta: {
        ritmo_necessario: {
          questoes_por_dia: 10,
          horas_por_semana: 20,
          simulados_por_mes: 4,
        },
        ritmo_atual: {
          questoes_por_dia: 8,
          horas_por_semana: 15,
          simulados_por_mes: 3,
        },
        status: 'abaixo',
        ajuste_necessario: '+2 questões/dia e +5h/semana para manter meta',
      },

      topicos_baixo_retorno: [
        {
          tema: 'Nomenclatura de Compostos Orgânicos',
          horas_gastas: 8,
          melhoria_obtida: 5,
          motivo: 'incidência baixa',
          sugestao: 'Reduza foco neste tópico. Foque em tópicos mais cobrados.',
        },
      ],
    },

    previsao: {
      probabilidade_aprovacao: {
        percentual: 65,
        status: 'Moderada',
        cor: '#3b82f6',
        mensagem_motivacional:
          'Você está no caminho certo! Com mais dedicação, a aprovação é sua!',
      },

      cenarios: {
        otimista: {
          descricao: 'Se mantiver ritmo acelerado e melhorar Matemática',
          nota_projetada: 850,
          probabilidade: 85,
          requisitos: [
            'Estudar 25h/semana',
            'Taxa de acerto 85%+',
            'Dominar Funções e Eletromagnetismo',
            'Fazer 5 simulados por mês',
          ],
        },
        realista: {
          descricao: 'Mantendo ritmo atual',
          nota_projetada: 750,
          probabilidade: 65,
          requisitos: [
            'Manter 20h/semana',
            'Taxa de acerto 80%',
            'Focar em tópicos prioritários',
            'Fazer 4 simulados por mês',
          ],
        },
        critico: {
          descricao: 'Se ritmo cair',
          nota_projetada: 680,
          probabilidade: 30,
          riscos: [
            'Reduzir para menos de 15h/semana',
            'Ignorar tópicos prioritários',
            'Não fazer simulados regulares',
            'Perder motivação e consistência',
          ],
        },
      },

      projecao_temporal: [
        {
          data: new Date('2025-02-01'),
          nota_projetada_min: 700,
          nota_projetada_max: 760,
          nota_projetada_media: 730,
          confianca: 85,
        },
        {
          data: new Date('2025-03-01'),
          nota_projetada_min: 720,
          nota_projetada_max: 790,
          nota_projetada_media: 755,
          confianca: 80,
        },
        {
          data: new Date('2025-04-01'),
          nota_projetada_min: 740,
          nota_projetada_max: 820,
          nota_projetada_media: 780,
          confianca: 75,
        },
        {
          data: new Date('2025-05-01'),
          nota_projetada_min: 760,
          nota_projetada_max: 850,
          nota_projetada_media: 805,
          confianca: 70,
        },
      ],

      fatores_criticos: [
        {
          fator: 'Matemática precisa subir 80 pontos',
          impacto: 'alto',
          status_atual: 'critico',
          acao_recomendada:
            'Dedicar 8h/semana em Funções, Geometria e Porcentagem',
        },
        {
          fator: 'Natureza precisa subir 60 pontos',
          impacto: 'alto',
          status_atual: 'atencao',
          acao_recomendada:
            'Foco em Genética e Eletromagnetismo. Revisar método de estudo.',
        },
        {
          fator: 'Manter Humanas e Linguagens',
          impacto: 'medio',
          status_atual: 'ok',
          acao_recomendada: 'Revisões rápidas semanais para manutenção',
        },
      ],

      recomendacoes_ia: [
        {
          tipo: 'aumentar_tempo',
          prioridade: 'urgente',
          mensagem: 'Aumente 5h/semana de estudo para alcançar sua meta',
          impacto_estimado: '+50 pontos esperados',
          icone: '🚨',
        },
        {
          tipo: 'mudar_topico',
          prioridade: 'importante',
          mensagem: 'Foque em Funções e Eletromagnetismo esta semana',
          impacto_estimado: '+30 pontos esperados',
          icone: '⚡',
        },
        {
          tipo: 'fazer_simulado',
          prioridade: 'importante',
          mensagem: 'Faça um simulado de Matemática + Natureza nos próximos 3 dias',
          impacto_estimado: 'Identificar lacunas específicas',
          icone: '📝',
        },
        {
          tipo: 'revisar',
          prioridade: 'sugestao',
          mensagem: 'Revise Humanas 30min por dia para manutenção',
          impacto_estimado: 'Manter performance atual',
          icone: '💡',
        },
      ],

      dias_ate_enem: 180,
      progresso_ideal_ate_hoje: 60,
      progresso_real: 56,
      status_ritmo: 'no_prazo',
    },

    atualizado_em: new Date(),
    proxima_atualizacao: new Date(Date.now() + 24 * 60 * 60 * 1000),
    versao_ia: 'v1.0-mock',
  };
}
