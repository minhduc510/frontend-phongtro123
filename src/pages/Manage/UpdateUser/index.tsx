/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import path from '@/routes/path';
import { updateUserSchema } from '@/schema';
import { Image, Button } from '@/components';
import { generateSrcImage, swal } from '@/helpers';
import { useAppSelector } from '@/redux/hooks';
import { stateUserSlice } from '@/redux/slices/user';
import { apiClient2 } from '@/api';

const UpdateUser = () => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validationSchema: updateUserSchema,
    onSubmit: async (values) => {
      const { username, email } = values;
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('avatar', linkAvatar);
      const { error } = await apiClient2.updateUser(
        formData,
      );
      if (!error) {
        swal
          .success('Cập nhật thông tin thành công!')
          .then(() => {
            window.location.reload();
          });
      }
    },
  });

  const user = useAppSelector(stateUserSlice);
  const [linkAvatar, setLinkAvatar] = useState<
    File | string
  >(user.avatar);

  useEffect(() => {
    if (user.username && user.email) {
      setValues({
        email: user.email,
        username: user.username,
      });
    }
    if (user.avatar) {
      setLinkAvatar(user.avatar);
    }
  }, [JSON.stringify(user)]);

  return (
    <div className="">
      <div className="sm:px-3 sm:py-2 my-5 rounded-lg sm:bg-gray-100">
        <span className="text-blue-primary">
          Phongtro123.com
        </span>{' '}
        / <span className="text-blue-primary">Quản lý</span>{' '}
        / <span>Thông tin cá nhân</span>
      </div>
      <h2 className="text-3xl">
        Cập nhật thông tin cá nhân
      </h2>
      <div className="mt-5 pt-5 border-t">
        <div className="sm:w-4/5 md:w-3/5 mx-auto mt-5">
          <form action="" onSubmit={handleSubmit}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
            >
              <p className="w-2/5">Mã thành viên</p>
              <div className="bg-gray-100 border rounded-md p-2 sm:w-4/5">
                <input
                  type="text"
                  readOnly
                  className="bg-transparent outline-none w-full"
                  value={user.username}
                />
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5">Số điện thoại</p>
              <div className="bg-gray-100 border rounded-md p-2 sm:w-4/5">
                <input
                  type="text"
                  readOnly
                  className="bg-transparent outline-none w-full"
                  value={user.phone}
                />
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5">Số Zalo</p>
              <div className="bg-gray-100 border rounded-md p-2 sm:w-4/5">
                <input
                  type="text"
                  readOnly
                  className="bg-transparent outline-none w-full"
                  value={user.phone}
                />
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5">Tên hiển thị</p>
              <div className="sm:w-4/5">
                <div className=" border rounded-md p-2 ">
                  <input
                    type="text"
                    name="username"
                    className="bg-transparent outline-none w-full"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.username && errors.username && (
                  <span className="text-red-primary text-sm italic">
                    {errors.username}
                  </span>
                )}
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5">Email</p>
              <div className="sm:w-4/5">
                <div className=" border rounded-md p-2">
                  <input
                    type="text"
                    name="email"
                    className="bg-transparent outline-none w-full"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.email && errors.email && (
                  <span className="text-red-primary text-sm italic">
                    {errors.email}
                  </span>
                )}
              </div>
            </Stack>
            <Stack
              direction="row"
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5 max-sm:hidden">
                Mật khẩu
              </p>
              <div className="sm:w-4/5">
                <Link
                  className="text-blue-primary"
                  to={path.changePassword}
                >
                  Đổi mật khẩu
                </Link>
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-10"
            >
              <p className="w-2/5">Ảnh đại diện</p>
              <div className="sm:w-4/5">
                <div className="relative w-[130px] h-[130px] rounded-full border-4 border-gray-50 truncate mx-auto">
                  <Image
                    alt="avatar"
                    src={
                      typeof linkAvatar === 'string'
                        ? generateSrcImage(linkAvatar)
                        : URL.createObjectURL(linkAvatar)
                    }
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="relative w-[150px] h-[30px] text-center mt-2 mx-auto">
                  <input
                    type="file"
                    name="myImage"
                    accept="image/png, image/gif, image/jpeg"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      setLinkAvatar(
                        e.target.files
                          ? e.target.files[0]
                          : linkAvatar,
                      )
                    }
                  />
                  <div className="py-1 rounded-md border bg-gray-200">
                    <p>Chọn ảnh</p>
                  </div>
                </div>
              </div>
            </Stack>
            <div className="w-full mt-14 text-lg font-medium">
              <Button
                type="submit"
                content={
                  isSubmitting
                    ? 'Đang xử lý...'
                    : 'Lưu & Cập nhật'
                }
                containerStyles="w-full bg-blue-primary py-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
