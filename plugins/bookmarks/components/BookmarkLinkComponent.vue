<script setup lang="ts">
import BookmarkLinkIcon from './BookmarkLinkIcon.vue';
import BookmarkLinkModal from './BookmarkLinkModal.vue'
import type { BookmarkLink, BookmarkLinkModalType } from '../types'

const { modelValue } = defineProps<{
  modelValue: BookmarkLink
}>()
const emit = defineEmits(['update:model-value', 'delete'])
const bookmarkLinkModalType : Ref<BookmarkLinkModalType | null> = ref(null)

const items = [
  [{
    label: 'Edit',
    icon: 'ph:pencil-simple',
    shortcuts: ['E'],
    click: () => {
      bookmarkLinkModalType.value = 'update'
    }
  },
  {
    label: 'Delete',
    icon: 'ph:x',
    color: 'red',
    shortcuts: ['D'],
    click: () => {
      bookmarkLinkModalType.value = 'delete'
    }
  }]
]

// Mouse over events
function addEventListener () {
  window.addEventListener('keydown', handleKeyboard)
}
function removeEventListener () {
  window.removeEventListener('keydown', handleKeyboard)
}
function handleKeyboard (event: any) {
  if (bookmarkLinkModalType.value) return
  if (event.code === 'KeyE') {
    bookmarkLinkModalType.value = 'update'
  } else if (event.code === 'KeyD') {
    bookmarkLinkModalType.value = 'delete'
  }
}

function askEmit () {
  emit('update:model-value', modelValue)
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboard)
})
</script>

<template>
  <div>
    <UDropdown
      :items="items"
      mode="hover"
      :popper="{ placement: 'bottom-start' }"
      :ui="{
        ring: 'ring-0'
      }"
      @mouseover="addEventListener"
      @mouseleave="removeEventListener"
    >
      <UButton
        :to="modelValue.url"
        :label="modelValue.name"
        trailing-icon="ph:caret-down"
        color="white"
        target="_blank"
      >
        <template #leading>
          <BookmarkLinkIcon v-model="modelValue.url" />
        </template>
      </UButton>
    </UDropdown>
    <BookmarkLinkModal
      v-if="modelValue && bookmarkLinkModalType"
      :modal-type="bookmarkLinkModalType"
      :model-value="modelValue"
      @update:model-value="modelValue = $event"
      @close="bookmarkLinkModalType = null"
      @save="
        emit('update:model-value', modelValue);
        bookmarkLinkModalType = null
      "
      @delete="
        emit('delete');
        bookmarkLinkModalType = null
      "
    />
  </div>
</template>
