import { reactive } from 'vue'

import type { BookmarkSpace } from './types'

export const bookmarksState = reactive({
  ready: false,
  loading: false,
  error: null as string | null,
  spaces: [] as BookmarkSpace[],
})
