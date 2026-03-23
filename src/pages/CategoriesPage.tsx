import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getCategories } from "@/api/categories";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CategoriesPage = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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

  const safeCategories = categories || [];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-center">Browse by Category</h1>
          <p className="text-muted-foreground text-center mb-10 font-body">
            Explore all the topics and stories we have to offer.
          </p>

          {safeCategories.length === 0 ? (
            <p className="text-center font-body text-muted-foreground">No categories available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {safeCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group flex flex-col items-center justify-center p-6 border rounded-lg bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span className="font-headline text-xl font-semibold text-center group-hover:scale-105 transition-transform">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CategoriesPage;
