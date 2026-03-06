
import { Post } from "@/data/blogData";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
  variant?: "default" | "trending" | "featured";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg ${
        variant === "trending" 
          ? "border-primary/20 bg-primary/5" 
          : variant === "featured" 
            ? "border-accent/20 bg-accent/5" 
            : "glass-card hover:bg-secondary/50"
      }`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.isTrending && (
            <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
              Trending
            </Badge>
          )}
          {post.isFeatured && (
            <Badge variant="outline" className="absolute right-3 top-3 bg-background/80 backdrop-blur-sm">
              Featured
            </Badge>
          )}
        </div>
        
        <CardHeader className="p-4">
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="font-normal">
              {post.category.name}
            </Badge>
            <span>{post.readTime} min read</span>
          </div>
          <h3 className="line-clamp-2 mt-2 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-2 text-muted-foreground">
            {post.excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between p-4 pt-0 text-sm">
          <div className="flex items-center gap-2">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>
          <time dateTime={post.date} className="text-muted-foreground">
            {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
          </time>
        </CardFooter>
      </Card>
    </Link>
  );
}
