import { inject } from 'vue'

import { oneKey } from './key'

export function useOne() {
  const one = inject(oneKey)

  if (!one) {
    throw new Error('useOne() must be used after the One provider has been installed')
  }

  return one
}
