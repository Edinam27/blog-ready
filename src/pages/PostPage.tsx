import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon, Clock, Share2, Twitter, Linkedin, Github, Globe, MapPin } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug, fetchUsers, User } from "@/lib/api";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { ProductCard } from "@/components/ProductCard";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { AdUnit } from "@/components/AdUnit";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";

// Helper function to strip indentation from template literals
const stripIndentation = (str: string) => {
  if (!str) return '';
  // Find the first line with non-whitespace characters to determine base indentation
  const lines = str.split('\n');
  const firstContentLine = lines.find(line => line.trim().length > 0);
  
  if (!firstContentLine) return str;
  
  const indentation = firstContentLine.match(/^\s*/)?.[0] || '';
  
  if (!indentation) return str;
  
  // Create a regex to match the indentation at the start of each line
  const regex = new RegExp(`^${indentation}`, 'gm');
  return str.replace(regex, '');
};

export default function PostPage() {
  const { slug } = useParams();
  
  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const author = post ? users.find(u => u.name === post.author.name) : null;

  if (postLoading) {
    return (
      <div className="container py-10 space-y-8">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="container py-10">Post not found</div>;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImage,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Modern Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      
      <article className="container py-10">
        <div className="space-y-6 mb-10">
          <div className="flex gap-2">
            <Badge variant="secondary" className="hover:bg-secondary/80">
              <Link to={`/category/${post.category.slug}`}>{post.category.name}</Link>
            </Badge>
            {post.isTrending && <Badge variant="destructive">Trending</Badge>}
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-y py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-background">
                <AvatarImage src={author?.photoUrl || post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{post.author.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-10 min-w-0">
            <div className="relative overflow-hidden rounded-xl border bg-muted">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[600px]"
              />
            </div>

            <AffiliateDisclosure />
            <AdUnit slotId="top-content-ad" className="my-8" />

            <div className="prose prose-lg dark:prose-invert max-w-none break-words">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw, [rehypeSanitize, defaultSchema]]}
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  img: ({node, ...props}) => (
                    <img {...props} className="rounded-lg border shadow-sm my-8 w-full h-auto" alt={props.alt || ''} />
                  ),
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  a: ({node, ...props}) => (
                    <a {...props} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer" />
                  )
                }}
              >
                {stripIndentation(post.content)}
              </ReactMarkdown>
            </div>

            {/* Author Bio Section */}
            <Card className="bg-muted/30">
              <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-20 w-20 border-2 border-background">
                  <AvatarImage src={author?.photoUrl || post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <h3 className="font-semibold text-lg">About {post.author.name}</h3>
                  <p className="text-muted-foreground">
                    {author?.bio || post.author.bio || `Writer at Modern Blog covering ${post.category.name} and related topics.`}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                    {author?.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{author.location}</span>
                      </div>
                    )}
                    {author?.website && (
                      <a href={author.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Globe className="h-3 w-3" />
                        <span>Website</span>
                      </a>
                    )}
                    {author?.socialLinks?.twitter && (
                      <a href={`https://twitter.com/${author.socialLinks.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Twitter className="h-3 w-3" />
                        <span>Twitter</span>
                      </a>
                    )}
                    {author?.socialLinks?.linkedin && (
                      <a href={`https://linkedin.com/in/${author.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Linkedin className="h-3 w-3" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {author?.socialLinks?.github && (
                      <a href={`https://github.com/${author.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Github className="h-3 w-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <AdUnit slotId="bottom-content-ad" className="my-8" />
          </div>
          
          <aside className="space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Related Products</h3>
                <div className="space-y-4">
                  <ProductCard 
                    title="Premium Productivity Course" 
                    description="Master your time with our comprehensive guide."
                    price="$49"
                    rating={4.8}
                    imageUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                    affiliateLink="#"
                  />
                  <ProductCard 
                    title="Ergonomic Desk Setup" 
                    description="The ultimate workspace for remote workers."
                    price="$299"
                    rating={4.9}
                    imageUrl="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
                    affiliateLink="#"
                  />
                </div>
              </div>

              <AdUnit slotId="sidebar-ad" format="vertical" />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
