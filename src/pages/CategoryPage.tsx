
import { PostCard } from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchCategories, Category, Post } from "@/lib/api";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" />;
  }
  
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: posts = [], isLoading } = useQuery<Post[]>({ queryKey: ['posts'], queryFn: fetchPosts });
  const category = categories.find((cat) => cat.slug === slug);
  const filtered = posts.filter(p => p.category.slug === slug);
  
  if (!category) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container px-4 py-8 md:py-12">
      <Helmet>
        <title>{category.name} | Mordern Blog</title>
        <meta name="description" content={`Explore comprehensive guides, breaking news, and expert insights in the ${category.name} category. Stay updated with the latest trends and stories on Mordern Blog.`} />
        <link rel="canonical" href={`${window.location.origin}/category/${category.slug}`} />
        <meta property="og:title" content={`${category.name} | Mordern Blog`} />
        <meta property="og:description" content={`Explore comprehensive guides, breaking news, and expert insights in the ${category.name} category. Stay updated with the latest trends and stories on Mordern Blog.`} />
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
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">
            Browse all posts in the {category.name} category
          </p>
        </div>
      </motion.section>
      
      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />
            ))
          ) : filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
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
