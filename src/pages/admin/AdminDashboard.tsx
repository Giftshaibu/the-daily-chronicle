import { FileText, FilePen, Globe, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminArticles, recentActivity } from "@/data/adminMockData";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Articles", value: "47", icon: FileText, change: "+3 this week" },
  { label: "Drafts", value: "12", icon: FilePen, change: "2 pending review" },
  { label: "Published", value: "32", icon: Globe, change: "+5 this month" },
  { label: "Total Views", value: "45.2K", icon: Eye, change: "+12% vs last month" },
];

export default function AdminDashboard() {
  const recentArticles = adminArticles.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold">Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground">Welcome back to The Post Office editorial dashboard.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-background">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="font-headline text-2xl font-bold">{stat.value}</p>
              <p className="font-body text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <Card className="bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline text-lg">Recent Articles</CardTitle>
              <Link to="/admin/articles" className="text-xs font-body text-primary hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentArticles.map((article) => (
              <div key={article.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm font-medium truncate">{article.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{article.authorName} · {article.categoryName}</p>
                </div>
                <span className={`text-xs font-body px-2 py-0.5 rounded-full shrink-0 ml-3 ${
                  article.status === "published" ? "bg-green-100 text-green-700" :
                  article.status === "review" ? "bg-yellow-100 text-yellow-700" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {article.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-background">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{activity.user[0]}</span>
                </div>
                <div>
                  <p className="font-body text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="font-body text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
