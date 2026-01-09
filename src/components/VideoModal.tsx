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

export const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
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
      <DialogOverlay className="bg-background/90 backdrop-blur-md" />
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-card/95 border-border/50 overflow-hidden">
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
        <div className="relative aspect-video bg-background/50">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            /* Placeholder when no video is uploaded yet */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-secondary ml-1" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-foreground mb-1">Product Walkthrough</p>
                <p className="text-sm text-muted-foreground">See QUALYX in action</p>
              </div>
              
              {/* Demo content preview */}
              <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                  <p className="text-xs font-medium text-foreground">Record</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Capture user flows</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                  <p className="text-xs font-medium text-foreground">Generate</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">AI creates tests</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
                  <p className="text-xs font-medium text-foreground">Execute</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Run anywhere</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground/50 mt-4">
                Video coming soon — join the waitlist for early access
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};