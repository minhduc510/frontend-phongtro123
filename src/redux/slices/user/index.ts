import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/redux';
import { UserProps } from '@/interface';

const initialState: UserProps = {
  username: '',
  phone: '',
  email: '',
  avatar: '',
  code: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded(state, action) {
      return (state = action.payload);
    },
  },
});

export const { userAdded } = userSlice.actions;
export const stateUserSlice = (state: RootState) =>
  state.user;
export default userSlice.reducer;
