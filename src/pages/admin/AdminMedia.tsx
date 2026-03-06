import { useState } from "react";
import { Upload, Trash2, Image, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mediaItems as initialMedia, type MediaItem } from "@/data/adminMockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminMedia() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
    toast({ title: "Media deleted" });
  };

  const images = media.filter((m) => m.type === "image");
  const audio = media.filter((m) => m.type === "audio");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold">Media Library</h1>
          <p className="font-body text-sm text-muted-foreground">{media.length} files</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" /> Upload
        </Button>
      </div>

      {/* Images */}
      <div>
        <h2 className="font-headline text-lg font-semibold mb-3 flex items-center gap-2">
          <Image className="h-4 w-4" /> Images ({images.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <Card key={item.id} className="bg-background overflow-hidden group">
              <div className="aspect-video relative">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-body text-xs font-medium truncate">{item.name}</p>
                <p className="font-body text-xs text-muted-foreground">{item.size} · {item.uploadedAt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Audio */}
      <div>
        <h2 className="font-headline text-lg font-semibold mb-3 flex items-center gap-2">
          <Music className="h-4 w-4" /> Audio ({audio.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {audio.map((item) => (
            <Card key={item.id} className="bg-background">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <Music className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{item.size} · {item.uploadedAt}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
