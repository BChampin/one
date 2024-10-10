import { createContext, useContext } from 'react';
import { GitContext } from '@/context/Git';
import { HabitContextType } from './types'

const HabitContext = createContext<HabitContextType | null>(null);

const useHabitContext = () => {
  const gitContext = useContext(GitContext);
  const habitState = useContext(HabitContext);

  if (!gitContext || !habitState) {
    throw new Error('HabitContext must be used within a HabitProvider');
  }

  return {
    ...habitState,
    gitRead: gitContext.gitRead,
  };
};

export { HabitContext, useHabitContext };
