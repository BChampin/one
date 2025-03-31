<script setup lang="ts">
// #region IMPORTS AND INIT
import { onMounted } from 'vue'
import { useOneStore } from '@/stores/one'
const oneStore = useOneStore()
// #endregion

// Try loading existing instance
onMounted(() => {
  oneStore.loadProviderFromStorage()
})
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div class="w-full max-w-sm">
      Loading Oauth connection ...
    </div>
  </div>
</template>
