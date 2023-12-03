import { useFormik } from 'formik';
import { Grid, Stack } from '@mui/material';

import { contactSchema } from '@/schema';
import styles from './styles.module.scss';
import { Button, Input } from '@/components';
import { MdOutlineKeyboardArrowRight } from '@/icons';
import { swal } from '@/helpers';

const Contact = () => {
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
      fullname: '',
      phone: '',
      content: '',
    },
    validationSchema: contactSchema,
    onSubmit: async () => {
      swal.success(
        'Cảm ơn bạn, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất !!!',
      );
    },
  });

  return (
    <div>
      <Stack direction="row" alignItems="center">
        <span className="text-blue-primary">Trang chủ</span>{' '}
        <MdOutlineKeyboardArrowRight /> <span>Liên hệ</span>
      </Stack>
      <h2 className="text-3xl font-medium">
        Liên hệ với chúng tôi
      </h2>
      <div className="mt-5">
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <div
              className={`px-8 pt-6 pb-10 rounded-[3rem] text-white ${styles.boxInfoContact}`}
            >
              <h3 className="text-xl font-semibold">
                Thông tin liên hệ
              </h3>
              <p className="mt-5">
                Chúng tôi biết bạn có rất nhiều sự lựa chọn.
                Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com
              </p>
              <div className="mt-5">
                <span className="font-bold">
                  Điện thoại
                </span>
                : <span>0917 686 101</span>
              </div>
              <div className="mt-5">
                <span className="font-bold">Email</span>:{' '}
                <span>cskh.phongtro123@gmail.com</span>
              </div>
              <div className="mt-5">
                <span className="font-bold">Zalo</span>:{' '}
                <span>0917 686 101</span>
              </div>
              <div className="mt-5">
                <span className="font-bold">Viber</span>:{' '}
                <span>0917 686 101</span>
              </div>
              <div className="mt-5">
                <span className="font-bold">Địa chỉ</span>:{' '}
                <span>
                  LD - 02.06, Toà nhà Lexington Residence,
                  Số 67 Mai Chí Thọ, Phường An Phú, Quận 2,
                  Tp. Hồ Chí Minh.
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="rounded-md border p-6 bg-white h-[470px] m-auto">
              <h2 className="font-bold text-xl">
                Liên hệ trực tuyến
              </h2>
              <form
                action=""
                className="mt-2"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label
                    htmlFor="as"
                    className="uppercase text-sm"
                  >
                    họ tên của bạn
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="fullname"
                      value={values.fullname}
                      errors={errors.fullname}
                      touched={touched.fullname}
                      containerStyles="bg-[color:#e8f0fe]"
                      inputStyles="font-bold text-xl"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label
                    htmlFor="as"
                    className="uppercase text-sm"
                  >
                    số điện thoại
                  </label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="phone"
                      value={values.phone}
                      containerStyles="bg-[color:#e8f0fe]"
                      inputStyles="font-bold text-xl"
                      errors={errors.phone}
                      touched={touched.phone}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label
                    htmlFor="as"
                    className="uppercase text-sm"
                  >
                    nội dung
                  </label>
                  <div className="mt-1 bg-[color:#e8f0fe] border rounded-md p-2">
                    <textarea
                      name="content"
                      rows={3}
                      className="bg-transparent w-full resize-none outline-none"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {values.content}
                    </textarea>
                  </div>
                  {touched.content && errors.content && (
                    <span className="italic text-red-primary text-sm">
                      {errors.content}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <Button
                    type="submit"
                    content={`${
                      isSubmitting
                        ? 'Đang xử lí...'
                        : 'Gửi liên hệ'
                    }`}
                    containerStyles="bg-blue-primary w-full py-2 font-bold"
                  />
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Contact;
