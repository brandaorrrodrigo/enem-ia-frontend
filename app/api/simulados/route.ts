// ========================================
// API DE SIMULADOS - ENDPOINTS DEFINITIVOS
// ========================================

import { NextRequest, NextResponse } from 'next/server';
import {
  gerarSimuladoCompleto,
  gerarSimuladoPorArea,
  gerarSimuladoCustomizado,
  gerarSimuladoRapido,
  gerarSimuladoRevisao,
  gerarSimuladoProgressivo,
  calcularResultado,
  carregarHistoricoSimulados,
  getEstatisticasHistorico,
  SimuladoConfig,
  OpcoesSimulado
} from '@/lib/questions/getSimulado';
import { Area } from '@/lib/questions/schema';

// ========================================
// GET /api/simulados
// ========================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get('tipo') || 'rapido';

  try {
    let simulado: SimuladoConfig;

    switch (tipo) {
      // Simulado completo estilo ENEM
      case 'completo':
        simulado = gerarSimuladoCompleto(
          (searchParams.get('correcao') as 'imediato' | 'final') || 'final'
        );
        break;

      // Simulado por area
      case 'area': {
        const area = searchParams.get('area') as Area;
        if (!area) {
          return NextResponse.json(
            { success: false, error: 'Area obrigatoria para simulado por area' },
            { status: 400 }
          );
        }
        const quantidade = parseInt(searchParams.get('quantidade') || '45');
        const correcao = (searchParams.get('correcao') as 'imediato' | 'final') || 'final';
        simulado = gerarSimuladoPorArea(area, quantidade, correcao);
        break;
      }

      // Simulado de revisao
      case 'revisao': {
        const quantidade = parseInt(searchParams.get('quantidade') || '20');
        const area = searchParams.get('area') as Area | undefined;
        simulado = gerarSimuladoRevisao(quantidade, area);
        break;
      }

      // Simulado progressivo (facil -> dificil)
      case 'progressivo': {
        const quantidade = parseInt(searchParams.get('quantidade') || '15');
        const area = searchParams.get('area') as Area | undefined;
        simulado = gerarSimuladoProgressivo(quantidade, area);
        break;
      }

      // Historico de simulados
      case 'historico':
        return NextResponse.json({
          success: true,
          data: carregarHistoricoSimulados(),
        });

      // Estatisticas do historico
      case 'estatisticas':
        return NextResponse.json({
          success: true,
          data: getEstatisticasHistorico(),
        });

      // Simulado rapido (padrao)
      case 'rapido':
      default: {
        const quantidade = parseInt(searchParams.get('quantidade') || '10');
        const area = searchParams.get('area') as Area | undefined;
        simulado = gerarSimuladoRapido(quantidade, area);
        break;
      }
    }

    return NextResponse.json({
      success: true,
      data: simulado,
    });
  } catch (error) {
    console.error('[API Simulados GET] Erro:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao gerar simulado' },
      { status: 500 }
    );
  }
}

// ========================================
// POST /api/simulados - Simulado personalizado ou calcular resultado
// ========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verificar se e calculo de resultado
    if (body.calcularResultado && body.simulado) {
      const resultado = calcularResultado(body.simulado as SimuladoConfig);
      return NextResponse.json({
        success: true,
        data: resultado,
      });
    }

    // Gerar simulado personalizado
    const opcoes: OpcoesSimulado = {
      quantidade: body.quantidade || 15,
      area: body.area,
      disciplina: body.disciplina,
      tema: body.tema,
      dificuldade: body.dificuldade,
      dificuldadeMin: body.dificuldadeMin,
      dificuldadeMax: body.dificuldadeMax,
      anos: body.anos,
      modoCorrecao: body.modoCorrecao || 'imediato',
      tempoLimite: body.tempoLimite,
      excluirIds: body.excluirIds,
    };

    const simulado = gerarSimuladoCustomizado(opcoes);

    return NextResponse.json({
      success: true,
      data: simulado,
    });
  } catch (error) {
    console.error('[API Simulados POST] Erro:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar requisicao' },
      { status: 400 }
    );
  }
}

// ========================================
// PUT /api/simulados - Atualizar resposta
// ========================================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { simuladoId, questaoId, resposta } = body;

    if (!simuladoId || !questaoId) {
      return NextResponse.json(
        { success: false, error: 'simuladoId e questaoId obrigatorios' },
        { status: 400 }
      );
    }

    // Retorna confirmacao (persistencia no localStorage e feita no cliente)
    return NextResponse.json({
      success: true,
      data: {
        simuladoId,
        questaoId,
        resposta,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('[API Simulados PUT] Erro:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar resposta' },
      { status: 400 }
    );
  }
}
