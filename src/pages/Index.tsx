import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsCard from "@/components/NewsCard";
import CategorySection from "@/components/CategorySection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";

const Index = () => {
  const { data: articles, isLoading } = useQuery({
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

  const safeArticles = articles || [];
  const featuredArticle = safeArticles[0];
  const latestArticles = safeArticles.slice(1, 4);

  const breakingNewsArticles = safeArticles.filter(a => {
    const isBreakingName = a.categoryName?.toLowerCase().includes('breaking news');
    const isBreakingInArray = a.categories?.some(c => c.name.toLowerCase().includes('breaking news') || c.slug.toLowerCase().includes('breaking'));
    const isBreakingSlug = a.categorySlug?.toLowerCase().includes('breaking');
    return isBreakingName || isBreakingInArray || isBreakingSlug;
  });

  const displayBreakingCarousel = breakingNewsArticles.length > 0 ? breakingNewsArticles : safeArticles;
  const firstBreakingNews = breakingNewsArticles.length > 0 ? breakingNewsArticles[0] : featuredArticle;

  if (!featuredArticle) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <p>No articles found</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Breaking News Ticker */}
        <div className="bg-primary text-primary-foreground py-1.5">
          <div className="container flex items-center gap-3">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider bg-primary-foreground text-primary px-2 py-0.5 rounded-sm flex-shrink-0">
              Breaking
            </span>
            <p className="font-body text-xs truncate">
              {firstBreakingNews?.title} — {firstBreakingNews?.description}
            </p>
          </div>
        </div>

        {/* Hero Featured Article */}
        <section className="container mt-4">
          <FeaturedArticle article={featuredArticle} />
        </section>

        {/* Headlines & Latest News */}
        <section className="container mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline font-bold text-lg md:text-xl">Headlines & Latest News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Breaking News Carousel */}
        <section className="mt-6 overflow-hidden">
          <div className="container px-0 sm:px-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-0 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
              `}</style>

              {displayBreakingCarousel.slice(0, 4).map((article) => (
                <div
                  key={article.id}
                  className="bg-primary text-primary-foreground p-4 md:p-6 rounded-sm shrink-0 w-[85vw] md:w-[400px] snap-center flex flex-col"
                >
                  <div className="flex justify-between items-start mb-3 border-b border-primary-foreground/30 pb-3">
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-primary-foreground bg-primary-foreground text-primary px-1.5 py-0.5 rounded-sm">
                      Breaking News
                    </span>
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-primary-foreground/70 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {article.readTime} min read
                    </span>
                  </div>

                  <h2 className="font-headline font-normal text-2xl md:text-3xl leading-tight">
                    {article.title}
                  </h2>

                  <p className="font-body text-sm text-primary-foreground/80 mt-3 line-clamp-3 leading-relaxed flex-1">
                    {article.description || "Read more about this story inside."}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary-foreground/30 border-dashed">
                    <div className="text-[10px] font-body text-primary-foreground/70 uppercase tracking-widest">
                      Source: The Daily Times
                    </div>
                    <Link to={`/article/${article.slug}`} className="text-xs font-bold font-body uppercase tracking-wider flex items-center hover:opacity-80 transition-opacity">
                      Read More
                      <ChevronRight className="h-3 w-3 ml-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Sections */}
        <div className="container mt-4">
          <CategorySection
            title="Finance & Business"
            slug="finance-business"
            articles={[safeArticles[1], safeArticles[6], safeArticles[0], safeArticles[2]].filter(Boolean)}
          />
          <CategorySection
            title="Government"
            slug="government"
            articles={[safeArticles[4], safeArticles[5], safeArticles[0], safeArticles[3]].filter(Boolean)}
          />
          <CategorySection
            title="Sports"
            slug="sports"
            articles={[safeArticles[3], safeArticles[7], safeArticles[4]].filter(Boolean)}
          />
        </div>

        {/* Newsletter */}
        <NewsletterSignup />
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
