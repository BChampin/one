<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import KbdShortcut from '@/components/atoms/KbdShortcut.vue'
import { useMagicKeys } from '@vueuse/core'

const props = defineProps<{
  keys: string,
  callback: () => void
}>()

const magicKeys = useMagicKeys()
const watchedKeys = magicKeys[props.keys]


const handleKeydown = (event: KeyboardEvent) => {
  const keys = props.keys.toLowerCase().split('+')
  const ctrlOrMeta = keys.includes('ctrl') || keys.includes('cmd')
  const key = keys.find(k => k !== 'ctrl' && k !== 'cmd')

  if ((ctrlOrMeta && (event.ctrlKey || event.metaKey)) && event.key.toLowerCase() === key) {
    event.preventDefault()
    props.callback()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown, true) // Capture phase
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown, true)
})

watch(watchedKeys, (v) => {
  if (props.callback && v) props.callback()
})
</script>

<template>
  <KbdShortcut
    v-if="props.keys"
    :keys="props.keys"
  />
</template>
