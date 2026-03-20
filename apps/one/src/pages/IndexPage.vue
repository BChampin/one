<script setup lang="ts">
import InputText from 'primevue/inputtext'

import Select from 'primevue/select'

import { useOne } from '@/plugins/one'

const one = useOne()
</script>

<template>
  <h1>You did it!</h1>
  <div class="text-primary text-bold">Test</div>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <div>
    <InputText type="text" />
    <Select />
  </div>
  <div># On test one</div>
  <div>
    <pre>
      {{ one.ready ? JSON.stringify(one.config, null, 2) : 'One is still initializing...' }}
    </pre>
  </div>
</template>
