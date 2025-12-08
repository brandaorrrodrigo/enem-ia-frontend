import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('enem_user_id')?.value;
    const session = request.cookies.get('enem_session')?.value;

    if (!userId || !session) {
      return NextResponse.json(
        { error: 'Nao autenticado', authenticated: false },
        { status: 401 }
      );
    }

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        score: true,
        cursoAlvo: true,
        badges: {
          include: { badge: true }
        }
      }
    });

    if (!usuario) {
      // Limpar cookies invalidos
      const response = NextResponse.json(
        { error: 'Usuario nao encontrado', authenticated: false },
        { status: 401 }
      );
      response.cookies.set('enem_session', '', { maxAge: 0, path: '/' });
      response.cookies.set('enem_user_id', '', { maxAge: 0, path: '/' });
      return response;
    }

    // Determinar plano (simplificado para MVP)
    let plano: 'lite' | 'pro' | 'premium' = 'lite';
    // Aqui poderia ter logica de verificar assinatura ativa

    return NextResponse.json({
      authenticated: true,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        avatarUrl: usuario.avatarUrl,
        pontosFP: usuario.pontosFP,
        nivel: usuario.nivel,
        streak: usuario.streakAtual,
        streakMax: usuario.streakMaximo,
        cursoAlvo: usuario.cursoAlvo,
        plano,
        score: usuario.score,
        badges: usuario.badges.map(ub => ({
          id: ub.badge.id,
          nome: ub.badge.nome,
          icone: ub.badge.icone,
          unlockedAt: ub.unlockedAt,
        })),
        createdAt: usuario.createdAt,
      }
    });

  } catch (error) {
    console.error('Erro ao verificar autenticacao:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', authenticated: false },
      { status: 500 }
    );
  }
}
