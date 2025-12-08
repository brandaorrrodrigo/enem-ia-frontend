// app/api/biblioteca/[materia]/[topico]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { CadernoData, CadernoResponse } from '@/lib/types/caderno';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ materia: string; topico: string }> }
) {
  try {
    const { materia, topico } = await params;

    // Validar categoria
    const categoriasValidas = ['linguagens', 'humanas', 'natureza', 'matematica', 'redacao'];
    if (!categoriasValidas.includes(materia)) {
      return NextResponse.json<CadernoResponse>(
        { success: false, error: 'Categoria invalida' },
        { status: 400 }
      );
    }

    // Construir caminho do arquivo JSON
    const cadernoPath = path.join(process.cwd(), 'data', 'cadernos', materia, `${topico}.json`);

    // Verificar se arquivo existe
    if (!fs.existsSync(cadernoPath)) {
      return NextResponse.json<CadernoResponse>(
        {
          success: false,
          error: 'Conteudo ainda nao carregado. Aguarde atualizacoes.'
        },
        { status: 404 }
      );
    }

    // Ler e parsear JSON
    const fileContent = fs.readFileSync(cadernoPath, 'utf-8');
    const cadernoData: CadernoData = JSON.parse(fileContent);

    return NextResponse.json<CadernoResponse>({
      success: true,
      data: cadernoData
    });

  } catch (error) {
    console.error('Erro ao carregar caderno:', error);
    return NextResponse.json<CadernoResponse>(
      { success: false, error: 'Erro interno ao carregar conteudo' },
      { status: 500 }
    );
  }
}
