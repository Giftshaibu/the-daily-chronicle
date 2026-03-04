import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal";
}

const NewsCard = ({ article, variant = "default" }: NewsCardProps) => {
  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.slug}`} className="flex gap-3 group">
        <img
          src={article.image}
          alt={article.title}
          className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-headline font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-muted-foreground text-xs mt-1 font-body">
            {article.readTime} min read
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${article.slug}`} className="group">
        <img
          src={article.image}
          alt={article.title}
          className="w-full aspect-[4/3] object-cover rounded-sm"
          loading="lazy"
        />
        <h4 className="font-headline font-bold text-sm mt-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h4>
        <p className="text-muted-foreground text-xs mt-1 font-body line-clamp-2">
          {article.description}
        </p>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <div className="overflow-hidden rounded-sm">
        <img
          src={article.image}
          alt={article.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="mt-3">
        <span className="text-primary text-xs font-body font-semibold uppercase tracking-wider">
          {article.categoryName}
        </span>
        <h3 className="font-headline font-bold text-lg mt-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm mt-1 font-body line-clamp-2">
          {article.description}
        </p>
        <p className="text-muted-foreground text-xs mt-2 font-body">
          {article.authorName} · {article.readTime} min read
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
