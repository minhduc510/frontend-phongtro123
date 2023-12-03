import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux';

import { AddressItemProps } from '@/interface';

const urlSearchParams = new URLSearchParams(
  window.location.search,
);
const { gia_tu, gia_den, dien_tich_tu, dien_tich_den } =
  Object.fromEntries(urlSearchParams.entries());

export interface CategoryProps {
  id: number | null;
  title: string;
  active: boolean;
}

export interface AddressProps {
  province: AddressItemProps;
  district: AddressItemProps;
  ward: AddressItemProps;
}

export interface RangeProps {
  min: number | null;
  max: number | null;
  title: string;
  active: boolean;
}

export interface FiltersProps {
  category: CategoryProps;
  address: AddressProps;
  range_price: RangeProps;
  range_acreage: RangeProps;
}

export const initialState: FiltersProps = {
  category: {
    id: 0,
    title: 'Phòng trọ, nhà trọ',
    active: true,
  },
  address: {
    ward: {
      code: null,
      title: '',
      active: false,
    },
    district: {
      code: null,
      title: '',
      active: false,
    },
    province: {
      code: null,
      title: '',
      active: false,
    },
  },
  range_price: {
    min: Number(gia_tu) || null,
    max: Number(gia_den) || null,
    title: '',
    active:
      Number(gia_tu) && Number(gia_den) ? true : false,
  },
  range_acreage: {
    min: Number(dien_tich_tu) || null,
    max: Number(dien_tich_den) || null,
    title: '',
    active:
      Number(dien_tich_tu) && Number(dien_tich_den)
        ? true
        : false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterCategoryAdded(state, action) {
      state.category = { ...action.payload, active: true };
    },
    filterAddressAdded(state, action) {
      state.address = action.payload;
    },
    filterProvinceAdded(state, action) {
      state.address.province = {
        ...action.payload,
        active: true,
      };
    },
    filterDistrictAdded(state, action) {
      state.address.district = action.payload;
    },
    filterRangePriceAdded(state, action) {
      state.range_price = {
        active: true,
        ...action.payload,
      };
    },
    filterRangeAcreageAdded(state, action) {
      state.range_acreage = {
        active: true,
        ...action.payload,
      };
    },
    filterCategoryRemoved(state) {
      state.category = initialState.category;
    },
    filterAddressRemoved(state) {
      state.address = initialState.address;
    },
    filterRangePriceRemoved(state) {
      state.range_price = {
        ...initialState.range_price,
        active: false,
      };
    },
    filterRangeAcreageRemoved(state) {
      state.range_acreage = {
        ...initialState.range_acreage,
        active: false,
      };
    },
    filterRemoved(state) {
      state.category = initialState.category;
      state.address = initialState.address;
      state.range_price = initialState.range_price;
      state.range_acreage = initialState.range_acreage;
    },
  },
});

export const {
  filterRemoved,
  filterCategoryAdded,
  filterAddressAdded,
  filterProvinceAdded,
  filterDistrictAdded,
  filterRangePriceAdded,
  filterRangeAcreageAdded,
  filterCategoryRemoved,
  filterRangePriceRemoved,
  filterRangeAcreageRemoved,
  filterAddressRemoved,
} = filtersSlice.actions;
export const stateFiltersSlice = (state: RootState) =>
  state.filters;
export default filtersSlice.reducer;
