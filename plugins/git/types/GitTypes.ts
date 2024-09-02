export type GitType = 'gitlab' | 'github'

export abstract class Git {
  // Properties
  type: GitType
  $gitFetch: any // Baser settings for interacting with source once logged in
  isLogged: boolean = false

  // Constructor
  constructor(type: GitType) {
    this.type = type
    this.localStorageSet('git-type', type)
  }

  // Oauth operations
  abstract oauthFireProcess (): Promise<void>
  abstract oauthHandleCode (code: string): Promise<void>

  // Files
  abstract getRawRepo(): Promise<any>
  abstract read(path: string): Promise<any>

  // LocalStorage operations
  localStorageSet(key: string, value: any): void {
    localStorage.setItem(key, value)
  }
  localStorageGet(key: string): string|null {
    return localStorage.getItem(key)
  }
  localStorageRemove(key: string): void {
    localStorage.removeItem(key)
  }
  localStorageClear(): void {
    localStorage.clear()
  }
}
