import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

const openings = [
  {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "ML Engineer - Test Generation",
    department: "AI",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
  },
];

const Careers = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Careers - QUALYX</title>
        <meta name="description" content="Join the QUALYX team. We are hiring engineers, designers, and more to build the future of QA." />
      </Helmet>

      <DocPage
        title="Careers"
        description="Join us in building the future of autonomous quality assurance."
        breadcrumbs={[
          { label: "Company", href: "/company/careers" },
          { label: "Careers" },
        ]}
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are a small, fast-moving team solving hard problems at the intersection of AI and 
            developer tools. If you are passionate about building great products, we would love to hear from you.
          </p>
        </DocSection>

        <DocCallout type="info" title="Remote First">
          We are a fully remote team. Work from anywhere in the world.
        </DocCallout>

        <DocSection title="Open Positions">
          <div className="space-y-4 not-prose">
            {openings.map((job) => (
              <div key={job.title} className="glass-card p-6 rounded-xl hover:border-primary/30 transition-all cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection title="Benefits">
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            {[
              "Competitive salary & equity",
              "Unlimited PTO",
              "Remote-first culture",
              "Health insurance",
              "Learning budget",
              "Home office setup",
            ].map((benefit) => (
              <div key={benefit} className="p-4 rounded-xl border border-border bg-card/30">
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default Careers;
