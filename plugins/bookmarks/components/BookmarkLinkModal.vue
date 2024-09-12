<script setup lang="ts">
import { ref } from 'vue'
import BookmarkLinkIcon from './BookmarkLinkIcon.vue'
import type { BookmarkLink, BookmarkLinkModalType } from '../types'
const emit = defineEmits(['save', 'delete'])
const { modelValue, modalType } = defineProps<{
  modelValue: BookmarkLink
  modalType: BookmarkLinkModalType
}>()

const showModal = ref(true)

const textMap = {
  create: {
    title: 'Add a new link'
  },
  update: {
    title: 'Edit a link'
  },
  delete: {
    title: 'Delete a link'
  }
}

function saveLink () {
  if (modelValue.url) emit('save')
}
</script>

<template>
  <UModal v-model="showModal">
    <UCard
      :ui="{
        header: { padding: 'py-2' },
        body: { padding: 'py-2' },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            {{ textMap[modalType].title }}
          </div>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="showModal = false" />
        </div>
      </template>

      <!-- Create / Update -->
      <template v-if="modalType === 'create' || modalType === 'update'">
        <div class="column gutter-y-sm">
          <UInput
            v-model="modelValue.url"
            placeholder="Url *"
            autofocus
            @keyup.enter="saveLink"
          >
            <template #leading>
              <BookmarkLinkIcon v-model="modelValue.url" />
            </template>
          </UInput>
          <UInput
            v-model="modelValue.name"
            placeholder="Label"
            @keyup.enter="saveLink"
          />
        </div>
        <div class="row justify-end mt-sm">
          <UButton
            :disabled="!modelValue.url"
            label="Save"
            icon="ph:floppy-disk"
            color="green"
            @click="saveLink"
          />
        </div>
      </template>

      <!-- Deletion -->
      <template v-else-if="modalType === 'delete'">
        <div class="row">
          Are you sure you want to delete this link ?
        </div>
        <div class="flex items-center">
          <BookmarkLinkIcon v-model="modelValue.url" />
          <UKbd :value="modelValue.url" />
        </div>
        <div class="row mt-md justify-around">
          <UButton
            label="Cancel"
            color="black"
            @click="showModal = false"
          />
          <UButton
            label="Delete (no click action yet)"
            color="red"
            @click="
              emit('delete');
              showModal = false;
            "
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
