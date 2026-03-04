import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { categories } from "@/data/mockData";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-3">
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
                  <Link to="/" onClick={() => setMenuOpen(false)} className="font-headline text-2xl font-bold">
                    <span className="font-body text-sm font-light italic">the</span>
                    <span className="font-headline font-black text-3xl">Post</span>{" "}
                    <span className="font-headline font-black text-3xl">Office</span>
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
                      Podcasts & Audio Files
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center: Logo */}
          <Link to="/" className="text-center absolute left-1/2 -translate-x-1/2">
            <div className="leading-none">
              <span className="font-body text-xs font-light italic tracking-wide">the</span>
              <span className="font-headline font-black text-2xl md:text-4xl tracking-tight block -mt-1">
                Post Office
              </span>
            </div>
          </Link>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-2">
            <Link to="/search" aria-label="Search" className="p-1 md:hidden">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/signin">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex bg-transparent border-primary-foreground/40 text-primary-foreground font-body text-xs hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm h-8 px-3"
              >
                Sign In with Email & Password
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="hidden md:inline-flex bg-primary-foreground text-primary font-body text-xs font-semibold hover:bg-primary-foreground/90 rounded-sm h-8 px-3"
              >
                Sign up
              </Button>
            </Link>
            <Link to="/signin" className="md:hidden">
              <Button
                size="sm"
                className="bg-primary-foreground text-primary font-body text-xs font-semibold hover:bg-primary-foreground/90 rounded-sm h-7 px-2"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Category Nav Bar */}
      <nav className="bg-nav text-nav-foreground overflow-x-auto">
        <div className="container flex items-center gap-0">
          {["Home", "Politics", "Business", "Technology", "Sports", "Entertainment"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/category/${item.toLowerCase()}`}
              className="px-4 py-2 text-xs font-body font-medium whitespace-nowrap hover:bg-primary transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/search"
            className="ml-auto px-4 py-2 text-xs font-body font-medium whitespace-nowrap hover:bg-primary transition-colors hidden md:block"
          >
            <Search className="h-3.5 w-3.5 inline mr-1" />
            Search
          </Link>
        </div>
      </nav>
    </>
  );
};

export default SiteHeader;
