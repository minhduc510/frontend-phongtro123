import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux';
import { CategoryProps } from '@/interface';

const initialState: CategoryProps[] = [];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesAdded(state, action) {
      return (state = action.payload);
    },
  },
});

export const { categoriesAdded } = categoriesSlice.actions;
export const stateCategoriesSlice = (state: RootState) =>
  state.categories;
export default categoriesSlice.reducer;
