/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
// import { CategoryProps } from '@/interface';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import { MdOutlineKeyboardArrowRight } from '@/icons';
import { stateMenusSlice } from '@/redux/slices/menus';
import { stateCategoriesSlice } from '@/redux/slices/categories';
import {
  stateFiltersSlice,
  filterAddressRemoved,
  filterRangePriceRemoved,
  filterRangeAcreageRemoved,
} from '@/redux/slices/filter';

const BoxCategoryMain = () => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector(stateMenusSlice);
  const categories = useAppSelector(stateCategoriesSlice);
  const { range_price, range_acreage, address } =
    useAppSelector(stateFiltersSlice);

  const handleRemoveFilter = () => {
    if (range_price.active) {
      dispatch(filterRangePriceRemoved());
    }
    if (range_acreage.active) {
      dispatch(filterRangeAcreageRemoved());
    }
    if (
      address.district.active ||
      address.province.active ||
      address.ward.active
    ) {
      dispatch(filterAddressRemoved());
    }
  };

  const handleSlug = (id: number, slug: string) => {
    const category = menus.find(
      (item) => item.category_id === id,
    );
    return category ? category.slug : slug;
  };
  return (
    <div className="border bg-white sm:rounded-lg py-4 lg:px-5 max-lg:px-4">
      <p className="font-bold max-lg:text-lg lg:text-xl">
        Danh mục cho thuê
      </p>
      <ul className="max-lg:pb-2 lg:py-3">
        {categories.length > 0 &&
          categories.map((item) => (
            <li
              key={item.id}
              className={`${styles.item} py-[0.5rem] border-b border-gray-400 border-dashed max-lg:text-sm`}
              onClick={handleRemoveFilter}
            >
              <Link
                to={`${handleSlug(item.id, item.slug)}`}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                  >
                    <MdOutlineKeyboardArrowRight
                      size={20}
                      color="rgb(156 163 175)"
                    />
                    <span className="text-[0.96rem]">
                      {item.name}
                    </span>
                  </Stack>
                  <div className="text-gray-400 text-[0.9rem]">
                    ({item.total_record})
                  </div>
                </Stack>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BoxCategoryMain;
