import './styles/main.scss';
import { gameState } from './state.js';
import { createBoard } from './components/board.js';
import { createHeader } from './components/header.js';
import { createModal } from './components/modal.js';
import { initGame } from './services/gameLogic.js';
import { formatDate, getLeaderboard, saveGameResult } from './services/storage.js';

console.log('Текущая дата ДД.ММ.ГГГГ:', formatDate());
console.log('Таблица лидеров до сохранения:', getLeaderboard());

localStorage.removeItem('memory_game_leaderboard_jhfytdfdvthrbi');

saveGameResult(18);
saveGameResult(12);
saveGameResult(18);

console.log('--- Проверка таблицы лидеров ---');
console.table(getLeaderboard());

const modal = createModal();

const board = createBoard();

let gameController = null;

function showTestModal() {
  const container = document.createElement('div');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'модалка';

  const text = document.createElement('p');
  text.classList.add('modal__text');
  text.textContent = 'Это модальное окно.';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.classList.add('btn');
  closeBtn.textContent = 'Закрыть';
  closeBtn.addEventListener('click', () => modal.close());

  container.append(title, text, closeBtn);
  modal.open(container);
}

const header = createHeader({
  onNewGame: () => {
    console.log('BTN: onNewGame');
    if (gameController) {
      gameController.startNewGame();
    }
  },
  onOpenLeaderboard: () => {
    console.log('BTN: onOpenLeaderboard');
    showTestModal();
  },
});

console.log('Число карт:', gameState.cards.length);
console.log('Ходы:', gameState.moves);
console.log('Пары:', gameState.matchedPairs);
console.log(
  'Раскладка:',
  gameState.cards.map((c) => c.name)
);

document.body.append(header.element, board.element, modal.element);

gameController = initGame({
  header,
  board,
  callbacks: {
    onVictory: (totalMoves) => {
      console.log(`Поздравляем! Победа за ${totalMoves} ходов!`);
    },
  },
});
