import { axiosInstance, axiosInstance2 } from './custom';
import {
  ParamsFilterProps,
  ParamsPostsUserCurrentProps,
  loginProps,
  registerProps,
  ChangePasswordProps,
} from '@/interface';

const apiClient = {
  login: async (body: loginProps) => {
    const response = await axiosInstance.post(
      '/api/login',
      body,
    );
    return response.data;
  },
  register: async (body: registerProps) => {
    const response = await axiosInstance.post(
      '/api/register',
      body,
    );
    return response.data;
  },
  menus: async () => {
    const response = await axiosInstance.get('/api/menus');
    return response.data;
  },
  groups: async (category_id: number) => {
    const response = await axiosInstance.get(
      '/api/groups',
      {
        params: { category_id },
      },
    );
    return response.data;
  },
  categories: async () => {
    const response = await axiosInstance.get(
      '/api/categories',
    );
    return response.data;
  },
  rangePrice: async () => {
    const response = await axiosInstance.get(
      '/api/range-price',
    );
    return response.data;
  },
  rangeAcreage: async () => {
    const response = await axiosInstance.get(
      '/api/range-acreage',
    );
    return response.data;
  },
  provinces: async () => {
    const response = await axiosInstance.get(
      '/api/provinces',
    );
    return response.data;
  },
  districts: async (code_parent: string | number) => {
    const response = await axiosInstance.get(
      `/api/districts/${code_parent}`,
    );
    return response.data;
  },
  wards: async (code_parent: string | number) => {
    const response = await axiosInstance.get(
      `/api/wards/${code_parent}`,
    );
    return response.data;
  },
  exactProvince: async (slug: string) => {
    const response = await axiosInstance.get(
      '/api/exact-province',
      {
        params: { slug },
      },
    );
    return response.data;
  },
  exactDistrict: async (slug: string) => {
    const response = await axiosInstance.get(
      '/api/exact-district',
      {
        params: { slug },
      },
    );
    return response.data;
  },
  exactWard: async (slug: string) => {
    const response = await axiosInstance.get(
      '/api/exact-ward',
      {
        params: { slug },
      },
    );
    return response.data;
  },
  posts: async (objParams: ParamsFilterProps) => {
    const response = await axiosInstance.get(`/api/post`, {
      params: objParams,
    });
    return response.data;
  },
  newPosts: async () => {
    const response = await axiosInstance.get(
      `/api/new-posts`,
    );
    return response.data;
  },
  detailPost: async (id: number) => {
    const response = await axiosInstance.get(
      `/api/postDetail/${id}`,
    );
    return response.data;
  },
  getAccessToken: async (token: string) => {
    const response = await axiosInstance.get(
      `/api/getAccessToken`,
      {
        headers: {
          Authorization: 'Bearer ' + token, //the token is a variable which holds the token
        },
      },
    );
    return response.data;
  },
  sendMailGetPassword: async (email: string) => {
    const response = await axiosInstance.post(
      `/api/send-mail`,
      { email },
    );
    return response.data;
  },
  checkTokenMail: async (token: string) => {
    const response = await axiosInstance.get(
      `/api/tokenMail/${token}`,
    );
    return response.data;
  },
  updatePasswordForgot: async (
    user_id: number,
    password: string,
  ) => {
    const response = await axiosInstance.post(
      `/api/updatePasswordForgot/${user_id}`,
      { password },
    );
    return response.data;
  },
  loginFacebook: async () => {
    const response = await axiosInstance.get(
      `/api/facebook-page/`,
    );
    return response.data;
  },
};

const apiClient2 = {
  userCurrent: async () => {
    const response = await axiosInstance2.get(
      `/api/userCurrent`,
    );
    return response.data;
  },
  uploadPost: async (body: FormData) => {
    const response = await axiosInstance2.post(
      `/api/post`,
      body,
    );
    return response.data;
  },
  postsUserCurrent: async (
    objParams: ParamsPostsUserCurrentProps,
  ) => {
    const response = await axiosInstance2.get(
      `/api/postUserCurrent`,
      {
        params: objParams,
      },
    );
    return response.data;
  },
  postDetailCurrent: async (id: number | string) => {
    const response = await axiosInstance2.get(
      `/api/post/${id}`,
    );
    return response.data;
  },
  deletePost: async (id: number | string) => {
    const response = await axiosInstance2.delete(
      `/api/post/${id}`,
    );
    return response.data;
  },
  deletePosts: async (arrId: number[]) => {
    const response = await axiosInstance2.delete(
      `/api/posts`,
      {
        params: {
          ids: arrId,
        },
      },
    );
    return response.data;
  },
  updatePost: async (id: number, body: FormData) => {
    body.append('_method', 'PUT');
    const response = await axiosInstance2.post(
      `/api/post/${id}`,
      body,
    );
    return response.data;
  },
  updateUser: async (body: FormData) => {
    const response = await axiosInstance2.post(
      `/api/updateUser`,
      body,
    );
    return response.data;
  },
  changePassword: async (body: ChangePasswordProps) => {
    const response = await axiosInstance2.post(
      `/api/changePassword`,
      body,
    );
    return response.data;
  },
  getPostFavourite: async () => {
    const response = await axiosInstance2.get(
      `/api/getPostFavourite`,
    );
    return response.data;
  },
  postFavourite: async (id: number | string) => {
    const response = await axiosInstance2.get(
      `/api/postFavourite/${id}`,
    );
    return response.data;
  },
  getFavourite: async () => {
    const response = await axiosInstance2.get(
      `/api/getFavourite`,
    );
    return response.data;
  },
};

export { apiClient, apiClient2 };
