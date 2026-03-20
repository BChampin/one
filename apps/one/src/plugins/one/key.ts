import type { InjectionKey } from 'vue'

import type { OneContext } from './types'

export const oneKey: InjectionKey<OneContext> = Symbol('one')
