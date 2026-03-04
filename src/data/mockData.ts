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

export const categories: Category[] = [
  { id: "1", name: "Breaking News", slug: "breaking-news" },
  { id: "2", name: "Politics", slug: "politics" },
  { id: "3", name: "Business", slug: "business" },
  { id: "4", name: "Technology", slug: "technology" },
  { id: "5", name: "Sports", slug: "sports" },
  { id: "6", name: "Entertainment", slug: "entertainment" },
  { id: "7", name: "Health & Lifestyle", slug: "health-lifestyle" },
  { id: "8", name: "Finance & Business", slug: "finance-business" },
  { id: "9", name: "Government", slug: "government" },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "APM Declares State Of National DISASTER",
    slug: "apm-declares-state-of-national-disaster",
    description: "In a dramatic turn of events, the President has declared a state of national disaster following unprecedented flooding across the southern region.",
    content: `<p>In a dramatic turn of events, the President has declared a state of national disaster following unprecedented flooding across the southern region. The declaration comes after weeks of heavy rainfall that has displaced thousands of families and destroyed critical infrastructure.</p>
<p>The government has mobilized emergency response teams and allocated emergency funds to affected areas. International aid organizations have also begun sending relief supplies to the hardest-hit communities.</p>
<p>"We are facing a crisis of unprecedented proportions," the President said in a televised address. "Every resource at our disposal will be directed toward saving lives and rebuilding our communities."</p>
<p>The flooding has affected an estimated 500,000 people across five provinces, with significant damage to roads, bridges, and agricultural land. Experts warn that the situation could worsen if rains continue into the next week.</p>`,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop",
    authorId: "a1",
    authorName: "James Mkandawire",
    categoryId: "1",
    categoryName: "Breaking News",
    categorySlug: "breaking-news",
    publishedAt: "2026-03-04T08:00:00Z",
    readTime: 5,
    audioUrl: "#",
  },
  {
    id: "2",
    title: "Malawi Economy On The Brink of Collapse",
    slug: "malawi-economy-brink-of-collapse",
    description: "Economic analysts warn that without immediate intervention, the national economy faces severe contraction in the coming quarter.",
    content: `<p>Economic analysts are sounding the alarm as key economic indicators point to a potential financial crisis. The national currency has depreciated by 30% against the US dollar in the past three months alone.</p>
<p>Rising inflation, coupled with declining foreign reserves, has created a perfect storm that threatens the livelihoods of millions. The cost of basic commodities has skyrocketed, with food prices increasing by 45% since the beginning of the year.</p>`,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    authorId: "a2",
    authorName: "Grace Banda",
    categoryId: "8",
    categoryName: "Finance & Business",
    categorySlug: "finance-business",
    publishedAt: "2026-03-03T14:00:00Z",
    readTime: 7,
  },
  {
    id: "3",
    title: "New Technology Hub Opens in Lilongwe",
    slug: "new-technology-hub-opens-lilongwe",
    description: "A state-of-the-art technology innovation center has opened its doors, aiming to train 10,000 young developers by 2028.",
    content: `<p>The Lilongwe Innovation Hub officially opened its doors today, marking a significant milestone in the country's technology landscape. The $5 million facility features co-working spaces, training labs, and a startup incubator.</p>`,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    authorId: "a3",
    authorName: "Peter Mwanza",
    categoryId: "4",
    categoryName: "Technology",
    categorySlug: "technology",
    publishedAt: "2026-03-03T10:00:00Z",
    readTime: 4,
  },
  {
    id: "4",
    title: "National Football Team Qualifies for Continental Cup",
    slug: "national-football-team-qualifies",
    description: "In a stunning victory, the national squad secured their place in next year's continental championship.",
    content: `<p>The Flames have done it! In a thrilling 2-1 victory over their rivals, the national football team has secured qualification for the Continental Cup for the first time in over a decade.</p>`,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
    authorId: "a4",
    authorName: "Chimwemwe Phiri",
    categoryId: "5",
    categoryName: "Sports",
    categorySlug: "sports",
    publishedAt: "2026-03-02T18:00:00Z",
    readTime: 3,
  },
  {
    id: "5",
    title: "Government Announces Major Infrastructure Plan",
    slug: "government-major-infrastructure-plan",
    description: "A $2 billion infrastructure development plan has been unveiled, targeting roads, hospitals, and schools across the country.",
    content: `<p>The Ministry of Finance has unveiled an ambitious $2 billion infrastructure development plan that aims to transform the country's physical landscape over the next five years.</p>`,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop",
    authorId: "a1",
    authorName: "James Mkandawire",
    categoryId: "9",
    categoryName: "Government",
    categorySlug: "government",
    publishedAt: "2026-03-02T09:00:00Z",
    readTime: 6,
  },
  {
    id: "6",
    title: "APM Declares State Of National DISASTER",
    slug: "apm-declares-state-of-national-disaster-2",
    description: "Follow-up coverage on the national disaster declaration and emergency response efforts underway.",
    content: `<p>Continued coverage of the national disaster declaration reveals the scale of the humanitarian crisis unfolding across the southern region.</p>`,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=800&h=500&fit=crop",
    authorId: "a2",
    authorName: "Grace Banda",
    categoryId: "2",
    categoryName: "Politics",
    categorySlug: "politics",
    publishedAt: "2026-03-01T16:00:00Z",
    readTime: 4,
  },
  {
    id: "7",
    title: "Rising Stars: Young Entrepreneurs Changing the Game",
    slug: "rising-stars-young-entrepreneurs",
    description: "Meet the young business minds who are reshaping the local economy with innovative solutions.",
    content: `<p>A new generation of entrepreneurs is emerging, bringing fresh ideas and innovative solutions to long-standing challenges.</p>`,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=500&fit=crop",
    authorId: "a3",
    authorName: "Peter Mwanza",
    categoryId: "3",
    categoryName: "Business",
    categorySlug: "business",
    publishedAt: "2026-03-01T12:00:00Z",
    readTime: 5,
  },
  {
    id: "8",
    title: "Music Festival Breaks Attendance Records",
    slug: "music-festival-breaks-records",
    description: "The annual Lake of Stars festival drew over 50,000 attendees this year, featuring international and local acts.",
    content: `<p>The Lake of Stars festival has once again proven to be one of Africa's premier music events, drawing record crowds to the shores of Lake Malawi.</p>`,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
    authorId: "a4",
    authorName: "Chimwemwe Phiri",
    categoryId: "6",
    categoryName: "Entertainment",
    categorySlug: "entertainment",
    publishedAt: "2026-02-28T14:00:00Z",
    readTime: 3,
  },
  {
    id: "9",
    title: "Healthcare Reform Bill Passes Parliament",
    slug: "healthcare-reform-bill-passes",
    description: "The landmark healthcare bill promises universal coverage for all citizens by 2028.",
    content: `<p>In a historic vote, Parliament has passed the Healthcare Reform Bill, paving the way for universal healthcare coverage across the nation.</p>`,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=500&fit=crop",
    authorId: "a1",
    authorName: "James Mkandawire",
    categoryId: "7",
    categoryName: "Health & Lifestyle",
    categorySlug: "health-lifestyle",
    publishedAt: "2026-02-28T10:00:00Z",
    readTime: 6,
  },
];

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.categoryName.toLowerCase().includes(q)
  );
}
