import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUsers, User } from "@/lib/api";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function UsersPage() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery<User[]>({ queryKey: ['users'], queryFn: fetchUsers });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User['role']>('author');
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({ title: "User added", description: "The user was created successfully." });
      setName("");
      setEmail("");
      setRole('author');
      qc.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user.", variant: "destructive" });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ name, email, role });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Add bloggers and co-editors</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as User['role'])}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="author">Blogger</SelectItem>
                  <SelectItem value="editor">Co-editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <Button type="submit">Add User</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Desktop/tablet table */}
      <div className="hidden rounded-md border md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-right">Created</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="p-3" colSpan={4}>Loading...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td className="p-3 text-center" colSpan={4}>No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="p-3 font-medium break-words">{u.name}</td>
                    <td className="p-3 break-words">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3 text-right">{new Date((u as any).createdAt || Date.now()).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {isLoading ? (
          <Card>
            <CardContent className="p-4">Loading...</CardContent>
          </Card>
        ) : users.length === 0 ? (
          <Card>
            <CardContent className="p-4">No users found.</CardContent>
          </Card>
        ) : (
          users.map((u) => (
            <Card key={u.id} className="">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-base font-semibold">{u.name}</div>
                    <div className="text-sm text-muted-foreground break-words">{u.email}</div>
                    <div className="text-xs capitalize">Role: {u.role}</div>
                  </div>
                  <div className="text-xs text-right text-muted-foreground">
                    {new Date((u as any).createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}