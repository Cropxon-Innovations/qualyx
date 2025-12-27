import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { History, Play, Rewind, FastForward, Camera, Bug, Network } from "lucide-react";
import { useState, useEffect } from "react";

// Session Replay Demo Component
const SessionReplayDemo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalTime = 12;

  const events = [
    { time: 0, type: "navigate", target: "/login" },
    { time: 2, type: "click", target: "#email" },
    { time: 3, type: "type", target: "user@example.com" },
    { time: 5, type: "click", target: "#password" },
    { time: 6, type: "type", target: "••••••••" },
    { time: 8, type: "click", target: "Submit" },
    { time: 10, type: "network", target: "POST /api/login → 200" },
    { time: 11, type: "navigate", target: "/dashboard" },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= totalTime ? 0 : prev + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="glass-card-glow rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Session Replay</span>
        </div>
        <span className="text-xs text-muted-foreground">Test Run #1234</span>
      </div>

      <div className="grid lg:grid-cols-3 divide-x divide-border">
        {/* Video Preview */}
        <div className="lg:col-span-2 p-4">
          <div className="rounded-lg border border-border overflow-hidden bg-background aspect-video relative">
            {/* Simulated screen content */}
            <div className="absolute inset-0 p-4">
              {currentTime < 8 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-full max-w-xs space-y-3">
                    <div className="h-8 bg-muted rounded w-24 mx-auto mb-6" />
                    <div className={`h-10 rounded-lg border transition-all ${
                      currentTime >= 2 && currentTime < 5 ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                      {currentTime >= 3 && (
                        <div className="h-full flex items-center px-3 text-sm text-foreground animate-fade-in">
                          user@example.com
                        </div>
                      )}
                    </div>
                    <div className={`h-10 rounded-lg border transition-all ${
                      currentTime >= 5 && currentTime < 8 ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                      {currentTime >= 6 && (
                        <div className="h-full flex items-center px-3 text-sm text-foreground animate-fade-in">
                          ••••••••
                        </div>
                      )}
                    </div>
                    <div className={`h-10 rounded-lg transition-all ${
                      currentTime >= 8 ? "bg-primary" : "bg-primary/50"
                    }`} />
                  </div>
                </div>
              ) : (
                <div className="h-full animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-muted rounded w-32" />
                    <div className="w-8 h-8 rounded-full bg-muted" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 rounded-lg bg-muted/50" />
                    ))}
                  </div>
                  <div className="h-24 rounded-lg bg-muted/30" />
                </div>
              )}
            </div>

            {/* Cursor */}
            <div 
              className="absolute w-4 h-4 pointer-events-none transition-all duration-300"
              style={{
                left: currentTime < 5 ? "50%" : currentTime < 8 ? "50%" : "70%",
                top: currentTime < 2 ? "35%" : currentTime < 5 ? "45%" : currentTime < 8 ? "55%" : "30%",
              }}
            >
              <div className="w-4 h-4 border-2 border-primary rounded-full bg-primary/30 animate-pulse" />
            </div>
          </div>

          {/* Playback controls */}
          <div className="mt-4 flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {isPlaying ? <Play className="w-5 h-5 text-foreground" /> : <Play className="w-5 h-5 text-foreground" />}
            </button>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-100"
                style={{ width: `${(currentTime / totalTime) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {currentTime.toFixed(1)}s / {totalTime}s
            </span>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <h3 className="text-sm font-semibold text-foreground mb-3">Event Timeline</h3>
          <div className="space-y-2">
            {events.map((event, index) => (
              <div 
                key={index}
                className={`p-2 rounded-lg text-xs transition-all ${
                  currentTime >= event.time ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono">{event.time}s</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    event.type === "click" ? "bg-blue-500/20 text-blue-400" :
                    event.type === "type" ? "bg-green-500/20 text-green-400" :
                    event.type === "network" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-purple-500/20 text-purple-400"
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-foreground mt-1 truncate">{event.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SessionReplay = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Session Replay - QUALYX</title>
        <meta name="description" content="Debug test failures with full session recordings. Time-travel through every interaction, network request, and console log." />
      </Helmet>

      <DocPage
        title="Session Replay"
        description="Debug test failures with complete session recordings. Replay every interaction exactly as it happened."
        breadcrumbs={[
          { label: "Product", href: "/product/session-replay" },
          { label: "Session Replay" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX Session Replay captures every user interaction, network request, and console log during 
            test execution. When tests fail, you can replay the exact sequence of events to understand what 
            went wrong — no more guessing.
          </p>
        </DocSection>

        <DocSection title="Live Demo: Session Playback">
          <p className="text-muted-foreground mb-6">
            Experience how Session Replay lets you debug test failures with full visibility into the test execution.
          </p>
          <SessionReplayDemo />
        </DocSection>

        <DocSection title="What Gets Captured">
          <div className="grid md:grid-cols-3 gap-4 not-prose">
            <div className="glass-card p-6 rounded-xl">
              <Camera className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Visual Recording</h3>
              <p className="text-sm text-muted-foreground">
                Full video recording of the browser viewport with cursor movements and interactions.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Network className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Network Traffic</h3>
              <p className="text-sm text-muted-foreground">
                All API requests and responses with headers, body, and timing information.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Bug className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Console & Errors</h3>
              <p className="text-sm text-muted-foreground">
                JavaScript console logs, errors, and warnings synchronized with the timeline.
              </p>
            </div>
          </div>
        </DocSection>

        <DocCallout type="success" title="Reduce Debug Time by 80%">
          Teams report an 80% reduction in time spent debugging test failures after adopting Session Replay.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default SessionReplay;
