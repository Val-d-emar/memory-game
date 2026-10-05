import './styles/main.scss';
import { createBoard } from './components/board.js';
import { createHeader } from './components/header.js';
import { createModal } from './components/modal.js';
import { createLeaderboardContent, createVictoryContent } from './components/modalViews.js';
import { initGame } from './services/gameLogic.js';
import { formatDate, getLeaderboard, saveGameResult } from './services/storage.js';

console.log('Текущая дата ДД.ММ.ГГГГ:', formatDate());
console.log('Таблица лидеров до сохранения:', getLeaderboard());

localStorage.removeItem('memory_game_leaderboard_jhfytdfdvthrbi');

saveGameResult(22);
saveGameResult(11);
saveGameResult(18);
saveGameResult(19);
saveGameResult(12);
saveGameResult(67);
saveGameResult(17);
saveGameResult(16);
saveGameResult(29);
saveGameResult(38);
saveGameResult(42);
saveGameResult(68);

console.log('--- Проверка таблицы лидеров ---');
console.table(getLeaderboard());

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
