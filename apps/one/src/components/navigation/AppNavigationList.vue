<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import Kbd from '@/components/core/Kbd.vue'
import type { OneModuleRoute } from '@/plugins/one'

const props = defineProps<{
  routes: OneModuleRoute[]
  showShortcuts?: boolean
}>()

const emit = defineEmits<{
  select: [route: OneModuleRoute]
}>()

function resolveTo(route: OneModuleRoute): RouteLocationRaw {
  return { name: route.name }
}

function isPrimaryClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

function onRouteClick(event: MouseEvent, navigate: () => void, route: OneModuleRoute) {
  if (!isPrimaryClick(event)) return

  event.preventDefault()
  navigate()
  emit('select', route)
}
</script>

<template>
  <div class="column gutter-y-xs">
    <RouterLink
      v-for="route in props.routes"
      :key="String(route.name)"
      :to="resolveTo(route)"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <a
        :href="href"
        class="full-width pa-sm br-8 text-text text-decoration-none cursor-pointer row justify-between items-center"
        :class="{ 'bg-disabled': isActive }"
        @click="onRouteClick($event, navigate, route)"
      >
        <span class="text-bold">{{ route.label }}</span>
        <Kbd v-if="props.showShortcuts && route.shortcut" :value="route.shortcut" />
      </a>
    </RouterLink>
  </div>
</template>
