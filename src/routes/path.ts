const path = {
  home: '/',
  login: '/dang-nhap',
  search: '/tim-kiem',
  contact: '/lien-he',
  register: '/dang-ky',
  favourite: '/yeu-thich',
  defaultPage: '/:slug',
  detail: '/chi-tiet/:id',
  getPassword: '/lay-lai-mat-khau/:token',
  forgotPassword: '/quen-mat-khau',
  postPosts: '/quan-ly/dang-bai-viet',
  listPost: '/quan-ly/danh-sach-bai-viet',
  changePassword: '/quan-ly/thay-doi-mat-khau',
  updateUser: '/quan-ly/cap-nhat-thong-tin-ca-nhan',
  postDetailManage: '/quan-ly/cap-nhat-bai-viet/:id',
  notFound: '*',
};

export default path;
