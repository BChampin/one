<script setup lang="ts">
export interface Props {
  id?: string
  placeholder?: string
  'auto-capitalize'?: string
  'auto-complete'?: string
  'auto-correct'?: string
  disabled?: boolean
  class?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  // labels: () => ['one', 'two']
})
</script>

<template>
  <input
    :id="props.id"
    :auto-capitalize="props['auto-capitalize']"
    :auto-complete="props['auto-complete']"
    :auto-correct="props['auto-correct']"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :type="props.type"
    :class="`text-body1 text-text bd-grey br-8 px-sm ${props.class}`"
  />
</template>
