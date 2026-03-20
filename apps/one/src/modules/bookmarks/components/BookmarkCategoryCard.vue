<script setup lang="ts">
import Card from 'primevue/card'

import BookmarkLinkButton from './BookmarkLinkButton.vue'
import type { BookmarkCategory } from '../types'

defineProps<{
  category: BookmarkCategory
}>()
</script>

<template>
  <Card class="col-12 col-sm-6 col-lg-4">
    <template #title>
      <div class="text-h6 text-bold">{{ category.label }}</div>
    </template>

    <template #content>
      <div v-if="category.links.length" class="column gutter-y-sm">
        <BookmarkLinkButton
          v-for="bookmark in category.links"
          :key="`${category.label}-${bookmark.url}`"
          :bookmark="bookmark"
        />
      </div>

      <div v-else class="text-sm opacity-70">
        No links yet.
      </div>
    </template>
  </Card>
</template>
