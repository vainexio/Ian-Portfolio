import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Discover Hidden Talents
interface TalentDiscoveryProps {
  talents: Array<{
    clue: string;
    talent: string;
    description: string;
  }>;
}

export const TalentDiscovery = ({ talents }: TalentDiscoveryProps) => {
  const [discoveredTalents, setDiscoveredTalents] = useState<string[]>([]);
  const [currentClue, setCurrentClue] = useState(0);

  const discoverTalent = () => {
    if (!discoveredTalents.includes(talents[currentClue].talent)) {
      setDiscoveredTalents(prev => [...prev, talents[currentClue].talent]);
    }
    setCurrentClue((prev) => (prev + 1) % talents.length);
  };

  return (
    <Card className="glass border-none max-w-lg mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-white mb-2">
            <i className="fas fa-search mr-2 text-coral"></i>
            Discover Hidden Talents
          </h3>
          <p className="text-sm text-gray-400">Click to uncover what makes me unique</p>
        </div>

        <div className="mb-6">
          <p className="text-white italic mb-4 leading-relaxed min-h-[3rem]">
            "{talents[currentClue].clue}"
          </p>
          
          {discoveredTalents.includes(talents[currentClue].talent) && (
            <div className="glass-dark rounded-lg p-4 animate-slide-in">
              <h4 className="text-coral font-bold mb-2">{talents[currentClue].talent}</h4>
              <p className="text-sm text-gray-300">{talents[currentClue].description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            onClick={discoverTalent}
            className="bg-gradient-to-r from-coral to-purple hover:from-coral/80 hover:to-purple/80"
          >
            <i className="fas fa-lightbulb mr-2"></i>
            Discover
          </Button>
          
          <div className="text-sm text-gray-400">
            Found: {discoveredTalents.length}/4
          </div>
        </div>

        {discoveredTalents.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {discoveredTalents.map((talent, index) => (
              <span key={index} className="bg-coral/20 text-coral px-2 py-1 rounded-full text-xs">
                {talent}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Interactive Project Timeline
interface ProjectJourneyProps {
  journey: Array<{
    year: string;
    title: string;
    description: string;
    color: string;
    icon: string;
  }>;
}

export const ProjectJourney = ({ journey }: ProjectJourneyProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % journey.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + journey.length) % journey.length);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
    
    if (!autoPlay) {
      intervalRef.current = setInterval(nextStep, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const step = journey[currentStep];

  return (
    <div className="glass rounded-2xl p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          <i className="fas fa-map-marked-alt mr-2 text-coral"></i>
          Project Journey
        </h3>
        <p className="text-sm text-gray-400">Navigate through my development story</p>
      </div>

      <div className="relative">
        {/* Timeline visualization */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            {journey.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentStep 
                    ? `bg-${step.color} scale-125` 
                    : index < currentStep 
                      ? 'bg-gray-400' 
                      : 'bg-gray-600'
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-${step.color}/20 rounded-full mb-4`}>
            <i className={`${step.icon} text-${step.color} text-2xl`}></i>
          </div>
          
          <div className={`text-2xl font-bold text-${step.color} mb-2`}>
            {step.year}
          </div>
          
          <h4 className="text-lg font-bold text-white mb-3">
            {step.title}
          </h4>
          
          <p className="text-gray-300 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={prevStep}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <i className="fas fa-chevron-left"></i>
          </Button>
          
          <Button 
            onClick={toggleAutoPlay}
            variant="ghost"
            size="sm"
            className={`${autoPlay ? 'text-coral' : 'text-gray-400'} hover:text-white`}
          >
            <i className={`fas ${autoPlay ? 'fa-pause' : 'fa-play'}`}></i>
          </Button>
          
          <Button 
            onClick={nextStep}
            variant="ghost" 
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Curiosity Sparker - Random Tech Facts
interface TechFactSparkerProps {
  facts: Array<{
    title: string;
    fact: string;
    icon: string;
    color: string;
  }>;
}

export const TechFactSparker = ({ facts }: TechFactSparkerProps) => {
  const [currentFact, setCurrentFact] = useState(0);
  const [discovered, setDiscovered] = useState<number[]>([]);

  const discoverFact = () => {
    if (!discovered.includes(currentFact)) {
      setDiscovered(prev => [...prev, currentFact]);
    }
    
    // Get a random fact that hasn't been shown recently
    let nextFact;
    do {
      nextFact = Math.floor(Math.random() * facts.length);
    } while (nextFact === currentFact && facts.length > 1);
    
    setCurrentFact(nextFact);
  };

  const fact = facts[currentFact];

  return (
    <div className="glass rounded-xl p-4 max-w-sm mx-auto cursor-pointer group" onClick={discoverFact}>
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-12 h-12 bg-${fact.color}/20 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
          <i className={`${fact.icon} text-${fact.color} text-xl`}></i>
        </div>
        
        <h4 className={`text-sm font-bold text-${fact.color} mb-2`}>
          {fact.title}
        </h4>
        
        <p className="text-xs text-gray-300 leading-relaxed mb-3">
          {fact.fact}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Discovered: {discovered.length}/{facts.length}
          </div>
          <div className="text-xs text-gray-400 group-hover:text-white transition-colors">
            Click to explore →
          </div>
        </div>
      </div>
    </div>
  );
};