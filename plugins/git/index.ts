import type { Ref } from 'vue'
import type { GitType } from './types'
import {
  localStorageSet,
  localStorageGet,
  generateRandomState
} from './utils'
import GitAuthForm from './components/GitAuthForm.vue'

export default defineNuxtPlugin({
  name: 'git-plugin',
  async setup (nuxtApp) {
    // Registering component
    nuxtApp.vueApp.component('GitAuthForm', GitAuthForm)

    const config = useRuntimeConfig()

    // Properties
    const gitType : Ref<GitType | null> = ref(null)
    const isLogged = ref<boolean>(false)
    const gitFetch = ref(null)

    // checkForExisintgConenction
    if (process.client) {
      const checkExisting = localStorageGet('git-gitlab-state')
      if (checkExisting) await init('gitlab')
    }

    // Init
    async function init (type: GitType) {
      gitType.value = type
      localStorageSet('git-type', type)

      if (gitType.value === 'gitlab') {
        const existing = localStorageGet('git-gitlab-state')
        localStorageSet(
          'git-gitlab-state',
          existing || generateRandomState()
        )
        console.log('existing', existing)
        if (existing) await refreshToken()
      }
    }

    // Close
    async function close () {
      gitType.value = null
      isLogged.value = false
      gitFetch.value = null
    }

    // oauthFireProcess
    async function oauthFireProcess () : Promise<void> {
      // https://docs.gitlab.com/ee/api/oauth2.html#authorization-code-flow
      if (gitType.value === 'gitlab') {
        const params = new URLSearchParams({
          client_id: config.public.GITLAB_CLIENT_ID,
          scope: 'api read_user',
          response_type: 'code',
          state: localStorageGet('git-gitlab-state') || '',
        })
        const redirectUri = encodeURIComponent(config.public.GITLAB_CALLBACK_URL)
        // Need to extract redirectUri since URLSearchParms would reencode the resulting value, causing an error once on GitLab page
        window.location.href = `https://gitlab.com/oauth/authorize?${params.toString()}&redirect_uri=${redirectUri}`
      }
    }

    // oauthHandleCode
    async function oauthHandleCode (code: string) : Promise<void> {
      if (gitType.value === 'gitlab') {
        const { data, status } = await useFetch('https://gitlab.com/oauth/token', {
          method: 'POST',
          body: JSON.stringify({
            client_id: config.public.GITLAB_CLIENT_ID,
            client_secret: config.public.GITLAB_CLIENT_SECRET,
            redirect_uri: config.public.GITLAB_CALLBACK_URL,
            grant_type: 'authorization_code',
            code,
          })
        })
        if (status.value === 'success' && data.value) {
          setFetchInstanceAndStorage(data.value)
        }
      }
    }
    // create
    // read
    async function read (path: string): Promise<any> {
      console.log('before checkRequestFaisability')
      await checkRequestFaisability()
      console.log('after checkRequestFaisability')

      return gitFetch.value(`files/${encodeURIComponent(path)}/raw?ref=main`, {
        method: 'GET'
      })
    }

    // udapte
    // delete



    // utils
    // gitlab only
    function setFetchInstanceAndStorage (data: any) {
      localStorageSet('git-gitlab-token', JSON.stringify(data))
      gitFetch.value = $fetch.create({
        baseURL: `https://gitlab.com/api/v4/projects/${config.public.GITLAB_PROJECT_ID}/repository/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${data.token_type} ${data.access_token}`,
        },
      })
      isLogged.value = true
    }

    async function refreshToken () {
      if (gitType.value === 'gitlab') {
        let refresh_token = null
        let existingToken = localStorageGet('git-gitlab-token')
        if (existingToken) existingToken = JSON.parse(existingToken)
        if (existingToken && existingToken.refresh_token) refresh_token = existingToken.refresh_token
        if (!refresh_token) return

        const { data, status } = await useFetch('https://gitlab.com/oauth/token', {
          method: 'POST',
          body: JSON.stringify({
            client_id: useRuntimeConfig().public.GITLAB_CLIENT_ID,
            client_secret: useRuntimeConfig().public.GITLAB_CLIENT_SECRET,
            redirect_uri: useRuntimeConfig().public.GITLAB_CALLBACK_URL,
            grant_type: 'refresh_token',
            refresh_token,
          })
        })
        if (status.value === 'success' && data.value) {
          setFetchInstanceAndStorage(data.value)
        }
      }
    }

    // ensure request is doable to forge provider
    async function checkRequestFaisability () {
      // TODO : this check should be centralized somewhere, maybe in $gitFetch instanciation, but for now we do it here
      if (gitType.value === 'gitlab') {
        let existingToken = localStorageGet('git-gitlab-token')
        if (existingToken) {
          existingToken = JSON.parse(existingToken)
          if ((existingToken?.created_at + existingToken?.expires_in) < Date.now() / 1000) { // Divided by 1000 since GitLab send seconds
            await refreshToken()
          }
        }

        // Check if connection is effective but gitFetch not set
        existingToken = localStorageGet('git-gitlab-token')
        if (existingToken && !gitFetch.value) {
          setFetchInstanceAndStorage(JSON.parse(existingToken))
        }
      }
      return true
    }

    const git = {
      // Properties
      gitType,
      isLogged,

      // Methods
      init,
      close,
      oauthFireProcess,
      oauthHandleCode,
      read,
    }

    return {
      provide: {
        git
      }
    }
  }
})
