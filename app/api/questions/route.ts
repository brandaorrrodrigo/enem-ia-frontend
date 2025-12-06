// ========================================
// API DE QUESTOES - ENDPOINTS DEFINITIVOS
// ========================================

import { NextRequest, NextResponse } from 'next/server';
import {
  loadAllQuestions,
  loadQuestionById,
  loadQuestionsByArea,
  loadQuestionsByDisciplina,
  loadQuestionsByTema,
  loadQuestionsByAno,
  loadQuestionsByDificuldade,
  loadQuestionsPaginated,
  loadRandomQuestions,
  searchQuestionsByText,
  getQuestionStats,
  getAvailableAreas,
  getDisciplinasByArea,
  getTemasByDisciplina,
  getAvailableAnos
} from '@/lib/questions/loadQuestions';
import {
  getQuestionsByFilter,
  QuestaoFilter,
  getDistribuicaoDificuldade,
  getDistribuicaoArea,
  getTemasFrequentes
} from '@/lib/questions/getQuestionsByFilter';
import { Area, Dificuldade } from '@/lib/questions/schema';

// ========================================
// GET /api/questions
// ========================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Verificar tipo de operacao
  const op = searchParams.get('op');

  try {
    switch (op) {
      // Retorna estatisticas do banco
      case 'stats':
        return NextResponse.json({
          success: true,
          data: getQuestionStats(),
        });

      // Retorna areas disponiveis
      case 'areas':
        return NextResponse.json({
          success: true,
          data: getAvailableAreas(),
        });

      // Retorna disciplinas de uma area
      case 'disciplinas': {
        const area = searchParams.get('area') as Area;
        if (!area) {
          return NextResponse.json(
            { success: false, error: 'Area obrigatoria' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: getDisciplinasByArea(area),
        });
      }

      // Retorna temas de uma disciplina
      case 'temas': {
        const disciplina = searchParams.get('disciplina');
        if (!disciplina) {
          return NextResponse.json(
            { success: false, error: 'Disciplina obrigatoria' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: getTemasByDisciplina(disciplina),
        });
      }

      // Retorna anos disponiveis
      case 'anos':
        return NextResponse.json({
          success: true,
          data: getAvailableAnos(),
        });

      // Retorna questoes aleatorias
      case 'random': {
        const count = parseInt(searchParams.get('count') || '10');
        return NextResponse.json({
          success: true,
          data: loadRandomQuestions(count),
        });
      }

      // Retorna distribuicao por dificuldade
      case 'distribuicao-dificuldade':
        return NextResponse.json({
          success: true,
          data: getDistribuicaoDificuldade(),
        });

      // Retorna distribuicao por area
      case 'distribuicao-area':
        return NextResponse.json({
          success: true,
          data: getDistribuicaoArea(),
        });

      // Retorna temas mais frequentes
      case 'temas-frequentes': {
        const limite = parseInt(searchParams.get('limite') || '10');
        const areaFreq = searchParams.get('area') as Area | undefined;
        return NextResponse.json({
          success: true,
          data: getTemasFrequentes(limite, areaFreq),
        });
      }

      // Busca por ID
      case 'byId': {
        const id = searchParams.get('id');
        if (!id) {
          return NextResponse.json(
            { success: false, error: 'ID obrigatorio' },
            { status: 400 }
          );
        }
        const questao = loadQuestionById(id);
        if (!questao) {
          return NextResponse.json(
            { success: false, error: 'Questao nao encontrada' },
            { status: 404 }
          );
        }
        return NextResponse.json({
          success: true,
          data: questao,
        });
      }

      // Busca por area
      case 'byArea': {
        const area = searchParams.get('area') as Area;
        if (!area) {
          return NextResponse.json(
            { success: false, error: 'Area obrigatoria' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: loadQuestionsByArea(area),
        });
      }

      // Busca por disciplina
      case 'byDisciplina': {
        const disciplina = searchParams.get('disciplina');
        if (!disciplina) {
          return NextResponse.json(
            { success: false, error: 'Disciplina obrigatoria' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: loadQuestionsByDisciplina(disciplina),
        });
      }

      // Busca por tema
      case 'byTema': {
        const tema = searchParams.get('tema');
        if (!tema) {
          return NextResponse.json(
            { success: false, error: 'Tema obrigatorio' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: loadQuestionsByTema(tema),
        });
      }

      // Busca por ano
      case 'byAno': {
        const anoStr = searchParams.get('ano');
        if (!anoStr) {
          return NextResponse.json(
            { success: false, error: 'Ano obrigatorio' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: loadQuestionsByAno(parseInt(anoStr)),
        });
      }

      // Busca por dificuldade
      case 'byDificuldade': {
        const difStr = searchParams.get('dificuldade');
        if (!difStr) {
          return NextResponse.json(
            { success: false, error: 'Dificuldade obrigatoria' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: loadQuestionsByDificuldade(parseInt(difStr) as Dificuldade),
        });
      }

      // Busca textual
      case 'search': {
        const q = searchParams.get('q');
        if (!q) {
          return NextResponse.json(
            { success: false, error: 'Termo de busca obrigatorio' },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: searchQuestionsByText(q),
        });
      }

      // Listagem paginada (padrao)
      default: {
        const page = parseInt(searchParams.get('page') || searchParams.get('pagina') || '1');
        const perPage = parseInt(searchParams.get('perPage') || searchParams.get('porPagina') || '20');

        return NextResponse.json({
          success: true,
          data: loadQuestionsPaginated(page, perPage),
        });
      }
    }
  } catch (error) {
    console.error('[API Questions] Erro:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// ========================================
// POST /api/questions - Filtro avancado
// ========================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const filtro: QuestaoFilter = body;

    const resultado = getQuestionsByFilter(filtro);

    return NextResponse.json({
      success: true,
      data: resultado,
    });
  } catch (error) {
    console.error('[API Questions POST] Erro:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar filtro' },
      { status: 400 }
    );
  }
}
