'use client';

import React, { useContext, useEffect, useReducer, useState } from 'react';
import { BookmarkContext } from './BookmarkContext';
import { GitContext } from '@/context/Git';
import { BookmarkSpace } from './types'

interface BookmarkProviderProps {
  children: React.ReactNode;
}

const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const { gitRead } = useContext(GitContext);
  const [spaces, setSpaces] = useState<BookmarkSpace[]>([]);
  const [currentSpace, setCurrentSpace] = useState<BookmarkSpace | null>(null);

  const selectFirst = () => {
    if (spaces && spaces[0]) setCurrentSpace(spaces[0])
  }

  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarksSpaces = await gitRead('bookmarks/bookmarks.json');
      setSpaces(bookmarksSpaces);
      selectFirst()
    };
    fetchBookmarks();
  }, [gitRead]);

  return (
    <BookmarkContext.Provider value={{
      spaces,
      currentSpace,
      setCurrentSpace,
      gitRead,
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
