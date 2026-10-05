export const CARD_DEFINITIONS = [
  { pairId: 'king_c', name: 'Король Крести', image: './assets/cards/KC.svg' },
  { pairId: 'king_s', name: 'Король Пики', image: './assets/cards/KS.svg' },
  { pairId: 'king_h', name: 'Король Черви', image: './assets/cards/KH.svg' },
  { pairId: 'king_d', name: 'Король Бубны', image: './assets/cards/KD.svg' },
  { pairId: 'queen_s', name: 'Дама Пики', image: './assets/cards/QS.svg' },
  { pairId: 'queen_h', name: 'Дама Черви', image: './assets/cards/QH.svg' },
  { pairId: 'queen_c', name: 'Дама Крести', image: './assets/cards/QC.svg' },
  { pairId: 'queen_d', name: 'Дама Бубны', image: './assets/cards/QD.svg' },
];

export const CARD_BACK = './assets/cards/1B.svg';

export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateDeck() {
  const pairedCards = CARD_DEFINITIONS.flatMap((card) => [
    { ...card, isFlipped: false, isMatched: false },
    { ...card, isFlipped: false, isMatched: false },
  ]);

  return shuffle(pairedCards).map((card, index) => ({
    ...card,
    id: index,
  }));
}

export const gameState = {
  moves: 0,
  matchedPairs: 0,
  totalPairs: CARD_DEFINITIONS.length,
  firstCard: null,
  secondCard: null,
  isLocked: false,
  mismatchTimerId: null,
  cards: [],
};

export function resetGameState() {
  if (gameState.mismatchTimerId !== null) {
    clearTimeout(gameState.mismatchTimerId);
    gameState.mismatchTimerId = null;
  }

  gameState.moves = 0;
  gameState.matchedPairs = 0;
  gameState.firstCard = null;
  gameState.secondCard = null;
  gameState.isLocked = false;
  gameState.cards = generateDeck();
}
