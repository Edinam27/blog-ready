
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, Category } from "@/lib/api";

export function Footer() {
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-2xl">ModernBlog</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A modern blog platform featuring the latest insights, trends, and
              stories across technology, business, lifestyle, and education.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium">Categories</h3>
              <nav className="mt-4 flex flex-col gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Company</h3>
              <nav className="mt-4 flex flex-col gap-2">
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Team
                </Link>
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Legal</h3>
              <nav className="mt-4 flex flex-col gap-2">
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ModernBlog. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Twitter
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </Link>
              <Link
                to="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
