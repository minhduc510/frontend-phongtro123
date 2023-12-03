import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux';

const initialState = {
  total: 0,
  list: [],
};

const postFavouriteSlice = createSlice({
  name: 'postFavourite',
  initialState,
  reducers: {
    pushPostFavourite(state, action) {
      const { total, list } = action.payload;
      state.total = total;
      state.list = list;
    },
    setLengthPostFavourite(state, action) {
      state.total = action.payload;
    },
    removePostFavourite(state) {
      state.total = initialState.total;
      state.list = initialState.list;
    },
  },
});

export const {
  pushPostFavourite,
  removePostFavourite,
  setLengthPostFavourite,
} = postFavouriteSlice.actions;
export const statePostFavouriteSlice = (state: RootState) =>
  state.postFavourite;
export default postFavouriteSlice.reducer;
