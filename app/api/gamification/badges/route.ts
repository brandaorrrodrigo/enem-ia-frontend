import { NextResponse } from 'next/server';
import { BADGES_DISPONIVEIS } from '@/lib/gamification';

export async function GET() {
  try {
    const badges = BADGES_DISPONIVEIS.map(b => ({
      codigo: b.id,
      nome: b.nome,
      descricao: b.descricao,
      icone: b.icone,
      categoria: b.categoria,
    }));
    return NextResponse.json({ badges, total: badges.length });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
