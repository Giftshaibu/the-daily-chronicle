import {
  LayoutDashboard,
  FileText,
  PenSquare,
  FolderOpen,
  Image,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { useAuth } from "@/context/auth-context";

const authorMenuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Articles", url: "/admin/articles", icon: FileText },
  { title: "Create Article", url: "/admin/articles/new", icon: PenSquare },
  { title: "Media Library", url: "/admin/media", icon: Image },
];

const adminMenuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Articles", url: "/admin/articles", icon: FileText },
  { title: "Create Article", url: "/admin/articles/new", icon: PenSquare },
  { title: "Categories", url: "/admin/categories", icon: FolderOpen },
  { title: "Media Library", url: "/admin/media", icon: Image },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = user?.role === "author" ? authorMenuItems : adminMenuItems;

  const isActive = (url: string) => {
    if (url === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-headline font-bold text-sm">P</span>
            </div>
            <div>
              <p className="font-headline font-bold text-sm leading-tight">The Post Office</p>
              <p className="text-xs text-muted-foreground font-body">Editorial Dashboard</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-headline font-bold text-sm">P</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-body text-xs uppercase tracking-wider">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="font-body text-sm"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
