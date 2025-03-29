<script setup lang="ts">
// #region IMPORTS AND INIT
import { useHabitsStore } from '../stores/habits'
import { onMounted } from 'vue'
import HabitsSidebar from '../components/HabitsSidebar.vue'
import HabitsHeatmap from '../components/HabitsHeatmap.vue'
const habitsStore = useHabitsStore()
// #endregion

onMounted(async () => {
  await habitsStore.initStore()
})
</script>

<template>
  <div>
    Habits view is here
    <div class="row">
      <HabitsSidebar />
    </div>
    <div class="row">
      <HabitsHeatmap
        class="w-full"
        :year="2024"
      />
    </div>
  </div>
</template>
