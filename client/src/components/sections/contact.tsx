import { ContactInfo } from "@shared/schema";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ContactProps {
  contact: ContactInfo;
}

export default function Contact({ contact }: ContactProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const contactMethods = [
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
      href: `https://${contact.github}`,
      color: "purple"
    },
    {
      icon: "fab fa-facebook",
      label: "Facebook", 
      value: contact.facebook,
      href: `https://${contact.facebook}`,
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
      href: `https://${contact.discord}`,
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
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-dark rounded-xl md:rounded-2xl p-6 md:p-8 hover:scale-105 hover:shadow-2xl hover:shadow-${method.color}/30 transition-all duration-700 group text-center ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 md:mb-6 group-hover:scale-125 transition-transform duration-500">
                  <i 
                    className={`${method.icon} text-3xl md:text-5xl group-hover:animate-pulse`}
                    style={{ color: `var(--${method.color})` }}
                  ></i>
                </div>
                <h3 className={`text-lg md:text-xl font-bold text-${method.color} mb-2 group-hover:text-white transition-colors duration-300`}>
                  {method.label}
                </h3>
                <p className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300 break-all">
                  {method.value}
                </p>
                <div className={`h-1 w-full bg-${method.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-3 md:mt-4`}></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}