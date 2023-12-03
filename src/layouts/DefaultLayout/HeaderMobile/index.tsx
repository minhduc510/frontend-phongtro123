import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { Dialog, Transition } from '@headlessui/react';

import path from '@/routes/path';
import styles from './styles.module.scss';
import { Logo } from '@/assets';
import { Image } from '@/components';
import { statePostFavouriteSlice } from '@/redux/slices/postFavourite';
import {
  generateSrcImage,
  handleTextLong,
} from '@/helpers';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import { stateUserSlice } from '@/redux/slices/user';
import {
  logoutAdded,
  stateLoginSlice,
} from '@/redux/slices/auth';
import {
  BiHomeAlt2,
  BsSuitHeart,
  HiOutlineLogout,
  AiOutlineUserAdd,
  LiaPlusCircleSolid,
  AiOutlineAppstore,
  TbFileUpload,
  CgFileDocument,
  BsPencilSquare,
  BsChat,
  BsX,
  BsFillTelephoneFill,
  SiZalo,
} from '@/icons';

const HeaderMobile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(stateUserSlice);
  const { login } = useAppSelector(stateLoginSlice);
  const { total } = useAppSelector(statePostFavouriteSlice);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 h-[50px] sm:h-[60px] bg-white z-10"
        style={{
          boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
        }}
      >
        <Grid container columns={15} className="h-full">
          <Grid item xs={3}>
            <Link to={path.home}>
              <Stack
                alignItems="center"
                justifyContent="center"
                className="h-full"
              >
                <div className="text-lg sm:text-2xl">
                  <BiHomeAlt2 />
                </div>
                <span className="text-sm sm:text-lg">
                  Trang chủ
                </span>
              </Stack>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to={path.favourite}>
              <Stack
                alignItems="center"
                justifyContent="center"
                className="h-full"
              >
                <div className="text-lg sm:text-2xl relative">
                  {login && total > 0 && (
                    <div
                      className={`${styles.favouriteBox}`}
                    >
                      {total}
                    </div>
                  )}
                  <BsSuitHeart />
                </div>
                <span className="text-sm sm:text-lg">
                  Yêu thích
                </span>
              </Stack>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to={path.postPosts}>
              <div className="relative h-full">
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    boxShadow:
                      'rgba(17, 17, 26, 0.1) 0px -1px 16px',
                  }}
                  className="sm:mx-2 md:mx-10 absolute bottom-[-6px] top-[-20px] inset-x-0 bg-amber-400 rounded-full border-[5px] border-white"
                >
                  <div className="text-xl sm:text-2xl">
                    <LiaPlusCircleSolid />
                  </div>
                  <span className="text-sm sm:text-lg">
                    Đăng tin
                  </span>
                </Stack>
              </div>
            </Link>
          </Grid>
          {login ? (
            <>
              {' '}
              <Grid item xs={3}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  className="h-full"
                  onClick={openModal}
                >
                  <div className="text-lg sm:text-2xl">
                    <AiOutlineAppstore />
                  </div>
                  <span className="text-sm sm:text-lg">
                    Tài khoản
                  </span>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Link to={path.updateUser}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="h-full"
                  >
                    <div
                      className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] truncate rounded-full border-white border-2 bg-white mx-auto"
                      style={{
                        boxShadow:
                          'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
                      }}
                    >
                      <Image
                        alt="avatar"
                        src={generateSrcImage(user.avatar)}
                        fill
                      />
                    </div>
                  </Stack>
                </Link>
              </Grid>
            </>
          ) : (
            <>
              {' '}
              <Grid item xs={3}>
                <Link to={path.login}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="h-full"
                  >
                    <div className="text-lg sm:text-2xl">
                      <HiOutlineLogout />
                    </div>
                    <span className="text-sm sm:text-lg">
                      Đăng nhập
                    </span>
                  </Stack>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to={path.register}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="h-full"
                  >
                    <div className="text-xl sm:text-2xl">
                      <AiOutlineUserAdd />
                    </div>
                    <span className="text-sm sm:text-lg">
                      Đăng ký
                    </span>
                  </Stack>
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-20 fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="z-30 fixed inset-0">
            <div className="relative w-full h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-[99%]"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel className="bg-white overflow-y-auto absolute top-0 bottom-0 right-0 max-sm:left-[20%] sm:left-[40%] transform shadow-xl transition-all">
                  <div className="bg-blue-primary h-[180px]">
                    <BsX
                      size={40}
                      color="#fff"
                      onClick={closeModal}
                    />
                    <div className="text-center">
                      <div className="relative w-[70px] h-[70px] truncate rounded-full border bg-white mx-auto">
                        <Image
                          alt="avatar"
                          src={generateSrcImage(
                            user.avatar,
                          )}
                          fill
                        />
                      </div>
                      <span className="font-medium text-white">
                        {handleTextLong(user.username, 25)}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <ul className={`py-3 `}>
                      <li className="py-2 pl-2 w-full text-sm">
                        <Link to={path.postPosts}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <TbFileUpload size={16} />
                            <span>Đăng tin mới</span>
                          </Stack>
                        </Link>
                      </li>
                      <li className="py-2 pl-2 w-full text-sm">
                        <Link to={path.listPost}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <CgFileDocument size={16} />
                            <span>Quản lý tin đăng</span>
                          </Stack>
                        </Link>
                      </li>
                      <li className="py-2 pl-2 w-full text-sm">
                        <Link to={path.updateUser}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <BsPencilSquare size={16} />
                            <span>
                              Sửa thông tin cá nhân
                            </span>
                          </Stack>
                        </Link>
                      </li>
                      <li className="py-2 pl-2 w-full text-sm">
                        {' '}
                        <Link to={path.contact}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <BsChat size={16} />
                            <span>Liên hệ</span>
                          </Stack>
                        </Link>
                      </li>
                    </ul>
                    <div
                      className="py-2 pl-2 w-full font-medium border-t text-sm"
                      onClick={() => {
                        dispatch(logoutAdded());
                        closeModal();
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                      >
                        <HiOutlineLogout size={18} />
                        <span>Thoát</span>
                      </Stack>
                    </div>
                    <div className="max-sm:mt-3 max-sm:px-2 px-10">
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={{ xs: 1, sm: 2 }}
                      >
                        <div className="font-bold bg-gray-100 rounded-md p-2">
                          <span className="text-orange-primary uppercase text-sm">
                            hỗ trợ đăng tin
                          </span>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <BsFillTelephoneFill
                                size={11}
                              />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <SiZalo size={20} />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                        </div>
                        <div className="font-bold bg-gray-100 rounded-md p-2">
                          <span className="text-orange-primary uppercase text-sm">
                            hỗ trợ đăng tin
                          </span>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <BsFillTelephoneFill
                                size={11}
                              />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <SiZalo size={20} />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                        </div>
                        <div className="font-bold bg-gray-100 rounded-md p-2">
                          <span className="text-orange-primary uppercase text-sm">
                            hỗ trợ đăng tin
                          </span>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <BsFillTelephoneFill
                                size={11}
                              />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <SiZalo size={20} />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                        </div>
                        <div className="font-bold bg-gray-100 rounded-md p-2">
                          <span className="text-orange-primary uppercase text-sm">
                            hỗ trợ đăng tin
                          </span>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <BsFillTelephoneFill
                                size={11}
                              />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            className="text-sm"
                          >
                            <div className="w-[20px]">
                              <SiZalo size={20} />
                            </div>
                            <span>0902657123</span>
                          </Stack>
                        </div>
                      </Stack>
                    </div>
                    <p className="px-2 mt-5 text-sm">
                      Phiên bản: 2024
                    </p>
                    <Link
                      to={path.home}
                      onClick={closeModal}
                    >
                      <div
                        className={`${styles.logo} w-[250px] mx-auto mt-5`}
                      >
                        <Logo />
                      </div>
                    </Link>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-sm mt-5">
                    <p className="text-xs leading-4">
                      Nhân viên vỗ trợ riêng của bạn:
                    </p>
                    <p className="text-sm font-bold leading-2">
                      Thanh Ly - LBKCorp
                    </p>
                    <p className="text-sm font-bold leading-2">
                      0901424123
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HeaderMobile;
