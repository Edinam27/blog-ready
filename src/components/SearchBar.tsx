
import { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: posts = [] } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  
  const handleSelect = (slug: string) => {
    setOpen(false);
    navigate(`/blog/${slug}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 rounded-full p-0 sm:h-10 sm:w-60 sm:justify-start sm:px-3 sm:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline-flex">Search posts...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search posts..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Posts">
            {posts.map((post) => (
              <CommandItem
                key={post.id}
                onSelect={() => handleSelect(post.slug)}
                className="flex items-center gap-2"
              >
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="h-8 w-8 rounded object-cover"
                />
                <div className="flex flex-col">
                  <span>{post.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.category.name}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
