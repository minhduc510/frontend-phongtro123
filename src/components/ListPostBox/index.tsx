import { Suspense, lazy } from 'react';

import ListPostBoxLoading from './ListPostBoxLoading';

const ListPostBoxMain = lazy(
  () => import('./ListPostBoxMain'),
);

const ListPostBox = () => {
  return (
    <>
      <Suspense fallback={<ListPostBoxLoading />}>
        <ListPostBoxMain />
      </Suspense>
    </>
  );
};

export default ListPostBox;
