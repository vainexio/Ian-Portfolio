export interface CodeExample {
  id: string;
  projectId: string;
  title: string;
  description: string;
  html: string;
  css: string;
  js: string;
  category: "html" | "css" | "js" | "react";
}

export const codeExamples: CodeExample[] = [
  {
    id: "discord-bot-auth",
    projectId: "1", // VALCORE Discord Bot
    title: "OAuth2 Authorization Flow",
    description: "See how Discord OAuth2 works with a simple demo",
    category: "js",
    html: `<div class="oauth-container">
  <h3>Discord OAuth2 Demo</h3>
  <div id="auth-status">Not authenticated</div>
  <button id="auth-btn">Authorize with Discord</button>
  <div id="user-info" style="display: none;">
    <h4>User Information:</h4>
    <div id="user-details"></div>
  </div>
</div>`,
    css: `.oauth-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #5865F2;
  border-radius: 12px;
  text-align: center;
  background: linear-gradient(135deg, #2C2F33, #23272A);
}

.oauth-container h3 {
  color: #5865F2;
  margin-bottom: 15px;
}

#auth-status {
  padding: 10px;
  margin: 10px 0;
  border-radius: 6px;
  font-weight: bold;
}

.status-offline {
  background: #ED4245;
  color: white;
}

.status-online {
  background: #57F287;
  color: #1E1E1E;
}

button {
  background: #5865F2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 0;
  transition: background 0.3s;
}

button:hover {
  background: #4752C4;
}

#user-info {
  margin-top: 15px;
  padding: 15px;
  background: #40444B;
  border-radius: 8px;
}`,
    js: `let isAuthenticated = false;
const statusEl = document.getElementById('auth-status');
const btnEl = document.getElementById('auth-btn');
const userInfoEl = document.getElementById('user-info');
const userDetailsEl = document.getElementById('user-details');

function updateAuthStatus() {
  if (isAuthenticated) {
    statusEl.textContent = 'Authenticated ✅';
    statusEl.className = 'status-online';
    btnEl.textContent = 'Logout';
    userInfoEl.style.display = 'block';
    userDetailsEl.innerHTML = \`
      <p><strong>Username:</strong> DemoUser#1234</p>
      <p><strong>ID:</strong> 123456789012345678</p>
      <p><strong>Servers:</strong> 850+ protected</p>
    \`;
  } else {
    statusEl.textContent = 'Not authenticated ❌';
    statusEl.className = 'status-offline';
    btnEl.textContent = 'Authorize with Discord';
    userInfoEl.style.display = 'none';
  }
}

btnEl.addEventListener('click', () => {
  if (isAuthenticated) {
    isAuthenticated = false;
    console.log('User logged out');
  } else {
    // Simulate OAuth flow
    btnEl.textContent = 'Authorizing...';
    btnEl.disabled = true;
    
    setTimeout(() => {
      isAuthenticated = true;
      btnEl.disabled = false;
      console.log('OAuth2 flow completed');
      updateAuthStatus();
    }, 2000);
  }
  updateAuthStatus();
});

updateAuthStatus();`
  },
  {
    id: "game-movement",
    projectId: "2", // U.N.I. Game
    title: "Player Movement System",
    description: "Basic movement mechanics from the survival game",
    category: "js",
    html: `<div class="game-demo">
  <h3>U.N.I. Movement Demo</h3>
  <div class="game-area">
    <div id="player" class="player"></div>
    <div class="obstacle" style="top: 20%; left: 30%;"></div>
    <div class="collectible" style="top: 70%; right: 20%;"></div>
  </div>
  <div class="controls">
    <p>Use WASD or arrow keys to move</p>
    <div class="stats">
      <span>Health: <span id="health">100</span></span>
      <span>Score: <span id="score">0</span></span>
    </div>
  </div>
</div>`,
    css: `.game-demo {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.game-area {
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #2D1B69, #11998e);
  border: 2px solid #E94560;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.player {
  width: 20px;
  height: 20px;
  background: #E94560;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.1s ease;
  box-shadow: 0 0 10px #E94560;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 10px #E94560; }
  50% { box-shadow: 0 0 20px #E94560; }
}

.obstacle {
  width: 30px;
  height: 30px;
  background: #8B0000;
  position: absolute;
  border-radius: 4px;
}

.collectible {
  width: 15px;
  height: 15px;
  background: #FFD700;
  position: absolute;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.controls {
  margin-top: 10px;
  text-align: center;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  font-weight: bold;
}`,
    js: `const player = document.getElementById('player');
const healthEl = document.getElementById('health');
const scoreEl = document.getElementById('score');

let playerPos = { x: 50, y: 50 };
let health = 100;
let score = 0;

function updatePlayerPosition() {
  player.style.left = playerPos.x + '%';
  player.style.top = playerPos.y + '%';
}

function movePlayer(direction) {
  const speed = 5;
  switch(direction) {
    case 'up':
    case 'w':
      playerPos.y = Math.max(0, playerPos.y - speed);
      break;
    case 'down':
    case 's':
      playerPos.y = Math.min(95, playerPos.y + speed);
      break;
    case 'left':
    case 'a':
      playerPos.x = Math.max(0, playerPos.x - speed);
      break;
    case 'right':
    case 'd':
      playerPos.x = Math.min(95, playerPos.x + speed);
      break;
  }
  updatePlayerPosition();
  
  // Update score for movement
  score += 1;
  scoreEl.textContent = score;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
    e.preventDefault();
    if (key === 'arrowup') movePlayer('up');
    else if (key === 'arrowdown') movePlayer('down');
    else if (key === 'arrowleft') movePlayer('left');
    else if (key === 'arrowright') movePlayer('right');
    else movePlayer(key);
  }
});

// Initialize
updatePlayerPosition();
console.log('Use WASD or arrow keys to move the player!');`
  },
  {
    id: "mobile-scanner",
    projectId: "3", // Coinvert
    title: "QR Code Scanner Interface",
    description: "Mobile-responsive scanner UI with animations",
    category: "css",
    html: `<div class="scanner-app">
  <div class="app-header">
    <h3>📱 Coinvert Scanner</h3>
    <div class="coins-display">💰 <span id="coins">0</span> coins</div>
  </div>
  
  <div class="scanner-container">
    <div class="scanner-frame">
      <div class="scanner-overlay">
        <div class="scanner-line"></div>
      </div>
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>
    </div>
    
    <div class="scanner-instructions">
      <p id="instruction-text">Position QR code within the frame</p>
      <button id="scan-btn" class="scan-button">Start Scanning</button>
    </div>
  </div>
  
  <div class="recent-scans">
    <h4>Recent Conversions</h4>
    <div id="scan-history"></div>
  </div>
</div>`,
    css: `.scanner-app {
  max-width: 350px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.coins-display {
  background: rgba(255,255,255,0.2);
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

.scanner-container {
  text-align: center;
  margin-bottom: 20px;
}

.scanner-frame {
  width: 200px;
  height: 200px;
  margin: 0 auto 15px;
  position: relative;
  background: rgba(0,0,0,0.3);
  border-radius: 10px;
}

.scanner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 10px;
}

.scanner-line {
  width: 100%;
  height: 2px;
  background: #00ff00;
  position: absolute;
  top: 0;
  animation: scanLine 2s ease-in-out infinite;
  box-shadow: 0 0 10px #00ff00;
}

@keyframes scanLine {
  0% { top: 0; opacity: 1; }
  50% { opacity: 1; }
  100% { top: calc(100% - 2px); opacity: 0; }
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #00ff00;
}

.corner-tl {
  top: 5px;
  left: 5px;
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  top: 5px;
  right: 5px;
  border-left: none;
  border-bottom: none;
}

.corner-bl {
  bottom: 5px;
  left: 5px;
  border-right: none;
  border-top: none;
}

.corner-br {
  bottom: 5px;
  right: 5px;
  border-left: none;
  border-top: none;
}

.scan-button {
  background: linear-gradient(45deg, #FFA726, #FF7043);
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.scan-button:hover {
  transform: scale(1.05);
}

.scan-button:active {
  transform: scale(0.95);
}

.recent-scans {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 15px;
}

.scan-item {
  background: rgba(255,255,255,0.1);
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
}`,
    js: `let coins = 0;
let isScanning = false;

const coinsEl = document.getElementById('coins');
const instructionEl = document.getElementById('instruction-text');
const scanBtn = document.getElementById('scan-btn');
const historyEl = document.getElementById('scan-history');

function updateCoins(amount) {
  coins += amount;
  coinsEl.textContent = coins;
  
  // Add to history
  const scanItem = document.createElement('div');
  scanItem.className = 'scan-item';
  scanItem.innerHTML = \`Receipt #\${Math.floor(Math.random() * 1000)}: +\${amount} coins\`;
  historyEl.insertBefore(scanItem, historyEl.firstChild);
  
  // Keep only last 3 items
  while (historyEl.children.length > 3) {
    historyEl.removeChild(historyEl.lastChild);
  }
}

function simulateScan() {
  if (isScanning) return;
  
  isScanning = true;
  scanBtn.textContent = 'Scanning...';
  scanBtn.disabled = true;
  instructionEl.textContent = 'Scanning QR code...';
  
  // Simulate scanning process
  setTimeout(() => {
    const earnedCoins = Math.floor(Math.random() * 50) + 10;
    updateCoins(earnedCoins);
    
    instructionEl.textContent = \`Success! +\${earnedCoins} coins earned\`;
    scanBtn.textContent = 'Scan Another';
    scanBtn.disabled = false;
    isScanning = false;
    
    // Reset instruction after 3 seconds
    setTimeout(() => {
      instructionEl.textContent = 'Position QR code within the frame';
    }, 3000);
  }, 2500);
}

scanBtn.addEventListener('click', simulateScan);

// Initialize with some demo history
updateCoins(0); // Just to initialize
historyEl.innerHTML = \`
  <div class="scan-item">Receipt #456: +25 coins</div>
  <div class="scan-item">Receipt #123: +18 coins</div>
\`;`
  },
  {
    id: "chatbot-interface",
    projectId: "4", // Messenger Chatbot
    title: "AI Chat Interface",
    description: "Interactive chatbot UI with typing indicators",
    category: "js",
    html: `<div class="chat-app">
  <div class="chat-header">
    <div class="bot-avatar">🤖</div>
    <div class="bot-info">
      <h4>AI Assistant</h4>
      <span class="status online">Online</span>
    </div>
  </div>
  
  <div id="chat-messages" class="chat-messages">
    <div class="message bot-message">
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <p>Hello! I'm your AI assistant. Try asking me something!</p>
        <span class="message-time">10:30 AM</span>
      </div>
    </div>
  </div>
  
  <div id="typing-indicator" class="typing-indicator" style="display: none;">
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <span>AI is typing...</span>
  </div>
  
  <div class="chat-input">
    <input type="text" id="message-input" placeholder="Type your message..." />
    <button id="send-btn">Send</button>
  </div>
</div>`,
    css: `.chat-app {
  max-width: 400px;
  margin: 0 auto;
  background: #1e1e1e;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.chat-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 15px;
  display: flex;
  align-items: center;
}

.bot-avatar {
  font-size: 30px;
  margin-right: 10px;
}

.bot-info h4 {
  margin: 0;
  color: white;
}

.status {
  font-size: 12px;
  color: #90EE90;
}

.chat-messages {
  height: 250px;
  overflow-y: auto;
  padding: 15px;
  background: #2a2a2a;
}

.message {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  font-size: 20px;
  margin: 0 8px;
}

.message-content {
  max-width: 70%;
  background: #404040;
  padding: 10px 12px;
  border-radius: 15px;
  color: white;
}

.user-message .message-content {
  background: #667eea;
}

.message-time {
  font-size: 10px;
  color: #888;
  display: block;
  margin-top: 5px;
}

.typing-indicator {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  background: #2a2a2a;
  color: #888;
  font-size: 12px;
}

.typing-dots {
  margin-right: 8px;
}

.typing-dots span {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #667eea;
  border-radius: 50%;
  margin-right: 2px;
  animation: typingDots 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typingDots {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

.chat-input {
  display: flex;
  padding: 15px;
  background: #1e1e1e;
  border-top: 1px solid #404040;
}

#message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #404040;
  border-radius: 20px;
  background: #2a2a2a;
  color: white;
  outline: none;
}

#send-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

#send-btn:hover {
  background: #5a6fd8;
}`,
    js: `const messagesContainer = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = \`message \${isUser ? 'user-message' : 'bot-message'}\`;
  
  const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  messageDiv.innerHTML = \`
    <div class="message-avatar">\${isUser ? '👤' : '🤖'}</div>
    <div class="message-content">
      <p>\${content}</p>
      <span class="message-time">\${currentTime}</span>
    </div>
  \`;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
  typingIndicator.style.display = 'flex';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
  typingIndicator.style.display = 'none';
}

function getBotResponse(userMessage) {
  const responses = [
    "That's interesting! Tell me more about that.",
    "I understand. How can I help you with that?",
    "Great question! Let me think about that...",
    "I'm here to help! What would you like to know?",
    "That's a good point. Here's what I think...",
    "Thanks for sharing! I'm always learning from our conversations."
  ];
  
  if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
    return "Hello there! Nice to meet you! 👋";
  }
  
  if (userMessage.toLowerCase().includes('help')) {
    return "I'm here to help! I can chat about various topics, answer questions, or just have a conversation. What would you like to talk about?";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}

function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  // Add user message
  addMessage(message, true);
  messageInput.value = '';
  
  // Show typing indicator
  showTyping();
  
  // Simulate bot response delay
  setTimeout(() => {
    hideTyping();
    const botResponse = getBotResponse(message);
    addMessage(botResponse);
  }, 1000 + Math.random() * 2000);
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Focus input on load
messageInput.focus();`
  }
];

export function getCodeExamplesByProjectId(projectId: string): CodeExample[] {
  return codeExamples.filter(example => example.projectId === projectId);
}