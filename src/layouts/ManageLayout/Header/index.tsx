/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from 'react';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

import path from '@/routes/path';
import {
  BsChat,
  BsFillTelephoneFill,
  BsPencilSquare,
  BsX,
  CgFileDocument,
  MdMenu,
  SiZalo,
  TbFileUpload,
  TbLogout2,
} from '@/icons';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import { stateMenusSlice } from '@/redux/slices/menus';
import {
  generateSrcImage,
  handleTextLong,
} from '@/helpers';
import { stateUserSlice } from '@/redux/slices/user';
import { Image } from '@/components';
import { logoutAdded } from '@/redux/slices/auth';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(stateUserSlice);
  const menus = useAppSelector(stateMenusSlice);
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <header
        className="h-[50px] bg-[#055699] text-white fixed z-10 top-0 right-0 left-0"
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{
            xs: 'space-between',
            lg: 'initial',
          }}
          spacing={{ lg: 24 }}
          className="max-sm:px-2 sm:px-5"
        >
          <Link
            to={path.home}
            className="font-bold leading-[50px] text-lg "
          >
            Phongtro123.com
          </Link>
          <div
            className="h-full lg:hidden"
            onClick={openModal}
          >
            <MdMenu size={30} />
          </div>
          <ul className="ml-10 max-lg:hidden">
            {menus.length > 0 &&
              menus.map((item) => (
                <li
                  key={item.slug}
                  className="inline-block leading-[50px] pr-[2rem]"
                >
                  <Link
                    to={item.slug}
                    className="h-full block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </Stack>
      </header>

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

          <div className="z-30 fixed inset-0 overflow-y-auto">
            <div className="relative w-full h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-[98%]"
                enterTo="opacity-100 translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <Dialog.Panel className="overflow-y-auto absolute top-0 bottom-0 right-0 max-sm:left-[20%] sm:left-[40%] text-white h-full transform overflow-hidden bg-[#055699] shadow-xl transition-all">
                  <BsX
                    size={40}
                    color="#fff"
                    onClick={closeModal}
                  />
                  <div className="text-center ">
                    <div className="relative w-[70px] h-[70px] truncate rounded-full border bg-white mx-auto">
                      <Image
                        alt="avatar"
                        src={generateSrcImage(user.avatar)}
                        fill
                      />
                    </div>
                    <span className="font-medium">
                      {handleTextLong(user.username, 25)}
                    </span>
                    <p className="text-sm mt-3">
                      Mã thành viên:{' '}
                      <span className="font-bold">
                        #{user.code}
                      </span>
                    </p>
                  </div>
                  <ul className="mt-3">
                    {menus.length > 0 &&
                      menus.map((item) => (
                        <li
                          key={item.slug}
                          className="block w-full py-2 pl-2"
                        >
                          <Link to={item.slug}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <ul className="mt-4 border-t pt-5">
                    <li
                      className={`p-2 rounded-md cursor-pointer w-full  ${
                        location.pathname === path.postPosts
                          ? 'bg-blue-primary'
                          : ''
                      }`}
                    >
                      <Link to={path.postPosts}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <TbFileUpload />

                          <span>Đăng tin mới</span>
                        </Stack>
                      </Link>
                    </li>
                    <li
                      className={`p-2 rounded-md cursor-pointer w-full ${
                        location.pathname === path.listPost
                          ? 'bg-blue-primary'
                          : ''
                      }`}
                    >
                      <Link to={path.listPost}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <CgFileDocument />
                          <span>Quản lý tin đăng</span>
                        </Stack>
                      </Link>
                    </li>
                    <li
                      className={`p-2 rounded-md cursor-pointer w-full ${
                        location.pathname ===
                        path.updateUser
                          ? 'bg-blue-primary'
                          : ''
                      }`}
                    >
                      <Link to={path.updateUser}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <BsPencilSquare />
                          <span>Sửa thông tin cá nhân</span>
                        </Stack>
                      </Link>
                    </li>
                    <li
                      className={`p-2 rounded-md cursor-pointer w-full ${
                        location.pathname === path.contact
                          ? 'bg-blue-primary'
                          : ''
                      }`}
                    >
                      <Link to={path.contact}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <BsChat />
                          <span>Liên hệ</span>
                        </Stack>
                      </Link>
                    </li>
                    <li
                      className="p-2 rounded-md cursor-pointer w-full hover:bg-blue-primary"
                      onClick={() =>
                        dispatch(logoutAdded())
                      }
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <TbLogout2 />
                        <span>Thoát</span>
                      </Stack>
                    </li>
                  </ul>
                  <div className="max-sm:mt-3 max-sm:px-2 px-10 text-black">
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
                  <div className="p-2 bg-amber-50 rounded-sm mt-5 text-black">
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

export default Header;
