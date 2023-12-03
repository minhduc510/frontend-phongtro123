/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import path from '@/routes/path';
import { apiClient } from '@/api';
import { Filter, Posts } from '@/components';
import { AddressItemProps } from '@/interface';
import {
  initialState,
  filterAddressAdded,
  filterRangeAcreageAdded,
  filterRangePriceAdded,
} from '@/redux/slices/filter';
import { stateRangesSlice } from '@/redux/slices/ranges';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import {
  BoxFilter,
  BoxCategory,
  ListPostBox,
} from '@/components';

interface HeaderProps {
  title: string;
  description: string;
}

const Search = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { rangePrice, rangeAcreage } = useAppSelector(
    stateRangesSlice,
  );
  const initStatAddressItem = {
    title: '',
    code: 0,
    active: false,
  };
  const [dataProvinceParams, setDataProvinceParams] =
    useState<AddressItemProps>(initStatAddressItem);
  const [dataDistrictParams, setDataDistrictParams] =
    useState<AddressItemProps>(initStatAddressItem);
  const [dataWardParams, setDataWardParams] =
    useState<AddressItemProps>(initStatAddressItem);
  const [header, setHeader] = useState<HeaderProps>({
    title: '',
    description: '',
  });

  const handleTextPriceAndAcreage = (
    thumb1: number,
    thumb2: number,
    lastMax: number,
    typeContent: 'price' | 'acreage',
  ) => {
    const numberMin = thumb1 > thumb2 ? thumb2 : thumb1;
    const numberMax = thumb1 > thumb2 ? thumb1 : thumb2;
    let valueMin = numberMin;
    let valueMax = numberMax;
    if (typeContent === 'price') {
      valueMin = numberMin / Math.pow(10, 6);
      valueMax = numberMax / Math.pow(10, 6);
    }
    if (thumb1 >= lastMax && thumb2 === 0) {
      return `Trên ${valueMax} ${
        typeContent === 'price' ? 'triệu' : 'm'
      }`;
    }
    return `Từ ${valueMin} - ${valueMax}${
      typeContent === 'price' ? ' triệu' : 'm'
    }`;
  };

  useEffect(() => {
    if (rangePrice.length > 0 && rangeAcreage.length > 0) {
      const minPrice = searchParams.get('gia_tu');
      const maxPrice = searchParams.get('gia_den');
      const minAcreage = searchParams.get('dien_tich_tu');
      const maxAcreage = searchParams.get('dien_tich_den');
      if (minPrice || maxPrice) {
        dispatch(
          filterRangePriceAdded({
            min: `${Number(minPrice)}`,
            max: maxPrice ? maxPrice : Math.pow(10, 9),
            title: handleTextPriceAndAcreage(
              Number(minPrice),
              Number(maxPrice),
              Number(rangePrice[rangePrice.length - 1].min),
              'price',
            ),
          }),
        );
      }
      if (minAcreage || maxAcreage) {
        dispatch(
          filterRangeAcreageAdded({
            min: `${Number(minAcreage)}`,
            max: maxAcreage ? maxAcreage : Math.pow(10, 9),
            title: handleTextPriceAndAcreage(
              Number(minAcreage),
              Number(maxAcreage),
              Number(
                rangeAcreage[rangeAcreage.length - 1].min,
              ),
              'acreage',
            ),
          }),
        );
      }
    }
  }, [
    rangePrice.length,
    rangeAcreage.length,
    location.search,
  ]);

  const paramsProvince = searchParams.get('province') ?? '';
  const paramsDistrict = searchParams.get('district') ?? '';
  const paramsWard = searchParams.get('ward') ?? '';
  useEffect(() => {
    if (paramsProvince) {
      const callApiProvince = async () => {
        const { error, data } =
          await apiClient.exactProvince(paramsProvince);
        if (!error) {
          setDataProvinceParams({
            code: data.code,
            title: data.title,
            active: true,
          });
        }
      };
      callApiProvince();
    }
    if (paramsDistrict) {
      const callApiDistrict = async () => {
        const { error, data } =
          await apiClient.exactDistrict(paramsDistrict);
        if (!error) {
          setDataDistrictParams({
            code: data.code,
            title: data.title,
            active: true,
          });
        }
      };
      callApiDistrict();
    }
    if (paramsWard) {
      const callApiWard = async () => {
        const { error, data } = await apiClient.exactWard(
          paramsWard,
        );
        if (!error) {
          setDataWardParams({
            code: data.code,
            title: data.title,
            active: true,
          });
        }
      };
      callApiWard();
    }
  }, [paramsProvince, paramsDistrict, paramsWard]);

  useEffect(() => {
    if (
      dataProvinceParams.active ||
      dataDistrictParams.active ||
      dataWardParams.active
    ) {
      const objFilterAddress = { ...initialState.address };
      if (dataProvinceParams.active) {
        objFilterAddress.province = dataProvinceParams;
      }
      if (dataDistrictParams.active) {
        objFilterAddress.district = dataDistrictParams;
      }
      if (dataWardParams.active) {
        objFilterAddress.ward = dataWardParams;
      }
      dispatch(filterAddressAdded(objFilterAddress));
    }
  }, [
    JSON.stringify(dataProvinceParams),
    JSON.stringify(dataDistrictParams),
    JSON.stringify(dataWardParams),
  ]);

  return (
    <main>
      <Filter />
      <h2 className="font-medium lg:text-3xl max-lg:text-2xl mt-5 max-sm:px-2">
        {header.title}
      </h2>
      <p className="max-lg:text-sm max-sm:px-2">
        {header.description}
      </p>
      <div className="py-3">
        <Grid container spacing={{ xs: 2 }}>
          <Grid item xs={12} lg={8}>
            <Posts setHeader={setHeader} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2}>
              {location.pathname === path.home && (
                <Grid item xs={12}>
                  <BoxCategory />
                </Grid>
              )}
              <Grid item xs={12} sm={6} lg={12}>
                <BoxFilter data={rangePrice} type="price" />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <BoxFilter
                  data={rangeAcreage}
                  type="acreage"
                />
              </Grid>
              <Grid item xs={12}>
                <ListPostBox />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default Search;
