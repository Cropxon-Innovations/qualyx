import infographicImage from "@/assets/qualyx-infographic.png";

export const InfographicSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg-subtle opacity-5" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/8 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
            <span className="gradient-text-white">The Future of Quality Assurance</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl mx-auto">
            See how QUALYX transforms traditional QA into autonomous, AI-driven testing
          </p>
        </div>

        {/* Infographic Image */}
        <div className="relative glass-card-glow rounded-xl md:rounded-2xl overflow-hidden">
          <div className="relative">
            <img 
              src={infographicImage} 
              alt="QUALYX Autonomous Quality-as-a-Service - AI-powered platform replacing traditional QA with on-demand testing"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
