<script setup lang="ts">
const { keys } = defineProps<{
  keys: string
}>()
</script>

<template>
  <kbd
    class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
  >
    <!-- <span class="text-sm">⌘</span>J -->
    {{ keys }}
  </kbd>
</template>
