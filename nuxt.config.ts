// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
  ],

  modules: ['@nuxt/icon', '@pinia/nuxt', '@nuxt/ui'],

  plugins: [
    '~/plugins/git/index',
    '~/plugins/weather/index',
    '~/plugins/bookmarks/index'
  ],

  runtimeConfig: {
    public: {
      // CONFIG
      USER_FIRSTNAME: process.env.NUXT_USER_FIRSTNAME,
      GITLAB_CLIENT_ID: process.env.NUXT_GITLAB_CLIENT_ID,
      GITLAB_CLIENT_SECRET: process.env.NUXT_GITLAB_CLIENT_SECRET,
      GITLAB_CALLBACK_URL: process.env.NUXT_GITLAB_CALLBACK_URL,
      GITLAB_PROJECT_ID: process.env.NUXT_GITLAB_PROJECT_ID,

      // PLUGIN : weather
      WEATHER_CITY_LABEL: process.env.NUXT_WEATHER_CITY_LABEL,
      WEATHER_CITY_URL: process.env.NUXT_WEATHER_CITY_URL,
      WEATHER_LATITUDE: process.env.NUXT_WEATHER_LATITUDE,
      WEATHER_LONGITUDE: process.env.NUXT_WEATHER_LONGITUDE,
      WEATHER_TIMEZONE: process.env.NUXT_WEATHER_TIMEZONE,
    }
  },
})
