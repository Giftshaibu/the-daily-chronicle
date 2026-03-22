import { Bookmark } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";

const BookmarksPage = () => {
  const { bookmarkedIds } = useBookmarks();
  
  const { data: articles, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const bookmarkedArticles = articles?.filter(a => bookmarkedIds.includes(a.id)) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="h-6 w-6 text-primary" />
          <h1 className="font-headline font-bold text-2xl">Your Bookmarks</h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : bookmarkedArticles.length === 0 ? (
          <p className="font-body text-muted-foreground">No bookmarks yet. Save articles to read later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedArticles.map((article: any) => (
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
