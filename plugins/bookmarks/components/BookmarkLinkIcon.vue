<script setup lang="ts">
import { extractDomain } from '../composables/misc'
const { modelValue } = defineProps<{
  modelValue: string
}>()
</script>

<template>
  <UAvatar
    :src="`https://icons.duckduckgo.com/ip3/${extractDomain(modelValue)}.ico`"
    size="2xs"
    class="mr-sm"
  />
</template>
