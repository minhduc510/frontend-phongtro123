import {
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react';
import { Container, Stack } from '@mui/material';
import {
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  Dialog,
  Transition,
  Menu,
} from '@headlessui/react';

import Logo from '@/assets/Logo';
import path from '@/routes/path';
import styles from './styles.module.scss';
import { stateUserSlice } from '@/redux/slices/user';
import { stateMenusSlice } from '@/redux/slices/menus';
import {
  filterCategoryRemoved,
  filterRemoved,
} from '@/redux/slices/filter';
import { statePostFavouriteSlice } from '@/redux/slices/postFavourite';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import {
  Button,
  InfoPostHeader,
  Image,
} from '@/components';
import {
  stateFiltersSlice,
  filterAddressRemoved,
  filterRangePriceRemoved,
  filterRangeAcreageRemoved,
} from '@/redux/slices/filter';
import {
  RiUserReceived2Line,
  HiOutlineLogout,
  BsSuitHeart,
  LiaPlusCircleSolid,
  AiOutlineAppstore,
  BsChat,
  TbFileUpload,
  BsPencilSquare,
  CgFileDocument,
  BsX,
  MdMenu,
  SiZalo,
  BsFillTelephoneFill,
} from '@/icons';
import {
  generateSrcImage,
  handleTextLong,
} from '@/helpers';
import {
  logoutAdded,
  stateLoginSlice,
} from '@/redux/slices/auth';

const HeaderMain = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(stateUserSlice);
  const menus = useAppSelector(stateMenusSlice);
  const { login } = useAppSelector(stateLoginSlice);

  const { range_price, range_acreage, address } =
    useAppSelector(stateFiltersSlice);
  const { total } = useAppSelector(statePostFavouriteSlice);
  const refHeader = useRef<HTMLDivElement>(null);
  const [fixHeader, setFixHeader] =
    useState<boolean>(false);
  const [runSecond, setRunSecond] =
    useState<boolean>(false);
  const [detailPage, setDetailPage] =
    useState<boolean>(false);
  const [headerInfoPost, setHeaderInfoPost] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleRemoveFilter = () => {
    dispatch(filterCategoryRemoved());
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

  useEffect(() => {
    setRunSecond(true);
    window.onscroll = () => {
      if (refHeader.current) {
        const heightHeader = refHeader.current.offsetHeight;
        window.scrollY > heightHeader
          ? setFixHeader(true)
          : setFixHeader(false);
        if (detailPage) {
          window.scrollY > heightHeader &&
          location.pathname.split('/')[1] ===
            path.detail.split('/')[1]
            ? setHeaderInfoPost(true)
            : setHeaderInfoPost(false);
        }
      }
    };
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, [detailPage, runSecond, location.pathname]);

  useEffect(() => {
    if (
      location.pathname.split('/')[1] !==
      path.detail.split('/')[1]
    ) {
      setHeaderInfoPost(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname.split('/')[1] ===
      path.detail.split('/')[1]
    ) {
      setDetailPage(true);
    } else {
      setDetailPage(false);
    }
  }, [location.pathname]);

  return (
    <>
      <header className={styles.header} ref={refHeader}>
        <div
          className={`${styles.headerTop} bg-white lg:h-[70px] max-lg:h-[60px] max-lg:fixed max-lg:inset-x-0 max-lg:top-0 z-10 shadow-lg`}
        >
          <Container className="h-full">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="h-full"
            >
              <Link
                to={path.home}
                onClick={() => dispatch(filterRemoved())}
              >
                <div
                  className={`${styles.logo} max-lg:w-[200px] lg:w-[250px]`}
                >
                  <Logo />
                </div>
              </Link>

              <div
                className="lg:hidden"
                onClick={openModal}
              >
                <MdMenu size={30} />
              </div>

              <Stack
                direction="row"
                spacing={{ xs: 3 }}
                alignItems="center"
                className="max-lg:!hidden"
              >
                {login ? (
                  <>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <div className="relative w-[45px] h-[45px] truncate rounded-full border bg-white">
                        <Image
                          alt="avatar"
                          src={generateSrcImage(
                            user.avatar,
                          )}
                          fill
                        />
                      </div>
                      <div>
                        <div>
                          <span>Xin chào, </span>
                          <span className="font-medium">
                            {handleTextLong(
                              user.username,
                              25,
                            )}
                          </span>
                        </div>
                        <div
                          className="text-sm text-blue-primary hover:underline cursor-pointer"
                          onClick={() =>
                            dispatch(logoutAdded())
                          }
                        >
                          Đăng xuất
                        </div>
                      </div>
                    </Stack>
                    <Menu
                      as="div"
                      className="relative !mt-1"
                    >
                      <Menu.Button>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={{ xs: 0.5 }}
                          className="h-full cursor-pointer"
                        >
                          <AiOutlineAppstore />
                          <p>Quản lý tài khoản</p>
                        </Stack>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y z-50 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <Link to={path.postPosts}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    className={`${
                                      active
                                        ? 'bg-red-primary text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                  >
                                    <TbFileUpload
                                      size={16}
                                    />
                                    <span>
                                      Đăng tin mới
                                    </span>
                                  </Stack>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link to={path.listPost}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    className={`${
                                      active
                                        ? 'bg-red-primary text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                  >
                                    <CgFileDocument
                                      size={16}
                                    />
                                    <span>
                                      Quản lý tin đăng
                                    </span>
                                  </Stack>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link to={path.updateUser}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    className={`${
                                      active
                                        ? 'bg-red-primary text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                  >
                                    <BsPencilSquare
                                      size={16}
                                    />
                                    <span>
                                      Sửa thông tin cá nhân
                                    </span>
                                  </Stack>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link to={path.contact}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    className={`${
                                      active
                                        ? 'bg-red-primary text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                  >
                                    <BsChat size={16} />
                                    <span>Liên hệ</span>
                                  </Stack>
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                  className={`${
                                    active
                                      ? 'bg-red-primary text-white'
                                      : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                  onClick={() =>
                                    dispatch(logoutAdded())
                                  }
                                >
                                  <HiOutlineLogout
                                    size={16}
                                  />
                                  <span>Thoát</span>
                                </Stack>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Link to={path.login}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 0.5 }}
                        className="h-full"
                      >
                        <RiUserReceived2Line />
                        <p>Đăng nhập</p>
                      </Stack>
                    </Link>
                    <Link to={path.register}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 0.5 }}
                        className="h-full"
                      >
                        <HiOutlineLogout />
                        <p>Đăng ký</p>
                      </Stack>
                    </Link>
                  </>
                )}

                <Link
                  to={path.favourite}
                  className="relative"
                >
                  {login && total > 0 && (
                    <div
                      className={`${styles.favouriteBox}`}
                    >
                      {total}
                    </div>
                  )}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5 }}
                  >
                    <BsSuitHeart />
                    <p>Yêu thích</p>
                  </Stack>
                </Link>
                <Button
                  type="button"
                  content="Đăng tin mới"
                  to={path.postPosts}
                  containerStyles="bg-red-primary py-2 w-[140px]"
                  iconRight={<LiaPlusCircleSolid />}
                />
              </Stack>
            </Stack>
          </Container>
        </div>
        <div
          className={`max-lg:hidden ${
            styles.headerBottom
          } ${fixHeader ? styles.fixHeader : ''}`}
        >
          <div className={` bg-blue-primary `}>
            <Container>
              <ul
                className={`${styles.headerBottomMenu} text-white`}
              >
                {menus.length > 0 &&
                  menus.map(({ name, slug }) => (
                    <Fragment key={slug}>
                      <NavLink
                        to={slug}
                        onClick={handleRemoveFilter}
                      >
                        <li
                          className={`hover:bg-red-primary py-3 px-4 ${
                            location.pathname === slug
                              ? styles.active
                              : ''
                          }`}
                        >
                          {name}
                        </li>
                      </NavLink>
                    </Fragment>
                  ))}
              </ul>
            </Container>
          </div>
          {headerInfoPost && <InfoPostHeader />}
        </div>
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
                    {login ? (
                      <>
                        {' '}
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
                            {handleTextLong(
                              user.username,
                              25,
                            )}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-3">
                          <p className="text-white">
                            Chào mừng đến với
                            Phongtro123.com.
                          </p>
                          <p className="text-white">
                            Đăng nhập để nhận 2 lần đăng bài
                            miễn phí.
                          </p>
                          <Stack
                            direction="row"
                            spacing={1}
                            className="mt-2"
                          >
                            <Link
                              to={path.login}
                              onClick={closeModal}
                            >
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                className="rounded-md w-[90px] h-[35px] bg-yellow-500"
                              >
                                Đăng nhập
                              </Stack>
                            </Link>
                            <Link
                              to={path.register}
                              onClick={closeModal}
                            >
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                className="rounded-md w-[90px] h-[35px] bg-yellow-500"
                              >
                                Đăng ký
                              </Stack>
                            </Link>
                          </Stack>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="">
                    <ul
                      className={`${styles.headerBottomMenu} py-3`}
                    >
                      {menus.length > 0 &&
                        menus.map(({ name, slug }) => (
                          <Fragment key={slug}>
                            <NavLink
                              to={slug}
                              onClick={handleRemoveFilter}
                            >
                              <li
                                className={`hover:bg-red-primary py-2 pl-2 w-full text-sm ${
                                  location.pathname === slug
                                    ? `${styles.active} text-white`
                                    : ''
                                }`}
                              >
                                {name}
                              </li>
                            </NavLink>
                          </Fragment>
                        ))}
                    </ul>
                    {login && (
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
                    )}
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

export default HeaderMain;
