// Interactive code examples for the portfolio
export const codeExamples = {
  discord: {
    title: "Discord Bot Authentication",
    description: "Live example of OAuth2 authentication flow used in VALCORE",
    html: `<div class="oauth-demo">
  <h3>Discord OAuth2 Demo</h3>
  <button id="auth-btn" class="auth-button">
    <i class="fab fa-discord"></i>
    Authorize Bot
  </button>
  <div id="result" class="result-box">
    Click the button to simulate OAuth flow
  </div>
</div>`,
    css: `.oauth-demo {
  padding: 20px;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.auth-button {
  background: linear-gradient(45deg, #5865f2, #7289da);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto 20px;
}

.auth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(88, 101, 242, 0.3);
}

.result-box {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
  min-height: 60px;
  backdrop-filter: blur(10px);
}`,
    js: `document.getElementById('auth-btn').addEventListener('click', function() {
  const resultBox = document.getElementById('result');
  const btn = this;
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authorizing...';
  btn.disabled = true;
  
  // Simulate OAuth flow
  setTimeout(() => {
    resultBox.innerHTML = \`
      <div style="color: #1abc9c;">
        <i class="fas fa-check-circle"></i>
        Authorization successful!<br>
        <small>Bot permissions granted to server</small>
      </div>
    \`;
    
    btn.innerHTML = '<i class="fas fa-check"></i> Authorized';
    btn.style.background = 'linear-gradient(45deg, #1abc9c, #27ae60)';
    
    setTimeout(() => {
      btn.innerHTML = '<i class="fab fa-discord"></i> Authorize Bot';
      btn.style.background = 'linear-gradient(45deg, #5865f2, #7289da)';
      btn.disabled = false;
      resultBox.innerHTML = 'Click the button to simulate OAuth flow';
    }, 3000);
  }, 2000);
});`
  },
  
  roblox: {
    title: "Luau Game Mechanics",
    description: "Interactive demonstration of survival game mechanics from U.N.I.",
    html: `<div class="game-demo">
  <h3>Survival Game Demo</h3>
  <div class="player-stats">
    <div class="stat">
      <span>Health:</span>
      <div class="health-bar">
        <div id="health" class="health-fill"></div>
      </div>
      <span id="health-text">100</span>
    </div>
    <div class="stat">
      <span>Hunger:</span>
      <div class="hunger-bar">
        <div id="hunger" class="hunger-fill"></div>
      </div>
      <span id="hunger-text">100</span>
    </div>
  </div>
  <div class="actions">
    <button id="explore-btn">🔍 Explore</button>
    <button id="rest-btn">💤 Rest</button>
    <button id="eat-btn">🍖 Eat</button>
  </div>
  <div id="game-log" class="game-log">
    Welcome to the survival demo. Choose your actions wisely!
  </div>
</div>`,
    css: `.game-demo {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Courier New', monospace;
}

.player-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.health-bar, .hunger-bar {
  flex: 1;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.health-fill {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #e74c3c, #c0392b);
  transition: width 0.5s ease;
}

.hunger-fill {
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #f39c12, #e67e22);
  transition: width 0.5s ease;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.actions button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.game-log {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  height: 120px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.4;
}`,
    js: `let playerHealth = 100;
let playerHunger = 100;

function updateStats() {
  document.getElementById('health').style.width = playerHealth + '%';
  document.getElementById('health-text').textContent = playerHealth;
  document.getElementById('hunger').style.width = playerHunger + '%';
  document.getElementById('hunger-text').textContent = playerHunger;
}

function addLog(message) {
  const log = document.getElementById('game-log');
  log.innerHTML += '<div>' + message + '</div>';
  log.scrollTop = log.scrollHeight;
}

// Action handlers
document.getElementById('explore-btn').addEventListener('click', function() {
  const events = [
    { msg: 'Found some supplies!', health: 5, hunger: -10 },
    { msg: 'Encountered a wild animal!', health: -15, hunger: -5 },
    { msg: 'Discovered a safe shelter.', health: 10, hunger: -8 },
    { msg: 'Got lost in the wilderness.', health: -5, hunger: -15 }
  ];
  
  const event = events[Math.floor(Math.random() * events.length)];
  playerHealth = Math.max(0, Math.min(100, playerHealth + event.health));
  playerHunger = Math.max(0, Math.min(100, playerHunger + event.hunger));
  
  addLog(event.msg);
  updateStats();
});

document.getElementById('rest-btn').addEventListener('click', function() {
  playerHealth = Math.min(100, playerHealth + 20);
  playerHunger = Math.max(0, playerHunger - 15);
  addLog('You rest and recover some health.');
  updateStats();
});

document.getElementById('eat-btn').addEventListener('click', function() {
  if (playerHunger < 90) {
    playerHunger = Math.min(100, playerHunger + 25);
    playerHealth = Math.min(100, playerHealth + 5);
    addLog('You eat some food and feel better.');
  } else {
    addLog('You are not hungry right now.');
  }
  updateStats();
});

// Hunger decreases over time
setInterval(() => {
  if (playerHunger > 0) {
    playerHunger = Math.max(0, playerHunger - 1);
    if (playerHunger === 0 && playerHealth > 0) {
      playerHealth = Math.max(0, playerHealth - 2);
      addLog('You are starving! Health decreasing...');
    }
    updateStats();
  }
}, 3000);`
  },

  android: {
    title: "Android UI Components",
    description: "Interactive demonstration of modern Android UI patterns",
    html: `<div class="android-demo">
  <div class="phone-frame">
    <div class="status-bar">
      <span class="time">12:34</span>
      <span class="battery">🔋 85%</span>
    </div>
    <div class="app-content">
      <h2>💰 Coinvert</h2>
      <div class="card">
        <h3>Scan Receipt</h3>
        <div class="qr-scanner" id="scanner">
          <div class="scanner-line"></div>
          <p>Point camera at QR code</p>
        </div>
        <button id="scan-btn" class="primary-btn">Start Scan</button>
      </div>
      <div id="result-card" class="card result-card" style="display: none;">
        <h3>✅ Scan Complete</h3>
        <p>Receipt Total: <strong>$12.45</strong></p>
        <p>Converted Coins: <strong>124 🪙</strong></p>
        <button class="primary-btn">Add to Wallet</button>
      </div>
    </div>
  </div>
</div>`,
    css: `.android-demo {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.phone-frame {
  width: 280px;
  height: 500px;
  background: #1a1a1a;
  border-radius: 25px;
  padding: 10px;
  border: 3px solid #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  font-size: 12px;
  color: #fff;
  background: #000;
  border-radius: 15px 15px 0 0;
}

.app-content {
  padding: 20px 15px;
  height: calc(100% - 30px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 15px 15px;
  color: white;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.qr-scanner {
  height: 150px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin: 10px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.scanner-line {
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff00, transparent);
  position: absolute;
  animation: scan 2s infinite;
}

@keyframes scan {
  0% { top: 20px; }
  50% { top: 50%; }
  100% { top: calc(100% - 20px); }
}

.primary-btn {
  background: linear-gradient(45deg, #00c851, #007e33);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 200, 81, 0.3);
}

.result-card {
  background: rgba(0, 200, 81, 0.2);
  border-color: rgba(0, 200, 81, 0.5);
}`,
    js: `document.getElementById('scan-btn').addEventListener('click', function() {
  const btn = this;
  const scanner = document.getElementById('scanner');
  const resultCard = document.getElementById('result-card');
  
  btn.innerHTML = '🔍 Scanning...';
  btn.disabled = true;
  
  // Simulate scanning process
  scanner.style.background = 'rgba(0, 255, 0, 0.1)';
  scanner.style.borderColor = '#00ff00';
  
  setTimeout(() => {
    // Show success animation
    scanner.innerHTML = '<div style="font-size: 48px;">✅</div>';
    
    setTimeout(() => {
      // Show results
      resultCard.style.display = 'block';
      resultCard.style.animation = 'slideIn 0.5s ease-out';
      
      btn.innerHTML = 'Scan Another';
      btn.disabled = false;
      
      // Reset for next scan
      setTimeout(() => {
        scanner.innerHTML = \`
          <div class="scanner-line"></div>
          <p>Point camera at QR code</p>
        \`;
        scanner.style.background = 'rgba(0, 0, 0, 0.3)';
        scanner.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        resultCard.style.display = 'none';
        btn.innerHTML = 'Start Scan';
      }, 5000);
    }, 1000);
  }, 3000);
});

// Add slideIn animation
const style = document.createElement('style');
style.textContent = \`
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
\`;
document.head.appendChild(style);`
  }
};