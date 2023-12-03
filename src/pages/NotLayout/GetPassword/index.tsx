import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Alert, Stack } from '@mui/material';
import {
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';

import { Logo } from '@/assets';
import path from '@/routes/path';
import { swal } from '@/helpers';
import { apiClient } from '@/api';
import { TfiFaceSad } from '@/icons';
import { getPasswordSchema } from '@/schema';
import { Button, Input } from '@/components';

const GetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [userID, setUserID] = useState<number>(0);
  const [layoutExpired, setLayoutExpired] =
    useState<boolean>(false);

  useEffect(() => {
    const callApi = async () => {
      if (token) {
        const { error, expired, user_id } =
          await apiClient.checkTokenMail(token);
        console.log(expired);
        if (!error) {
          if (expired) {
            setLayoutExpired(true);
          } else {
            setLayoutExpired(false);
            setUserID(user_id);
          }
        }
      }
    };

    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      password: '',
      passwordConfirmed: '',
    },
    validationSchema: getPasswordSchema,
    onSubmit: async (values) => {
      const { error } =
        await apiClient.updatePasswordForgot(
          userID,
          values.password,
        );
      if (!error) {
        swal
          .success('Lấy lại mật khẩu thành công')
          .then(() => {
            navigate(path.login);
          });
      } else {
        swal.error('Lấy lại mật khẩu không thành công');
      }
    },
  });
  return (
    <Stack className="h-[100vh]">
      <div
        className={`sm:rounded-md shadow p-6 bg-white max-sm:w-full sm:w-[60%] lg:w-[40%] ${
          layoutExpired ? 'h-[350px]' : 'h-[550px]'
        } m-auto`}
      >
        <div className={`max-lg:w-[200px] lg:w-[250px]`}>
          <Logo />
        </div>
        {layoutExpired ? (
          <div className="mt-3">
            <div>
              <TfiFaceSad size={30} />
            </div>
            <div className="mt-3">
              <Alert severity="error" className="mb-2">
                Yêu cầu này đã quá thời hạn, vui lòng gửi
                lại yêu cầu và thực hiện lại
              </Alert>
            </div>
            <div>
              Nhấn vào{' '}
              <Link
                to={path.forgotPassword}
                className="text-blue-primary underline"
              >
                đây
              </Link>{' '}
              để gửi lại yêu cầu!
            </div>
          </div>
        ) : (
          <>
            {' '}
            <h2 className="font-bold text-2xl mt-5">
              Lấy lại mật khẩu
            </h2>
            <form
              action=""
              className="mt-4"
              onSubmit={handleSubmit}
            >
              <div className="form-group mt-5">
                <label
                  htmlFor="as"
                  className="uppercase text-sm"
                >
                  Mật khẩu mới
                </label>
                <div className="mt-1">
                  <Input
                    type="password"
                    name="password"
                    inputStyles="font-bold text-xl"
                    containerStyles="bg-[color:#e8f0fe]"
                    value={values.password}
                    errors={errors.password}
                    touched={touched.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="form-group mt-5">
                <label
                  htmlFor="as"
                  className="uppercase text-sm"
                >
                  Xác nhận mật khẩu mới
                </label>
                <div className="mt-1">
                  <Input
                    type="password"
                    name="passwordConfirmed"
                    inputStyles="font-bold text-xl"
                    containerStyles="bg-[color:#e8f0fe]"
                    value={values.passwordConfirmed}
                    errors={errors.passwordConfirmed}
                    touched={touched.passwordConfirmed}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="mt-5">
                <Button
                  type="submit"
                  content={
                    isSubmitting
                      ? 'Đang xử lí...'
                      : 'Tiếp tục'
                  }
                  containerStyles="bg-blue-primary w-full py-2 font-bold"
                />
              </div>
            </form>
          </>
        )}
      </div>
    </Stack>
  );
};

export default GetPassword;
