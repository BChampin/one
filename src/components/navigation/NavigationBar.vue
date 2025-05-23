<script setup lang="ts">
// #region IMPORTS AND INIT
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import PowerBar from '@/components/navigation/PowerBar.vue'
import ThemeButton from '@/components/navigation/ThemeButton.vue'
import KbdButton from '@/components/atoms/KbdButton.vue'
import { useOneStore } from '@/stores/one'
import type { RouteType } from '@/types'

const oneStore = useOneStore()
const router = useRouter()

const displayedRoutes = computed<RouteType[]>(() => {
  if (!oneStore.loggedIn) {
    return [
      { label: 'Home', name: 'home', shortcut: null },
      { label: 'Login', name: 'login', shortcut: null },
    ] as unknown as RouteType[]
  } else {
    const appRoutes = (router.getRoutes().find(r => r.name === 'app') ?? { children: [] }).children
    const loggedInRoutes = [{ label: 'Home', name: 'app', shortcut: 'Ctrl+H' }]
    // loggedInRoutes.concat(appRoutes)
    for (const child of appRoutes) loggedInRoutes.push(Object(child))
    return loggedInRoutes as RouteType[]
  }
})

function logout () {
  oneStore.resetProvider()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex items-center justify-between">
    <NavigationMenu class="p-2">
      <NavigationMenuList>
        <NavigationMenuItem
          v-for="(route, i) of displayedRoutes"
          :key="i"
        >
          <NavigationMenuLink as-child>
            <RouterLink
              :to="{ name: route.name }"
              :class="navigationMenuTriggerStyle()"
            >
              <span class="mr-2">
                {{ route.label }}
              </span>
              <KbdButton
                v-if="route.shortcut"
                :keys="route.shortcut"
                :callback="() => router.push(route)"
              />
            </RouterLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>


    <div class="flex items-center justify-end gap-x-2 pr-2">
      <PowerBar />
      <ThemeButton />
      <Button
        v-if="oneStore.loggedIn"
        @click="logout"
      >
        Logout
      </Button>
    </div>
  </div>
</template>
