import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BookmarkSpace } from '../types'
import { useOneStore } from '@/stores/one'

export const useBookmarksStore = defineStore('bookmarks', () => {
  const oneStore = useOneStore()
  const spaces = ref<BookmarkSpace[]>()

  const getBookmarks = async () => {
    const fileName = 'bookmarks/bookmarks.json'
    const rq = await oneStore.read(fileName)
    spaces.value = rq as BookmarkSpace[]
    return spaces.value
  }

  return {
    spaces,
    getBookmarks,
  }
})
