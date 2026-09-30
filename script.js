// DOM Elements
const duckAvatar = document.getElementById('duck-avatar');
const duckStatus = document.getElementById('duck-status');
const environmentOverlay = document.getElementById('environment-overlay');
const btnComplete = document.getElementById('btn-complete-task');
const btnMiss = document.getElementById('btn-miss-deadline');
const socialSquare = document.getElementById('social-square');
const socialModal = document.getElementById('social-modal');
const btnPlayNext = document.getElementById('btn-play-next');
const songTitle = document.getElementById('song-title');
const glassContainer = document.getElementById('glass-container');
const tickerContainer = document.getElementById('ticker-container');

// Requisite 1: Gamified Accountability
function triggerDegradation() {
  duckAvatar.innerText = '🦆💤'; // Tired/Sad visual state 
  duckAvatar.style.filter = "grayscale(100%)";
  duckStatus.innerText = 'Missed deadline. I am tired...';
  environmentOverlay.classList.add('degraded'); // Darker environment trigger 
}

function triggerStateReversal() {
  duckAvatar.innerText = '🦆'; // Default, happy state 
  duckAvatar.style.filter = "none";
  duckStatus.innerText = 'Great job! Ready to work!';
  environmentOverlay.classList.remove('degraded'); // Environment state reversal 
}

btnMiss.addEventListener('click', triggerDegradation);
btnComplete.addEventListener('click', triggerStateReversal);

// Requisite 2: Contextual Audio
const mockSongQueue = [
  "Walking on Sunshine - Katrina & The Waves",
  "Mr. Blue Sky - ELO",
  "Good Vibrations - The Beach Boys"
];
let songIndex = 0;

btnPlayNext.addEventListener('click', () => {
  songTitle.innerText = "Loading next match...";
  setTimeout(() => {
    // Automatically display next optimally matched song 
    songTitle.innerText = mockSongQueue[songIndex % mockSongQueue.length];
    songIndex++;
  }, 800); 
});

// Requisite 3: Hydration Tracker
function renderHydrationTracker() {
  // Renders exactly eight empty glass icons 
  for (let i = 0; i < 8; i++) {
    const glass = document.createElement('div');
    glass.classList.add('glass');
    
    // Visually transition to "filled" state on click 
    glass.addEventListener('click', () => {
      glass.classList.toggle('filled');
      // Note: Add logic here later to persist state via chrome.storage.local
    });
    
    glassContainer.appendChild(glass);
  }
}
renderHydrationTracker();

// Requisite 4: Social Connectivity
socialSquare.addEventListener('click', () => {
  // Expand modal to display friend's location and daily plan 
  socialModal.classList.toggle('hidden');
});

// Requisite 5: Live Market Tickers
const mockTickers = [
  { symbol: 'AAPL', price: 173.50, change: '+1.2%', up: true },
  { symbol: 'BTC', price: 64230.00, change: '+2.5%', up: true },
  { symbol: 'TSLA', price: 185.10, change: '-0.8%', up: false }
];

function renderTickers() {
  // Displays current price and daily percentage change for 2 to 4 valid symbols 
  mockTickers.forEach(ticker => {
    const span = document.createElement('span');
    span.classList.add('ticker-item');
    const colorClass = ticker.up ? 'ticker-up' : 'ticker-down';
    span.innerHTML = `<strong>${ticker.symbol}</strong> $${ticker.price} <span class="${colorClass}">(${ticker.change})</span>`;
    tickerContainer.appendChild(span);
  });
}
renderTickers();