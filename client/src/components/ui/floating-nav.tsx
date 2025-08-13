import { useEffect, useState } from "react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        let currentSection = null;
        let maxRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            currentSection = entry.target.id;
          }
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      },
      { 
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], 
        rootMargin: "-20% 0px -20% 0px" 
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="floating-nav">
      <div className="glass rounded-full p-4 space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`block w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              activeSection === item.id
                ? "bg-coral scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
            title={item.label}
          />
        ))}
      </div>
    </nav>
  );
}
