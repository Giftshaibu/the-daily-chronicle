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

export const adminArticles: AdminArticle[] = [
  { id: "1", title: "APM Declares State Of National DISASTER", slug: "apm-declares-state-of-national-disaster", description: "President declares national disaster following floods.", content: "<p>Content here...</p>", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop", categoryId: "1", categoryName: "Breaking News", authorId: "u1", authorName: "James Mkandawire", status: "published", views: 12450, publishedAt: "2026-03-04T08:00:00Z", createdAt: "2026-03-04T06:00:00Z" },
  { id: "2", title: "Malawi Economy On The Brink of Collapse", slug: "malawi-economy-brink-of-collapse", description: "Economic analysts warn of severe contraction.", content: "<p>Content here...</p>", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop", categoryId: "8", categoryName: "Finance & Business", authorId: "u2", authorName: "Grace Banda", status: "published", views: 8320, publishedAt: "2026-03-03T14:00:00Z", createdAt: "2026-03-03T10:00:00Z" },
  { id: "3", title: "New Technology Hub Opens in Lilongwe", slug: "new-technology-hub-opens-lilongwe", description: "A state-of-the-art tech center opens.", content: "<p>Content here...</p>", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop", categoryId: "4", categoryName: "Technology", authorId: "u3", authorName: "Peter Mwanza", status: "published", views: 5610, publishedAt: "2026-03-03T10:00:00Z", createdAt: "2026-03-02T15:00:00Z" },
  { id: "4", title: "National Football Team Qualifies for Continental Cup", slug: "national-football-team-qualifies", description: "Stunning victory secures qualification.", content: "<p>Content here...</p>", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop", categoryId: "5", categoryName: "Sports", authorId: "u1", authorName: "James Mkandawire", status: "published", views: 9870, publishedAt: "2026-03-02T18:00:00Z", createdAt: "2026-03-02T14:00:00Z" },
  { id: "5", title: "Government Announces Major Infrastructure Plan", slug: "government-major-infrastructure-plan", description: "$2 billion plan unveiled.", content: "<p>Content here...</p>", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop", categoryId: "9", categoryName: "Government", authorId: "u2", authorName: "Grace Banda", status: "review", views: 0, publishedAt: null, createdAt: "2026-03-01T09:00:00Z" },
  { id: "6", title: "Healthcare Reform Bill Draft", slug: "healthcare-reform-bill-draft", description: "Working draft for healthcare coverage piece.", content: "<p>Draft content...</p>", image: "", categoryId: "7", categoryName: "Health & Lifestyle", authorId: "u3", authorName: "Peter Mwanza", status: "draft", views: 0, publishedAt: null, createdAt: "2026-02-28T11:00:00Z" },
  { id: "7", title: "Music Festival Coverage Notes", slug: "music-festival-coverage-notes", description: "Notes from the Lake of Stars festival.", content: "<p>Draft notes...</p>", image: "", categoryId: "6", categoryName: "Entertainment", authorId: "u4", authorName: "Chimwemwe Phiri", status: "draft", views: 0, publishedAt: null, createdAt: "2026-02-27T08:00:00Z" },
];

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "James Mkandawire", email: "james@postoffice.mw", role: "admin", articlesCount: 24, joinedAt: "2025-01-15" },
  { id: "u2", name: "Grace Banda", email: "grace@postoffice.mw", role: "editor", articlesCount: 18, joinedAt: "2025-03-22" },
  { id: "u3", name: "Peter Mwanza", email: "peter@postoffice.mw", role: "author", articlesCount: 12, joinedAt: "2025-06-10" },
  { id: "u4", name: "Chimwemwe Phiri", email: "chimwemwe@postoffice.mw", role: "author", articlesCount: 8, joinedAt: "2025-08-05" },
];

export const mediaItems: MediaItem[] = [
  { id: "m1", name: "disaster-floods.jpg", url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop", type: "image", size: "2.4 MB", uploadedAt: "2026-03-04" },
  { id: "m2", name: "economy-graph.jpg", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop", type: "image", size: "1.8 MB", uploadedAt: "2026-03-03" },
  { id: "m3", name: "tech-hub.jpg", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", type: "image", size: "3.1 MB", uploadedAt: "2026-03-03" },
  { id: "m4", name: "football-match.jpg", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop", type: "image", size: "2.7 MB", uploadedAt: "2026-03-02" },
  { id: "m5", name: "infrastructure.jpg", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop", type: "image", size: "1.5 MB", uploadedAt: "2026-03-02" },
  { id: "m6", name: "article-audio-1.mp3", url: "#", type: "audio", size: "8.2 MB", uploadedAt: "2026-03-04" },
  { id: "m7", name: "article-audio-2.mp3", url: "#", type: "audio", size: "6.5 MB", uploadedAt: "2026-03-03" },
];

export const recentActivity: ActivityItem[] = [
  { id: "a1", user: "James Mkandawire", action: "published", target: "APM Declares State Of National DISASTER", time: "2 hours ago" },
  { id: "a2", user: "Grace Banda", action: "submitted for review", target: "Government Infrastructure Plan", time: "5 hours ago" },
  { id: "a3", user: "Peter Mwanza", action: "created draft", target: "Healthcare Reform Bill Draft", time: "1 day ago" },
  { id: "a4", user: "Chimwemwe Phiri", action: "uploaded media", target: "football-match.jpg", time: "2 days ago" },
  { id: "a5", user: "Grace Banda", action: "published", target: "Malawi Economy On The Brink", time: "3 days ago" },
];
