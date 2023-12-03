export type TypeContentModelFilter =
  | 'category'
  | 'province'
  | 'price'
  | 'acreage';

export interface HeaderProps {
  title: string;
  description: string;
}

export interface GroupProps {
  name: string;
  title: string;
  image: string;
  category: {
    id: number;
    name: string;
  };
  province: {
    id: number;
    code: number;
    title: string;
    slug: string;
  };
}

export interface RangeFilterProps {
  id: number;
  min: string;
  max: number;
  title: string;
}

export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  title: string;
  parent_id: number;
  total_record: number;
}

export interface MenusProps {
  name: string;
  title: string;
  description: string;
  slug: string;
  category_id: number;
}

export interface ProvinceProps {
  id: number;
  code: string;
  slug: string;
  title: string;
  district_code?: string;
  province_code?: string;
}

export interface UserProps {
  id?: number;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  code: string;
}

export interface PostItemProps {
  id: number;
  title: string;
  address: string;
  star: number;
  price: number;
  acreage: number;
  description: string;
  image: string;
  totalImage: number;
  updated_at: string;
  user: UserProps;
}

export interface ParamsFilterProps {
  page?: number;
  latestPost?: boolean;
  category_id?: number;
  price?: string[];
  acreage?: string[];
  province?: number | string;
  district?: number | string;
  ward?: number | string;
}

export interface DetailPostProps {
  id: number;
  title: string;
  address: string;
  star: number;
  price: number;
  acreage: number;
  description: string;
  code: string;
  category: string;
  updated_at: string;
  district_code: number;
  category_id: number;
}

export interface AddressItemProps {
  slug?: string;
  code: string | number | null;
  title: string;
  active: boolean;
}

export interface loginProps {
  email: string;
  password: string;
}

export interface registerProps extends loginProps {
  phone: string;
}

export interface ListPostCurrentProps {
  id: number;
  status: number;
  code: string;
  image: string;
  title: string;
  price: string;
  acreage: string;
  updated_at: string;
}

export interface ParamsPostsUserCurrentProps {
  page: number;
  status?: number;
}

export interface ChangePasswordProps {
  passwordOld: string;
  passwordNew: string;
}
