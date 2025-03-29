import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Habit, Record } from '../types'
import { useOneStore } from '@/stores/one'

export const useHabitsStore = defineStore('habits', () => {
  const oneStore = useOneStore()

  // # Habits
  const habits = ref<Habit[]>()

  const getHabits = async () => {
    const fileName = 'habits/habits.json'
    const rq = await oneStore.read(fileName)
    habits.value = rq as Habit[]
    return habits.value
  }

  const hexToEmo = (hex: string = '2753') => {
    // Ensure compounded emojis are rendered - https://stackoverflow.com/a/72563636
    try {
      return (typeof hex === 'string' ? hex : '1f381').split('-').map(e => String.fromCodePoint(Number(`0x${e}`))).join('')
    } catch (e) {}
  }

  const habitDisplayed = ref('overview')

  // # Records
  const records = ref<Record[]>()

  const getRecords = async (year = new Date().getFullYear()) => {
    const rq = await oneStore.read(`habits/${year}.json`)
    return rq as Record[]
  }

  // const listRecords = async () => {
  //   const records = import.meta.glob('../public/oneData/habits')
  //   console.log(records)
  // }

  // # Main
  const initStore = async () => {
    await getHabits()
    // await listRecords()
  }


  return {
    habits,
    habitDisplayed,
    hexToEmo,
    initStore
  }
})
