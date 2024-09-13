<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeatherStore } from './store'

const weatherStore = useWeatherStore()

// LIFECYCLE HOOKS
onMounted(() => {
  const tenMinutes = Date.now() - 600000
  const lastFetch = weatherStore.formattedData?.timestamp || null
  if (!weatherStore.formattedData.timestamp || (!lastFetch || lastFetch < tenMinutes)) {
    nextTick(() => weatherStore.refresh())
  }
})
</script>

<template>
  <UCard v-if="weatherStore" class="flex column br-25 bd-grey">
    <div class="flex no-wrap justify-between">
      <div class="flex items-baseline">
        <div class="flex items-baseline mr-sm">
          <div class="text-h5 mr-xs">
            {{ weatherStore.cityLabel }}
          </div>
          <div class="ml-sm text-small">
            {{ new Date().toLocaleDateString('en-EN', { weekday: "long", year: 'numeric', month: 'long', day: 'numeric', }) }}
          </div>
        </div>
        <a
          v-if="weatherStore.cityUrl"
          :href="weatherStore.cityUrl"
          target="_blank"
          class="text-primary"
          style="text-decoration:reset"
        >
          <img
            src="./svg/new_tab.svg"
            style="height:1rem;"
          />
        </a>
        <div class="cursor-pointer" @click="weatherStore.refresh()">
          <img
            src="./svg/reload.svg"
            style="height:1rem;"
          />
        </div>
      </div>
      <div>
        <span class="text-h5">
          {{ weatherStore.formattedData?.today?.tempNow }}°
        </span>
      </div>
    </div>
    <div class="flex no-wrap justify-between">
      <img
        v-if="weatherStore.formattedData?.today?.svg"
        :src="`/_nuxt/plugins/weather/svg/${weatherStore.formattedData?.today?.svg}.svg`"
        :alt="weatherStore.formattedData?.today?.svg"
        class="mr-sm"
        style="height:5em;"
      >
      <div class="column justify-evenly text-right">
        <div class="text-h6 text-bold">
          <span class="text-cold">
            {{ weatherStore.formattedData?.today?.tempMin }}°
          </span>
          -
          <span class="text-hot">
            {{ weatherStore.formattedData?.today?.tempMax }}°
          </span>
        </div>
        <div class="text-body">
          {{ weatherStore.formattedData?.today?.weather }}
        </div>
      </div>
    </div>

    <UDivider />

    <div
      v-if="weatherStore.formattedData.nextDays"
      class="mt-md flex justify-around"
    >
      <div
        v-for="(nextDay, i) of weatherStore.formattedData.nextDays"
        :key="i"
        class="flex column items-center"
      >
        <div class="text-bold">
          {{ nextDay.label }}
        </div>
        <div>
          <img
            v-if="nextDay.svg"
            :src="`/_nuxt/plugins/weather/svg/${nextDay.svg}.svg`"
            :alt="nextDay.svg"
            :title="nextDay.weather"
            style="height:2.6em;"
          >
        </div>
        <div>
          <span class="text-bold text-cold">
            {{ nextDay.tempMin }}°
          </span>
          -
          <span class="text-bold text-hot">
            {{ nextDay.tempMax }}°
          </span>
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.text-cold {
  color: dodgerblue;
}

.text-hot {
  color: crimson;
}
</style>
