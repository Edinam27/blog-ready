
import { fetchCategories, Category } from "@/lib/api";
import { PostCard } from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts, Post } from "@/lib/api";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ['categories'], queryFn: fetchCategories });
  const trendingPosts = posts.filter((p) => p.isTrending).sort((a, b) => (b.views || 0) - (a.views || 0));
  const featuredPosts = posts.filter((p) => p.isFeatured);
  
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Helmet>
        <title>Mordern Blog | Insights, Trends, and Stories</title>
        <meta name="description" content="Welcome to Mordern Blog. Discover in-depth, expert-written articles covering the latest trends in artificial intelligence, digital marketing, personal finance, education, and lifestyle. Stay informed and ahead of the curve." />
        <link rel="canonical" href={window.location.origin} />
        <meta property="og:title" content="Mordern Blog | Insights, Trends, and Stories" />
        <meta property="og:description" content="Welcome to Mordern Blog. Discover in-depth, expert-written articles covering the latest trends in artificial intelligence, digital marketing, personal finance, education, and lifestyle. Stay informed and ahead of the curve." />
        <meta property="og:type" content="website" />
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
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Mordern Blog Platform
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Discover insights, trends, and stories across various categories
          </p>
        </div>
      </motion.section>
      
      {/* Trending posts section */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <span className="mr-2">🔥</span>Trending
          </h2>
        </div>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PostCard post={post} variant="trending" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
      
      {/* Featured posts section */}
      <motion.section 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <span className="mr-2">🎯</span>Featured
          </h2>
        </div>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PostCard post={post} variant="featured" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
      
      {/* Categories sections */}
      {categories.map((category, index) => (
        <motion.section 
          key={category.id} 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts
                .filter((post) => post.category.id === category.id)
                .slice(0, 4)
                .map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
            </div>
          )}
        </motion.section>
      ))}
    </div>
  );
}
