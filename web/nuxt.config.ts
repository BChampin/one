// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  alias: {
    '@types': '../../types',
  },

  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
  ],

  modules: [
    '@nuxt/icon',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    public: {
      // CONFIG
      USER_FIRSTNAME: process.env.NUXT_USER_FIRSTNAME,
      API_URL: process.env.NUXT_API_URL,
      GITLAB_CLIENT_ID: process.env.NUXT_GITLAB_CLIENT_ID,
      GITLAB_CALLBACK_URL: process.env.NUXT_GITLAB_CALLBACK_URL,
      GITLAB_EXCHANGE_CODE_URL: process.env.NUXT_GITLAB_EXCHANGE_CODE_URL,

      // PLUGIN : weather
      WEATHER_CITY_LABEL: process.env.NUXT_WEATHER_CITY_LABEL,
      WEATHER_CITY_URL: process.env.NUXT_WEATHER_CITY_URL,
      WEATHER_LATITUDE: process.env.NUXT_WEATHER_LATITUDE,
      WEATHER_LONGITUDE: process.env.NUXT_WEATHER_LONGITUDE,
      WEATHER_TIMEZONE: process.env.NUXT_WEATHER_TIMEZONE,
    }
  },
})
