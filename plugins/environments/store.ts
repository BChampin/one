import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Environment } from './types'
// import { WEATHER_CODES } from './types'
// import type { PluginOptions } from './types'

// https://pinia.vuejs.org/core-concepts/
// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useEnvironmentsStore = defineStore('environments', () => {
  // Properties
  const REPO_PREFIX = 'environments'
  const REPO_FILE = 'environments.json'
  const environments : Ref<Environment[]> = ref([])
  const currentEnvironment : Ref<Environment> = ref()

  // Actions
  async function read () {
    const { $git } = useNuxtApp()
    const data = await $git.read(`${REPO_PREFIX}/${REPO_FILE}`)
    if (data) environments.value = JSON.parse(data)
  }

  function setCurrentEnvironment (env: Environment) {
    currentEnvironment.value = env
  }

  return {
    // Properties
    environments,
    currentEnvironment,

    // Actions
    read,
    setCurrentEnvironment,
  }
  // // Properties
  // const loading = ref(false)
  // const cityLabel = ref('Your city')
  // const cityUrl = ref('https://meteofrance.com/previsions-meteo-france/city/postalcode')
  // const latitude = ref(0)
  // const longitude = ref(0)
  // const timezone = ref('Europe/London')
  // const requestData = ref({})

  // // Getters
  // const formattedData = computed(() => {
  //   const days = []
  //   if (!Object.keys(requestData.value).length) return { city: cityLabel.value }
  //   for (let index = 0; index <= 3; index++) {
  //     const dailyData = requestData.value?.daily
  //     const weatherCode = WEATHER_CODES.find(wc => wc.codes.includes(dailyData.weather_code[index]))
  //     days.push({
  //       tempMin: dailyData.temperature_2m_min[index],
  //       tempMax: dailyData.temperature_2m_max[index],
  //       svg: weatherCode.svg,
  //       weather: weatherCode.label,
  //       label: new Date(dailyData.time[index]).toLocaleDateString('en-EN', { weekday: 'short' })
  //     })
  //   }
  //   Object.assign(days[0], { tempNow: requestData.value.current.temperature_2m })
  //   // days[0].currentTemp = get(weatherData.value, 'daily')

  //   return {
  //     city: cityLabel.value,
  //     today: days[0],
  //     nextDays: days.slice(1)
  //   }
  // })

  // // Actions
  // async function init (options: PluginOptions) {
  //   if (options.cityLabel) cityLabel.value = options.cityLabel
  //   if (options.cityUrl) cityUrl.value = options.cityUrl
  //   if (options.latitude) latitude.value = options.latitude
  //   if (options.longitude) longitude.value = options.longitude
  //   if (options.timezone) timezone.value = options.timezone
  // }

  // async function refresh () {
  //   loading.value = true
  //   const { data, status } =  await useFetch('https://api.open-meteo.com/v1/forecast', {
  //     method: 'GET',
  //     params: {
  //       latitude: latitude.value,
  //       longitude: longitude.value,
  //       current: 'temperature_2m',
  //       daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  //       timezone: timezone.value,
  //       forecast_days: 4
  //     }
  //   })
  //   if (status.value === 'success' && data.value) {
  //     data.value.timestamp = Date.now()
  //     requestData.value = data.value
  //   }
  //   loading.value = false
  // }

  // return {
  //   // Properties
  //   loading,
  //   cityLabel,
  //   cityUrl,

  //   // Getters
  //   formattedData,

  //   // Action
  //   init,
  //   refresh
  // }
})
