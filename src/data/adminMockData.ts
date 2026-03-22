export type ArticleStatus = "draft" | "review" | "published";
export type UserRole = "author" | "editor" | "admin";

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  audioUrl?: string;
  categoryId: string;
  categoryName: string;
  authorId: string;
  authorName: string;
  status: ArticleStatus;
  views: number;
  publishedAt: string | null;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  articlesCount: number;
  joinedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: "image" | "audio";
  size: string;
  uploadedAt: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}
