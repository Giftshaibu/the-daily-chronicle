import { Link } from "react-router-dom";
import { ArrowRight, Headphones } from "lucide-react";
import { useAudioPlayer } from "@/hooks/audio-player-context";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts";
import { Post } from "@/types/api";

interface CategorySectionProps {
  title: string;
  slug: string;
}

const CategorySection = ({ title, slug }: CategorySectionProps) => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["posts", "category", slug],
    queryFn: () => getPosts({ category: slug }),
    enabled: !!slug,
  });
  const { playArticle } = useAudioPlayer();

  const safeArticles = articles || [];

  if (isLoading || safeArticles.length === 0) return null;

  const mainArticle: Post = safeArticles[0];
  const sideArticles: Post[] = safeArticles.slice(1, 4);

  return (
    <section className="py-8 md:py-12 border-t-[3px] border-primary/90 mt-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-headline font-black text-2xl md:text-3xl text-foreground tracking-tight">
          {title}
        </h2>
        <Link
          to={`/category/${slug}`}
          className="flex items-center gap-1.5 text-primary font-body text-sm font-bold hover:underline group"
        >
          Read More{" "}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Premium Editorial Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {/* Left Column: Main Featured Article (7 cols on desktop) */}
        <div className="md:col-span-7 flex flex-col group h-full">
          <Link to={`/article/${mainArticle.slug}`} className="block relative overflow-hidden rounded-sm mb-5 flex-shrink-0">
            {mainArticle.image ? (
              <img
                src={mainArticle.image}
                alt={mainArticle.title}
                className="w-full aspect-video object-cover hover:scale-[1.02] transition-transform duration-500 ease-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-muted via-muted/60 to-background" />
            )}
          </Link>

          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <span className="text-primary text-xs font-body font-bold uppercase tracking-widest">
              Featured
            </span>
            {mainArticle.audioUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  playArticle(mainArticle);
                }}
                className="flex items-center gap-1.5 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
                aria-label="Listen to article"
              >
                <Headphones className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wide">Listen</span>
              </button>
            )}
          </div>

          <Link to={`/article/${mainArticle.slug}`} className="block flex-1 flex flex-col">
            <h3 className="font-headline font-bold text-2xl md:text-4xl leading-[1.15] mb-4 group-hover:text-primary transition-colors">
              {mainArticle.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base font-body line-clamp-3 mb-6 leading-relaxed flex-1">
              {mainArticle.description}
            </p>
            <p className="text-muted-foreground text-xs md:text-sm font-body font-medium uppercase tracking-wide mt-auto pt-4 border-t border-border">
              {mainArticle.authorName} <span className="mx-1.5 opacity-50">•</span> {mainArticle.readTime} min read
            </p>
          </Link>
        </div>

        {/* Right Column: Stacked Articles (5 cols on desktop) */}
        <div className="md:col-span-5 flex flex-col md:border-l border-border md:pl-10">
          <div className="flex flex-col h-full justify-between">
            {sideArticles.map((article, index) => (
              <div
                key={article.id}
                className={`flex flex-col flex-1 justify-center ${index !== 0 ? 'border-t border-border' : ''} ${index === 0 ? 'pb-5' : index === sideArticles.length - 1 ? 'pt-5' : 'py-5'}`}
              >
                <Link to={`/article/${article.slug}`} className="group flex flex-col gap-2">
                  <span className="text-primary/80 text-[10px] font-body font-bold uppercase tracking-wider">
                    {article.categoryName}
                  </span>
                  <h4 className="font-headline font-bold text-lg md:text-xl leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-[11px] font-body mt-2 uppercase tracking-wide opacity-80">
                    {article.authorName}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
