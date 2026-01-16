import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

interface BlockEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSelectionChange: (hasSelection: boolean) => void;
}

export interface BlockEditorRef {
  applyFormat: (format: string, value?: string) => void;
  getContent: () => string;
  focus: () => void;
}

const BlockEditor = forwardRef<BlockEditorRef, BlockEditorProps>(({ 
  content, 
  onContentChange,
  onSelectionChange 
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    applyFormat: (format: string, value?: string) => {
      document.execCommand(format, false, value);
      editorRef.current?.focus();
    },
    getContent: () => editorRef.current?.innerHTML || '',
    focus: () => editorRef.current?.focus()
  }));

  // Set initial content
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content || '<p><br></p>';
      }
    }
  }, [content]);

  // Handle selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const hasSelection = selection && !selection.isCollapsed && 
        editorRef.current?.contains(selection.anchorNode);
      onSelectionChange(!!hasSelection);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [onSelectionChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onContentChange(editorRef.current.innerHTML);
      // Reset flag after a tick
      setTimeout(() => {
        isInternalChange.current = false;
      }, 0);
    }
  }, [onContentChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts for formatting
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false);
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false);
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline', false);
          break;
      }
    }
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    // Paste as plain text to avoid formatting issues
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  return (
    <div className="flex-1 bg-editor rounded-xl p-6 overflow-auto">
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={cn(
          "editor-content min-h-[600px] outline-none",
          "prose prose-sm max-w-none",
          "[&>p]:my-2 [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:my-4",
          "[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:my-3",
          "[&>h3]:text-xl [&>h3]:font-medium [&>h3]:my-2",
          "[&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
        )}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        style={{
          lineHeight: 1.6,
        }}
      />
    </div>
  );
});

BlockEditor.displayName = 'BlockEditor';

export { BlockEditor };
