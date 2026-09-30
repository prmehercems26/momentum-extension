// --- DOM Elements ---
const timeDisplay = document.getElementById('time-display');
const greetingDisplay = document.getElementById('greeting-display');
const goalInput = document.getElementById('daily-goal-input');
const activeGoalContainer = document.getElementById('active-goal-container');
const activeGoalText = document.getElementById('active-goal-text');
const goalCheckbox = document.getElementById('goal-checkbox');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

const duckAvatar = document.getElementById('duck-avatar');
const duckRing = document.getElementById('duck-ring');
const duckStatus = document.getElementById('duck-status');
const environmentOverlay = document.getElementById('environment-overlay');
const btnComplete = document.getElementById('btn-complete-task');
const btnMiss = document.getElementById('btn-miss-deadline');

const userName = "Friend"; // Can be hooked up to chrome.storage later

// --- Classic Momentum Features ---

// 1. Clock & Greeting
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, '0');
  
  timeDisplay.innerText = `${hours}:${minutes}`;
  
  let greeting = "Good evening";
  if (hours >= 5 && hours < 12) greeting = "Good morning";
  else if (hours >= 12 && hours < 18) greeting = "Good afternoon";
  
  greetingDisplay.innerText = `${greeting}, ${userName}.`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Daily Goal Logic
goalInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && this.value.trim() !== '') {
    activeGoalText.innerText = this.value;
    goalInput.classList.add('hidden');
    document.querySelector('.goal-label').innerText = "TODAY";
    activeGoalContainer.classList.remove('hidden');
  }
});

goalCheckbox.addEventListener('change', function() {
  if(this.checked) activeGoalText.classList.add('goal-completed');
  else activeGoalText.classList.remove('goal-completed');
});

// 3. Quote of the Day
const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" }
];
const dailyQuote = quotes[Math.floor(Math.random() * quotes.length)];
quoteText.innerText = `"${dailyQuote.text}"`;
quoteAuthor.innerText = dailyQuote.author;


// --- PRD Features (Upgraded Aesthetics) ---

// 4. Gamified Accountability
btnMiss.addEventListener('click', () => {
  duckAvatar.innerText = '🦆💤'; 
  duckRing.style.filter = "grayscale(100%) opacity(0.7)";
  duckRing.style.animationPlayState = "paused"; // Stop floating
  duckStatus.innerText = 'Missed deadline. I am tired...';
  environmentOverlay.classList.add('degraded'); 
});

btnComplete.addEventListener('click', () => {
  duckAvatar.innerText = '🦆'; 
  duckRing.style.filter = "none";
  duckRing.style.animationPlayState = "running"; // Resume floating
  duckStatus.innerText = 'Task done! Looking great!';
  environmentOverlay.classList.remove('degraded'); 
});

// 5. Hydration Tracker
const glassContainer = document.getElementById('glass-container');
for (let i = 0; i < 8; i++) {
  const glass = document.createElement('div');
  glass.classList.add('glass');
  glass.addEventListener('click', () => glass.classList.toggle('filled'));
  glassContainer.appendChild(glass);
}

// 6. Social & Audio Toggles
document.getElementById('social-square').addEventListener('click', () => {
  document.getElementById('social-modal').classList.toggle('hidden');
});

const songTitle = document.getElementById('song-title');
document.getElementById('btn-play-next').addEventListener('click', () => {
  songTitle.innerText = "Syncing with weather...";
  setTimeout(() => songTitle.innerText = "Mr. Blue Sky - ELO", 800); 
});

// 7. Market Tickers
const tickerContainer = document.getElementById('ticker-container');
const mockTickers = [
  { sym: 'AAPL', price: 173.50, change: '+1.2%', up: true },
  { sym: 'BTC', price: 64230.00, change: '+2.5%', up: true },
  { sym: 'TSLA', price: 185.10, change: '-0.8%', up: false }
];
mockTickers.forEach(t => {
  const color = t.up ? 'ticker-up' : 'ticker-down';
  tickerContainer.innerHTML += `<span class="ticker-item">${t.sym} $${t.price.toFixed(2)} <span class="${color}">(${t.change})</span></span>`;
});