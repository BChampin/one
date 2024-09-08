<script setup lang="ts">
import { computed } from 'vue'
import { useEnvironmentsStore } from './store'
import type { Environment } from './types'

const environmentsStore = useEnvironmentsStore()
await environmentsStore.read()

const hasFirstEnv = environmentsStore.environments[0]
if (hasFirstEnv) environmentsStore.setCurrentEnvironment(hasFirstEnv)

const mappedVertical = computed(() => {
  return environmentsStore.environments.map((env: Environment) => {
    return {
      label: env.name,
      icon: `ph:${env.icon}`,
      badge: env.categories.reduce((acc, cat) => acc + cat.links.length, 0),
      click: () => environmentsStore.setCurrentEnvironment(env)
    }
  })
})

const currentEnvironment = computed(() => environmentsStore.currentEnvironment)

function extractDomain (link: string) {
  try {
    return new URL(link).hostname
  } catch (e) {}
}

</script>

<template>
  <UCard class="w-full br-25 bd-grey">
    <div class="row">
      <div class="col-auto gutter-sm">
        <UVerticalNavigation :links="mappedVertical" />
      </div>
      <UDivider orientation="vertical" />
      <div class="col pa-sm">
        <div class="text-h4">
          {{ currentEnvironment.name }}
        </div>

        <div
          v-for="(category, iCat) of currentEnvironment.categories"
          :key="iCat"
          class="mt-md"
        >
          <div class="row text-h6 mb-xs">
            {{ category.name }}
          </div>
          <div class="row gutter-md mb-sm">
            <UButton
              v-for="(link, iLink) of category.links"
              :key="iLink"
              :to="link.url"
              :label="link.name"
              target="_blank"
              variant="solid"
              color="white"
            >
              <template #leading>
                <img
                  :src="`https://icons.duckduckgo.com/ip3/${extractDomain(link.url)}.ico`"
                  width="18"
                  height="18"
                  class="br-25"
                >
              </template>
            </UButton>
          </div>
          <UDivider />
        </div>
        <!-- <pre>
          {{ environmentsStore.currentEnvironment }}
        </pre> -->
      </div>
    </div>
  </UCard>
</template>
