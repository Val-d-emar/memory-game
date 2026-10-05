import { CARD_BACK } from '../state.js';

export function createCard(cardData, onClick) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', 'Карта рубашкой вверх');
  card.dataset.id = String(cardData.id);
  card.dataset.pairId = cardData.pairId;

  const cardInner = document.createElement('div');
  cardInner.classList.add('card__inner');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card__face', 'card__face--back');

  const backImg = document.createElement('img');
  backImg.classList.add('card__img');
  backImg.src = CARD_BACK;
  backImg.alt = 'Рубашка карты';
  backImg.loading = 'eager';

  cardBack.append(backImg);

  const cardFront = document.createElement('div');
  cardFront.classList.add('card__face', 'card__face--front');

  const frontImg = document.createElement('img');
  frontImg.classList.add('card__img');
  frontImg.src = cardData.image;
  frontImg.alt = cardData.name;
  frontImg.loading = 'eager';

  cardFront.append(frontImg);

  cardInner.append(cardBack, cardFront);
  card.append(cardInner);

  const triggerClick = () => {
    if (card.classList.contains('card--flipped') || card.classList.contains('card--matched')) {
      return;
    }
    if (typeof onClick === 'function') {
      onClick(cardData);
    }
  };

  card.addEventListener('click', triggerClick);

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      triggerClick();
    }
  });

  return {
    element: card,

    flip() {
      card.classList.add('card--flipped');
      card.setAttribute('aria-label', cardData.name);
    },

    unflip() {
      card.classList.remove('card--flipped');
      card.setAttribute('aria-label', 'Карта рубашкой вверх');
    },

    markMatched() {
      card.classList.add('card--matched');
      card.setAttribute('tabindex', '-1');
      card.setAttribute('aria-label', `${cardData.name} — пара найдена`);
    },

    isFlipped() {
      return card.classList.contains('card--flipped');
    },

    isMatched() {
      return card.classList.contains('card--matched');
    },
  };
}
