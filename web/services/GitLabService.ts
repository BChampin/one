import { Git } from '@/services/GitTypes'

// Key to store in localStorage
// git-gitlab-state
// git-gitlab-token

export class GitLab extends Git {

  constructor () {
    super('gitlab')
    this.localStorageSet(
      'git-gitlab-state',
      this.localStorageGet('git-gitlab-state') || this.generateRandomState()
    )
  }

  // Oauth operations
  // https://docs.gitlab.com/ee/api/oauth2.html#authorization-code-flow
  async oauthFireProcess () {
    const params = new URLSearchParams({
      client_id: useRuntimeConfig().public.GITLAB_CLIENT_ID,
      scope: 'write_repository',
      response_type: 'code',
      state: this.localStorageGet('git-gitlab-state') || '',
    })
    const redirectUri = encodeURIComponent(useRuntimeConfig().public.GITLAB_CALLBACK_URL)
    // Need to extract redirectUri since URLSearchParms would reencode the resulting value, causing an error once on GitLab page
    window.location.href = `https://gitlab.com/oauth/authorize?${params.toString()}&redirect_uri=${redirectUri}`
  }

  async oauthHandleCode (code: string) {
    const { data, status, error, refresh, clear } = await useFetch('https://gitlab.com/oauth/token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: useRuntimeConfig().public.GITLAB_CLIENT_ID,
        client_secret: useRuntimeConfig().public.GITLAB_CLIENT_SECRET,
        redirect_uri: useRuntimeConfig().public.GITLAB_CALLBACK_URL,
        grant_type: 'authorization_code',
        code,
      })
    })
    console.log('askToken')
    console.log({ data, status, error, refresh, clear })
    console.log(status.value)
    console.log(data.value)
    // TODO : if success (status.value === success) then extracts data.value which is the bearer token returned by GitLab
  }

  private async refreshToken () {
    const { data, status, error, refresh, clear } = await useFetch('https://gitlab.com/oauth/token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: useRuntimeConfig().public.GITLAB_CLIENT_ID,
        client_secret: useRuntimeConfig().public.GITLAB_CLIENT_SECRET,
        redirect_uri: useRuntimeConfig().public.GITLAB_CALLBACK_URL,
        grant_type: 'refresh_token',
        refresh_token: '',
      })
    })
    console.log('askToken')
    console.log({ data, status, error, refresh, clear })
  }

  private generateRandomState (): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Files
  async getRequest() {}
  async postRequest() {}
}
