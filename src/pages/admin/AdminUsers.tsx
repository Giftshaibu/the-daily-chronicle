import { useState } from "react";
import { Shield, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminUsers, type AdminUser, type UserRole } from "@/data/adminMockData";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const { toast } = useToast();

  const handleRoleChange = (userId: string, role: UserRole) => {
    setUsers(users.map((u) => u.id === userId ? { ...u, role } : u));
    toast({ title: "Role updated" });
  };

  const handleRemove = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    toast({ title: "User removed" });
  };

  const roleBadge = (role: UserRole) => {
    const styles = {
      admin: "bg-primary/10 text-primary",
      editor: "bg-blue-100 text-blue-700",
      author: "bg-muted text-muted-foreground",
    };
    return styles[role];
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-headline text-2xl font-bold">Users</h1>
        <p className="font-body text-sm text-muted-foreground">{users.length} team members</p>
      </div>

      <Card className="bg-background">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">User</TableHead>
                <TableHead className="font-body hidden md:table-cell">Email</TableHead>
                <TableHead className="font-body">Role</TableHead>
                <TableHead className="font-body hidden lg:table-cell">Articles</TableHead>
                <TableHead className="font-body hidden lg:table-cell">Joined</TableHead>
                <TableHead className="font-body w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="font-body text-sm font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-body text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onValueChange={(val) => handleRoleChange(user.id, val as UserRole)}>
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-body text-sm text-muted-foreground">{user.articlesCount}</TableCell>
                  <TableCell className="hidden lg:table-cell font-body text-sm text-muted-foreground">{user.joinedAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleRemove(user.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
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
