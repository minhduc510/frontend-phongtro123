/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import { apiClient } from '@/api';
import { Group } from '@/components';
import { stateMenusSlice } from '@/redux/slices/menus';
import { stateCategoriesSlice } from '@/redux/slices/categories';

const GroupsMain = () => {
  const location = useLocation();
  const [groups, setGroups] = useState([]);
  const menus = useAppSelector(stateMenusSlice);
  const categories = useAppSelector(stateCategoriesSlice);

  useEffect(() => {
    if (menus.length > 0 && categories.length) {
      const menu = menus.filter(
        ({ slug }) => slug === location.pathname,
      );
      let id = 1;
      if (menu.length === 0) {
        const category = categories.find(
          (item) => `/${item.slug}` === location.pathname,
        );
        id = category?.id ?? 1;
      } else {
        const category = categories.filter(
          (item) =>
            item.id ===
            (menu[0].category_id ? menu[0].category_id : 1),
        )[0];
        id = category ? category.id : 1;
      }
      const callApi = async () => {
        const { error, data } = await apiClient.groups(id);
        if (!error) {
          setGroups(data);
        }
      };
      callApi();
    }
  }, [location.pathname, menus.length, categories.length]);
  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 2 }}
        justifyContent={{ xs: 'initial', sm: 'center' }}
        className="max-sm:overflow-x-scroll max-lg:px-2"
      >
        {groups.length > 0 &&
          groups.map((item, index) => (
            <Fragment key={index}>
              <Group data={item} />
            </Fragment>
          ))}
      </Stack>
    </>
  );
};

export default GroupsMain;
