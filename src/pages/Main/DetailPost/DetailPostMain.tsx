/* eslint-disable react-hooks/exhaustive-deps */
import Slider from 'react-slick';
import { Grid, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  Fragment,
  useState,
  useEffect,
  useRef,
} from 'react';

import './styles.scss';
import styles from './styles.module.scss';
import { useAppSelector } from '@/redux/hooks';
import {
  DetailPostProps,
  ParamsFilterProps,
} from '@/interface';
import { infoPostAdded } from '@/redux/slices/infoPost';
import { useAppDispatch } from '@/redux/hooks';

import {
  Image,
  Button,
  PostItem,
  ListPostBox,
} from '@/components';
import {
  generateSrcImage,
  handleTextPrice,
  handleTime,
  handleTimeFromNow,
} from '@/helpers';
import {
  HiStar,
  SiZalo,
  BiHash,
  TbSquare,
  LuClock3,
  FaRegHeart,
  FaLocationDot,
  TbReportMoney,
  IoIosArrowBack,
  IoIosArrowForward,
  BsFillTelephoneFill,
} from '@/icons';
import { apiClient } from '@/api';
import {
  stateFiltersSlice,
  filterDistrictAdded,
  filterCategoryAdded,
  filterAddressRemoved,
  filterCategoryRemoved,
} from '@/redux/slices/filter';

interface UserProps {
  id: number;
  username: string;
  phone: string;
  avatar: string;
}

const initInfoPostState = {
  id: 0,
  title: '',
  address: '',
  star: 0,
  price: 0,
  acreage: 0,
  description: '',
  code: '',
  updated_at: '',
  category: '',
  district_code: 0,
  category_id: 0,
};

const initInfoUserState = {
  id: 0,
  username: '',
  phone: '',
  avatar: '',
};

