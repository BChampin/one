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



// React added below
export interface HabitState {
  habits: Habit[];
}

export interface HabitContextType {
  habits: Habit[];
  // spaces: string[];
  // currentSpace: BookmarkSpace | null
  // setCurrentSpace: (path: string) => Promise<string>;
  gitRead: (path: string) => Promise<string>;
}
