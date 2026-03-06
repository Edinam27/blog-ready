
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/30 dark:bg-amber-950/30 dark:text-amber-200">
      <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle>Affiliate Disclosure</AlertTitle>
      <AlertDescription className="text-xs text-amber-800/80 dark:text-amber-300/80">
        This post may contain affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you.
      </AlertDescription>
    </Alert>
  );
}
