<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<template>
  <kbd class="br-8 bd-grey pa-xs text-small">
    {{ value }}
  </kbd>
</template>
