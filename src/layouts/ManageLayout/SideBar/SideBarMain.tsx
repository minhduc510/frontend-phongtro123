import { Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import path from '@/routes/path';
import { Image } from '@/components';
import { logoutAdded } from '@/redux/slices/auth';
import { stateUserSlice } from '@/redux/slices/user';
import {
  generateSrcImage,
  handleTextLong,
} from '@/helpers';
import {
  useAppDispatch,
  useAppSelector,
} from '@/redux/hooks';
import {
  BsChat,
  TbLogout2,
  TbFileUpload,
  BsPencilSquare,
  CgFileDocument,
} from '@/icons';

const SideBarMain = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(stateUserSlice);
  return (
    <div>
      <div className="px-3 pt-6">
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <div className="relative w-[60px] h-[60px] truncate rounded-full border">
            <Image
              alt="avatar"
              fill
              src={generateSrcImage(user.avatar)}
            />
          </div>
          <div>
            <p className="font-bold leading-4 text-lg">
              {handleTextLong(user.username, 17)}
            </p>
            <span className="text-sm">{user.phone}</span>
          </div>
        </Stack>
        <p className="text-sm mt-3">
          Mã thành viên:{' '}
          <span className="font-bold">#{user.code}</span>
        </p>
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
      <ul className="mt-4 ">
        <li
          className={`w-full p-2 rounded-md cursor-pointer hover:bg-gray-200 ${
            location.pathname === path.postPosts
              ? 'bg-gray-200'
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
          className={`p-2 w-full rounded-md cursor-pointer hover:bg-gray-200 ${
            location.pathname === path.listPost
              ? 'bg-gray-200'
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
          className={`p-2 w-full rounded-md cursor-pointer hover:bg-gray-200 ${
            location.pathname === path.updateUser
              ? 'bg-gray-200'
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
          className={`p-2 w-full rounded-md cursor-pointer hover:bg-gray-200 ${
            location.pathname === path.contact
              ? 'bg-gray-200'
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
          className="p-2 w-full rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => dispatch(logoutAdded())}
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
    </div>
  );
};

export default SideBarMain;
