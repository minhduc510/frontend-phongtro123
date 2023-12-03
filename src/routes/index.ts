import { Fragment } from 'react';

import {
  Login,
  Search,
  Contact,
  Register,
  NotFound,
  PostPosts,
  ListPosts,
  Favourite,
  PostDetail,
  DetailPost,
  UpdateUser,
  DefaultPage,
  GetPassword,
  ChangePassword,
  ForgotPassword,
} from '@/pages';
import path from './path';
import ManageLayout from '@/layouts/ManageLayout';
import DefaultLayout from '@/layouts/DefaultLayout';

interface IRoute {
  path: string;
  element: React.FC;
  layout: React.FC<React.PropsWithChildren>;
  isPrivate?: boolean;
}

const routes: IRoute[] = [
  {
    path: path.login,
    element: Login,
    layout: DefaultLayout,
  },
  {
    path: path.register,
    element: Register,
    layout: DefaultLayout,
  },
  {
    path: path.detail,
    element: DetailPost,
    layout: DefaultLayout,
  },
  {
    path: path.home,
    element: DefaultPage,
    layout: DefaultLayout,
  },
  {
    path: path.favourite,
    element: Favourite,
    layout: DefaultLayout,
  },
  {
    path: path.defaultPage,
    element: DefaultPage,
    layout: DefaultLayout,
  },
  {
    path: path.contact,
    element: Contact,
    layout: DefaultLayout,
  },
  {
    path: path.search,
    element: Search,
    layout: DefaultLayout,
  },
  {
    path: path.forgotPassword,
    element: ForgotPassword,
    layout: DefaultLayout,
  },
  {
    path: path.postPosts,
    element: PostPosts,
    layout: ManageLayout,
    isPrivate: true,
  },
  {
    path: path.listPost,
    element: ListPosts,
    layout: ManageLayout,
    isPrivate: true,
  },
  {
    path: path.postDetailManage,
    element: PostDetail,
    layout: ManageLayout,
    isPrivate: true,
  },
  {
    path: path.updateUser,
    element: UpdateUser,
    layout: ManageLayout,
    isPrivate: true,
  },
  {
    path: path.changePassword,
    element: ChangePassword,
    layout: ManageLayout,
    isPrivate: true,
  },
  {
    path: path.getPassword,
    element: GetPassword,
    layout: Fragment,
  },
  {
    path: path.notFound,
    element: NotFound,
    layout: DefaultLayout,
  },
];

export default routes;
