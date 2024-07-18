<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}

function fireOAuth (providerType: string) {
  console.log(providerType)
}
</script>

<template>
  <div class="row justify-center text-center gutter-x-md">
    <UiButton
      label="GitHub"
      icon="ph:github-logo"
      @click="fireOAuth('github')"
    />
    <UiButton
      label="GitLab"
      icon="ph:gitlab-logo"
      @click="fireOAuth('gitlab')"
    />
  </div>
  <!-- <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <Button :disabled="isLoading">
          Sign In with Email
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      GitHub
    </Button>
  </div> -->
</template>
