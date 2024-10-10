export type GitType = 'gitlab' | 'github'

export type GitCommitType = {
  path: string,
  message: string,
  content: string
}

export type Git = {
  type: GitType,
  session: null | {
    accessToken: string
    user: {
      name: string
    }
  }
}
