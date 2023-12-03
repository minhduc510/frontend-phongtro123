import { object, string, ref, array } from 'yup';

const messages = {
  phoneRegex:
    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
  required: (name: string) => {
    return `${name} không được để trống`;
  },
  email: () => {
    return `Email không đúng định dạng`;
  },
  min: (name: string, limit: number) => {
    return `${name} không được dưới ${limit} ký tự`;
  },
  phone: () => {
    return `Số điện thoại không đúng định dạng`;
  },
  passwordConfirmed: () => {
    return `Mật khẩu không trùng khớp`;
  },
};

const loginSchema = object({
  email: string()
    .email(messages.email)
    .required(messages.required('Email')),
  password: string()
    .min(6, messages.min('Mật khẩu', 6))
    .required(messages.required('Mật khẩu')),
});

const registerSchema = object({
  phone: string()
    .matches(messages.phoneRegex, messages.phone)
    .required(messages.required('Số điện thoại')),
  email: string()
    .email(messages.email)
    .required(messages.required('Email')),
  password: string()
    .min(6, messages.min('Mật khẩu', 6))
    .required(messages.required('Mật khẩu')),
  passwordConfirmed: string().oneOf(
    [ref('password')],
    messages.passwordConfirmed,
  ),
});

const postPostSchema = object({
  category: string().required(
    messages.required('Danh mục'),
  ),
  address: string().required(messages.required('Địa chỉ')),
  title: string()
    .min(20, 'Tiêu đề quá ngắn')
    .required(messages.required('Tiêu đề')),
  content: string()
    .min(100, 'Nội dung quá ngắn')
    .required(messages.required('Nội dung mô tả')),
  price: string().required(messages.required('Giá')),
  acreage: string().required(
    messages.required('Diện tích'),
  ),
  images: array().min(3, 'Phải có ít nhất 3 ảnh'),
});

const updateUserSchema = object({
  username: string().required(
    messages.required('Tên hiển thị'),
  ),
  email: string()
    .email(messages.email)
    .required(messages.required('Email')),
});

const changePasswordSchema = object({
  passwordOld: string()
    .min(6, messages.min('Mật khẩu cũ', 6))
    .required(messages.required('Mật khẩu cũ')),
  passwordNew: string()
    .min(6, messages.min('Mật khẩu mới', 6))
    .required(messages.required('Mật khẩu mới')),
  passwordNewConfirmed: string().oneOf(
    [ref('passwordNew')],
    messages.passwordConfirmed,
  ),
});

const contactSchema = object({
  fullname: string().required(
    messages.required('Họ và tên'),
  ),
  phone: string()
    .matches(messages.phoneRegex, messages.phone)
    .required(messages.required('Số điện thoại')),
  content: string().required(messages.required('Nội dung')),
});

const forgotPasswordSchema = object({
  email: string()
    .email(messages.email)
    .required(messages.required('Email')),
});

const getPasswordSchema = object({
  password: string()
    .min(6, messages.min('Mật khẩu', 6))
    .required(messages.required('Mật khẩu')),
  passwordConfirmed: string().oneOf(
    [ref('password')],
    messages.passwordConfirmed,
  ),
});

export {
  loginSchema,
  contactSchema,
  registerSchema,
  postPostSchema,
  updateUserSchema,
  getPasswordSchema,
  changePasswordSchema,
  forgotPasswordSchema,
};
