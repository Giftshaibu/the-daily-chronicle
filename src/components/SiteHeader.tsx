import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categories";
import logo from "@/assets/thePostOffice.png";

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <>
      {/* ── DESKTOP HEADER ─────────────────────────────────────────── */}

      {/* Desktop utility bar: Subscribe | Sign In | Sign Up (hidden on mobile) */}
      <div className="hidden md:block bg-[#000000] text-primary-foreground">
        <div className="container flex items-center justify-end gap-2 py-1.5">
          <Link to="/payment">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-primary-foreground/40 text-primary-foreground font-body text-xs hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm h-7 px-3"
            >
              Subscribe
            </Button>
          </Link>
          <Link to="/signin">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-primary-foreground/40 text-primary-foreground font-body text-xs hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm h-7 px-3"
            >
              Sign in
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              className="bg-primary-foreground text-primary font-body text-xs font-semibold hover:bg-primary-foreground/90 rounded-sm h-7 px-3"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop logo bar: large centered logo, full red strip (hidden on mobile) */}
      <div className="hidden md:block bg-primary text-primary-foreground border-t border-primary-foreground/10">
        <div className="container flex items-center justify-center py-5">
          <Link to="/">
            <img src={logo} alt="The Post Office" className="h-16 w-auto" />
          </Link>
        </div>
      </div>

      {/* ── MOBILE HEADER ──────────────────────────────────────────── */}

      {/* Mobile single-row header: hamburger | logo | search (hidden on desktop) */}
      <header className="md:hidden bg-primary text-primary-foreground">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Hamburger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="p-1">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-primary text-primary-foreground border-none w-72 p-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    <img src={logo} alt="The Post Office" className="h-9 w-auto" />
                  </Link>
                </div>
                <nav className="flex flex-col gap-1">
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="py-2 px-3 rounded hover:bg-primary-foreground/10 transition-colors font-body text-sm font-semibold"
                  >
                    About Us
                  </Link>
                  <div className="border-t border-primary-foreground/20 mt-2 pt-2" />
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 px-3 rounded hover:bg-primary-foreground/10 transition-colors font-body text-sm"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="border-t border-primary-foreground/20 mt-4 pt-4">
                    <Link
                      to="/bookmarks"
                      onClick={() => setMenuOpen(false)}
                      className="py-2 px-3 rounded hover:bg-primary-foreground/10 transition-colors font-body text-sm block"
                    >
                      Bookmarks
                    </Link>
                    <Link
                      to="/search"
                      onClick={() => setMenuOpen(false)}
                      className="py-2 px-3 rounded hover:bg-primary-foreground/10 transition-colors font-body text-sm block"
                    >
                      Podcasts &amp; Audio Files
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={logo} alt="The Post Office" className="h-10 w-auto" />
          </Link>

          {/* Right: Search icon */}
          <Link to="/search" aria-label="Search" className="p-1">
            <Search className="h-6 w-6" />
          </Link>
        </div>
      </header>

      {/* ── CATEGORY NAV BAR (both desktop & mobile) ───────────────── */}
      <nav className="bg-nav text-nav-foreground overflow-x-auto justify-center">
        <div className="container flex items-center justify-center gap-0">
          {categories.map((item) => (
            <Link
              key={item.id}
              to={`/category/${item.slug}`}
              className="px-4 py-2 text-xs font-body font-medium whitespace-nowrap hover:bg-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SiteHeader;
