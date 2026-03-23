import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Globe, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminArticle, createAdminArticle, updateAdminArticle } from "@/api/admin";
import { getCategories } from "@/api/categories";
import { useToast } from "@/hooks/use-toast";

export default function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNew = !id || id === "new";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [existingAudioUrl, setExistingAudioUrl] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filteredCategories = categories.filter((cat: any) => 
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const { data: existingArticle, isLoading } = useQuery({
    queryKey: ['adminArticle', id],
    queryFn: () => getAdminArticle(id!),
    enabled: !isNew,
  });

  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title || "");
      setDescription(existingArticle.description || "");
      setContent(existingArticle.content || "");
      if (existingArticle.categoryIds && existingArticle.categoryIds.length > 0) {
        setCategoryIds(existingArticle.categoryIds);
      } else if (existingArticle.categoryId) {
        setCategoryIds([existingArticle.categoryId]);
      } else {
        setCategoryIds([]);
      }
      setIsPublished(existingArticle.status === "published");
      setPreviewImageUrl(existingArticle.image || "");
      setExistingAudioUrl(existingArticle.audioUrl || "");
    }
  }, [existingArticle]);

  const saveMutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (isNew) return createAdminArticle(formData);
      return updateAdminArticle(id!, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      toast({ title: "Article saved successfully" });
      navigate("/admin/articles");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || "An unknown error occurred.";
      toast({ title: "Failed to save article", description: msg, variant: "destructive" });
    },
  });

  const wordCount = content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).filter(word => word.length > 0).length;
  const MIN_WORDS = 300;

  const handleSave = (asDraft: boolean) => {
    if (!title.trim()) {
      toast({ title: "Validation Error", description: "Please enter an article title.", variant: "destructive" });
      return;
    }
    if (!asDraft) {
      if (!description.trim()) {
        toast({ title: "Validation Error", description: "Please enter a description.", variant: "destructive" });
        return;
      }
      if (!content.trim()) {
        toast({ title: "Validation Error", description: "Please enter the article body.", variant: "destructive" });
        return;
      }
      if (categoryIds.length === 0) {
        toast({ title: "Validation Error", description: "Please select at least one category.", variant: "destructive" });
        return;
      }
      if (!imageFile && !previewImageUrl) {
        toast({
          title: "Featured image required",
          description: "A featured image is required to publish this article. Please upload an image or save as a draft.",
          variant: "destructive",
        });
        return;
      }
      if (wordCount < MIN_WORDS) {
        toast({
          title: "Insufficient content",
          description: `A minimum of ${MIN_WORDS} words is required to publish an article to maintain structural integrity. Currently at ${wordCount} words.`,
          variant: "destructive",
        });
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description || "");
    formData.append("content", content || "");
    categoryIds.forEach(id => {
      formData.append("category_ids[]", id);
    });
    formData.append("status", asDraft ? "draft" : "published");
    if (imageFile) formData.append("image", imageFile);
    if (audioFile) formData.append("audio", audioFile);

    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground font-body">Loading article...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/articles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="font-headline text-2xl font-bold">{isNew ? "Create Article" : "Edit Article"}</h1>
          <p className="font-body text-sm text-muted-foreground">{isNew ? "Write a new article" : `Editing: ${title}`}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave(true)} disabled={saveMutation.isPending}>
            <Save className="h-4 w-4 mr-2" /> {saveMutation.isPending ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={() => handleSave(false)} disabled={saveMutation.isPending}>
            <Globe className="h-4 w-4 mr-2" /> {saveMutation.isPending ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <div className="flex justify-between items-center">
                  <Label className="font-body text-sm">Article Body</Label>
                  <span className={`text-xs font-body ${wordCount < MIN_WORDS ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
                    {wordCount} / {MIN_WORDS} words {wordCount < MIN_WORDS && "(minimum required)"}
                  </span>
                </div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here... (supports HTML)"
                  className="font-body mt-1 min-h-[300px]"
                  rows={15}
                />
                {wordCount < MIN_WORDS && (
                  <p className="font-body text-xs text-destructive mt-1.5">
                    For optimal layout structure on the news page, please ensure the article body is at least {MIN_WORDS} words.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-background">
            <CardHeader className="pb-3">
              <CardTitle className="font-headline text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-body text-sm block mb-2">Categories</Label>
                <Input
                  className="mb-3 h-8 text-xs font-body"
                  placeholder="Search categories..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 max-h-[350px] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                  {filteredCategories.length === 0 ? (
                    <p className="text-xs text-muted-foreground font-body py-2">No categories found.</p>
                  ) : (
                    filteredCategories.map((cat) => {
                      const isSelected = categoryIds.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setCategoryIds(categoryIds.filter(id => id !== cat.id));
                            } else {
                              setCategoryIds([...categoryIds, cat.id]);
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                            isSelected 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground'
                          }`}
                        >
                          {cat.name}
                        </button>
                      );
                    })
                  )}
                </div>
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
                <Label className="font-body text-sm">
                  Featured Image
                  {isPublished && <span className="text-destructive ml-1">*</span>}
                </Label>
                {isPublished && !imageFile && !previewImageUrl && (
                  <p className="font-body text-xs text-destructive mt-0.5">
                    Required to publish this article.
                  </p>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {!imageFile && previewImageUrl && (
                  <img src={previewImageUrl} alt="Preview" className="mt-2 w-full aspect-video object-cover rounded-sm" />
                )}
              </div>
              <div>
                <Label className="font-body text-sm">Audio File</Label>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {!audioFile && existingAudioUrl && (
                  <p className="mt-1 font-body text-xs text-muted-foreground truncate">Current: {existingAudioUrl.split('/').pop()}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {!isNew && (
            <Button variant="outline" className="w-full" onClick={() => window.open(`/article/${existingArticle?.slug}`, "_blank")}>
              <Eye className="h-4 w-4 mr-2" /> View Public Article
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
