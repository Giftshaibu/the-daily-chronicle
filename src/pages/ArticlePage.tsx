import { useParams, Link } from "react-router-dom";
import { Search, Bookmark, Headphones, Share2, Loader2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import NewsCard from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlugOrId, getPosts } from "@/api/posts";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { playArticle } = useAudioPlayer();

  const { data: article, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlugOrId(slug || ""),
    enabled: !!slug,
  });

  const { data: allPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 container py-20 text-center">
          <h1 className="font-headline text-3xl font-bold">Article not found</h1>
          <Link to="/" className="text-primary font-body mt-4 inline-block hover:underline">
            Go back home
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const relatedArticles = allPosts ? allPosts.filter((a) => a.id !== article.id).slice(0, 3) : [];
  const otherNews = allPosts ? allPosts.filter((a) => a.id !== article.id).slice(3, 7) : [];


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-10">
        {/* Category & Actions */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <span className="text-primary text-sm font-body font-bold uppercase tracking-wider">
            {article.categoryName}
          </span>
          <div className="flex items-center gap-3">
            {article.audioUrl && (
              <button
                onClick={() => playArticle(article)}
                className="flex items-center gap-1.5 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
                aria-label="Listen to article"
              >
                <Headphones className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wide">Listen</span>
              </button>
            )}
            <button
              onClick={() => toggleBookmark(article.id)}
              className="flex items-center justify-center bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors text-primary"
              aria-label="Bookmark"
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked(article.id) ? "currentColor" : "none"} />
            </button>
            <button className="flex items-center justify-center bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors text-primary" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Massive Red Headline */}
        <h1 className="font-headline font-normal text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-primary tracking-tight mb-8 md:mb-12 max-w-[95%]">
          {article.title}
        </h1>

        {/* 3-Column Newspaper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">

          {/* Main Content (8 cols) */}
          <div className="md:col-span-8 flex flex-col pb-4 h-full md:border-r md:border-border md:pr-10">
            <div className="article-content font-headline text-sm leading-relaxed text-foreground text-justify prose prose-sm max-w-none md:columns-2 md:gap-10">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full aspect-[4/3] object-cover border border-border/50 mb-4 inline-block break-inside-avoid"
                />
              )}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>

          {/* COLUMN 3: Search & Related Articles (4 cols) */}
          <div className="hidden md:block lg:block md:col-span-4 flex flex-col h-full">

            {/* Search Box mimicking the design */}
            <div className="flex items-center w-full mb-8 border border-primary h-12">
              <div className="flex items-center justify-center w-12 h-full text-primary border-r border-primary">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search Here"
                className="flex-1 h-full bg-primary text-primary-foreground px-4 placeholder:text-primary-foreground/70 font-headline text-lg outline-none"
              />
              <button className="h-full px-4 text-primary font-headline text-xl font-bold bg-background hover:bg-primary/10 transition-colors">
                GO
              </button>
            </div>

            {/* Stacked Related Articles */}
            <div className="flex flex-col gap-6">
              {relatedArticles.map((rel, idx) => (
                <div key={rel.id} className={`flex flex-col gap-2 pb-6 ${idx !== relatedArticles.length - 1 ? 'border-b border-border' : ''}`}>
                  <h3 className="font-headline text-2xl leading-tight">
                    {rel.title}
                  </h3>
                  <p className="font-headline text-sm text-muted-foreground leading-snug">
                    {rel.description || "Read more about this story inside."}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40 border-dashed">
                    <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {rel.readTime} min read
                    </span>
                    <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                      Source: The Daily Times
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Other Selected News Header at bottom of main content */}
        <div className="mt-16 pt-4 border-t-2 border-primary">
          <h2 className="font-headline text-2xl text-primary font-bold mb-6">
            Other Selected News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherNews.map(news => (
               <NewsCard key={news.id} article={news} variant="compact" />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
