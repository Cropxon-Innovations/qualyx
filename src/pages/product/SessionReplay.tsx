import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  History, 
  Play, 
  Camera, 
  Bug, 
  Network,
  Terminal,
  MousePointer,
  ArrowRight,
  Pause
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection, 
  LivePreview,
  StatCard,
  Testimonial
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Session Replay Demo Component
const SessionReplayDemo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalTime = 12;

  const events = [
    { time: 0, type: "navigate", target: "/login", icon: "🌐" },
    { time: 2, type: "click", target: "#email", icon: "👆" },
    { time: 3, type: "type", target: "user@example.com", icon: "⌨️" },
    { time: 5, type: "click", target: "#password", icon: "👆" },
    { time: 6, type: "type", target: "••••••••", icon: "⌨️" },
    { time: 8, type: "click", target: "Submit", icon: "👆" },
    { time: 10, type: "network", target: "POST /api/login → 200", icon: "📡" },
    { time: 11, type: "navigate", target: "/dashboard", icon: "🌐" },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= totalTime ? 0 : prev + 0.1));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Video Preview */}
      <div className="lg:col-span-2 space-y-3">
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
                  <div className={`h-10 rounded-lg transition-all flex items-center justify-center text-sm font-medium ${
                    currentTime >= 8 ? "bg-primary text-primary-foreground" : "bg-primary/50 text-primary-foreground/70"
                  }`}>
                    Sign In
                  </div>
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
            <MousePointer className="w-4 h-4 text-primary drop-shadow-lg" />
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors border border-border/40"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-foreground" /> : <Play className="w-4 h-4 text-foreground" />}
          </button>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-100"
              style={{ width: `${(currentTime / totalTime) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono min-w-[60px]">
            {currentTime.toFixed(1)}s / {totalTime}s
          </span>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="p-4 rounded-xl bg-muted/20 border border-border/40 max-h-[280px] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Events</span>
        </div>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div 
              key={index}
              className={`p-2 rounded-lg text-xs transition-all ${
                currentTime >= event.time ? "bg-primary/10 border border-primary/20" : "bg-muted/30 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-mono">{event.time}s</span>
                <span>{event.icon}</span>
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
  );
};

const SessionReplay = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Session Replay - QUALYX</title>
        <meta name="description" content="Debug test failures with full session recordings. Time-travel through every interaction, network request, and console log." />
      </Helmet>

      <FeatureHero
        badge="Debug Faster"
        subtitle="Product"
        title="Session Replay"
        description="Debug test failures with complete session recordings. Replay every interaction exactly as it happened — no more guessing what went wrong."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Session Replay — Time Travel Debugging">
          <SessionReplayDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="80%" label="Faster Debugging" trend="Reported" />
          <StatCard value="100%" label="Event Capture" />
          <StatCard value="30 days" label="Retention" />
          <StatCard value="<1MB" label="Per Minute" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="What Gets Captured"
        description="Complete visibility into every test execution"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Camera}
            title="Visual Recording"
            description="Full video recording of the browser viewport with cursor movements, clicks, and scrolls."
          />
          <FeatureCard
            icon={Network}
            title="Network Traffic"
            description="All API requests and responses with headers, body, timing, and status codes."
          />
          <FeatureCard
            icon={Terminal}
            title="Console Logs"
            description="JavaScript console logs, errors, and warnings synchronized with the timeline."
          />
          <FeatureCard
            icon={Bug}
            title="Error Snapshots"
            description="Automatic snapshots when errors occur, capturing the exact state at failure."
          />
          <FeatureCard
            icon={MousePointer}
            title="User Interactions"
            description="Every click, type, scroll, and hover event captured with precise timing."
          />
          <FeatureCard
            icon={History}
            title="State Timeline"
            description="Application state changes over time, making it easy to find the root cause."
          />
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="Zero-config session recording"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Automatic Capture",
              description: "Session recording starts automatically when tests run. No additional setup required."
            },
            {
              step: "02",
              title: "Smart Compression",
              description: "Recordings are compressed and stored efficiently. Only meaningful events are captured."
            },
            {
              step: "03",
              title: "Instant Playback",
              description: "Jump to any point in the timeline. See exactly what happened at the moment of failure."
            }
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
                <span className="text-2xl font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="Session Replay changed how we debug tests. What used to take hours of investigation now takes minutes. We can see exactly what happened."
            author="Emily Rodriguez"
            role="QA Director"
            company="DataSync"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Stop guessing. Start seeing.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Debug test failures in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default SessionReplay;
