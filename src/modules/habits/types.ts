export interface Record {
  date: string;
  // String is let here for data
  [key: string]: unknown | undefined
}

export interface Habit {
  key: string;
  label: string;
  emoji: string;
  startDate?: string;
  endDate?: string;
}
