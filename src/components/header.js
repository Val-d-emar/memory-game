export function createHeader({ onNewGame, onOpenLeaderboard }) {
  const header = document.createElement('header');
  header.classList.add('header');

  const container = document.createElement('div');
  container.classList.add('header__container');

  const title = document.createElement('h1');
  title.classList.add('header__title');
  title.textContent = 'Memory Game';

  const controls = document.createElement('div');
  controls.classList.add('header__controls');

  const newGameBtn = document.createElement('button');
  newGameBtn.type = 'button';
  newGameBtn.classList.add('btn', 'btn--new-game');
  newGameBtn.setAttribute('aria-label', 'Начать новую игру');
  newGameBtn.textContent = 'Новая игра';
  if (typeof onNewGame === 'function') {
    newGameBtn.addEventListener('click', onNewGame);
  }

  const leaderboardBtn = document.createElement('button');
  leaderboardBtn.type = 'button';
  leaderboardBtn.classList.add('btn', 'btn--leaderboard');
  leaderboardBtn.setAttribute('aria-label', 'Открыть таблицу лидеров');
  leaderboardBtn.textContent = 'Таблица лидеров';
  if (typeof onOpenLeaderboard === 'function') {
    leaderboardBtn.addEventListener('click', onOpenLeaderboard);
  }

  controls.append(newGameBtn, leaderboardBtn);

  const stats = document.createElement('div');
  stats.classList.add('header__stats');

  const movesStat = document.createElement('div');
  movesStat.classList.add('stat', 'stat--moves');

  const movesLabel = document.createElement('span');
  movesLabel.classList.add('stat__label');
  movesLabel.textContent = 'Ходы: ';

  const movesValue = document.createElement('span');
  movesValue.classList.add('stat__value');
  movesValue.textContent = '0';

  movesStat.append(movesLabel, movesValue);

  const pairsStat = document.createElement('div');
  pairsStat.classList.add('stat', 'stat--pairs');

  const pairsLabel = document.createElement('span');
  pairsLabel.classList.add('stat__label');
  pairsLabel.textContent = 'Пары: ';

  const pairsValue = document.createElement('span');
  pairsValue.classList.add('stat__value');
  pairsValue.textContent = '0 из 8';

  pairsStat.append(pairsLabel, pairsValue);

  stats.append(movesStat, pairsStat);

  container.append(title, controls, stats);
  header.append(container);

  return {
    element: header,

    updateMoves(count) {
      movesValue.textContent = String(count);
    },

    updatePairs(count, total = 8) {
      pairsValue.textContent = `${count} из ${total}`;
    },
  };
}
