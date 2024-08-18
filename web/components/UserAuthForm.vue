<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGitStore } from '@/stores/gitStore'
import type { GitType } from '@/services/GitTypes'

// Variables
const oauthLoading = ref(false)
const gitStore = useGitStore()

// Functions
function initAndOauthFireProcess (gitType: GitType) {
  gitStore.init(gitType)
  gitStore.oauthFireProcess()
}

// Lifecycle
onMounted(() => {
  setTimeout(async() => {
    // TODO : here, differenciate github and gitlab based on callbacks
    const code = new URLSearchParams(window.location.search).get('code')
    if (code) {
      oauthLoading.value = true
      gitStore.init('gitlab')
      await gitStore.oauthHandleCode(code)
    }
  }, 500)
})
</script>

<template>
  <div class="row justify-center text-center gutter-x-md">
    <UiButton
      label="GitHub"
      icon="ph:github-logo"
      @click="initAndOauthFireProcess('github')"
    />
    <UiButton
      label="GitLab"
      icon="ph:gitlab-logo"
      @click="initAndOauthFireProcess('gitlab')"
    />
  </div>
</template>
