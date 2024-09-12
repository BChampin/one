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
  image?: string;
  icon?: string;
  color?: string;
  categories: BookmarkCategory[];
}

export type BookmarkLinkModalType = 'create' | 'update' | 'delete'
