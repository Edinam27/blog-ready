
import { fetchCategories, Category } from "@/lib/api";
import { PostCard } from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, Post } from "@/lib/api";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  const trendingPosts = posts.filter((p) => p.isTrending).sort((a, b) => (b.views || 0) - (a.views || 0));
  const featuredPosts = posts.filter((p) => p.isFeatured);
  
  return (
    <div className="container px-4 py-8 md:py-12">
      <Helmet>
        <title>Modern Blog Platform</title>
        <meta name="description" content="Discover insights, trends, and stories across categories on our modern blog." />
        <link rel="canonical" href={window.location.origin} />
        <meta property="og:title" content="Modern Blog Platform" />
        <meta property="og:description" content="Discover insights, trends, and stories across categories on our modern blog." />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Modern Blog",
            "url": window.location.origin,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${window.location.origin}/?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} variant="trending" />
            ))}
          </div>
        )}
      </section>
      
      {/* Featured posts section */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <span className="mr-2">🎯</span>Featured
          </h2>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} variant="featured" />
            ))}
          </div>
        )}
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts
                .filter((post) => post.category.slug === category.slug)
                .slice(0, 3)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
