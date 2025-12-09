import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { materia, capitulo, progresso, ultimaPagina } = body;

    // Validação básica
    if (!materia || !capitulo) {
      return NextResponse.json(
        { error: 'Matéria e capítulo são obrigatórios' },
        { status: 400 }
      );
    }

    if (typeof progresso !== 'number' || progresso < 0 || progresso > 100) {
      return NextResponse.json(
        { error: 'Progresso deve ser um número entre 0 e 100' },
        { status: 400 }
      );
    }

    // Aqui você pode salvar no banco de dados se necessário
    // Por enquanto, vamos apenas retornar sucesso pois o localStorage
    // já está sendo usado no cliente

    return NextResponse.json({
      success: true,
      message: 'Progresso salvo com sucesso',
      data: {
        materia,
        capitulo,
        progresso,
        ultimaPagina,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar progresso' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const materia = searchParams.get('materia');
    const capitulo = searchParams.get('capitulo');

    if (!materia || !capitulo) {
      return NextResponse.json(
        { error: 'Matéria e capítulo são obrigatórios' },
        { status: 400 }
      );
    }

    // Aqui você pode buscar do banco de dados se necessário
    // Por enquanto, vamos retornar dados simulados

    return NextResponse.json({
      success: true,
      data: {
        materia,
        capitulo,
        progresso: 0,
        ultimaPagina: null,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar progresso' },
      { status: 500 }
    );
  }
}
