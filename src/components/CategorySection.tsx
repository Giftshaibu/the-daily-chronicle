import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import { ArrowRight } from "lucide-react";
import NewsCard from "./NewsCard";

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: Article[];
}

const CategorySection = ({ title, slug, articles }: CategorySectionProps) => {
  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline font-bold text-xl">{title}</h2>
        <Link
          to={`/category/${slug}`}
          className="flex items-center gap-1 text-primary font-body text-sm font-semibold hover:underline"
        >
          Read More <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <NewsCard article={mainArticle} variant="compact" />
        </div>
        <div className="md:col-span-3 flex flex-col gap-3">
          {sideArticles.map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
