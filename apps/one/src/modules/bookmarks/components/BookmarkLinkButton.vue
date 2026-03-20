<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import { computed, ref, watch } from 'vue'

import type { BookmarkLink } from '../types'

const props = defineProps<{
  bookmark: BookmarkLink
}>()

const domain = computed(() => {
  try {
    return new URL(props.bookmark.url).hostname.replace(/^www\./i, '')
  } catch {
    return props.bookmark.url
  }
})

// const initial = computed(() => props.bookmark.label.trim().charAt(0).toUpperCase() || '?')

const faviconUrl = computed(() => `https://favicon.im/${domain.value}`)
const hasIconError = ref(false)

watch(domain, () => {
  hasIconError.value = false
})
</script>

<template>
  <Button
    as="a"
    :href="bookmark.url"
    target="_blank"
    rel="noreferrer noopener"
    outlined
    class="full-width"
  >
    <span class="row items-center full-width">
      <Avatar
        :image="hasIconError ? undefined : faviconUrl"
        shape="circle"
        size="normal"
        @error="hasIconError = true"
      />

      <span class="column text-left mx-md">
        <span class="text-bold">{{ bookmark.label }}</span>
        <span class="text-sm opacity-70">{{ domain }}</span>
      </span>

      <i class="pi pi-external-link ml-auto opacity-70" />
    </span>
  </Button>
</template>
