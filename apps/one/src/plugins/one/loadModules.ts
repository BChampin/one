import type { OneContext, OneModule, OneModuleFiles, OneModuleRoute } from './types'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'
import { loadFile } from './utils'

type ModuleExport = {
  default?: OneModule
}

const moduleLoaders = import.meta.glob('../../modules/*/index.ts') as Record<
  string,
  () => Promise<ModuleExport>
>

function getModulePath(slug: string) {
  return `../../modules/${slug}/index.ts`
}

async function loadModuleDefinition(slug: string): Promise<OneModule | null> {
  const loader = moduleLoaders[getModulePath(slug)]

  if (!loader) {
    console.warn(`[one] module "${slug}" is listed in config but has no matching module file`)
    return null
  }

  const module = await loader()
  const definition = module.default

  if (!definition) {
    console.warn(`[one] module "${slug}" did not export a default module definition`)
    return null
  }

  return definition
}

function getModuleDataFiles(module: OneModule) {
  if (module.dataFiles?.length) {
    return module.dataFiles
  }

  if (module.dataFile) {
    return [module.dataFile]
  }

  return []
}

async function loadModuleFiles(module: OneModule): Promise<OneModuleFiles> {
  const files = getModuleDataFiles(module)

  if (!files.length) {
    return {}
  }

  const entries = await Promise.all(
    files.map(async (path) => [path, await loadFile<string>(path)] as const),
  )

  return Object.fromEntries(entries)
}

export async function loadConfiguredModules(one: OneContext, slugs: string[]) {
  const loadedModules: OneModule[] = []
  const loadedRoutes: OneModuleRoute[] = []

  for (const slug of slugs) {
    const module = await loadModuleDefinition(slug)

    if (!module) continue

    try {
      if (module.filesToData) {
        const files = await loadModuleFiles(module)
        await module.filesToData(one, files)
      }

      await module.init(one)

      for (const route of module.routes ?? []) {
        if (route.name && router.hasRoute(route.name)) continue

        router.addRoute(route as RouteRecordRaw)
        loadedRoutes.push(route)
      }

      await module.load(one)

      loadedModules.push(module)
    } catch (error) {
      console.error(`[one] failed to load module "${slug}"`, error)
    }
  }

  return { loadedModules, loadedRoutes }
}
