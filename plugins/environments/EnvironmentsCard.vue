<script setup lang="ts">
import { useEnvironmentsStore } from './store'

const environmentsStore = useEnvironmentsStore()
const envsData = await environmentsStore.read()

</script>

<template>
  <div>
    Environments Card
    <pre>
      {{ envsData }}
    </pre>
  </div>
</template>
