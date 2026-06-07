export function shuffle(list: string[]) {
  const arr = [...list];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function getUniqueNames(names: string[]) {
  return [...new Set(names.map((name) => name.trim()))].filter(Boolean);
}

export function getBlockedPeople(history: string[]) {
  return history.flatMap((record) =>
    record.split(" × ").map((name) => name.trim())
  );
}

export function getAvailableNames(names: string[], history: string[]) {
  const uniqueNames = getUniqueNames(names);
  const blockedSet = new Set(getBlockedPeople(history));

  return uniqueNames.filter((name) => !blockedSet.has(name));
}

export function createHistoryRecord(winners: string[]) {
  return winners.join(" × ");
}