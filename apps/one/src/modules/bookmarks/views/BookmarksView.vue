<script setup lang="ts">
import Card from 'primevue/card'

import BookmarkSpaceTabs from '../components/BookmarkSpaceTabs.vue'
import { bookmarksState } from '../state'
</script>

<template>
  <section class="column gutter-y-md pa-md">
    <div class="column gutter-y-xs">
      <h1 class="text-h4 text-bold">Bookmarks</h1>
      <p class="opacity-70">
        File-backed bookmark spaces, categories, and links loaded from
        <code>oneData/bookmarks/bookmarks.md</code>.
      </p>
    </div>

    <Card v-if="bookmarksState.loading && !bookmarksState.spaces.length">
      <template #content>
        Loading bookmarks...
      </template>
    </Card>

    <Card v-else-if="bookmarksState.error">
      <template #title>
        Unable to load bookmarks
      </template>
      <template #content>
        {{ bookmarksState.error }}
      </template>
    </Card>

    <Card v-else-if="!bookmarksState.spaces.length">
      <template #content>
        No bookmarks were found in the file.
      </template>
    </Card>

    <BookmarkSpaceTabs
      v-else
      :spaces="bookmarksState.spaces"
    />
  </section>
</template>
