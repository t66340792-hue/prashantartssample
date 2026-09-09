import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function SectionRSVP() {
  const revealRef = useScrollReveal();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="rsvp" className="relative w-full py-24 md:py-32 bg-ivory flex items-center justify-center px-4 overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold opacity-5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rani opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={revealRef as any} className="reveal relative w-full max-w-3xl mx-auto z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-plum tracking-widest uppercase mb-4">RSVP</h2>
          <div className="gold-rule w-24 mx-auto mb-6" />
          <p className="font-script text-3xl md:text-4xl text-gold mb-2">Join us in our celebration</p>
          <p className="font-body text-ink/70 tracking-widest uppercase text-sm">Please let us know if you can make it</p>
        </div>

        {status === "success" ? (
          <div className="panel-cream p-12 text-center rounded-2xl border border-gold/30 shadow-2xl animate-fade-in">
            <h3 className="font-script text-4xl text-plum mb-4">Thank You!</h3>
            <p className="font-body text-ink/80 text-lg">Your response has been received. We can't wait to see you!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="panel-cream p-8 md:p-12 rounded-2xl border border-gold/30 shadow-2xl flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-body text-sm uppercase tracking-widest text-plum">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full bg-transparent border-b border-gold/50 py-2 font-body text-ink focus:outline-none focus:border-plum transition-colors placeholder:text-ink/30"
                  placeholder="E.g. Rahul Sharma"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="guests" className="font-body text-sm uppercase tracking-widest text-plum">Number of Guests</label>
                <select 
                  id="guests" 
                  className="w-full bg-transparent border-b border-gold/50 py-2 font-body text-ink focus:outline-none focus:border-plum transition-colors"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4+ People</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <label className="font-body text-sm uppercase tracking-widest text-plum">Will you attend?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="attending" value="yes" defaultChecked className="accent-plum w-4 h-4" />
                  <span className="font-body text-ink group-hover:text-plum transition-colors">Joyfully Accept</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="attending" value="no" className="accent-plum w-4 h-4" />
                  <span className="font-body text-ink group-hover:text-plum transition-colors">Regretfully Decline</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="message" className="font-body text-sm uppercase tracking-widest text-plum">Message for the Couple (Optional)</label>
              <textarea 
                id="message" 
                rows={3}
                className="w-full bg-transparent border-b border-gold/50 py-2 font-body text-ink focus:outline-none focus:border-plum transition-colors resize-none placeholder:text-ink/30"
                placeholder="Leave a wish or let us know about any dietary requirements..."
              />
            </div>

            <div className="mt-8 text-center">
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="bg-plum text-ivory px-12 py-4 rounded-full font-display tracking-widest uppercase hover:bg-gold hover:text-plum transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-gold/20"
              >
                {status === "submitting" ? "Sending..." : "Send RSVP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
