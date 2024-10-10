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

// React added below
export interface BookmarkState {
  spaces: BookmarkSpace[];
}

export interface BookmarkContextType {
  spaces: string[];
  currentSpace: BookmarkSpace | null
  setCurrentSpace: (path: string) => Promise<string>;
  gitRead: (path: string) => Promise<string>;
}
