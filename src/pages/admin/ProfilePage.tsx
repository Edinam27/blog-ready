import { useAuthStore } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUsers, updateUser, User, uploadImage } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const [photoUrl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (existing) {
      setPhotoUrl(existing.photoUrl || "");
      setBio(existing.bio || "");
      setName(existing.name || "");
      setLocation(existing.location || "");
      setWebsite(existing.website || "");
      setTwitter(existing.socialLinks?.twitter || "");
      setLinkedin(existing.socialLinks?.linkedin || "");
      setGithub(existing.socialLinks?.github || "");
    } else if (authUser) {
      setName(authUser.name || "");
    }
  }, [existing, authUser]);

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; email: string; role: User['role']; }) => createUser(payload),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("Profile created successfully");
    },
    onError: () => toast.error("Failed to create profile")
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => updateUser(payload.id, payload.updates),
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("Profile updated successfully");
    },
    onError: () => toast.error("Failed to update profile")
  });

  if (!authUser) return null;

  const handleCreate = () => {
    createMutation.mutate({ name, email: authUser.email, role: 'admin' });
  };

  const handleSave = () => {
    if (!existing) return;
    updateMutation.mutate({ 
      id: existing.id, 
      updates: {
        name,
        photoUrl, 
        bio, 
        location,
        website,
        socialLinks: {
          twitter,
          linkedin,
          github
        }
      }
    });
  };

  const avatar = (photoUrl && photoUrl.length > 0)
    ? photoUrl
    : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || authUser.name)}`;

  const handlePhotoUpload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      setPhotoUrl(res.url);
      toast.success("Photo uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Author Profile</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : !existing ? (
            <div className="space-y-4">
              <p>No profile found for {authUser.email}. Create one to manage your author info.</p>
              <div className="grid gap-4 max-w-md">
                <div className="grid gap-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={authUser.email} disabled />
                </div>
                <Button onClick={handleCreate} disabled={createMutation.isPending}>Create Profile</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2 w-full max-w-xs">
                    <Label htmlFor="photoUrl">Profile Photo URL</Label>
                    <Input id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://example.com/me.jpg" />
                    <p className="text-xs text-muted-foreground">Paste a direct link to your photo</p>
                    <div className="grid gap-2">
                      <Label>Or upload</Label>
                      <Input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e.target.files?.[0])} />
                      <Button type="button" variant="secondary" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={existing.email} disabled />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      placeholder="Tell readers about yourself..." 
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="San Francisco, CA" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Social Links</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="twitter">Twitter (X)</Label>
                    <Input id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@username" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="username" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input id="github" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="username" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button onClick={handleSave} disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
