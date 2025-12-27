import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "QUALYX reduced our regression testing time from days to hours. The self-healing selectors alone saved us countless maintenance hours.",
    author: "Engineering Lead",
    company: "Enterprise SaaS Company",
    avatar: "EL",
  },
  {
    quote: "Finally, a QA platform that understands enterprise security requirements. The hybrid execution model was exactly what we needed.",
    author: "VP of Engineering",
    company: "FinTech Startup",
    avatar: "VP",
  },
  {
    quote: "The session replay feature transformed how we debug test failures. It's like having a time machine for our test runs.",
    author: "QA Manager",
    company: "Healthcare Technology",
    avatar: "QM",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-white">What Teams Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by forward-thinking engineering teams
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="glass-card p-8 rounded-2xl relative group hover:border-primary/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              
              {/* Quote text */}
              <blockquote className="text-foreground/90 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
