export const readingSpeeds = [
  { id: "slow", label: "Slow", wordsPerMinute: 150 },
  { id: "average", label: "Average", wordsPerMinute: 200 },
  { id: "fast", label: "Fast", wordsPerMinute: 250 },
] as const;

export type ReadingSpeedId = (typeof readingSpeeds)[number]["id"];
