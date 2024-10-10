import { useHabitContext } from './HabitContext';
import { Habit } from './types'

export default function HabitCard () {
  const { habits, gitRead } = useHabitContext();

  return (
    <div>
      {JSON.stringify(habits)}
    </div>
  )
}
