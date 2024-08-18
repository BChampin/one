import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Git } from '@/services/GitTypes'
import type { GitType } from '@/services/GitTypes'
import { GitLab } from '@/services/GitLabService'
import { GitHub } from '@/services/GitHubService'


export function createGit (gitType: GitType): Git {
  if (gitType === 'gitlab') return new GitLab()
  else if (gitType === 'github') return new GitHub()
  else throw new Error(`createGit unsupported type : ${gitType}`)
}

// https://pinia.vuejs.org/core-concepts/
// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useGitStore = defineStore('git', () => {
  // Properties
  const gitInstance = ref<Git|null>(null)

  // Actions
  function init (gitType: GitType) {
    gitInstance.value = createGit(gitType)
  }

  async function oauthFireProcess () {
    if (gitInstance.value) {
      gitInstance.value.oauthFireProcess()
    }
  }

  async function oauthHandleCode (code: string) {
    if (gitInstance.value) gitInstance.value.oauthHandleCode(code)
  }

  return {
    // Actions
    init,
    oauthFireProcess,
    oauthHandleCode,
  }
})
