import './styles/main.scss';
import { gameState, resetGameState } from './state.js';
import { createHeader } from './components/header.js';
import { createCard } from './components/card.js';

resetGameState();

const header = createHeader({
  onNewGame: () => {
    console.log('BTN: onNewGame');
  },
  onOpenLeaderboard: () => {
    console.log('BTN: onOpenLeaderboard');
  },
});

document.body.append(header.element);

console.log('Число карт:', gameState.cards.length);
console.log('Ходы:', gameState.moves);
console.log('Пары:', gameState.matchedPairs);
console.log(
  'Раскладка:',
  gameState.cards.map((c) => c.name)
);

const testCard = createCard(gameState.cards[0], (data) => {
  console.log('CLK:', data.name);
  testCard.flip();
});
document.body.append(testCard.element);
