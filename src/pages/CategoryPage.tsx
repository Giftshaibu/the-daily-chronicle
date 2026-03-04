import { useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { getArticlesByCategory, categories, articles } from "@/data/mockData";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  
  // For simple category slugs like "politics", match against categorySlug
  let categoryArticles = getArticlesByCategory(slug || "");
  
  // If no articles found, try matching by name
  if (categoryArticles.length === 0) {
    categoryArticles = articles.filter(
      (a) => a.categoryName.toLowerCase() === slug?.toLowerCase()
    );
  }

  // Fallback: show all articles for demo
  if (categoryArticles.length === 0) {
    categoryArticles = articles.slice(0, 6);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-6">
        <h1 className="font-headline font-bold text-2xl md:text-3xl mb-6 capitalize">
          {category?.name || slug}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CategoryPage;
