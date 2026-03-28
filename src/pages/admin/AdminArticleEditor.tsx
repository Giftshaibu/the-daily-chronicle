import { useState, useEffect, useRef, type ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ArrowLeft, Save, Globe, Eye, Bold, Italic, Underline, Heading2, Quote, List, Link as LinkIcon, SeparatorHorizontal } from "lucide-react";
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
import { Category } from "@/types/api";

type ApiError = AxiosError<{ message?: string }>;

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
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [existingAudioUrl, setExistingAudioUrl] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const filteredCategories = categories.filter((cat: Category) =>
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
    onError: (error: ApiError) => {
      const msg = error.response?.data?.message || error.message || "An unknown error occurred.";
      toast({ title: "Failed to save article", description: msg, variant: "destructive" });
    },
  });

  const wordCount = content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).filter(word => word.length > 0).length;
  const MIN_WORDS = 300;

  const insertAtCursor = (snippet: string) => {
    const textarea = contentRef.current;
    if (!textarea) {
      setContent((prev) => prev + snippet);
      return;
    }
    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;
    setContent((prev) => prev.slice(0, start) + snippet + prev.slice(end));
    requestAnimationFrame(() => {
      textarea.focus();
      const position = start + snippet.length;
      textarea.setSelectionRange(position, position);
    });
  };

  const wrapSelection = (openTag: string, closeTag: string, placeholder = "Text") => {
    const textarea = contentRef.current;
    if (!textarea) {
      insertAtCursor(`${openTag}${placeholder}${closeTag}`);
      return;
    }
    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;
    const selected = content.slice(start, end) || placeholder;
    const snippet = `${openTag}${selected}${closeTag}`;
    setContent((prev) => prev.slice(0, start) + snippet + prev.slice(end));
    requestAnimationFrame(() => {
      textarea.focus();
      const position = start + snippet.length;
      textarea.setSelectionRange(position, position);
    });
  };

  const wrapAsList = () => {
    const textarea = contentRef.current;
    if (!textarea) {
      insertAtCursor("<ul>\n  <li>Item</li>\n</ul>");
      return;
    }
    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;
    const selected = content.slice(start, end).trim();
    if (!selected) {
      insertAtCursor("<ul>\n  <li>Item</li>\n</ul>");
      return;
    }
    const items = selected.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const list = `<ul>\n${items.map((item) => `  <li>${item}</li>`).join("\n")}\n</ul>`;
    setContent((prev) => prev.slice(0, start) + list + prev.slice(end));
    requestAnimationFrame(() => {
      textarea.focus();
      const position = start + list.length;
      textarea.setSelectionRange(position, position);
    });
  };

  const insertLink = () => {
    const url = window.prompt("Enter link URL");
    if (!url) return;
    const text = window.prompt("Enter link text", url) || url;
    insertAtCursor(`<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
  };

  const insertPageBreak = () => {
    insertAtCursor("\n<hr class=\"page-break\" />\n");
  };

  const ToolbarButton = ({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex items-center justify-center h-9 w-9 rounded-md border border-input text-muted-foreground hover:text-foreground hover:border-primary transition-colors group"
        aria-label={label}
      >
        {children}
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background text-[10px] font-body px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      </button>
    );
  };

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
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <ToolbarButton label="Bold" onClick={() => wrapSelection("<strong>", "</strong>", "Bold text")}>
                    <Bold className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Italic" onClick={() => wrapSelection("<em>", "</em>", "Italic text")}>
                    <Italic className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Underline" onClick={() => wrapSelection("<u>", "</u>", "Underline text")}>
                    <Underline className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Heading" onClick={() => wrapSelection("<h2>", "</h2>", "Section heading")}>
                    <Heading2 className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Quote" onClick={() => wrapSelection("<blockquote>", "</blockquote>", "Quote text")}>
                    <Quote className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="List" onClick={wrapAsList}>
                    <List className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Link" onClick={insertLink}>
                    <LinkIcon className="h-4 w-4" />
                  </ToolbarButton>
                  <ToolbarButton label="Page Break" onClick={insertPageBreak}>
                    <SeparatorHorizontal className="h-4 w-4" />
                  </ToolbarButton>
                  <span className="text-xs font-body text-muted-foreground">
                    HTML supported. Example: <span className="font-mono text-[11px]">&lt;strong&gt;bold&lt;/strong&gt;</span>
                  </span>
                </div>
                <Textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here... (supports HTML)"
                  className="font-body mt-1 min-h-[500px]"
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
                          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${isSelected
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
