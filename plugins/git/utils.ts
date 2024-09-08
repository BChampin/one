// Gitlab speficic
export function generateRandomState (): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// LocalStorage operations
export function localStorageSet(key: string, value: any): void {
  localStorage.setItem(key, value)
}
export function localStorageGet(key: string): string|null {
  return localStorage.getItem(key)
}
export function localStorageRemove(key: string): void {
  localStorage.removeItem(key)
}
export function localStorageClear(): void {
  localStorage.clear()
}

