import { NextResponse } from 'next/server';
import { calcularXPSimulado, calcularPontosSimulado } from '@/lib/gamification';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { acertos, total } = body;
    const resultado = { acertos, total, tempoMinutos: 30 };
    const xp = calcularXPSimulado(resultado);
    const pontos = calcularPontosSimulado(resultado);
    return NextResponse.json({
      success: true,
      recompensas: { xp, pontos, total: xp + pontos },
      mensagem: 'Simulado processado com sucesso!'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
