import { Button } from "@/components/ui/button";

interface MarkdownToolbarProps {
  onInsert: (before: string, after?: string, placeholder?: string) => void;
}

export default function MarkdownToolbar({ onInsert }: MarkdownToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Headings and content */}
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('# ', '')}>H1</Button>
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('## ', '')}>H2</Button>
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('### ', '')}>H3</Button>

      {/* Basic styles */}
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('**', '**', 'bold text')}>Bold</Button>
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('*', '*', 'italic text')}>Italic</Button>
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('> ', '')}>Quote</Button>

      {/* Lists */}
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('- ', '')}>Bulleted</Button>
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('1. ', '')}>Numbered</Button>

      {/* Media and links */}
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('![alt text](', ')', 'https://example.com/image.jpg')}>Image</Button>
      <Button type="button" variant="secondary" size="sm" onClick={() => onInsert('[link text](', ')', 'https://example.com')}>Link</Button>

      {/* Image alignment helpers using simple inline HTML wrappers */}
      <Button type="button" variant="outline" size="sm" onClick={() => onInsert('<div style="text-align:left">', '</div>', '<img src="https://example.com/image.jpg" alt="" style="width:100%;max-width:600px" />')}>Image Left</Button>
      <Button type="button" variant="outline" size="sm" onClick={() => onInsert('<div style="text-align:right">', '</div>', '<img src="https://example.com/image.jpg" alt="" style="width:100%;max-width:600px" />')}>Image Right</Button>
      <Button type="button" variant="outline" size="sm" onClick={() => onInsert('<div style="text-align:center">', '</div>', '<img src="https://example.com/image.jpg" alt="" style="width:100%;max-width:600px" />')}>Image Center</Button>
    </div>
  );
}