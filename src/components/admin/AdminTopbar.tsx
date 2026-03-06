import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function AdminTopbar() {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center px-4 gap-4 shrink-0">
      <SidebarTrigger className="mr-2" />
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles, users..."
            className="pl-9 h-9 font-body text-sm bg-secondary border-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>
        <Link to="/" className="text-xs font-body text-muted-foreground hover:text-foreground transition-colors">
          View Site
        </Link>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
