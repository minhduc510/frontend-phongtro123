/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';

import PostsLoading from './PostsLoading';
import { HeaderProps } from '@/interface';

const PostsMain = lazy(() => import('./PostsMain'));

interface IProps {
  setHeader: (obj: HeaderProps) => void;
}

const Posts = (props: IProps) => {
  return (
    <>
      <Suspense fallback={<PostsLoading />}>
        <PostsMain props={{ ...props }} />
      </Suspense>
    </>
  );
};

export default Posts;
