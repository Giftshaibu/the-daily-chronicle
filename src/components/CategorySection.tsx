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
        <h2 className="font-headline font-bold text-lg md:text-xl text-primary">{title}</h2>
        <Link
          to={`/category/${slug}`}
          className="flex items-center gap-1 text-primary font-body text-xs font-semibold hover:underline"
        >
          Read More <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main featured card */}
        <div className="md:col-span-1">
          <Link to={`/article/${mainArticle.slug}`} className="group block">
            <div className="overflow-hidden rounded-sm">
              <img
                src={mainArticle.image}
                alt={mainArticle.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="font-headline font-bold text-base mt-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {mainArticle.title}
            </h3>
            <p className="text-muted-foreground text-xs mt-1 font-body line-clamp-2">
              {mainArticle.description}
            </p>
          </Link>
        </div>
        {/* Side articles */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {sideArticles.map((article) => (
            <Link key={article.id} to={`/article/${article.slug}`} className="flex gap-3 group">
              <img
                src={article.image}
                alt={article.title}
                className="w-24 h-16 object-cover rounded-sm flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-headline font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-muted-foreground text-xs mt-1 font-body line-clamp-1">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
