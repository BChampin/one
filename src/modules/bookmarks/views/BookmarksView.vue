<script setup lang="ts">
import { onMounted } from 'vue'
const bookmarkStore = useBookmarksStore()
import { useBookmarksStore } from '../stores/bookmarks'
import BookmarkSpace from '../components/BookmarkSpace.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

onMounted(async () => {
  await bookmarkStore.getBookmarks()
})
</script>

<template>
  <div>
    <Tabs :default-value="0">
      <TabsList>
        <TabsTrigger
          v-for="(space, i) of bookmarkStore.spaces"
          :key="i"
          :value="i"
        >
          {{ space.name }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="(space, i) of bookmarkStore.spaces"
        :key="i"
        :value="i"
      >
        <BookmarkSpace :bookmark-space="space" />
      </TabsContent>
    </Tabs>
  </div>
</template>
