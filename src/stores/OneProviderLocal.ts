import type { OneProviderType, OneProvider } from '@/types'

export class OneProviderLocal implements OneProvider {
  constructor () {}
  type: OneProviderType = 'local'

  async read(path: string): Promise<string> {
    const request = await fetch(
      `/oneData/${path}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json())
    return request
  }
}
