
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  price?: string;
  rating?: number;
  image?: string;
  url: string;
  ctaText?: string;
  badge?: string;
}

export function ProductCard({ 
  title, 
  description, 
  price, 
  rating = 5, 
  image, 
  url, 
  ctaText = "Check Price",
  badge 
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {image && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover" />
          {badge && (
            <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
              {badge}
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
        {rating && (
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} 
              />
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
        {price && <p className="mt-2 font-bold text-lg">{price}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {ctaText} <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
