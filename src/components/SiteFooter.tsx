import { Link } from "react-router-dom";
import logo from "@/assets/thePostOffice.png";

const SiteFooter = () => {
  return (
    <footer className="bg-foreground text-background/80 py-10">
      <div className="container flex flex-col items-center text-center gap-3">
        <Link to="/" className="block">
          <img src={logo} alt="The Post Office" className="h-5 w-auto" />
        </Link>
        <p className="font-body text-sm text-background/50 max-w-md">
          Your trusted source for breaking news, in-depth analysis, and compelling stories.
        </p>
        <div className="border-t border-background/10 mt-6 pt-4 w-full">
          <p className="font-body text-xs text-background/40">
            © 2026 The Post Office. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
