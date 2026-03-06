import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const viewsData = [
  { date: "Feb 1", views: 1200 },
  { date: "Feb 8", views: 1800 },
  { date: "Feb 15", views: 2100 },
  { date: "Feb 22", views: 1900 },
  { date: "Mar 1", views: 3200 },
  { date: "Mar 4", views: 4500 },
];

const topArticles = [
  { title: "APM Declares Disaster", views: 12450 },
  { title: "Football Qualifies", views: 9870 },
  { title: "Economy Collapse", views: 8320 },
  { title: "Tech Hub Opens", views: 5610 },
  { title: "Infrastructure Plan", views: 3200 },
];

const engagementData = [
  { date: "Feb 1", reads: 800, bookmarks: 45 },
  { date: "Feb 8", reads: 1200, bookmarks: 62 },
  { date: "Feb 15", reads: 1500, bookmarks: 78 },
  { date: "Feb 22", reads: 1300, bookmarks: 55 },
  { date: "Mar 1", reads: 2100, bookmarks: 95 },
  { date: "Mar 4", reads: 3000, bookmarks: 120 },
];

export default function AdminAnalytics() {
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
