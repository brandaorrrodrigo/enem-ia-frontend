import { CategoryInfo, ArticleCategory } from '@/lib/nutrifitcoach/types';

interface CategoryButtonProps {
  category: CategoryInfo | { id: 'all'; name: string; emoji: string };
  isSelected: boolean;
  articleCount: number;
  onClick: () => void;
}

export function CategoryButton({
  category,
  isSelected,
  articleCount,
  onClick,
}: CategoryButtonProps) {
  const isAll = category.id === 'all';

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl transition-all text-left ${
        isSelected
          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
          : 'bg-white text-gray-700 hover:shadow-md'
      }`}
      style={{
        borderLeft:
          !isSelected && !isAll && 'color' in category
            ? `4px solid ${category.color}`
            : undefined,
      }}
    >
      <div className="text-3xl mb-2">{category.emoji}</div>
      <div className="font-semibold">{category.name}</div>
      <div className="text-sm opacity-90 mt-1">
        {articleCount} {articleCount === 1 ? 'artigo' : 'artigos'}
      </div>
    </button>
  );
}
