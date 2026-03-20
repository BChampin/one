import type { App, Plugin } from 'vue'

import { createOne } from './createOne'
import { oneKey } from './key'

const onePlugin: Plugin = {
  install(app: App) {
    const one = createOne()

    app.provide(oneKey, one)

    void one.init().catch((error) => {
      console.error('[one] failed to initialize', error)
    })
  },
}

export default onePlugin

export { createOne } from './createOne'
export { loadConfiguredModules } from './loadModules'
export { oneKey } from './key'
export { useOne } from './useOne'
export type {
  OneActions,
  OneBase,
  OneCommandOption,
  OneCommandSection,
  OneConfig,
  OneContext,
  OneModuleDataToFiles,
  OneModuleFiles,
  OneModuleFilesToData,
  OneModule,
  OneModuleRoute,
  OneState,
} from './types'
