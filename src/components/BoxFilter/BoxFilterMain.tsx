/* eslint-disable no-constant-condition */
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { RangeFilterProps } from '@/interface';
import { MdOutlineKeyboardArrowRight } from '@/icons';
import {
  filterRangePriceRemoved,
  filterRangeAcreageRemoved,
} from '@/redux/slices/filter';

interface IProps {
  props: {
    data: RangeFilterProps[];
    type: 'price' | 'acreage';
  };
}
const BoxFilterMain = ({ props }: IProps) => {
  const { data, type } = props;
  const dispatch = useAppDispatch();

  const handleSlug = (min: string, max: number) => {
    if (Number(min) === 0) {
      return `${
        type === 'price'
          ? `gia_den=${max}`
          : `dien_tich_den=${max}`
      }`;
    } else if (Number(max) > Math.pow(10, 8)) {
      return `${
        type === 'price'
          ? `gia_tu=${min}`
          : `dien_tich_tu=${min}`
      }`;
    } else {
      return `${
        type === 'price'
          ? `gia_tu=${min}&gia_den=${max}`
          : `dien_tich_tu=${min}&dien_tich_den=${max}`
      }`;
    }
  };

  const handleDispatchRemoveFilter = (
    type: 'price' | 'acreage',
  ) => {
    if (type === 'price') {
      dispatch(filterRangeAcreageRemoved());
    } else {
      dispatch(filterRangePriceRemoved());
    }
  };

  return (
    <div className="border bg-white sm:rounded-lg py-4 lg:px-5 max-lg:px-4">
      <p className="font-bold max-lg:text-lg lg:text-xl">
        Xem theo {type === 'price' ? 'giá' : 'diện tích'}
      </p>
      <ul className="max-lg:pb-2 lg:py-3">
        {data.length > 0 &&
          data.map((item) => (
            <li
              key={item.id}
              className={`${styles.item} py-[0.5rem] border-b border-gray-400 border-dashed w-1/2 max-lg:text-sm`}
              onClick={() =>
                handleDispatchRemoveFilter(type)
              }
            >
              <Link
                to={`?${handleSlug(item.min, item.max)}`}
              >
                <Stack direction="row" alignItems="center">
                  <MdOutlineKeyboardArrowRight
                    size={20}
                    color="rgb(156 163 175)"
                  />
                  <span className=" text-[0.96rem]">
                    {item.title}
                    {type === 'acreage' ? <sup>2</sup> : ''}
                  </span>
                </Stack>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BoxFilterMain;
