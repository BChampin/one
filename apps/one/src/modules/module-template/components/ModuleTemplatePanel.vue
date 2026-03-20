<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <section class="module-template-panel">
    <div class="text-h6 text-bold text-primary">
      {{ title ?? 'Module template panel' }}
    </div>
    <p class="q-mt-sm q-mb-none">
      {{ description ?? 'This is the reusable component exposed by the module.' }}
    </p>
  </section>
</template>
