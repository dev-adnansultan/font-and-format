import { forwardRef } from 'react';

interface PreviewPanelProps {
  content: string;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  ({ content }, ref) => {
    const hasContent = content.replace(/<[^>]*>/g, '').trim().length > 0 || 
                       content.includes('<img');

    return (
      <div className="flex-1 bg-preview rounded-xl p-6 overflow-auto flex justify-center">
        <div 
          ref={ref}
          className="preview-page animate-fade-in"
        >
          {hasContent ? (
            <div 
              className="preview-content h-full"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          ) : (
            <p className="text-muted-foreground italic">
              Your preview will appear here...
            </p>
          )}
        </div>
      </div>
    );
  }
);

PreviewPanel.displayName = 'PreviewPanel';
