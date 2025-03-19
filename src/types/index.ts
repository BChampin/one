export type OneProviderType = 'local' | 'github' | 'gitlab'

export type OneProvider = {
  type: OneProviderType
  read (path: string) : Promise<string>
}

export type OneConfigType = {
  modules?: string[]
}

// export type GitCommitType = {
//   path: string,
//   message: string,
//   content: string
// }

// export type Git = {
//   type: GitType,
//   session: null | {
//     accessToken: string
//     user: {
//       name: string
//     }
//   }
// }
