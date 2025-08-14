import { ContactInfo } from "@shared/schema";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ContactProps {
  contact: ContactInfo;
}

export default function Contact({ contact }: ContactProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  // Use flexible contact methods if available, otherwise fall back to static methods
  const contactMethods = contact.contactMethods?.length ? 
    contact.contactMethods
      .sort((a, b) => a.order - b.order)
      .map(method => ({
        icon: method.icon,
        label: method.platform,
        value: method.value,
        href: method.href,
        color: method.color
      })) :
    [
      {
        icon: "fas fa-envelope",
        label: "Email",
        value: contact.email,
        href: `mailto:${contact.email}`,
        color: "coral"
      },
      {
        icon: "fab fa-github",
        label: "GitHub",
        value: contact.github,
        href: contact.github.startsWith('http') ? contact.github : `https://${contact.github}`,
        color: "purple"
      },
      {
        icon: "fab fa-facebook",
        label: "Facebook", 
        value: contact.facebook,
        href: contact.facebook.startsWith('http') ? contact.facebook : `https://${contact.facebook}`,
        color: "cyan"
      },
      {
        icon: "fab fa-viber",
        label: "Viber",
        value: contact.viber,
        href: `viber://chat?number=${encodeURIComponent(contact.viber || '')}`,
        color: "amber"
      },
      {
        icon: "fab fa-discord",
        label: "Discord",
        value: contact.discord,
        href: contact.discord?.startsWith('http') ? contact.discord : `https://discord.com/users/${contact.discord}`,
        color: "purple"
      }
    ].filter(method => method.value);

  return (
    <section id="contact" ref={ref} className="py-16 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4 md:mb-6">Let's Work Together</h2>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto px-4">
            Ready to bring your ideas to life? Connect with me through any of these platforms.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={method.label}
                className={`relative overflow-hidden transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-${method.label.toLowerCase()}`}
                  className="glass-dark rounded-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-700 group text-center block relative overflow-hidden h-full"
                  style={{ 
                    '--hover-color': `var(--${method.color})`,
                    boxShadow: `0 0 0 0 var(--${method.color})`,
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.boxShadow = `0 20px 40px -10px var(--${method.color})`;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.boxShadow = `0 0 0 0 var(--${method.color})`;
                  }}
                >
                  {/* Background Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ 
                      background: `radial-gradient(circle at center, var(--${method.color}) 0%, transparent 70%)`
                    }}
                  ></div>
                  
                  {/* Icon with Enhanced Animations */}
                  <div className="relative mb-4 group-hover:scale-125 transition-transform duration-500">
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-hover:animate-ping"
                      style={{ backgroundColor: `var(--${method.color})` }}
                    ></div>
                    <i 
                      className={`${method.icon} text-4xl group-hover:animate-pulse relative z-10 transition-all duration-300`}
                      style={{ color: `var(--${method.color})` }}
                    ></i>
                  </div>
                  
                  {/* Content */}
                  <h3 
                    className="text-lg font-bold mb-2 group-hover:text-white transition-colors duration-300"
                    style={{ color: `var(--${method.color})` }}
                  >
                    {method.label}
                  </h3>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 break-words leading-relaxed">
                    {method.value}
                  </p>
                  
                  {/* Animated Bottom Bar */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: `var(--${method.color})` }}
                  ></div>
                  
                  {/* Corner Accent */}
                  <div 
                    className="absolute top-0 right-0 w-0 h-0 group-hover:w-8 group-hover:h-8 transition-all duration-500"
                    style={{ 
                      backgroundColor: `var(--${method.color})`,
                      clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
                    }}
                  ></div>
                </a>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}