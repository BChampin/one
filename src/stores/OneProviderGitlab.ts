import type { OneProviderType, OneProvider } from '@/types'

export class OneProviderGitlab implements OneProvider {
  constructor () {}
  type: OneProviderType = 'gitlab'
  token: string | null = null

  async init () {
    const clientId = import.meta.env.VITE_GITLAB_CLIENT_ID
    const redirectUri = encodeURIComponent(import.meta.env.VITE_GITLAB_CALLBACK_URL)
    const scope = 'api+read_user'
    const state = this.generateRandomState() // Generate a unique state string to prevent CSRF

    // Save state to sessionStorage (to verify later)
    sessionStorage.setItem('gitlab_oauth_state', state)

    window.location.href = `https://gitlab.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`
  }

  async finalizeOAuth () {
    // Extract URL params (GitLab callback)
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')

    // Validate state
    const storedState = sessionStorage.getItem('gitlab_oauth_state')
    if (!code || state !== storedState) {
      if (localStorage.getItem('gitlab_refresh_token')) {
        await this.refreshToken()
        return
      } else await this.init()
    }

    // Exchange code for access token
    const clientId = import.meta.env.VITE_GITLAB_CLIENT_ID
    const clientSecret = import.meta.env.VITE_GITLAB_CLIENT_SECRET
    const redirectUri = import.meta.env.VITE_GITLAB_CALLBACK_URL

    try {
      const response = await fetch('https://gitlab.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri
        })
      })

      const data = await response.json()
      sessionStorage.clear()

      if (data.access_token) {
        this.token = data.access_token
        localStorage.setItem('gitlab_token', String(this.token))
        localStorage.setItem('gitlab_refresh_token', String(data.refresh_token))
      }
    } catch (error) {
      console.error('OAuth token exchange failed', error)
    }
  }

  async refreshToken () {
    const refreshToken = localStorage.getItem('gitlab_refresh_token')
    if (!refreshToken) throw new Error('No refresh token available')

    const clientId = import.meta.env.VITE_GITLAB_CLIENT_ID
    const response = await fetch('https://gitlab.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error('Token refresh failed')

    this.token = data.access_token
    localStorage.setItem('gitlab_token', data.access_token)
    localStorage.setItem('gitlab_refresh_token', data.refresh_token)
  }

  private async doOauthRequest (url: string) {
    const callSetup = async () => {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      if (!response.ok) throw { status: response.status }
      return await response.json()
    }

    try {
      if (!this.token) throw { status: 401 }
      return await callSetup()
    } catch (e: any) {
      if (e.status === 401) {
        await this.refreshToken()
        return await callSetup()
      }
      throw e
    }
  }

  async read (path: string): Promise<string> {
    return await this.doOauthRequest(`https://gitlab.com/api/v4/projects/${import.meta.env.VITE_GITLAB_PROJECT_ID}/repository/files/${encodeURIComponent(path)}/raw`)
  }

  async list (path: string): Promise<unknown> {
    return await this.doOauthRequest(`https://gitlab.com/api/v4/projects/${import.meta.env.VITE_GITLAB_PROJECT_ID}/repository/tree/?path=${encodeURIComponent(path)}`)
  }

  // Specific
  generateRandomState () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}
