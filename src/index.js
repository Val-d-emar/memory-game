import './styles/main.scss';
import { gameState, resetGameState } from './state.js';
import { createHeader } from './components/header.js';
import { createBoard } from './components/board.js';
import { initGame } from './services/gameLogic.js';

const board = createBoard();

let gameController = null;

const header = createHeader({
  onNewGame: () => {
    console.log('BTN: onNewGame');
    if (gameController) {
      gameController.startNewGame();
    }
  },
  onOpenLeaderboard: () => {
    console.log('BTN: onOpenLeaderboard');
  },
});

console.log('Число карт:', gameState.cards.length);
console.log('Ходы:', gameState.moves);
console.log('Пары:', gameState.matchedPairs);
console.log(
  'Раскладка:',
  gameState.cards.map((c) => c.name)
);

document.body.append(header.element, board.element);

gameController = initGame({
  header,
  board,
  callbacks: {
    onVictory: (totalMoves) => {
      console.log(`Поздравляем! Победа за ${totalMoves} ходов!`);
    },
  },
});
