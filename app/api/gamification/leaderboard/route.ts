import { NextResponse } from 'next/server';
import { determinarLiga, calcularLevel } from '@/lib/gamification';

export async function GET() {
  try {
    // Ranking usando FP (Focus Points)
    const mockRanking = [
      { posicao: 1, nome: 'Maria Silva', fp: 4500, xp: 4500, pontos: 2200, liga: 'ouro' },
      { posicao: 2, nome: 'Joao Pedro', fp: 3800, xp: 3800, pontos: 1900, liga: 'prata' },
      { posicao: 3, nome: 'Ana Clara', fp: 3200, xp: 3200, pontos: 1600, liga: 'prata' },
      { posicao: 4, nome: 'Lucas Oliveira', fp: 2800, xp: 2800, pontos: 1400, liga: 'prata' },
      { posicao: 5, nome: 'Beatriz Santos', fp: 2400, xp: 2400, pontos: 1200, liga: 'prata' },
    ];
    return NextResponse.json({ tipo: 'pontos', ranking: mockRanking });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
