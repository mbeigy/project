document.addEventListener('DOMContentLoaded', () => {
  const playerdice1 = document.getElementById('player-dice1');
  const playerdice2 = document.getElementById('player-dice2');
  const computerdice1 = document.getElementById('computer-dice1');
  const computerdice2 = document.getElementById('computer-dice2');
  const playerScoreDisplay = document.getElementById('player-score');
  const computerScoreDisplay = document.getElementById('computer-score');
  const rollButton = document.getElementById('roll-button');
  const resetButton = document.getElementById('reset-button');
  const winnerMessage = document.getElementById('winner-message');

  let playerScore = 0;
  let computerScore = 0;
  let rolls = 0;

  class Die {
      constructor() {
          this.value = 1;
      }

      roll() {
          this.value = Math.floor(Math.random() * 6) + 1;
          return this.value;
      }
  }

  function rollDice() {
      const playerdice1Value = new Die().roll();
      const playerdice2Value = new Die().roll();
      const computerdice1Value = new Die().roll();
      const computerdice2Value = new Die().roll();

      playerdice1.src = `images/dice${playerdice1Value}.png`;
      playerdice2.src = `images/dice${playerdice2Value}.png`;
      computerdice1.src = `images/dice${computerdice1Value}.png`;
      computerdice2.src = `images/dice${computerdice2Value}.png`;

      const playerRoundScore = calculateScore(playerdice1Value, playerdice2Value);
      const computerRoundScore = calculateScore(computerdice1Value, computerdice2Value);

      playerScore += playerRoundScore;
      computerScore += computerRoundScore;

      playerScoreDisplay.textContent = playerScore;
      computerScoreDisplay.textContent = computerScore;

      rolls++;
      if (rolls >= 3) {
          determineWinner();
      }
  }

  function calculateScore(dice1, dice2) {
      if (dice1 === 1 || dice2 === 1) {
          return 0;
      } else if (dice1 === dice2) {
          return (dice1 + dice2) * 2;
      } else {
          return dice1 + dice2;
      }
  }

  function determineWinner() {
      rollButton.disabled = true;
      if (playerScore > computerScore) {
          winnerMessage.textContent = 'Player Wins!';
      } else if (playerScore < computerScore) {
          winnerMessage.textContent = 'Computer Wins!';
      } else {
          winnerMessage.textContent = 'It\'s a Tie!';
      }
  }

  function resetGame() {
      playerScore = 0;
      computerScore = 0;
      rolls = 0;
      playerScoreDisplay.textContent = playerScore;
      computerScoreDisplay.textContent = computerScore;
      winnerMessage.textContent = '';
      rollButton.disabled = false;

      
      playerdice1.src = 'images/dice1.png';
      playerdice2.src = 'images/dice1.png';
      computerdice1.src = 'images/dice1.png';
      computerdice2.src = 'images/dice1.png';
  }

  rollButton.addEventListener('click', rollDice);
  resetButton.addEventListener('click', resetGame);
});
