import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import heroImage from "@/assets/hero-article.jpg";

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm">
        <img
          src={heroImage}
          alt={article.title}
          className="w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] object-cover object-top md:object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <span className="inline-block bg-primary text-primary-foreground text-xs font-body font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-3">
            Breaking News
          </span>
          <h1 className="font-headline font-black text-2xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight max-w-3xl">
            {article.title}
          </h1>
          <p className="text-primary-foreground/80 font-body text-sm md:text-base mt-2 max-w-2xl line-clamp-2">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
