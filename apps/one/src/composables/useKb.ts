import { computed, onScopeDispose, ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export interface ShortcutBinding {
  shortcut: string
  handler: (event: KeyboardEvent) => void
  preventDefault?: boolean
  stopPropagation?: boolean
  allowRepeat?: boolean
}

type ParsedShortcut = {
  key: string
  ctrlKey: boolean
  altKey: boolean
  shiftKey: boolean
  metaKey: boolean
}

function normalizeShortcut(shortcut: string): ParsedShortcut {
  const parts = shortcut
    .split('+')
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)

  const normalized: ParsedShortcut = {
    key: '',
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
  }

  for (const part of parts) {
    if (part === 'ctrl' || part === 'control') {
      normalized.ctrlKey = true
      continue
    }

    if (part === 'alt' || part === 'option') {
      normalized.altKey = true
      continue
    }

    if (part === 'shift') {
      normalized.shiftKey = true
      continue
    }

    if (part === 'meta' || part === 'cmd' || part === 'command') {
      normalized.metaKey = true
      continue
    }

    normalized.key = part
  }

  return normalized
}

function matchesShortcut(event: KeyboardEvent, shortcut: ParsedShortcut) {
  return (
    event.key.toLowerCase() === shortcut.key &&
    event.ctrlKey === shortcut.ctrlKey &&
    event.altKey === shortcut.altKey &&
    event.shiftKey === shortcut.shiftKey &&
    event.metaKey === shortcut.metaKey
  )
}

export function useKb(bindings: MaybeRefOrGetter<ShortcutBinding[]>) {
  const activeBindings = ref<ShortcutBinding[]>([])
  const parsedBindings = computed(() =>
    activeBindings.value.map((binding) => ({
      binding,
      shortcut: normalizeShortcut(binding.shortcut),
    })),
  )

  function onKeydown(event: KeyboardEvent) {
    for (const entry of parsedBindings.value) {
      if (!entry.binding.allowRepeat && event.repeat) continue
      if (!matchesShortcut(event, entry.shortcut)) continue

      if (entry.binding.preventDefault !== false) event.preventDefault()
      if (entry.binding.stopPropagation) event.stopPropagation()

      entry.binding.handler(event)
      break
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeydown)
  }

  watchEffect(() => {
    activeBindings.value = [...toValue(bindings)]
  })

  onScopeDispose(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', onKeydown)
    }
  })
}
