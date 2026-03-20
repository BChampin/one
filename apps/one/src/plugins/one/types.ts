import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface OneCommandOption {
  label: string
  shortcut?: string
  ref: string
}

export interface OneCommandSection {
  name: string
  items: OneCommandOption[]
}

export interface OneBase {
  commands: OneCommandSection[]
}

export interface OneConfig {
  base: OneBase
  modules: string[]
}

export interface OneState {
  ready: boolean
  loading: boolean
  error: string | null
  config: OneConfig | null
  loadedModules: OneModule[]
  loadedRoutes: OneModuleRoute[]
}

export type OneModuleRoute = Omit<RouteRecordRaw, 'name'> & {
  name: string
  label: string
  shortcut?: string
  main?: boolean
}

export type OneModuleFiles = Record<string, string>

export type OneModuleFilesToData = (one: OneContext, files: OneModuleFiles) => Promise<void> | void

export type OneModuleDataToFiles = (one: OneContext) => Promise<OneModuleFiles> | OneModuleFiles

export interface OneModule {
  label: string
  slug: string
  description: string
  init: (one: OneContext) => Promise<void> | void
  load: (one: OneContext) => Promise<void> | void
  filesToData?: OneModuleFilesToData
  dataToFiles?: OneModuleDataToFiles
  routes?: OneModuleRoute[]
  components?: Record<string, Component>
  views?: Record<string, Component>
  dataFile?: string
  dataFiles?: string[]
}

export interface OneActions {
  init: () => Promise<void>
  refresh: () => Promise<void>
}

export type OneContext = Readonly<OneState> & OneActions
