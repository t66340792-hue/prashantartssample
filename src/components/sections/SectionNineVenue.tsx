import { weddingData } from "@/config/wedding";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SectionNineVenue() {
  const revealRef = useScrollReveal();

  return (
    <section id="venue" className="relative w-full py-32 bg-softwhite overflow-hidden text-center">
      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10" />

      <div ref={revealRef as any} className="reveal max-w-3xl mx-auto px-6 relative z-10">
        
        <h2 className="font-script text-5xl md:text-7xl text-gold mb-8">Venue</h2>
        
        <div className="panel-cream p-10 md:p-16 rounded-[2rem] border-2 border-gold/30 shadow-gold relative overflow-hidden">
          
          {/* Architectural arch shape hint */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 border-t-2 border-gold/20 rounded-full -mt-24 pointer-events-none" />

          <h3 className="font-display text-3xl md:text-5xl text-plum mb-4 uppercase tracking-[0.1em]">
            {weddingData.venue}
          </h3>
          
          <div className="gold-rule w-24 mx-auto mb-6" />
          
          <p className="font-body text-ink/80 tracking-widest uppercase mb-12 max-w-sm mx-auto leading-relaxed">
            {weddingData.location}
          </p>

          <a 
            href={weddingData.mapUrl || "#"}
            target={weddingData.mapUrl ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-block border border-gold text-gold font-body uppercase tracking-[0.2em] text-sm px-8 py-4 rounded-full hover:bg-gold hover:text-white transition-all duration-300"
          >
            View Location
          </a>
        </div>
      </div>
    </section>
  );
}
