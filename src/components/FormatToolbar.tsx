import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Type,
  List,
  ListOrdered,
  Strikethrough
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface FormatToolbarProps {
  onFormat: (command: string, value?: string) => void;
  hasSelection: boolean;
}

export const FormatToolbar = ({
  onFormat,
  hasSelection,
}: FormatToolbarProps) => {
  const fontSizes = ['1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className={cn(
      "flex items-center gap-1 p-2 bg-toolbar rounded-lg border border-border animate-fade-in transition-opacity flex-wrap"
    )}>
      {/* Selection indicator */}
      <div className={cn(
        "px-2 py-1 rounded text-xs font-medium mr-2 transition-colors",
        hasSelection 
          ? "bg-primary/10 text-primary" 
          : "bg-muted text-muted-foreground"
      )}>
        {hasSelection ? "Text selected" : "Select text to format"}
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Font Size */}
      <Select
        defaultValue="3"
        onValueChange={(value) => onFormat('fontSize', value)}
      >
        <SelectTrigger className="w-[80px] h-8 text-sm">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {fontSizes.map((size) => (
            <SelectItem key={size} value={size}>
              Size {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Style */}
      <button
        className="toolbar-button"
        onClick={() => onFormat('bold')}
        title="Bold (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('italic')}
        title="Italic (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('underline')}
        title="Underline (Ctrl+U)"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('strikeThrough')}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Headings */}
      <button
        className="toolbar-button"
        onClick={() => onFormat('formatBlock', 'p')}
        title="Paragraph"
      >
        <Type className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('formatBlock', 'h1')}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('formatBlock', 'h2')}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('formatBlock', 'h3')}
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment */}
      <button
        className="toolbar-button"
        onClick={() => onFormat('justifyLeft')}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('justifyCenter')}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('justifyRight')}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('justifyFull')}
        title="Justify"
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists */}
      <button
        className="toolbar-button"
        onClick={() => onFormat('insertUnorderedList')}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        onClick={() => onFormat('insertOrderedList')}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
    </div>
  );
};
