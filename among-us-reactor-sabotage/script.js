const grid = document.getElementById('grid');
const startButton = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level');
const resultDisplay = document.getElementById('result');
const dropdownContainer = document.getElementById('dropdown-container');

let level = 1;
let gridSize = 3; // Initial grid size is 3x3
let pattern = [];
let playerPattern = [];
let colors = ['blue']; // Default color is blue
let canClick = false; // Prevent clicking during sequence

let performanceData = [50];
let actions = [0];

// Initialize Chart.js
const ctx = document.getElementById('reactor-graph').getContext('2d');
const reactorChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: actions,
    datasets: [{
      label: 'Reactor Stability (%)',
      data: performanceData,
      borderColor: 'rgba(255, 68, 68, 1)',
      backgroundColor: 'rgba(255, 68, 68, 0.2)',
      borderWidth: 3,
      pointRadius: 4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#fff'
        }
      }
    },
    scales: {
      x: {
        title: { 
          display: true, 
          text: 'Reactor Actions',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        }
      },
      y: {
        min: 0,
        max: 100,
        title: { 
          display: true, 
          text: 'Stability (%)',
          color: '#fff'
        },
        ticks: {
          color: '#fff'
        }
      },
    },
  },
});

// Create the grid
function createGrid(size) {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const box = document.createElement('div');
    box.classList.add('box', 'hidden');
    box.dataset.index = i;
    box.addEventListener('click', () => handlePlayerClick(i));
    grid.appendChild(box);
  }
}

// Generate the random pattern for the current level
function generatePattern(size) {
  pattern = [];
  for (let i = 0; i < level + 2; i++) {
    const index = Math.floor(Math.random() * size * size);
    const color = colors[Math.floor(Math.random() * colors.length)];
    pattern.push({ index, color });
  }
}

// Show the pattern to the player
function showPattern() {
  canClick = false; // Disable clicking during the sequence
  pattern.forEach(({ index, color }, i) => {
    setTimeout(() => {
      const box = grid.children[index];
      box.classList.remove('hidden');
      box.classList.add(color);

      setTimeout(() => {
        box.classList.remove(color);
        box.classList.add('hidden');
        if (i === pattern.length - 1) {
          canClick = true; // Enable clicking after the sequence ends
        }
      }, 600); // Keep the color visible for 600ms
    }, i * 800); // Add a delay between each box
  });
}

// Change colors based on levels
function updateColors() {
  if (level <= 3) {
    colors = ['blue']; // Levels 1–3: Blue reactor cores
  } else if (level <= 6) {
    colors = ['white']; // Levels 4–6: White reactor cores
  } else {
    colors = ['red']; // Levels 7–10: Red reactor cores
  }
}

// Show hint sequence interactively
function showHint() {
  playerPattern = []; // Reset the player's pattern to allow retry
  pattern.forEach(({ index, color }, i) => {
    setTimeout(() => {
      const box = grid.children[index];
      box.classList.remove('hidden');
      box.classList.add(color);

      setTimeout(() => {
        box.classList.remove(color);
        box.classList.add('hidden');
      }, 600); // Hint remains visible for 600ms
    }, i * 800); // Show hints sequentially
  });
}

// Handle player clicks
function handlePlayerClick(index) {
  if (!canClick) return; // Prevent clicking if the sequence is still running

  const expected = pattern[playerPattern.length];
  const clickedBox = grid.children[index];

  // Highlight clicked box
  clickedBox.classList.add(expected.color);
  setTimeout(() => clickedBox.classList.remove(expected.color), 500);

  if (expected.index === index) {
    playerPattern.push(index);
    updateGraph(true); // Correct action
    if (playerPattern.length === pattern.length) {
      setTimeout(nextLevel, 1000);
    }
  } else {
    // Highlight incorrect selection
    clickedBox.classList.add('wrong');
    setTimeout(() => clickedBox.classList.remove('wrong'), 2000);
    updateGraph(false); // Incorrect action
  }
}

