import { Suspense, lazy } from 'react';

import DetailPostLoading from './DetailPostLoading';
const DetailPostMain = lazy(
  () => import('./DetailPostMain'),
);

const DetailPost = () => {
  return (
    <>
      <Suspense fallback={<DetailPostLoading />}>
        <DetailPostMain />
      </Suspense>
    </>
  );
};

export default DetailPost;
