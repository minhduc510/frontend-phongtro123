import { Button } from '@/components';
import { MdKeyboardArrowDown } from '@/icons';
import { Skeleton, Stack } from '@mui/material';

const ListPostsLoading = () => {
  return (
    <div className="lg:pb-[5rem]">
      <div className="sm:px-3 sm:py-2 my-5 rounded-lg sm:bg-gray-100">
        <span className="text-blue-primary">
          Phongtro123.com
        </span>{' '}
        / <span className="text-blue-primary">Quản lý</span>{' '}
        / <span>Danh sách tin đăng</span>
      </div>
      <h2 className="text-3xl">Danh sách tin đăng</h2>
      <div className="mt-5 pt-5 border-t">
        <Stack
          direction="row"
          alignItems={{ xs: 'flex-end', sm: 'center' }}
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={{
            xs: 'space-between',
            sm: 'flex-end',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ sm: 1 }}
            className="max-sm:text-sm"
          >
            <span className="font-semibold max-sm:hidden">
              Trạng thái:
            </span>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="border w-[100px] px-1 rounded cursor-pointer max-sm:text-sm"
            >
              <span className="block truncate">Tất cả</span>
              <MdKeyboardArrowDown />
            </Stack>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            spacing={{ xs: 1, sm: 2 }}
          >
            <div className="rounded-md mt-1 max-sm:text-sm">
              <Button
                type="button"
                content="Đăng tin mới"
                containerStyles="bg-red-primary px-2 py-1"
              />
            </div>
            <Stack
              justifyContent="center"
              alignItems="center"
              className={`rounded-md mt-1 bg-blue-primary py-1 text-white max-sm:w-[95px] px-2 max-sm:text-sm`}
            >
              Xóa bài viết
            </Stack>
          </Stack>
        </Stack>
        <div className="overflow-x-scroll">
          <table className="max-lg:w-[1500px] w-full mt-5 max-sm:text-sm">
            <thead>
              <tr>
                <th className="border w-[3%] py-2">
                  <input type="checkbox" />
                </th>
                <th className="border w-[7%] py-2">
                  Mã tin
                </th>
                <th className="border w-[17%] py-2">
                  Ảnh đại diện
                </th>
                <th className="border w-[25%] py-2">
                  Tiêu đề
                </th>
                <th className="border w-[9%] py-2">Giá</th>
                <th className="border w-[9%] py-2">
                  Diện tích
                </th>
                <th className="border w-[10%] py-2">
                  Lần cập nhật cuối
                </th>
                <th className="border w-[10%] py-2">
                  Trạng thái
                </th>
                <th className="border w-[10%] py-2">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <tr key={item + index}>
                    <td className="border ">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </td>
                    <td className="border  font-semibold text-sm px-3">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                    <td className="border py-2">
                      <div className="relative w-[130px] h-[80px] mx-auto rounded-md truncate border shadow-md">
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={118}
                        />
                      </div>
                    </td>
                    <td className="border px-3">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                    <td className="border px-3">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                    <td className="border px-3">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                    <td className="border px-3 capitalize text-sm">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                    <td className="border px-3">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem' }}
                      />
                    </td>
                    <td className="border px-3">
                      <Stack
                        className="w-2/4 mx-auto"
                        spacing={1}
                      >
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '1rem' }}
                        />
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '1rem' }}
                        />
                      </Stack>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListPostsLoading;
