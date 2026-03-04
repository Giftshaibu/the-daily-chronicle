import { useState } from "react";
import { Search } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { searchArticles } from "@/data/mockData";
import { Input } from "@/components/ui/input";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const results = query.length > 1 ? searchArticles(query) : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <h1 className="font-headline font-bold text-2xl mb-6">Search Articles</h1>
        <div className="relative max-w-lg mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 font-body"
          />
        </div>
        {query.length > 1 && (
          <p className="font-body text-sm text-muted-foreground mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default SearchPage;
