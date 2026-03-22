export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  authorId: string;
  authorName: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  publishedAt: string;
  readTime: number;
  audioUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
