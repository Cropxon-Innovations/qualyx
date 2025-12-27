import { useState } from "react";
import { X, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
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
          {/* Placeholder for video - replace with actual video embed */}
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
          
          {/* When you have a real video, replace the above with:
          <iframe 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          */}
        </div>
      </DialogContent>
    </Dialog>
  );
};