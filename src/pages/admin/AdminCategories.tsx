import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categories as initialCategories, type Category } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminCategories() {
  const [cats, setCats] = useState<Category[]>(initialCategories);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [newName, setNewName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!newName.trim()) return;
    if (editingCat) {
      setCats(cats.map((c) => c.id === editingCat.id ? { ...c, name: newName, slug: newName.toLowerCase().replace(/\s+/g, "-") } : c));
      toast({ title: "Category updated" });
    } else {
      const newCat: Category = { id: String(Date.now()), name: newName, slug: newName.toLowerCase().replace(/\s+/g, "-") };
      setCats([...cats, newCat]);
      toast({ title: "Category created" });
    }
    setNewName("");
    setEditingCat(null);
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCats(cats.filter((c) => c.id !== id));
    toast({ title: "Category deleted" });
  };

  const openEdit = (cat: Category) => {
    setEditingCat(cat);
    setNewName(cat.name);
    setDialogOpen(true);
  };

  const openNew = () => {
    setEditingCat(null);
    setNewName("");
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold">Categories</h1>
          <p className="font-body text-sm text-muted-foreground">{cats.length} categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" /> New Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">{editingCat ? "Edit Category" : "New Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="font-body text-sm">Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Category name" className="mt-1" />
              </div>
              <Button onClick={handleSave} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-background">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">Name</TableHead>
                <TableHead className="font-body">Slug</TableHead>
                <TableHead className="font-body w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cats.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-body text-sm font-medium">{cat.name}</TableCell>
                  <TableCell className="font-body text-sm text-muted-foreground">{cat.slug}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(cat)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(cat.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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
