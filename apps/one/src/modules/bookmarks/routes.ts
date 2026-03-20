import type { OneModuleRoute } from '@/plugins/one'

export const bookmarksRoutes: OneModuleRoute[] = [
  {
    path: '/bookmarks',
    name: 'bookmarks',
    label: 'Bookmarks',
    shortcut: 'Ctrl+B',
    main: true,
    component: () => import('./views/BookmarksView.vue'),
  },
]
