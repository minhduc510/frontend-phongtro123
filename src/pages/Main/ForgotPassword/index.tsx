import { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import path from '@/routes/path';
import { Button, Input } from '@/components';
import { forgotPasswordSchema } from '@/schema';
import { Alert } from '@mui/material';
import { apiClient } from '@/api';

const ForgotPassword = () => {
  const [showMessage, setShowMessage] =
    useState<boolean>(false);

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      const { error } = await apiClient.sendMailGetPassword(
        values.email,
      );
      if (!error) {
        setShowMessage(true);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="sm:rounded-md border p-6 bg-white w-full sm:w-[60%] lg:w-[50%] h-[500px] m-auto">
      <h2 className="font-bold text-2xl">Quên mật khẩu</h2>
      <p className="text-sm mt-3">
        Vui lòng nhập email liên kết với tài khoản của bạn
        để nhận mã đặt lại mật khẩu
      </p>
      <form
        action=""
        className="mt-4"
        onSubmit={handleSubmit}
      >
        {showMessage && (
          <Alert severity="success" className="mb-2">
            Vui lòng kiểm tra hòm thư để tiến hành lấy lại
            mật khẩu !
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
              handleChange={(e) => {
                handleChange(e);
                setShowMessage(false);
              }}
              handleBlur={handleBlur}
            />
          </div>
        </div>
        <div className="mt-5">
          <Button
            type="submit"
            content={
              isSubmitting ? 'Đang xử lí...' : 'Tiếp tục'
            }
            containerStyles="bg-blue-primary w-full py-2 font-bold"
          />
        </div>
      </form>
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

export default ForgotPassword;
