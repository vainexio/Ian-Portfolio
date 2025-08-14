import { useState, useEffect } from 'react';

// Creative Quote Generator Component
export function CreativeQuoteGenerator({ quotes }: { quotes: Array<{ text: string; author: string; color: string }> }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const element = document.getElementById('quote-generator');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!quotes || quotes.length === 0) return null;

  const currentQuoteData = quotes[currentQuote];

  return (
    <div id="quote-generator" className="glass rounded-2xl p-6 max-w-md mx-auto">
      <div className="text-center">
        <div className="mb-4">
          <i className="fas fa-quote-left text-coral text-2xl"></i>
        </div>
        <div 
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="text-white text-lg italic mb-4 leading-relaxed">
            "{currentQuoteData.text}"
          </p>
          <p className="text-gray-400 text-sm mb-4">
            — {currentQuoteData.author}
          </p>
          <div className="flex justify-center space-x-1">
            {quotes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index === currentQuote ? 'bg-coral' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}