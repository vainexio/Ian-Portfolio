import { Skill } from "@shared/schema";
import SkillChart from "@/components/ui/skill-chart";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h2 className="text-5xl font-bold gradient-text mb-6">Technical Skills</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.slice(0, 12).map((skill, index) => (
            <div 
              key={skill.name}
              className={`glass-dark rounded-2xl p-6 hover:scale-110 hover:shadow-2xl hover:shadow-coral/30 transition-all duration-700 group cursor-pointer transform hover:rotate-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className="mb-4 group-hover:scale-125 transition-transform duration-500">
                  <i 
                    className={`${skill.icon || 'fas fa-code'} text-4xl group-hover:animate-pulse`} 
                    style={{ color: skill.color }}
                  ></i>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-coral transition-colors duration-300 mb-2">
                  {skill.name}
                </h3>
                <div className="h-1 w-full bg-gradient-to-r from-coral via-purple to-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
