import { Git } from './GitTypes'

export class GitLab extends Git {
  constructor () {
    super('gitlab')
    this.localStorageSet(
      'git-gitlab-state',
      this.localStorageGet('git-gitlab-state') || this.generateRandomState()
    )
    const existingToken = this.localStorageGet('git-gitlab-token')
    if (existingToken) this.setFetchInstanceAndStorage(JSON.parse(existingToken))
  }

  // Oauth operations
  // https://docs.gitlab.com/ee/api/oauth2.html#authorization-code-flow
  async oauthFireProcess () {
    const params = new URLSearchParams({
      client_id: useRuntimeConfig().public.GITLAB_CLIENT_ID,
      scope: 'api read_user',
      response_type: 'code',
      state: this.localStorageGet('git-gitlab-state') || '',
    })
    const redirectUri = encodeURIComponent(useRuntimeConfig().public.GITLAB_CALLBACK_URL)
    // Need to extract redirectUri since URLSearchParms would reencode the resulting value, causing an error once on GitLab page
    window.location.href = `https://gitlab.com/oauth/authorize?${params.toString()}&redirect_uri=${redirectUri}`
  }

  async oauthHandleCode (code: string) {
    const { data, status } = await useFetch('https://gitlab.com/oauth/token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: useRuntimeConfig().public.GITLAB_CLIENT_ID,
        client_secret: useRuntimeConfig().public.GITLAB_CLIENT_SECRET,
        redirect_uri: useRuntimeConfig().public.GITLAB_CALLBACK_URL,
        grant_type: 'authorization_code',
        code,
      })
    })
    if (status.value === 'success' && data.value) {
      this.setFetchInstanceAndStorage(data.value)
    }
  }

  private async refreshToken () {
    let refresh_token = null
    let existingToken = this.localStorageGet('git-gitlab-token')
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
      this.setFetchInstanceAndStorage(data.value)
    }
  }

  private setFetchInstanceAndStorage (data: any) {
    this.localStorageSet('git-gitlab-token', JSON.stringify(data))

    this.$gitFetch = $fetch.create({
      baseURL: `https://gitlab.com/api/v4/projects/${useRuntimeConfig().public.GITLAB_PROJECT_ID}/repository/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token_type} ${data.access_token}`,
      },
    })

    this.isLogged = true
  }

  private generateRandomState (): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  async getRawRepo () {
    // need user id, need update of applications scope ?
    // then allow us to list user projects : https://docs.gitlab.com/ee/api/projects.html#list-user-projects
    // then, find if existing repo or no
    // So for now, directly set in .env
    const { data, status } = await this.$gitFetch('tree?ref=main', {
      method: 'GET'
    })
    console.log({ data, status })
  }

  // Files
  async read (path: string) {
    // TODO : this check should be centralized somewhere, maybe in $gitFetch instanciation, but for now we do it here
    let existingToken = this.localStorageGet('git-gitlab-token')
    if (existingToken) {
      existingToken = JSON.parse(existingToken)
      if ((existingToken.created_at + existingToken.expires_in) < Date.now() / 1000) { // Divided by 100 since GitLab send seconds
        await this.refreshToken()
      }
    }
    console.log('hreher2222333', this)

    const { data, status, error, refresh, clear } = await this.$gitFetch(`files/${encodeURIComponent(path)}/raw?ref=main`, {
      method: 'GET'
    })

    console.log({ data, status, error, refresh, clear })
    if (status.value === 'success' && data.value) {
      console.log(data.value)
    }
    return 'ici'
  }
}
