import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.15)]",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80",
        ghost: 
          "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        link: 
          "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.5)] hover:scale-[1.03] active:scale-[0.98]",
        "hero-secondary":
          "border border-border/60 bg-card/50 backdrop-blur-sm text-foreground hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_25px_hsl(var(--neon-cyan)/0.2)]",
        nav:
          "text-muted-foreground hover:text-foreground transition-colors duration-200",
        glow:
          "relative bg-card border border-primary/30 text-foreground overflow-hidden hover:border-primary/60 hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.3)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
