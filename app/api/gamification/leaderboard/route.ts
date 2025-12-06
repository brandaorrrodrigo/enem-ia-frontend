import { NextResponse } from 'next/server';
import { determinarLiga, calcularLevel } from '@/lib/gamification';

export async function GET() {
  try {
    const mockRanking = [
      { posicao: 1, nome: 'Maria Silva', xp: 4500, pontos: 2200, liga: 'ouro' },
      { posicao: 2, nome: 'Joao Pedro', xp: 3800, pontos: 1900, liga: 'prata' },
      { posicao: 3, nome: 'Ana Clara', xp: 3200, pontos: 1600, liga: 'prata' },
      { posicao: 4, nome: 'Lucas Oliveira', xp: 2800, pontos: 1400, liga: 'prata' },
      { posicao: 5, nome: 'Beatriz Santos', xp: 2400, pontos: 1200, liga: 'prata' },
    ];
    return NextResponse.json({ tipo: 'pontos', ranking: mockRanking });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
