import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Globe, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { categories } from "@/data/mockData";
import { adminArticles } from "@/data/adminMockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const existing = !isNew ? adminArticles.find((a) => a.id === id) : null;

  const [title, setTitle] = useState(existing?.title || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [content, setContent] = useState(existing?.content || "");
  const [categoryId, setCategoryId] = useState(existing?.categoryId || "");
  const [imageUrl, setImageUrl] = useState(existing?.image || "");
  const [audioUrl, setAudioUrl] = useState(existing?.audioUrl || "");
  const [isPublished, setIsPublished] = useState(existing?.status === "published");
  const [tags, setTags] = useState("");

  const handleSave = (asDraft: boolean) => {
    toast({
      title: asDraft ? "Draft saved" : "Article published",
      description: `"${title}" has been ${asDraft ? "saved as draft" : "published"}.`,
    });
    navigate("/admin/articles");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/articles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="font-headline text-2xl font-bold">{isNew ? "Create Article" : "Edit Article"}</h1>
          <p className="font-body text-sm text-muted-foreground">{isNew ? "Write a new article" : `Editing: ${existing?.title}`}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(true)}>
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <Button onClick={() => handleSave(false)}>
            <Globe className="h-4 w-4 mr-2" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-background">
            <CardContent className="p-4 space-y-4">
              <div>
                <Label className="font-body text-sm">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title..."
                  className="font-headline text-lg mt-1"
                />
              </div>
              <div>
                <Label className="font-body text-sm">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the article..."
                  className="font-body mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label className="font-body text-sm">Article Body</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here... (supports HTML)"
                  className="font-body mt-1 min-h-[300px]"
                  rows={15}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-4">
          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="font-headline text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-body text-sm">Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-body text-sm">Tags</Label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="politics, economy, breaking"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="font-body text-sm">Publish</Label>
                <Switch checked={isPublished} onCheckedChange={setIsPublished} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="font-headline text-base">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-body text-sm">Featured Image URL</Label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
                {imageUrl && (
                  <img src={imageUrl} alt="Preview" className="mt-2 w-full aspect-video object-cover rounded-sm" />
                )}
              </div>
              <div>
                <Label className="font-body text-sm">Audio URL</Label>
                <Input
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full" onClick={() => window.open(`/article/${existing?.slug || "preview"}`, "_blank")}>
            <Eye className="h-4 w-4 mr-2" /> Preview Article
          </Button>
        </div>
      </div>
    </div>
  );
}
