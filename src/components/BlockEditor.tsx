import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

interface BlockEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSelectionChange: (hasSelection: boolean) => void;
}

export interface BlockEditorRef {
  applyFormat: (command: string, value?: string) => void;
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
    applyFormat: (command: string, value?: string) => {
      // Handle formatBlock specially for proper tag wrapping
      if (command === 'formatBlock') {
        document.execCommand(command, false, `<${value}>`);
      } else {
        document.execCommand(command, false, value);
      }
      editorRef.current?.focus();
      // Trigger content change after formatting
      if (editorRef.current) {
        isInternalChange.current = true;
        onContentChange(editorRef.current.innerHTML);
        setTimeout(() => {
          isInternalChange.current = false;
        }, 0);
      }
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
      setTimeout(() => {
        isInternalChange.current = false;
      }, 0);
    }
  }, [onContentChange]);

  // Check if cursor is in a list item
  const getListContext = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    
    let node: Node | null = selection.anchorNode;
    let listItem: HTMLLIElement | null = null;
    let list: HTMLUListElement | HTMLOListElement | null = null;
    
    while (node && node !== editorRef.current) {
      if (node.nodeName === 'LI') {
        listItem = node as HTMLLIElement;
      }
      if (node.nodeName === 'UL' || node.nodeName === 'OL') {
        list = node as HTMLUListElement | HTMLOListElement;
        break;
      }
      node = node.parentNode;
    }
    
    return { listItem, list };
  }, []);

  // Check if list item is empty
  const isListItemEmpty = useCallback((li: HTMLLIElement) => {
    const text = li.textContent || '';
    return text.trim() === '' || text === '\u200B'; // Check for zero-width space too
  }, []);

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
      return;
    }

    const listContext = getListContext();

    // Handle Tab for list indentation
    if (e.key === 'Tab' && listContext?.listItem) {
      e.preventDefault();
      if (e.shiftKey) {
        // Outdent
        document.execCommand('outdent', false);
      } else {
        // Indent
        document.execCommand('indent', false);
      }
      return;
    }

    // Handle Enter in lists
    if (e.key === 'Enter' && !e.shiftKey && listContext?.listItem && listContext?.list) {
      const { listItem, list } = listContext;
      
      // If the list item is empty, exit the list
      if (isListItemEmpty(listItem)) {
        e.preventDefault();
        
        // Remove the empty list item
        listItem.remove();
        
        // If list is now empty, remove it too
        if (list.children.length === 0) {
          list.remove();
        }
        
        // Insert a new paragraph after the list
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        
        if (list.parentNode) {
          if (list.nextSibling) {
            list.parentNode.insertBefore(p, list.nextSibling);
          } else {
            list.parentNode.appendChild(p);
          }
        } else if (editorRef.current) {
          editorRef.current.appendChild(p);
        }
        
        // Move cursor to the new paragraph
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(p, 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
        
        // Trigger content change
        if (editorRef.current) {
          isInternalChange.current = true;
          onContentChange(editorRef.current.innerHTML);
          setTimeout(() => {
            isInternalChange.current = false;
          }, 0);
        }
        return;
      }
      // If not empty, let the browser handle creating a new list item naturally
    }

    // Handle Backspace at the start of a list item
    if (e.key === 'Backspace' && listContext?.listItem) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        // Check if cursor is at the very start of the list item
        if (range.startOffset === 0 && range.collapsed) {
          const { listItem, list } = listContext;
          
          // Check if this is the first list item
          const isFirstItem = listItem === list?.firstElementChild;
          
          if (isFirstItem && isListItemEmpty(listItem)) {
            e.preventDefault();
            
            // Convert to paragraph
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            
            if (list && list.parentNode) {
              list.parentNode.insertBefore(p, list);
              listItem.remove();
              
              // If list is now empty, remove it
              if (list.children.length === 0) {
                list.remove();
              }
            }
            
            // Move cursor to the paragraph
            const newRange = document.createRange();
            newRange.setStart(p, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            
            // Trigger content change
            if (editorRef.current) {
              isInternalChange.current = true;
              onContentChange(editorRef.current.innerHTML);
              setTimeout(() => {
                isInternalChange.current = false;
              }, 0);
            }
            return;
          }
        }
      }
    }
  }, [getListContext, isListItemEmpty, onContentChange]);

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
          "[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:my-2",
          "[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:my-2",
          "[&_ul]:list-disc [&_ul]:ml-6",
          "[&_ol]:list-decimal [&_ol]:ml-6",
          "[&_li]:my-1"
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
