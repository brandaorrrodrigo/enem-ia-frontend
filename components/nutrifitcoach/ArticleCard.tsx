import Link from 'next/link';
import { Clock } from 'lucide-react';
import { NutrifitArticle, CategoryInfo } from '@/lib/nutrifitcoach/types';

interface ArticleCardProps {
  article: NutrifitArticle;
  category: CategoryInfo;
  featured?: boolean;
}

export function ArticleCard({ article, category, featured = false }: ArticleCardProps) {
  return (
    <Link
      href={`/nutrifitcoach/artigo/${article.slug}`}
      className={`group bg-white rounded-xl shadow hover:shadow-xl transition-all overflow-hidden ${
        featured ? 'border-2 border-pink-200 hover:border-pink-400' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className={featured ? 'text-5xl' : 'text-4xl'}>{article.emoji}</div>
          {article.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
              ⭐ Destaque
            </span>
          )}
        </div>

        <h3
          className={`font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition-colors ${
            featured ? 'text-xl mb-3 line-clamp-2' : 'text-lg line-clamp-2'
          }`}
        >
          {article.title}
        </h3>

        <p
          className={`text-gray-600 text-sm mb-4 ${
            featured ? 'line-clamp-3' : 'line-clamp-2'
          }`}
        >
          {article.description}
        </p>

        {!featured && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            {article.readTime} min
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.emoji} {category.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