const DetailPostMain = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const stateFilters = useAppSelector(stateFiltersSlice);

  const [images, setImages] = useState<string[]>([]);
  const [numberSlide, setNumberSlide] = useState<number>(1);
  const [runSecond, setRunSecond] =
    useState<boolean>(false);
  const [user, setUser] = useState<UserProps>(
    initInfoUserState,
  );
  const [infoPost, setInfoPost] = useState<DetailPostProps>(
    initInfoPostState,
  );
  const [postRelated, setPostRelated] = useState([]);

  const slider = useRef<Slider>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setNumberSlide(newIndex + 1);
    },
  };

  const arrStarElement = [];
  for (let i = 0; i < infoPost.star; i++) {
    arrStarElement.push(
      <HiStar
        key={i}
        style={{
          color: '#febb02',
          display: 'inline-block',
          marginBottom: '0.3rem',
        }}
        size={25}
      />,
    );
  }

  useEffect(() => {
    const callApi = async () => {
      const { error, data } = await apiClient.detailPost(
        Number(id),
      );
      if (!error) {
        const { image, user, ...rest } = data;
        setUser(user);
        setImages(image);
        setInfoPost(rest);
        dispatch(
          infoPostAdded({
            price: rest.price,
            acreage: rest.acreage,
            address: rest.address,
            phone: user.phone,
          }),
        );
        dispatch(
          filterCategoryAdded({
            id: rest.category_id,
            title: rest.category.split(', ')[0],
          }),
        );
        dispatch(
          filterDistrictAdded({
            code: rest.district_code,
            title: rest.category.split(', ')[1],
            active: true,
          }),
        );
        setRunSecond(true);
      }
    };
    callApi();
  }, [id]);

  useEffect(() => {
    if (runSecond) {
      const callApi = async () => {
        const objParams: ParamsFilterProps = {};
        objParams.category_id =
          stateFilters.category.id ?? 1;
        objParams.district =
          stateFilters.address.district.code ?? 1;
        const { error, data } = await apiClient.posts(
          objParams,
        );
        if (!error) {
          setPostRelated(data.posts);
        }
        setRunSecond(false);
      };

      callApi();
    }
    return () => {
      dispatch(filterCategoryRemoved());
      dispatch(filterAddressRemoved());
    };
  }, [runSecond]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML =
        infoPost.description;
    }
  }, [infoPost.description]);

  return (
    <div className={styles.detailPost}>
      <Grid container spacing={{ xs: 2 }}>
        <Grid item xs={12} md={8}>
          <div className="border bg-white sm:rounded-b-lg z-0">
            <div className="relative">
              <Slider {...settings} ref={slider}>
                {images.length > 0 &&
                  images.map((item, index) => (
                    <div key={index} className="bg-black">
                      <div className="relative h-[350px] w-[600px] mx-auto">
                        <Image
                          alt="image detail post"
                          src={generateSrcImage(item)}
                          fill
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
              <div
                className={`${styles.pagination} bottom-4 left-2/4 text-sm px-2 py-[0.1rem] rounded-md`}
              >
                {numberSlide}/{images.length}
              </div>
              <div className={`${styles.btnDirection}`}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="w-[45px] h-[45px] rounded-full bg-yellow-primary"
                    onClick={() =>
                      slider?.current?.slickPrev()
                    }
                  >
                    <IoIosArrowBack size={28} />
                  </Stack>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="w-[45px] h-[45px] rounded-full bg-yellow-primary"
                    onClick={() =>
                      slider?.current?.slickNext()
                    }
                  >
                    <IoIosArrowForward size={28} />
                  </Stack>
                </Stack>
              </div>
            </div>
            <div className="px-2 md:px-5 md:py-4">
              <h2>
                {arrStarElement}{' '}
                <span className="font-bold uppercase text-red-600 text-xl md:text-2xl leading-[0px] ">
                  {infoPost.title}
                </span>
              </h2>
              <p className="mt-2">
                Chuyên mục:{' '}
                <span className="text-blue-primary hover:text-orange-primary cursor-pointer underline font-bold">
                  {infoPost.category}
                </span>
              </p>
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ sm: 1 }}
                className="mt-2"
              >
                <div className="max-sm:hidden">
                  <FaLocationDot
                    size={18}
                    color="rgb(37 99 235)"
                  />
                </div>
                <span>
                  Địa chỉ: <span>{infoPost?.address}</span>
                </span>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ sm: 5 }}
                gap={{ xs: 1.5, sm: 0 }}
                className="mt-3"
                flexWrap="wrap"
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5 }}
                >
                  <TbReportMoney
                    size={18}
                    color="rgb(209 213 219)"
                  />
                  <span className="text-xl text-green-500 font-bold">
                    {handleTextPrice(infoPost.price)}
                  </span>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5 }}
                >
                  <TbSquare
                    size={18}
                    color="rgb(209 213 219)"
                  />
                  <span>
                    {infoPost.acreage}m<sup>2</sup>
                  </span>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5 }}
                >
                  <LuClock3
                    size={18}
                    color="rgb(209 213 219)"
                  />
                  <span>
                    {handleTimeFromNow(infoPost.updated_at)}
                  </span>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5 }}
                >
                  <BiHash
                    size={18}
                    color="rgb(209 213 219)"
                  />
                  <span>{infoPost.code}</span>
                </Stack>
              </Stack>
              <div className="mt-6">
                <p className="text-xl font-bold">
                  Thông tin mô tả
                </p>
                <div
                  className="mt-3"
                  ref={descriptionRef}
                ></div>
              </div>
              <div className="mt-6">
                <p className="text-xl font-bold">
                  Đặc điểm tin đăng
                </p>
                <div className="mt-2 text-sm">
                  <table className="w-full">
                    <tbody>
                      <tr className="">
                        <td className="py-2 pl-2 w-2/6">
                          Mã tin
                        </td>
                        <td className="py-2 w-4/6">
                          #{infoPost.code}
                        </td>
                      </tr>
                      <tr className="bg-zinc-100">
                        <td className="py-2 pl-2 w-2/6">
                          Khu vực:
                        </td>
                        <td className="py-2 w-4/6">
                          {infoPost.category}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-2 pl-2 w-2/6">
                          Loại tin rao:
                        </td>
                        <td className="py-2 w-4/6">
                          {infoPost.category.split(',')[0]}
                        </td>
                      </tr>
                      <tr className="bg-zinc-100">
                        <td className="py-2 pl-2 w-2/6">
                          Đối tượng thuê:
                        </td>
                        <td className="py-2 w-4/6">
                          Tất cả
                        </td>
                      </tr>
                      <tr className=" ">
                        <td className="py-2 pl-2 w-2/6">
                          Ngày đăng:
                        </td>
                        <td className="py-2 w-4/6 capitalize">
                          {handleTime(infoPost.updated_at)}
                        </td>
                      </tr>
                      <tr className="bg-zinc-100">
                        <td className="py-2 pl-2 w-2/6">
                          Gói tin:
                        </td>
                        <td className="py-2 w-4/6">
                          Tin VIP nổi bật
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xl font-bold">
                  Đặc điểm tin đăng
                </p>
                <div className="mt-2 text-sm">
                  <table className="w-full">
                    <tbody>
                      <tr className="">
                        <td className="py-2 pl-2 w-2/6">
                          Liên hệ:
                        </td>
                        <td className="py-2 w-4/6">
                          {user.username}
                        </td>
                      </tr>
                      <tr className="bg-zinc-100 ">
                        <td className="py-2 pl-2 w-2/6">
                          Điện thoại:
                        </td>
                        <td className="py-2 w-4/6">
                          {user.phone}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-2 pl-2 w-2/6">
                          Zalo:
                        </td>
                        <td className="py-2 w-4/6">
                          {user.phone}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 md:py-3 md:px-5 border bg-white sm:rounded-lg">
            <p className="font-bold text-lg md:text-xl max-md:py-3 max-md:px-1 md:pb-2">
              {infoPost.category}
            </p>
            <div>
              {postRelated.length > 0 ? (
                postRelated.map((item, index) => (
                  <Fragment key={index}>
                    <PostItem data={item} />
                  </Fragment>
                ))
              ) : (
                <h3>Không có bài viết nào</h3>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={{ xs: 2 }}>
            <div className="text-center p-3 bg-yellow-primary sm:rounded-md">
              <div className="relative border rounded-full w-[80px] h-[80px] mx-auto truncate bg-white">
                <Image
                  alt="avatar"
                  src={generateSrcImage(user.avatar)}
                  fill
                  objectFit="cover"
                />
              </div>
              <p className="text-xl font-bold mt-2">
                {user.username}
              </p>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 1 }}
                className="mt-1"
              >
                <div className="rounded-full w-[10px] h-[10px] bg-green-500"></div>
                <span className="text-sm">
                  Đang hoạt động
                </span>
              </Stack>
              <div className="mt-3">
                <div>
                  <Button
                    type="button"
                    content={user.phone}
                    iconLeft={<BsFillTelephoneFill />}
                    containerStyles="bg-green-500 w-full py-1 font-bold text-2xl"
                  />
                </div>
                <div className="mt-3">
                  <Button
                    type="button"
                    content="Nhắn Zalo"
                    iconLeft={
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        className="rounded-full bg-sky-500 w-[25px] h-[25px]"
                      >
                        <SiZalo size={23} color="#fff" />
                      </Stack>
                    }
                    containerStyles="bg-white w-full py-2 font-bold !text-black border border-black"
                  />
                </div>
                <div className="mt-1">
                  <Button
                    type="button"
                    content="Yêu thích"
                    iconLeft={<FaRegHeart size={23} />}
                    containerStyles="bg-white w-full py-2 font-bold !text-black border border-black"
                  />
                </div>
              </div>
            </div>
            <ListPostBox />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailPostMain;
