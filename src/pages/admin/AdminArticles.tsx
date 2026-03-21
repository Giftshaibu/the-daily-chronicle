import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, MoreHorizontal, Pencil, Trash2, Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminArticles, deleteAdminArticle, updateAdminArticle } from "@/api/admin";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function AdminArticles() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['adminArticles'],
    queryFn: getAdminArticles,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      toast({ title: "Article deleted" });
    },
    onError: () => toast({ title: "Failed to delete article", variant: "destructive" }),
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "published" | "draft" }) => {
      const formData = new FormData();
      formData.append("status", status);
      return updateAdminArticle(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      toast({ title: "Article status updated" });
    },
    onError: () => toast({ title: "Failed to update article status", variant: "destructive" }),
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleTogglePublish = (article: any) => {
    const newStatus = article.status === "published" ? "draft" : "published";
    togglePublishMutation.mutate({ id: article.id, status: newStatus });
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold">Articles</h1>
          <p className="font-body text-sm text-muted-foreground">{articles.length} total articles</p>
        </div>
        <Button asChild>
          <Link to="/admin/articles/new">
            <Plus className="h-4 w-4 mr-2" /> New Article
          </Link>
        </Button>
      </div>

      <Card className="bg-background">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">Title</TableHead>
                <TableHead className="font-body hidden md:table-cell">Author</TableHead>
                <TableHead className="font-body hidden md:table-cell">Category</TableHead>
                <TableHead className="font-body">Status</TableHead>
                <TableHead className="font-body hidden lg:table-cell">Views</TableHead>
                <TableHead className="font-body hidden lg:table-cell">Date</TableHead>
                <TableHead className="font-body w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center font-body py-8 text-muted-foreground">
                    Loading articles...
                  </TableCell>
                </TableRow>
              ) : articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center font-body py-8 text-muted-foreground">
                    No articles found.
                  </TableCell>
                </TableRow>
              ) : articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <p className="font-body text-sm font-medium line-clamp-1">{article.title}</p>
                    <p className="font-body text-xs text-muted-foreground md:hidden">{article.authorName}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-body text-sm text-muted-foreground">{article.authorName}</TableCell>
                  <TableCell className="hidden md:table-cell font-body text-sm text-muted-foreground">{article.categoryName}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-body px-2 py-0.5 rounded-full ${
                      article.status === "published" ? "bg-green-100 text-green-700" :
                      article.status === "review" ? "bg-yellow-100 text-yellow-700" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {article.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-body text-sm text-muted-foreground">
                    {article.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-body text-sm text-muted-foreground">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/articles/${article.id}`} className="flex items-center">
                            <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTogglePublish(article)}>
                          {article.status === "published" ? (
                            <><EyeOff className="h-3.5 w-3.5 mr-2" /> Unpublish</>
                          ) : (
                            <><Globe className="h-3.5 w-3.5 mr-2" /> Publish</>
                          )}
                        </DropdownMenuItem>
                        {isAdmin && (
                          <DropdownMenuItem onClick={() => handleDelete(article.id)} className="text-destructive">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
