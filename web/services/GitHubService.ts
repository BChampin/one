import { Git } from '@/services/GitTypes'

export class GitHub extends Git {

  constructor () {
    super('github')
  }

  // Oauth operations
  async oauthFireProcess () {}
  async oauthHandleCode (code: string) {}

  // Files
  async getRequest() {}
  async postRequest() {}
}
