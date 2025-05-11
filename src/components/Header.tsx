
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { SearchBar } from "./SearchBar";
import { categories } from "@/data/blogData";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useAuthStore();
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-2xl">ModernBlog</span>
          </Link>
          
          <nav className="hidden gap-6 md:flex">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <SearchBar />
          <ThemeToggle />
          
          {isLoggedIn ? (
            <Button variant="ghost" asChild>
              <Link to="/admin">Dashboard</Link>
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/admin/login">Login</Link>
            </Button>
          )}
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <span className="font-bold text-xl">ModernBlog</span>
              </Link>
              <nav className="mt-8 flex flex-col gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                ))}
                {isLoggedIn && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
