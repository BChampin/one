'use client';

import { useEffect } from 'react';
import { GitProvider, useGit } from '@/context/Git';

export default function GitWrapper ({ children, session }) {
  const usGit = useGit() // Value of createContext in the context file
  useEffect(() => {
    if (session && usGit) usGit.setSession(session)
  }, [session])

  return (
    <GitProvider>
      {children}
    </GitProvider>
  );
};
