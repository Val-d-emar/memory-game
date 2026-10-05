export function createVictoryContent({ moves, onNewGame, onClose }) {
  const container = document.createElement('div');
  container.classList.add('modal__view', 'modal__view--victory');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Победа!';

  const text = document.createElement('p');
  text.classList.add('modal__text');
  text.textContent = `Поздравляем! Вы нашли все 8 пар за ${moves} ходов.`;

  const actions = document.createElement('div');
  actions.classList.add('modal__actions');

  const newGameBtn = document.createElement('button');
  newGameBtn.type = 'button';
  newGameBtn.classList.add('btn', 'btn--primary');
  newGameBtn.textContent = 'Новая игра';
  newGameBtn.addEventListener('click', onNewGame);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.classList.add('btn', 'btn--secondary');
  closeBtn.textContent = 'Закрыть';
  closeBtn.addEventListener('click', onClose);

  actions.append(newGameBtn, closeBtn);
  container.append(title, text, actions);

  return container;
}

export function createLeaderboardContent({ records, onClose }) {
  const container = document.createElement('div');
  container.classList.add('modal__view', 'modal__view--leaderboard');

  const title = document.createElement('h2');
  title.classList.add('modal__title');
  title.textContent = 'Таблица лидеров';

  if (!records || records.length === 0) {
    const emptyText = document.createElement('p');
    emptyText.classList.add('modal__text', 'modal__text--empty');
    emptyText.textContent = 'Пока нет результатов';
    container.append(title, emptyText);
  } else {
    const table = document.createElement('table');
    table.classList.add('leaderboard-table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    ['Место', 'Ходы', 'Дата'].forEach((colName) => {
      const th = document.createElement('th');
      th.textContent = colName;
      headerRow.append(th);
    });
    thead.append(headerRow);

    const tbody = document.createElement('tbody');
    records.forEach((record, index) => {
      const row = document.createElement('tr');

      const rankCell = document.createElement('td');
      rankCell.textContent = String(index + 1);

      const movesCell = document.createElement('td');
      movesCell.textContent = String(record.moves);

      const dateCell = document.createElement('td');
      dateCell.textContent = record.date;

      row.append(rankCell, movesCell, dateCell);
      tbody.append(row);
    });

    table.append(thead, tbody);
    container.append(title, table);
  }

  const actions = document.createElement('div');
  actions.classList.add('modal__actions');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.classList.add('btn', 'btn--secondary');
  closeBtn.textContent = 'Закрыть';
  closeBtn.addEventListener('click', onClose);

  actions.append(closeBtn);
  container.append(actions);

  return container;
}
