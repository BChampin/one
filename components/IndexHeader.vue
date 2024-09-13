<script setup lang="ts">
import SearchBar from './SearchBar.vue'
</script>

<template>
  <div class="pa-sm flex items-center justify-between">
    <img src="/favicon.ico">
    <div class="text-primary flex items-center">
      <SearchBar />
      <div class="mx-md cursor-pointer">
        Login
      </div>
      <div>
        Know more
      </div>
    </div>
  </div>
</template>
