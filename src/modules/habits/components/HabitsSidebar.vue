<script setup lang="ts">
// #region IMPORTS AND INIT
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useHabitsStore } from '../stores/habits'
const habitsStore = useHabitsStore()
// #endregion

</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <div class="w-[200px]">
      <Select v-model="habitsStore.habitDisplayed">
        <SelectTrigger>
          <SelectValue placeholder="Select a habit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="overview"
              class="font-medium"
            >
              🌐 Overview - TODO
            </SelectItem>
            <SelectItem
              v-for="habit of habitsStore.habits"
              :key="habit.key"
              :value="habit.key"
              :class="{ 'font-bold': habitsStore.habitDisplayed === habit.key }"
            >
              {{ habitsStore.hexToEmo(habit.emoji) }} {{ habit.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div style="max-width: 500px">
      ici un select avec range et default options (last 365 days, this year, year selection based on records files available)
    </div>
  </div>
</template>
