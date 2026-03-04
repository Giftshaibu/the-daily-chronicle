import { useState } from "react";
import { Bookmark } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { articles } from "@/data/mockData";

const BookmarksPage = () => {
  // Mock bookmarks - in production would use auth + database
  const [bookmarkedIds] = useState<string[]>(["2", "4", "7"]);
  const bookmarkedArticles = articles.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="h-6 w-6 text-primary" />
          <h1 className="font-headline font-bold text-2xl">Your Bookmarks</h1>
        </div>
        {bookmarkedArticles.length === 0 ? (
          <p className="font-body text-muted-foreground">No bookmarks yet. Save articles to read later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default BookmarksPage;
