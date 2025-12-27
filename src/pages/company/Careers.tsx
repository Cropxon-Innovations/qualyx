import { Helmet } from "react-helmet";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight,
  Users,
  Heart,
  Zap,
  Globe,
  Coffee,
  GraduationCap,
  Laptop,
  Plane
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection, 
  StatCard
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const openings = [
  {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build the core infrastructure powering millions of test executions."
  },
  {
    title: "ML Engineer - Test Generation",
    department: "AI",
    location: "Remote",
    type: "Full-time",
    description: "Train models that automatically generate and maintain tests."
  },
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful, intuitive experiences for QA teams worldwide."
  },
  {
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
    description: "Help developers discover and master QUALYX through content and community."
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design the future of autonomous testing interfaces."
  },
  {
    title: "Solutions Engineer",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description: "Help enterprise customers integrate QUALYX into their workflows."
  },
];

const benefits = [
  { icon: Laptop, title: "Remote First", description: "Work from anywhere in the world" },
  { icon: Heart, title: "Health Coverage", description: "Full medical, dental, and vision" },
  { icon: Plane, title: "Unlimited PTO", description: "Take the time you need to recharge" },
  { icon: Coffee, title: "Home Office", description: "$2,000 setup budget" },
  { icon: GraduationCap, title: "Learning Budget", description: "$1,500/year for growth" },
  { icon: Zap, title: "Equity", description: "Own a piece of what you build" },
];

// Team Culture Preview
const TeamCultureDemo = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Our Team</span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
          Hiring
        </span>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl border border-border/40 bg-card/30 text-center">
          <div className="text-2xl font-bold text-foreground">25+</div>
          <div className="text-xs text-muted-foreground">Team Members</div>
        </div>
        <div className="p-4 rounded-xl border border-border/40 bg-card/30 text-center">
          <div className="text-2xl font-bold text-foreground">12</div>
          <div className="text-xs text-muted-foreground">Countries</div>
        </div>
      </div>

      {/* Values */}
      <div className="p-4 rounded-xl border border-border/40 bg-muted/20">
        <div className="text-xs text-muted-foreground mb-3">Our Values</div>
        <div className="space-y-2">
          {["Ship Fast, Learn Faster", "Customer Obsessed", "Radically Transparent"].map((value) => (
            <div key={value} className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {value}
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="flex flex-wrap gap-2">
        {["🇺🇸 USA", "🇬🇧 UK", "🇩🇪 Germany", "🇮🇳 India", "🇦🇺 Australia"].map((loc) => (
          <span key={loc} className="text-xs px-2 py-1 rounded-full bg-muted/30 text-muted-foreground">
            {loc}
          </span>
        ))}
      </div>
    </div>
  );
};

const Careers = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Careers - QUALYX</title>
        <meta name="description" content="Join the QUALYX team. We are hiring engineers, designers, and more to build the future of QA." />
      </Helmet>

      <FeatureHero
        badge="We're Hiring"
        subtitle="Company"
        title="Build the Future of QA"
        description="Join a small, fast-moving team solving hard problems at the intersection of AI and developer tools. If you're passionate about building great products, we'd love to hear from you."
        primaryCta={{ label: "View Open Roles", href: "#openings" }}
        secondaryCta={{ label: "About Us", href: "/company/about" }}
      >
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-warning/70" />
              <div className="w-3 h-3 rounded-full bg-success/70" />
            </div>
            <div className="flex-1 mx-4 h-6 rounded-lg bg-muted/30 flex items-center px-3">
              <span className="text-xs text-muted-foreground font-mono">QUALYX Team</span>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <TeamCultureDemo />
          </div>
        </div>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="25+" label="Team Members" />
          <StatCard value="12" label="Countries" />
          <StatCard value="100%" label="Remote" />
          <StatCard value="$10M" label="Funding" />
        </div>
      </section>

      {/* Benefits */}
      <FeatureSection
        title="Why Join QUALYX?"
        description="We take care of our team so they can do their best work"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </FeatureSection>

      {/* Open Positions */}
      <FeatureSection
        title="Open Positions"
        description="Find your next role"
        className="bg-muted/10"
      >
        <div id="openings" className="space-y-4">
          {openings.map((job) => (
            <div 
              key={job.title} 
              className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="group-hover:border-primary group-hover:text-primary">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Culture Section */}
      <FeatureSection
        title="Our Culture"
        description="What it's like to work at QUALYX"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Ship Fast, Learn Faster",
              description: "We believe in rapid iteration. Launch quickly, gather feedback, and improve constantly. Perfection is the enemy of progress."
            },
            {
              title: "Customer Obsessed",
              description: "Every decision starts with the customer. We talk to users daily and let their needs guide our roadmap."
            },
            {
              title: "Radically Transparent",
              description: "Information flows freely. Everyone has context to make great decisions. No politics, no silos."
            }
          ].map((value) => (
            <div key={value.title} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Don't see a perfect fit?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional people. Send us your resume and tell us what you'd like to build.
          </p>
          <Link to="/company/contact">
            <Button variant="hero" size="lg" className="group">
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Careers;
