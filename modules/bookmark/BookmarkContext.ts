import { createContext, useContext } from 'react';
import { GitContext } from '@/context/Git';
import { BookmarkContextType } from './types'

const BookmarkContext = createContext<BookmarkContextType | null>(null);

const useBookmarkContext = () => {
  const gitContext = useContext(GitContext);
  const bookmarkState = useContext(BookmarkContext);

  if (!gitContext || !bookmarkState) {
    throw new Error('BookmarkContext must be used within a BookmarkProvider');
  }

  // TODO : for now, helpers and function are here
  const extractDomain = (link: string) => {
    try {
      return new URL(link).hostname
    } catch (e) {}
  }


  return {
    ...bookmarkState,
    gitRead: gitContext.gitRead,
    extractDomain,
  };
};

export { BookmarkContext, useBookmarkContext };
