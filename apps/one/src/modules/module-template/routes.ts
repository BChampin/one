import type { OneModuleRoute } from '@/plugins/one'

export const moduleTemplateRoutes: OneModuleRoute[] = [
  {
    path: '/module-template',
    name: 'module-template',
    label: 'Module template',
    component: () => import('./views/ModuleTemplateView.vue'),
    shortcut: 'Ctrl+M',
    main: true,
    meta: {
      title: 'Module template',
    },
  },
]
