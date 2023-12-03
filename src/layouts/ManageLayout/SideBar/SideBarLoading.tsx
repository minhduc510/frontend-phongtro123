import {
  BsChat,
  BsPencilSquare,
  CgFileDocument,
  TbFileUpload,
  TbLogout2,
} from '@/icons';
import { Skeleton, Stack } from '@mui/material';

const SideBarLoading = () => {
  return (
    <div className="bg-gray-50 px-4 border-r border-gray-300 absolute top-0 bottom-0 left-0 right-0">
      <div className="px-3 pt-6">
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
        >
          <div className="relative w-[60px] h-[60px] truncate rounded-full border">
            <Skeleton
              variant="circular"
              width={60}
              height={60}
            />
          </div>
          <div>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={100} />
          </div>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          className="text-sm mt-3"
        >
          <span> Mã thành viên:</span>
          <Skeleton variant="text" width={100} />
        </Stack>
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
        <li className="p-2 rounded-md cursor-pointer hover:bg-gray-200">
          <div>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <TbFileUpload />
              <span>Đăng tin mới</span>
            </Stack>
          </div>
        </li>
        <li className="p-2 rounded-md cursor-pointer hover:bg-gray-200">
          <div>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CgFileDocument />
              <span>Quản lý tin đăng</span>
            </Stack>
          </div>
        </li>
        <li className="p-2 rounded-md cursor-pointer hover:bg-gray-200">
          <div>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <BsPencilSquare />
              <span>Sửa thông tin cá nhân</span>
            </Stack>
          </div>
        </li>
        <li className="p-2 rounded-md cursor-pointer hover:bg-gray-200">
          <div>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <BsChat />
              <span>Liên hệ</span>
            </Stack>
          </div>
        </li>
        <li className="p-2 rounded-md cursor-pointer hover:bg-gray-200">
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

export default SideBarLoading;
