<script setup lang="ts">
import ModuleTemplatePanel from '../components/ModuleTemplatePanel.vue'
</script>

<template>
  <section class="q-pa-md">
    <h1 class="text-h4 text-bold q-mb-md">Module template</h1>
    <p class="q-mb-lg">
      This route is exported by the module and can later be picked up by One and added to the
      router.
    </p>

    <ModuleTemplatePanel
      title="Shared module component"
      description="Views stay route-driven, while reusable UI can be exported from the module itself."
    />
  </section>
</template>
