'use client';

import React, { useContext, useEffect, useState } from 'react';
import { HabitContext } from './HabitContext';
import { GitContext } from '@/context/Git';
import { Habit } from './types'

interface HabitProviderProps {
  children: React.ReactNode;
}

const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
  const { gitRead } = useContext(GitContext);
  const [habits, setHabits] = useState<Habit[]>([]);
  // const [currentSpace, setCurrentSpace] = useState<Habit | null>(null);

  // const selectFirst = () => {
  //   if (spaces && spaces[0]) setCurrentSpace(spaces[0])
  // }

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await gitRead('habits/habits.json');
      console.log(habits)
      setHabits(habits);
      // selectFirst()
    };
    fetchHabits();
  }, [gitRead]);

  return (
    <HabitContext.Provider value={{
      habits,
      // currentSpace,
      // setCurrentSpace,
      gitRead,
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export default HabitProvider;
