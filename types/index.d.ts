export type ProviderType = 'gitlab' | 'github'

export interface Provider {
  type: ProviderType

  createdAt: number
  expiresAt: number
  accessToken: string
  refreshToken: string
  tokenType: string

  // Gitlab specific
  scope: string
}
