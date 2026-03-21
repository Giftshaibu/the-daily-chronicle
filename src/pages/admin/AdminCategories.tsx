import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminCategories, createAdminCategory, updateAdminCategory, deleteAdminCategory } from "@/api/admin";
import { type Category } from "@/types/api";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminCategories() {
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [newName, setNewName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cats = [], isLoading } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: getAdminCategories,
  });

  const createMutation = useMutation({
    mutationFn: createAdminCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      toast({ title: "Category created" });
      setDialogOpen(false);
    },
    onError: () => toast({ title: "Failed to create category", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; slug: string } }) => updateAdminCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      toast({ title: "Category updated" });
      setDialogOpen(false);
    },
    onError: () => toast({ title: "Failed to update category", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      toast({ title: "Category deleted" });
    },
    onError: () => toast({ title: "Failed to delete category", variant: "destructive" }),
  });

  const handleSave = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, "-");
    
    if (editingCat) {
      updateMutation.mutate({ id: editingCat.id, data: { name: newName, slug } });
    } else {
      createMutation.mutate({ name: newName, slug });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center font-body py-8 text-muted-foreground">
                    Loading categories...
                  </TableCell>
                </TableRow>
              ) : cats.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center font-body py-8 text-muted-foreground">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : cats.map((cat) => (
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
