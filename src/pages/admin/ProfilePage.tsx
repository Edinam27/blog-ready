import { useAuthStore } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUsers, updateUser, User } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

export default function ProfilePage() {
  const { user: authUser } = useAuthStore();
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const existing = useMemo(() => {
    if (!authUser) return null;
    return users.find(u => u.email === authUser.email) || null;
  }, [users, authUser]);

  const [photoUrl, setPhotoUrl] = useState(existing?.photoUrl || "");
  const [bio, setBio] = useState(existing?.bio || "");
  const [name, setName] = useState(existing?.name || authUser?.name || "");

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; email: string; role: User['role']; }) => createUser(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); }
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { id: string; photoUrl: string; bio: string; name?: string; }) => updateUser(payload.id, { photoUrl: payload.photoUrl, bio: payload.bio, name: payload.name }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); }
  });

  if (!authUser) return null;

  const handleCreate = () => {
    createMutation.mutate({ name, email: authUser.email, role: 'admin' });
  };

  const handleSave = () => {
    if (!existing) return;
    updateMutation.mutate({ id: existing.id, photoUrl, bio, name });
  };

  const avatar = (photoUrl && photoUrl.length > 0)
    ? photoUrl
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || authUser.name)}`;

  return (
    <div className="container max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Author Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : !existing ? (
            <div className="space-y-4">
              <p>No profile found for {authUser.email}. Create one to manage your author info.</p>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={authUser.email} disabled />
                </div>
                <Button onClick={handleCreate} disabled={createMutation.isLoading}>Create Profile</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img src={avatar} alt={name} className="h-16 w-16 rounded-full object-cover" />
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photoUrl">Profile Photo URL</Label>
                <Input id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">About</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell readers about yourself" rows={6} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={updateMutation.isLoading}>Save Changes</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}