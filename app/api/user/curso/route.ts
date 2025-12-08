import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar curso atual do usuario
export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('enem_user_id')?.value;
    const userIdParam = request.nextUrl.searchParams.get('user_id');

    const targetUserId = userId || userIdParam;

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Usuario nao autenticado', has_curso: false },
        { status: 401 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: targetUserId },
      include: { cursoAlvo: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuario nao encontrado', has_curso: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      has_curso: !!usuario.cursoAlvo,
      curso: usuario.cursoAlvo
    });

  } catch (error) {
    console.error('Erro ao buscar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno', has_curso: false },
      { status: 500 }
    );
  }
}

// POST - Definir curso alvo do usuario
export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get('enem_user_id')?.value;
    const body = await request.json();
    const { user_id, course_id, curso_nome } = body;

    const targetUserId = userId || user_id;

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Usuario nao autenticado', success: false },
        { status: 401 }
      );
    }

    // Se course_id for null, remover curso
    if (course_id === null) {
      await prisma.usuario.update({
        where: { id: targetUserId },
        data: { cursoAlvoId: null }
      });

      return NextResponse.json({
        success: true,
        message: 'Curso removido com sucesso'
      });
    }

    // Se tiver course_id, verificar se existe
    if (course_id) {
      const curso = await prisma.course.findUnique({
        where: { id: course_id }
      });

      if (!curso) {
        return NextResponse.json(
          { error: 'Curso nao encontrado', success: false },
          { status: 404 }
        );
      }

      await prisma.usuario.update({
        where: { id: targetUserId },
        data: { cursoAlvoId: course_id }
      });

      return NextResponse.json({
        success: true,
        curso,
        message: 'Curso definido com sucesso'
      });
    }

    // Se tiver curso_nome, criar curso simplificado
    if (curso_nome) {
      // Verificar se ja existe um curso com esse nome para esse usuario
      let curso = await prisma.course.findFirst({
        where: { nome: curso_nome }
      });

      if (!curso) {
        // Criar curso generico
        curso = await prisma.course.create({
          data: {
            nome: curso_nome,
            ies: 'Geral',
            notaCorte: 700, // Nota media estimada
            anoReferencia: 2024,
            modalidade: 'ampla_concorrencia'
          }
        });
      }

      await prisma.usuario.update({
        where: { id: targetUserId },
        data: { cursoAlvoId: curso.id }
      });

      return NextResponse.json({
        success: true,
        curso,
        message: 'Curso definido com sucesso'
      });
    }

    return NextResponse.json(
      { error: 'course_id ou curso_nome necessario', success: false },
      { status: 400 }
    );

  } catch (error) {
    console.error('Erro ao definir curso:', error);
    return NextResponse.json(
      { error: 'Erro interno', success: false },
      { status: 500 }
    );
  }
}
