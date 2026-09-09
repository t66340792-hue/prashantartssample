import { useState, useEffect } from "react";
import { navSections } from "@/config/wedding";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of [...navSections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Floating Navigation */}
      <nav 
        className={`fixed z-40 right-6 top-1/2 -translate-y-1/2 flex-col gap-4 items-end transition-all duration-300 md:flex
          ${isOpen ? "flex top-24 translate-y-0 right-6 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10" : "hidden md:flex"}
        `}
      >
        {navSections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 transition-all"
            aria-label={`Scroll to ${section.label}`}
          >
            <span 
              className={`text-sm tracking-widest font-medium uppercase transition-all duration-300
                ${activeSection === section.id ? "text-white opacity-100 translate-x-0" : "text-white/60 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 md:opacity-0 md:translate-x-4"}
                ${isOpen ? "opacity-100 translate-x-0" : ""}
              `}
            >
              {section.label}
            </span>
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${activeSection === section.id ? "bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/40 group-hover:bg-white/80 group-hover:scale-125"}
              `}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
