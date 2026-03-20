<script setup lang="ts">
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'

import BookmarkCategoryCard from './BookmarkCategoryCard.vue'
import type { BookmarkSpace } from '../types'

defineProps<{
  spaces: BookmarkSpace[]
}>()
</script>

<template>
  <TabView v-if="spaces.length">
    <TabPanel
      v-for="space in spaces"
      :key="space.label"
      :header="space.label"
      :value="space.label"
    >
      <div class="column gutter-y-md">
        <div class="row wrap gutter-md">
          <BookmarkCategoryCard
            v-for="category in space.categories"
            :key="`${space.label}-${category.label}`"
            :category="category"
          />
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>
