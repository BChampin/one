<script setup lang="ts">
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import { useOne } from '@/plugins/one'

const query = ref('')
const one = useOne()
const inputRef = ref<{ $el?: HTMLInputElement } | null>(null)

const items = computed(
  () => one.config?.base.commands.find((cs) => cs.name === 'search')?.items ?? [],
)

const matchedItem = computed(() => {
  return items.value.find(
    (item) => typeof item.shortcut === 'string' && query.value.startsWith(item.shortcut),
  )
})

const searchText = computed(() => {
  if (!matchedItem.value) return query.value
  return query.value.replace(matchedItem.value.shortcut ?? '', '').trim()
})

function onEnter() {
  if (!matchedItem.value) return

  const encoded = encodeURIComponent(searchText.value)
  const url = matchedItem.value.ref.replace('%s', encoded)
  window.open(url, '_blank')
  query.value = ''
}

function focus() {
  const el = inputRef.value?.$el as HTMLInputElement | null | undefined
  el?.focus()
}

function blur() {
  const el = inputRef.value?.$el as HTMLInputElement | null | undefined
  el?.blur()
}

function toggleFocus() {
  const el = inputRef.value?.$el as HTMLInputElement | null | undefined
  if (!el) return

  if (document.activeElement === el) {
    blur()
    return
  }

  focus()
}

defineExpose({
  focus,
  blur,
  toggleFocus,
})
</script>

<template>
  <InputText
    ref="inputRef"
    v-model="query"
    placeholder="Start searching ..."
    class="w-full"
    @keydown.enter="onEnter"
  />

  <Card v-if="matchedItem" class="mt-2">
    <template #content>
      <div class="flex items-center justify-between">
        <span>
          Using <strong>{{ matchedItem.label }}</strong>
        </span>
        <span class="text-sm opacity-70">
          {{ searchText }}
        </span>
      </div>
    </template>
  </Card>
</template>
