const routes = [
  {
    path: 'habits',
    name: 'habits',
    label: 'Habits',
    shortcut: 'Ctrl+D',
    component: () => import('./views/HabitsView.vue')
  }
]
export default routes
