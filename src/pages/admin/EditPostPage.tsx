import { Button } from "@/components/ui/button";
import MarkdownToolbar from "@/components/editor/MarkdownToolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fetchPostBySlug, updatePost, fetchCategories, Category, fetchUsers, User } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";

export default function EditPostPage() {
  const { slug = "" } = useParams();
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

  useEffect(() => {
    (async () => {
      try {
        const post = await fetchPostBySlug(slug);
        setTitle(post.title);
        setCategorySlug(post.category.slug || "");
        setIsTrending(!!post.isTrending);
        setIsFeatured(!!post.isFeatured);
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setCoverImage(post.coverImage || "");
        setImages(post.images || []);
        setTags((post.tags || []).join(', '));
        setAuthorName(post.author.name || post.authorName || '');
      } catch (err) {
        toast({ title: "Error", description: "Failed to load post." });
      }
    })();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
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
      const updated = await updatePost(slug, payload);
      toast({ title: "Post updated", description: "Your changes have been saved." });
      navigate(`/blog/${updated.slug}`);
    } catch (err) {
      toast({ title: "Error", description: "Failed to update post." });
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
    requestAnimationFrame(() => {
      const pos = start + before.length + selected.length + after.length;
      el.selectionStart = el.selectionEnd = pos;
      el.focus();
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Post</h1>
        <p className="text-muted-foreground">Update your post content and metadata</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categorySlug} onValueChange={setCategorySlug}>
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
                  <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <MarkdownToolbar onInsert={insertAtCursor} />
                <Textarea id="content" rows={10} className="min-h-[200px]" required value={content} onChange={(e) => setContent(e.target.value)} ref={contentRef} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input id="coverImage" type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Additional Image URLs</Label>
                <div className="space-y-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input type="url" value={img} onChange={(e) => {
                        const next = [...images];
                        next[idx] = e.target.value;
                        setImages(next);
                      }} />
                      <Button type="button" variant="outline" onClick={() => setImages(images.filter((_, i) => i !== idx))}>Remove</Button>
                    </div>
                  ))}
                  <Button type="button" variant="secondary" onClick={() => setImages([...images, ""])}>Add Image</Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Switch id="trending" checked={isTrending} onCheckedChange={setIsTrending} />
                  <Label htmlFor="trending">Mark as Trending</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                  <Label htmlFor="featured">Mark as Featured</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/posts")}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}