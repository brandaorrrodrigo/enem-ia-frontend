import { NextRequest, NextResponse } from 'next/server';

// Sistema de Convites v2.0
// Planos: PRO = 10 convites/mes, PREMIUM = 30 convites/mes
// Convites extras na loja: 400 FP por 5 convites

interface Convite {
  id: string;
  codigo: string;
  criadorId: string;
  criadorNome: string;
  tipo: 'desafio1v1' | 'grupoEstudo';
  status: 'pendente' | 'aceito' | 'expirado';
  criadoEm: string;
  expiraEm: string;
  usadoPor?: string;
  usadoEm?: string;
  fpRecompensa: number;
}

// Gerar codigo unico de 6 caracteres
function gerarCodigoConvite(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
}

// POST - Criar novo convite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { criadorId, criadorNome, tipo = 'desafio1v1', plano = 'free' } = body;

    if (!criadorId || !criadorNome) {
      return NextResponse.json(
        { error: 'Dados do criador obrigatorios' },
        { status: 400 }
      );
    }

    // Verificar limite de convites por plano (simulado - em producao usar DB)
    const convitesUsadosMes = parseInt(body.convitesUsadosMes || '0');
    const limiteConvites = plano === 'premium' ? 30 : plano === 'pro' ? 10 : 0;

    if (plano === 'free') {
      return NextResponse.json(
        { error: 'Convites nao disponiveis no plano gratuito. Faca upgrade para PRO ou PREMIUM.' },
        { status: 403 }
      );
    }

    if (convitesUsadosMes >= limiteConvites) {
      return NextResponse.json(
        { error: `Limite de ${limiteConvites} convites/mes atingido. Compre mais na loja por 400 FP.` },
        { status: 403 }
      );
    }

    const agora = new Date();
    const expiraEm = new Date(agora.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias

    const convite: Convite = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      codigo: gerarCodigoConvite(),
      criadorId,
      criadorNome,
      tipo,
      status: 'pendente',
      criadoEm: agora.toISOString(),
      expiraEm: expiraEm.toISOString(),
      fpRecompensa: 25 // FP ganho por ambos ao completar desafio
    };

    // Em producao, salvar no banco de dados
    // Por enquanto, retornar o convite criado

    return NextResponse.json({
      success: true,
      convite,
      message: `Convite criado! Compartilhe o codigo: ${convite.codigo}`,
      linkConvite: `https://enem-pro.vercel.app/convite/${convite.codigo}`
    });

  } catch (error) {
    console.error('Erro ao criar convite:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar convite' },
      { status: 500 }
    );
  }
}

// GET - Verificar status de um convite
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get('codigo');
  const userId = searchParams.get('userId');

  if (!codigo) {
    return NextResponse.json(
      { error: 'Codigo do convite obrigatorio' },
      { status: 400 }
    );
  }

  // Em producao, buscar no banco de dados
  // Simulacao de convite valido
  const conviteSimulado: Convite = {
    id: `conv_simulado_${codigo}`,
    codigo,
    criadorId: 'user_demo',
    criadorNome: 'Estudante ENEM',
    tipo: 'desafio1v1',
    status: 'pendente',
    criadoEm: new Date().toISOString(),
    expiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    fpRecompensa: 25
  };

  return NextResponse.json({
    success: true,
    convite: conviteSimulado,
    valido: true
  });
}

// PUT - Aceitar convite
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { codigo, usadoPorId, usadoPorNome } = body;

    if (!codigo || !usadoPorId) {
      return NextResponse.json(
        { error: 'Codigo e usuario obrigatorios' },
        { status: 400 }
      );
    }

    // Em producao:
    // 1. Verificar se convite existe e esta valido
    // 2. Marcar como aceito
    // 3. Criar desafio 1v1 entre criador e convidado
    // 4. Dar FP para ambos ao completar

    return NextResponse.json({
      success: true,
      message: 'Convite aceito! Desafio 1v1 criado.',
      desafioId: `desafio_${Date.now()}`,
      fpPotencial: 25 // FP que cada um ganha ao completar
    });

  } catch (error) {
    console.error('Erro ao aceitar convite:', error);
    return NextResponse.json(
      { error: 'Erro interno ao aceitar convite' },
      { status: 500 }
    );
  }
}
