import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AudioPlayer from "@/components/AudioPlayer";
import { getArticleBySlug } from "@/data/mockData";

const ListenPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

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
          <AudioPlayer title={article.title} author={article.authorName} />
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
