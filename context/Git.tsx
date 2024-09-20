'use client';

import { createContext, useContext, useReducer } from 'react';
import { Git } from '@/types/Git'

const initialState = {
  type: 'gitlab',
  session: null,
};

async function gitReducer(state: Git, action: any) {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, session: action.session };
    case 'gitRead': {
      return 'await gitRead(test)'
    }
    default: {
      return state
    }
  }
}

export const GitContext = createContext(null);

export const useGit = () => {
  return useContext(GitContext)
}

export function GitProvider({ children }) {
  const [state, dispatch] = useReducer(
    gitReducer,
    initialState

  );
  const setSession = (session: any) => dispatch({ type: 'SET_SESSION', session });

  // TODO make this computed based on state.session / const baseRequest =
  // {
  //   // requestSetup: {
  //   //   baseUri: `https://gitlab.com/api/v4/projects/${process.env.NEXT_PUBLIC_GITLAB_PROJECT_ID}/repository/`,
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     // Authorization: `Bearer ${session?.accessToken}`,
  //   //   }
  //   // }
  //   type: 'gitlab',
  //   session,
  // }

  const gitRead = async (path: string) => {
    return `path: ${path}`
  }

  const value = {
    type: state.type,
    session: state.session,
    dispatch,
    setSession,
    gitRead,
  };

  return (
    <GitContext.Provider value={value}>
      {children}
    </GitContext.Provider>
  );
}
