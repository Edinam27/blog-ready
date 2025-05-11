
import { getFeaturedPosts, getTrendingPosts, posts, categories } from "@/data/blogData";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const trendingPosts = getTrendingPosts();
  const featuredPosts = getFeaturedPosts();
  
  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Hero section */}
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Modern Blog Platform
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Discover insights, trends, and stories across various categories
          </p>
        </div>
      </section>
      
      {/* Trending posts section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <span className="mr-2">🔥</span>Trending
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingPosts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} variant="trending" />
          ))}
        </div>
      </section>
      
      {/* Featured posts section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <span className="mr-2">🎯</span>Featured
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post} variant="featured" />
          ))}
        </div>
      </section>
      
      {/* Categories sections */}
      {categories.map((category) => (
        <section key={category.id} className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {category.name}
            </h2>
            <a
              href={`/category/${category.slug}`}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              View all
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts
              .filter((post) => post.category.id === category.id)
              .slice(0, 3)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
