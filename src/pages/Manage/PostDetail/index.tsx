import { Suspense, lazy } from 'react';

import PostDetailLoading from './PostDetailLoading';

const PostDetailMain = lazy(
  () => import('./PostDetailMain'),
);

const PostDetail = () => {
  return (
    <>
      <Suspense fallback={<PostDetailLoading />}>
        <PostDetailMain />
      </Suspense>
    </>
  );
};

export default PostDetail;
