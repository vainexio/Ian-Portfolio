import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface InteractiveDemoProps {
  title: string;
  description: string;
  demoType: "discord-bot" | "game-controls" | "mobile-app" | "api-demo";
  className?: string;
}

export default function InteractiveDemo({ title, description, demoType, className = "" }: InteractiveDemoProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [isActive, setIsActive] = useState(false);

  const renderDemo = () => {
    switch (demoType) {
      case "discord-bot":
        return <DiscordBotDemo isActive={isActive} />;
      case "game-controls":
        return <GameControlsDemo isActive={isActive} />;
      case "mobile-app":
        return <MobileAppDemo isActive={isActive} />;
      case "api-demo":
        return <ApiDemo isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={ref as any}
      className={`${className} ${
        isVisible ? 'interactive-slide-in' : 'opacity-0 translate-x-8'
      }`}
    >
      <div className={`glass-dark rounded-2xl p-6 border border-white/10 ${isActive ? 'demo-glow' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isActive 
                ? 'bg-coral text-white shadow-lg shadow-coral/25' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            {isActive ? 'Stop Demo' : 'Try Demo'}
          </button>
        </div>
        
        <div className="h-64 bg-black/20 rounded-xl overflow-hidden border border-white/5">
          {renderDemo()}
        </div>
      </div>
    </div>
  );
}

// Discord Bot Demo Component
function DiscordBotDemo({ isActive }: { isActive: boolean }) {
  const [messages, setMessages] = useState([
    { user: "System", message: "VALCORE Bot is online!", time: "10:30" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = { 
      user: "You", 
      message: inputValue, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, {
        user: "VALCORE",
        message: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
    
    setInputValue("");
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("backup")) return "🔄 Backup server configured! Members will be transferred safely.";
    if (lowerInput.includes("help")) return "📋 Available commands: !backup, !status, !oauth, !members";
    if (lowerInput.includes("status")) return "✅ All systems operational. 850+ servers protected.";
    return "🤖 I understand! Type 'help' for available commands.";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-3 bg-gray-800 border-b border-gray-700">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
        <span className="text-white font-medium">#general</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              msg.user === "VALCORE" ? "bg-coral text-white" : 
              msg.user === "System" ? "bg-gray-600 text-white" : "bg-blue-500 text-white"
            }`}>
              {msg.user === "VALCORE" ? "🤖" : msg.user === "System" ? "⚙️" : "U"}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium text-sm">{msg.user}</span>
                <span className="text-gray-400 text-xs">{msg.time}</span>
              </div>
              <p className="text-gray-300 text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      {isActive && (
        <div className="p-3 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coral"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-coral text-white rounded-lg text-sm hover:bg-coral/80 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Game Controls Demo Component
function GameControlsDemo({ isActive }: { isActive: boolean }) {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);

  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    if (!isActive) return;
    
    setPlayerPos(prev => {
      const newPos = { ...prev };
      switch (direction) {
        case "up":
          newPos.y = Math.max(0, prev.y - 10);
          break;
        case "down":
          newPos.y = Math.min(90, prev.y + 10);
          break;
        case "left":
          newPos.x = Math.max(0, prev.x - 10);
          break;
        case "right":
          newPos.x = Math.min(90, prev.x + 10);
          break;
      }
      return newPos;
    });
    setScore(prev => prev + 10);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <span className="text-white font-medium">🎮 U.N.I. Game Demo</span>
        <div className="text-amber text-sm font-bold">Score: {score}</div>
      </div>
      
      <div className="flex-1 relative bg-gradient-to-br from-purple-900/20 to-gray-900">
        {/* Player */}
        <div 
          className="absolute w-4 h-4 bg-coral rounded-full transition-all duration-200 shadow-lg"
          style={{ 
            left: `${playerPos.x}%`, 
            top: `${playerPos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-full h-full bg-coral rounded-full animate-pulse"></div>
        </div>
        
        {/* Environment elements */}
        <div className="absolute top-4 left-4 w-6 h-6 bg-green-500/30 rounded border border-green-500/50"></div>
        <div className="absolute top-4 right-4 w-6 h-6 bg-red-500/30 rounded border border-red-500/50"></div>
        <div className="absolute bottom-4 left-1/2 w-8 h-8 bg-purple-500/30 rounded-full border border-purple-500/50 transform -translate-x-1/2"></div>
      </div>
      
      {isActive && (
        <div className="p-3 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-2 max-w-32 mx-auto">
            <div></div>
            <button
              onClick={() => movePlayer("up")}
              className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
            >
              ↑
            </button>
            <div></div>
            <button
              onClick={() => movePlayer("left")}
              className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
            >
              ←
            </button>
            <div></div>
            <button
              onClick={() => movePlayer("right")}
              className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
            >
              →
            </button>
            <div></div>
            <button
              onClick={() => movePlayer("down")}
              className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile App Demo Component
function MobileAppDemo({ isActive }: { isActive: boolean }) {
  const [coins, setCoins] = useState(0);
  const [scanning, setScanning] = useState(false);

  const simulateScan = () => {
    if (!isActive) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setCoins(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-amber-900/20 to-gray-900">
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <span className="text-white font-medium">📱 Coinvert App</span>
        <div className="text-amber text-sm font-bold">💰 {coins} coins</div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className={`w-24 h-24 border-4 border-dashed rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
          scanning ? 'border-amber animate-pulse bg-amber/10' : 'border-gray-500'
        }`}>
          {scanning ? (
            <div className="text-amber text-2xl">📱</div>
          ) : (
            <div className="text-gray-400 text-2xl">🧾</div>
          )}
        </div>
        
        <p className="text-gray-300 text-center text-sm mb-4">
          {scanning ? 'Scanning QR code...' : 'Scan your receipt QR code'}
        </p>
        
        {isActive && (
          <button
            onClick={simulateScan}
            disabled={scanning}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              scanning 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-amber hover:bg-amber/80 text-white'
            }`}
          >
            {scanning ? 'Scanning...' : 'Start Scan'}
          </button>
        )}
      </div>
    </div>
  );
}

// API Demo Component
function ApiDemo({ isActive }: { isActive: boolean }) {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const simulateApiCall = () => {
    if (!isActive) return;
    setLoading(true);
    setResponse("");
    
    setTimeout(() => {
      setLoading(false);
      setResponse(JSON.stringify({
        status: "success",
        data: {
          conversations: 12,
          model: "GPT-4",
          uptime: "60%",
          lastMessage: "Hello! How can I help you today?"
        }
      }, null, 2));
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <span className="text-white font-medium">🤖 Messenger Bot API</span>
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-gray-700">
          {isActive && (
            <button
              onClick={simulateApiCall}
              disabled={loading}
              className={`w-full px-3 py-2 rounded text-sm font-medium transition-all duration-300 ${
                loading 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {loading ? 'Loading...' : 'GET /api/bot/status'}
            </button>
          )}
        </div>
        
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="text-xs text-gray-400 mb-2">Response:</div>
          <pre className="text-xs text-green-400 font-mono bg-black/30 p-2 rounded border border-green-500/20">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              response || "Click the button above to test the API"
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}