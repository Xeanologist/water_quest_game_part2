// Game configuration and state variables
const GOAL_CANS = 25;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;           // Holds the interval for spawning items
let activeTargetCell = null; // Tracks the current random cell

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square

    cell.addEventListener('click', () => {
      if (!gameActive) return;

      if (cell === activeTargetCell) {
        scoreIncrease();
        cell.innerHTML = '';
        activeTargetCell = null;
      }
    });

    grid.appendChild(cell);
  }
}

// Defines score increase function
function scoreIncrease() {
  currentCans++;
  document.getElementById('current-cans').textContent = currentCans;
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return; // Stop if the game is not active
  var canClicked = false

  const cells = document.querySelectorAll('.grid-cell');

  // Clear all cells before spawning a new water can
  cells.forEach(cell => {
    cell.innerHTML = '';
  });

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];
  activeTargetCell = randomCell;

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div id="water-can-id" class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;

  // Check if player clicks the can
  if (!canClicked) {
    canClicked = true;
    document.getElementById('water-can-id').addEventListener('click', scoreIncrease);
  }
  
}

// Moves the timer down one
function timerDown() {
  const timerElement = document.getElementById('timer');
  let currentTime = parseInt(timerElement.textContent);
  currentTime--;;
  timerElement.textContent = currentTime;
}

// Ends teh game and cleans the grid
function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(timerInterval); // Stop the timer
  activeTargetCell = null;

  // Victory reward

  const victoryMessage = ["Congratulations! You collected enough water cans!", "Great job, you've collected over 20 cans!", "Fabulous work. You reached the goal!"];
  const defeatMessage = ["Game Over! You did not collect enough water cans.", "Better luck next time! You didn't reach the goal.", "Keep trying! You need more water cans to win."];

  if (currentCans >= GOAL_CANS) {
    alert(victoryMessage[Math.floor(Math.random() * victoryMessage.length)]);
  } else {
    alert(defeatMessage[Math.floor(Math.random() * defeatMessage.length)]);
  }
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active

  // Resets the timer to 30
  const timerElement = document.getElementById('timer');
  let currentTime = parseInt(timerElement.textContent);
  currentTime = 30;
  timerElement.textContent = currentTime;

  clearInterval(spawnInterval);
  gameActive = true;
  currentCans = 0;
  document.getElementById('current-cans').textContent = currentCans;
  createGrid(); // Set up the game grid
  spawnInterval = setInterval(spawnWaterCan, 1000); // Spawn water cans every second
  timerInterval = setInterval(timerDown, 1000); // Update the timer every second
  
  // Ends game after timeOut is reached
  setTimeout(endGame, 30000);
  timerDown();
}



// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);

