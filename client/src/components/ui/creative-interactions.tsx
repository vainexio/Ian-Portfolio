import { useState, useEffect, useRef } from 'react';

// Creative Quote Generator Component
export function CreativeQuoteGenerator({ quotes }: { quotes: Array<{ text: string; author: string; color: string }> }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  if (!quotes || quotes.length === 0) return null;

  const currentQuoteData = quotes[currentQuote];

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        className="relative glass rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 111, 97, 0.1) 0%, rgba(155, 89, 182, 0.1) 50%, rgba(0, 206, 209, 0.1) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 bg-coral rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-8 h-8 bg-purple rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-8 left-12 w-12 h-12 bg-cyan rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-amber rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="text-center">
            {/* Quote Icon with Animation */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full opacity-20 animate-pulse"
                  style={{ backgroundColor: currentQuoteData.color }}
                ></div>
              </div>
              <i 
                className="fas fa-quote-left text-4xl relative z-10 transition-colors duration-500"
                style={{ color: currentQuoteData.color }}
              ></i>
            </div>

            {/* Fixed Height Container to Prevent Layout Shift */}
            <div className="min-h-[200px] flex flex-col justify-center">
              <div 
                className={`transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
                }`}
              >
                <blockquote 
                  className="text-xl md:text-2xl font-light italic mb-6 leading-relaxed text-white max-w-3xl mx-auto"
                  style={{ 
                    textShadow: `0 0 20px ${currentQuoteData.color}20`,
                    minHeight: '80px'
                  }}
                >
                  "{currentQuoteData.text}"
                </blockquote>
                
                <div className="flex flex-col items-center space-y-4">
                  <cite 
                    className="not-italic font-medium text-lg transition-colors duration-500"
                    style={{ color: currentQuoteData.color }}
                  >
                    — {currentQuoteData.author}
                  </cite>
                  
                  {/* Enhanced Progress Indicators */}
                  <div className="flex items-center space-x-3">
                    {quotes.map((quote, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsTransitioning(true);
                          setTimeout(() => {
                            setCurrentQuote(index);
                            setIsTransitioning(false);
                          }, 300);
                        }}
                        className={`group relative transition-all duration-500 hover:scale-125 ${
                          index === currentQuote ? 'scale-110' : 'hover:scale-105'
                        }`}
                        data-testid={`quote-indicator-${index}`}
                      >
                        <div 
                          className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            index === currentQuote 
                              ? 'opacity-100 shadow-lg' 
                              : 'opacity-50 hover:opacity-75'
                          }`}
                          style={{ 
                            backgroundColor: quote.color,
                            boxShadow: index === currentQuote ? `0 0 15px ${quote.color}50` : 'none'
                          }}
                        ></div>
                        {index === currentQuote && (
                          <div 
                            className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                            style={{ backgroundColor: quote.color, opacity: 0.3 }}
                          ></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Border Animation */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-50"
          style={{
            background: `linear-gradient(45deg, ${currentQuoteData.color}20, transparent, ${currentQuoteData.color}20)`,
            animation: 'borderFlow 8s ease-in-out infinite'
          }}
        ></div>
      </div>
    </div>
  );
}