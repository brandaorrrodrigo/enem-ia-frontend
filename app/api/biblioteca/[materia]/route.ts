// app/api/biblioteca/[materia]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { CadernoData, CadernoListResponse } from '@/lib/types/caderno';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ materia: string }> }
) {
  try {
    const { materia } = await params;

    // Se materia for 'todos', listar de todas as categorias
    const categoriasValidas = ['linguagens', 'humanas', 'natureza', 'matematica', 'redacao'];

    let categoriasParaBuscar: string[];

    if (materia === 'todos') {
      categoriasParaBuscar = categoriasValidas;
    } else if (categoriasValidas.includes(materia)) {
      categoriasParaBuscar = [materia];
    } else {
      return NextResponse.json<CadernoListResponse>(
        { success: false, error: 'Categoria invalida' },
        { status: 400 }
      );
    }

    const cadernos: CadernoData[] = [];

    for (const categoria of categoriasParaBuscar) {
      const categoriaPath = path.join(process.cwd(), 'data', 'cadernos', categoria);

      if (!fs.existsSync(categoriaPath)) {
        continue;
      }

      const arquivos = fs.readdirSync(categoriaPath).filter(f => f.endsWith('.json'));

      for (const arquivo of arquivos) {
        try {
          const filePath = path.join(categoriaPath, arquivo);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const cadernoData: CadernoData = JSON.parse(fileContent);
          cadernos.push(cadernoData);
        } catch (err) {
          console.error(`Erro ao ler arquivo ${arquivo}:`, err);
        }
      }
    }

    // Ordenar por categoria e titulo
    cadernos.sort((a, b) => {
      if (a.categoria !== b.categoria) {
        return a.categoria.localeCompare(b.categoria);
      }
      return a.titulo.localeCompare(b.titulo);
    });

    return NextResponse.json<CadernoListResponse>({
      success: true,
      data: cadernos
    });

  } catch (error) {
    console.error('Erro ao listar cadernos:', error);
    return NextResponse.json<CadernoListResponse>(
      { success: false, error: 'Erro interno ao listar cadernos' },
      { status: 500 }
    );
  }
}
