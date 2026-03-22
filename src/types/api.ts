export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
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
  categoryIds?: string[];
  categories?: Category[];
  publishedAt: string;
  readTime: number;
  audioUrl: string | null;
}
