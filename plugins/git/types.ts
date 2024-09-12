export type GitType = 'gitlab' | 'github'

export type GitCommitType = {
  path: string,
  message: string,
  content: string
}
