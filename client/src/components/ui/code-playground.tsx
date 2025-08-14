import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  js: string;
  category: "html" | "css" | "js" | "react";
}

interface CodePlaygroundProps {
  example: CodeExample;
  className?: string;
}

export default function CodePlayground({ example, className = "" }: CodePlaygroundProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [code, setCode] = useState({
    html: example.html,
    css: example.css,
    js: example.js
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update preview when code changes
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { 
                  margin: 0; 
                  padding: 16px; 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background: #1a1a1a;
                  color: #ffffff;
                }
                ${code.css}
              </style>
            </head>
            <body>
              ${code.html}
              <script>
                try {
                  ${code.js}
                } catch (e) {
                  console.error('Code error:', e);
                }
              </script>
            </body>
          </html>
        `;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [code]);

  const handleCodeChange = (type: "html" | "css" | "js", value: string) => {
    setCode(prev => ({ ...prev, [type]: value }));
  };

  const resetCode = () => {
    setCode({
      html: example.html,
      css: example.css,
      js: example.js
    });
  };

  const tabs = [
    { id: "html" as const, label: "HTML", icon: "fab fa-html5" },
    { id: "css" as const, label: "CSS", icon: "fab fa-css3-alt" },
    { id: "js" as const, label: "fab fa-js-square", icon: "fab fa-js-square" }
  ];

  return (
    <div 
      ref={ref as any}
      className={`${className} ${
        isVisible ? 'interactive-fade-in' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="glass-dark rounded-2xl overflow-hidden border border-white/10 code-highlight">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{example.title}</h4>
            <p className="text-sm text-gray-400">{example.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={resetCode}
              className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
              title="Reset Code"
            >
              <i className="fas fa-undo"></i>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 text-xs bg-coral hover:bg-coral/80 text-white rounded-lg transition-all duration-200"
            >
              {isExpanded ? <i className="fas fa-compress"></i> : <i className="fas fa-expand"></i>}
            </button>
          </div>
        </div>

        <div className={`transition-all duration-500 ${isExpanded ? 'h-96' : 'h-64'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Code Editor Side */}
            <div className="flex flex-col border-r border-white/10">
              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-coral text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code Content */}
              <div className="flex-1 relative">
                <textarea
                  value={code[activeTab]}
                  onChange={(e) => handleCodeChange(activeTab, e.target.value)}
                  className="w-full h-full p-4 bg-transparent text-white text-sm syntax-highlight resize-none focus:outline-none focus:ring-2 focus:ring-coral/50 border-0"
                  placeholder={`Enter ${activeTab.toUpperCase()} code here...`}
                  spellCheck={false}
                />
                {/* Syntax highlighting overlay could go here */}
              </div>
            </div>

            {/* Preview Side */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <span className="text-sm font-medium text-white">
                  <i className="fas fa-eye mr-2"></i>
                  Live Preview
                </span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 bg-gray-900">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title={`Preview for ${example.title}`}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}