<script setup lang="ts">
const props = defineProps<{
  for?: string
  content: string
  class?: string
}>()
</script>

<template>
  <label
    :for="props.for"
    :class="`text-body1 text-label ${props.class}`"
  >
    {{ content }}
  </label>
</template>
