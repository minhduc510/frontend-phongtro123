import { useState } from 'react';
import { useFormik } from 'formik';
import { Alert, Stack } from '@mui/material';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import path from '@/routes/path';
import { swal } from '@/helpers';
import { apiClient } from '@/api';
import { loginSchema } from '@/schema';
import { Input, Button } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { userAdded } from '@/redux/slices/user';
import { loginAdded } from '@/redux/slices/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string>('');

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
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { error, message, token, user } =
        await apiClient.login(values);
      if (!error) {
        swal.success('Đăng nhập thành công').then(() => {
          dispatch(loginAdded(token));
          dispatch(userAdded(user));
          setError('');
          const pathName =
            searchParams.get('continue_url') ?? '/';
          navigate(pathName);
        });
      } else {
        setError(message);
      }
    },
  });

  return (
    <div className="sm:rounded-md border p-6 bg-white w-full sm:w-[60%] lg:w-[50%] h-[500px] m-auto">
      <h2 className="font-bold text-2xl">Đăng nhập</h2>
      <form
        action=""
        className="mt-4"
        onSubmit={handleSubmit}
      >
        {error && (
          <Alert severity="error" className="mb-2">
            {error}
          </Alert>
        )}
        <div className="form-group">
          <label htmlFor="as" className="uppercase text-sm">
            Email
          </label>
          <div className="mt-1">
            <Input
              type="text"
              name="email"
              inputStyles="font-bold text-xl"
              containerStyles="bg-[color:#e8f0fe]"
              value={values.email}
              errors={errors.email}
              touched={touched.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>
        </div>
        <div className="form-group mt-5">
          <label htmlFor="as" className="uppercase text-sm">
            Mật khẩu
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
        <div className="mt-5">
          <Button
            type="submit"
            content={
              isSubmitting ? 'Đang xử lí...' : 'Đăng nhập'
            }
            containerStyles="bg-blue-primary w-full py-2 font-bold"
          />
        </div>
      </form>
      <Stack
        direction="row"
        justifyContent="space-between"
        className="text-sm mt-5"
      >
        <Link
          to={path.forgotPassword}
          className="text-blue-primary hover:text-orange-primary cursor-pointer"
        >
          Bạn quên mật khẩu
        </Link>
        <Link
          to={path.register}
          className="text-blue-primary hover:text-orange-primary cursor-pointer"
        >
          Tạo tài khoản mới
        </Link>
      </Stack>
    </div>
  );
};

export default Login;
