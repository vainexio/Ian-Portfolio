import { Skill } from "@shared/schema";

interface SkillChartProps {
  skill: Skill;
}

export default function SkillChart({ skill }: SkillChartProps) {
  const percentage = (skill.level / 100) * 360;
  
  return (
    <div className="glass rounded-3xl p-8 text-center scroll-fade">
      <div 
        className="relative w-28 h-28 mx-auto mb-4 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, ${skill.color} 0deg, ${skill.color} ${percentage}deg, rgba(255,255,255,0.1) ${percentage}deg)`
        }}
      >
        <div className="absolute top-2 left-2 right-2 bottom-2 bg-navy rounded-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: skill.color }}>
              {skill.level}%
            </div>
            <div className="text-xs text-gray-300 mt-1">{skill.name}</div>
          </div>
        </div>
      </div>
      <i className={`${skill.icon} text-3xl mb-2`} style={{ color: skill.color }}></i>
    </div>
  );
}
