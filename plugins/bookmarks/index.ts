import { useBookmarksStore } from './store'
import BookmarksCard from './components/BookmarksCard.vue'

export default defineNuxtPlugin({
  name: 'bookmarks-plugin',
  dependsOn: ['git-plugin'],
  parallel: true,
  async setup (nuxtApp) {
    nuxtApp.vueApp.component('BookmarksCard', BookmarksCard)
    return {
      provide: {
        bookmarks: useBookmarksStore()
      }
    }
  }
})
