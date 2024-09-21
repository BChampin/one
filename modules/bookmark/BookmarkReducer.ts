import { BookmarkState } from './types'

const initialState: BookmarkState = {
  spaces: [],
};

const bookmarkReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // Add cases for updating the spaces array
    default:
      return state;
  }
};

export default bookmarkReducer;
