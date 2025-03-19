const routes = [
  {
    path: 'bookmarks',
    name: 'bookmarks',
    label: 'Bookmarks',
    shortcut: 'Ctrl+B',
    component: () => import('./views/BookmarksView.vue')
  }
]
export default routes
