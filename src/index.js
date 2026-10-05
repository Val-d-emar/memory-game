import './styles/main.scss';
import { gameState, resetGameState } from './state.js';
import { createHeader } from './components/header.js';
import { createBoard } from './components/board.js';

resetGameState();

const header = createHeader({
  onNewGame: () => {
    console.log('BTN: onNewGame');
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

const board = createBoard();

board.renderCards(gameState.cards, (cardData) => {
  console.log(`Кликнули по карте [id=${cardData.id}]: ${cardData.name}`);
  const cardComponent = board.getCard(cardData.id);
  if (cardComponent) {
    cardComponent.flip();
  }
});

document.body.append(header.element, board.element);
