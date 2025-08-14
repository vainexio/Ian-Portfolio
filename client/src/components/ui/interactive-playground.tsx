import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  preview: string;
  color: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    id: 'discord-bot',
    title: 'Discord Bot Magic',
    language: 'javascript',
    code: `// VALCORE Bot Authentication
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
  console.log('🚀 Bot is online!');
  client.user.setActivity('Protecting 850+ servers', { type: 'WATCHING' });
});

client.on('guildCreate', (guild) => {
  console.log(\`✨ Joined: \${guild.name}\`);
});`,
    preview: '🤖 850+ servers protected',
    color: 'coral'
  },
  {
    id: 'luau-game',
    title: 'Game Development',
    language: 'luau',
    code: `-- U.N.I. Survival Mechanics
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local function onPlayerSpawn(player)
    local character = player.Character
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Apply post-apocalyptic effects
    humanoid.WalkSpeed = 12
    character.Head.face.Transparency = 0.3
    
    print("🏃‍♂️ Player spawned in NU Laguna")
end`,
    preview: '🎮 4K+ visits achieved',
    color: 'purple'
  },
  {
    id: 'web-magic',
    title: 'Frontend Wizardry',
    language: 'typescript',
    code: `// Dynamic Portfolio Component
interface ProjectCard {
  title: string;
  tech: string[];
  featured: boolean;
}

const renderProject = (project: ProjectCard) => {
  const techBadges = project.tech.map(tech => 
    \`<span class="badge">\${tech}</span>\`
  ).join('');
  
  return \`
    <div class="project-card \${project.featured ? 'featured' : ''}">
      <h3>\${project.title}</h3>
      <div class="tech-stack">\${techBadges}</div>
    </div>
  \`;
};`,
    preview: '💻 Interactive & responsive',
    color: 'cyan'
  }
];

export default function InteractivePlayground() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const typewriterRef = useRef<NodeJS.Timeout>();

  const typeWriter = (text: string, index = 0) => {
    if (index < text.length) {
      setDisplayedCode(text.substring(0, index + 1));
      typewriterRef.current = setTimeout(() => typeWriter(text, index + 1), 50);
    } else {
      setIsTyping(false);
    }
  };

  const handleSnippetChange = (index: number) => {
    if (index === activeSnippet) return;
    
    setIsTyping(true);
    setDisplayedCode('');
    setActiveSnippet(index);
    
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
    }
    
    setTimeout(() => {
      typeWriter(codeSnippets[index].code);
    }, 300);
  };

  useEffect(() => {
    typeWriter(codeSnippets[0].code);
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
    };
  }, []);

  const currentSnippet = codeSnippets[activeSnippet];

  return (
    <div className="glass-dark rounded-3xl p-6 md:p-8 transform hover:scale-105 transition-all duration-500 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-coral rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-amber rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-3 h-3 bg-purple rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="text-xs text-gray-400">
          <i className="fas fa-code mr-1"></i>
          Live Coding Environment
        </div>
      </div>

      {/* Project Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {codeSnippets.map((snippet, index) => (
          <Button
            key={snippet.id}
            onClick={() => handleSnippetChange(index)}
            variant={index === activeSnippet ? "default" : "ghost"}
            size="sm"
            className={`text-xs transition-all duration-300 ${
              index === activeSnippet 
                ? `bg-${snippet.color}/20 text-${snippet.color} border border-${snippet.color}/50` 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {snippet.title}
          </Button>
        ))}
      </div>

      {/* Code Display */}
      <div className="relative">
        <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm overflow-hidden">
          <div className="flex items-center mb-2">
            <span className={`text-${currentSnippet.color} text-xs`}>
              {currentSnippet.language.toUpperCase()}
            </span>
            <div className="ml-auto flex items-center space-x-2">
              <div className={`w-2 h-2 bg-${currentSnippet.color} rounded-full ${isTyping ? 'animate-pulse' : ''}`}></div>
              <span className="text-xs text-gray-500">
                {isTyping ? 'Typing...' : 'Ready'}
              </span>
            </div>
          </div>
          
          <pre className="text-gray-300 whitespace-pre-wrap break-words">
            {displayedCode}
            {isTyping && <span className="animate-pulse">|</span>}
          </pre>
        </div>

        {/* Preview Badge */}
        <div className="flex items-center justify-between">
          <div className={`bg-${currentSnippet.color}/20 border border-${currentSnippet.color}/30 rounded-lg px-3 py-2 text-sm`}>
            <span className={`text-${currentSnippet.color} font-medium`}>
              {currentSnippet.preview}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            Click tabs to explore different projects →
          </div>
        </div>
      </div>
    </div>
  );
}