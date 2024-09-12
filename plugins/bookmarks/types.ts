export interface BookmarkLink {
  url: string;
  name?: string;
}

export interface BookmarkCategory {
  name: string;
  links: BookmarkLink[];
}

export interface BookmarkSpace {
  name: string;
  categories: BookmarkCategory[];
}

export type BookmarkLinkModalType = 'create' | 'update' | 'delete'
