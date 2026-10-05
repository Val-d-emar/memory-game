import { gameState, resetGameState } from '../state.js';

const MISMATCH_DELAY_MS = 1499;

export function initGame({ header, board, callbacks = {} }) {
  function handleCardClick(cardData) {
    if (gameState.isLocked) {
      return;
    }

    const cardComponent = board.getCard(cardData.id);
    if (!cardComponent) {
      return;
    }

    if (cardComponent.isFlipped() || cardComponent.isMatched()) {
      return;
    }

    if (!gameState.firstCard) {
      gameState.firstCard = cardData;
      cardComponent.flip();
      return;
    }

    if (gameState.firstCard.id === cardData.id) {
      return;
    }

    gameState.secondCard = cardData;
    cardComponent.flip();

    gameState.moves += 1;
    header.updateMoves(gameState.moves);

    const isMatch = gameState.firstCard.pairId === gameState.secondCard.pairId;

    if (isMatch) {
      handleMatch();
    } else {
      handleMismatch();
    }
  }

  function handleMatch() {
    const firstComp = board.getCard(gameState.firstCard.id);
    const secondComp = board.getCard(gameState.secondCard.id);

    if (firstComp) firstComp.markMatched();
    if (secondComp) secondComp.markMatched();

    gameState.matchedPairs += 1;
    header.updatePairs(gameState.matchedPairs, gameState.totalPairs);

    gameState.firstCard = null;
    gameState.secondCard = null;

    if (gameState.matchedPairs === gameState.totalPairs) {
      gameState.isLocked = true;
      if (typeof callbacks.onVictory === 'function') {
        callbacks.onVictory(gameState.moves);
      }
    }
  }

  function handleMismatch() {
    gameState.isLocked = true;

    const firstId = gameState.firstCard.id;
    const secondId = gameState.secondCard.id;

    gameState.mismatchTimerId = setTimeout(() => {
      const firstComp = board.getCard(firstId);
      const secondComp = board.getCard(secondId);

      if (firstComp) firstComp.unflip();
      if (secondComp) secondComp.unflip();

      gameState.firstCard = null;
      gameState.secondCard = null;
      gameState.isLocked = false;
      gameState.mismatchTimerId = null;
    }, MISMATCH_DELAY_MS);
  }

  function startNewGame() {
    resetGameState();

    header.updateMoves(gameState.moves);
    header.updatePairs(gameState.matchedPairs, gameState.totalPairs);

    board.renderCards(gameState.cards, handleCardClick);
  }

  startNewGame();

  return {
    startNewGame,
  };
}
