
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, fetchCategories, createCategory, updateCategory, Category } from "@/lib/api";
import { Input } from "@/components/ui/input";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const { data: posts = [] } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const { data: categories = [], isLoading } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  const countMap: Record<string, number> = posts.reduce((acc, p) => {
    const slug = p.category.slug;
    acc[slug] = (acc[slug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const addMutation = useMutation({
    mutationFn: (payload: { name: string; slug: string }) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setAdding(false);
      setName("");
      setSlug("");
    },
  });

  const editMutation = useMutation({
    mutationFn: (payload: { id: string; name?: string; slug?: string }) => updateCategory(payload.id, { name: payload.name, slug: payload.slug }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setEditingId(null);
    },
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage your blog categories
          </p>
        </div>
        
        {adding ? (
          <div className="flex items-center gap-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            <Button onClick={() => addMutation.mutate({ name, slug })} disabled={!name || !slug}>Save</Button>
            <Button variant="outline" onClick={() => { setAdding(false); setName(""); setSlug(""); }}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={() => setAdding(true)}>Add Category</Button>
        )}
      </div>
      
      {/* Desktop/tablet table */}
      <div className="hidden rounded-md border md:block">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Posts Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No categories found.</TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium break-words">
                      {editingId === category.id ? (
                        <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell className="break-words">
                      {editingId === category.id ? (
                        <Input value={editSlug} onChange={(e) => setEditSlug(e.target.value)} />
                      ) : (
                        category.slug
                      )}
                    </TableCell>
                    <TableCell>{countMap[category.slug] || 0}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === category.id ? (
                          <>
                            <Button size="sm" variant="secondary" onClick={() => editMutation.mutate({ id: category.id, name: editName, slug: editSlug })}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                          </>
                        ) : (
                          <Button size="sm" variant="ghost" onClick={() => { setEditingId(category.id); setEditName(category.name); setEditSlug(category.slug); }}>Edit</Button>
                        )}
                        <Link to={`/category/${category.slug}`} target="_blank">
                          <Button size="sm" variant="ghost">View</Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {isLoading ? (
          <div className="rounded-md border p-4">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="rounded-md border p-4">No categories found.</div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-base font-semibold">{category.name}</div>
                  <div className="text-sm text-muted-foreground break-words">{category.slug}</div>
                  <div className="text-xs">{countMap[category.slug] || 0} posts</div>
                </div>
                <div className="text-right text-xs">
                  <Link to={`/category/${category.slug}`} target="_blank">
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
