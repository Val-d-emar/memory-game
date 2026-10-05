const STORAGE_KEY = 'memory_game_leaderboard_jhfytdfdvthrbi';
const MAX_LEADERBOARD_ENTRIES = 10;

export function formatDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function getLeaderboard() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return [];
    }

    const parsed = JSON.parse(rawData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Ошибка чтения таблицы лидеров из localStorage:', error);
    return [];
  }
}

export function saveGameResult(moves) {
  const currentRecords = getLeaderboard();

  const newEntry = {
    moves: Number(moves),
    date: formatDate(new Date()),
    timestamp: Date.now(),
  };

  const updatedRecords = [...currentRecords, newEntry];

  updatedRecords.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }
    return a.timestamp - b.timestamp;
  });

  const topRecords = updatedRecords.slice(0, MAX_LEADERBOARD_ENTRIES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topRecords));
  } catch (error) {
    console.error('Ошибка сохранения результата в localStorage:', error);
  }

  return topRecords;
}
