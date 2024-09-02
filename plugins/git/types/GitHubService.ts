import { Git } from './GitTypes'

export class GitHub extends Git {

  constructor () {
    super('github')
  }

  // Oauth operations
  async oauthFireProcess () {}
  async oauthHandleCode (code: string) {}

  // Files
  async getRawRepo () {}
  async read(path: string) {}
}
