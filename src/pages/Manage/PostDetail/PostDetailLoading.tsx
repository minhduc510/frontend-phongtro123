import { Grid, Skeleton, Stack } from '@mui/material';
import { Fragment } from 'react';

import { FcCompactCamera } from '@/icons';
import styles from '../PostPosts/styles.module.scss';

const PostDetailLoading = () => {
  return (
    <div className="lg:pb-[5rem]">
      <div className="sm:px-3 sm:py-2 my-5 rounded-lg sm:bg-gray-100">
        <span className="text-blue-primary">
          Phongtro123.com
        </span>{' '}
        / <span className="text-blue-primary">Quản lý</span>{' '}
        / <span>Cập nhật tin</span>
      </div>
      <h2 className="text-3xl">Cập nhật tin</h2>
      <div className="mt-5 pt-5 border-t">
        <Grid container spacing={5}>
          <Grid item xs={12} lg={8}>
            <form
              action=""
              method="post"
              encType='"multipart/form-data"'
            >
              <div>
                <h3 className="font-bold text-2xl">
                  Địa chỉ cho thuê
                </h3>
                <div className="mt-5">
                  <Grid
                    container
                    spacing={{ xs: 3, md: 20 }}
                  >
                    <Grid item xs={12} md={4}>
                      <p className="font-bold">
                        Tỉnh/Thành phố
                      </p>
                      <Skeleton
                        variant="text"
                        height={40}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="font-bold">
                        Quận/Huyện
                      </p>
                      <Skeleton
                        variant="text"
                        height={40}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="font-bold">Phường/Xã</p>
                      <Skeleton
                        variant="text"
                        height={40}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="mt-8">
                  <p className=" font-bold">
                    Địa chỉ chính xác
                  </p>
                  <Skeleton variant="text" height={60} />
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-2xl">
                  Thông tin mô tả
                </h3>
                <div className="sm:w-[50%] mt-5">
                  <p className="font-bold">
                    Loại chuyên mục
                  </p>
                  <Skeleton variant="text" height={50} />
                </div>
                <div className="mt-5">
                  <p className="font-bold">Tiêu đề</p>
                  <Skeleton variant="text" height={60} />
                </div>
                <div className="mt-5">
                  <p className="font-bold">
                    Nội dung mô tả
                  </p>
                  <div className="border rounded-md p-2">
                    <textarea
                      rows={14}
                      name="content"
                      className="w-full outline-none"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">
                    Thông tin liên hệ
                  </p>
                  <Skeleton variant="text" height={60} />
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">Điện thoại</p>
                  <Skeleton variant="text" height={60} />
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">Giá cho thuê</p>
                  <Skeleton variant="text" height={60} />
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">Diện tích</p>
                  <Skeleton variant="text" height={60} />
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-2xl">
                  Hình ảnh
                </h3>
                <p className="mt-5">
                  Cập nhật hình ảnh rõ ràng sẽ cho thuê
                  nhanh hơn
                </p>
                <div className="mt-5 h-[200px] border-4 border-dashed relative">
                  <input
                    type="file"
                    name="myImage"
                    accept="image/png, image/gif, image/jpeg"
                    className={`absolute inset-0 opacity-100 ${styles.inputFile}`}
                    multiple
                  />
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="w-full h-full"
                  >
                    <FcCompactCamera size={100} />
                    <p>Thêm ảnh</p>
                  </Stack>
                </div>

                <Stack
                  direction="row"
                  gap={2}
                  className="mt-3"
                  flexWrap="wrap"
                >
                  {Array(3)
                    .fill(0)
                    .map((item, index) => (
                      <Fragment key={item + index}>
                        <Skeleton
                          variant="text"
                          height={230}
                          width={250}
                        />
                      </Fragment>
                    ))}
                </Stack>
              </div>
              <div className=" mt-10 rounded-md text-lg font-bold bg-green-600 py-[0.5rem] text-center text-white cursor-pointer">
                Tiếp tục
              </div>
            </form>
          </Grid>
          <Grid item xs={4} className="max-lg:hidden">
            <div className="bg-amber-100 text-yellow-800 p-4 rounded-md">
              <p className="text-2xl">
                Lưu ý khi cập nhật tin
              </p>
              <ul className="mt-3">
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Nội dung phải viết bằng tiếng Việt có
                    dấu
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Tiêu đề tin không dài quá 100 kí tự
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Các bạn nên điền đầy đủ thông tin vào
                    các mục để tin đăng có hiệu quả hơn.
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Để tăng độ tin cậy và tin rao được nhiều
                    người quan tâm hơn, hãy sửa vị trí tin
                    rao của bạn trên bản đồ bằng cách kéo
                    icon tới đúng vị trí của tin rao.
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Tin đăng có hình ảnh rõ ràng sẽ được xem
                    và gọi gấp nhiều lần so với tin rao
                    không có ảnh. Hãy đăng ảnh để được giao
                    dịch nhanh chóng!
                  </p>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PostDetailLoading;
