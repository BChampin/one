import { useWeatherStore } from './store'
import WeatherCard from './WeatherCard.vue'

export default defineNuxtPlugin({
  name: 'weather-plugin',
  parallel: true,
  async setup (nuxtApp) {
    nuxtApp.vueApp.component('WeatherCard', WeatherCard)

    const weatherStore = useWeatherStore()
    weatherStore.init({
      cityLabel: useRuntimeConfig().public.WEATHER_CITY_LABEL || undefined,
      cityUrl: useRuntimeConfig().public.WEATHER_CITY_URL || undefined,
      latitude: parseFloat(useRuntimeConfig().public.WEATHER_LATITUDE) || undefined,
      longitude: parseFloat(useRuntimeConfig().public.WEATHER_LONGITUDE) || undefined,
      timezone: useRuntimeConfig().public.WEATHER_TIMEZONE || undefined,
    })
  }
})
