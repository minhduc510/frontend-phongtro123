/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import Groups from './Groups';
import path from '@/routes/path';
import NotFound from '../NotFound';
import { apiClient } from '@/api';
import { MdOutlineKeyboardArrowRight } from '@/icons';
import { stateMenusSlice } from '@/redux/slices/menus';
import {
  Posts,
  BoxFilter,
  ListPostBox,
} from '@/components';
import { HeaderProps } from '@/interface';
import { BoxCategory, Filter } from '@/components';
import { stateCategoriesSlice } from '@/redux/slices/categories';
import {
  filterRangeAcreageAdded,
  filterRangePriceAdded,
} from '@/redux/slices/filter';
import {
  rangePriceAdded,
  rangeAcreageAdded,
  stateRangesSlice,
} from '@/redux/slices/ranges';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';

const DefaultPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  let { slug } = useParams();
  const menus = useAppSelector(stateMenusSlice);
  const categories = useAppSelector(stateCategoriesSlice);
  const [searchParams] = useSearchParams();
  const { rangePrice, rangeAcreage } = useAppSelector(
    stateRangesSlice,
  );

  const [notFound, setNotFound] = useState<boolean>(false);

  const [header, setHeader] = useState<HeaderProps>({
    title: '',
    description: '',
  });

  const title_menu = menus.find(
    (item) => item.slug === location.pathname,
  );

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

  useEffect(() => {
    if (menus.length > 0) {
      if (!slug) {
        slug = '';
      }
      const menuExist = menus.some(
        (item) => item.slug === `/${slug}`,
      );
      const categoryExist = categories.some(
        (item) => item.slug === `${slug}`,
      );
      let notfound = true;
      if (menuExist) notfound = false;
      if (categoryExist) notfound = false;
      setNotFound(notfound);
    }
  }, [
    JSON.stringify(menus),
    JSON.stringify(categories),
    slug,
  ]);

  useEffect(() => {
    const callApi = async () => {
      const responseRangePrice =
        await apiClient.rangePrice();
      const responseRangeAcreage =
        await apiClient.rangeAcreage();
      if (!responseRangePrice.error)
        dispatch(rangePriceAdded(responseRangePrice.data));
      if (!responseRangeAcreage.error)
        dispatch(
          rangeAcreageAdded(responseRangeAcreage.data),
        );
    };
    callApi();
  }, []);

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <main>
          <Filter />
          <Stack
            direction="row"
            alignItems="center"
            className="mt-5"
          >
            {location.pathname !== path.home && (
              <>
                <span className="text-blue-primary">
                  Trang chủ
                </span>{' '}
                <MdOutlineKeyboardArrowRight />{' '}
                <span className="text-blue-primary">
                  {title_menu?.name}
                </span>
              </>
            )}
          </Stack>
          <h2 className="font-medium lg:text-3xl max-lg:text-2xl mt-1 max-sm:px-2">
            {header.title}
          </h2>
          <p className="max-lg:text-sm max-sm:px-2">
            {header.description}
          </p>
          <div className="py-5">
            <Groups />
          </div>
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
                    <BoxFilter
                      data={rangePrice}
                      type="price"
                    />
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
      )}
    </>
  );
};

export default DefaultPage;
