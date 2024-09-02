import { useGitStore } from './store'
import GitAuthForm from './components/GitAuthForm.vue'

export default defineNuxtPlugin({
  name: 'git-plugin',
  async setup (nuxtApp) {
    nuxtApp.vueApp.component('GitAuthForm', GitAuthForm)

    return {
      provide: {
        git: useGitStore()
      }
    }
  }
})
