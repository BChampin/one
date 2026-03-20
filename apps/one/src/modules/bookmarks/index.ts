import type { OneModule } from '@/plugins/one'
import { bookmarksRoutes } from './routes'
import { bookmarksState } from './state'
import { deserializeBookmarks, serializeBookmarks } from './utils'

export const bookmarksDataFile = 'bookmarks/bookmarks.md'

const bookmarksModule: OneModule = {
  label: 'Bookmarks',
  slug: 'bookmarks',
  description: 'File-backed bookmarks grouped by spaces and categories.',
  dataFile: bookmarksDataFile,
  filesToData: async (_one, files) => {
    const markdown = files[bookmarksDataFile]

    if (typeof markdown !== 'string') {
      throw new Error(`[bookmarks] missing "${bookmarksDataFile}" content`)
    }

    bookmarksState.loading = true
    bookmarksState.error = null
    bookmarksState.ready = false
    bookmarksState.spaces = []

    try {
      bookmarksState.spaces = deserializeBookmarks(markdown)
      bookmarksState.ready = true
    } catch (error) {
      bookmarksState.error = error instanceof Error ? error.message : String(error)
      throw error
    } finally {
      bookmarksState.loading = false
    }
  },
  dataToFiles: async () => ({
    [bookmarksDataFile]: serializeBookmarks(bookmarksState.spaces),
  }),
  init: async (_one) => {
    // Bookmarks only need one parsed file, so init stays lightweight.
  },
  load: async () => {
    // Data hydration happens through filesToData during module loading.
  },
  routes: bookmarksRoutes,
}

export default bookmarksModule
