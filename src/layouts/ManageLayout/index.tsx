/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';

import Header from './Header';
import SideBar from './SideBar';

import {
  stateCategoriesSlice,
  categoriesAdded,
} from '@/redux/slices/categories';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import { apiClient } from '@/api';

const ManageLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const sideBarRef = useRef<HTMLDivElement>(null);
  const categories = useAppSelector(stateCategoriesSlice);

  const [marginSideBar, setMarginSideBar] =
    useState<number>(0);

  useEffect(() => {
    if (sideBarRef.current)
      setMarginSideBar(sideBarRef.current.offsetWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    if (!categories.length) {
      const callApi = async () => {
        const { error, data } =
          await apiClient.categories();
        if (!error) {
          dispatch(categoriesAdded(data));
        }
      };
      callApi();
    }
  }, []);
  return (
    <>
      <Header />
      <Grid container className="mt-[50px]">
        <Grid
          item
          xs={2}
          lg={2}
          ref={sideBarRef}
          className="bg-gray-50 px-4 border-r border-gray-300 fixed top-[50px] bottom-0 left-0 w-full max-lg:hidden"
        >
          <SideBar />
        </Grid>
        <Grid
          item
          xs={12}
          lg={10}
          style={{ marginLeft: `${marginSideBar}px` }}
        >
          <div className="sm:px-10">{children}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default ManageLayout;
