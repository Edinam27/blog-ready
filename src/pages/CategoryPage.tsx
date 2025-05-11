
import { PostCard } from "@/components/PostCard";
import { categories, getPostsByCategory } from "@/data/blogData";
import { Navigate, useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" />;
  }
  
  const category = categories.find((cat) => cat.slug === slug);
  const posts = getPostsByCategory(slug);
  
  if (!category) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="container px-4 py-8 md:py-12">
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
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No posts found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
