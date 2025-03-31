import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { OneProviderType } from '@/types'
import { OneProviderLocal } from './OneProviderLocal'
// import { OneProviderGithub } from './OneProviderGithub'
import { OneProviderGitlab } from './OneProviderGitlab'

import { useRouter } from 'vue-router'

export const useOneStore = defineStore('one', () => {
  const router = useRouter()

  // Data provider
  const provider = ref()
  const providerType = ref<OneProviderType>()

  function getStoredStoreStructure () {
    return {
      providerType: providerType.value
    }
  }
  function getFromLocalStorage () {
    return localStorage.getItem('oneStore')
  }
  function setInLocalStorage () {
    localStorage.setItem('oneStore', JSON.stringify(getStoredStoreStructure()))
  }
  function localStorageClear () {
    localStorage.clear()
    sessionStorage.clear()
  }

  // TODO : may be improved with subscriptions
  // https://pinia.vuejs.org/core-concepts/state.html#Subscribing-to-the-state
  function loadProviderFromStorage () {
    const ls = getFromLocalStorage()
    if (ls) {
      const lsStore = JSON.parse(ls)
      if (lsStore.providerType) initProvider(lsStore.providerType, true)
    }
  }

  async function initProvider (providerTypeParam?: OneProviderType, fromStorage?: boolean) {
    switch (providerTypeParam) {
      case 'local': provider.value = new OneProviderLocal()
      // case 'github': provider.value = new OneProviderGithub()
      case 'gitlab':
        provider.value = new OneProviderGitlab()
        if (!fromStorage) provider.value.init()
        else {
          const isOAuthFinalized = await provider.value.finalizeOAuth()
          console.log(isOAuthFinalized)
          // if (!isOAuthFinalized) provider.value.init() // Redirect if OAuth not done
        }
      default:
        break;
    }

    // Load config if existing
    if (provider.value) {
      providerType.value = providerTypeParam
      setInLocalStorage()
      // const oneConfig: OneConfigType = await read('one.config.json')
      // if (oneConfig && oneConfig.modules?.length) {
      //   for (const moduleName of oneConfig.modules) {
      //     const moduleRoutes = await import(`@/modules/${moduleName}/routes.ts`)
      //     for (const moduleRoute of moduleRoutes.default) {
      //       router.addRoute('app', moduleRoute) // Not working adding as children
      //       // const appRoute = router.getRoutes().find(r => r.name === 'app')
      //       // router.addRoute({
      //       //   ...appRoute,
      //       //   children: appRoute.children.concat(moduleRoute)
      //       // })
      //     }
      //   }
      // }
      console.log('provider.value IS SET')
      router.push({ name: 'app' })
    }
  }

  async function resetProvider () {
    provider.value = null
    providerType.value = undefined
    localStorageClear()
  }

  // Main functions
  async function read (path: string): Promise<string> {
    if (provider.value) return await provider.value.read(path)
    else return ''
  }

  async function list (path: string): Promise<unknown> {
    if (provider.value) return await provider.value.list(path)
    else return ''
  }


  const loggedIn = computed(() => !!provider.value)

  return {
    // State
    loggedIn,

    // Data Provider
    provider,
    loadProviderFromStorage,
    initProvider,
    resetProvider,

    // Main functions
    read,
    list,
  }
})
