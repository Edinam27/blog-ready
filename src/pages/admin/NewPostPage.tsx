
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPost, fetchUsers, fetchCategories, User, Category } from "@/lib/api";
import MarkdownToolbar from "@/components/editor/MarkdownToolbar";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";

export default function NewPostPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const { data: users = [] } = useQuery<User[]>({ queryKey: ['users'], queryFn: fetchUsers });
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        excerpt,
        content,
        coverImage,
        images: images.filter(Boolean),
        authorName: authorName || 'Admin',
        categorySlug,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        isTrending,
        isFeatured,
      };
      await createPost(payload);
      toast({ title: "Post created", description: "Your post has been created successfully." });
      navigate("/admin/posts");
    } catch (err) {
      toast({ title: "Error", description: "Failed to create post." });
    }
  };
  
  const insertAtCursor = (before: string, after: string = "", placeholder = "") => {
    const el = contentRef.current;
    if (!el) {
      setContent((prev) => `${prev}${before}${placeholder}${after}`);
      return;
    }
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const selected = el.value.substring(start, end) || placeholder;
    const next = `${el.value.substring(0, start)}${before}${selected}${after}${el.value.substring(end)}`;
    setContent(next);
    // move cursor to end of inserted text
    requestAnimationFrame(() => {
      const pos = start + before.length + selected.length + after.length;
      el.selectionStart = el.selectionEnd = pos;
      el.focus();
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post to publish on your site
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="enter-post-slug"
                  value={title.toLowerCase().replace(/\s+/g, '-')}
                  readOnly
                />
                <p className="text-xs text-muted-foreground">
                  URL-friendly version of the title. Auto-generated.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={categorySlug} 
                    onValueChange={setCategorySlug}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Select value={authorName} onValueChange={setAuthorName}>
                    <SelectTrigger id="author">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.filter(u => u.role === 'author' || u.role === 'editor').map(u => (
                        <SelectItem key={u.id} value={u.name}>{u.name} ({u.role})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input 
                    id="tags" 
                    placeholder="Enter tags separated by commas" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief summary of the post"
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <MarkdownToolbar onInsert={insertAtCursor} />
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  rows={10}
                  className="min-h-[200px]"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  ref={contentRef}
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Supports Markdown formatting. Examples:</p>
                  <p><code># Heading 1</code> <code>## Heading 2</code> <code>**bold**</code> <code>- list item</code></p>
                  <p>Inline image: <code>![Alt text](https://example.com/img.jpg)</code></p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input id="coverImage" type="url" placeholder="https://example.com/image.jpg" required value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Additional Image URLs</Label>
                <div className="space-y-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        type="url"
                        placeholder={`https://example.com/image-${idx + 1}.jpg`}
                        value={img}
                        onChange={(e) => {
                          const next = [...images];
                          next[idx] = e.target.value;
                          setImages(next);
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => setImages(images.filter((_, i) => i !== idx))}>Remove</Button>
                    </div>
                  ))}
                  <Button type="button" variant="secondary" onClick={() => setImages([...images, ""])}>Add Image</Button>
                </div>
                <p className="text-xs text-muted-foreground">You can add multiple images. The first image above is the cover; others appear in the gallery.</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="trending"
                    checked={isTrending}
                    onCheckedChange={setIsTrending}
                  />
                  <Label htmlFor="trending">Mark as Trending</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  />
                  <Label htmlFor="featured">Mark as Featured</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/posts")}>
            Cancel
          </Button>
          <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </div>
  );
}
