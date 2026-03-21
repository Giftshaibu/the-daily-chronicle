import { useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewsCard from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";
import { getCategories } from "@/api/categories";
import { Loader2 } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  
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

  const category = categories?.find((c) => c.slug === slug);
  
  let categoryArticles = articles?.filter((a) => a.categorySlug === slug) || [];
  
  if (categoryArticles.length === 0) {
    categoryArticles = articles?.filter(
      (a) => a.categoryName.toLowerCase() === slug?.toLowerCase()
    ) || [];
  }

  if (categoryArticles.length === 0 && articles) {
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
