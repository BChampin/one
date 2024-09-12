import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { BookmarkSpace } from './types'

// https://pinia.vuejs.org/core-concepts/
// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useBookmarksStore = defineStore('bookmarks', () => {
  const { $git } = useNuxtApp()

  // Properties
  const REPO_PREFIX = 'bookmarks'
  const REPO_FILE = 'bookmarks.json'
  const REPO_PATH = computed(() => `${REPO_PREFIX}/${REPO_FILE}`)
  const saveToast = ref(false)
  const needToSetupPlugin = ref(false)
  const bookmarks : Ref<BookmarkSpace[]> = ref([])
  const currentBookmarkSpace : Ref<BookmarkSpace | null> = ref(null)

  // Actions
  async function firstPluginSetup () {
    const data = await $git.create({
      path: REPO_PATH.value,
      message: '[ONE] Updating bookmarks file.',
      content: JSON.stringify([{
        name: 'My first bookmark space',
        categories: [{
          name: 'A category',
          links: [{
            url: 'https://github.com',
            name: 'GitHub'
          }]
        }]
      }]),
    })
    if (data) {
      needToSetupPlugin.value = false
      setToastNotification()
      await read()
      const firstSpace = bookmarks[0]
      if (firstSpace) setCurrentBookmarkSpace(firstSpace)
    }
  }

  async function read () {
    try {
      const data = await $git.read(REPO_PATH.value)
      if (data) bookmarks.value = JSON.parse(data)
    } catch (e) {
      console.log(e)
      needToSetupPlugin.value = true
    }
  }

  async function update () {
    const data = await $git.update({
      path: REPO_PATH.value,
      message: '[ONE] Updating bookmarks file.',
      content: JSON.stringify(bookmarks.value),
    })
    if (data) {
      setToastNotification()
      await read()
    }
  }

  function setCurrentBookmarkSpace (space: BookmarkSpace) {
    currentBookmarkSpace.value = space
  }

  function setToastNotification () {
    saveToast.value = true
    setTimeout(() => {
      saveToast.value = false
    }, 3000)
  }

  return {
    // Properties
    bookmarks,
    saveToast,
    needToSetupPlugin,
    currentBookmarkSpace,

    // Actions
    firstPluginSetup,
    read,
    update,
    setCurrentBookmarkSpace,
  }
})
