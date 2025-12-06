import { NextResponse } from 'next/server';
import { calcularLevel, determinarLiga } from '@/lib/gamification';

export async function GET() {
  try {
    const mockScore = {
      xp: 1500,
      level: calcularLevel(1500),
      pontos: 750,
      liga: determinarLiga(750),
      streak: 5,
    };
    return NextResponse.json({ score: mockScore });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
