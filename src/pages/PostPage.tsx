
import { getPostBySlug, getRelatedPosts } from "@/data/blogData";
import { Navigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/" />;
  }
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    return <Navigate to="/" />;
  }
  
  const relatedPosts = getRelatedPosts(post);
  
  return (
    <div>
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
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">{post.category.name}</Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span>{post.author.name}</span>
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
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <div className="mb-8">
              <p className="lead mb-6 text-xl text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
            
            {/* Render content - in a real app this would be properly formatted markdown/html */}
            <div className="markdown-content whitespace-pre-line">
              {post.content}
            </div>
            
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
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold">{post.author.name}</h3>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </div>
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
