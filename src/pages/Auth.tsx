import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  Loader2, 
  Shield, 
  Zap, 
  Bot, 
  Play, 
  CheckCircle2,
  Sparkles,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { QualyxLogo } from "@/components/QualyxLogo";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  role: z.string().max(100).optional(),
  teamSize: z.string().max(50).optional(),
  notes: z.string().max(1000).optional(),
});

const steps = [
  {
    icon: Bot,
    title: "AI-Powered Discovery",
    description: "Our AI automatically discovers your application flows and suggests test scenarios",
  },
  {
    icon: Play,
    title: "Record & Create",
    description: "Simply interact with your app — we capture everything and generate tests",
  },
  {
    icon: Zap,
    title: "Self-Healing Execution",
    description: "Tests adapt automatically when your UI changes, zero maintenance required",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with on-premise options and complete data isolation",
  },
];

const features = [
  "No-code test creation",
  "Self-healing automation",
  "Session replay debugging",
  "Hybrid cloud execution",
  "CI/CD integration",
  "SOC 2 certified",
];

export default function Auth() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
      teamSize: formData.get("teamSize") as string,
      notes: formData.get("notes") as string,
    };

    const result = waitlistSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "You're on the waitlist!",
      description: "We'll reach out when your spot is ready.",
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Join Beta Waitlist | QUALYX</title>
        <meta name="description" content="Join the QUALYX beta waitlist and be among the first to experience autonomous AI-powered QA testing." />
      </Helmet>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel - Animated Info */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 grid-bg-subtle opacity-30" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%',
                  opacity: 0.2
                }}
                animate={{ 
                  y: [null, Math.random() * -200 - 100],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{ 
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <QualyxLogo className="h-10 w-auto" />
            </Link>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl xl:text-5xl font-bold mb-4">
                  <span className="gradient-text">Autonomous QA</span>
                  <br />
                  <span className="text-foreground">for Modern Teams</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  QUALYX is the next-generation QA platform that uses AI to discover, create, and maintain your tests automatically.
                </p>
              </motion.div>

              {/* Animated Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 gap-3"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Waitlist Form */}
        <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
          {/* Mobile Header */}
          <div className="lg:hidden p-4 flex items-center justify-between border-b border-border/50">
            <Link to="/" className="flex items-center gap-2">
              <QualyxLogo className="h-8 w-auto" />
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-background">
            <div className="w-full max-w-md">
              {/* Login Disabled Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 rounded-xl bg-muted/50 border border-border/50 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Login Coming Soon</p>
                  <p className="text-xs text-muted-foreground">Join the waitlist for beta access</p>
                </div>
              </motion.div>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Beta Release</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Join the Waitlist
                </h2>
                <p className="text-muted-foreground">
                  Be among the first to experience autonomous QA
                </p>
              </motion.div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-6 rounded-2xl bg-card/60 border border-border/50"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">You're on the list!</h3>
                  <p className="text-muted-foreground mb-6">
                    We'll reach out when your spot is ready. In the meantime, explore what QUALYX can do.
                  </p>
                  <Link to="/">
                    <Button variant="outline" className="gap-2">
                      Explore Features
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        className="bg-card/60 border-border/50 focus:border-primary/50"
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company *
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company"
                        className="bg-card/60 border-border/50 focus:border-primary/50"
                      />
                      {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Work Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className="bg-card/60 border-border/50 focus:border-primary/50"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                        Your Role
                      </label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="e.g., QA Lead, Developer"
                        className="bg-card/60 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium text-foreground mb-2">
                        Team Size
                      </label>
                      <Input
                        id="teamSize"
                        name="teamSize"
                        placeholder="e.g., 10-50"
                        className="bg-card/60 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                      What testing challenges do you face?
                    </label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Tell us about your current QA process..."
                      rows={3}
                      className="bg-card/60 border-border/50 focus:border-primary/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Beta Waitlist
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By joining, you agree to our{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    {" "}and{" "}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  </p>
                </motion.form>
              )}

              {/* Mobile Features */}
              <div className="lg:hidden mt-8 pt-8 border-t border-border/50">
                <p className="text-sm font-medium text-foreground mb-4">What you'll get:</p>
                <div className="grid grid-cols-2 gap-3">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
