import { Link } from "react-router-dom";
import { Headphones, Bookmark, Share2, Clock } from "lucide-react";
import { Article } from "@/data/mockData";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal" | "editorial";
}

const NewsCard = ({ article, variant = "default" }: NewsCardProps) => {
  const { playArticle } = useAudioPlayer();

  if (variant === "editorial") {
    // New variant matching the dense mobile "newspaper" look
    return (
      <div className="flex flex-col py-4 border-b border-dashed border-border/60">
        <Link to={`/article/${article.slug}`} className="group flex flex-col gap-1.5 mb-2">
          {article.categoryName && (
            <span className="text-primary text-[10px] font-body font-bold uppercase tracking-wider">
              {article.categoryName}
            </span>
          )}
          <h3 className="font-headline font-normal text-2xl md:text-3xl leading-[1.1] group-hover:text-primary transition-colors text-foreground">
            {article.title}
          </h3>
          <p className="text-foreground/80 text-sm font-headline leading-relaxed line-clamp-2 mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry....
          </p>
        </Link>

        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-1.5 text-[10px] font-body uppercase tracking-wider">
              <Clock className="h-3 w-3" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  playArticle(article);
                }}
                className="hover:text-primary transition-colors"
                aria-label="Listen to article"
              >
                <Headphones className="h-3.5 w-3.5" />
              </button>
              <button className="hover:text-primary transition-colors" aria-label="Bookmark">
                <Bookmark className="h-3.5 w-3.5" />
              </button>
              <button className="hover:text-primary transition-colors" aria-label="Share">
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="text-right text-[9px] font-body text-muted-foreground uppercase tracking-widest mt-1">
            Source : The Daily Times
          </div>
        </div>
      </div>
    );
  }

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
      <Link to={`/article/${article.slug}`} className="group relative block">
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

  // default variant
  return (
    <div className="group relative block">
      <Link to={`/article/${article.slug}`} className="block">
        <div className="overflow-hidden rounded-sm relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-primary text-xs font-body font-semibold uppercase tracking-wider">
              {article.categoryName}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                playArticle(article);
              }}
              className="flex items-center gap-1.5 text-primary bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-full transition-colors"
              aria-label="Listen to article"
            >
              <Headphones className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wide">Listen</span>
            </button>
          </div>
          <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
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
    </div>
  );
};

export default NewsCard;
