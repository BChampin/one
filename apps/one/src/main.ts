import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import onePlugin from './plugins/one'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(onePlugin)
// TODO : One should export a route list that is then loaded inside router
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.body--dark',
    },
  },
})

app.mount('#app')
