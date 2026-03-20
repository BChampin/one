import type { BookmarkCategory, BookmarkLink, BookmarkSpace } from './types'

const SPACE_LINE_RE = /^#\s+(.+)$/u
const BULLET_LINE_RE = /^(\s*)-\s+(.+)$/u
const LINK_RE = /^\[([^\]]*)\]\(([^)]*)\)$/u

function isProbablyUrl(value: string) {
  if (!value) {
    return false
  }

  try {
    const parsed = new URL(value)
    return Boolean(parsed.protocol)
  } catch {
    return /^(https?:\/\/|mailto:|ftp:\/\/|file:\/\/|\/\/)/i.test(value) || /^[\w.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(value)
  }
}

function normalizeUrl(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return trimmed
  }

  if (/^[a-z][a-z\d+.-]*:/i.test(trimmed) || trimmed.startsWith('//')) {
    return trimmed
  }

  if (/^[\w.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(trimmed)) {
    return `https://${trimmed}`
  }

  return trimmed
}

function labelFromUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./i, '')
  } catch {
    return url
  }
}

function parseLink(content: string): BookmarkLink | null {
  const match = content.match(LINK_RE)

  if (!match) {
    return null
  }

  const [, rawText = '', rawHref = ''] = match
  const text = rawText.trim()
  const href = rawHref.trim()
  const textLooksLikeUrl = isProbablyUrl(text)
  const hrefLooksLikeUrl = isProbablyUrl(href)

  let url = ''
  let label = ''

  if (textLooksLikeUrl && !hrefLooksLikeUrl) {
    url = normalizeUrl(text)
    label = href || labelFromUrl(url)
  } else if (!textLooksLikeUrl && hrefLooksLikeUrl) {
    url = normalizeUrl(href)
    label = text || labelFromUrl(url)
  } else if (textLooksLikeUrl && hrefLooksLikeUrl) {
    url = normalizeUrl(href)
    label = text || labelFromUrl(url)
  } else {
    url = normalizeUrl(href || text)
    label = text || href || labelFromUrl(url)
  }

  if (!label || isProbablyUrl(label)) {
    label = labelFromUrl(url)
  }

  return {
    label,
    url,
  }
}

function createCategory(label: string): BookmarkCategory {
  return {
    label,
    links: [],
  }
}

function ensureCategory(space: BookmarkSpace, label = 'General'): BookmarkCategory {
  const existing = space.categories.find((category) => category.label === label)

  if (existing) {
    return existing
  }

  const category = createCategory(label)
  space.categories.push(category)
  return category
}

export function deserializeBookmarks(markdown: string): BookmarkSpace[] {
  const spaces: BookmarkSpace[] = []
  let currentSpace: BookmarkSpace | null = null
  let currentCategory: BookmarkCategory | null = null

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd()
    const trimmed = line.trim()

    if (!trimmed || trimmed === '---') {
      continue
    }

    const spaceMatch = line.match(SPACE_LINE_RE)

    if (spaceMatch) {
      currentSpace = {
        label: (spaceMatch[1] ?? '').trim(),
        categories: [],
      }
      spaces.push(currentSpace)
      currentCategory = null
      continue
    }

    const bulletMatch = line.match(BULLET_LINE_RE)

    if (!bulletMatch || !currentSpace) {
      continue
    }

    const content = (bulletMatch[2] ?? '').trim()
    const link = parseLink(content)

    if (link) {
      const category: BookmarkCategory = currentCategory ?? ensureCategory(currentSpace)
      category.links.push(link)
      currentCategory = category
      continue
    }

    currentCategory = createCategory(content)
    currentSpace.categories.push(currentCategory)
  }

  return spaces
}

export function serializeBookmarks(spaces: BookmarkSpace[]) {
  return spaces
    .map((space) => {
      const categoryLines = space.categories.map((category) => {
        const linkLines = category.links.map((link) => `  - [${link.label}](${link.url})`)

        return [`- ${category.label}`, ...linkLines].join('\n')
      })

      return [`# ${space.label}`, ...categoryLines].join('\n\n')
    })
    .join('\n\n---\n\n')
}
