import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, LogOut, LayoutDashboard, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/categories";
import logo from "@/assets/thePostOffice.png";
import { useAuth } from "@/context/AuthContext";

/** Small role badge used in both desktop & mobile */
const RoleBadge = ({ role }: { role: string }) => {
  const label = role === "admin" ? "Admin" : role === "author" ? "Author" : "Reader";
  const colour =
    role === "admin"
      ? "bg-yellow-400 text-yellow-900"
      : role === "author"
      ? "bg-blue-400 text-blue-900"
      : "bg-gray-300 text-gray-700";
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${colour}`}>
      {label}
    </span>
  );
};

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, clearAuth } = useAuth();
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const canAccessAdmin = user?.role === "admin" || user?.role === "author";

  const handleSignOut = () => {
    clearAuth();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* ── DESKTOP HEADER ─────────────────────────────────────────── */}

      {/* Desktop utility bar: Subscribe | auth area (hidden on mobile) */}
      <div className="hidden md:block bg-[#000000] text-primary-foreground">
        <div className="container flex items-center justify-end gap-3 py-1.5">
          <Link to="/payment">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-primary-foreground/40 text-primary-foreground font-body text-xs hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm h-7 px-3"
            >
              Subscribe
            </Button>
          </Link>

          {isAuthenticated && user ? (
            /* ── Logged-in: name + role + optional dashboard + sign out */
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 opacity-60" />
              <span className="font-body text-xs font-semibold">{user.name}</span>
              <RoleBadge role={user.role} />
              {canAccessAdmin && (
                <Link to="/admin">
                  <Button
                    size="sm"
                    className="bg-primary-foreground text-primary font-body text-xs font-semibold hover:bg-primary-foreground/90 rounded-sm h-7 px-3 flex items-center gap-1"
                  >
                    <LayoutDashboard className="h-3 w-3" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="bg-transparent border-primary-foreground/40 text-primary-foreground font-body text-xs hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm h-7 px-3 flex items-center gap-1"
              >
                <LogOut className="h-3 w-3" />
                Sign out
              </Button>
            </div>
          ) : (
            /* ── Logged-out: Sign In + Sign Up */
            <>
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
            </>
          )}
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
              <div className="flex flex-col h-full p-6">
                {/* Logo */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    <img src={logo} alt="The Post Office" className="h-9 w-auto" />
                  </Link>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 flex-1">
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
                  <div className="border-t border-primary-foreground/20 mt-2 pt-2">
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

                {/* ── Auth section at the bottom of the side menu ── */}
                <div className="border-t border-primary-foreground/20 mt-4 pt-4">
                  {isAuthenticated && user ? (
                    /* Logged-in user info */
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 px-3">
                        <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-body text-sm font-semibold leading-tight">{user.name}</span>
                          <RoleBadge role={user.role} />
                        </div>
                      </div>
                      {canAccessAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="py-2 px-3 rounded hover:bg-primary-foreground/10 transition-colors font-body text-sm flex items-center gap-2"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="py-2 px-3 rounded hover:bg-primary-foreground/10 transition-colors font-body text-sm flex items-center gap-2 text-left w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    /* Logged-out: Sign In + Sign Up buttons */
                    <div className="flex flex-col gap-2">
                      <Link to="/signin" onClick={() => setMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-primary-foreground/40 text-primary-foreground font-body text-sm hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-sm"
                        >
                          Sign in
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setMenuOpen(false)}>
                        <Button className="w-full bg-primary-foreground text-primary font-body text-sm font-semibold hover:bg-primary-foreground/90 rounded-sm">
                          Sign up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
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

      {/* ── CATEGORY NAV BAR – desktop only (hidden on mobile, already in side menu) */}
      <nav className="hidden md:flex bg-nav text-nav-foreground overflow-x-auto justify-center">
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
