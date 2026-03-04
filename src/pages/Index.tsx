import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FeaturedArticle from "@/components/FeaturedArticle";
import NewsCard from "@/components/NewsCard";
import CategorySection from "@/components/CategorySection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { articles } from "@/data/mockData";

const Index = () => {
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1, 4);

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
              {featuredArticle.title} — {featuredArticle.description}
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

        {/* Availability / Breaking News highlight */}
        <section className="container mt-6">
          <div className="bg-primary text-primary-foreground p-4 md:p-6 rounded-sm">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider bg-primary-foreground text-primary px-2 py-0.5 rounded-sm">
              Breaking News
            </span>
            <h2 className="font-headline font-black text-xl md:text-2xl mt-3 leading-tight">
              {featuredArticle.title}
            </h2>
            <p className="font-body text-sm text-primary-foreground/80 mt-2 line-clamp-2">
              {featuredArticle.description}
            </p>
          </div>
        </section>

        {/* Category Sections */}
        <div className="container mt-4">
          <CategorySection
            title="Finance & Business"
            slug="finance-business"
            articles={[articles[1], articles[6], articles[0], articles[2]]}
          />
          <CategorySection
            title="Government"
            slug="government"
            articles={[articles[4], articles[5], articles[0], articles[3]]}
          />
          <CategorySection
            title="Sports"
            slug="sports"
            articles={[articles[3], articles[7], articles[4]]}
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
