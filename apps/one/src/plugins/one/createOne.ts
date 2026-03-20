import { reactive } from 'vue'

import { loadConfiguredModules } from './loadModules'
import { loadFile } from './utils'
import type { OneActions, OneConfig, OneContext, OneState } from './types'

export function createOne(): OneContext {
  const state = reactive<OneState>({
    ready: false,
    loading: false,
    error: null,
    config: null,
    loadedModules: [],
    loadedRoutes: [],
  })
  const one = state as OneState & OneActions

  let initPromise: Promise<void> | null = null

  async function loadConfig() {
    return loadFile<OneConfig>('one.config.json')
  }

  async function runInit() {
    state.loading = true
    state.error = null

    try {
      state.config = await loadConfig()
      const { loadedModules, loadedRoutes } = await loadConfiguredModules(one, state.config.modules)
      state.loadedModules = loadedModules
      state.loadedRoutes = loadedRoutes
      state.ready = true
    } catch (error) {
      state.error = error instanceof Error ? error.message : String(error)
      throw error
    } finally {
      state.loading = false
      initPromise = null
    }
  }

  async function init() {
    if (state.ready) return
    if (initPromise) return initPromise

    initPromise = runInit()
    return initPromise
  }

  async function refresh() {
    if (initPromise) return initPromise

    initPromise = runInit()
    return initPromise
  }

  one.init = init
  one.refresh = refresh

  return one
}
