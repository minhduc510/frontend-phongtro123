import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux';
import { MenusProps } from '@/interface';

const initialState: MenusProps[] = [];

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    menuAdded(state, action) {
      return (state = action.payload);
    },
  },
});

export const { menuAdded } = menusSlice.actions;
export const stateMenusSlice = (state: RootState) =>
  state.menus;
export default menusSlice.reducer;
