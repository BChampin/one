<script setup lang="ts">
import { computed } from 'vue'
import type { BookmarkLink } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { extractDomain } from '../utils'

const emit = defineEmits(['hover'])

const { bookmarkLink } = defineProps<{
  bookmarkLink: BookmarkLink
}>()

const bookmarkDomain = computed(() => extractDomain(bookmarkLink.url))

const bookmarkFallback = computed(() => {
  if (bookmarkLink.name) return bookmarkLink.name.slice(0.1)
  else return (bookmarkDomain.value ?? 'X').slice(0.1)
})

const bookmarkLabel = computed(() => {
  if (bookmarkLink.name) return bookmarkLink.name
  else return bookmarkLink.url
})

// Possible sources for icons resolutions
// - Google : `https://www.google.com/s2/favicons?sz=64&domain=${bookmarkDomain.value}`
// - DuckDuckGo : `https://icons.duckduckgo.com/ip3/${bookmarkDomain.value}.ico`
// - Superdense : `https://fdn.superdense.com/${bookmarkDomain.value}/favicon.png`
// - Domain : `https://${bookmarkDomain.value}/favicon.ico`
const bookmarkImage = computed(() => `https://www.google.com/s2/favicons?sz=64&domain=${bookmarkDomain.value}`)
</script>

<template>
  <a
    :href="bookmarkLink.url"
    target="_blank"
    @mouseover="emit('hover', bookmarkLabel)"
    @mouseleave="emit('hover', null)"
  >
    <Avatar class="h-[30px] w-[30px]">
      <AvatarImage
        :src="bookmarkImage"
        :alt="bookmarkFallback"
      />
      <AvatarFallback>{{ bookmarkFallback }}</AvatarFallback>
    </Avatar>
  </a>
</template>
