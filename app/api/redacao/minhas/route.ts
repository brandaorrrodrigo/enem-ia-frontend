import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Buscar redações do usuário
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');
    const status = searchParams.get('status');

    if (!usuarioId) {
      return NextResponse.json(
        { success: false, error: 'usuarioId é obrigatório' },
        { status: 400 }
      );
    }

    const where: any = { usuarioId };
    if (status) where.status = status;

    const redacoes = await prisma.redacaoUsuario.findMany({
      where,
      include: {
        proposta: {
          select: {
            ano: true,
            tema: true,
            edicao: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      total: redacoes.length,
      redacoes
    });

  } catch (error) {
    console.error('Erro ao buscar redações:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar redações' },
      { status: 500 }
    );
  }
}

// POST - Criar nova redação (rascunho)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { usuarioId, propostaId, texto } = body;

    if (!usuarioId || !propostaId) {
      return NextResponse.json(
        { success: false, error: 'usuarioId e propostaId são obrigatórios' },
        { status: 400 }
      );
    }

    const redacao = await prisma.redacaoUsuario.create({
      data: {
        usuarioId,
        propostaId,
        texto: texto || '',
        status: 'rascunho'
      },
      include: {
        proposta: {
          select: {
            ano: true,
            tema: true,
            edicao: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      redacao
    });

  } catch (error) {
    console.error('Erro ao criar redação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar redação' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar redação existente
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, texto, status } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'id é obrigatório' },
        { status: 400 }
      );
    }

    const data: any = {};
    if (texto !== undefined) data.texto = texto;
    if (status) data.status = status;

    const redacao = await prisma.redacaoUsuario.update({
      where: { id },
      data,
      include: {
        proposta: {
          select: {
            ano: true,
            tema: true,
            edicao: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      redacao
    });

  } catch (error) {
    console.error('Erro ao atualizar redação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar redação' },
      { status: 500 }
    );
  }
}
