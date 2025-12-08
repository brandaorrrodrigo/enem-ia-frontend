const fs = require('fs');

const code = `import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Hash simples para MVP (em producao usar bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Gerar token de sessao simples para MVP
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Gerar ID unico
function generateId(): string {
  return \`user_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nome,
      email,
      senha,
      estado,
      jaFezEnem,
      cursosDeInteresse
    } = body;

    // Validacoes
    if (!email || !senha) {
      return NextResponse.json(
        { error: 'Email e senha sao obrigatorios' },
        { status: 400 }
      );
    }

    if (senha.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter no minimo 6 caracteres' },
        { status: 400 }
      );
    }

    // Tentar usar Prisma se disponivel
    let usuario: any = null;
    let usePrisma = false;

    try {
      // Importar Prisma dinamicamente para evitar erro se nao estiver configurado
      const prismaModule = await import('@/lib/prisma');
      const prisma = prismaModule.default;

      // Verificar se email ja existe
      const existingUser = await prisma.usuario.findUnique({
        where: { email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Este email ja esta cadastrado' },
          { status: 400 }
        );
      }

      // Criar usuario no banco
      const hashedPassword = hashPassword(senha);
      usuario = await prisma.usuario.create({
        data: {
          nome: nome || email.split('@')[0],
          email,
          senha: hashedPassword,
          pontosFP: 500,
          nivel: 'Bronze',
          streakAtual: 1,
          streakMaximo: 1,
          ultimoEstudo: new Date(),
        }
      });

      // Criar score inicial
      await prisma.userScore.create({
        data: {
          usuarioId: usuario.id,
          totalPoints: 0,
          level: 1,
          fp: 500,
          totalFpGanho: 500,
        }
      });

      // Criar codigo de convite
      const codigoConvite = \`ENEM\${usuario.id.slice(-6).toUpperCase()}\`;
      await prisma.inviteCode.create({
        data: {
          usuarioId: usuario.id,
          codigo: codigoConvite,
          usosTotal: 0,
          fpGanhoTotal: 0,
          ativo: true,
        }
      });

      usePrisma = true;
    } catch (prismaError: any) {
      console.log('Prisma nao disponivel, usando modo mock:', prismaError?.message);

      // Modo mock - criar usuario local
      const id = generateId();
      usuario = {
        id,
        nome: nome || email.split('@')[0],
        email,
        pontosFP: 500,
        nivel: 'Bronze',
        streakAtual: 1,
      };
    }

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
        streak: usuario.streakAtual,
      },
      token,
      message: 'Conta criada com sucesso! Voce ganhou 500 FP de bonus!',
      mode: usePrisma ? 'database' : 'local'
    });

    // Setar cookie de sessao
    response.cookies.set('enem_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
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

  } catch (error: any) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync('app/api/auth/register/route.ts', code);
console.log('Arquivo criado com sucesso');
