<script setup lang="ts">
// STORES, IMPORTS, & COMPOSABLES
import { ref } from 'vue'

// REACTIVE VARIABLES
const searchBarRef = ref()
const searchBarQuery = ref<string>('')
const searchBarFocus = ref(false)
const { metaSymbol } = useShortcuts()

// Would be best if fetched from config file
const searchEngines = [
  { label: 'Brave', url: 'https://search.brave.com/search?q=', shortcut: 'b' },
  { label: 'Google', url: 'https://google.com/search?q=', shortcut: 'g' },
  { label: 'Reddit', url: 'https://www.reddit.com/search/?q=', shortcut: 'r' },
  { label: 'Youtube', url: 'https://www.youtube.com/results?search_query=', shortcut: 'yt' },
  { label: 'Youtube Music', url: 'https://music.youtube.com/search?q=', shortcut: 'ym' }
]

// FUNCTIONS
function setFocus (v: boolean) {
  searchBarFocus.value = v
  if (v) searchBarRef.value.$refs.input.focus()
}

function search () {
  let link = searchBarQuery.value
  for (const engine of searchEngines) {
    if (link.match(`^:${engine.shortcut} `)) {
      link = engine.url + link.replace(`:${engine.shortcut} `, '')
      break
    }
  }
  window.open(link, '_blank')
  searchBarQuery.value = ''
}

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => { setFocus(true) }
  }
})
</script>

<template>
  <div class="relative">
    <UInput
      ref="searchBarRef"
      v-model="searchBarQuery"
      placeholder="Search"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @keyup.enter="search"
    >
      <template #trailing>
        <UKbd>{{ metaSymbol }}+K</UKbd>
      </template>
    </UInput>
    <div
      v-if="searchBarFocus"
      class="absolute bg-dark pa-sm br-8"
      style="top: 35px;"
    >
      <div class="row">
        <div
          v-for="engine of searchEngines"
          :key="engine.shortcut"
          class="mr-sm"
        >
          <UTooltip :content="engine.label">
            <div :class="searchBarQuery.match(`^:${engine.shortcut} `) ? 'text-light' : 'text-label'">
              :{{ engine.shortcut }}
            </div>
          </UTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: absolute;
  top: 35px;
  left: 0;
}
</style>
