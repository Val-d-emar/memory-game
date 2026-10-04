import { gameState, resetGameState } from './state.js';
import { createHeader } from './components/header.js';

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
