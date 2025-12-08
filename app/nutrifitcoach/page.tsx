'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories, articles } from '@/lib/nutrifitcoach/articles-data';
import { ArticleCategory } from '@/lib/nutrifitcoach/types';
import { Search, Filter, Clock, Tag, ExternalLink } from 'lucide-react';

export default function NutrifitCoachHub() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              NutriFitCoach
              <span className="block text-2xl mt-2 font-normal text-pink-100">
                Hub de Conhecimento em Saúde Feminina
              </span>
            </h1>
            <p className="text-xl text-pink-100 mb-8">
              60 artigos completos sobre ciclo hormonal, nutrição, treinamento e saúde da mulher
            </p>
            <a
              href="https://nutrifitcoach.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl"
            >
              Visitar NutriFitCoach.com.br
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            ⭐ Artigos em Destaque
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/nutrifitcoach/artigo/${article.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-pink-200 hover:border-pink-400"
              >
                <div className="p-6">
                  <div className="text-5xl mb-4">{article.emoji}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime} min
                    </span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                      {categories.find((c) => c.id === article.category)?.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            📚 Categorias
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-xl transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-2">🌈</div>
              <div className="font-semibold">Todos os Artigos</div>
              <div className="text-sm opacity-90">{articles.length} artigos</div>
            </button>
            {categories.map((category) => {
              const count = articles.filter((a) => a.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl transition-all text-left ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:shadow-md'
                  }`}
                  style={{
                    borderLeft: selectedCategory !== category.id ? `4px solid ${category.color}` : undefined,
                  }}
                >
                  <div className="text-3xl mb-2">{category.emoji}</div>
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-sm opacity-90 mt-1">{count} artigos</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, descrição ou tags..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none text-gray-800 bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'all'
                ? 'Todos os Artigos'
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-gray-600">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'artigo' : 'artigos'}
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar seus filtros ou busca
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const category = categories.find((c) => c.id === article.category);
                return (
                  <Link
                    key={article.id}
                    href={`/nutrifitcoach/artigo/${article.slug}`}
                    className="group bg-white rounded-xl shadow hover:shadow-xl transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{article.emoji}</div>
                        {article.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                            ⭐ Destaque
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.description}
                      </p>
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
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          {article.readTime} min
                        </span>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: category?.color }}
                        >
                          {category?.emoji} {category?.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Transforme sua saúde com conhecimento baseado em ciência
          </h3>
          <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
            Todos os artigos são baseados em evidências científicas e criados para empoderar
            mulheres a tomarem decisões informadas sobre sua saúde.
          </p>
          <a
            href="https://nutrifitcoach.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-all"
          >
            Conhecer o Sistema NutriFitCoach
            <ExternalLink className="w-5 h-5" />
          </a>
          <div className="mt-8 text-sm text-pink-100">
            © 2025 NutriFitCoach - www.nutrifitcoach.com.br
          </div>
        </div>
      </footer>
    </div>
  );
}
