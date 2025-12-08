import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Hash simples para MVP (em producao usar bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Gerar token de sessao simples para MVP
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, senha } = body;

    // Validacoes
    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha sao obrigatorios' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        score: true,
        cursoAlvo: true,
      }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Verificar senha
    const hashedPassword = hashPassword(senha);
    if (usuario.senha !== hashedPassword) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Atualizar streak se necessario
    const hoje = new Date();
    const ultimoEstudo = usuario.ultimoEstudo ? new Date(usuario.ultimoEstudo) : null;

    let novoStreak = usuario.streakAtual;
    if (ultimoEstudo) {
      const diffDias = Math.floor((hoje.getTime() - ultimoEstudo.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDias === 1) {
        novoStreak = usuario.streakAtual + 1;
      } else if (diffDias > 1) {
        novoStreak = 1;
      }
    }

    // Atualizar usuario
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        ultimoEstudo: hoje,
        streakAtual: novoStreak,
        streakMaximo: Math.max(usuario.streakMaximo, novoStreak),
      }
    });

    // Gerar token de sessao
    const token = generateToken();

    // Criar resposta com cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        pontosFP: usuario.pontosFP,
        nivel: usuario.nivel,
        streak: novoStreak,
        cursoAlvo: usuario.cursoAlvo,
        plano: 'lite', // Por padrao lite, pode ser atualizado com sistema de pagamento
      },
      token,
      message: 'Login realizado com sucesso!'
    });

    // Setar cookie de sessao
    response.cookies.set('enem_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    response.cookies.set('enem_user_id', usuario.id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
