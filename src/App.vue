<script setup lang="ts">
// #region IMPORTS AND INIT
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/navigation/NavigationBar.vue'
// #endregion

</script>

<template>
  <header>
    <NavigationBar />
  </header>

  <RouterView />
</template>
