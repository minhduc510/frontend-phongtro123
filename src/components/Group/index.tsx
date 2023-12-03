import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import path from '@/routes/path';
import { Image } from '..';
import { GroupProps } from '@/interface';
import { generateSrcImage } from '@/helpers';
import { useAppDispatch } from '@/redux/hooks';
import {
  filterProvinceAdded,
  filterCategoryAdded,
} from '@/redux/slices/filter';

interface IProps {
  data: GroupProps;
}

interface CategoryProps {
  id: number;
  title: string;
}

interface ProvinceProps {
  code: number;
  title: string;
}

const Group = ({ data }: IProps) => {
  const dispatch = useAppDispatch();

  const handleDispatchFilter = (
    category: CategoryProps,
    province: ProvinceProps,
  ) => {
    dispatch(filterCategoryAdded(category));
    dispatch(filterProvinceAdded(province));
  };
  return (
    <Link
      to={`${path.search}?province=${data.province.slug}`}
      className={`${styles.group} min-w-[160px] md:w-[220px] rounded-lg truncate`}
      onClick={() =>
        handleDispatchFilter(
          {
            id: data.category.id,
            title: data.category.name,
          },
          {
            code: data.province.code,
            title: data.province.title,
          },
        )
      }
    >
      <div className="relative w-full min-h-[100px] md:h-[120px] truncate">
        <Image
          alt={data.title}
          src={generateSrcImage(data.image)}
          fill
          objectFit="cover"
        />
      </div>
      <div className="bg-white text-center max-lg:py-2 lg:py-3">
        <p className="text-sm font-bold text-blue-primary text-ellipsis truncate">
          {data.name}
        </p>
      </div>
    </Link>
  );
};

export default Group;
