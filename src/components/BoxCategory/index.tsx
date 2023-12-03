/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';

import BoxCategoryLoading from './BoxCategoryLoading';

const BoxCategoryMain = lazy(
  () => import('./BoxCategoryMain'),
);

const BoxCategory = () => {
  return (
    <>
      <Suspense fallback={<BoxCategoryLoading />}>
        <BoxCategoryMain />
      </Suspense>
    </>
  );
};

export default BoxCategory;
