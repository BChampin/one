<script setup lang="ts">
// #region IMPORTS AND INIT
import { onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import IconGitHub from '@/components/icons/IconGitHub.vue'
import IconGitLab from '@/components/icons/IconGitLab.vue'
import IconFileMultiple from '@/components/icons/IconFileMultiple.vue'
import { useOneStore } from '@/stores/one'
const oneStore = useOneStore()
// #endregion

// Try loading existing instance
onMounted(() => {
  oneStore.loadProviderFromStorage()
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-2">
      <a
        href="#"
        class="flex flex-col items-center gap-2 font-medium"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-md">
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="125"
            height="125"
          >
        </div>
        <span class="sr-only">One.</span>
      </a>
      <h1 class="text-xl font-bold">
        Welcome to One.
      </h1>
    </div>
    <div class="grid gap-4 sm:grid-cols-1">
      <Button
        variant="outline"
        class="w-full"
        @click="oneStore.initProvider('local')"
      >
        <IconFileMultiple />
        Continue with Local files
      </Button>
      <Button
        variant="outline"
        class="w-full"
        @click="oneStore.initProvider('github')"
      >
        <IconGitHub />
        Continue with GitHub (Not implemented yet)
      </Button>
      <Button
        variant="outline"
        class="w-full"
        @click="oneStore.initProvider('gitlab')"
      >
        <IconGitLab />
        Continue with GitLab (WIP)
      </Button>
    </div>
  </div>
</template>
