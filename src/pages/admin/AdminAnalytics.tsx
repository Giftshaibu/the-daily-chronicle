import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getAdminArticles } from "@/api/admin";

export default function AdminAnalytics() {
  const { data: adminArticles = [] } = useQuery({
    queryKey: ['adminArticles'],
    queryFn: getAdminArticles,
  });

  const topArticles = [...adminArticles]
    .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map((a: any) => ({ title: a.title, views: a.views || 0 }));

  const viewsData: any[] = [];
  const engagementData: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold">Analytics</h1>
        <p className="font-body text-sm text-muted-foreground">Article performance and reader engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views over time */}
        <Card className="bg-background lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Article Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="font-body text-xs" />
                  <YAxis className="font-body text-xs" />
                  <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="views" stroke="hsl(355, 87%, 41%)" strokeWidth={2} dot={{ fill: "hsl(355, 87%, 41%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top articles */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Top Performing Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topArticles} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="font-body text-xs" />
                  <YAxis dataKey="title" type="category" width={120} className="font-body text-xs" />
                  <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: "12px" }} />
                  <Bar dataKey="views" fill="hsl(355, 87%, 41%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Reader engagement */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="font-headline text-lg">Reader Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="font-body text-xs" />
                  <YAxis className="font-body text-xs" />
                  <Tooltip contentStyle={{ fontFamily: "Inter", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="reads" stroke="hsl(355, 87%, 41%)" strokeWidth={2} name="Reads" />
                  <Line type="monotone" dataKey="bookmarks" stroke="hsl(220, 9%, 46%)" strokeWidth={2} name="Bookmarks" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
