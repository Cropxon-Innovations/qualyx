import { useEffect, useRef } from "react";
import { X, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

// Default video URL from Supabase storage
const DEFAULT_VIDEO_URL = "https://dkksytupaserkyxyxklw.supabase.co/storage/v1/object/public/qualyx/QUALYX__Quality_Engineering.mp4";

export const VideoModal = ({ isOpen, onClose, videoUrl = DEFAULT_VIDEO_URL }: VideoModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser
      });
    }
  }, [isOpen, videoUrl]);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-background/95 backdrop-blur-md" />
      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-card/95 border-border/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">QUALYX Product Demo</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Video container */}
        <div className="relative aspect-video bg-background">
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-contain bg-background"
            controls
            autoPlay
            playsInline
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
