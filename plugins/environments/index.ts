import { useEnvironmentsStore } from './store'
import EnvironmentsCard from './EnvironmentsCard.vue'

export default defineNuxtPlugin({
  name: 'environments-plugin',
  dependsOn: ['git-plugin'],
  parallel: true,
  async setup (nuxtApp) {
    nuxtApp.vueApp.component('EnvironmentsCard', EnvironmentsCard)
    return {
      provide: {
        environments: useEnvironmentsStore()
      }
    }
  }
})
