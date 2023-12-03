/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Stack, Grid } from '@mui/material';

import { apiClient } from '@/api';
import path from '@/routes/path';
import styles from './styles.module.scss';
import DmcaImg from '@/assets/Image/dmca-badge.png';
import BoCongThuongImg from '@/assets/Image/bo-cong-thuong.png';
import LishPaymentImg from '@/assets/Image/method-payment-icon.jpg';
import { Image } from '@/components';
import { toastMsg } from '@/helpers';
import { MdKeyboardArrowDown } from '@/icons';
import {
  Zalo,
  Logo,
  Youtube,
  Twitter,
  Facebook,
  Chothuenha,
  Thuecanho123,
  Batdongsan123,
} from '@/assets';
import { MenusProps } from '@/interface';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import {
  stateMenusSlice,
  menuAdded,
} from '@/redux/slices/menus';

const Footer = () => {
  const dispatch = useAppDispatch();
  const menusState = useAppSelector(stateMenusSlice);
  const [menus, setMenus] = useState<MenusProps[]>([]);

  useEffect(() => {
    const menus = menusState.filter(
      (item) => item.slug !== '/',
    );
    setMenus(menus);
  }, [JSON.stringify(menusState)]);

  useEffect(() => {
    if (!menusState.length) {
      const callApi = async () => {
        const { error, data } = await apiClient.menus();
        if (!error) {
          dispatch(menuAdded(data));
        }
      };
      callApi();
    }
  }, []);

  return (
    <footer className={`${styles.footer} bg-white`}>
      <Container>
        <Stack
          direction={{ lg: 'row', xs: 'column' }}
          className="py-5 lg:border-b"
        >
          {menus.length > 0 &&
            menus.map((item) => (
              <div
                key={item.slug}
                className="lg:first:pr-7 lg:[&:not(:first-child)]:px-7 lg:[&:not(:last-child)]:border-r max-lg:border-b max-lg:py-2"
              >
                <Link to={item.slug}>
                  <Stack
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent={{
                      xs: 'space-between',
                      lg: 'initial',
                    }}
                  >
                    <p className=" text-blue-primary font-bold">
                      {item.name}
                    </p>
                    <MdKeyboardArrowDown
                      size={30}
                      color="gray"
                    />
                  </Stack>
                </Link>
              </div>
            ))}
        </Stack>
        <div className="lg:pt-6 pb-9 border-b">
          <Grid container spacing={{ xs: 3 }}>
            <Grid item xs={4} className="max-lg:hidden">
              <div
                className={`${styles.wrapLogo} w-[230px] mt-4`}
              >
                <Logo />
              </div>
              <p className="text-sm mt-3">
                Phongtro123.com tự hào có lượng dữ liệu bài
                đăng lớn nhất trong lĩnh vực cho thuê phòng
                trọ.
              </p>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Grid container spacing={{ xs: 2, lg: 0 }}>
                <Grid item xs={12} lg={4}>
                  <div>
                    <p className="font-bold lg:text-sm">
                      Về PHONGTRO123.COM
                    </p>
                    <ul className="mt-1">
                      <li className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary">
                        <Link to={path.home}>
                          Trang chủ
                        </Link>
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Giới thiệu
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Blog
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Quy chế hoạt động
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Quy định sử dụng
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Chính sách bảo mật
                      </li>
                      <li className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary">
                        <Link to={path.contact}>
                          Liên hệ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <div>
                    <p className="font-bold lg:text-sm">
                      Hỗ trợ khách hàng
                    </p>
                    <ul className="mt-1">
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Câu hỏi thường gặp
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Hướng dẫn đăng tin
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Bảng giá dịch vụ
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Quy định đăng tin
                      </li>
                      <li
                        className="text-sm py-1 hover:underline cursor-pointer max-lg:text-blue-primary"
                        onClick={() =>
                          toastMsg(
                            'Trang này chưa hoạt động!',
                            'error',
                          )
                        }
                      >
                        Giải quyết khuyết nại
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <div>
                    <p className="font-bold lg:text-sm">
                      Liên hệ với chúng tôi
                    </p>
                    <Stack
                      direction="row"
                      spacing={{ xs: 1 }}
                      className="mt-2"
                    >
                      <div className="w-[35px]">
                        <Link
                          to="https://www.facebook.com/phongtro123.com.vn/"
                          target="_blank"
                        >
                          <Facebook />
                        </Link>
                      </div>
                      <div className="w-[35px]">
                        <Link
                          to="https://www.youtube.com/channel/UCaffQMAgZZ_sp92UPjR6Fgg"
                          target="_blank"
                        >
                          <Youtube />
                        </Link>
                      </div>
                      <div className="w-[35px]">
                        <Link
                          to="https://zalo.me/phongtro123"
                          target="_blank"
                        >
                          <Zalo />
                        </Link>
                      </div>
                      <div className="w-[35px]">
                        <Link
                          to="https://twitter.com/phongtro123"
                          target="_blank"
                        >
                          <Twitter />
                        </Link>
                      </div>
                    </Stack>
                  </div>
                  <div className="mt-5">
                    <p className="font-bold lg:text-sm">
                      Phương thức thanh toán
                    </p>
                    <Stack
                      direction="row"
                      spacing={{ xs: 1 }}
                      className="mt-2"
                    >
                      <div className="w-full max-lg:max-w-[400px] relative h-[35px]">
                        <Image
                          alt="list payment img"
                          src={LishPaymentImg}
                          fill
                        />
                      </div>
                    </Stack>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="py-4 border-b">
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            alignItems={{ lg: 'center' }}
            spacing={{ xs: 2 }}
          >
            <p>Cùng hệ thống:</p>
            <Stack
              direction="row"
              spacing={{ sm: 3 }}
              alignItems="center"
              flexWrap="wrap"
              justifyContent="center"
            >
              <Link
                to="https://bds123.vn/"
                target="_blank"
                className={`${styles.sameSystem} max-w-[180px] lg:w-[150px]`}
              >
                <Batdongsan123 />
              </Link>
              <Link
                to="https://chothuenha.me/"
                target="_blank"
                className={`${styles.sameSystem} max-w-[180px] lg:w-[170px]`}
              >
                <Chothuenha />
              </Link>
              <Link
                to="https://thuecanho123.com/"
                target="_blank"
                className={`${styles.sameSystem} max-w-[180px] lg:w-[180px]`}
              >
                <Thuecanho123 />
              </Link>
            </Stack>
          </Stack>
        </div>
        <div className="text-sm text-center py-6">
          <p className="font-bold uppercase">
            công ty tnhh LBKCORP
          </p>
          <p className="font-bold mt-3">
            Tổng đài CSKH: 0917686101
          </p>
          <p className="mt-3">
            Copyright © 2015 - 2023 Phongtro123.com
          </p>
          <p className="mt-3">
            Email: cskh.phongtro123@gmail.com
          </p>
          <p className="mt-3">
            Địa chỉ: LE-4.07, Toà nhà Lexington Residence,
            Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ
            Chí Minh
          </p>
          <p className="mt-3">
            Giấy phép đăng ký kinh doanh số 0313588502 do Sở
            kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp
            ngày 24 tháng 12 năm 2015.
          </p>
          <Stack
            direction="row"
            className="h-[50px] mt-3"
            spacing={{ xs: 1 }}
            justifyContent="center"
          >
            <div className="relative w-[133px] h-full">
              <Image
                alt="Bộ công thương"
                src={BoCongThuongImg}
                fill
              />
            </div>
            <div className="relative w-[100px] h-full">
              <Image alt="dmca" src={DmcaImg} fill />
            </div>
          </Stack>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
