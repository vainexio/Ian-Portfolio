import { useEffect, useState } from "react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100; // Simple offset from top
      let currentSection = "hero"; // default

      // Check all elements with IDs (including subsections)
      const allElements = document.querySelectorAll("[id]");
      const validSections = ["hero", "about", "experience", "achievements", "skills", "projects", "contact"];
      
      allElements.forEach((element) => {
        if (validSections.includes(element.id)) {
          const elementTop = (element as HTMLElement).offsetTop;
          const elementHeight = (element as HTMLElement).offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
            currentSection = element.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Update on scroll
    window.addEventListener("scroll", updateActiveSection);
    
    // Update immediately
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { id: "hero", label: "Home", icon: "fas fa-home", color: "from-coral to-orange-500" },
    { id: "about", label: "About", icon: "fas fa-user", color: "from-purple to-pink-500" },
    { id: "experience", label: "Experience", icon: "fas fa-briefcase", color: "from-blue-500 to-indigo-500" },
    { id: "achievements", label: "Achievements", icon: "fas fa-trophy", color: "from-yellow-500 to-amber-500" },
    { id: "skills", label: "Skills", icon: "fas fa-code", color: "from-cyan to-blue-500" },
    { id: "projects", label: "Projects", icon: "fas fa-folder-open", color: "from-amber to-yellow-500" },
    { id: "contact", label: "Contact", icon: "fas fa-envelope", color: "from-green-400 to-emerald-500" },
  ];

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-coral/20 via-purple/20 to-cyan/20 blur-xl rounded-full opacity-60"></div>
        
        {/* Main navigation container */}
        <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
          <div className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;
              
              return (
                <div key={item.id} className="relative group">
                  {/* Active section indicator */}
                  <div className={`absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.color} rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`} />
                  
                  {/* Tooltip */}
                  <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 whitespace-nowrap text-sm font-medium text-white transition-all duration-200 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                  }`}>
                    {item.label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-l-black/80 border-t-transparent border-b-transparent"></div>
                  </div>
                  
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group overflow-hidden"
                  >
                    {/* Background gradient for active/hover states */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : isHovered ? 'opacity-70 scale-95' : 'scale-90'
                    }`} />
                    
                    {/* Default background */}
                    <div className={`absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 ${
                      isActive || isHovered ? 'opacity-0' : 'opacity-100'
                    }`} />
                    
                    {/* Icon */}
                    <i className={`${item.icon} text-lg relative z-10 transition-all duration-300 ${
                      isActive ? 'text-white scale-110' : isHovered ? 'text-white scale-105' : 'text-white/70'
                    }`} />
                    
                    {/* Ripple effect - removed blinking animation */}
                    <div className={`absolute inset-0 bg-white/20 rounded-xl transition-all duration-300 ${
                      isActive ? 'scale-110 opacity-30' : 'scale-0 opacity-0'
                    }`} />
                  </button>
                  
                  {/* Progress indicator */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                    <div className={`w-1 h-1 bg-gradient-to-r ${item.color} rounded-full transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-150' : 'opacity-0 scale-0'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Navigation line connecting dots */}
          <div className="absolute left-1/2 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />
        </div>
      </div>
    </nav>
  );
}
