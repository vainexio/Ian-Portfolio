import { useState } from 'react';

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({ className = "" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-folder-open' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <div className={`md:hidden ${className}`}>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-6 right-6 z-50 glass-dark rounded-2xl p-3 text-white hover:text-coral transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="fixed top-20 right-6 glass-dark rounded-2xl p-6 min-w-48" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <i className={`${item.icon} text-coral mr-3 group-hover:animate-pulse`}></i>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}