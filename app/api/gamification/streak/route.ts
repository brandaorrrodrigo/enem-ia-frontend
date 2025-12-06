import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      streakAtual: 5,
      streakMaximo: 12,
      streakEmRisco: false,
      mensagem: '5 dias seguidos! Continue assim!'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
