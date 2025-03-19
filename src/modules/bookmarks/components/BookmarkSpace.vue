<script setup lang="ts">
import type { BookmarkSpace } from '../types'
import BookmarkCategory from './BookmarkCategory.vue'
import { Separator } from '@/components/ui/separator'

const { bookmarkSpace } = defineProps<{
  bookmarkSpace: BookmarkSpace
}>()
</script>

<template>
  <div class="p-2">
    <div
      v-for="(category, i) of bookmarkSpace.categories"
      :key="i"
    >
      <Separator
        v-if="i !== 0"
        class="my-2"
      />
      <BookmarkCategory :bookmark-category="category" />
    </div>
  </div>
</template>
