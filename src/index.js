import './styles/main.scss';
import { createBoard } from './components/board.js';
import { createHeader } from './components/header.js';
import { createModal } from './components/modal.js';
import { createLeaderboardContent, createVictoryContent } from './components/modalViews.js';
import { initGame } from './services/gameLogic.js';
import { getLeaderboard, saveGameResult } from './services/storage.js';

const modal = createModal();

const board = createBoard();

let gameController = null;

function openLeaderboardModal() {
  const records = getLeaderboard();
  const content = createLeaderboardContent({
    records,
    onClose: () => modal.close(),
  });
  modal.open(content);
}

const header = createHeader({
  onNewGame: () => {
    if (gameController) {
      gameController.startNewGame();
    }
  },
  onOpenLeaderboard: () => {
    openLeaderboardModal();
  },
});

document.body.append(header.element, board.element, modal.element);

gameController = initGame({
  header,
  board,
  callbacks: {
    onVictory: (totalMoves) => {
      saveGameResult(totalMoves);

      const victoryContent = createVictoryContent({
        moves: totalMoves,
        onNewGame: () => {
          modal.close();
          gameController.startNewGame();
        },
        onClose: () => {
          modal.close();
        },
      });

      modal.open(victoryContent);
    },
  },
});
