
import { Post } from "@/data/blogData";
import { Navigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { AdUnit } from "@/components/AdUnit";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ProductCard } from "@/components/ProductCard";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { useQuery } from "@tanstack/react-query";
import { fetchPostBySlug, fetchPosts, fetchUsers, User } from "@/lib/api";
import { Helmet } from "react-helmet-async";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" />;
  }
  
  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ['post', slug],
    queryFn: () => fetchPostBySlug(slug),
  });
  const { data: allPosts = [] } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  if (isLoading) {
    return <div className="container px-4 py-8">Loading...</div>;
  }
  if (isError || !post) {
    return <Navigate to="/" />;
  }
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && (p.category.slug === post.category.slug || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);
  
  // Sample products for sidebar (would come from DB in real app)
  const sidebarProducts = [
    {
      title: "Premium AI Writing Tool",
      description: "Generate high-quality content in seconds with this advanced AI assistant.",
      price: "$29/mo",
      url: "#",
      badge: "Best Value"
    },
    {
      title: "SEO Masterclass Course",
      description: "Learn how to rank #1 on Google with this comprehensive video course.",
      price: "$197",
      url: "#"
    }
  ];
  
  return (
    <div>
      <Helmet>
        <title>{post.title} | Modern Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`${window.location.origin}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`${window.location.origin}/blog/${post.slug}`} />
        <meta property="og:image" content={post.coverImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": [post.coverImage, ...(post.images || [])],
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author?.name || "Author"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Modern Blog"
            },
            "mainEntityOfPage": `${window.location.origin}/blog/${post.slug}`
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type":"ListItem","position":1,"name":"Home","item":window.location.origin},
              {"@type":"ListItem","position":2,"name":post.category.name,"item":`${window.location.origin}/category/${post.category.slug}`},
              {"@type":"ListItem","position":3,"name":post.title,"item":`${window.location.origin}/blog/${post.slug}`}
            ]
          })}
        </script>
      </Helmet>
      {/* Hero section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="container relative px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4">{post.category.name}</Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                {(() => {
                  const authorUser = users.find(u => u.name === (post.author?.name || ''));
                  const avatar = authorUser?.photoUrl || post.author?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.author?.name || 'Author')}`;
                  return (
                    <>
                      <img
                        src={avatar}
                        alt={post.author?.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span>{post.author?.name}</span>
                    </>
                  );
                })()}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <time dateTime={post.date}>
                  {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                </time>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content section */}
      <section className="container px-4 py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main Article Content */}
          <div className="min-w-0">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="mb-8">
                <p className="lead mb-6 text-xl text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
              
              <AffiliateDisclosure />
              
              {/* Optional gallery for multiple images (kept as a separate section) */}
              {post.images && post.images.length > 0 && (
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  {post.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${post.title} image ${idx+1}`} className="w-full rounded" />
                  ))}
                </div>
              )}

              {/* Render markdown content with headings, bold, lists, and inline images */}
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    // Make inline images responsive and rounded
                    <img {...props} className="my-4 w-full rounded" />
                  ),
                  a: ({ node, ...props }) => (
                    // Open links in a new tab safely
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  [rehypeSanitize, {
                    ...defaultSchema,
                    attributes: {
                      ...defaultSchema.attributes,
                      div: [...(defaultSchema.attributes?.div || []), ['style']],
                      img: [...(defaultSchema.attributes?.img || []), ['style']]
                    }
                  }]
                ]}
              >
                {post.content.replace(/\\n/g, '\n')}
              </ReactMarkdown>
              
              <AdUnit className="my-8" slot="in-content" format="horizontal" />
              
              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Author bio */}
              <div className="mt-12 rounded-lg bg-muted p-6">
                <div className="flex gap-4">
                  {(() => {
                    const authorUser = users.find(u => u.name === (post.author?.name || ''));
                    const avatar = authorUser?.photoUrl || post.author?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.author?.name || 'Author')}`;
                    const bio = authorUser?.bio || post.author?.bio || 'Author information coming soon.';
                    return (
                      <>
                        <img
                          src={avatar}
                          alt={post.author?.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold">{post.author?.name}</h3>
                          <p className="text-muted-foreground">{bio}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-24 space-y-8">
              <AdUnit slot="sidebar-top" />
              
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Featured Resources</h3>
                <div className="space-y-4">
                  {sidebarProducts.map((product, i) => (
                    <ProductCard key={i} {...product} />
                  ))}
                </div>
              </div>
              
              <AdUnit slot="sidebar-bottom" format="vertical" />
            </div>
          </aside>
        </div>
      </section>
      
      {/* Related posts section */}
      <section className="container px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
