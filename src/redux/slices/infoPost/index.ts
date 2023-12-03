import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux';

interface IProps {
  price: number;
  acreage: number;
  address: string;
  phone: string;
}

const initialState: IProps = {
  price: 0,
  acreage: 0,
  address: '',
  phone: '',
};

const infoPostSlice = createSlice({
  name: 'infoPost',
  initialState,
  reducers: {
    infoPostAdded(state, action) {
      return (state = action.payload);
    },
  },
});

export const { infoPostAdded } = infoPostSlice.actions;
export const stateInfoPostSlice = (state: RootState) =>
  state.infoPost;
export default infoPostSlice.reducer;
