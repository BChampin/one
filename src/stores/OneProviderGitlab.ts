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
      console.error('OAuth state mismatch or missing code')
      return false
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
        return true
      }

    } catch (error) {
      console.error('OAuth token exchange failed', error)
    }

    return false
  }

  async read (path: string): Promise<string> {
    if (!this.token) {
      console.error('No GitLab access token')
      return ''
    }

    const response = await fetch(`https://gitlab.com/api/v4/projects/${import.meta.env.VITE_GITLAB_PROJECT_ID}/repository/files/${encodeURIComponent(path)}/raw`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })

    return response.ok ? await response.text() : ''
  }

  async list (path: string): Promise<unknown> {
    const request = await fetch(
      `/oneData/${path}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json())
    return request
  }

  // Specific
  generateRandomState () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}
