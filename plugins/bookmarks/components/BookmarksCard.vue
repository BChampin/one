<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useBookmarksStore } from '../store'
import type { BookmarkSpace, BookmarkCategory, BookmarkLink, BookmarkLinkModalType } from '../types'
import BookmarkLinkComponent from './BookmarkLinkComponent.vue'
import BookmarkLinkModal from './BookmarkLinkModal.vue'

const bookmarksStore = useBookmarksStore()
await bookmarksStore.read()

const firstSpace = bookmarksStore.bookmarks[0]
if (firstSpace) bookmarksStore.setCurrentBookmarkSpace(firstSpace)

const currentBookmarkSpace = computed(() => bookmarksStore.currentBookmarkSpace)
const mappedNavigation = computed(() => {
  return bookmarksStore.bookmarks.map((space: BookmarkSpace) => {
    return {
      label: space.name,
      icon: `ph:${space.icon}`,
      active: currentBookmarkSpace.value.name === space.name,
      badge: space.categories.reduce((acc, cat) => acc + cat.links.length, 0),
      click: () => bookmarksStore.setCurrentBookmarkSpace(space)
    }
  })
})


// Editing
const showEditBtn = ref('')
const editingCategory : Ref<BookmarkCategory | null> = ref(null)
function setEditingCategory (category: BookmarkCategory | null) {
  if (!editingCategory.value) editingCategory.value = category
  else if (editingCategory.value === category) editingCategory.value = null
  else editingCategory.value = category
}

async function saveBookmarks () {
  setEditingCategory(null)
  showEditBtn.value = ''
  await bookmarksStore.update()
}

const bookmarkLinkModalRef : Ref<BookmarkLink | null> = ref(null)
const bookmarkLinkModalType : Ref<BookmarkLinkModalType | null> = ref(null)
</script>

<template>
  <UCard class="w-full br-25 bd-grey">
    <div class="flex items-center justify-between">
      <div class="flex items-baseline">
        <div class="text-h4">
          Bookmarks
        </div>
        <div
          v-if="bookmarksStore.saveToast"
          class="text-italic text-positive ml-sm"
        >
          Saved !
        </div>
      </div>
      <div>
        <UHorizontalNavigation :links="mappedNavigation" />
      </div>
    </div>

    <div v-if="!bookmarksStore.needToSetupPlugin" class="flex no-wrap mt-md justify-between gutter-x-md">
      <div class="text-italic text-label">
        It seems this plugin has never been used or cannot reach the bookmarks files correctly. Would you like to try to setup the plugin ?
      </div>
      <UButton
        label="Setup plugin"
        @click="bookmarksStore.firstPluginSetup()"
      />
    </div>

    <div v-if="currentBookmarkSpace" class="row">
      <div
        v-for="(category, iCat) of currentBookmarkSpace.categories"
        :key="iCat"
        class="col-12 col-md-6 pa-md mt-md"
      >
        <div
          class="row text-h5 mb-sm"
          @mouseover="showEditBtn = `btn_edit_cat_${category.name}`"
          @mouseleave="showEditBtn = ''"
        >
          <UButtonGroup
            v-if="editingCategory === category"
            orientation="horizontal"
            size="md"
          >
            <UInput
              v-model="category.name"
              label="Category name"
              placeholder="Category name"
              @keyup.enter="saveBookmarks()"
            />
            <UButton
              icon="ph:floppy-disk"
              @click="saveBookmarks()"
            />
          </UButtonGroup>
          <span v-else>
            {{ category.name }}
          </span>
          <UButton
            :ref="`btn_edit_cat_${category.name}`"
            v-if="showEditBtn === `btn_edit_cat_${category.name}`"
            :padded="false"
            variant="link"
            :icon="`ph:${editingCategory === category ? 'x' : 'pencil-simple'}`"
            class="ml-sm"
            @click="setEditingCategory(category)"
          />
        </div>
        <div
          class="row gutter-md mb-sm"
          style="min-height: 48px;"
          @mouseover="showEditBtn = `btn_add_cat_${category.name}`"
          @mouseleave="showEditBtn = ''"
        >
          <div
            v-for="(link, iLink) of category.links"
            :key="iLink"
          >
            <BookmarkLinkComponent
              v-model="category.links[iLink]"
              @update:model-value="saveBookmarks"
            />
          </div>
          <UButton
            v-if="showEditBtn === `btn_add_cat_${category.name}`"
            color="gray"
            variant="link"
            icon="ph:plus"
            @click="
              category.links.push({});
              bookmarkLinkModalRef = category.links[category.links.length - 1];
              bookmarkLinkModalType = 'create';
            "
          />
        </div>
        <UDivider />
      </div>
      <div
        class="col-12 col-md-6 pa-md mt-md"
        @mouseover="showEditBtn = 'btn_create_cat'"
        @mouseleave="showEditBtn = ''"
      >
        <UButton
          v-if="showEditBtn === 'btn_create_cat'"
          color="gray"
          variant="link"
          icon="ph:plus"
          label="Add category"
          @click="
            currentBookmarkSpace.categories.push({
              name: 'New category',
              links: []
            });
            saveBookmarks();
          "
        />
      </div>
    </div>
    <BookmarkLinkModal
      v-if="bookmarkLinkModalRef && bookmarkLinkModalType"
      :modal-type="bookmarkLinkModalType"
      v-model="bookmarkLinkModalRef"
      @close="
        bookmarkLinkModalRef = null;
        bookmarkLinkModalType = null;
      "
      @save="
        saveBookmarks();
        bookmarkLinkModalRef = null;
        bookmarkLinkModalType = null;
      "
    />
  </UCard>
</template>
