import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface CodeExample {
  html: string;
  css: string;
  js: string;
  title: string;
  description: string;
}

interface InteractiveCodeBlockProps {
  example: CodeExample;
  className?: string;
}

export default function InteractiveCodeBlock({ example, className = '' }: InteractiveCodeBlockProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'preview'>('preview');
  const [htmlCode, setHtmlCode] = useState(example.html);
  const [cssCode, setCssCode] = useState(example.css);
  const [jsCode, setJsCode] = useState(example.js);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const updatePreview = () => {
    if (!previewRef.current) return;
    
    const fullCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: 'Inter', sans-serif; 
              background: linear-gradient(135deg, #1a1a2e, #16213e);
              color: white;
              min-height: 100vh;
              box-sizing: border-box;
            }
            * { box-sizing: border-box; }
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch(e) {
              console.error('Error in user code:', e);
            }
          </script>
        </body>
      </html>
    `;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    previewRef.current.src = URL.createObjectURL(blob);
  };

  useEffect(() => {
    updatePreview();
  }, [htmlCode, cssCode, jsCode]);

  const tabs = [
    { id: 'preview', label: 'Preview', icon: 'fas fa-eye' },
    { id: 'html', label: 'HTML', icon: 'fab fa-html5' },
    { id: 'css', label: 'CSS', icon: 'fab fa-css3-alt' },
    { id: 'js', label: 'JS', icon: 'fab fa-js-square' },
  ] as const;

  const getCodeContent = () => {
    switch (activeTab) {
      case 'html': return htmlCode;
      case 'css': return cssCode;
      case 'js': return jsCode;
      default: return '';
    }
  };

  const setCodeContent = (value: string) => {
    switch (activeTab) {
      case 'html': setHtmlCode(value); break;
      case 'css': setCssCode(value); break;
      case 'js': setJsCode(value); break;
    }
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`interactive-code-block glass rounded-2xl p-4 md:p-6 ${className} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
    >
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{example.title}</h3>
        <p className="text-gray-300 text-sm md:text-base">{example.description}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-4 p-1 glass-dark rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-coral text-white shadow-lg transform scale-105'
                : 'text-gray-300 hover:bg-white/10 hover:text-white hover:scale-102'
            }`}
          >
            <i className={tab.icon}></i>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="h-64 md:h-80 lg:h-96 glass-dark rounded-xl overflow-hidden">
        {activeTab === 'preview' ? (
          <iframe
            ref={previewRef}
            className="w-full h-full border-0 rounded-xl"
            title="Code Preview"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="h-full flex flex-col">
            <textarea
              value={getCodeContent()}
              onChange={(e) => setCodeContent(e.target.value)}
              className="flex-1 w-full p-4 bg-transparent text-gray-100 font-mono text-sm resize-none border-0 outline-0 placeholder-gray-500"
              placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>Edit code and see live preview</span>
        <button
          onClick={() => {
            setHtmlCode(example.html);
            setCssCode(example.css);
            setJsCode(example.js);
          }}
          className="glass px-3 py-1 rounded-lg text-coral hover:bg-coral/20 transition-colors duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}