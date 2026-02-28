
import { PostCard } from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchCategories, Category } from "@/lib/api";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" />;
  }
  
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: posts = [], isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const category = categories.find((cat) => cat.slug === slug);
  const filtered = posts.filter(p => p.category.slug === slug);
  
  if (!category) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container px-4 py-8 md:py-12">
      <Helmet>
        <title>{category.name} | Modern Blog</title>
        <meta name="description" content={`Browse posts about ${category.name}.`} />
        <link rel="canonical" href={`${window.location.origin}/category/${category.slug}`} />
        <meta property="og:title" content={`${category.name} | Modern Blog`} />
        <meta property="og:description" content={`Browse posts about ${category.name}.`} />
        <meta property="og:url" content={`${window.location.origin}/category/${category.slug}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type":"ListItem","position":1,"name":"Home","item":window.location.origin},
              {"@type":"ListItem","position":2,"name":category.name,"item":`${window.location.origin}/category/${category.slug}`}
            ]
          })}
        </script>
      </Helmet>
      <section className="mb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">
            Browse all posts in the {category.name} category
          </p>
        </div>
      </section>
      
      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div>Loading...</div>
          ) : filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {!isLoading && filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No posts found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
