<script setup lang="ts">
// #region IMPORTS AND INIT
import { computed, ref } from 'vue'
import { useOneStore } from '@/stores/one'
const oneStore = useOneStore()
import KbdShortcut from '@/components/atoms/KbdShortcut.vue'
import KbdButton from '@/components/atoms/KbdButton.vue'
import { ListboxFilter } from 'reka-ui'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
// #endregion

interface CommandOption {
  label: string
  shortcut?: string
  prefix?: string
  ref?: string
}

// Focus on shortcut
const commandInputRef = ref<InstanceType<typeof ListboxFilter> | null>(null)
const popoverRef = ref<{ open: boolean } | null>(null)
const focusCommandInput = () => {
  // commandInputRef.value?.focus()
  const inputEl = commandInputRef.value?.$el?.querySelector('input')
  if (inputEl) {
    inputEl.focus()
    if (popoverRef.value) popoverRef.value.open = true
    // console.log(popoverRef.value)
    // popoverOpen.value = true
  }
}

// Options
const commandOptionsDefault = [
  {
    heading: 'Search',
    items: [
      { label: 'Twitch', shortcut: ':tw', ref: 'https://twitch.tv/%s' },
      { label: 'GitHub', shortcut: ':gh', ref: 'https://github.com/search?q=%s&type=repositories' },
      { label: 'Youtube', shortcut: ':yt', ref: 'https://www.youtube.com/results?search_query=%s' },
    ]
  }
]

const commandOptions = computed(() => {
  if (!oneStore.loggedIn) return commandOptionsDefault
  else {
    return commandOptionsDefault
  }
})


const selectedCommandOption = ref<CommandOption>()
</script>

<template>
  <Command class="rounded-lg border max-w-[450px]">
    <Popover>
      <PopoverTrigger>
        <CommandInput
          ref="commandInputRef"
          placeholder="Type a command or search..."
          :auto-focus="false"
        >
          <KbdButton
            keys="Ctrl+K"
            :callback="focusCommandInput"
          />
        </CommandInput>
      </PopoverTrigger>
      <PopoverContent
        class="p-0 popover-content-width-same-as-its-trigger"
        :side-offset="5"
      >
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <template
            v-for="(group, i) of commandOptions"
            :key="i"
          >
            <CommandSeparator v-if="i !== 0" />
            <CommandGroup :heading="group.heading">
              <CommandItem
                v-for="(item, j) of group.items"
                :key="j"
                :value="item.label"
                @select="() => {
                  selectedCommandOption = item
                }"
              >
                ICON
                <span>{{ item.label }}</span>
                <CommandShortcut>
                  <KbdShortcut :keys="item.shortcut" />
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </PopoverContent>
    </Popover>
  </Command>
</template>

<style lang="css">
/* https://github.com/shadcn-ui/ui/issues/1690#issuecomment-1750730257 */
.popover-content-width-same-as-its-trigger {
  width: var(--reka-popper-anchor-width);
}
</style>
