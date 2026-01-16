import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from './FileUpload';

interface HeaderProps {
  onFileLoad: (content: string) => void;
  onExport: () => void;
  hasContent: boolean;
}

export const Header = ({ onFileLoad, onExport, hasContent }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#274364] border-b border-border">
      <div className="flex items-center gap-3">
        <img 
          src="/logo.svg" 
          alt="Font and Format Logo" 
          className="w-10 h-10 rounded-lg"
        />
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            Font and Format
          </h1>
          <p className="text-sm text-white/70">
            Professional Document Editor
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FileUpload onFileLoad={onFileLoad} />
        <Button 
          onClick={onExport}
          disabled={!hasContent}
          className="gap-2 bg-[#3FBCBA] hover:bg-[#35a5a3] text-white"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>
    </header>
  );
};
