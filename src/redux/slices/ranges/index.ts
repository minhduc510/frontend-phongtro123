import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux';

import { RangeFilterProps } from '@/interface';

interface IProps {
  rangePrice: RangeFilterProps[] | [];
  rangeAcreage: RangeFilterProps[] | [];
}

const initialState: IProps = {
  rangePrice: [],
  rangeAcreage: [],
};

const rangesSlice = createSlice({
  name: 'ranges',
  initialState,
  reducers: {
    rangePriceAdded(state, action) {
      state.rangePrice = action.payload;
    },
    rangeAcreageAdded(state, action) {
      state.rangeAcreage = action.payload;
    },
  },
});

export const { rangePriceAdded, rangeAcreageAdded } =
  rangesSlice.actions;
export const stateRangesSlice = (state: RootState) =>
  state.ranges;
export default rangesSlice.reducer;
