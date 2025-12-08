export interface NutrifitArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  tags: string[];
  readTime: number; // em minutos
  htmlPath: string;
  emoji: string;
  featured?: boolean;
}

export type ArticleCategory =
  | 'ciclo-hormonal'
  | 'hormonios'
  | 'condicoes-saude'
  | 'nutricao'
  | 'treinamento'
  | 'saude-mental'
  | 'reproducao';

export interface CategoryInfo {
  id: ArticleCategory;
  name: string;
  description: string;
  emoji: string;
  color: string;
}
