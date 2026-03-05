import { useParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getArticleBySlug, articles } from "@/data/mockData";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <main className="flex-1 container py-20 text-center">
          <h1 className="font-headline text-3xl font-bold">Article not found</h1>
          <Link to="/" className="text-primary font-body mt-4 inline-block hover:underline">
            Go back home
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  // Dummy text to match the design's dense layout
  const dummyText1 = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`;

  const dummyText2 = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 py-6 md:py-10">
        {/* Massive Red Headline */}
        <h1 className="font-headline font-normal text-5xl md:text-7xl lg:text-[3.5rem] leading-[1.05] text-primary tracking-tight mb-8 md:mb-12 max-w-[95%]">
          {article.title}
        </h1>

        {/* 3-Column Newspaper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">

          {/* COLUMN 1: Image & Text (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-[4/3] object-cover border border-border/50"
            />
            <div className="font-headline text-sm leading-relaxed text-foreground text-justify">
              {dummyText1}
              <br /><br />
              {dummyText2}
            </div>
          </div>

          {/* COLUMN 2: Text Only (4 cols) */}
          <div className="md:col-span-4 flex flex-col pb-4 h-full md:border-r md:border-border md:pr-10">
            <div className="font-headline text-sm leading-relaxed text-foreground text-justify">
              {dummyText1}
              <br /><br />
              {dummyText2}
            </div>
          </div>

          {/* COLUMN 3: Search & Related Articles (4 cols) */}
          <div className="md:col-span-4 flex flex-col h-full">

            {/* Search Box mimicking the design */}
            <div className="flex items-center w-full mb-8 border border-primary h-12">
              <div className="flex items-center justify-center w-12 h-full text-primary border-r border-primary">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search Here"
                className="flex-1 h-full bg-primary text-primary-foreground px-4 placeholder:text-primary-foreground/70 font-headline text-lg outline-none"
              />
              <button className="h-full px-4 text-primary font-headline text-xl font-bold bg-background hover:bg-primary/10 transition-colors">
                GO
              </button>
            </div>

            {/* Stacked Related Articles */}
            <div className="flex flex-col gap-6">
              {relatedArticles.map((rel, idx) => (
                <div key={rel.id} className={`flex flex-col gap-2 pb-6 ${idx !== relatedArticles.length - 1 ? 'border-b border-border' : ''}`}>
                  <h3 className="font-headline text-2xl leading-tight">
                    {rel.title}
                  </h3>
                  <p className="font-headline text-sm text-muted-foreground leading-snug">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry....
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40 border-dashed">
                    <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      {rel.readTime} min read
                    </span>
                    <span className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                      Source: The Daily Times
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Other Selected News Header at bottom of main content */}
        <div className="mt-16 pt-4 border-t-2 border-primary">
          <h2 className="font-headline text-2xl text-primary font-bold">
            Other Selected News
          </h2>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
