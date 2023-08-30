const getValue = (str: string) => {
  switch (str) {
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case 'T':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
    default:
      throw new Error(`Unexpected card rank: ${str}`);
  }
};

const sortRanks = (ranks: string[]) =>
  ranks.sort((a, b) => {
    const valueA = getValue(a);
    const valueB = getValue(b);
    if (valueA === valueB) {
      return 0;
    }
    return valueA > valueB ? -1 : 1;
  });

const filterObject = <V, T extends Record<string, V>>(obj: T, callback: (v: V) => boolean) => {
  const entries = Object.entries(obj);
  const filteredEntries = entries.filter(([_key, value]) => callback(value));
  return Object.fromEntries(filteredEntries);
};

export const getHand = (cards: string[]) => {
  const ranks = cards.map((card) => card[0]);
  const suits = cards.map((card) => card[1]);

  const suitCounts = suits.reduce(
    (counts, rank) => {
      const count = counts[rank] ?? 0;
      return { ...counts, [rank]: count + 1 };
    },
    {} as Record<string, number>,
  );

  const suitedCount = Object.keys(
    filterObject(suitCounts, (numCards: number) => numCards >= 2),
  ).length;

  const sortedRanks = sortRanks(ranks).join('');

  if ([...new Set(ranks)].length === 1) {
    return sortedRanks;
  }

  const suited = suitedCount === 0 ? 'o' : Array(suitedCount).fill('s').join('');
  return `${sortedRanks}${suited}`;
};
