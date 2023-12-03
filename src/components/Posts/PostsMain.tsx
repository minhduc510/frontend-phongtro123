/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { Stack } from '@mui/material';
import {
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import { apiClient } from '@/api';
import { stateMenusSlice } from '@/redux/slices/menus';
import { stateCategoriesSlice } from '@/redux/slices/categories';
import {
  Loading,
  Pagination,
  PostItem,
} from '@/components';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import {
  filterCategoryAdded,
  stateFiltersSlice,
} from '@/redux/slices/filter';
import {
  ParamsFilterProps,
  HeaderProps,
} from '@/interface';

interface IProps {
  props: {
    setHeader: (obj: HeaderProps) => void;
  };
}

const PostsMain = ({ props }: IProps) => {
  const { setHeader } = props;
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsTotal, setPostsTotal] = useState(0);
  const [latestPost, setLatestPost] =
    useState<boolean>(false);
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams] = useSearchParams();
  const menus = useAppSelector(stateMenusSlice);
  const stateFilters = useAppSelector(stateFiltersSlice);
  const categories = useAppSelector(stateCategoriesSlice);
  const currentPage =
    Number(searchParams.get('page')) === 0
      ? 1
      : Number(searchParams.get('page'));

  useEffect(() => {
    setLoading(true);
    const objParams: ParamsFilterProps = {
      page: currentPage,
    };

    const menus_current = menus.find(
      (item) => item.slug === location.pathname,
    );
    if (menus_current?.category_id) {
      if (categories.length > 0) {
        const category = categories.filter(
          (item) => item.id === menus_current?.category_id,
        )[0];
        if (category?.id) {
          objParams.category_id = category.id;
          dispatch(
            filterCategoryAdded({
              id: category.id,
              title: category.name,
            }),
          );
        } else {
          dispatch(
            filterCategoryAdded({
              id: 0,
              title: 'Phòng trọ, nhà trọ',
            }),
          );
        }
      }
    } else {
      const category = categories.filter(
        (item) => item.slug === slug,
      )[0];
      if (category?.id) {
        objParams.category_id = category.id;
        dispatch(
          filterCategoryAdded({
            id: category.id,
            title: category.name,
          }),
        );
      }
    }

    if (latestPost) {
      objParams.latestPost = latestPost;
    }
    if (stateFilters.address.province.active) {
      objParams.province =
        stateFilters.address.province.code ?? 0;
    }
    if (stateFilters.address.district.active) {
      objParams.district =
        stateFilters.address.district.code ?? 0;
    }
    if (stateFilters.address.ward.active) {
      objParams.ward = stateFilters.address.ward.code ?? 0;
    }
    if (
      stateFilters.range_price.active &&
      stateFilters.range_price.min &&
      stateFilters.range_price.max
    ) {
      objParams.price = [
        String(stateFilters.range_price.min),
        String(stateFilters.range_price.max),
      ];
    }
    if (
      stateFilters.range_acreage.active &&
      stateFilters.range_acreage.min &&
      stateFilters.range_acreage.max
    ) {
      objParams.acreage = [
        String(stateFilters.range_acreage.min),
        String(stateFilters.range_acreage.max),
      ];
    }

    const callApi = debounce(async () => {
      const { error, data } = await apiClient.posts(
        objParams,
      );
      if (!error) {
        setHeader({
          title: data.header,
          description: data.description,
        });
        setPosts(data.posts);
        setTotalPage(data.totalPage);
        setPostsTotal(data.totalPost);
      }
      setLoading(false);
    }, 1000);
    callApi();
  }, [
    latestPost,
    currentPage,
    location.pathname,
    slug,
    JSON.stringify(stateFilters),
  ]);

  return (
    <>
      <div className=" border rounded-t-lg">
        <div className="bg-white max-lg:p-3 lg:p-5 rounded-t-lg">
          <p className="font-bold max-lg:text-lg lg:text-xl">
            Tổng {postsTotal} kết quả
          </p>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1 }}
            className="mt-2 max-lg:text-sm"
          >
            <span>Sắp xếp:</span>
            <div
              className={`py-1 px-2 rounded-md bg-gray-100 cursor-pointer ${
                !latestPost ? 'font-bold underline' : ''
              }`}
              onClick={() => setLatestPost(false)}
            >
              Mặc định
            </div>
            <div
              className={`py-1 px-2 rounded-md bg-gray-100 cursor-pointer ${
                latestPost ? 'font-bold underline' : ''
              }`}
              onClick={() => setLatestPost(true)}
            >
              Mới nhất
            </div>
          </Stack>
        </div>
        {loading ? (
          <div className="flex items-center justify-center bg-white border-t">
            <Loading />
          </div>
        ) : posts.length > 0 ? (
          posts.map((item, index) => (
            <Fragment key={index}>
              <PostItem data={item} />
            </Fragment>
          ))
        ) : (
          <div className="bg-white max-lg:p-3 lg:p-5 rounded-b-lg border-t">
            <h1>Không có bài viết nào !</h1>
          </div>
        )}
      </div>
      {totalPage > 1 && (
        <Pagination totalPage={totalPage} pageAppear={2} />
      )}
    </>
  );
};

export default PostsMain;
