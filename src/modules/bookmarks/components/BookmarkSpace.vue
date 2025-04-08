<script setup lang="ts">
import type { BookmarkSpace } from '../types'
import BookmarkCategory from './BookmarkCategory.vue'
import { Separator } from '@/components/ui/separator'

const { bookmarkSpace } = defineProps<{
  bookmarkSpace: BookmarkSpace
}>()
</script>

<template>
  <div class="grid grid-cols-2 p-2">
    <div
      v-for="(category, i) of bookmarkSpace.categories"
      :key="i"
      class="col-span-2 md:col-span-1 p-2"
    >
      <BookmarkCategory :bookmark-category="category" />
      <Separator
        class="my-2"
      />
    </div>
  </div>
</template>
