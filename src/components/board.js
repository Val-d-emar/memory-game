import { createCard } from './card.js';

export function createBoard() {
  const main = document.createElement('main');
  main.classList.add('main');

  const board = document.createElement('section');
  board.classList.add('board');
  board.setAttribute('aria-label', 'Игровое поле');

  main.append(board);

  const cardInstances = new Map();

  return {
    element: main,

    renderCards(cardsData, onCardClick) {
      board.replaceChildren();
      cardInstances.clear();

      cardsData.forEach((cardData) => {
        const cardComponent = createCard(cardData, onCardClick);
        cardInstances.set(cardData.id, cardComponent);
        board.append(cardComponent.element);
      });
    },

    getCard(id) {
      return cardInstances.get(id);
    },
  };
}
