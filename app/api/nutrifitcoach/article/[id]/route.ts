import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { articles } from '@/lib/nutrifitcoach/articles-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = articles.find((a) => a.id === id);

    if (!article) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Ler o arquivo HTML
    const htmlContent = await readFile(article.htmlPath, 'utf-8');

    // Extrair apenas o conteúdo do body (remover tags html, head, body)
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const content = bodyMatch ? bodyMatch[1] : htmlContent;

    // Remover comentários do WordPress
    const cleanContent = content.replace(/<!--[\s\S]*?-->/g, '');

    return new NextResponse(cleanContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache por 1 hora
      },
    });
  } catch (error) {
    console.error('Erro ao carregar artigo:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar artigo' },
      { status: 500 }
    );
  }
}