// Update the performance graph
function updateGraph(correct) {
  const lastScore = performanceData[performanceData.length - 1];
  const newScore = correct ? Math.min(lastScore + 5, 100) : Math.max(lastScore - 10, 0);

  performanceData.push(newScore);
  actions.push(actions.length);
  reactorChart.update();

  if (newScore === 0) {
    endGame();
  }
}

// Progress to the next level
function nextLevel() {
  level++;
  if (level > 10) {
    endGame(true); // End the game after Level 10
    return;
  }

  gridSize = level <= 3 ? 3 : level <= 6 ? 4 : 5; // Adjust grid size
  playerPattern = [];
  updateColors(); // Update colors for new level
  updateLevelDisplay();
  startGame();
}

// Update the level display
function updateLevelDisplay() {
  levelDisplay.textContent = `Reactor Level: ${level}`;
}

// End the game and display results
function endGame(completed = false) {
  if (completed) {
    resultDisplay.innerHTML = `
      <h3>🎉 REACTOR STABILIZED! 🎉</h3>
      <p>You successfully repaired all reactor levels. You are a true crewmate!</p>
    `;
  } else {
    const totalCorrect = actions.length - 1;
    const finalScore = Math.round((totalCorrect / actions.length) * 100); // Accuracy percentage

    resultDisplay.innerHTML = `
      <h3>💥 REACTOR MELTDOWN! 💥</h3>
      <p>Final reactor stability: <strong>${finalScore}%</strong></p>
      <p>The impostor has won this round!</p>
    `;
  }

  addDetailedResults(performanceData[performanceData.length - 1]);
}

// Add detailed results for insights
function addDetailedResults(score) {
  dropdownContainer.innerHTML = `
    <div class="dropdown-item">
      <button onclick="toggleDetails('speed')">Reactor Repair Speed</button>
      <p id="speed" style="display:none;">Your reactor repair speed is ${
        score >= 75 ? 'lightning fast - you could be the emergency repair specialist!' : 
        score >= 50 ? 'steady and reliable - a solid crewmate performance' : 
        'needs improvement - maybe stick to tasks for now'
      }.</p>
    </div>
    <div class="dropdown-item">
      <button onclick="toggleDetails('accuracy')">Reactor Accuracy</button>
      <p id="accuracy" style="display:none;">Your reactor accuracy is ${
        score >= 75 ? 'exceptional - the ship is safe with you around!' : 
        score >= 50 ? 'average - you can handle basic repairs' : 
        'below average - maybe avoid reactor duty next time'
      }. Improving accuracy can prevent catastrophic failures.</p>
    </div>
    <div class="dropdown-item">
      <button onclick="toggleDetails('improvement')">Crewmate Training Suggestions</button>
      <p id="improvement" style="display:none;">To improve your reactor skills, practice sequence memorization games, focus on pattern recognition, and maybe avoid venting during emergencies!</p>
    </div>
    <div class="dropdown-item">
      <button onclick="toggleDetails('sus')">Suspicion Level</button>
      <p id="sus" style="display:none;">${
        score >= 75 ? 'Not Sus - You are clearly a dedicated crewmate!' : 
        score >= 50 ? 'Slightly Sus - Your repair skills are questionable' : 
        'Very Sus - Your reactor skills suggest you might be the impostor!'
      }</p>
    </div>
  `;
}

// Toggle dropdown visibility
function toggleDetails(id) {
  const detail = document.getElementById(id);
  detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
}

// Reset the game to its initial state
function resetGame() {
  level = 1;
  gridSize = 3;
  pattern = [];
  playerPattern = [];
  performanceData = [50];
  actions = [0];

  grid.innerHTML = '';
  resultDisplay.innerHTML = '';
  dropdownContainer.innerHTML = '';

  reactorChart.data.labels = actions;
  reactorChart.data.datasets[0].data = performanceData;
  reactorChart.update();

  startButton.textContent = 'Start Reactor Sequence';
}

// Start the game
function startGame() {
  createGrid(gridSize);
  generatePattern(gridSize);
  showPattern();
}

// Start or Reset Game based on button state
startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start Reactor Sequence') {
    startButton.textContent = 'Reset Reactor';
    startGame();
  } else if (startButton.textContent === 'Reset Reactor') {
    resetGame();
  }
});
