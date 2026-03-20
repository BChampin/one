export interface BookmarkLink {
  label: string
  url: string
}

export interface BookmarkCategory {
  label: string
  links: BookmarkLink[]
}

export interface BookmarkSpace {
  label: string
  categories: BookmarkCategory[]
}
