import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  productType: z.string().max(100).optional(),
  appUrl: z.string().url("Invalid URL").max(500).optional().or(z.literal("")),
  notes: z.string().max(1000).optional(),
});

export const WaitlistSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      productType: formData.get("productType") as string,
      appUrl: formData.get("appUrl") as string,
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
      title: "You're on the list",
      description: "We'll reach out when your spot is ready.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="waitlist" className="py-28 md:py-36 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(220,15%,4%)]" />
      <div className="absolute inset-0 grid-bg-subtle opacity-10" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[hsl(217,91%,60%,0.05)] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[hsl(190,100%,50%,0.04)] rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">Join the Waitlist</span>
          </h2>
          <p className="text-base text-muted-foreground/70">
            Be among the first to experience autonomous QA
          </p>
        </div>

        {/* Form Card with animated glow border */}
        <div className="relative">
          {/* Animated glow border */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-secondary/40 via-transparent to-primary/40 opacity-60" />
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-secondary/20 via-transparent to-primary/20 blur-sm" />
          
          <div className="relative p-8 md:p-10 rounded-2xl bg-card/60 backdrop-blur-lg border border-border/30">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    className="bg-background/40 border-border/50 focus:border-secondary/50 text-sm"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your company"
                    className="bg-background/40 border-border/50 focus:border-secondary/50 text-sm"
                  />
                  {errors.company && <p className="text-xs text-destructive mt-1">{errors.company}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Work Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="bg-background/40 border-border/50 focus:border-secondary/50 text-sm"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="productType" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Product Type
                </label>
                <Input
                  id="productType"
                  name="productType"
                  placeholder="e.g., SaaS, Mobile App, E-commerce"
                  className="bg-background/40 border-border/50 focus:border-secondary/50 text-sm"
                />
              </div>

              <div>
                <label htmlFor="appUrl" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  App URL <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <Input
                  id="appUrl"
                  name="appUrl"
                  type="url"
                  placeholder="https://staging.yourapp.com"
                  className="bg-background/40 border-border/50 focus:border-secondary/50 text-sm"
                />
                {errors.appUrl && <p className="text-xs text-destructive mt-1">{errors.appUrl}</p>}
              </div>

              <div>
                <label htmlFor="notes" className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Notes <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Tell us about your testing challenges..."
                  rows={3}
                  className="bg-background/40 border-border/50 focus:border-secondary/50 text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full group mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
};
