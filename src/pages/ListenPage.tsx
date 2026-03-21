import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AudioPlayer from "@/components/AudioPlayer";
import { useQuery } from "@tanstack/react-query";
import { getPostBySlugOrId } from "@/api/posts";
import { Loader2 } from "lucide-react";

const ListenPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlugOrId(slug || ""),
    enabled: !!slug,
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

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 container py-20 text-center">
          <h1 className="font-headline text-3xl font-bold">Article not found</h1>
          <Link to="/" className="text-primary font-body mt-4 inline-block hover:underline">Go home</Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="max-w-article mx-auto">
          <img src={article.image} alt={article.title} className="w-full aspect-video object-cover rounded-sm mb-6" />
          {/* Audio player is handled globally */}
          <div className="bg-secondary rounded-lg p-6 text-center">
            <p className="font-headline text-xl font-bold mb-2">{article.title}</p>
            <p className="font-body text-muted-foreground text-sm">By {article.authorName}</p>
            <p className="font-body text-muted-foreground text-xs mt-4">Use the global audio player to listen to this article.</p>
          </div>
          <div className="mt-6">
            <Link to={`/article/${article.slug}`} className="text-primary font-body text-sm hover:underline">
              ← Read the full article
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ListenPage;
