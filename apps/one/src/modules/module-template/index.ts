import ModuleTemplatePanel from './components/ModuleTemplatePanel.vue'
import { moduleTemplateRoutes } from './routes'
import type { ModuleTemplateItem } from './types'

import type { OneModule } from '@/plugins/one'

export const moduleTemplate: OneModule = {
  label: 'Module template',
  slug: 'module-template',
  description: 'Starter scaffold for a future One module.',
  dataFile: 'module-template.json',
  init: async (_one) => {
    // Run once when the module is first activated.
  },
  load: async (_one) => {
    // Fetch or refresh the module data here.
  },
  routes: moduleTemplateRoutes,
  components: {
    ModuleTemplatePanel,
  },
}

export default moduleTemplate

export type { ModuleTemplateItem }
export { moduleTemplateRoutes }
