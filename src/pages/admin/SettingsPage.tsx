
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your blog settings and preferences
        </p>
      </div>
      
      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure the general settings for your blog
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-name">Blog Name</Label>
              <Input id="blog-name" defaultValue="ModernBlog" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blog-description">Description</Label>
              <Input
                id="blog-description"
                defaultValue="A modern blog platform featuring the latest insights, trends, and stories."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="posts-per-page">Posts Per Page</Label>
              <Input id="posts-per-page" type="number" defaultValue={10} />
            </div>
          </CardContent>
        </Card>
        
        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>
              Configure SEO settings for better search engine visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Default Meta Title</Label>
              <Input
                id="meta-title"
                defaultValue="ModernBlog | Latest Articles and Insights"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Default Meta Description</Label>
              <Input
                id="meta-description"
                defaultValue="Discover the latest insights and trends on technology, business, lifestyle, and education."
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="generate-sitemap" defaultChecked />
              <Label htmlFor="generate-sitemap">
                Automatically generate sitemap
              </Label>
            </div>
          </CardContent>
        </Card>
        
        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Connect your social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input id="twitter" type="url" placeholder="https://twitter.com/yourusername" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input id="facebook" type="url" placeholder="https://facebook.com/yourpage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input id="instagram" type="url" placeholder="https://instagram.com/yourusername" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourusername" />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
