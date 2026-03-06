
import { Card } from "@/components/ui/card";

interface AdUnitProps {
  slot?: string;
  format?: 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export function AdUnit({ slot = "1234567890", format = "rectangle", className = "" }: AdUnitProps) {
  return (
    <Card className={`overflow-hidden bg-muted/30 p-4 text-center ${className}`}>
      <div className="flex min-h-[250px] flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 text-muted-foreground">
        <span className="text-sm font-medium uppercase tracking-widest">Advertisement</span>
        <span className="mt-2 text-xs">Slot: {slot}</span>
        <span className="text-xs">Format: {format}</span>
        {/* Placeholder for actual ad script */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </div>
    </Card>
  );
}
