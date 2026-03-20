<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'

import PowerBar from '@/components/PowerBar.vue'
import AppNavigationList from '@/components/navigation/AppNavigationList.vue'
import { useOne } from '@/plugins/one'
import { useKb } from '@/composables/useKb'
import type { OneModuleRoute } from '@/plugins/one'

const one = useOne()
const router = useRouter()
const drawerOpen = ref(false)
const isMobile = ref(false)
const powerBarRef = ref<InstanceType<typeof PowerBar> | null>(null)

let mobileQuery: MediaQueryList | null = null

function syncMobileState() {
  isMobile.value = mobileQuery?.matches ?? false

  if (!isMobile.value) {
    drawerOpen.value = false
  }
}

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 768px)')
  syncMobileState()
  mobileQuery.addEventListener('change', syncMobileState)
})

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener('change', syncMobileState)
})

const mainRoutes = computed(() => one.loadedRoutes.filter((route) => route.main))

const shortcutBindings = computed(() =>
  mainRoutes.value
    .filter(
      (route): route is OneModuleRoute & { shortcut: string } => typeof route.shortcut === 'string',
    )
    .map((route) => ({
      shortcut: route.shortcut,
      handler: () => router.push({ name: route.name }),
      preventDefault: true,
    })),
)

const keyboardBindings = computed(() => [
  ...shortcutBindings.value,
  {
    shortcut: 'Ctrl+K',
    handler: () => powerBarRef.value?.toggleFocus(),
    preventDefault: true,
  },
])

useKb(keyboardBindings)

function closeDrawerIfNeeded() {
  if (isMobile.value) {
    drawerOpen.value = false
  }
}

function onTitleClick(event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  closeDrawerIfNeeded()
}
</script>

<template>
  <Drawer
    v-if="isMobile"
    v-model:visible="drawerOpen"
    modal
    dismissable
    position="left"
    class="one-drawer"
  >
    <div class="column gutter-y-md pa-md">
      <RouterLink
        class="text-h5 text-bold text-primary text-decoration-none"
        to="/"
        @click="onTitleClick"
      >
        One
      </RouterLink>

      <AppNavigationList
        :routes="mainRoutes"
        :show-shortcuts="false"
        @select="closeDrawerIfNeeded"
      />
    </div>
  </Drawer>

  <div class="row no-wrap full-height">
    <aside v-if="!isMobile" class="column gutter-y-md pa-md">
      <div class="column gutter-y-md">
        <RouterLink class="text-h5 text-bold text-primary text-decoration-none" to="/">
          One
        </RouterLink>

        <AppNavigationList :routes="mainRoutes" :show-shortcuts="true" />
      </div>
    </aside>

    <div class="col-grow column">
      <header class="row items-center justify-between pa-sm gutter-x-md">
        <div v-if="isMobile" class="row items-center gutter-x-sm">
          <Button
            icon="pi pi-bars"
            text
            rounded
            aria-label="Open navigation"
            @click="drawerOpen = true"
          />
          <RouterLink class="text-h4 text-bold text-primary text-decoration-none" to="/">
            One
          </RouterLink>
        </div>
        <div v-else />

        <PowerBar v-if="one.ready" ref="powerBarRef" />
      </header>

      <main class="pa-sm">
        <RouterView />
      </main>
    </div>
  </div>
</template>
