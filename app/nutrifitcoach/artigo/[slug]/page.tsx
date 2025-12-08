'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { articles, categories } from '@/lib/nutrifitcoach/articles-data';
import { NutrifitArticle } from '@/lib/nutrifitcoach/types';
import { ArrowLeft, Clock, Tag, ExternalLink, Share2 } from 'lucide-react';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const article = articles.find((a) => a.slug === slug);
  const category = article ? categories.find((c) => c.id === article.category) : null;
  const relatedArticles = article
    ? articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3)
    : [];

  useEffect(() => {
    if (article) {
      // Carregar o HTML do artigo
      fetch(`/api/nutrifitcoach/article/${article.id}`)
        .then((res) => res.text())
        .then((html) => {
          setHtmlContent(html);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao carregar artigo:', error);
          setLoading(false);
        });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Artigo não encontrado</h1>
          <Link
            href="/nutrifitcoach"
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            ← Voltar para o hub
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback: copiar link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/nutrifitcoach"
              className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Voltar ao Hub</span>
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                {category?.emoji} {category?.name}
              </span>
              <span className="flex items-center gap-1 text-pink-100">
                <Clock className="w-4 h-4" />
                {article.readTime} min de leitura
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.emoji} {article.title}
            </h1>
            <p className="text-xl text-pink-100">{article.description}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando artigo...</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Gostou deste conteúdo?
            </h3>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Conheça o sistema completo NutriFitCoach e tenha acesso a ferramentas personalizadas
              para otimizar sua saúde, nutrição e treinamento.
            </p>
            <a
              href="https://nutrifitcoach.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all"
            >
              Conhecer o NutriFitCoach
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                📚 Artigos Relacionados
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/nutrifitcoach/artigo/${related.slug}`}
                    className="group bg-white rounded-xl shadow hover:shadow-xl transition-all p-6"
                  >
                    <div className="text-3xl mb-3">{related.emoji}</div>
                    <h4 className="font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {related.description}
                    </p>
                    <span className="text-xs text-pink-600 font-semibold">
                      Ler artigo →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
