import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  content: string;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  ({ content }, ref) => {
    const hasContent = content.replace(/<[^>]*>/g, '').trim().length > 0;

    return (
      <div className="flex-1 bg-preview rounded-xl p-6 overflow-auto flex justify-center">
        <div 
          ref={ref}
          className="preview-page animate-fade-in"
        >
          <div 
            className={cn(
              "h-full prose prose-sm max-w-none",
              "[&>p]:my-2 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:my-4",
              "[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:my-3",
              "[&>h3]:text-xl [&>h3]:font-medium [&>h3]:my-2",
              "[&>ul]:list-disc [&>ul]:ml-6 [&>ol]:list-decimal [&>ol]:ml-6"
            )}
            style={{ fontSize: '12px' }}
          >
            {hasContent ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p className="text-muted-foreground italic">
                Your preview will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PreviewPanel.displayName = 'PreviewPanel';
