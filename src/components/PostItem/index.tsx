/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Grid } from '@mui/material';

import path from '@/routes/path';
import { Image } from '..';
import { apiClient2 } from '@/api';
import { PostItemProps } from '@/interface';
import { stateLoginSlice } from '@/redux/slices/auth';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import { FaRegHeart, FaHeart, HiStar } from '@/icons';
import {
  pushPostFavourite,
  statePostFavouriteSlice,
} from '@/redux/slices/postFavourite';
import {
  swal,
  handleTextLong,
  handleTextPrice,
  generateSrcImage,
  handleTimeFromNow,
} from '@/helpers';

interface IProps {
  data: PostItemProps;
}

const PostItem = ({ data }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { total, list } = useAppSelector(
    statePostFavouriteSlice,
  );
  const { login } = useAppSelector(stateLoginSlice);
  const [activeIcon, setActiveIcon] =
    useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleActiveLove = (id: number | string) => {
    if (login) {
      setClicked(!clicked);
      const callApi = async () => {
        await apiClient2.postFavourite(id);
        const { error, data } =
          await apiClient2.getFavourite();
        if (!error) {
          const { total, list } = data;
          dispatch(pushPostFavourite({ total, list }));
        }
      };
      callApi();
    } else {
      swal
        .warning(
          'Vui lòng đăng nhập để thích bài viết !!!',
          true,
        )
        .then(() => {
          navigate(path.login);
        });
    }
  };

  useEffect(() => {
    setActiveIcon(
      list.some((item: number) => item == data.id),
    );
  }, [total, login]);

  useEffect(() => {
    if (!login) {
      setActiveIcon(false);
    }
  }, [login]);

  const arrStarElement = [];
  for (let i = 0; i < data.star; i++) {
    arrStarElement.push(
      <HiStar
        key={i}
        style={{
          color: '#febb02',
          display: 'inline-block',
          marginBottom: '0.3rem',
        }}
        size={20}
      />,
    );
  }
  return (
    <div
      className={`lg:p-4 border-t border-red-600 ${
        data.star === 5
          ? 'bg-background-post-vip'
          : 'bg-white'
      }`}
    >
      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid item xs={12} lg={data.star === 5 ? 4.3 : 3.5}>
          <Link
            className="hover:underline decoration-red-600"
            to={`/${path.detail.split('/')[1]}/${data.id}`}
          >
            <div
              className={`relative lg:rounded-md truncate ${
                data.star === 5
                  ? 'max-sm:h-[300px] max-lg:h-[350px] lg:h-[230px]'
                  : 'max-sm:h-[250px] max-lg:h-[300px] lg:h-[200px]'
              }`}
            >
              <Image
                alt="avatar item"
                fill
                objectFit="cover"
                src={generateSrcImage(data.image)}
              />
              <div className="absolute left-2 bottom-2 text-sm text-white px-1 rounded-md bg-[color:rgba(0,0,0,.5)]">
                {data.totalImage} ảnh
              </div>
              <div
                className="absolute right-2 bottom-2"
                onMouseEnter={() =>
                  !clicked && setActiveIcon(true)
                }
                onMouseLeave={() =>
                  !clicked && setActiveIcon(false)
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleActiveLove(data.id);
                }}
              >
                {activeIcon ? (
                  <FaHeart color="red" size={25} />
                ) : (
                  <FaRegHeart color="#fff" size={25} />
                )}
              </div>
            </div>
          </Link>
        </Grid>
        <Grid item xs={12} lg={data.star === 5 ? 7.7 : 8.5}>
          <div className="max-lg:px-2 max-lg:pb-5">
            <Link
              className="hover:underline decoration-red-600 "
              to={`/${path.detail.split('/')[1]}/${
                data.id
              }`}
            >
              {arrStarElement}{' '}
              <span className="font-bold uppercase text-red-600">
                {handleTextLong(data.title, 80)}
              </span>
            </Link>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{ lg: 3.3 }}
              columnGap={{ xs: 2, lg: 0 }}
              flexWrap="wrap"
              justifyContent={{ lg: 'flex-end' }}
            >
              <p className="font-bold text-lg text-green-500">
                {handleTextPrice(data.price)}
              </p>
              <span className="text-sm">
                {data.acreage}m²
              </span>
              <span className="text-sm">
                {data.address}
              </span>
              <span className="text-sm text-gray-400">
                {handleTimeFromNow(data.updated_at)}
              </span>
            </Stack>
            <p className=" text-gray-400 text-sm max-lg:mt-2">
              {handleTextLong(data.description, 180)}
            </p>
            <div className="mt-3">
              <Stack
                direction={{ xs: 'column', lg: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'end', lg: 'center' }}
                rowGap={1}
                flexWrap="wrap"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 1 }}
                >
                  <div className="relative w-[35px] h-[35px] rounded-full truncate border">
                    <Image
                      alt="avatar"
                      src={generateSrcImage(
                        data.user.avatar,
                      )}
                      fill
                    />
                  </div>
                  <p>{data.user.username}</p>
                </Stack>
                <Stack direction="row" spacing={{ xs: 1 }}>
                  <div className="text-sm rounded-md py-1 px-2 border bg-blue-600 text-white cursor-pointer ">
                    Gọi: <span>{data.user.phone}</span>
                  </div>
                  <div className="text-sm rounded-md py-1 px-2 border border-blue-600 text-blue-600 cursor-pointer transition duration-200 hover:bg-blue-600 hover:text-white">
                    Nhắn Zalo
                  </div>
                </Stack>
              </Stack>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostItem;
