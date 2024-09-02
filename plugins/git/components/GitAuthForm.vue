<script setup lang="ts">
import { useGitStore } from '../store'
import type { GitType } from '../types/GitTypes'

// Variables
const gitStore = useGitStore()
const oauthLoading = ref(false)

// Functions
function initAndOauthFireProcess (gitType: GitType) {
  gitStore.init(gitType)
  gitStore.oauthFireProcess()
}

// Lifecycle
onMounted(() => {
  setTimeout(async() => {
    // TODO : here, differenciate github and gitlab based on callbacks
    // TODO : add a loading somewhere to let the process of login do his job
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      oauthLoading.value = true
      gitStore.init('gitlab')
      await gitStore.oauthHandleCode(code)
    }

    // Check for previous instance in localStorage
    gitStore.init('gitlab')
    const isGitLabLogged = gitStore.isLogged
    if (!isGitLabLogged) gitStore.close()
  }, 200)
})

</script>

<template>
  <div class="text-center">
    <h2 class="my-md">
      Login with ...
    </h2>
    <div class="row justify-center gutter-x-md">
      <UButton
        size="lg"
        label="GitHub"
        icon="ph:github-logo"
        @click="initAndOauthFireProcess('github')"
      />
      <UButton
        size="lg"
        label="GitLab"
        icon="ph:gitlab-logo"
        @click="initAndOauthFireProcess('gitlab')"
      />
    </div>
  </div>
</template>
