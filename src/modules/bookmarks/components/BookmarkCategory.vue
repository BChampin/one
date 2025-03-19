<script setup lang="ts">
import { ref } from 'vue'
import type { BookmarkCategory } from '../types'
import BookmarkLink from './BookmarkLink.vue'

const { bookmarkCategory } = defineProps<{
  bookmarkCategory: BookmarkCategory
}>()

const hoveringBookmarkLabel = ref(null)
</script>

<template>
  <div>
    <div>
      {{ bookmarkCategory.name }}
      <span
        v-if="hoveringBookmarkLabel"
        class="text-sm text-primary"
      >
        -
        {{ hoveringBookmarkLabel }}
      </span>
    </div>
    <div class="flex flex-row flex-wrap p-2 gap-2">
      <div
        v-for="(link, i) of bookmarkCategory.links"
        :key="i"
      >
        <BookmarkLink
          :bookmark-link="link"
          @hover="hoveringBookmarkLabel = $event"
        />
      </div>
    </div>
  </div>
</template>
