import { useParams, Link } from "react-router-dom";
import { Bookmark, Share2, Headphones } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AudioPlayer from "@/components/AudioPlayer";
import NewsCard from "@/components/NewsCard";
import { getArticleBySlug, articles } from "@/data/mockData";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");
  const [showAudio, setShowAudio] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);
  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Article Header */}
        <div className="container py-6">
          <div className="max-w-article mx-auto">
            <span className="text-primary text-xs font-body font-semibold uppercase tracking-wider">
              {article.categoryName}
            </span>
            <h1 className="font-headline font-black text-3xl md:text-4xl lg:text-5xl mt-2 leading-tight">
              {article.title}
            </h1>
            <p className="text-muted-foreground font-body text-lg mt-3">
              {article.description}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="font-body text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">{article.authorName}</span>
                <span className="mx-2">·</span>
                <span>{publishedDate}</span>
                <span className="mx-2">·</span>
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={bookmarked ? "text-primary" : "text-muted-foreground"}
                >
                  <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
                {article.audioUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAudio(!showAudio)}
                    className="text-muted-foreground"
                  >
                    <Headphones className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {showAudio && (
              <div className="mt-4">
                <AudioPlayer title={article.title} author={article.authorName} />
              </div>
            )}
          </div>
        </div>

        {/* Article Image */}
        <div className="container">
          <div className="max-w-article mx-auto">
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-video object-cover rounded-sm"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="container py-8">
          <article
            className="max-w-article mx-auto font-body text-base leading-[1.8] prose prose-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Related Articles */}
        <section className="container py-8 border-t border-border">
          <h2 className="font-headline font-bold text-xl mb-6">Other Selected News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
