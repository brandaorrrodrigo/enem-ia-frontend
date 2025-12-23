import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ano = searchParams.get('ano');

    const where = ano ? { ano: parseInt(ano), ativo: true } : { ativo: true };

    const propostas = await prisma.propostaRedacao.findMany({
      where,
      orderBy: { ano: 'desc' },
      select: {
        id: true,
        ano: true,
        edicao: true,
        tema: true,
        tipoTexto: true,
        requisitos: true,
        textosMotivadores: true,
        orientacoesEspecificas: true
      }
    });

    return NextResponse.json({
      success: true,
      total: propostas.length,
      propostas
    });

  } catch (error) {
    console.error('Erro ao buscar propostas:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar propostas de redação' },
      { status: 500 }
    );
  }
}
