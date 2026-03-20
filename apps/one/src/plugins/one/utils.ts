export async function loadFile<T = string>(path: string): Promise<T> {
  const res = await fetch(`/oneData/${path}`)

  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status} ${res.statusText}`)
  }

  const payload = path.endsWith('.json') ? await res.json() : await res.text()

  return payload as T
}
