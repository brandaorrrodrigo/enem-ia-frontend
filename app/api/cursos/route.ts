import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Cursos padrao se nao houver nenhum no banco
const CURSOS_PADRAO = [
  { nome: 'Medicina', ies: 'USP', notaCorte: 820, campus: 'Sao Paulo' },
  { nome: 'Medicina', ies: 'UNICAMP', notaCorte: 815, campus: 'Campinas' },
  { nome: 'Medicina', ies: 'UFRJ', notaCorte: 800, campus: 'Rio de Janeiro' },
  { nome: 'Engenharia da Computacao', ies: 'USP', notaCorte: 780, campus: 'Sao Paulo' },
  { nome: 'Engenharia Civil', ies: 'USP', notaCorte: 750, campus: 'Sao Paulo' },
  { nome: 'Direito', ies: 'USP', notaCorte: 780, campus: 'Sao Paulo' },
  { nome: 'Direito', ies: 'UERJ', notaCorte: 760, campus: 'Rio de Janeiro' },
  { nome: 'Psicologia', ies: 'USP', notaCorte: 740, campus: 'Sao Paulo' },
  { nome: 'Psicologia', ies: 'UFMG', notaCorte: 730, campus: 'Belo Horizonte' },
  { nome: 'Odontologia', ies: 'USP', notaCorte: 760, campus: 'Sao Paulo' },
  { nome: 'Ciencia da Computacao', ies: 'USP', notaCorte: 770, campus: 'Sao Paulo' },
  { nome: 'Ciencia da Computacao', ies: 'UFMG', notaCorte: 750, campus: 'Belo Horizonte' },
  { nome: 'Administracao', ies: 'USP', notaCorte: 720, campus: 'Sao Paulo' },
  { nome: 'Administracao', ies: 'UFRJ', notaCorte: 710, campus: 'Rio de Janeiro' },
  { nome: 'Enfermagem', ies: 'USP', notaCorte: 700, campus: 'Sao Paulo' },
  { nome: 'Arquitetura', ies: 'USP', notaCorte: 730, campus: 'Sao Paulo' },
];

// GET - Listar cursos disponiveis
export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get('search');

    let cursos = await prisma.course.findMany({
      where: search ? {
        OR: [
          { nome: { contains: search } },
          { ies: { contains: search } },
          { campus: { contains: search } }
        ]
      } : undefined,
      orderBy: [
        { nome: 'asc' },
        { notaCorte: 'desc' }
      ],
      take: 50
    });

    // Se nao houver cursos no banco, criar os padrao
    if (cursos.length === 0 && !search) {
      await prisma.course.createMany({
        data: CURSOS_PADRAO.map(c => ({
          nome: c.nome,
          ies: c.ies,
          notaCorte: c.notaCorte,
          campus: c.campus,
          anoReferencia: 2024,
          modalidade: 'ampla_concorrencia'
        }))
      });

      cursos = await prisma.course.findMany({
        orderBy: [
          { nome: 'asc' },
          { notaCorte: 'desc' }
        ],
        take: 50
      });
    }

    return NextResponse.json(cursos);

  } catch (error) {
    console.error('Erro ao listar cursos:', error);
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
