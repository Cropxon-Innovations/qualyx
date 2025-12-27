export const QaAsServiceSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 grid-bg-subtle opacity-40" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <div className="glass-card-glow p-12 md:p-16 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">QA-as-a-Service</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-foreground/90 font-medium leading-relaxed mb-4">
            "QUALYX operates like a dedicated QA team — without the hiring overhead."
          </p>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Focus on building. Let QUALYX handle the testing. Our autonomous platform continuously monitors, 
            tests, and validates your application — so you can ship with confidence.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: "10x", label: "Faster testing" },
              { value: "99%", label: "Test coverage" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
