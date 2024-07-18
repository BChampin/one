import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProviderType, Provider } from '@/types'

// https://pinia.vuejs.org/core-concepts/
// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useAuthStore = defineStore('auth', () => {
  const runtimeConfig = useRuntimeConfig()

  // Properties
  const isLogged = ref(false)
  const provider = ref<Provider>()

  // Actions
  function init () {
    console.log('authStore has been init')

    // TODO : should check cookies, if they are valid and not expired
    // If so, set them to store; if not let it be so user can log back
  }

  function writeToLocalStorage (key: string, value: any) {
    // Authorization: Bearer OAUTH-TOKEN
    localStorage.setItem(key, value)
  }

  async function fireOAuthProcess (providerType: ProviderType) {
    if (provider.value) {
      provider.value.type = providerType
    }

    if (providerType === 'gitlab') {
      const clientId = runtimeConfig.public.GITLAB_CLIENT_ID
      const redirectUri = encodeURIComponent(runtimeConfig.public.GITLAB_CALLBACK_URL)
      const scope = 'write_repository'
      const state = generateRandomState() // Generate a unique state string to prevent CSRF

      window.location.href = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`
    } else if (providerType === 'github') {
      // TODO : to implement
    }
  }

  async function handleOAuthCode (code: string) {
    try {
      const response = await $fetch(runtimeConfig.public.GITLAB_EXCHANGE_CODE_URL, {
        method: 'POST',
        body: { code }
      })
      console.log(response)

      // Write all the response in localStorage
      for (const [key, value] of Object.entries(response.data)) {
        writeToLocalStorage(key, value)
      }
      // router.push({ name: 'dashboard' })
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      // router.push({ name: 'dashboard' })
    }
  }

  // Gitlab Specific
  function generateRandomState () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  return {
    // Properties
    isLogged,
    provider,

    // Getters
    // formattedData,

    // Action
    init,
    fireOAuthProcess,
    handleOAuthCode
  }
})
