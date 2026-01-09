export const QaAsServiceSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 grid-bg-subtle opacity-40" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <div className="glass-card-glow p-8 md:p-10 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">QA-as-a-Service</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-foreground/90 font-medium leading-relaxed mb-3">
            "QUALYX operates like a dedicated QA team — without the hiring overhead."
          </p>
          
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Focus on building. Let QUALYX handle the testing. Our autonomous platform continuously monitors, 
            tests, and validates your application — so you can ship with confidence.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
            {[
              { value: "10x", label: "Faster testing" },
              { value: "99%", label: "Test coverage" },
              { value: "24/7", label: "Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
