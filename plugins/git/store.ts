import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Git } from './types/GitTypes'
import type { GitType } from './types/GitTypes'
import { GitLab } from './types/GitLabService'
import { GitHub } from './types/GitHubService'


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
  const isLogged = computed(() => gitInstance.value?.isLogged || false)

  // Actions
  function init (gitType: GitType) {
    gitInstance.value = createGit(gitType)
  }

  function close () {
    gitInstance.value = null
  }

  async function oauthFireProcess () {
    if (gitInstance.value) {
      gitInstance.value.oauthFireProcess()
    }
  }

  async function oauthHandleCode (code: string) {
    if (gitInstance.value) {
      await gitInstance.value.oauthHandleCode(code)
      useRouter().push({ query: {} })
    }
  }

  async function getRawRepo () {
    if (gitInstance.value) gitInstance.value.getRawRepo()
  }

  async function read (path:string) {
    if (gitInstance.value) gitInstance.value.read(path)
  }

  return {
    // Properties
    gitInstance,
    isLogged,

    // Actions
    init,
    close,
    oauthFireProcess,
    oauthHandleCode,
    getRawRepo,
    read,
  }
})
