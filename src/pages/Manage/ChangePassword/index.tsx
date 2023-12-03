import { Alert, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { changePasswordSchema } from '@/schema';
import { useState } from 'react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from '@/icons';
import { apiClient2 } from '@/api';
import { swal } from '@/helpers';
import path from '@/routes/path';

interface IProps {
  passwordOld: boolean;
  passwordNew: boolean;
  passwordNewConfirmed: boolean;
}

type TypeInput =
  | 'passwordOld'
  | 'passwordNew'
  | 'passwordNewConfirmed';

const ChangePassword = () => {
  const navigate = useNavigate();

  const initState = {
    passwordOld: false,
    passwordNew: false,
    passwordNewConfirmed: false,
  };

  const [showPassword, setShowPassword] =
    useState<IProps>(initState);
  const [errrorMsgPassword, setErrrorMsgPassword] =
    useState<string>('');

  const handleShowPassword = (type: TypeInput) => {
    setShowPassword((prev) => {
      return {
        ...prev,
        [type]: !prev[type],
      };
    });
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      passwordOld: '',
      passwordNew: '',
      passwordNewConfirmed: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      const { passwordOld, passwordNew } = values;
      const { error, message } =
        await apiClient2.changePassword({
          passwordOld,
          passwordNew,
        });
      if (!error) {
        swal
          .success('Đổi mật khẩu thành công!')
          .then(() => {
            navigate(path.updateUser);
          });
      } else {
        setErrrorMsgPassword(message);
      }
    },
  });
  return (
    <div className="">
      <div className="sm:px-3 sm:py-2 my-5 rounded-lg sm:bg-gray-100">
        <span className="text-blue-primary">
          Phongtro123.com
        </span>{' '}
        / <span className="text-blue-primary">Quản lý</span>{' '}
        /{' '}
        <span className="text-blue-primary">
          Thông tin cá nhân
        </span>{' '}
        / <span className="max-sm:block">Đổi mật khẩu</span>
      </div>
      <h2 className="text-3xl">Đổi mật khẩu</h2>
      <div className="mt-5 pt-5 border-t">
        <div className="sm:w-4/5 md:w-3/5 mx-auto mt-5">
          {errrorMsgPassword && (
            <div className="mb-5">
              <Alert severity="error">
                {errrorMsgPassword}
              </Alert>
            </div>
          )}

          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
            >
              <p className="w-2/5">Mật khẩu cũ</p>
              <div className="sm:w-4/5">
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  className="border rounded-md p-2"
                >
                  <input
                    type={`${
                      showPassword.passwordOld
                        ? 'text'
                        : 'password'
                    }`}
                    name="passwordOld"
                    className="bg-transparent outline-none w-full text-lg"
                    value={values.passwordOld}
                    onChange={(e) => {
                      handleChange(e);
                      setErrrorMsgPassword('');
                    }}
                    onBlur={handleBlur}
                  />
                  <div
                    onClick={() =>
                      handleShowPassword('passwordOld')
                    }
                  >
                    {showPassword.passwordOld ? (
                      <AiOutlineEye size={23} />
                    ) : (
                      <AiOutlineEyeInvisible size={23} />
                    )}
                  </div>
                </Stack>
                {touched.passwordOld &&
                  errors.passwordOld && (
                    <span className="text-red-primary text-sm italic">
                      {errors.passwordOld}
                    </span>
                  )}
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5">Mật khẩu mới</p>
              <div className="sm:w-4/5">
                <Stack
                  spacing={1}
                  alignItems="center"
                  direction="row"
                  className=" border rounded-md p-2 "
                >
                  <input
                    type={`${
                      showPassword.passwordNew
                        ? 'text'
                        : 'password'
                    }`}
                    name="passwordNew"
                    className="bg-transparent outline-none w-full text-lg"
                    value={values.passwordNew}
                    onChange={(e) => {
                      handleChange(e);
                      setErrrorMsgPassword('');
                    }}
                    onBlur={handleBlur}
                  />
                  <div
                    onClick={() =>
                      handleShowPassword('passwordNew')
                    }
                  >
                    {showPassword.passwordNew ? (
                      <AiOutlineEye size={23} />
                    ) : (
                      <AiOutlineEyeInvisible size={23} />
                    )}
                  </div>
                </Stack>
                {touched.passwordNew &&
                  errors.passwordNew && (
                    <span className="text-red-primary text-sm italic">
                      {errors.passwordNew}
                    </span>
                  )}
              </div>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              className="mt-5"
            >
              <p className="w-2/5">Xác nhận mật khẩu</p>
              <div className="sm:w-4/5">
                <Stack
                  spacing={1}
                  alignItems="center"
                  direction="row"
                  className=" border rounded-md p-2"
                >
                  <input
                    type={`${
                      showPassword.passwordNewConfirmed
                        ? 'text'
                        : 'password'
                    }`}
                    name="passwordNewConfirmed"
                    className="bg-transparent outline-none w-full text-lg"
                    value={values.passwordNewConfirmed}
                    onChange={(e) => {
                      handleChange(e);
                      setErrrorMsgPassword('');
                    }}
                    onBlur={handleBlur}
                  />
                  <div
                    onClick={() =>
                      handleShowPassword(
                        'passwordNewConfirmed',
                      )
                    }
                  >
                    {showPassword.passwordNewConfirmed ? (
                      <AiOutlineEye size={23} />
                    ) : (
                      <AiOutlineEyeInvisible size={23} />
                    )}
                  </div>
                </Stack>
                {touched.passwordNewConfirmed &&
                  errors.passwordNewConfirmed && (
                    <span className="text-red-primary text-sm italic">
                      {errors.passwordNewConfirmed}
                    </span>
                  )}
              </div>
            </Stack>
            <div className="w-full mt-10 font-medium">
              <Button
                type="submit"
                content={`${
                  isSubmitting
                    ? 'Đang xử lí...'
                    : 'Cập nhật'
                }`}
                containerStyles="w-full bg-blue-primary py-2"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
