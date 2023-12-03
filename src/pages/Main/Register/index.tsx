import { useFormik } from 'formik';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { swal } from '@/helpers';
import path from '@/routes/path';
import { apiClient } from '@/api';
import { registerSchema } from '@/schema';
import { Input, Button } from '@/components';
import { useAppDispatch } from '@/redux/hooks';
import { userAdded } from '@/redux/slices/user';
import { loginAdded } from '@/redux/slices/auth';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const {
    values,
    touched,
    errors,
    setErrors,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      phone: '',
      password: '',
      passwordConfirmed: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { error, message, token, user } =
        await apiClient.register(values);
      if (!error) {
        swal
          .success('Đăng ký tài khoản thành công')
          .then(() => {
            dispatch(loginAdded(token));
            dispatch(userAdded(user));
            const pathName =
              searchParams.get('continue_url') ?? '/';
            navigate(pathName);
          });
      } else {
        setErrors({ email: message });
      }
    },
  });

  return (
    <div className="sm:rounded-md border p-6 bg-white sm:w-[60%] lg:w-[50%] h-[650px] m-auto">
      <h2 className="font-bold text-2xl">Đăng ký</h2>
      <form
        action=""
        className="mt-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group mt-5">
          <label htmlFor="as" className="uppercase text-sm">
            Số điện thoại
          </label>
          <div className="mt-1">
            <Input
              type="text"
              name="phone"
              inputStyles="font-bold text-xl"
              containerStyles="bg-[color:#e8f0fe]"
              value={values.phone}
              errors={errors.phone}
              touched={touched.phone}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>
        </div>
        <div className="form-group mt-5">
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
        <div className="form-group mt-5">
          <label htmlFor="as" className="uppercase text-sm">
            Xác nhận mật khẩu
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
              isSubmitting ? 'Đang xử lí...' : 'Đăng ký'
            }
            containerStyles="bg-blue-primary w-full py-2 font-bold"
          />
        </div>
      </form>
      <p className="text-sm mt-8">
        Bấm vào nút đăng ký tức là bạn đã đồng ý với quy
        định sử dụng của chúng tôi.
      </p>
      <p className="text-sm mt-3">
        Bạn đã có tài khoản?{' '}
        <Link
          to={path.login}
          className="text-blue-primary hover:text-orange-primary cursor-pointer"
        >
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
};

export default Register;
