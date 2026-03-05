import { Link } from "react-router-dom";
import logo from "@/assets/thePostOffice.png";

const SiteFooter = () => {
  return (
    <footer className="bg-foreground text-background/80 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link to="/" className="block mb-3">
              <img src={logo} alt="The Post Office" className="h-5 w-auto" />
            </Link>
            <p className="font-body text-sm text-background/50 max-w-xs">
              Your trusted source for breaking news, in-depth analysis, and compelling stories.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-body font-semibold text-sm text-background mb-2">Sections</h4>
              <nav className="flex flex-col gap-1">
                {["Politics", "Business", "Technology", "Sports"].map((item) => (
                  <Link key={item} to={`/category/${item.toLowerCase()}`} className="font-body text-sm hover:text-primary transition-colors">
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-body font-semibold text-sm text-background mb-2">More</h4>
              <nav className="flex flex-col gap-1">
                <Link to="/search" className="font-body text-sm hover:text-primary transition-colors">Search</Link>
                <Link to="/bookmarks" className="font-body text-sm hover:text-primary transition-colors">Bookmarks</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-center">
          <p className="font-body text-xs text-background/40">
            © 2026 The Post Office. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
